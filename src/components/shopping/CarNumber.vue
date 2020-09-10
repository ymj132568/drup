<template>
	<div class="numbox" @click="noBubbling">
		<mt-button class="btn1" type="primary" @click="removeNumber" v-if='remove==1'>-</mt-button>
		<mt-button class="btn1" type="primary" v-if='remove==2' disabled>-</mt-button>
		<input type="number" v-model.number="number" />
		<mt-button class="btn1" type="primary" @click="addNumber" v-if='add==1'>+</mt-button>
		<mt-button class="btn1" type="primary" v-if='add==2' disabled>+</mt-button>
	</div>
</template>

<script>
	import {
		Toast
	} from 'mint-ui';
	export default {
		props: ['max', 'val', 'productId', 'selected'],
		data() {
			return {
				number: this.val,
				remove: 1,
				add: 1,
			}
		},
		methods: {
			removeNumber() {
				this.number--;
			},
			addNumber() {
				this.number++;
			},
			send() {
				this.$emit('getData', [this.number]);
			},
			// 禁止按钮组件点击冒泡
			noBubbling(e) {
				window.event? window.event.cancelBubble = true : e.stopPropagation();
				if (e.preventDefault) {
					e.preventDefault();
				} else {
					window.event.returnValue == false;
				}
			}
		},
		watch: {
			number: function() {
				if (this.number <= 0) {
					this.number = 0;
					this.remove = 2;
				} else {
					this.remove = 1;
				}
				if (this.number >= this.max) {
					this.number = this.max;
					this.add = 2;
					Toast({
						message: '库存上限了',
						position: 'middle',
						duration: 2000
					});
				} else {
					this.add = 1;
				}
				this.$store.commit('modifyShoppingCart', {
					id: this.productId,
					number: this.number
				});
			},
			selected: function() {
				this.$store.commit('modifyStatus', {
					id: this.productId,
					selected: this.selected
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.numbox {
		display: inline-block;

		input {
			width: 60px;
			height: 24px;
			line-height: 24px;
			font-size: 14px;
			padding: 0px 5px;
			margin: 0;
			text-align: center;
		}

		.btn1 {
			width: 30px;
			height: 24px;
			line-height: 22px !important;
			font-size: 14px;
		}
	}
</style>
