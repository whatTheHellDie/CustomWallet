<template>
	<view class="content wrap">
			<image src="/static/flash.png" class="bg" mode=""></image>
		<sub-nav :title="title"></sub-nav>
		<!-- <view class="input" :style="{position:'relative'}" ></view> -->
		<view class="flash-wrap">
			<view class="coin-type">
				<view class="coin" @tap='toggleTab("selector1")'><view class="inner"><image :src="first" class="img" mode=""></image>{{scoreInfo}}</view><image src="/static/triangel-down.png" class="down" mode=""></image></view>
				<view class="coin" @tap='toggleTab("selectorx")'><view class="inner"><image :src="second" class="img" mode=""></image>{{chosenInfo}}</view><image src="/static/triangel-down.png" class="down" mode=""></image></view>
			</view>
			<view class="balance">可兑换余额：≈0.000</view>
			<view class="coin-type coin-type1">
				<view class="coin"><input type="text" class="inner" placeholder="请输入转出数量"  /></view>
				<view class="coin"><input type="text" class="inner" placeholder="接收币种数量"/></view>
			</view>
		</view>
		<toast-model
		      :message="message"
		      verticalAlign="bottom"
		      ref="toast"
					:duration="3000"
		    ></toast-model>
			<w-picker
				v-if="score.length!=0"
				mode="selector" 
				@confirm="onConfirm" 
				ref="selector1" 
				themeColor="#006934"
				:selectList="score"
			></w-picker>
			<w-picker
				mode="selector" 
				@confirm="onConfirm1" 
				ref="selectorx" 
				themeColor="#006934"
				:selectList="chosen"
			></w-picker>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex';  
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components:{
			wPicker,
		},
		data() {
			return {
				coinList:[],
				chosen:[
				],
				chosenIndex:0,
				chosenInfo:"",
				score:[
					{label:'TC',img:"/static/coin/myp_pic_lovebird.png",under:[{label:'TC(积分)',img:"/static/coin/myp_pic_lb.png",type:1}]},
					{label:'USDT',img:"/static/coin/ic_usdt.png",under:[{label:'TC(积分)',img:"/static/coin/myp_pic_lb.png",type:2},{label:'TC',img:"/static/coin/myp_pic_lovebird.png",type:4}]},
					{label:'TC(积分)',img:"/static/coin/myp_pic_lb.png",under:[{label:'TC',img:"/static/coin/myp_pic_lovebird.png",type:3},{label:'USDT',img:"/static/coin/ic_usdt.png",type:5}]},
				],
				scoreIndex:0,
				scoreInfo:"",
				message:"",
				title:"闪兑",
				second:'/static/coin/myp_pic_lovebird.png',
				first:"/static/coin/ic_usdt.png",
				sourceType:""
			}
			
		},
		onLoad(option){
			this.getProperty()
			this.first=this.score[0].img
			this.scoreInfo=this.score[0].label;
			this.chosen=this.score[0].under
			this.second=this.score[0].under[0].img
			this.chosenInfo=this.score[0].under[0].label
			this.sourceType=this.score[0].under[0].type
			
			
		},
		methods: {
			...mapMutations(['addToastInfo']),
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
							this.coinList=res.data.data
							
						} else {
							if(res.data.code === 2){return}
							this.message=res.data.msg;
							this.$refs.toast.show()
						}
					}
				});
			},
			toggleTab(name){
				console.log(name)
				console.log(this.$refs['name'])
				this.$refs[name].show();
			},
			onConfirm(val){
				console.log(val)
				this.first=val.checkArr.img
				this.scoreInfo=val.result;
				// 自动选择第二个
				this.second=val.checkArr.under[0].img
				this.chosen=val.checkArr.under
				this.chosenInfo=val.checkArr.under[0].label
				this.sourceType=val.checkArr.under[0].type
			},
			onConfirm1(val){
				console.log(val)
				this.second=val.checkArr.img
				this.chosenInfo=val.result
				this.sourceType=val.checkArr.type
				
			},
		}
	}
</script>

<style lang="scss">
	.sub-nav{background: transparent;z-index: 1;}
	.bg{position: absolute;top: 0;left: 0;width: 100%;height: 512rpx;}
</style>
