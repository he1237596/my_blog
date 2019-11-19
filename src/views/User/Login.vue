<!--
 * @Descripttion: 
 * @Author: Chris
 * @Date: 2019-06-30 19:09:43
 * @LastEditors: Chris
 * @LastEditTime: 2019-11-19 14:08:47
 -->
<template>
  <div class="login">
    <el-form
      :model="ruleForm2"
      status-icon
      :rules="rules2"
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h1>蘑菇物联</h1>
      <el-form-item label="账号" prop="name">
        <el-input v-model.number="ruleForm2.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm2.password"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <div class="button-wrap">
        <el-button type="primary" @click="submitForm('ruleForm2')"
          >登录</el-button
        >
        <!--<el-button @click="resetForm('ruleForm2')">重置</el-button>-->
      </div>
      <div class="signup">
        <a href="javascript:;" @click="$router.push({ name: 'signup' })"
          >注册</a
        >
      </div>
    </el-form>
  </div>
</template>
<script>
import { login } from "@/service/user";
import md5 from "md5";
import { mapState, mapMutations } from "vuex";
import { denormalize, schema, normalize } from "normalizr";

export default {
  created() {
    // console.log(this.$route, this.$router)
    // const data = [{ id: '123', name: 'Jim' }, { id: '456', name: 'Jane' }];
    // const userSchema = new schema.Entity('users');

    // const userListSchema = new schema.Array(userSchema);
    // // or use shorthand syntax:
    // // const userListSchema = [userSchema];
    // const normalizedData = normalize(data, userListSchema);
    const data = {
      id: "1",
      name: "1212",
      list: [
        { id: "123", name: "Jim" },
        { id: "456", name: "Jane" }
      ]
    };

    // const userSchema = new schema.Entity('users');
    // const itemSchema = new schema.Entity('item');

    // const ListSchema = new schema.Entity('list',[itemSchema]);

    // or use shorthand syntax:
    // const userListSchema = [userSchema];
    // const normalizedData = normalize(data, userSchema);
    // console.log(normalizedData)
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm2: {
        password: "",
        name: ""
      },
      rules2: {
        password: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ]
        //					checkPass: [{
        //						validator: validatePass2,
        //						trigger: 'blur'
        //					}],
        //					age: [{
        //						validator: checkAge,
        //						trigger: 'blur'
        //					}]
      }
    };
  },
  methods: {
    ...mapMutations([
      //      'GET_USERINFO',
      "SAVE_USERINFO"
    ]),
    submitForm(formName) {
      const data = this.ruleForm2;
      this.$refs[formName].validate(valid => {
        if (valid) {
          const temp = Object.assign({}, data, {
            password: md5(data.password)
          });
          login(temp).then(res => {
            if (res.code === 200) {
              //								localStorage.setItem('userInfo', JSON.stringify(res.data))
              //								this.GET_USERINFO(res.data);
              this.SAVE_USERINFO(res.data);
              let {
                query: { redirect = "/" }
              } = this.$route;
              if (redirect) {
                this.$router.push({
                  path: redirect
                });
              }
            } else {
              this.$message({
                showClose: true,
                message: res.msg,
                type: "error"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff url(../../assets/loginBg.png) center center no-repeat;
  background-size: cover;
}
.demo-ruleForm {
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 500px;
  height: 300px;
  margin: auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  position: absolute;
}
h1 {
  line-height: 60px;
  padding-bottom: 20px;
  font-size: 32px;
  text-align: center;
}
.button-wrap {
  text-align: center;
}
.signup {
  text-align: right;
  color: #ccc;
  font-size: 12px;
}
</style>
