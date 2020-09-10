<template>
	<div class="box-containers">
		<div class="loginBox" v-if="this.$store.state.statusCode!=1001">
			<div class="logo"></div>
			<div class="mui-content">
				<form id='login-form' class="mui-input-group">
					<div class="mui-input-row">
						<label>账号</label>
						<input v-model="uesrAccount" maxlength="16" onkeyup="this.value=this.value.replace(/[\W]/g,'')" onpaste="this.value=this.value.replace(/[\W]/g,'')"
						 autocomplete="off" id='account' type="text" class="mui-input-clear mui-input" placeholder="账号或手机号">
					</div>
					<div class="mui-input-row">
						<label>密码</label>
						<input v-model="uesrPassword" maxlength="16" onkeyup="this.value=this.value.replace(/[\W]/g,'')" onpaste="this.value=this.value.replace(/[\W]/g,'')"
						 autocomplete="off" id='password' :type="passType" class="mui-input-clear mui-input" placeholder="请输入密码">
						<span @click="pass" :style="{color:showPass?'#0000ff':'#666'}" class="mui-icon mui-icon-eye showPassword"></span>
					</div>
				</form>
				<div class="rememberPassword">
					<span>记住密码</span>
					<mt-switch class="switch" style="display:inline-block;" v-model="isRememberPassword"></mt-switch>
				</div>
				<div class="login">
					<mt-button @click="loginUser" type="primary" class="btn mui-icon mui-icon-arrowright"></mt-button>
					<div class="link-area">
						<router-link to="/member/join" tag="a" id='reg'>注册账号</router-link>
						<a @click="undeveloped" id='forgetPassword' href="javascript:0;">忘记密码</a>
					</div>
				</div>
			</div>
		</div>
		<div class="userBox" v-if="this.$store.state.statusCode==1001">
			<div>
				<span>欢迎光临：{{$store.state.loginUser[0].userName}} !</span>
				<span @click="set" class="set mui-icon mui-icon-gear-filled"></span>
			</div>
		</div>
		<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
	</div>
</template>

<script>
	import {
		Toast
	} from 'mint-ui';
	export default {
		data() {
			return {
				isRememberPassword: true,
				showPass: false,
				passType: "password",
				loginStatus: false,
				uesrAccount: "",
				uesrPassword: "",
				actions: [{
						name: '切换账号',
						method: this.escLogin
					},
					{
						name: '退出登录',
						method: this.escLogin
					}
				],
				sheetVisible: false
			}
		},
		created(){
			if(this.$store.state.loginUser.length==1){
				this.$store.state.statusCode=1001;
			}
		},
		methods: {
			pass() {
				this.showPass = !this.showPass;
				if (this.showPass) {
					this.passType = "text";
				} else {
					this.passType = "password";
				}
			},
			undeveloped() {
				Toast({
					message: '模块未开发...',
					position: 'top',
					duration: 2000
				});
			},
			loginUser() {
				const a = this.uesrAccount.replace(/[\W]/g, '');
				const p = this.uesrPassword.replace(/[\W]/g, '');
				if(a==""){
					Toast({
						message: '请输入账号！',
						position: 'middle',
						duration: 2000
					});
					return false;
				}else if(p==""){
					Toast({
						message: '请输入密码！',
						position: 'middle',
						duration: 2000
					});
					return false;
				}
				let userObj = {
					account: a,
					password: p
				};
				this.$store.commit('queryLogin',userObj);
				// 根据状态码判断登录是否成功
				if(this.$store.state.statusCode==1002){
					Toast({
						message: '密码错误！',
						position: 'middle',
						duration: 2000
					});
				}else if(this.$store.state.statusCode==1003){
					Toast({
						message: '账号错误！',
						position: 'middle',
						duration: 2000
					});
					console.log(1)
				}
			},
			escLogin(){
				this.$store.commit('removeLogin');
			},
			set(){
				this.sheetVisible=true;
			}
		},
		watch:{
		}
	}
</script>

<style lang="less" scoped>
	.box-containers {
		width: 100%;
		height: auto;
		max-height: 100%;

		.loginBox {
			padding: 0 15px;
			border: none;

			.logo {
				width: 99px;
				height: 99px;
				margin: 30px auto;
				background-color: #eee;
				border-radius: 10px;
				background: url("../../static/images/logo.jpg");
				background-size: 99px 99px;
				background-repeat: no-repeat;
			}

			.mui-content {
				padding: 0;

				.rememberPassword {
					padding: 0 15px;
					height: 40px;
					line-height: 40px;
					background-color: #fff;
					border: none;
					border-bottom: 1px solid #eee;
					display: flex;
					justify-content: space-between;
					align-items: center;

					input {
						vertical-align: middle;
					}

					.switch {
						vertical-align: middle;
						height: 32px;
					}
				}

				.mui-input-group {
					.mui-input-row {
						label {
							line-height: 41px;
							padding: 0 15px;
						}

						.showPassword {
							width: 24px;
							height: 40px;
							line-height: 40px;
							display: block;
							position: absolute;
							top: 0;
							right: 15px;
						}
					}
				}

				.login {
					text-align: center;
					padding: 15px 0;
					background-color: #fff;

					.btn {
						width: 40%;
						border-radius: 41px;
						margin-bottom: 15px;
					}

					.link-area {
						padding: 0 15px;
						display: flex;
						justify-content: space-between;
					}
				}
			}
		}
		.userBox{
			padding:10px 10px;
			>div{
				display: flex;
				justify-content: space-between;
				span{
					font-size: 24px;
				}
				.set{
				}
			}
		}
	}
</style>
