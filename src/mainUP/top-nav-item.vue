<template>
   <li class="nav-item-style" @click="changePage">
     <span
     v-bind:class="{'top-nav-selected': itemName === currentPage}"
     class="span-style">{{itemName}}</span></li>
</template>

<script>
/* eslint-disable */
export default {
  name: 'top-nav-item',
  props: ['itemName', 'currentPage'],
  methods: {
    changePage: function () {
      if (this.currentPage === this.itemName) {
        return
      } else if (this.currentPage === '网盘') {
        this.$router.push({path: '/sharePage'})
      } else if (this.currentPage === '分享') {
        this.$router.push({path: '/userPage/allFile'})
      }
    }
  }
}
</script>

<style scoped>
  .nav-item-style{
    display:inline-block;
    font-size:1.2em;
    cursor:pointer;
    padding:1% 4% 1% 0;
    color: #b9b3bf;
  }
  .top-nav-selected{
    border-bottom: 4px solid #ced3d6;
  }
  .span-style{
    padding-bottom:1%;
  }
</style>
