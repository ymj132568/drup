<template>
	<div class="box">
		<mt-swipe @change="handleChange" class="carouseld-box">
			<mt-swipe-item class="carouselds" v-for="item in $store.state.carouseld" :key="item.id">
				<router-link tag="a" :to="'/home/shopping/'+item.id">
					<img :src="item.imgUrl" :alt="item.name">
				</router-link>
			</mt-swipe-item>
		</mt-swipe>
		<div class="mui-content">
			<ul class="mui-table-view mui-grid-view mui-grid-9">
				<li class="mui-table-view-cell mui-media mui-col-xs-4">
					<router-link tag="a" to="/home/newslist">
						<img src="../../static/images/menu1.png" alt="">
						<div class="mui-media-body">新闻资讯</div>
					</router-link>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4">
					<router-link tag="a" to="/home/photos">
						<img src="../../static/images/menu2.png" alt="">
						<div class="mui-media-body">店面预约</div>
					</router-link>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4">
					<router-link tag="a" to="/home/shopping">
						<img src="../../static/images/menu3.png" alt="">
						<div class="mui-media-body">商品购买</div>
					</router-link>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4">
					<a @click="prompt" href="javascript:0;">
						<img src="../../static/images/menu4.png" alt="">
						<div class="mui-media-body">留言反馈</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4">
					<a @click="prompt" href="javascript:0;">
						<img src="../../static/images/menu5.png" alt="">
						<div class="mui-media-body">视频社区</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4">
					<a @click="prompt" href="javascript:0;">
						<img src="../../static/images/menu6.png" alt="">
						<div class="mui-media-body">联系我们</div>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {
		Toast
	} from 'mint-ui';
	export default {
		data() {
			return {
			}
		},
		created() {
			if(this.$store.state.carouseld.length==0){
				this.getCarouseldData();
			}
		},
		methods: {
			handleChange() {
				prevent: true
			},
			getCarouseldData() {
				let that=this;
				this.$axios.get('./src/static/json/carouseldData.json')
					.then(function(res) {
						that.$store.commit('addCarouseld',res.data);
					}).catch(err=>{
						console.log(err)
					});
			},
			prompt(){
				Toast({
					message: '目前只开发了||新闻资讯||店面预约||商品购买||模块',
					position: 'middle',
					duration: 2000
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.box {
		padding-bottom:41px;
		.carouseld-box {
			height: 200px;
			border-bottom: 1px solid #ccc;

			.carouselds {
				a {
					width: 100%;
					height: 100%;
					display: block;
					text-align: center;
					background-color: #fff;
					img {
						max-width: 100%;
						max-height: 100%;
						display: inline-block;
					}
				}
			}
		}

		.mui-content {
			ul {
				border: none;
				background-color: #ffffff;
				li {
					border: none;
					padding:0;
					background-color: #ffffff !important;
					>a {
						width:100%;
						height:100%;
						font-size: 16px;
						text-align: center;
						tap-highlight-color: transparent;
						-webkit-tap-highlight-color: transparent;
						img {
							width: 50%;
							height:50%;
							background-color: #ffffff;
							display: inline-block;
							
							tap-highlight-color: transparent;
							-webkit-tap-highlight-color: transparent;
						}
					}
				}
			}
		}
		//end .mui-content
		
	}
</style>
