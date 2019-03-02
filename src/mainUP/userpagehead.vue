<template>
  <header id="topHeader">
    <span id="logo">EMM网盘</span>
    <nav id="topNav">
      <ul id="navItemList">
        <top-nav-item v-bind:item-name="NItemName1" :currentPage="currentPage"></top-nav-item>
        <top-nav-item v-bind:item-name="NItemName2" :currentPage="currentPage"></top-nav-item>
      </ul><!--end ul-->
    </nav><!--end the nav in header-->
  </header><!--end header-->
</template>

<script>
// import $ from 'jquery'
import topNavItem from './top-nav-item'
export default {
  name: 'userPageHead',
  props: ['currentPage'],
  data: function () {
    return {
      NItemName1: '网盘',
      NItemName2: '分享'
    }
  },
  components: {topNavItem}
}

</script>

<style scoped>
  #topHeader{
    width:99%;
    height:12%;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    background-color: #eff4f8;
  }

  #logo{
    margin-left:30px;
    display:inline-block;
    color:blue;
    font-size:1.7em;
    font-family:Arial, "Adobe 黑体 Std R", sans-serif;
  }
  #topNav{
    display:inline-block;
    width:50%;
    margin-left:4%;
  }

  #navItemList{
    list-style:none;
  }
</style>
