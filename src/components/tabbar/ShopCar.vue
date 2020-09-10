<template>
	<div class="carBox">
		<p v-if="carIsNull">这里空空如也...快到商品区看看有没有喜欢的商品哦...</p>
		<ul>
			<li v-for="item in $store.state.car" :key="item.id">
				<input type="checkbox" v-model="item.selected">
				<img :src="item.img" alt="">
				<router-link :to="'/home/shopping/'+item.id" tag="div">
					<h1>{{item.name.length>16?item.name.slice(0,14)+'...':item.name}}</h1>
					<div class="price">
						<span><strong>￥{{item.price}}</strong></span>
						<span>总价：<strong>￥{{item.price*item.number>=10000?(Math.floor(item.price*item.number/10000 * 100) / 100)+'万':Math.floor(item.price*item.number * 100) / 100}}</strong></span>
					</div>
					<carnumber class="number" :max="item.reserve" :val="item.number" :productId="item.id" :selected="item.selected"></carnumber>
				</router-link>
			</li>
		</ul>
		<div class="selectAll">
			<span @click="selectAll"><input type="checkbox" v-model="isSelectAll"> 全选</span>
			<mt-button class="settlement" type="danger" @click="remove"><span class="glyphicon glyphicon-trash"></span></mt-button>
			<div>
				总计：<strong>￥{{$store.getters.getTotalCost>=10000?(Math.floor($store.getters.getTotalCost/10000 * 100) / 100)+'万':Math.floor($store.getters.getTotalCost * 100) / 100}}</strong>
				<mt-button class="settlement" type="danger" @click="settlement">结算</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	import mui from '../../lib/mui/js/mui.min.js';
	import carnumber from '../shopping/CarNumber.vue';
	import {
		Toast
	} from 'mint-ui';
	export default {
		data() {
			return {
				number: 0,
				isSelectAll: false,
				carIsNull: false
			}
		},
		mounted() {
			// 页面加载后更新一次全选状态
			this.$store.commit('isAllSelect');
			this.isSelectAll = this.$store.state.all;
			if (this.$store.state.car.length == 0) {
				this.carIsNull = true;
			} else {
				this.carIsNull = false;
			}
		},
		methods: {
			getData(data) {
				data.forEach(function(value) {
					this.number = value;
				}, this);
			},
			selectAll() {
				this.isSelectAll = !this.isSelectAll;
				this.$store.commit('allSelect', this.isSelectAll);
			},
			remove() {
				if (this.$store.state.car.length == 0) {
					Toast({
						message: '购物车里空空如也...',
						position: 'middle',
						duration: 2000
					});
				} else {
					this.$store.commit('removeData');
				}
			},
			settlement() {
				if (this.$store.state.car.length == 0) {
					Toast({
						message: '购物车里空空如也...',
						position: 'middle',
						duration: 2000
					});
				} else {
					Toast({
						message: '模块待开发...',
						position: 'middle',
						duration: 2000
					});
				}
			}
		},
		//监听执行
		watch: {
			"$store.state.totalCost": function() {
				//更新是否全选状态
				this.$store.commit('isAllSelect');
				this.isSelectAll = this.$store.state.all;
			},
			"$store.state.car":function(){
				if (this.$store.state.car.length == 0) {
					this.carIsNull = true;
				} else {
					this.carIsNull = false;
				}
			}
		},
		components: {
			carnumber
		}
	}
</script>

<style lang="less" scoped="">
	.carBox {
		padding: 10px 10px;
		padding-bottom: 37px;
		height: 100%;

		.selectAll {
			width: 100%;
			background-color: #fff;
			position: fixed;
			bottom: 49px;
			left: 0;
			padding: 10px 0;
			z-index: 555;
			border-top: 1px solid #ccc;
			border-bottom: 1px solid #ccc;
			font-size: 16px;
			line-height: 27px;
			display: flex;
			justify-content: space-between;

			>div {
				display: inline-block;
				font-size: 16px;
				margin-right: 10px;

				strong {
					color: #ff0000;
				}
			}

			.settlement {
				font-size: 14px;
				line-height: 26px;
				height: 26px;
			}

			input {
				margin-left: 15px;
			}
		}

		>ul {
			padding: 0;
			margin: 0;
			padding-bottom: 98px;

			>li {
				display: flex;
				list-style: none;
				height: auto;
				border: 1px solid #ccc;
				padding: 5px 5px;
				margin-bottom: 10px;
				box-shadow: 2px 2px 2px #ccc;

				>div {
					width: 100%;
					display: flex;
					flex-direction: column;

					h1 {
						font-size: 16px;
						padding: 5px 0;
						margin: 0;
					}

					.price {
						display: flex;
						justify-content: space-between;

						span {
							padding: 5px 0;

							strong {
								color: #ff0000;
							}
						}
					}

					.number {
						padding: 5px 0;
					}
				}

				img {
					border: none;
					width: 91px;
					height: 91px;
					margin: 0 10px;
					background-color: #ccc;
				}
			}
		}
	}
</style>
