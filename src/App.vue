<!--
 * @Author: Chris
 * @Date: 2019-06-30 19:09:43
 * @LastEditors: Chris
 * @LastEditTime: 2019-11-20 02:35:24
 * @Descripttion: **
 -->
<template>
  <div id="app">
    <router-view>
    </router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  created(){
//	console.log(this.$route)
//	console.log(this.$router)
  }
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;*/
	height: 100%;
	box-sizing: border-box;
	overflow: hidden;
}
.el-dialog__headerbtn{
  top: 14px;
  right: 16px;
}
.el-dialog__header{
  padding: 10px 16px 10px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
}
.el-dialog__body{
  padding: 8px 16px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
}
.el-dialog__footer{
  background-color: #fff;
  padding: 8px  16px 8px;
}
</style>
