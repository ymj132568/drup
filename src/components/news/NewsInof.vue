<template>
	<div class="box">
		<div class="main" id="main" v-cloak>
			<h4>{{mewsMessage.title}}</h4>
			<p class="mui-ellipsis">
				<span>发表时间：{{mewsMessage.releaseTime}}</span>
				<span>阅读：{{mewsMessage.tap}}</span>
			</p>
			<hr color="#ccc">
			<p>文章配图</p>
			<img width="100%" :src="mewsMessage.img" alt="">
			<p>{{mewsMessage.text}}</p>
			<p>文章配图</p>
			<img width="100%" :src="mewsMessage.img" alt="">
			<p>{{mewsMessage.text}}</p>
		</div>
		<div class="commentArea" ref="commentArea">
			<div>
				<h3>热门评论：</h3>
			</div>
			<p v-if="!haveComments">暂无评论...快来抢沙发</p>
			<div class="commentList" v-for="(item,index) in commentList">
				<div class="avatar">
					<img src="../../static/images/menu3.png" alt="头像">
				</div>
				<div class="commentMain">
					<div class="userInof">
						<h5>{{item.userName}}</h5>
						<span><span style="margin-right: 5px;">{{item.praise}}</span><span @click="praise(index)" :style="{color:item.isPraise?'#ff0000':''}"
							 class="mui-icon-extra mui-icon-extra-like"></span></span>
					</div>
					<p>{{item.commentText}}</p>
					<span>{{item.time}}</span>
					<span style="margin-left: 5px;">{{0}}</span>
					<mt-button type="primary" class="reply">回复</mt-button>
				</div>
			</div>
		</div>
		<!-- 评论组件 -->
		<div class="commentBox">
			<div class="input1" v-show="inputSwitch">
				<input @focus="inputFocus" autocomplete="off" type="text" placeholder="发言温暖评论区">
				<span @click="awesome" :style="{color:isAwesome?'#ff0000':''}" class="glyphicon" :class="{'glyphicon-heart-empty':!isAwesome,'glyphicon-heart':isAwesome}"><sup
					 style="margin-left: 5px;">{{isAwesome ? (parseInt(mewsMessage.tap)+1) : mewsMessage.tap}}</sup></span>
				<span @click="goAnchor" class="glyphicon glyphicon-pencil"><sup style="margin-left: 5px;">{{commentList.length}}</sup></span>
				<span @click="actionSheet" class="mui-icon mui-icon-redo"></span>
			</div>
			<div class="input2" @click="noBubbling" v-show="!inputSwitch">
				<textarea id="textarea" autocomplete="off" type="text" :placeholder="message" v-model="commentText"></textarea>
				<div>
					<mt-button @click="maskClose" style="background-color: #ccc;" class="btn" type="default">取消</mt-button>
					<mt-button @click="postComment" class="btn" type="primary">发言</mt-button>
				</div>
			</div>
			<div class="mui-backdrop"></div>
		</div>
		<!-- 分享 -->
		<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
	</div>
</template>

<script>
	import mui from '../../lib/mui/js/mui.min.js';
	import { MessageBox,Toast } from 'mint-ui';
	export default {
		data() {
			return {
				mask: mui.createMask(this.inputBlur),
				// 获取当前的路由id
				id: parseInt(this.$route.params.id) - 1,
				newsData: [],
				commentList: [], //评论区内容
				message: "发言温暖评论区",
				commentText: "",
				haveComments: false,
				inputSwitch: true,
				mewsMessage: {
					title: "",
					releaseTime: "",
					tap: "",
					text: "",
					img: ""
				},
				isAwesome: false,
				actions: [{
						name: '分享到微信',
						method: this.alertMessage
					},
					{
						name: '分享到QQ',
						method: this.alertMessage
					}
				],
				sheetVisible: false
			}
		},
		created() {
			this.getNewsData();
		},
		mounted() {
			mui('.mui-scroll-wrapper').scroll({
				scrollY: true, //是否竖向滚动
				scrollX: false, //是否横向滚动
				startX: 0, //初始化时滚动至x
				startY: 0, //初始化时滚动至y
				indicators: true, //是否显示滚动条
				deceleration: 0.0005, //阻尼系数,系数越小滑动越灵敏
				bounce: true //是否启用回弹
			});
		},
		methods: {
			getNewsData() {
				let that = this;
				this.$axios.get("./src/static/json/newsData.json")
					.then(res => {
						res.data.forEach(function(v) {
							that.newsData.push(v);
						});

						this.mewsMessage.tap = that.newsData[that.id].tap;
						this.mewsMessage.title = that.newsData[that.id].title;
						this.mewsMessage.releaseTime = that.newsData[that.id].releaseTime;
						this.mewsMessage.text = that.newsData[that.id].text;
						this.mewsMessage.img = that.newsData[that.id].img;
					})
					.catch(err => console.log(err));
			},
			actionSheet() {
				// 打开action sheet
				this.sheetVisible = true;
			},
			alertMessage() {
				Toast({
					message: '功能模块待开发',
					position: 'middle',
					duration: 2000,
					iconClass: "mui-spinner"
				});
			},
			awesome(e) {
				if(this.$store.state.loginUser.length==0){
					MessageBox.confirm('登录后才可以进行点赞，是否跳转登录?').then(action => {
						Toast({
							message: '跳转中...',
							position: 'middle',
							duration: 800,
							iconClass: "mui-spinner"
						});
						setTimeout(() => {
							this.$router.replace({
								path: '/member'
							});
						}, 1000);
					});
				}else{
					this.isAwesome = !this.isAwesome;
				}
			},
			noBubbling(e) {
				window.event ? window.event.cancelBubble = true : e.stopPropagation();
				if (e.preventDefault) {
					e.preventDefault();
				} else {
					window.event.returnValue == false;
				}
				document.querySelector("#textarea").focus();
			},
			inputFocus() {
				this.mask.show(); //显示遮罩
				this.inputSwitch = false;
				setTimeout(() => {
					document.querySelector("#textarea").focus();
				}, 300);
			},
			inputBlur() {
				this.inputSwitch = true;
			},
			maskClose() {
				this.message = "发言温暖评论区";
				this.mask.close(); //关闭遮罩层
			},
			postComment() {
				if (this.commentText.trim() == "") {
					this.message = "说点什么吧!";
					this.commentText = "";
					return false;
				}
				if(this.$store.state.loginUser.length==0){
					MessageBox.confirm('登录后才可以进行评论，是否跳转登录?').then(action => {
						Toast({
							message: '跳转中...',
							position: 'middle',
							duration: 800,
							iconClass: "mui-spinner"
						});
						setTimeout(() => {
							this.$router.replace({
								path: '/member'
							});
						}, 1000);
					});
					this.mask.close(); //关闭遮罩层
					return false;
				}else {
					let date = new Date();
					let month = date.getMonth() + 1;
					let day = date.getDate();
					let h = date.getHours();
					let m = date.getMinutes();
					if (month < 10) {
						month = '0' + month;
					}
					if (day < 10) {
						day = '0' + day;
					}
					if (h < 10) {
						h = '0' + h;
					}
					if (m < 10) {
						m = '0' + m;
					}
					const userName=this.$store.state.loginUser[0].userName;
					const text=this.commentText;
					let obj = {
						userName: userName,
						commentText: text,
						praise: 0,
						time: date.getFullYear() + '-' + month + '-' + day + ' ' + h + ':' + m,
						isPraise: false
					};
					this.commentList.push(obj);
					this.commentText = "";
					this.maskClose();
				}
			},
			goAnchor() {
				this.$refs.commentArea.scrollIntoView();
			},
			praise(i) {
				this.commentList[i].isPraise = !this.commentList[i].isPraise;
				if (!this.commentList[i].isPraise) {
					this.commentList[i].praise--;
				} else {
					this.commentList[i].praise++;
				}
			}
		},
		watch: {
			commentList: function() {
				if (this.commentList.length == 0) {
					this.haveComments = false;
				} else {
					this.haveComments = true;
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.box {
		padding: 0 10px;
		padding-top: 10px;
		position: relative;
		padding-bottom: 110px;

		.main {
			margin-bottom: 20px;

			img {
				height: 200px;
				background-image: url(../../static/images/imgErr.jpeg);
				background-size: 100% 200px;
				background-repeat: no-repeat;
			}

			h4 {
				text-align: center;
				font-size: 14px;
			}

			.mui-ellipsis {
				display: flex;
				justify-content: space-between;
				font-size: 12px;
				color: #5b6bff;
			}

			hr {
				height: 1px;
			}
		}

		.commentBox {
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 50px;
			z-index: 999;
			background-color: #fff;
			padding: 5px 15px;
			border-top: 1px solid #ccc;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			z-index: 1000;

			.input1 {
				display: flex;
				justify-content: space-between;

				input {
					width: 50%;
					margin: 0;
					font-size: 14px;
					border-radius: 40px;
					vertical-align: middle;
				}

				span,
				a {
					line-height: 40px;
					text-align: center;

					>sup {
						font-size: 12px;
					}
				}
			}

			.input2 {
				textarea {
					width: 100%;
					height: 100px;
					margin: 0;
					font-size: 14px;
					border-radius: 10px;
				}

				>div {
					display: flex;
					justify-content: space-between;

					.btn {
						height: 25px;
						font-size: 12px;

						&:first-child {
							color: #000;
						}
					}
				}
			}

			.mui-backdrop {
				position: fixed;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				display: none;
				z-index: 998;
				background-color: rgba(0, 0, 0, .3);
			}
		}

		.commentArea {
			width: 100%;
			margin-bottom: 10px;

			.commentList {
				display: flex;
				justify-content: space-between;
				width: 100%;

				.avatar {
					width: 10%;

					img {
						width: 100%;
						height: auto;
					}
				}

				.commentMain {
					padding-left: 5px;
					width: 90%;
					font-size: 14px;

					.userInof {
						display: flex;
						justify-content: space-between;

						span {
							font-size: 14px;
						}
					}

					>span {
						font-size: 12px;
					}

					p {
						vertical-align: middle;
						margin: 0;
						word-break: break-all;
					}

					.reply {
						height: 14px;
						line-height: 14px;
						font-size: 12px;
						vertical-align: middle;
						background-color: #ccc;
						color: #000;
					}
				}
			}
		}
	}
</style>
