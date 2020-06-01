<template>
	<view class="wrap wrap-tab" :class="{'yellow-theme':isYellow}">
		<view class="navbar nav-property" :class="{active:showActive}"><!--白色背景还是灰色背景-->
		      <view class="title">资产</view>
			  <image class="charge-coin" @tap="toCharge" src="/static/ic_coin@2x.png"></image>
		    </view>
			<view class="property-wrap">
			<view class="total-pro">
				<image :src="bg" class="bg" mode=""></image>
				<view class="title">总资产(￥)
				<image :src="seeSource?'/static/ic_eye_open.png':'/static/ic_eye_close.png'"  @error="onImageError('coinList',index)" @tap="hideProperty" class="img" mode=""></image></view>
				<view class="number" v-if="showBalance">≈{{totalBalance>0?totalBalance:"0.00"}}</view>
				<view class="number" v-else>****</view>
			</view>
			<view class="coin-type">
				<view class="title">
					<text>币种</text>
					<text>价格</text>
				</view>
				<view class="ul">
					<view class="li" v-for="item in coinList">
						<view class="left">
							<image :src="item.logoUrl" class="img" mode=""></image>
							<text class="text">{{item.coinName}}</text>
						</view>
						<view class="right" v-if="showBalance">
							<view class="bold">{{item.total?item.total.toFixed(8):"0.00000000"}}</view>
							<view class="cny">≈￥{{item.rmb}}</view>
						</view>
						<view class="right" v-else="showBalance">
							<view class="bold">****</view>
							<view class="cny">****</view>
						</view>
					</view>
				</view>
			</view>
			</view>
			<!-- <custom-tabbar :index="1"></custom-tabbar> -->
			<toast-model :message="message" verticalAlign="bottom" ref="toast" :duration="3000"></toast-model>
	</view>
</template>

<script>
	import { mapState } from 'vuex';  
	export default {
		data(){
			return {
				showActive:false,
				message:"",
				seeSource:true,
				totalBalance:"0.00",
				showBalance:true,
				coinList:[
					{coinName:"BTC",logoUrl:"/static/coin/ic_order_btc.png",total:0,rmb:"0.00"},
					{coinName:"ETH",logoUrl:"/static/coin/ic_eth.png",total:0,rmb:"0.00"},
					{coinName:"USDT",logoUrl:"/static/coin/ic_usdt.png",total:0,rmb:"0.00"},
					{coinName:"TB",logoUrl:"/static/coin/myp_pic_tb.png",total:0,rmb:"0.00"},
					{coinName:"LoveBird",logoUrl:"/static/coin/myp_pic_lovebird.png",total:0,rmb:"0.00"},
					{coinName:"TP",logoUrl:"/static/coin/myp_pic_tp.png",total:0,rmb:"0.00"},
					{coinName:"Love Bird(积分)",logoUrl:"/static/coin/myp_pic_lb.png",total:0,rmb:"0.00"},
				],
				bg:"/static/pro-bg.png"
			}
		},
		onPageScroll : function(e) { //nvue暂不支持滚动监听，可用bindingx代替
		if(e.scrollTop>40){
			this.showActive=true
		}else{
			this.showActive=false
		}
		},
		computed: {
			...mapState(['hasLogin','userInfo']),
			themeIndex(){
				return getApp().globalData.theme;
			},
			isYellow(){
				return this.themeIndex===0
			}
		},
		onLoad(){
			if(this.themeIndex!==""){
				this.bg=this.$Theme[this.themeIndex].propertyBg
			}
		},
		onShow() {
			this.getProperty()
		},
		methods:{
			onImageError(key, index, name) {
				this[key][index].logoUrl = '/static/placeholder.png';
			},
			toCharge(){
				if(this.hasLogin){
					this.$toPage('/pages/index/charge')
				}else{
					this.$toPage('/pages/user/login')
				}
			},
			hideProperty(){
				this.seeSource=!this.seeSource
				this.showBalance=!this.showBalance
			},
			getProperty(){
				if(!this.hasLogin){
					return;
				}
				uni.request({
					url: this.$httpUrl("/app/assets/currency/getUserCoin"),
					data: {
						userId:getApp().globalData.userId
					},
					method:"POST",
					header:{
						"content-type":"application/x-www-form-urlencoded",
						token: getApp().globalData.token
					},
					success: (res) => {
						if (res.data.code === 0) {
							var totalBalance=0;
							res.data.data.forEach((item,i)=>{
								console.log(item.rmb)
								var rmb=item.rmb>0?Number(item.rmb).toFixed(2):"0.00"
								res.data.data[i].rmb=rmb;
								totalBalance=(totalBalance*100+rmb*100)/100
								var computed=item.free*Math.pow(10,8)+item.freezed*Math.pow(10,8)
								var total=computed/Math.pow(10,8)
								res.data.data[i].total=total
							})
								console.log(res.data.data)
							this.totalBalance=totalBalance
							this.coinList=res.data.data
						} else {
							this.message=res.data.msg;
							this.$refs.toast.show()
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	@import "../../assets/scss/property.scss"
</style>
