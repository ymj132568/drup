// 导入vue
import Vue from 'vue';
// 导入路由模块
import VueRouter from 'vue-router';
Vue.use(VueRouter);

let router = new VueRouter({
	mode: 'hash', // hash
	routes: [{
			// 默认首页
			path: "/",
			redirect: "/home"
		},
		{
			path: "/home",
			component: () => import('./components//tabbar/Home.vue')
		},
		{
			path: "/member",
			component: () => import('./components/tabbar/Member.vue')
		},
		{
			path: "/shopcar",
			component: () => import('./components/tabbar/ShopCar.vue')
		},
		{
			path: "/search",
			component: () => import('./components/tabbar/Search.vue')
		},
		{
			path: "/home/newslist",
			component: ()=>import('./components/news/NewsList.vue')
		},
		{
			path: "/home/newsof/:id",
			component: ()=>import('./components/news/NewsInof.vue')
		},
		{
			path: "/home/photos",
			component: ()=>import('./components/photos/PhotoList.vue')
		},
		{
			path: "/home/shopping",
			component: ()=>import('./components/shopping/Shopping.vue')
		},
		{
			path: "/home/shopping/:id",
			component: ()=>import('./components/shopping/ProductDetails.vue')
		},
		{
			path: "/member/join",
			component: ()=>import('./components/login/Join.vue')
		}
	],
	scrollBehavior(to, from, savedPosition) {
		return savedPosition || {
			x: 0,
			y: 0
		}
	},
	// 使用一个类名覆盖默认的高亮类
	linkActiveClass: 'mui-active'
});

export default router;
