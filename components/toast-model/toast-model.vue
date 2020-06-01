<template>
	<view>
		<view v-if="showStatus" class="yu-toast-container active" :class="verticalAlign" :style="verticalAlign === 'center' ? verticalCenterStyle : ''">
			<text class="yu-toast-message" :style="messageStyle">{{message}}</text>
		</view>
		<view class="context-shadow" v-if="showConfirm" @tap="showConfirm=false"></view>
		<view class="alert-choose-box btn-default" v-if="showConfirm">
			<view class="box">
				<view class="text">{{message}}</view>
				<view class="btn-group">
					<view class="btn-default btn-confirm" @tap="confirm">确认</view>
					<view class="btn-default btn-confirm btn-cancel" @tap="showConfirm=false">取消</view>
				</view>
			</view>
		</view>
		<view class="context-shadow"  v-if="showBind"  @tap="showBind=false"></view>
		<view class="alert-choose-box" v-if="showBind">
			<view class="box">
				<view class="text">{{message}}</view>
			</view>
			<view class="to-bind" @tap="$toPage('/pages/user/bindExchangeAccount')">去绑定交易所账号</view>
		</view>
		<view class="context-shadow" v-if="showConfirm1" @tap="showConfirm1=false"></view>
		<view class="alert-choose-box btn-default" v-if="showConfirm1">
			<view class="box">
				<view class="text">{{message}}</view>
				<view class="btn-group">
					<view class="btn-default btn-confirm" @tap="confirm">去绑定</view>
					<view class="btn-default btn-confirm btn-cancel" @tap="$back">取消</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'yu-toast',
		props: {
			message: {
				type: String,
				default: ''
			},
			duration: {
				type: Number,
				default: 2000
			},
			verticalAlign: {
				type: String,
				default: 'bottom'
			},
			backgroundColor: {
				type: String,
				default: '#000000'
			},
			color: {
				type: String,
				default: '#FFFFFF'
			}
		},
		data() {
			return {
				showBind:false,
				showStatus: false,
				showConfirm:false,
				showConfirm1:false
			};
		},
		computed: {
			verticalCenterStyle() {
				const value = uni.getSystemInfoSync().screenHeight / 2;
				return `bottom: ${value}px;`;
			},
			messageStyle() {
				return `background-color: ${this.backgroundColor};color: ${this.color};`;
			}
		},
		methods: {
			showConfirmBox1(){
				this.showConfirm1=true
			},
			 showBindBox(){
				 this.showBind=true
			 },
			showConfirmBox(){
				this.showConfirm=true
			},
			confirm(){
				this.$emit('confirm');
				this.showConfirm=false;
			},
			cancel(){
				this.$emit('cancel');
				this.showConfirm=false;
			},
			show() {
				this.showStatus = true;
				setTimeout(() => {
					this.showStatus = false;
				}, this.duration);
			}
		}
	}
</script>
<style>
	.yu-toast-container {
		position: fixed;
		z-index: 9999;
		line-height: 18px;
		opacity: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		left: 0;
	}

	.yu-toast-container.top {
		/* #ifdef H5 */
		top: 88px;
		/* #endif */
		/* #ifndef H5 */
		top: 44px;
		/* #endif */
	}

	.yu-toast-container.bottom {
		bottom: 50px;
	}

	.yu-toast-container.active {
		opacity: 0.8;
	}

	.yu-toast-message {
		padding: 20upx 50upx;
		font-size: 28upx;
		text-align: center;
		border-radius: 6px;
	}
</style>
