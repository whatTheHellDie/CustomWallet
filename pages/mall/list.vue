<template>
  <view>
    <view class="search-box search-box1">
      <img src="/static/ic_arrowleft@2x.png" alt="" class="back" @tap="$back" />
      <input type="text" ref="inputBox" class="input" v-model="name" :placeholder="placeholder" />
      <img src="/static/ic_mall_search@2x.png" class="img" alt="search" />
      <view class="text" @tap="searchKeyword">搜索</view>
  </view>
  <view class="choose-brand maybe-like list-chose">
    <view class="ul">
      <view class="li" v-if="like.length>0" v-for="item in like" @tap="toDetail(item.id)">
        <img :src="item.productImgUrl" class="img" alt="商品" />
        <view class="text">{{item.productName}}</view>
        <view class="price">
          <img :src="item.currency" class="coin" alt="" /><span class="money">{{item.price}}</span>
        </view>
      </view>
    </view>
	
  </view>
  <view class="no-data no-item" v-if="noData">
  	<image src="/static/ic_data_nor.png" class="img" mode=""></image>
  	<view class="view">暂无数据</view>
  </view>
  <toast-model :message="message" verticalAlign="bottom" ref="toast" :duration="3000"></toast-model>
  </view>
</template>

<script>
  export default {
    data() {
      return {
		  brandId:"",
		  message:"",
        like:[],
		name:"",
		classifyId:"",
		isFinish:false,
		placeholder:"搜索商品",
		PageTotal:"",
		pageNum:1,
		noData:false
      }
    },
	onLoad(option) {
		if(option.keyword){
			this.name=option.keyword;
			this.searchKeyword()
		}
		if(option.classifyId){
			this.placeholder=option.name;
			this.classifyId=option.classifyId
			this.getCategoryList()
		}
		if(option.brandId){
			this.brandId=option.brandId;
			this.getBrandList()
		}
	},
	onReachBottom(){
		if(!this.noData){
			if(this.placeholder!="搜索商品"){
				this.pageNum+=1;
				this.getCategoryList()
			}else if(!this.brandId){
				
			}else{
				this.pageNum+=1;
				this.searchKeyword()
			}
		}
	},
    methods: {
		getBrandList (){
			uni.request({
				url: this.$httpUrl("/app/index/product/list"),
				data: {
					brandId:this.brandId,
				},
				method:"POST",
				header:{
					"content-type":"application/x-www-form-urlencoded",
						token: getApp().globalData.token
				},
				success: (res) => {
					if (res.data.code === 0) {
						var data=res.data.data
						data.forEach((item,i)=>{
							item.currency=item.currency==1?
							'/static/ic_coin_big.png':'/static/ic_btc_identification.png';
							if(!item.productImgUrl){
								item.productImgUrl='/static/placeholder.png'
							}
							this.like.push(item)
						})
						if(this.pageNum===1&&data.length==0){
							this.noData=true
						}
					} else {
						this.message=res.data.msg
						this.$refs.toast.show() 
					}
				}
			});
		},
		searchKeyword(e){
			if(e){
				this.pageNum=1;
				this.like=[]
			}
			this.noData=false;
			this.placeholder="搜索商品"
			uni.request({
				url: this.$httpUrl("/app/index/mall/search"),
				data: {
					keyword:this.name,
					pageNum:this.pageNum,
					pageSize:20,
				},
				method:"POST",
				header:{
					"content-type":"application/x-www-form-urlencoded",
						token: getApp().globalData.token
				},
				success: (res) => {
					if (res.data.code === 0) {
						var data=res.data.data
						data.productList.forEach((item,i)=>{
							item.currency=item.currency==1?
							'/static/ic_coin_big.png':'/static/ic_btc_identification.png';
							if(!item.productImgUrl){
								item.productImgUrl='/static/placeholder.png'
							}
							this.like.push(item)
						})
						if(this.pageNum===1&&data.productList.length==0){
							this.noData=true
						}
					} else {
						this.message=res.data.msg
						this.$refs.toast.show()
					}
				}
			});
		},
		toDetail(id){
			this.$toPage(`/pages/mall/detail?id=${id}`)
		},
		getCategoryList(){
			uni.request({
				url: this.$httpUrl("/app/index/mall/search"),
				data: {
					categoryId:this.classifyId,
					pageNum:this.pageNum,
					pageSize:20
				},
				method:"POST",
				header:{
					"content-type":"application/x-www-form-urlencoded",
						token: getApp().globalData.token
				},
				success: (res) => {
					if (res.data.code === 0) {
						var data=res.data.data
						data.productList.forEach((item,i)=>{
							item.currency=item.currency==1?
							'/static/ic_coin_big.png':'/static/ic_btc_identification.png';
							if(!item.productImgUrl){
								item.productImgUrl='/static/placeholder.png'
							}
							this.like.push(item)
						})
						if(this.pageNum===1&&data.productList.length==0){
							this.noData=true
						}
					} else {
						this.message=res.data.msg
						this.$refs.toast.show() 
					}
				}
			});
		}
	}
  }
</script>

<style lang="scss">
@import "../../assets/scss/mall.scss";
page{background: #fff;}
</style>