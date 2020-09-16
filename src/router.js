import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home/Home.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			redirect: '/article-list'
		},
		{
			path: '/home',
			meta: {
				requiresAuth: true
			},
			name: 'home',
			component: Home,
			children: [{
					path: 'about',
					name: 'about',
					component: () =>
						import('./views/About.vue')
				},
				{
					path: '/article-list',
					name: 'articleList',
					component: () =>
						import('./views/ArticleManage/ArticleList.vue')
				},
				{
					path: '/article-view/:id',
					name: 'articleView',
					component: () =>
						import('./views/ArticleManage/View.vue')
				},
				{
					path: '/userinfo',
					name: 'userinfo',
					component: () =>
						import('./views/User/UserInfo.vue')
				},
			]
		},
		//		{
		//			path: '/about',
		//			name: 'about',
		//			component: () =>
		//				import('./views/About.vue')
		//		},

		{
			path: '/login',
			name: 'login',
			component: () =>
				import('./views/User/Login.vue')
		},
		{
			path: '/signup',
			name: 'signup',
			component: () =>
				import('./views/User/Signup.vue')
		}
	]
})