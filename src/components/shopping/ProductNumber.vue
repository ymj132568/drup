<template>
	<div class="numbox">
		<mt-button class="btn3" type="primary" @click="removeNumber" v-if='remove==1'>-</mt-button>
		<mt-button class="btn3" type="primary" v-if='remove==2' disabled>-</mt-button>
		<input type="number" v-model.number="number"/>
		<mt-button class="btn3" type="primary" @click="addNumber" v-if='add==1'>+</mt-button>
		<mt-button class="btn3" type="primary" v-if='add==2' disabled>+</mt-button>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default{
		props:['max'],
		data(){
			return{
				number:1,
				remove:1,
				add:1,
			}
		},
		methods:{
			removeNumber(){
				this.number--;
			},
			addNumber(){
				this.number++;
			},
			send(){
				this.$emit('getData',[this.number]);
			}
		},
		watch:{
			number:function(){
				if(this.number<=0){
					this.number=0;
					this.remove=2;
				}else{
					this.remove=1;
				}
				if(this.number>=this.max){
					this.number=this.max;
					this.add=2;
					Toast({
					  message: '库存上限了',
					  position: 'middle',
					  duration: 2000
					});
				}else{
					this.add=1;
				}
				this.send();
			}
		}
	}
</script>

<style lang="less" scoped>
	.numbox{
		display: inline-block;
		input{
			width:60px;
			height:25px;
			font-size: 16px;
			padding:5px 5px;
			margin:0;
			text-align: center;
		}
		.btn3{
			width:40px;
			height:25px;
		}
	}
</style>
