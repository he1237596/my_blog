<template>
  <div class="home">
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div>
          <!--<img height="40px" src="https://images.mogulinker.com/ac2bbd0b8b0844099c0400b0486aabf4?imageView2/2/h/80"/>-->
          <h1>管理系统</h1>
          <el-menu
            router
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#409EFF"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <!--<el-menu-item index="1">首页</el-menu-item>
						<el-submenu index="2">
							<template slot="title">我的工作台</template>
							<el-menu-item index="2-1">选项1</el-menu-item>
							<el-menu-item index="2-2">选项2</el-menu-item>
							<el-menu-item index="2-3">选项3</el-menu-item>
							<el-submenu index="2-4">
								<template slot="title">选项4</template>
								<el-menu-item index="2-4-1">选项1</el-menu-item>
								<el-menu-item index="2-4-2">选项2</el-menu-item>
								<el-menu-item index="2-4-3">选项3</el-menu-item>
							</el-submenu>
						</el-submenu>
						<el-menu-item index="/userinfo">个人中心</el-menu-item>
						<el-menu-item @click='logout'>退出</el-menu-item>-->
            <!--<el-menu-item index="3" disabled>个人中心</el-menu-item>-->
            <!--<el-menu-item index="4">
							<a href="https://www.ele.me" target="_blank">订单管理</a>
						</el-menu-item>-->
          </el-menu>
        </div>
        <div class="right-top">
          <div class="imgWrap">
            <img :src="userInfo.avatar||'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" />
          </div>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ userInfo.nickname || userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link tag="div" to="/userinfo">个人信息</router-link>
              </el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>

              <!--<el-dropdown-item disabled>双皮奶</el-dropdown-item>-->
              <el-dropdown-item command="logout" divided
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!--<el-button style="float: right;" @click='logout'>退出</el-button>-->

        <!--<el-dropdown>
					<i class="el-icon-setting" style="margin-right: 15px"></i>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>查看</el-dropdown-item>
						<el-dropdown-item>新增</el-dropdown-item>
						<el-dropdown-item>删除</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<span>王小虎</span>-->
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: #373d41">
          <el-menu
            :default-active="activeIndex"
            router
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>文章分类</span>
              </template>
              <!--<el-menu-item-group>-->
              <!--<template slot="title">分组一</template>-->
              <!--<el-menu-item index="/userinfo">个人信息</el-menu-item>-->
              <!--<el-menu-item index="/home/about">编辑文章</el-menu-item>-->
              <el-menu-item index="/article-list">文章管理</el-menu-item>
              
              <!--<el-menu-item index="/article-add">添加文章</el-menu-item>-->
              <!--</el-menu-item-group>-->
              <!--<el-menu-item-group title="分组2">
								<el-menu-item index="1-3">选项3</el-menu-item>
							</el-menu-item-group>-->
              <!--<el-submenu index="1-4">
								<template slot="title">选项4</template>-->
              <!--<el-menu-item index="1-4-1">选项1</el-menu-item>-->
              <!--</el-submenu>-->
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>个人中心</span>
              </template>
              <el-menu-item index="/userinfo">个人信息</el-menu-item>
              <!--<el-menu-item index="/home/about">写文章</el-menu-item>-->
            </el-submenu>
            <!--<el-menu-item index="2">
							<i class="el-icon-menu"></i>
							<span slot="title">导航二</span>
						</el-menu-item>
						<el-menu-item index="3" disabled>
							<i class="el-icon-document"></i>
							<span slot="title">导航三</span>
						</el-menu-item>
						<el-menu-item index="4">
							<i class="el-icon-setting"></i>
							<span slot="title">导航四</span>
						</el-menu-item>-->
          </el-menu>
        </el-aside>

        <el-main>
          <!--<el-table :data="tableData">
						<el-table-column prop="date" label="日期" width="140">
						</el-table-column>
						<el-table-column prop="name" label="姓名" width="120">
						</el-table-column>
						<el-table-column prop="address" label="地址">
						</el-table-column>
					</el-table>-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import { logout } from "@/service/user";
import { mapState, mapMutations } from "vuex";
export default {
  name: "home",
  components: {
    //  HelloWorld
  },
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      activeIndex: "/article-list",
      activeIndex2: "1"
      //				tableData: Array(20).fill(item),
    };
  },
  computed() {},
  methods: {
    ...mapMutations(["GET_USERINFO"]),
    handleCommand(command) {
      command && this[command]();
    },
    logout() {
      console.log(logout);
      logout().then(res => {
        localStorage.clear();
        this.$router.push({
          name: "login"
        });
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  created() {
    this.GET_USERINFO();
  }
};
</script>
<style scoped="scoped">
.home {
  height: 100%;
  overflow: hidden;
}

h1 {
  font-size: 24px;
}

.el-menu {
  border-right: 0;
}

.el-header {
  background-color: #373d41;
  color: #fff;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
}

.el-container {
  height: 100%;
}

.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}

.el-aside {
  color: #333;
  background-color: #373d41;
}
.el-main {
  /*padding: 20;*/
  background: #f3f3f3;
}
.el-menu-item-group {
  overflow: hidden;
}
.right-top{
  display: flex;
  justify-content: center;
  align-items: center;
}
.imgWrap{
  width: 40px;
  height: 40px;
  display: inline-block;
  border-radius: 40px;
  overflow: hidden;
  margin-right: 8px;
}
.imgWrap img{
  width: 100%;
  height: 100%;
}
</style>
