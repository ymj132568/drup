// 导入vue
import Vue from 'vue';
// 导入vuex
import Vuex from 'vuex';
Vue.use(Vuex);
import {
	Toast
} from 'mint-ui';

// 优先获取本地的数据
const car = JSON.parse(localStorage.getItem('car'));
const userData = JSON.parse(localStorage.getItem('userData'));
const loginUser = JSON.parse(localStorage.getItem('loginUser'));

let store = new Vuex.Store({
	state: {
		// 相当于组件的data，用于存放公共数据
		car: car || [], //购物车的数据
		carouseld:[],//首页轮播图
		userData: userData || [], //用户数据
		userAvailable: true, //用户名是否可用
		phoneNumberAvailable: true, //手机号是否可用
		loginUser: loginUser || [], //正在登录的用户数据
		statusCode: 1000, //登录状态码1000-1003
		productList: [], //保存商品列表的数据,保持渲染状态
		numberOfPages: 1, //请求商品页数
		ballFalg: false, //添加购物车成功则展示动画
		totalCost: 0, //用于监听总价格
		all: false, //是否全选
		searchList: [], //储存被搜索的数据列表
		searchSuccessfulList: [], //搜索成功后的列表
	},
	mutations: {
		// 相当于组件的methods，用于存放公共数据用到的方法
		addToCar(state, obj) {
			let isFlag = false;
			state.car.some(item => {
				if (item.id == obj.id) {
					// 购物车里已经存在的商品并且超出库存则不再添加
					if (parseInt(item.number) >= parseInt(obj.reserve)) {
						Toast({
							message: '超出库存范围了',
							position: 'middle',
							duration: 2000
						});
						isFlag = true;
						return true;
					} else {
						state.ballFalg = !state.ballFalg;
						// 购物车里已经存在的商品加上现在添加的，如果超出范围
						// 把购买数量设置成库存最大值,否则正常添加
						if (parseInt(item.number) + parseInt(obj.number) >= parseInt(obj.reserve)) {
							item.number = parseInt(obj.reserve);
							Toast({
								message: '超出库存范围了',
								position: 'middle',
								duration: 2000
							});
						} else {
							item.number = parseInt(item.number) + parseInt(obj.number);
						}
						isFlag = true;
						return true;
					}
				}
			});
			if (!isFlag) {
				state.ballFalg = !state.ballFalg;
				state.car.push(obj);
			}
			// 每次更新数据后保存至本地
			localStorage.setItem('car', JSON.stringify(state.car));
			isFlag = false;
		},
		getProductList(state, arr) {
			arr.forEach(function(v) {
				state.productList.push(v);
			});
		},
		addNumberOfPages(state) {
			state.numberOfPages++;
		},
		addToCartAnimation(state) {
			state.ballFalg = !state.ballFalg;
		},
		// 更新购物车数据
		modifyShoppingCart(state, productObj) {
			state.car.some(item => {
				if (item.id == productObj.id) {
					item.number = productObj.number;
					// item.selected = productObj.selected;
					// 每次更新数据后保存至本地
					localStorage.setItem('car', JSON.stringify(state.car));
					return true;
				}
			});
		},
		// 更新购物车选中状态
		modifyStatus(state, Obj) {
			state.car.some(item => {
				if (item.id == Obj.id) {
					item.selected = Obj.selected;
					// 每次更新数据后保存至本地
					localStorage.setItem('car', JSON.stringify(state.car));
					return true;
				}
			});
		},
		// 全选按钮
		allSelect(state, select) {
			state.car.some(item => {
				item.selected = select;
			});
			// 每次更新数据后保存至本地
			localStorage.setItem('car', JSON.stringify(state.car));
		},
		// 删除
		removeData(state) {
			if (state.all) {
				state.car.splice(0, state.car.length);
			} else {
				state.car.some((item, v) => {
					if (item.selected) {
						let distId = item.id;
						state.car.some((item, v) => {
							if (item.id == distId) {
								state.car.splice(v, 1);
								return true;
							}
						});
					}
				});
			}
			// 每次更新数据后保存至本地
			localStorage.setItem('car', JSON.stringify(state.car));
		},
		// 更新是否全选
		isAllSelect(state) {
			let isFlag = true;
			state.car.some(item => {
				if (!item.selected) {
					state.all = false;
					isFlag = false;
					return true;
				}
			});
			if (isFlag) {
				state.all = true;
			}
		},
		addToSearchList(state, v) {
			state.searchList.push(v);
		},
		addSearchSuccessfulList(state, v) {
			state.searchSuccessfulList.push(v);
		},
		removeSearchSuccessfulList(state) {
			state.searchSuccessfulList.splice(0, state.searchSuccessfulList.length);
		},
		changeRecruitScrollY(state, recruitScrollY) {
			state.recruitScrollY = recruitScrollY;
		},
		addUser(state, userObj) {
			let isOk = true;
			state.userData.some(item => {
				if (item.account == userObj.account) {
					isOk = false;
					return true;
				}
			});
			if (isOk) {
				state.userData.push(userObj);
			}

			localStorage.setItem('userData', JSON.stringify(state.userData));
		},
		queryUser(state, account) {
			let isOK = true;
			state.userData.some(item => {
				if (item.account == account) {
					isOK = false;
					state.userAvailable = false;
					return false;
				}
			});
			if (isOK) {
				state.userAvailable = true;
			}
		},
		queryPhone(state, phone) {
			let isOK = true;
			state.userData.some(item => {
				if (item.phoneNumber == phone) {
					isOK = false;
					state.phoneNumberAvailable = false;
					return false;
				}
			});
			if (isOK) {
				state.phoneNumberAvailable = true;
			}
		},
		queryLogin(state, account) {
			let isNull=true;
			state.userData.some(item => {
				if ((item.account == account.account || item.phoneNumber == account.account) && item.password == account.password) {
					let d = Toast({
						message: '登陆成功，加载中...',
						position: 'middle',
						duration: -1
					});
					isNull=false;
					state.loginUser[0] = item;
					// 本地保存保持登录状态
					localStorage.setItem('loginUser', JSON.stringify(state.loginUser));
					setTimeout(() => {
						state.statusCode = 1001;
						d.close();
					}, 2000);
					return true;
				} else if (item.account == account.account || item.phoneNumber == account.account) {
					isNull=false;
					state.statusCode = 1002;
					return true;
				}
			});
			if(isNull){
				state.statusCode = 1003;
			}
		},
		removeLogin(state){
			state.statusCode = 1000;
			state.loginUser.splice(0,state.loginUser.length);
			localStorage.setItem('loginUser', JSON.stringify(state.loginUser));
		},
		addCarouseld(state,obj){
			state.carouseld=obj;
		}
	},
	getters: {
		// 相当于组件中的computed计算属性，只要数据更变，就会执行一次涉及
		// 该数据的方法
		getTotal(state) {
			let sum = 0;
			state.car.some(item => {
				if (item.selected) {
					sum += parseInt(item.number);
				}
			});
			return sum;
		},
		getTotalCost(state) {
			let sum = 0;
			state.car.some(item => {
				if (item.selected) {
					sum += item.price * item.number;
				}
			});
			state.totalCost = sum;
			return sum;
		},
		recruitScrollY(state) {
			return state.recruitScrollY;
		}
	}
});

export default store;
