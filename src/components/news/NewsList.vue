<template>
	<div class="newsBox">
		<div>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newslist">
					<router-link :to="'/home/newsof/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img">
						<div class="mui-media-body">
							<h4>{{item.title}}</h4>
							<p class='mui-ellipsis'>
								<span>发表时间：{{item.releaseTime}}</span>
								<span>阅读：{{item.tap}}</span>
							</p>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				newslist: []
			}
		},
		created() {
			this.getNewsData();
		},
		methods: {
			getNewsData() {
				let that = this;
				this.$axios.get("./src/static/json/newsData.json")
					.then(res => {
						res.data.forEach(function(v) {
							that.newslist.push(v);
						});
					})
					.catch(err => console.log(err))
			}
		}
	}
</script>

<style lang="less" scoped>
	.newsBox {
		padding-bottom: 51px;
		.mui-table-view {
			.mui-table-view-cell {
				img{
					background-size: 42px 42px;
					background-image: url(../../static/images/imgErr.jpeg);
					background-repeat: no-repeat;
				}

				.mui-media-body {
					h4 {
						font-size: 14px;
					}

					.mui-ellipsis {
						display: flex;
						justify-content: space-between;
						font-size: 12px;
						color: #5b6bff;
					}
				}
			}
		}
	}
</style>
