<template>
  <div class="signup">
    <el-form
      :model="ruleForm1"
      status-icon
      :rules="rules2"
      ref="ruleForm1"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h1>注册</h1>

      <el-form-item label="账号" prop="name">
        <el-input v-model.number="ruleForm1.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm1.password"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm1.checkPass"
          auto-complete="off"
        ></el-input>
      </el-form-item>

      <div class="button-wrap">
        <el-button type="primary" @click="submitForm('ruleForm1')"
          >注册</el-button
        >
        <!--<el-button @click="resetForm('ruleForm1')">重置</el-button>-->
      </div>
    </el-form>
  </div>
</template>
<script>
import { signup } from "@/service/user";
import md5 from "md5";
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      if (!/^[a-zA-Z][a-zA-Z0-9_]{6,16}$/.test(value)) {
        callback(new Error("请输入字母开头的6-16个字母数字下划线组合"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm1.checkPass !== "") {
          this.$refs.ruleForm1.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm1.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm1: {
        password: "",
        checkPass: "",
        name: ""
      },
      rules2: {
        password: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ],
        name: [
          {
            validator: checkName,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const data = this.ruleForm1;
      this.$refs[formName].validate(valid => {
        const { name, password } = data;
        if (valid) {
          signup({
            name,
            password: md5(password)
          }).then(res => {
            if (res.code === 200) {
              this.$message({
                showClose: true,
                message: "恭喜你，注册成功",
                type: "success"
              });
              this.$router.push({
                name: "login"
              });
            } else {
              this.$message({
                showClose: true,
                message: res.msg,
                type: "error"
              });
            }
          });
        } else {
          console.log("error submit!!");
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
.signup {
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
</style>
