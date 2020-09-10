<template>
	<div class="box-container">
		<!-- 顶部 -->
		<mt-header class="header" fixed title="商城">
			<mt-button class="btn" @click="back" slot="left" icon="back" v-if="backBtn">返回</mt-button>
			<router-link to="/" slot="right" v-if="backBtn">
				<mt-button class="btn">首页</mt-button>
			</router-link>
		</mt-header>
		<!-- 中间 -->
		<div ref="div1" class="main-box" id="box">
			<transition>
				<router-view class="main"></router-view>
			</transition>
		</div>

		<!-- 底部菜单 -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-new" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-new" to="/member">
				<span class="mui-icon mui-icon-person"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-new" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span id="mui-badge" class="mui-badge">{{$store.getters.getTotal}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-new" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				oldTopArr: [],
				backBtn: false,
				headMessage: ""
			}
		},
		created() {
			// 判断当前位置是否需要显示返回按钮
			if (this.$route.path == "/home" || this.$route.path == "/member" || this.$route.path == "/shopcar" || this.$route.path ==
				"/search") {
				this.backBtn = false;
			} else {
				this.backBtn = true;
			}
		},
		methods: {
			back() {
				this.$router.go(-1); //返回上一层
			}
		},
		watch: {
			$route: {
				// 监听路由的切换，返回的情况下让滚动条回到原始位置
				// 部分路由要把滚动条拉到最顶，有时候失效
				handler: function(newval, oldVal) {
					if (newval.path == "/home" || newval.path == "/member" || newval.path == "/shopcar" || newval.path == "/search") {
						this.backBtn = false;
					} else {
						this.backBtn = true;
					}
					this.oldTopArr.push(document.getElementById('box').scrollTop);
					if (newval.path.indexOf('/home/newsof/') == 0) {
						document.getElementById('box').scrollTop = 0;
					} else {
						document.getElementById('box').scrollTop = this.oldTopArr[0];
						this.oldTopArr.splice(0, this.oldTopArr.length);
					}
				}
			},
			// 深度观察监听
			deep: true
		},
	}
</script>

<style lang="less" scoped>
	// 方法区
	.pT(@number: 15px) {
		padding-top: @number;
	}
	.box-container {
		.pT(40px);
		height: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		/* Firefox */
		-webkit-box-sizing: border-box;

		/* Safari */
		.header {
			z-index: 9999;

			.btn {
				height: 40px;
				background-color: #26a2ff;
			}
		}
	}

	.main-box {
		height: 100%;
		overflow-x: hidden;
		overflow-y: scroll;
		background-color: #fff;

		.main {
			background-color: #ffffff;
		}
	}

	.v-enter {
		opacity: 0;
		transform: translateX(-100%);
	}

	.v-leave-to {
		opacity: 0;
		transform: translateX(100%);
		position: absolute;
	}

	.v-enter-active,
	.v-leave-active {
		transition: all 0.5s;
	}

	// 由于冲突原因，更换类名
	.mui-bar-tab {
		z-index: 2000;
		.mui-tab-item-new {
			display: table-cell;
			overflow: hidden;
			width: 1%;
			height: 50px;
			text-align: center;
			vertical-align: middle;
			white-space: nowrap;
			text-overflow: ellipsis;
			color: #929292;

			&.mui-active {
				color: #007aff;
			}

			.mui-icon {
				top: 3px;
				width: 24px;
				height: 24px;
				padding-top: 0;
				padding-bottom: 0;
			}

			.mui-icon~.mui-tab-label {
				font-size: 11px;
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
</style>
