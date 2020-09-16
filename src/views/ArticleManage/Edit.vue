<template>
  <div style="height: 100%;">
    <el-card class="box-card" :body-style="{ padding: '0 16px' }">
      <el-form :model="articleForm" :inline="true" ref="articleForm">
        <el-form-item label="标题" class="formItem">
          <el-input
            v-model="articleForm.title"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <div class="md-wrap">
          <mavon-editor
            v-bind="params"
            class="md"
            v-model="articleForm.content"
            :boxShadow="false"
            @save="saveArticle"
            :ishljs="true"
            ref="md"
            @change="getContent"
            @imgAdd="$imgAdd"
            @imgDel="$imgDel"
          />
        </div>
      </el-form>
      <!--<mavon-editor class="md" v-model='rowData.content' @save="saveArticle" :ishljs="true" ref=md @change="getContent" @imgAdd="$imgAdd" @imgDel="$imgDel" />-->
    </el-card>
    <!--<mavon-editor v-model='editorContent' :ishljs="true" :codeStyle="code_style" ref=md @imgAdd="$imgAdd" @imgDel="$imgDel" />-->
  </div>
</template>
<script>
import { upload, addArticle, editArticle } from "@/service/article";
export default {
  data() {
    return {
      img_file: []

      //				articleForm:Object.assign({},this.rowData)
      //				articleForm:{}
    };
  },
  props: ["articleForm", "type", "reload"],
  computed: {
    //			articleForm: function() {
    //				return this.rowData
    //			}
    params: function() {
      if (this.type === "view")
        return {
          subfield: false,
          toolbarsFlag: false,
          defaultOpen: "preview"
        };
      return {};
    }
  },
  watch: {
    //			rowData: {
    //				deep: true,
    //				immediate: true,//立刻监听,不用在data里进行第一次赋值
    //				handler: function (val, oldVal) {
    //					this.articleForm = Object.assign({},val);
    //				},
    //			}
  },
  methods: {
    resetForm() {
      this.$refs["articleForm"].resetFields();
    },
    $imgAdd(pos, $file) {
      console.log(pos, $file);
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("file", $file);
      this.img_file[pos] = $file;
      upload(formdata).then(res => {
        console.log(res);
        let _res = res.data;
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        this.$refs.md.$img2Url(pos, _res.url);
      });
    },
    $imgDel(pos) {
      delete this.img_file[pos];
    },
    getContent(text, html) {
      //console.log(text,html)
      //				console.log(this.$refs.md.value)//变化前
      //				console.log(this.$refs.md.d_value)//变化后
      //				console.log(this.$refs.md.d_render)//编译后
      //				this.articleForm.html = this.$refs.md.d_value
    },
    saveArticle(text, html) {
      const { title, content, id } = this.articleForm;
      if (this.type === "add") {
        addArticle({
          title,
          content
        }).then(res => {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success"
          });
          this.reload();
        });
      } else {
        editArticle({
          title,
          content,
          id
        }).then(res => {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success"
          });
          this.reload();
        });
      }
      //				console.log(txt,txtt)
    }
  }
};
</script>
<style scoped="scoped">
.md {
  height: 50vh;
}
.box-card {
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
  padding-bottom: 16px;
}
/*.el-card{
		height: 700px;
	}*/
</style>
<style type="text/css"></style>
