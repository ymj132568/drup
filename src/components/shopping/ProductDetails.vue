<template>
	<div class="product-container">
		<div class="nav">
			<ul>
				<li @click="show=1" :class="[show==1?'selected':'']">宝贝信息</li>
				<li @click="show=2" :class="[show==2?'selected':'']">宝贝详情</li>
				<li @click="show=3" :class="[show==3?'selected':'']">宝贝评价</li>
			</ul>
		</div>
		<div class="product-box" v-show="show==1">
			<div class="mui-card card1">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<img :src="productObj.imgUrl" alt="">
					</div>
				</div>
			</div>
			<div class="mui-card card2">
				<div class="mui-card-header">
					<h1>{{productObj.name}}</h1>
				</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<div class="price">
							<span>市场价：<del>￥{{productObj.oldPrice}}</del></span>
							<span>销售价：<strong>￥{{productObj.newPrice}}</strong></span>
						</div>
						<div>
							<span>购买数量：</span>
							<numberbox :max="productObj.reserve" @getData="getData"></numberbox>
						</div>
						<div>
							<mt-button class="btn2" type="primary">立即购买</mt-button>
							<mt-button class="btn2" type="danger" @click="addToShopCar">加入购物车</mt-button>
						</div>
					</div>
				</div>
			</div>

			<div class="mui-card card3">
				<div class="mui-card-header">
					<h1>商品参数</h1>
				</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品id：{{productObj.id}}</p>
						<p>已售：{{productObj.sold}}</p>
						<p>库存：{{productObj.reserve}}</p>
					</div>
				</div>
			</div>
		</div>
		<div v-if="show==2" class="details">
			<h1>参数信息</h1>
		</div>
		<div v-else-if="show==3" class="comment">
			<h1>宝贝评价</h1>
		</div>

		<transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
			<div class="ball" ref="ball" id="ball" v-show="$store.state.ballFalg">1</div>
		</transition>
	</div>
</template>

<script>
	import {
		Toast
	} from 'mint-ui';
	import mui from '../../lib/mui/js/mui.min.js';
	import numberbox from './ProductNumber.vue';
	export default {
		components: {
			numberbox
		},
		data() {
			return {
				productObj: {},
				show: 1,
				addCarNumber: 1,
				is_click:false
			}
		},
		created() {
			this.getProductData();
		},
		mounted() {
			mui(".mui-numbox").numbox();
		},
		methods: {
			getProductData() {
				if (parseInt(this.$route.params.id) <= 5) {
					let i = parseInt(this.$route.params.id) - 1;
					this.$axios.get('./src/static/json/commodity1.json')
						.then(res => {
							this.productObj = res.data[i];
						}).catch(
							(err) => {
								Toast({
									message: '获取数据失败',
									position: 'top',
									duration: 2000
								});
							}
						);
				} else if (parseInt(this.$route.params.id) <= 10) {
					let i = parseInt(this.$route.params.id) - 6;
					this.$axios.get('./src/static/json/commodity2.json')
						.then(res => {
							this.productObj = res.data[i];
						}).catch(
							(err) => {
								Toast({
									message: '获取数据失败',
									position: 'top',
									duration: 2000
								});
							}
						);
				} else {
					let i = parseInt(this.$route.params.id) - 11;
					this.$axios.get('./src/static/json/commodity3.json')
						.then(res => {
							this.productObj = res.data[i];
						}).catch(
							(err) => {
								Toast({
									message: '获取数据失败',
									position: 'top',
									duration: 2000
								});
							}
						);
				}
			},
			addToShopCar() {
				if(this.is_click){
				       return false;
				}
				let data = {
					id: parseInt(this.productObj.id),
					name: this.productObj.name,
					img:this.productObj.imgUrl,
					price: this.productObj.newPrice,
					number: this.addCarNumber,
					reserve:this.productObj.reserve,
					selected: true
				};
				this.$store.commit('addToCar', data);
				
				this.is_click=true;
				setTimeout(()=>{
				      this.is_click=false;
				},600);
			},
			beforeEnter(el) {
				// 动画开始的时候
				el.style.transform = 'translate(0,0)';
			},
			enter(el, done) {
				// 动画的过程
				el.offsetWidth;
				const carTop = document.querySelector("#mui-badge").getBoundingClientRect().top;
				const carLeft = document.querySelector("#mui-badge").getBoundingClientRect().left;
				const elTop = document.querySelector("#ball").getBoundingClientRect().top;
				const elLeft = document.querySelector("#ball").getBoundingClientRect().left;
				el.style.transform = 'translate(' + (carLeft - elLeft) + 'px,' + (carTop - elTop) + 'px)';
				el.style.transition = 'all 0.5s cubic-bezier(0.1,-0.3,1,0.68)';
				done();
			},
			afterEnter(el) {
				this.$store.commit('addToCartAnimation');
			},
			getData(data) {
				data.forEach(function(value) {
					this.addCarNumber = value;
				}, this);
			}
		},
		watch: {
			number: function() {
				console.log(this.number)
			}
		}
	}
</script>

<style lang="less" scoped>
	.product-container {
		padding-bottom: 50px;
		position: relative;

		.ball {
			display: inline-block;
			position: absolute;
			top: 530px;
			left: 172px;
			min-width: 18px;
			height: 20px;
			line-height: 20px;
			font-size: 12px;
			text-align: center;
			border-radius: 50%;
			color: #fff;
			background-color: #ff0000;
			z-index: 15;
		}

		.nav {
			background-color: #fff;
			width: 100%;
			z-index: 50;
			border-bottom: 1px solid #ccc;
			margin-bottom: 5px;

			>ul {
				list-style: none;
				padding: 0 10px;
				margin: 5px 0;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;

				>li {
					padding: 10px 15px;
					border-radius: 41px;

					&.selected {
						background-color: bisque;
					}
				}
			}
		}

		.mui-card {
			margin-top: 0;
		}

		.card1 {
			height: 361px;
			text-align: center;
			background-color: #fff;

			img {
				max-width: 361px;
				max-height: 361px;
			}
		}

		.card2 {
			.mui-card-header {
				>h1 {
					font-size: 16px;
				}
			}

			.mui-card-content {
				.mui-card-content-inner {
					.price {

						// display: block;
						span {
							font-size: 14px;

							&:first-child {
								color: #666;
								margin-right: 20px;
							}

							&:last-child {
								>strong {
									font-size: 18px;
									color: #ff0000;
								}
							}
						}
					}

					>div {
						padding: 5px 0;
						.btn2{
							height:30px;
							font-size: 18px;
							line-height: 30px;
						}
					}
				}
			}
		}

		.card3 {
			color: #000;

			.mui-card-header {
				>h1 {
					font-size: 16px;
				}
			}
		}

		.details,
		.comment {
			padding: 0 10px;
		}
	}
</style>
