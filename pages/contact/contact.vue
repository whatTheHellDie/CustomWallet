<template>
	<view class="wrap">
		<view class="navbar sub-nav" >
			<view class="fixed-status-bar"></view>
			<image src="/static/ic_left_dark@2x.png" @tap="$back" class="back" mode=""></image>
			<view class="title">
				生态合约
			</view>
		</view>
		<view class="city-contact">
			<image src="/static/ic_find_banner@2x.png" class="img" mode=""></image>
			<view class="ul">
				<view class="li" @tap="wait">商品投票</view>
				<view class="li active">合约代理</view>
			</view>
			<view class="title">合约代理说明</view>
			<view class="content">生态合约可以用来构建整个城市的商业生态和整个城市的节能物业。用区块链的可信机制来完成去中心化的自制自理城市商业生态化。在构建中（FP代表权益Pay代表支付应用）来实现应用生态流通。拥有生态合约者将来主宰整个城市，一切商业体系的强大利益。</view>
			<view class="btn-default" @tap="wait">立即申请</view>
		</view>
		<toast-model :message="message" verticalAlign="bottom" @confirm="$toPage('/pages/user/bindExchangeAccount')" 
		 ref="toast" :duration="3000"></toast-model>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				message: "",
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'showToastInInit', 'toastInfo'])
		},
		onShow() {
		},
		methods: {
			wait(){
				this.message="敬请期待"
				this.$refs.toast.show()
			}
		}
	}
</script>

<style lang="scss">
	.sub-nav{background: #fff;
		.title{color: #333;}
	}
	.city-contact{
		.img{
		width: 100%;height: 320rpx;display: block;
		}
		.ul{display: flex;justify-content: space-between;padding: 0 22rpx;padding-top: 38rpx;}
		.li{width:344rpx;
height:72rpx;
background:rgba(255,255,255,1);
box-shadow:0px 0px 12px rgba(0,0,0,0.16);
border-radius:10px;display: flex;justify-content: center;align-items: center;font-size: 36rpx;
	&.active{color: #006934;}
}
.title{font-size: 28rpx;font-weight: 800;margin: 34rpx 24rpx 30rpx;}
.content{
	margin: 0 24rpx;
}
.btn-default{background: #006934;color: #fff;height: 76rpx;margin: 272rpx 24rpx 0;border-radius:200rpx;}
	}
</style>
