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

<style scoped="scoped">
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
</style>
