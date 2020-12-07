import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'vant/lib/index.css';
import Vant from 'vant';
import 'vant/lib/index.css';
import { Toast } from 'vant';
Vue.use(Vant);

axios.defaults.baseURL = "http://192.168.31.182:3001/"//服务端前缀;
axios.defaults.headers.post["Content-Type"] = "application/json";
Vue.prototype.webPrefix = "http://192.168.31.182:8080";//微信回调前缀
Vue.config.productionTip = false
Vue.prototype.Toast = Toast;
Vue.prototype.APPID = "wxbaf57552c144dd07";// 测试号appid
// async function getAPPId(){
// 	const res = await axios.get(`sysconfig/getValue?name=APPID`);
// 	Vue.prototype.APPID = res.data.data;
// }

// getAPPId();//挂载APPID


// 主题色 // 图音影接口拼接头
Vue.prototype.styleBox = {
	backgroundColor: { //带背景字体
		background: '#D13A29',
		color: '#fff'
	},
	fontStyle: { //字体
		color: "#D13A29"
	},
	backOne: { //背景
		background: '#D13A29',
	},
	colorAll: "#D13A29",
}


// axios
Vue.prototype.$http = axios

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
