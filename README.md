##本项目中我的学习过程和学习到新知识点的归纳,记录解决问题过程

终端输入 cnpm i / npm i 安装文件
项目根目录终端输入 npm run dev 运行项目
[端口绑定](http://localhost:3000/)

这是一个商城的移动端项目，两个UI框架结合使用，分别是 Mint-ui 和 mui

手机调式："dev": "webpack-dev-server --host 192.168.199.177"

PhotoList组件中遇到的问题：
1、在导入mui.js的时候报错：
原因是严格模式下不能使用这几个方法，只能移出webpack打包的严格模式
cnpm i babel-plugin-transform-remove-strict-mode -D
然后在 .babelrc 文件里加上"plugins": ["transform-remove-strict-mode"] 即可解决

2、上面的问题解决后，发现路由无法正常切换，原因是样式类名 `mui-tab-item` 和App组件中用到的
`mui-control-item` 的冲突问题，其中一个改个名字就行了
但是改名字样式就没了，所以要去把样式拿过来了再改名字
这里我把App组件里的样式类名改成了 `mui-tab-item-new`，现在路由切换正常

图片详情需要用到缩略图插件，安装指令：cnpm i vue-preview -S

商品购买组件引用mui的scroll插件引发的报错：
[Intervention] Ignored attempt to cancel a touchmove event with cancelable=false, for example because scrolling is in progress and cannot be interrupted.
目前没有发现影响使用，查阅资料是监听滑动事件去掉默认行为的异常

商品数据获取完了会报错，获取地址错误，不碍事

3、vue不提倡操作dom元素，但是一些操作dom元素更简单方便的时候，可以使用一下
加入购物车的动画中用到了操作DOM元素

4、使用vuex做数据记录
vuex的概念：
	vuex是vue配套的公共数据管理工具，他可以把一些数据共享，保存到vuex中
	方便整个项目中的任何组件拿到或修改公共数据
	
安装：cnpm i vuex -S
导入：import Vuex from 'vuex';
使用：Vue.use(Vuex);
在main.js里创建一个vuex对象：
let store = new Vuex.Store({
	state:{
		// 相当于组件的data，用于存放公共数据
	},
	mutations:{
		// 相当于组件的methods，用于存放公共数据用到的方法
	},
	getters:{
		// 相当于组件中的computed计算属性，只要数据更变，就会执行一次涉及
		// 该数据的方法
	}
});
获取数据的方法：this.$store.state.**
修改数据可以用 mutations 属性声明的方法进行修改，虽然可以直接在组件修改，但是
不推荐这种做法，因为会导致维护困难，像下面这样，在mutations属性中声明函数来操作数据
mutations:{
	add(state){
		state.**++;
	}
}
调用方法：this.$store.commit('方法名');
mutations属性里的方法只能传2个参数，第一个是传 state ，第二个就是可以自定义的参数
如果需要传入多个参数，就只能传一个对象
接收参数调用方法：this.$store.commit('方法名',唯一的参数);
getters:{
	// 相当于组件中的computed计算属性，只要数据更变，就会执行一次涉及
	// 该数据的方法
}
调用：this.$store.getters.方法名

// 将数据保存到本地
localStorage.setItem('变量名', JSON.stringify(要保存的数据));
// 优先获取本地的数据，没有的时候赋予空数组
const car = JSON.parse(localStorage.getItem('car' || []));
