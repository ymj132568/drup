<template>
	<div id="slider" class="mui-slider">
		<div class="box mui-scroll-wrapper">
			<ul id="mui-scroll"  class="commodity-list mui-scroll">
				<li class="commodity-box" v-for="item in $store.state.productList" :key="item.id">
					<router-link tag="div" :to="'/home/shopping/'+item.id">
						<img :src="item.imgUrl" alt="">
						<div class="details">
							<!-- 标题过长只显示部分 -->
							<h1>{{item.name.length>7?item.name.slice(0,6)+'...':item.name}}</h1>
							<span class="new-price">￥{{item.newPrice}}</span>
							<span class="old-price">￥{{item.oldPrice}}</span>
							<div>
								<span>促销</span>
								<span>已售{{item.sold}}</span>
							</div>
						</div>
					</router-link>
				</li>
				<div>
					<mt-button type="primary" @click="getMoreData" class="btn">加载更多</mt-button>
				</div>
			</ul>
		</div>
	</div>
</template>

<script>
	import mui from '../../lib/mui/js/mui.min.js';
	import {
		Toast
	} from 'mint-ui';
	export default {
		data() {
			return {}
		},
		created() {
			if (this.$store.state.productList.length == 0) {
				this.getData();
			}
		},
		mounted() {
			mui('.mui-scroll-wrapper').scroll({
				scrollY: true, //是否竖向滚动
				scrollX: false, //是否横向滚动
				startX: 0, //初始化时滚动至x
				startY: 0, //初始化时滚动至y
				indicators: false, //是否显示滚动条
				deceleration: 0.0005, //阻尼系数,系数越小滑动越灵敏
				bounce: true //是否启用回弹
			});
		},
		methods: {
			getData() {
				this.$axios.get('./src/static/json/commodity' + this.$store.state.numberOfPages + '.json')
					.then(res => {
						this.$store.commit('getProductList', res.data);
					}).catch(
						(err) => {
							Toast({
								message: '到底了哦',
								position: 'middle',
								duration: 2000
							});
						}
					);
			},
			getMoreData() {
				Toast({
					message: '加载中...',
					position: 'middle',
					duration: 2000
				});
				setTimeout(()=>{
					this.$store.commit('addNumberOfPages');
					this.getData();
				},2000);
			}
		}
	}
</script>

<style lang="less" scoped>
	.mui-slider {
		height: 100%;
		width: 100%;
		touch-action: none;

		.box {
			width: 100%;
			height: 100%;
			display: block;
			overflow-y: scroll;

			.btn {
				width: 100%;
				margin-top: 10px;
				margin-bottom: 5px;
			}

			.commodity-list {
				width: 100%;
				list-style: none;
				margin: 0;
				padding: 0 10px;
				padding-bottom: 50px;

				.commodity-box {
					width: 49%;
					display: inline-block;
					border: 1px solid #eee;
					box-shadow: 2px 2px 2px #ccc;
					min-height: 298px;
					margin-top: 5px;
					vertical-align: middle;

					>div {
						width: 100%;
						min-height: 298px;
						background-color: #fff;
						padding: 1px;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						>img {
							max-width: 100%;
							border: none;
							background-image: url(../../static/images/imgErr.jpeg);
							background-size: 90% 90%;
							background-repeat: no-repeat;
						}

						.details {
							padding: 5px 10px;
							background-color: #eee;

							.new-price {
								font-size: 18px;
								font-weight: 700;
								color: #FF0000;
							}

							>h1 {
								font-size: 16px;
								color: #000;
								margin: 0;
								margin-bottom: 10px;
							}

							.old-price {
								font-size: 12px;
								font-weight: 400;
								color: #666;
								text-decoration: line-through;
							}

							>h1 {
								height: 14px
							}

							>div {
								font-size: 14px;
								color: #333;
								display: flex;
								justify-content: space-between;
							}
						}
					}
				}
			}
		}

	}
</style>
