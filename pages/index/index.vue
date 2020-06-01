<template>
	<view class="wrap wrap-tab" :class="{'yellow-theme':isYellow}">
		<view class="navbar">
			<!--白色背景还是灰色背景-->
			<view class="title">MyLifepay</view>
			<!-- <image src="/static/ic_mine_message@2x.png" class="message" mode=""></image> -->
		</view>
		<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="3000" :duration="400"
		 indicator-active-color="rgba(0,0,0,.8)">
			<swiper-item v-for="(item,index) in carousel" @tap="jumpTo(item.id,item.jumpType,item.jumpDestination,item.name)">
				<view class="swiper-item">
					<image class="swiper-img" :src="item.img" @error="onImageError('carousel',index)"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="advertising">
			<image src="/static/ic_home_flower@2x.png" class="img" mode=""></image>
			<swiper class="ul" circular :autoplay="true" vertical="true" :interval="5000" :duration="500">
				<swiper-item class="li" v-for="(item,index) in announcementList"  @tap="jumpTo(item.id,item.jumpType,item.jump,item.title)">
					<view class="content">{{item.title}}</view><text class="span">{{item.publishTime}}</text>
					<view class="turn-right iconfont">&#xe603;</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="charge-way" v-for="item in column1">
			<view class="btn-wrap" @tap="toCharge">
				<view class="btn">
					<image :src="item[0]" class="img" mode=""></image><text>充值</text>
				</view>
			</view>
			<view class="line"></view>
			<view class="btn-wrap" @tap="toChangeCoin">
				<view class="btn">
					<image :src="item[1]" class="img" mode=""></image><text>闪兑</text>
				</view>
			</view>
		</view>
		<view class="stage">
			<view class="title"><text class="rela-text">应用场景</text></view>
			<view class="uni-list">
				<view class="uni-list-cell" v-for="item in moduleList" @tap="jumpTo(item.id,item.jumpType,item.jumpDestination,item.name)">
					<image :src="item.img" class="img" mode=""></image>
					<view class="content">
						<view class="name">{{item.name}}</view>
						<view class="second-name">{{item.remake}}</view>
					</view>
				</view>

			</view>
		</view>
		<view class="stage stage1" @tap="toOutSideUrl('https://www.biliex.com/digital?s=Default.Index&m=digital')">
			<view class="title"><text class="rela-text">交易行情</text></view>
			<view class="quotation-wrap">
				<view class="quotation">
					<view class="coin-name">{{coinPrice.lbPriceName}}</view>
					<view class="number">{{coinPrice.lbPrice}}</view>
				</view>
				<view class="quotation">
					<view class="coin-name">{{coinPrice.btcPriceName}}</view>
					<view class="number">{{coinPrice.btcPrice}}</view>
				</view>
				<view class="quotation">
					<view class="coin-name">{{coinPrice.ethPriceName}}</view>
					<view class="number">{{coinPrice.ethPrice}}</view>
				</view>
			</view>
		</view>
		<swiper class="adv-pic-wrap" circular :indicator-dots="true" :autoplay="true" :interval="3000" :duration="400"
		 indicator-active-color="rgba(0,0,0,.8)">
			<swiper-item v-for="(item,index) in bannerList"  @tap="jumpTo(item.id,item.jumpType,item.jumpDestination,item.name)">
				<image class="swiper-img" :src="item.img" @error="onImageError('bannerList',index)"></image>
			</swiper-item>
		</swiper>
		<view class="stage stage2">
			<!-- <view class="title"><text class="rela-text">主题活动</text></view>
			<view class="adv">
				<view v-if="i<2" v-for="item,i in buttomAdList" :class="{left:i==0,right:i!=0}">
					<image v-if="i==0" :src="item.img" class="img1" @tap="jumpTo(item.id,item.jumpType,item.jumpDestination,item.name)" mode=""></image>
					<view v-else>
						<image :src="item.img" class="img2" mode="" @tap="jumpTo(item.id,item.jumpType,item.jumpDestination,item.name)"></image>
						<image :src="buttomAdList[i+1].img" class="img2" @tap="jumpTo(buttomAdList[i+1].id,buttomAdList[i+1].jumpType,buttomAdList[i+1].jumpDestination,buttomAdList[i+1].name)" mode=""></image>
					</view>
					
				</view>
			</view> -->
			<view class="get-money">
				<image src="/static/ic_notice_home@2x.png" class="voice" @click="audio=!audio" mode=""></image>
				<view v-for="item,i in coinList" :style="{left:item.left,top:item.top}" @click="activeIt(i,item.id)" class="coin-wrap" :class="{active:item.active}">
					<image src="/static/ic_lovebird@2x.png" class="coin" mode=""></image>
					<view class="money">{{item.amount}}</view>
				</view>
				<!-- <view v-if="loadCoin&&coinList.length==0&&hasLogin" class="coin-wrap product-ing">
					<image src="/static/ic_lovebird@2x.png" class="coin" mode=""></image>
					<view class="money">生息中</view>
				</view> -->
			</view>
		</view>
		<view class="bottom-line">
			<view class="title"><text class="span">我是有底线的</text></view>
		</view>
		<!-- <custom-tabbar :index="0"></custom-tabbar> -->
	<toast-model :message="message" verticalAlign="bottom" ref="toast" :duration="3000"></toast-model>
	</view>
</template>

<script>
	import { mapState } from 'vuex';  
	export default {
		data() {
			return {
				column1:[["/static/ic_assets_icon_money@2x.png","/static/ic_assets_icon_moneyx@2x.png"]],
				message:"",
				carousel: [],
				moduleList:[],
				bannerList:[],
				buttomAdList:[],
				coinList: [],
				classify: [],
				announcementList: [],
				earnList: [],
				coinPrice:{
					
				},
				moveIt:false,
				audio:true,
				loadCoin:false
			}
		},
		onShow() {
			this.getIndex()//获取主要数据
			this.getCoinPrices()//获取实时数字货币价格
			if(this.themeIndex!==""){
				this.column1[0]=this.$Theme[this.themeIndex].index.column1
			}
			this.getInterestInfo()//获取首席数据
			var innerAudioContext = uni.createInnerAudioContext();
			innerAudioContext.autoplay = true;
			innerAudioContext.src = '/static/audio/interest_remove.mp3';
			innerAudioContext.volume=0
			
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
		methods: {
			activeIt(i,id){
				uni.request({
					url: this.$httpUrl("/app/index/holdthecode/reapInterest"),
					data: {
						userId:this.hasLogin?this.userInfo.id:"",
						id:id
					},
					method:"POST",
					header:{
						"content-type":"application/x-www-form-urlencoded",
						token: getApp().globalData.token
					},
					success: (res) => {
						if (res.data.code === 0) {
							if(this.audio){
							var innerAudioContext = uni.createInnerAudioContext();
							innerAudioContext.autoplay = true;
							innerAudioContext.src = '/static/audio/interest_remove.mp3';
							}
							this.coinList[i].active=true
						} else {
							this.message=res.data.msg
							this.$refs.toast.show()
						}
					}
				});
				
			},
			toChangeCoin(){
				this.message="敬请期待"
				this.$refs.toast.show()
			},
			toCharge(){
				if(this.hasLogin){
					this.$toPage('/pages/index/charge')
				}else{
					this.$toPage('/pages/user/login')
				}
			},
			getInterestInfo(){
				if(!this.hasLogin){
					return;
				}
				uni.request({
					url: this.$httpUrl("/app/index/holdthecode/interestInfo"),
					data: {
						userId:this.hasLogin?this.userInfo.id:""
					},
					header:{
						token: getApp().globalData.token
					},
					success: (res) => {
						if (res.data.code === 0) {
							let data=res.data.data
							this.coinPrice=data
							let coinList =data.interestList;
							for (let i = 0; i < coinList.length; i++) {
								let obj = this.getPosition()
								coinList[i] = Object.assign(obj, coinList[i])
							}
							this.coinList = coinList;
							this.loadCoin=true
						} else {
							this.message=res.data.msg
							this.$refs.toast.show()
						}
					}
				});
			},
			toOutSideUrl(url){
				// #ifdef APP-PLUS
				 plus.runtime.openURL(url)  
				 // #endif
				 // #ifdef H5
				  window.open(url,"_blank")  
				  // #endif
			},
			jumpTo(id,jumpType,jumpDestination,name){
				if(jumpType===1){
					this.$toPage(`/pages/common/externalLink?url=${jumpDestination}&title=${name}`)
				}else if(jumpType===3){
					this.$toPage('/pages/mall/index')
				}
			},
			getIndex() {
				uni.request({
					url: this.$httpUrl("/app/index/holdthecode/index"),
					data: {
						userId:this.hasLogin?this.userInfo.id:"",
						version:this.$contextObj.version,
						p13:this.$contextObj.p13
					},
					success: (res) => {
						if (res.data.code === 0) {
							let data=res.data.data
							this.carousel=data.topBannerCapsuleList;
							this.moduleList=data.moduleList
							this.bannerList=data.bannerList
							data.announcementList.forEach((item,i)=>{
								var date=new Date(item.publishTime);
								data.announcementList[i].publishTime=(date.getMonth()+1)+"月"+date.getDate()+"日"
								
							})
							this.announcementList=data.announcementList
							this.buttomAdList=data.buttomAdList
						} else {
							this.message=res.data.msg
							this.$refs.toast.show()
						}
					}
				});
			},
			getCoinPrices() {
				uni.request({
					url: this.$httpUrl("/app/index/holdthecode/getCoinPrices"),
					data: {
					},
					success: (res) => {
						if (res.data.code === 0) {
							let data=res.data.data
							this.coinPrice=data
						} else {
							this.message=res.data.msg
							this.$refs.toast.show()
						}
					}
				});
			},
			getPosition() {
				let left = Math.random() * 650 + 10
				let top = Math.random() * 220 + 10
				return {
					left: left + "rpx",
					top: top + "rpx",
					active:false
				}
			},
			onImageError(key, index, name) {
				// let path='/static/placeholder.png'
				// if(index&&name){//自定义数组格式
				// 	this[key][index][name] = path;
				// }else if(index){//自定义数组
				// 	this[key][index].img = path;
				// }else{//单个图片
				// 	this[key] = path;
				// }
				this[key][index].img = '/static/placeholder.png';
			},
		}
	}
</script>

<style lang="scss">
	@import "../../assets/scss/index.scss"
</style>
