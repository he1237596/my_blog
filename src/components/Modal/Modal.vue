<!--
 * @Author: Chris
 * @Date: 2019-06-30 19:09:43
 * @LastEditors: Chris
 * @LastEditTime: 2019-11-20 00:53:18
 * @Descripttion: **
 -->
<template>
  <el-dialog title="编辑" :visible.sync="visible" width="80%">
    <Edit :rowData="rowData" :type="type" />
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="visible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
	export default {
		name: 'modal',
		data(){
			return {

			}
		},
		props:[
			'title',
			'onCancel',
			{
				onOk:{
					default: function(){

					},
				}
			},
			{
				visible:{
					default: false,
				}
			}
		],
		methods:{
			confirm(){
				this.onOk()
			}
		}

//		{
//  // 检测类型 + 其他验证
//  age: {
//    type: 'Number',
//    default: 0,
//    required: true,
//    validator: function (value) {
//      return value >= 0
//    }
//  }
//		}

	}
</script>

<style></style>
