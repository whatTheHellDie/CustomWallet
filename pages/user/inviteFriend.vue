<template>
	<view class="wrap">
		<view class="navbar sub-nav" >
			<view class="fixed-status-bar"></view>
			<image src="/static/ic_left_dark@2x.png" @tap="$back" class="back" mode=""></image>
			<view class="title">
				邀请好友
			</view>
			<view class="text" :style="{color:'#333'}" @click="share"><image src="/static/shareIcon.png" class="share-icon" mode=""></image></view>
		</view>
		<view class="invite-friend">
			<image src="/static/inviteFriend.png" class="img" mode=""></image>
			<tki-qrcode
			 class="qrcode"
			  ref="qrcode"
			  :val="address"
			  :size="305"
			  unit="upx"
			  :onval="true"
			  :loadMake="true"
			  :showLoading="false"
							v-if="load"
							:icon="icon"
							:iconSize="iconsize"
							:usingComponents="true"
							
			   />
		</view>
		<!-- <div class="fans clearfix">
		      <div class="li active"><image src="/static/ic_fan_purple@2x.png" class="img"/>我的粉丝</div>
		      <div class="li"><image src="/static/ic_ranking_list_nor@2x.png" class="img"/>排行榜</div>
		    </div> -->
		<toast-model :message="message" verticalAlign="bottom" 
		 ref="toast" :duration="3000" @confirmx="copyAddress"></toast-model>
		 <toast-model :message="message1" verticalAlign="bottom"
		  ref="toast1" :duration="3000" @confirmx="copyAddress"></toast-model>
	</view>
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue";
	import NativeShare from '@/utils/NativeShare.js'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components:{
			tkiQrcode
		},
		data() {
			return {
				message: "",
				message1: "",
				address:"",
				load:false,
				icon:'/static/logo.png',
				iconsize:30
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'showToastInInit', 'toastInfo'])
		},
		onLoad() {
			this.getAddress()
		},
		watch:{
			userInfo(){
				this.getAddress()
			}
		},
		methods: {
			copyAddress(){
				uni.setClipboardData({ data:window.location.protocol+"//"+window.location.host+"/pages/user/register?userNumber="+getApp().globalData.userNumber, success:(data)=>{
					this.message1="复制成功"
					this.$refs.toast1.show()
				}, fail:function(err){
					this.message="复制失败，您的浏览器不支持自动复制，请长按地址复制"
					this.$refs.toast.show()
				}, complete:function(res){} })
			},
			share(){
				console.log(window.location.protocol+"//"+window.location.host+"/pages/user/register?userNumber="+getApp().globalData.userNumber)
				// 先创建一个实例
				var nativeShare = new NativeShare()
				// 如果你需要在微信浏览器中分享，那么你需要设置额外的微信配置
				// 特别提示一下微信分享有一个坑，不要分享安全域名以外的链接(具体见jssdk文档)，否则会导致你配置的文案无效
				// 创建实例应该带参数
				var nativeShare = new NativeShare({
				    wechatConfig: {
				        appId: '',
				        timestamp: '',
				        nonceStr: '',
				        signature: '',
				    },
				  	// 让你修改的分享的文案同步到标签里，比如title文案会同步到<title>标签中
					// 这样可以让一些不支持分享的浏览器也能修改部分文案，默认都不会同步
				  	syncDescToTag: false,
				  	syncIconToTag: false,
				  	syncTitleToTag: false,
				})
				
				// 你也可以在setConfig方法中设置配置参数
				nativeShare.setConfig({
				    wechatConfig: {
				        appId: '',
				        timestamp: '',
				        nonceStr: '',
				        signature: '',
				    }
				})
				
				
				// 设置分享文案
				nativeShare.setShareData({
				    icon: this.$httpUrl("/static/logo.png"),
				    link: window.location.protocol+"//"+window.location.host+"/pages/user/register?userNumber="+getApp().globalData.userNumber,
				    title: 'Tree Bank',
				    desc: 'Tree Bank邀请注册',
				    from: '@fa-ge',
				})
				
				// 唤起浏览器原生分享组件(如果在微信中不会唤起，此时call方法只会设置文案。类似setShareData)
				try {
					nativeShare.call()
				    // 如果是分享到微信则需要 nativeShare.call('wechatFriend')
				    // 类似的命令下面有介绍
				} catch(err) {
					if(err.toString()=="Error: the browser may not support command default!"){
						this.message="该浏览器不支持自动分享，请长按手动复制分享地址分享 "+window.location.protocol+"//"+window.location.host+"/pages/user/register?userNumber="+getApp().globalData.userNumber
						this.$refs.toast.showConfirmBox2()
						return;
					}
					if(err.toString()=="ReferenceError: browser is not defined"){
						this.message="浏览器开小差，请稍候再试"
						this.$refs.toast.show()
						return;
					}
				  // 如果不支持，你可以在这里做降级处理
				  this.message="该浏览器不支持自动分享，请长按手动复制 "+window.location.protocol+"//"+window.location.host+"/pages/user/register?userNumber="+getApp().globalData.userNumber+
				  "。 失败原因："+err
				  this.$refs.toast.showConfirmBox2()
				}
			},
			getAddress(){
				setTimeout(()=>{
					this.address=window.location.protocol+"//"+window.location.host+"/pages/user/register?userNumber="+getApp().globalData.userNumber;
					this.load=true
					console.log(this.address)
				},200)
			}
		}
	}
</script>

<style lang="scss">
	.wrap{padding-bottom: 82rpx;}
	.sub-nav{background: #fff;
		.title{color: #333;}
	}
	.invite-friend{
		.img{
		width: 100%;height: 1206rpx;display: block;
		}
		.qrcode{position: absolute;top: 442rpx;left: 224rpx;}
	}
	.share-icon{width: 46rpx;height: 44rpx;position: relative;top: -4rpx;}
	.fans {
	  position: fixed;
	  bottom: 0;
	  left: 0;
	  width: 100%;
	  background: #fff;
	}
	
	.fans .li {
	  height: 82rpx;
	  font-size: 27rpx;
	  line-height: 82rpx;
	  float: left;
	  width: 50%;
	  text-align: center;
	  max-height: 9999px;position: relative;
	}
	
	.fans .li:first-child:after {
	  content: '';
	  width: 2px;
	  height: 48rpx;
	  position: absolute;
	  right: -1px;
	  top: 19rpx;
	  background: rgba(240, 240, 240, 1);
	}
	.fans .li.active{color: $font-color-spec;}
	.fans .img {
	  width: 37rpx;
	  height: 37rpx;
	  margin-right: 10rpx;
	  display: inline-block;
	  vertical-align: -6rpx;
	}
</style>
