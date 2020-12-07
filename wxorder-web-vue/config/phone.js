export default {
	install(Vue) {
		// IOS交互
		Vue.prototype.setupWebViewJavascriptBridge=function(callback) {
			if (window.WebViewJavascriptBridge) {
				return callback(window.WebViewJavascriptBridge);
			}
			if (window.WVJBCallbacks) {
				return window.WVJBCallbacks.push(callback);
			}
			window.WVJBCallbacks = [callback];
			var WVJBIframe = document.createElement("iframe");
			WVJBIframe.style.display = "none";
			WVJBIframe.src = "https://__bridge_loaded__";
			document.documentElement.appendChild(WVJBIframe);
			setTimeout(function() {
				document.documentElement.removeChild(WVJBIframe);
			}, 0);
		},	  
		// 另打开一个页面
		Vue.prototype.linkPhone = function(sendData) {
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
			if (isAndroid) { //安卓
				window.javaInterface.detailContent(JSON.stringify(sendData));
			}else{ //苹果
				this.setupWebViewJavascriptBridge(function(bridge) {
					bridge.registerHandler("testJavascriptHandler", function(data,responseCallback){ //注册
						var responseData = {"Javascript Says": "Right back atcha!"};
						responseCallback(responseData);
					});
					bridge.callHandler("detailContent", sendData,function(response) {
						console.log(response);
					});
				});
			}
		},
		// 跳登入
		Vue.prototype.login = function() {
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
			if(isAndroid){  //安卓
				window.javaInterface.toLogin();
			}else{ //苹果
				this.setupWebViewJavascriptBridge(function(bridge){
					bridge.registerHandler("testJavascriptHandler", function(data,responseCallback){ //注册
						var responseData = {"Javascript Says": "Right back atcha!"};
						responseCallback(responseData);
					});
					bridge.callHandler("toLogin",{},function(response){
						console.log(response);
					});
				});
			}
		},
		// 首页获取用户信息
		Vue.prototype.getUserMessage = function () {
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
			if (isAndroid) {  //安卓
				const userinfo = window.javaInterface.getUserInfo();
				window.localStorage.userinfo = userinfo;
			} else { //苹果
				this.setupWebViewJavascriptBridge(function (bridge) {
					bridge.registerHandler("getUserInfo", function (data, responseCallback) {
						// Toast(JSON.stringify(data));
						window.localStorage.userinfo = JSON.stringify(data);
						// var responseData = { "Javascript Says": "Right back atcha!" };
						responseCallback(data);
					});
					// bridge.callHandler("getUserInfo", {}, function (response) {
					// 	Toast('111');
					// 	Toast(JSON.parse(response));
					// 	// window.localStorage.userinfo = response;
					// });
				});
			}
		},
		// 跳到矩阵页面
		Vue.prototype.focus = function() {
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
			if(isAndroid){  //安卓
				window.javaInterface.toFocus();
			}else{ //苹果
				this.setupWebViewJavascriptBridge(function(bridge){
					bridge.registerHandler("testJavascriptHandler", function(data,responseCallback){ //注册
						var responseData = {"Javascript Says": "Right back atcha!"};
						responseCallback(responseData);
					});
					bridge.callHandler("toFocus",{},function(response){
						console.log(response);
					});
				});
			}
		},
		// 矩阵关注刷新页面
		Vue.prototype.toReload = function(name) {
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
			if(isAndroid){  //安卓
				window.javaInterface.toReload(name);
			}else{ //苹果
				this.setupWebViewJavascriptBridge(function(bridge){
					bridge.registerHandler("testJavascriptHandler", function(data,responseCallback){ //注册
						var responseData = {"Javascript Says": "Right back atcha!"};
						responseCallback(responseData);
					});
					bridge.callHandler("toReload",name,function(response){
						console.log(response);
					});
				});
			}
		}
		// 跳到分享
		Vue.prototype.shareContent = function(sendData) {
			var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
            if(isAndroid){  //安卓
                window.javaInterface.shareContent(JSON.stringify(sendData));
            }else{ //苹果
                this.setupWebViewJavascriptBridge(function(bridge){
					bridge.registerHandler("testJavascriptHandler", function(data,responseCallback){ //注册
						var responseData = {"Javascript Says": "Right back atcha!"};
						responseCallback(responseData);
					});
					bridge.callHandler("shareContent",sendData,function(response) {
						console.log(response);
					});
				});
            }
		}
		// 抖音播放
		Vue.prototype.vedioContent = function(sendData){
			var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;

            if(isAndroid){  //安卓
                window.javaInterface.vedioContent(JSON.stringify(sendData));
            }else{ //苹果
                this.setupWebViewJavascriptBridge(function(bridge) {
					bridge.registerHandler("testJavascriptHandler", function(data,responseCallback){ //注册
						var responseData = {"Javascript Says": "Right back atcha!"};
						responseCallback(responseData);
					});
					bridge.callHandler("vedioContent",sendData,function(response) {
						console.log(response);
					});
				});
            }
		},
		// 发布
		Vue.prototype.releaseContent = function(){
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
			if(isAndroid){  //安卓
				window.javaInterface.toRelease();
			}else{ //苹果
				this.setupWebViewJavascriptBridge(function(bridge){
					bridge.registerHandler("testJavascriptHandler", function(data,responseCallback){ //注册
						var responseData = {"Javascript Says": "Right back atcha!"};
						responseCallback(responseData);
					});
					bridge.callHandler("toRelease",{},function(response){
						console.log(response);
					});
				});
			}
		},// 返回上一级
		Vue.prototype.returnPage = function(){
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
			if(isAndroid){  //安卓
				window.javaInterface.goBack();
			}else{ //苹果
				this.setupWebViewJavascriptBridge(function(bridge){
					bridge.registerHandler("testJavascriptHandler", function(data,responseCallback){ //注册
						var responseData = {"Javascript Says": "Right back atcha!"};
						responseCallback(responseData);
					});
					bridge.callHandler("goBack",{},function(response){
						console.log(response);
					});
				});
			}
		},	
		// 更换标题
		Vue.prototype.changeTitle = function(sendData){
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
			if(isAndroid){  //安卓
				window.javaInterface.changeTitle(sendData);
			}else{ //苹果
				this.setupWebViewJavascriptBridge(function(bridge){
					bridge.registerHandler("testJavascriptHandler", function(data,responseCallback){ //注册
						var responseData = {"Javascript Says": "Right back atcha!"};
						responseCallback(responseData);
					});
					bridge.callHandler("changeTitle",sendData,function(response){
						console.log(response);
					});
				});
			}
		},
		// 交互统一方法
		Vue.prototype.currency=function(title,sendData){
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
			if(isAndroid){  //安卓
				// window.javaInterface.changeTitle(sendData);
				eval("window.javaInterface."+title+"("+sendData+")");
			}else{ //苹果
				this.setupWebViewJavascriptBridge(function(bridge){
					bridge.registerHandler("testJavascriptHandler", function(data,responseCallback){ //注册
						var responseData = {"Javascript Says": "Right back atcha!"};
						responseCallback(responseData);
					});
					bridge.callHandler(title,sendData,function(response){
						console.log(response);
					});
				});
			}
		}
	}
}
	