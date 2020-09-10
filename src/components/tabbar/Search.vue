<template>
	<div class="searchBox">
		<div class="search">
			<input autocomplete="off" v-model="inputValue" id="searchBox" @focus="inputFocus" type="text" placeholder="搜索商品">
			<mt-button @click="searchs" class="btn" size="small" type="primary" v-if="isShow">搜索</mt-button>
		</div>
		<ul @touchstart="inputBlur" class="commodity-list" v-if="!pIsShow">
			<li class="commodity-box" v-for="item in $store.state.searchSuccessfulList">
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
		</ul>
		<p class="p" v-if="pIsShow">搜索不到相关商品...<br/>可以试试搜索：刀 包 电蚊拍 苹果</p>
	</div>
</template>

<script>
	import {
		Toast
	} from 'mint-ui';
	export default {
		data() {
			return {
				isShow: false,
				pIsShow: false,
				inputValue: ""
			}
		},
		created() {
			if (this.$store.state.searchList.length == 0) {
				this.getData();
			}
		},
		methods: {
			inputFocus() {
				this.isShow = true;
			},
			inputBlur() {
				document.querySelector("#searchBox").blur();
				this.isShow = false;
			},
			searchs() {
				this.pIsShow = false;
				document.querySelector("#searchBox").focus();
				if (this.inputValue.trim() == "") {
					Toast({
						message: '不能搜索空气...',
						position: 'middle',
						duration: 700
					});
					return false;
				}
				let that = this;
				this.$store.commit('removeSearchSuccessfulList');
				let a=Toast({
					message: '正在努力加载...',
					position: 'middle',
					duration: -1
				});
				setTimeout(() => {
					this.$store.state.searchList.some(item => {
						if (item.name.indexOf(that.inputValue.trim()) != -1) {
							that.$store.commit('addSearchSuccessfulList',item)
						}
					});
					if (this.$store.state.searchSuccessfulList.length == 0) {
						this.pIsShow = true;
					} else {
						this.pIsShow = false;
					}
					a.close();
				}, 500);
			},
			getData() {
				let that = this;
				this.$axios.get('./src/static/json/search.json')
					.then(res => {
						res.data.forEach(value => {
							that.$store.commit('addToSearchList', value);
						});
					});
			}
		}
	}
</script>

<style lang="less" scoped>
	.searchBox {
		padding: 0;
		margin: 0;
		touch-action: none;
		width: 100%;
		height: 100%;

		.search {
			width: 100%;
			padding: 5px 5px;
			background-color: #eee;
			position: fixed;

			input {
				width: 100%;
				margin: 0;
				border-radius: 30px;
				font-size: 14px;
				height: 30px;
				line-height: 30px;
				padding: 5px 10px;
				border: none;
			}

			.btn {
				height: 30px;
				position: absolute;
				right: 5px;
				border-radius: 30px;
			}
		}

		.commodity-list {
			list-style: none;
			padding: 0 10px;
			padding-top: 40px;
			padding-bottom: 60px;
			margin: 0;
			width: 100%;
			height: 100%;
			display: block;
			overflow-y: scroll;

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
						background-repeat: no-repeat;
						background-image: url(../../static/images/imgErr.jpeg);
						background-size: 90% 90%;
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

		.p {
			padding-top: 50px;
			font-size: 18px;
			text-align: center;
		}
	}
</style>
