<template>
	<div class="main">
		<div class="toolbar">
				<span>文章管理</span>
				<el-button style="float: right; padding: 3px 0" type="text" @click.native='add'>新增</el-button>
		</div>
		<div class="tableWrap">
			<el-table :data="tableData" height="100%">
				<el-table-column prop="moment" label="日期" width="200" align='center'>
				</el-table-column>
				<el-table-column prop="title" label="标题" width="120" align='center'>
				</el-table-column>
				<el-table-column prop="content" label="内容" header-align='center' :show-overflow-tooltip="true">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="240" align='center'>
					<template slot-scope="scope">
						<el-button @click="view(scope.row)" size="small">查看</el-button>
						<el-button @click="edit(scope.row)" size="small">编辑</el-button>
						<el-button @click="deleteArticle(scope.row)" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<el-dialog :title="title" :visible.sync="visible" width="80%">
		  <!--<el-form :model="form">
		    <el-form-item label="活动名称" :label-width="formLabelWidth">
		      <el-input v-model="form.name" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="活动区域" :label-width="formLabelWidth">
		      <el-select v-model="form.region" placeholder="请选择活动区域">
		        <el-option label="区域一" value="shanghai"></el-option>
		        <el-option label="区域二" value="beijing"></el-option>
		      </el-select>
		    </el-form-item>
		  </el-form>-->
		  <Edit :articleForm='rowData' :type='type' :reload='getList' ref="mychild" />
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="visible = false">取 消</el-button>
		    <el-button type="primary" @click="saveData">确 定</el-button>
		  </div>
		</el-dialog>
		<div class="pageWrap">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.current" :page-sizes="[5, 10, 20]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
			</el-pagination>
		</div>
	</div>

</template>

<script>
	import { getArticleList, deleteArticle } from '@/service/article';
	import { mapState, mapMutations } from 'vuex';
		import Edit from '@/views/ArticleManage/Edit';
	export default {
		name: 'articlelist',
		components: {
			Edit,
		},
		data() {
			return {
				tableData: [],
				page: {
					total: 0,
					current: 1,
					pageSize: 10,
				},
        visible: false,
        rowData:{},
        type:'',
        title:'编辑',
			}
		},
		methods: {
			...mapMutations([
				'GET_USERINFO'
			]),
//			closeModal(){
//				this.$refs.mychild.resetForm();
//			},
			handleSizeChange(val) {
				this.page.pageSize = val;
				this.getList();
			},
			handleCurrentChange(val) {
				this.page.current = val;
				this.getList();
			},
			getList() {
				this.visible = false;
				getArticleList({
					current: this.page.current,
					pageSize: this.page.pageSize,
				}).then(res => {
					if(res.code === 200) {
						this.tableData = res.data.data;
						this.page.total = res.data.total;
					}
				})
			},
			handleClick(row) {
				console.log(row);
			},
			view(row) {
				this.rowData = Object.assign({},row);
				this.type= 'view';
				this.title = '查看'
				this.visible = true;
			},
			add(){
				this.type= 'add';
				this.title = '添加'
				this.visible = true;
			},
			edit(row) {
				this.rowData = Object.assign({},row);
//				this.rowData = row;
				this.type= 'eidt';
				this.title = '编辑'
				this.visible = true;
//				editArticle(row);
			},
			saveData() {
        this.$refs.mychild.saveArticle();
     },
			deleteArticle(row) {
				deleteArticle({
					id: row.id
				}).then(res => {
					if(res.code === 200) {
						this.$message({
							showClose: true,
							message: res.msg,
							type: 'success'
						});
						this.page.current = 1;
						this.getList();
					} else {
						this.$message({
							showClose: true,
							message: res.msg,
							type: 'success'
						});
					}
				})

			}
		},
		computed: {
			...mapState([
				'userInfo'
			]),
		},
		created() {
			this.getList();
		}

	}
</script>

<style scoped>
	.main {
		height: 100%;
		display: flex;
		flex-direction: column;
		background: #fff;
		border-radius: 4px;
	}
	
	.tableWrap {
		flex: 1;
	}
	
	.pageWrap {
		padding: 8px;
		flex: 0;
	}
	.toolbar{
		height: 22px;
		line-height: 22px;
		padding: 12px;
		border-bottom: 1px solid #d0d0d0;
	}

</style>
