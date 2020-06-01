import Vue from 'vue'
import store from './store'
import App from './App'
import './js_sdk/ican-clipBoard/ican-clipBoard.js'


import SubNav from './components/sub-nav/sub-nav.vue'
Vue.component('sub-nav',SubNav)
import MallNav from './components/mall-nav/mall-nav.vue'
Vue.component('mall-nav',MallNav)
// import CustomTab from './components/custom-tabbar/custom-tabbar.vue'
// Vue.component('custom-tabbar',CustomTab)

import ToastModel from './components/toast-model/toast-model.vue'
Vue.component('toast-model',ToastModel)
// import { http } from '@/utils/luch-request/index.js' // 全局挂载引入，配置相关在该index.js文件里修改
// Vue.prototype.$http = http

Vue.config.productionTip = false
Vue.prototype.$message ="";
Vue.prototype.$back=()=>{
				//#ifdef H5
					window.history.go(-1)
				//#endif
				//#ifdef APP-PLUS
					uni.navigateBack()
				//#endif
				
			}
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
let contextObj;
if(process.env.NODE_ENV==="development"){
	contextObj={
		contextUrl:"http://192.168.10.8:8084",
	}
}else{
	contextObj={
		contextUrl:"http://112.74.180.75:8084",
		// contextUrl:"http://192.168.10.8:8084",
	}
}
contextObj=Object.assign(
	{
		p13:"zh",
		version:"1.0.1"
	},
	contextObj)
let httpUrl=(name)=>{
	return contextObj.contextUrl+name
}

Vue.prototype.$contextObj = contextObj;
Vue.prototype.$httpUrl = httpUrl;
Vue.prototype.$toPage = (url)=>{
	
		uni.navigateTo({url:url})
} 
Vue.prototype.$toPage1 = (url)=>{
	uni.navigateTo({url:url,animationType: 'none',})
} 
import Theme from "@/utils/theme.js"
Vue.prototype.$Theme = Theme
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()



// if(HoldingSDK.isLogin()){
//             params.put("userId", HoldingSDK.getUserInfo().getUserId());
//         }
//         // 手机型号
//         params.put("p1", android.os.Build.MODEL);
//         // os版本
//         params.put("p2", android.os.Build.VERSION.RELEASE);
//         //平台
//         params.put("p3", "Android");
//         // 版本号
//         params.put("p4", AppUtil.getVersionName(mContext.getApplicationContext()) + "");
//         //  运营商号码
//         params.put("p5", PhoneUtil.getNetworkCountryCode(mContext));
//         //  渠道
//         params.put("p6", PhoneUtil.getAppChannel(mContext));
//         // 分辨率
//         params.put("p7", PhoneUtil.getResolution(mContext));
//         // IMEI号
//         params.put("p8", PhoneUtil.getIMEI(mContext));
//         // 为lng   经度
//         params.put("p9", "");
//         // 为lat   纬度
//         params.put("p10", "");
//         if(HoldingSDK.isLogin()){
//             // 用户id，user_id
//             params.put("p11", HoldingSDK.getUserInfo().getUserId());
//             // access_token
//             params.put("p12", "");
//         }
//         params.put("p13", "zh");