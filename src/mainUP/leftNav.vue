<template>
  <nav>
    <ul>
    <left-nav-item
      v-for="item in items"
      v-bind:itemName="item.name"
      :key="item.key"
      :pathName="item.pathName"
      :currentTag="currentTag" @changeCurrentTag="currentTag=$event"></left-nav-item>
    </ul>
    <div id="capacity">
      <div id="bar"><div id="fill"></div></div>
      <span id="description">{{usedCapacityString}}&nbsp;/&nbsp;{{availCapacityString}}</span>
    </div>
  </nav>
</template>

<script>
import leftNavItem from './leftNavItem'
import $ from 'jquery'
export default {
  name: 'leftNav',
  components: {leftNavItem},
  mounted: function () {
    $('#fill').animate({
      width: '' + ((this.usedCapacity / this.availCapacity) * 100) + '%'
    }, 1500)
    let count = 0
    let a = this.usedCapacity
    while (a.toFixed(2) >= 1024) {
      a /= 1024
      count++
    }
    a = a.toFixed(2)
    switch (count) {
      case 0: this.usedCapacityString = a + 'B'; break
      case 1: this.usedCapacityString = a + 'KB'; break
      case 2: this.usedCapacityString = a + 'MB'; break
      case 3: this.usedCapacityString = a + 'GB'; break
      case 4: this.usedCapacityString = a + 'TB'; break
    }
    a = this.availCapacity
    count = 0
    while (a.toFixed(2) >= 1024) {
      a /= 1024
      count++
    }
    a = a.toFixed(2)
    switch (count) {
      case 0: this.availCapacityString = a + 'B'; break
      case 1: this.availCapacityString = a + 'KB'; break
      case 2: this.availCapacityString = a + 'MB'; break
      case 3: this.availCapacityString = a + 'GB'; break
      case 4: this.availCapacityString = a + 'TB'; break
    }
  },
  data: function () {
    return {
      items: [
        {name: '全部文件', key: 'allFile', pathName: '/userPage/allFile'},
        {name: '图片', key: 'pic', pathName: '/userPage/picture'},
        {name: '视频', key: 'vid', pathName: '/userPage/video'},
        {name: '音乐', key: 'mus', pathName: '/userPage/music'},
        {name: '文档', key: 'doc', pathName: '/userPage/document'}
      ],
      currentTag: '全部文件',
      usedCapacity: 104857600,
      usedCapacityString: '',
      availCapacity: 1.07374182e9,
      availCapacityString: ''
    }
  },
  watch: {
    usedCapacity: function () {
      $('#fill').animate({
        width: '' + ((this.usedCapacity / this.availCapacity) * 100) + '%'
      }, 2000)
      let count = 0
      let a = this.usedCapacity
      while (a.toFixed(2) >= 1024) {
        a /= 1024
        count++
      }
      a = a.toFixed(2)
      switch (count) {
        case 0: this.usedCapacityString = a + 'B'; break
        case 1: this.usedCapacityString = a + 'KB'; break
        case 2: this.usedCapacityString = a + 'MB'; break
        case 3: this.usedCapacityString = a + 'GB'; break
        case 4: this.usedCapacityString = a + 'TB'; break
      }
    }
  }
}
</script>

<style scoped>
  nav{
    width: 14%;
    height: 90%;
    float:left;
    overflow: hidden;
    background-color: #eff4f8;
  }
  ul{
    list-style: none;
    padding: 0;
    margin: 0;
  }
  #capacity{
    min-width:150px;
    min-height:2px;
    position:fixed;
    padding:4px;
    width:12.9%;
    height:10%;
    bottom:100px;
    left:9px;
    font-family:arial,sans-serif;
  }
  #bar{
    width:100%;
    height:15%;
    margin-top:7%;
    margin-bottom:10px;
    border-radius:6px;
    background-color: #d0cfd6;
  }
  #fill{
    height:100%;
    width:0;
    background-color: green;
    border-radius:6px;
    transition: all 1s frames(24);
  }
  #description{
    font-size:0.8em;
    color:#b9b3cc;
  }
</style>
