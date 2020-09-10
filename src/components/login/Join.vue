<template>
	<div class="box-containers">
		<div class="loginBox">
			<div class="logoBox">
				<div class="logo"></div>
				<h3>成为会员</h3>
			</div>
			<div class="mui-content">
				<form id='login-form' class="mui-input-group">
					<div class="mui-input-row">
						<label>昵称</label>
						<input v-model="userName" maxlength="8" autocomplete="off" type="text" class="mui-input-clear mui-input"
						 placeholder="例如: 热爱生活">
					</div>
					<div class="mui-input-row">
						<label>账号</label>
						<input v-model="account" maxlength="16" onkeyup="this.value=this.value.replace(/[\W]/g,'')" onpaste="this.value=this.value.replace(/[\W]/g,'')"
						 autocomplete="off" id='account' type="text" class="mui-input-clear mui-input" placeholder="数字|字母|下划线">
					</div>
					<div class="mui-input-row">
						<label>密码</label>
						<input v-model="passwordOne" maxlength="16" onkeyup="this.value=this.value.replace(/[\W]/g,'')" onpaste="this.value=this.value.replace(/[\W]/g,'')"
						 autocomplete="off" :type="passType" class="mui-input-clear mui-input" placeholder="数字|字母|下划线">
						<span @click="pass" :style="{color:showPass?'#0000ff':'#666'}" class="mui-icon mui-icon-eye showPassword"></span>
					</div>
					<div class="mui-input-row">
						<label>确认密码</label>
						<input v-model="passwordTwo" maxlength="16" onkeyup="this.value=this.value.replace(/[\W]/g,'')" onpaste="this.value=this.value.replace(/[\W]/g,'')"
						 autocomplete="off" :type="passType" class="mui-input-clear mui-input" placeholder="数字|字母|下划线">
						<span @click="pass" :style="{color:showPass?'#0000ff':'#666'}" class="mui-icon mui-icon-eye showPassword"></span>
					</div>
					<div class="mui-input-row">
						<label>手机号码</label>
						<input v-model="phoneNumber" maxlength="11" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " autocomplete="off"
						 type="text" class="mui-input-clear mui-input" placeholder="请输入手机号">
						<mt-button @click="sendVerification" class="verification" type="primary" :disabled="isDisabled">{{buttonValue}}</mt-button>
					</div>
					<div class="mui-input-row">
						<label>验证码</label>
						<input maxlength="6" onkeyup="this.value=this.value.replace(/[^\d]/g,'')" autocomplete="off" type="text" class="mui-input-clear mui-input"
						 placeholder="请输入短信验证码">
					</div>
				</form>
				<div class="login">
					<mt-button @click="joinData" type="primary" class="btn mui-icon mui-icon-arrowright"></mt-button>
					<div class="link-area">
						<router-link to="/member" tag="a" id='reg'>已有账号？去登陆</router-link>
					</div>
				</div>
			</div>
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
				isRememberPassword: true,
				showPass: false,
				passType: "password",
				account: "",
				passwordOne: "",
				passwordTwo: "",
				phoneNumber: "",
				userName: "",
				buttonValue: "发送",
				isDisabled: true,
				isClick: false,
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
			checkPhone() {
				if (this.phoneNumber.length == 11) {
					//验证电话号码手机号码，包含至今所有号段? ?
					if (!(/^1[3|4|5|6|7|8|9]\d{9}$/.test(parseInt(this.phoneNumber)))) {
						Toast({
							message: '请输入正确的手机号码',
							position: 'middle',
							duration: 2000
						});
						return false;
					}
					this.isDisabled = false;
				} else {
					this.isDisabled = true;
				}
			},
			sendVerification() {
				if (!this.isClick) {
					if (this.$store.state.phoneNumberAvailable) {
						Toast({
							message: '验证码模块未完善，填写完手机号就能注册',
							position: 'middle',
							duration: 5000
						});
						this.isClick = true;
						let s = 59;
						let a = setInterval(() => {
							this.buttonValue = s--;
							if (s == 0) {
								this.buttonValue = "发送";
								this.isClick = false;
								clearInterval(a);
							}
						}, 1000);
					} else {
						Toast({
							message: '手机号已被他人使用！',
							position: 'middle',
							duration: 2000
						});
						this.isClick = true;
						setTimeout(() => {
							this.isClick = false;
						}, 500);
					}
				}
			},
			joinData() {
				const a = this.account.replace(/[\W]/g, '');
				const p1 = this.passwordOne.replace(/[\W]/g, '');
				const p2 = this.passwordTwo.replace(/[\W]/g, '');
				const phone = this.phoneNumber.replace(/[^\d]/g, '');
				const uName = this.userName.trim();
				if (uName == "" || a == "" || p1 == "" || p2 == "" || phone == "") {
					Toast({
						message: '请填写完整信息...',
						position: 'middle',
						duration: 2000
					});
					return false;
				}
				if (this.passwordOne != this.passwordTwo) {
					Toast({
						message: '两次密码不一致',
						position: 'middle',
						duration: 2000
					});
					return false;
				}
				if (this.isDisabled) {
					Toast({
						message: '请输入正确的手机号码',
						position: 'middle',
						duration: 2000
					});
					return false;
				}
				// console.log(this.account.replace(/[\W]/g, ''));
				let obj = {
					userName: uName,
					account: a,
					password: p1,
					phoneNumber: phone
				};
				if (this.$store.state.userAvailable && this.$store.state.phoneNumberAvailable) {
					this.$store.commit('addUser', obj);
					let mesg = Toast({
						message: '注册成功，跳转登录页面...',
						position: 'middle',
						duration: -1
					});
					setTimeout(() => {
						this.$router.replace({
							path: '/member'
						});
						mesg.close();
					}, 1000);
				} else if (this.$store.state.userAvailable == false) {
					Toast({
						message: '用户名已存在！',
						position: 'middle',
						duration: 2000
					});
				} else if (this.$store.state.phoneNumberAvailable == false) {
					Toast({
						message: '手机号已被他人使用！',
						position: 'middle',
						duration: 2000
					});
				}
			}
		},
		watch: {
			phoneNumber: function() {
				this.checkPhone();
				const phone = this.phoneNumber.replace(/[^\d]/g, '');
				this.$store.commit('queryPhone', phone);
				if (!this.$store.state.phoneNumberAvailable) {
					Toast({
						message: '手机号已被他人使用！',
						position: 'middle',
						duration: 2000
					});
				}
			},
			account: function() {
				const userName = this.account.replace(/[\W]/g, '');
				this.$store.commit('queryUser', userName);
				if (!this.$store.state.userAvailable) {
					Toast({
						message: '用户名已存在',
						position: 'middle',
						duration: 2000
					});
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.box-containers {
		width: 100%;
		height: auto;
		padding-bottom: 51px;

		.loginBox {
			.logoBox {
				width: 100%;
				text-align: center;

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

				h3 {
					margin: 30px auto;
				}
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

						.verification {
							height: 40px;
							position: absolute;
							top: 0;
							right: 0;
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
	}
</style>
