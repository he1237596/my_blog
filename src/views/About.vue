<template>
	<div style="height: 100%;">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑文章</span>
				<el-button style="float: right; padding: 3px 0" type="text" @click.native='saveArticle'>保存</el-button>
			</div>
			<el-form :model="articleForm">
				<el-form-item label="标题">
					<el-input v-model="articleForm.title" placeholder="请输入标题"></el-input>
				</el-form-item>
				<!--<!--<el-form-item label="活动区域">
	    <el-select v-model="formInline.region" placeholder="活动区域">
	      <el-option label="区域一" value="shanghai"></el-option>
	      <el-option label="区域二" value="beijing"></el-option>
	    </el-select>
	  </el-form-item>-->
				<!--<el-form-item>
	    <el-button type="primary" @click="onSubmit">查询</el-button>
	  </el-form-item>-->
				<!--<el-form-item label="内容">
	  </el-form-item>-->-->
				<mavon-editor class="md" v-model='articleForm.content' @save="saveArticle" :ishljs="true" ref=md @change="getContent" @imgAdd="$imgAdd" @imgDel="$imgDel" />
			</el-form>

		</el-card>
		<!--<mavon-editor v-model='editorContent' :ishljs="true" :codeStyle="code_style" ref=md @imgAdd="$imgAdd" @imgDel="$imgDel" />-->
	</div>
</template>
<script>
	import { upload, addArticle } from '@/service/article';
	export default {
		data() {
			return {
				img_file: [],
				articleForm: {
					title: '',
					content: ''
				}
			};
		},
		methods: {
			$imgAdd(pos, $file) {
				console.log(pos, $file)
				// 第一步.将图片上传到服务器.
				var formdata = new FormData();
				formdata.append('file', $file);
				this.img_file[pos] = $file;
				upload(formdata).then((res) => {
					console.log(res)
					let _res = res.data;
					// 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
					this.$refs.md.$img2Url(pos, _res.url);
				})
			},
			$imgDel(pos) {
				delete this.img_file[pos];
			},
			getContent(text, html) {
				//console.log(text,html)
				//				console.log(this.$refs.md.value)//变化前
				//				console.log(this.$refs.md.d_value)//变化后
				//				console.log(this.$refs.md.d_render)//编译后
			},
			saveArticle(text, html) {
				addArticle(this.articleForm).then(res => {
					console.log(res)
					if(res.code===200){
						this.$message.success(res.msg)
					}
				})
			}
		}

	};
</script>
<style scoped="scoped">
	.box-card {
		height: 100%;
	}
	
	.md {
		height: 500px;
	}
	
	.el-card__body {
		height: calc(100% - 60px);
	}
	/*.el-card{
		height: 700px;
	}*/
</style>
<style type="text/css">

</style>