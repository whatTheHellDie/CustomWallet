<template>
	<view>
	<view class="my-score">
		<view class="navbar sub-nav">
			<image src="/static/ic_left@2x.png" @tap="back" class="back" mode=""></image>
			<view class="title">
				{{title}} 
			</view>
		</view>
		<view>
			<view class="number">{{balance}}</view>
			<view class="end-time" v-if="type==4">到期时间：{{overTime}}</view>
		</view>
	</view>
	
	<view class="list-base name-list">
		<!-- 本版本积分不开放 -->
		<view class="ul" v-if="type==1">
			<view class="li li1" @tap="$toPage(`/pages/user/pointTransform?title=转成（Love Bird）币&coinType=1&accountType=1`)">
				<view class="title-wrap">
				<text class="text">转成币(Love Bird)</text>
				</view>
				<view class="iconfont">&#xe603;</view>
			</view>
			<view class="li li1" @tap="$toPage(`/pages/user/pointTransform?title=转账&coinType=2&accountType=1`)">
				<view class="title-wrap">
				<text class="text">转账</text>
				</view>
				<view class="iconfont">&#xe603;</view>
			</view>
			<view class="li li1" @tap="$toPage('/pages/user/scoreDetail?accountType=1')">
				<view class="title-wrap">
				<text class="text">明细</text>
				</view>
				<view class="iconfont">&#xe603;</view>
			</view>
	</view>
	<view class="ul" v-if="type==2||type==3">
		<view class="li li1" @tap="stayTuned">
			<view class="title-wrap">
			<text class="text">充币</text>
			</view>
			<view class="iconfont">&#xe603;</view>
		</view>
		<view class="li li1" @tap="$toPage('/pages/user/withdrawCoin')">
			<view class="title-wrap">
			<text class="text">提币</text>
			</view>
			<view class="iconfont">&#xe603;</view>
		</view>
			<view class="li li1" @tap="$toPage(`/pages/user/coinTransform?title=转入生息&coinType=1`)">
				<view class="title-wrap">
				<text class="text">转入生息</text>
				</view>
				<view class="iconfont">&#xe603;</view>
			</view>
			<view class="li li1" @tap="$toPage(`/pages/user/coinTransform?title=转账&coinType=2&accountType=3`)">
				<view class="title-wrap">
				<text class="text">转账</text>
				</view>
				<view class="iconfont">&#xe603;</view>
			</view>
			<view class="li li1" @tap="$toPage('/pages/user/scoreDetail?accountType=3')">
				<view class="title-wrap">
				<text class="text">明细</text>
				</view>
				<view class="iconfont">&#xe603;</view>
			</view>
	</view>
	<view class="ul" v-if="type==4">
		<view class="li li1" @tap="$toPage('/pages/deposit/scoreInterestDetail?pid='+pid)">
			<view class="title-wrap">
			<text class="text">当前定存积分利息</text>
			</view>
			<view :style="{display:'flex'}">
				<view :style="{position:'relative',top:'4rpx'}">{{fixedInterest}}</view>
			<view class="iconfont">&#xe603;</view>
			</view>
		</view>
			<view class="li li1" @tap="$toPage(`/pages/user/TransferIntoInterest?title=转入生息&coinType=1`)">
				<view class="title-wrap">
				<text class="text">转入生息</text>
				</view>
				<view class="iconfont">&#xe603;</view>
			</view>
			<view class="li li1" @tap="$toPage(`/pages/deposit/transferOut`)">
				<view class="title-wrap">
				<text class="text">转出</text>
				</view>
				<view class="iconfont">&#xe603;</view>
			</view>
			<view class="li li1" @tap="$toPage('/pages/deposit/scoreDetail')">
				<view class="title-wrap">
				<text class="text">明细</text>
				</view>
				<view class="iconfont">&#xe603;</view>
			</view>
	</view>
	</view>
	<toast-model :message="message" verticalAlign="bottom" ref="toast" :duration="3000"></toast-model>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex';  
	export default {
		data() {
			return {
				overTime:"",
				message:"",
				type:"",
				title:"",
				userNumber:"",
				balance:"",
				fixedInterest:"",
				pid:""
			}
		},
		onLoad(option){
			this.title=option.title
			this.type=option.type //type 1.Love Bird积分 2.Love Bird币 3.TB币 4.定存积分
			this.userNumber=option.userNumber
		},
		onShow() {
			if(this.type!=4){
				this.getUserInfo()
			}else{
				this.getDeposit()
			}
			if(this.showToastInInit){
				this.hideToastInfo()
				this.message=this.toastInfo;
				setTimeout(this.$refs.toast.show,200)
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo','showToastInInit','toastInfo'])
		},
		methods: {
			...mapMutations(['login','hideToastInfo']),
			getDeposit(){
				uni.request({
					url: this.$httpUrl("/app/about/holdthecode/deposit/index"),
					data: {
						userId:this.userInfo.id
					},
					method:"POST",
					header:{
						"content-type":"application/x-www-form-urlencoded",
						token: getApp().globalData.token
					},
					success: (res) => {
						if (res.data.code === '0') {
							var data=res.data.data
							this.balance=data.amount.toFixed(2)
							this.overTime=data.overTime;
							this.pid=data.id
							this.fixedInterest=data.fixedInterest.toFixed(2)
						} else {
							this.message=res.data.msg
							this.$refs.toast.show() 
						}
					}
				});
			},
			stayTuned(){
				this.message="敬请期待"
				this.$refs.toast.show();
			},
			show(){
				this.$refs.toast.show()
			},
			getUserInfo(userId){
				uni.request({
					url: this.$httpUrl("/app/base/info/userInfo"),
					data: {
						userId:this.userInfo.id
					},
					method:"POST",
					header:{
						"content-type":"application/x-www-form-urlencoded",
						token: getApp().globalData.token
					},
					success: (res) => {
						if (res.data.code === 0) {
							var data=res.data.data
							this.login(data)
							var balance
							if(this.type==1){
								balance=data.lovebirdPoint.toFixed(2)
							}else if(this.type==2){
								balance=data.lovebirdAccount.toFixed(2)
							}else if(this.type==3){
								balance=data.LBAccount.toFixed(2)
								
							}else if(this.type=4){
								balance=data.lovebirdPointFreeze.toFixed(2)
							}
							this.balance=balance
						} else {
							this.message=res.data.msg
							this.$refs.toast.show() 
						}
					}
				});
			},
			back(){
				//#ifdef H5
					window.history.go(-1)
				//#endif
				//#ifdef APP-PLUS
					uni.navigateBack()
				//#endif
			}
		}
	}
</script>

<style lang="scss">
	.navbar{
		background: transparent;
		.xi{font-size: 24rpx;}
	}
	.my-score{background: -webkit-gradient(linear, left top, right top, from(#af01dc), to(#3802d9));height: 364rpx;position: relative;
	padding-top: 138rpx;color: #fff;
		text-align: center;
	.number{
		font-size: 70rpx;
	}
	.text{font-size: 28rpx;margin-top: 24rpx;}
	.end-time{position: absolute;bottom: 0;left: 0;width: 100%;padding: 0 20rpx;font-size: 28rpx;background:rgba(245,245,245,.1);height: 88rpx;display: flex;align-items: center;
}
	}
	
</style>
