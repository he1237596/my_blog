<template>
		<div class="">
				<el-header style="text-align: right; font-size: 12px">
				<div>
					<!--<img height="40px" src="https://images.mogulinker.com/ac2bbd0b8b0844099c0400b0486aabf4?imageView2/2/h/80"/>-->
					<h1>蘑菇物联综合管理系统</h1>
					<el-menu router :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#409EFF" text-color="#fff" active-text-color="#ffd04b">
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
					<el-dropdown @command="handleCommand">
						<span class="el-dropdown-link">
					    店小二<i class="el-icon-arrow-down el-icon--right"></i>
					  </span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>
								<router-link tag='div' to="/userinfo">个人信息</router-link>
							</el-dropdown-item>
							<el-dropdown-item>修改密码</el-dropdown-item>

							<!--<el-dropdown-item disabled>双皮奶</el-dropdown-item>-->
							<el-dropdown-item command='logout' divided>退出登录</el-dropdown-item>
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
		</div>
</template>

<script>
</script>

<style>
</style>