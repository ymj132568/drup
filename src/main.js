import './css/index.less';
import './lib/bootstrap/css/bootstrap.min.css';
import Vue from 'vue';
import 'babel-polyfill';
// 路由模块
import router from './router.js';
// vuex
import store from './store.js';
// axios
import axios from 'axios';
Vue.prototype.$axios = axios;
// Lazyload
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload);

// ui组件
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);

import app from './App.vue';

window.onload = function() {
	let vm = new Vue({
		el: '#app',
		data: {},
		render: c => c(app),
		mounted() {

		},
		router,
		store
	});
};
