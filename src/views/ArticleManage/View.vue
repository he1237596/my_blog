<!--
 * @Author: Chris
 * @Date: 2019-11-26 12:27:50
 * @LastEditors: Chris
 * @LastEditTime: 2019-11-27 12:58:30
 * @Descripttion: **
 -->
<template>
  <div style="height: 100%;">
    <el-card
      class="box-card"
      :body-style="{ padding: '0 16px', height: '100%' }"
    >
      <el-form
        :model="articleForm"
        :inline="true"
        ref="articleForm"
        class="form"
      >
        <el-form-item label="标题" class="formItem">
          <el-input
            v-model="articleForm.title"
            placeholder="请输入标题"
            readonly
          ></el-input>
        </el-form-item>
        <div class="md-wrap">
          <mavon-editor
            v-bind="params"
            class="md"
            v-model="articleForm.content"
            :boxShadow="false"
            :ishljs="true"
            ref="md"
          />
        </div>
      </el-form>
      <!--<mavon-editor class="md" v-model='rowData.content' @save="saveArticle" :ishljs="true" ref=md @change="getContent" @imgAdd="$imgAdd" @imgDel="$imgDel" />-->
    </el-card>
    <!--<mavon-editor v-model='editorContent' :ishljs="true" :codeStyle="code_style" ref=md @imgAdd="$imgAdd" @imgDel="$imgDel" />-->
  </div>
</template>
<script>
import { getArticleDetail } from "@/service/article";
export default {
  data() {
    return {
      articleForm: {},
      params: {
        subfield: false,
        toolbarsFlag: false,
        defaultOpen: "preview"
      }
    };
  },
  created() {
    // 查询详情
    // this.articleForm = this.$route.params.articleForm;
    const { id } = this.$route.params;
    getArticleDetail({ id }).then((res = {}) => {
      const { code, msg, data } = res;
      if (code === 200) {
        this.articleForm = data;
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: "error"
        });
      }
    });
  },
  methods: {
    resetForm() {
      this.$refs["articleForm"].resetFields();
    }
  }
};
</script>
<style scoped="scoped">
.md {
  height: 100%;
}
.box-card {
  height: 100%;
}
.form {
  height: 100%;
}
.formItem {
  margin-bottom: 0;
  padding: 8px 0;
}
.el-input {
  width: 500px;
}
.md-wrap {
  height: calc(100% - 76px);
  padding-bottom: 16px;
}
/*.el-card{
		height: 700px;
	}*/
</style>
<style type="text/css"></style>
