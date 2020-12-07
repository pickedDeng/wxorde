<template>
	<div id="app" @touchmove.stop="stopMove()">
		<router-view class="routerContent"></router-view>
		<!-- <router-view class="routerTabbar" name="tabbar"></router-view> -->
	</div>
</template>

<script>
export default {
	name: 'App',
	created(){
		
	},
	// mounted() {
	// 	this.$router.push("news");
	// }
	mounted() {},
	methods:{
		stopMove(){
			// alert("11");
		}
	}
}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
		font-family: MicrosoftYaHei;
	}
	a {
		color: #424242
	}
	li {
		list-style: none;
	}

	input:-webkit-autofill {
		-webkit-box-shadow: 0 0 0 1000px white inset;
	}

	html {
		-webkit-overflow-scrolling: touch;
	}
	/* html {
		height: 100%;
	} */
	body {
		max-width: 700px;
		overflow-x: hidden;
		margin: 0 auto;
	}
	body,html{
		width: 100%;
		height: 100%;
	}
	#app {
		font-family: "微软雅宋";
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-size: 14px;
		width: 100%;
		height: 100%;
		color: #353535;
	}
	.routerContent {
		width: 100vw;
		height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
		/* padding-bottom: 50px; */
		box-sizing: border-box;
	}
</style>
