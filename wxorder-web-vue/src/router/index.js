import Vue from 'vue'
import Router from 'vue-router'
// import home from '../components/home/route'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: '/',
			components: {
				default: () => import('../components/consumer/Authentication'),
			},
		}, {
			path: '/form',
			name: '/Form',
			components: {
				default: () => import('../components/consumer/Form'),
			},
		}, {
			path: '/clientDetail',
			name: '/ClientDetail',
			components: {
				default: () => import('../components/consumer/ClientDetail'),
			},
		}, {
			path: '/serveIndex',
			name: '/ServeIndex',
			components: {
				default: () => import('../components/serve/ServeIndex'),
			},
		}, {
			path: '/historyForm',
			name: '/HistoryForm',
			components: {
				default: () => import('../components/serve/HistoryForm'),
			},
		}, {
			path: '/serveDetail',
			name: '/ServeDetail',
			components: {
				default: () => import('../components/serve/ServeDetail'),
			},
		}, {
			path: '/finishedForm',
			name: '/FinishedForm',
			components: {
				default: () => import('../components/serve/FinishedForm'),
			},
		}, {
			path: '/staffregister',
			name: '/Staffregister',
			components: {
				default: () => import('../components/serve/StaffRegister'),
			},
		},
	]
})