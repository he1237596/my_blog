<template>

	<div class="userInfo">

	<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>个人信息</span>
    <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
  </div>
		<el-form :model="ruleForm1" status-icon :rules="rules2" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
			<el-upload class="avatar-uploader" with-credentials action="http://localhost:3002/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
				<img v-if="ruleForm1.avatar" :src="ruleForm1.avatar" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
			<el-form-item label="账号" prop="name">
				<el-input v-model="ruleForm1.name" readonly></el-input>
			</el-form-item>
			<el-form-item label="昵称" prop="nickname">
				<el-input v-model="ruleForm1.nickname" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm1')">修改</el-button>
			</el-form-item>
		</el-form>
</el-card>
	</div>
</template>

<script>
	import { getUser,updateUser } from '@/service/user'
	import { mapState, mapActions, mapMutations } from 'vuex'
	import {setStore, getStore} from '@/utils/utils'
	export default {
		data() {
			var checkName = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('用户名不能为空'));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.ruleForm1.checkPass !== '') {
						this.$refs.ruleForm1.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.ruleForm1.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
//			const ruleForm1 = this.$store.state.userInfo;
//			console.log(ruleForm1,999)
			return {
				//				ruleForm1: {
				//					name: '',
				//					nickname: '',
				//					avatar: ''
				//				},
//						...mapState({
//							ruleForm1: state=>Object.assign({},state.userInfo)
//						}),
//				ruleForm1: this.$store.state.userInfo,
				rules2: {
					//					password: [{
					//						validator: validatePass,
					//						trigger: 'blur'
					//					}],
					//					checkPass: [{
					//						validator: validatePass2,
					//						trigger: 'blur'
					//					}],
				},
				imageUrl: '',
				ruleForm1: {}
			}
		},
		computed: {

		},
		created() {
			//			getUser().then(res=>{
			//				console.log(res)
			//			})
			this.ruleForm1 = JSON.parse(getStore('userInfo'));
		},
		methods: {
			...mapMutations([
				'GET_USERINFO'
			]),
			...mapActions(['getUserInfo']),
			handleAvatarSuccess(res, file) {

//				this.imageUrl = URL.createObjectURL(file.raw);
				this.ruleForm1.avatar = res.data.url;
//				this.ruleForm1 = Object.assign({}, this.ruleForm1, {
//					avatar: res.data.url
//				})
			},
			beforeAvatarUpload(file) {
				console.log(file)
				const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			submitForm(formName) {

				this.$refs[formName].validate((valid) => {
					const {
						name,
						nickname,
						avatar
					} = this.ruleForm1;

					if(valid) {
						updateUser({
							name,
							nickname,
							avatar,
						}).then(res => {
							if(res.code === 200) {
								this.$message({
									showClose: true,
									message: '修改成功',
									type: 'success'
								});
								this.getUserInfo(res.data);
							} else {
								this.$message({
									showClose: true,
									message: res.msg,
									type: 'error'
								});
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>
<style scoped>
	.userInfo {
		width: 500px;
		/*margin: 0 auto;*/
	}
	.avatar-uploader{
		text-align: center;
		padding-bottom: 20px;
	}
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	
	.avatar {
		width: 128px;
		height: 128px;
		display: block;
	}
</style>