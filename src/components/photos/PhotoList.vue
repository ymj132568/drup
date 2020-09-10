<template>
	<div>
		<!-- 菜单 -->
		<div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a @click="viewShop" class="mui-control-item mui-active" href="#item1mobile" data-wid="tab-top-subpage-1.html">推荐</a>
					<a @click="viewShop" class="mui-control-item" href="#item1mobile" data-wid="tab-top-subpage-1.html">小吃摊</a>
					<a @click="viewShop" class="mui-control-item" href="#item1mobile" data-wid="tab-top-subpage-1.html">百货店</a>
					<a @click="viewShop" class="mui-control-item" href="#item1mobile" data-wid="tab-top-subpage-1.html">超市</a>
					<a @click="viewShop" class="mui-control-item" href="#item1mobile" data-wid="tab-top-subpage-1.html">吃饭</a>
					<a @click="viewShop" class="mui-control-item" href="#item1mobile" data-wid="tab-top-subpage-1.html">麻辣烫</a>
				</div>
			</div>
		</div>
		<div style="padding:0 10px;">
			<h4 v-if="isFlag">暂无商家入驻...</h4>
		</div>
	</div>
</template>

<script>
	import mui from '../../lib/mui/js/mui.min.js';
	import {
		Toast
	} from 'mint-ui';
	export default {
		data(){
			return {
				isFlag:false
			}
		},
		mounted(){
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005
			});
			this.viewShop();
		},
		methods:{
			viewShop(){
				this.isFlag=false;
				let a=Toast({
					message: '正在努力加载...',
					position: 'middle',
					duration: -1
				});
				setTimeout(() => {
					this.isFlag=true;
					a.close();
				}, 500);
			}
		}
	}
</script>

<style lang="less" scoped>
	* {
		touch-action: pan-y;
	}
</style>
