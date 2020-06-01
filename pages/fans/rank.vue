<template>
	<view class="wrap">
		<sub-nav title="排行榜"></sub-nav>
	<view class="top">
	      <view class="title">排行榜</view>
	      <view class="content">2019-01-01开始统计排名，<br/>越靠前奖励越多！</view>
	      <image src="/static/ic_ic_bg_list_no@2x.png" alt="" class="img" />
	    </view>
	    <table class="invite-table" border="0" cellspacing="0" cellpadding="0">
	      <tr><th width="15%">排名</th><th width="51%">用户名</th><th width="34%">邀请人数</th></tr>
	      <tr><td><view class="award"><image src="/static/ic_no1@2x.png" alt="" class="img" /></view></td><td>*飞舞</td><td>50</td></tr>
	      <tr><td><view class="award"><image src="/static/ic_no2@2x.png" alt="" class="img" /></view></td><td>*飞舞</td><td>40</td></tr>
	      <tr><td><view class="award"><image src="/static/ic_no3@2x.png" alt="" class="img" /></view></td><td>*飞舞</td><td>30</td></tr>
	      <tr><td>4</td><td>*飞舞</td><td>500000</td></tr>
	    </table>
		</view>
</template>

<script>
</script>

<style>
	.wrap{background: #fff;}
	.top{
	height:170rpx;
	background:#006934;
	color: #fff;padding-left: 27rpx;
	}
	.top .title{font-size: 34rpx;margin:0 0 07rpx 0;padding-top: 22rpx;}
	.top .img{width: 174rpx;height: 159rpx;position: absolute;right: 65rpx;top: 0;}
	.fans {
	  width: 100%;
	  background: #fff;
	}
	
	.fans .li {
	  height: 77rpx;
	  font-size: 27rpx;
	  line-height: 77rpx;
	  float: left;
	  width: 50%;
	  text-align: center;
	  max-height: 9999px;position: relative;
	}
	
	.fans .li:first-child:after {
	  content: '';
	  width: 2px;
	  height: 38rpx;
	  position: absolute;
	  right: -1px;
	  top: 20rpx;
	  background: rgba(240, 240, 240, 1);
	}
	.fans .li.active{color: #006934;font-weight: 800;}
	.fans .img {
	  width: 31rpx;
	  margin-right: 5px;
	  display: inline-block;
	  vertical-align: -06rpx;
	}
	.fans .li.active .span{padding: 0 14rpx;display: inline-block;padding: 0 14rpx;height: 74rpx;border-bottom: 03rpx solid #006934;}
	.invite-table{
	  width:100% ;position: relative;
	  
	}
	.invite-table th{background: rgba(247,244,248,1);height: 75rpx;line-height: 75rpx;color:rgba(101,101,101,1);font-weight: normal;}
	.invite-table td{text-align: center;height: 85rpx;line-height: 85rpx;border-bottom: 2px solid rgba(240,240,240,1);;}
	.award{position: relative;width: 38rpx;height: 47rpx;line-height: 47rpx;margin-top: 19rpx;margin: 0 auto;}
	.award .img{position: absolute;top: 0;left: 0;width: 44rpx;height: 55rpx;}
	
	.my-fans-bg{position: absolute;top: 0;left: 0;width: 100%;}
	
	.fans-edu-wrap{padding-top: 17rpx;}
	.fans-edu{
	  background: #fff;position: relative;width: 585rpx;margin: 0 auto;box-shadow:0px 5px 10px rgba(51,51,51,0.1);
	opacity:1;
	border-radius:1rpx;
	
	}
	.fans-edu .li{height: auto;}
	.fans-edu .number{display:block;color:rgba(116,26,222,1);font-size: 31rpx;line-height: 31rpx;padding-top: 27rpx;padding-bottom: 12rpx;}
	.fans-edu .info{line-height: 34rpx;padding-bottom: 26rpx;}
	.all-fans{margin-right: 1rpx;width: 26rpx;vertical-align: -04rpx;}
	.fans-three {margin-top: 12rpx;border-bottom: 17rpx solid rgba(240,240,240,1);}
	.fans-three .li{width:33% ;}
	.fans-three .li:first-child:after{display: none;}
	.fans-list{margin-bottom: 43rpx;}
	.fans-list .li{padding: 17rpx 27rpx;border-bottom: 1px solid rgba(240,240,240,1);}
	.fans-list .tou{
	  width: 68rpx;
	  height: 68rpx;
	  padding: 0 27rpx 0  ;
	}
	.in-b{vertical-align: top;display: inline-block;}
	.fans-list .infomation{font-size:27rpx;line-height: 38rpx;width: 3rpx;vertical-align: top;display: inline-block;}
	.fans-list .name{font-weight: 800;}
	.fans-list .card{margin-top: 05rpx;font-weight: normal;margin-left: 17rpx;padding: 0 19rpx;height: 27rpx;line-height: 27rpx;border-radius:17rpx;background:rgba(190,201,213,1);color: #fff;text-align: center;}
	.fans-list .time{float: right;margin-top: 17rpx;}
	.fans-list .number{line-height: 34rpx;margin-top: 03rpx;}
	.nodata{
	  text-align: center;
	  margin-top: 1rpx;
	}
	.nodata .img{width: 354rpx;}
	.nodata .text{color: #999;font-size: 34rpx;margin-top: 20rpx;font-weight: normal;}
</style>
