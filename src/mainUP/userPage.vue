<template>
  <div id="app">
     <user-page-head :current-page="'网盘'"></user-page-head>
    <left-nav></left-nav>
    <section id="outerFrame"><router-view /></section>
  </div>
</template>

<script>
import userPageHead from './userpagehead'
import leftNav from './leftNav'
import allFile from './allFile'
export default {
  name: 'userPage',
  components: {userPageHead, leftNav, allFile}
}
</script>

<style scoped>
#app{
  width: 100%;
  height: 100%;
}
section#outerFrame{
  width:80%;
  height:90%;
  float:left;
  padding:1%;
  overflow:hidden;
  background-color: white;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
</style>
