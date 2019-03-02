<template>
<div id="app">
  <user-page-head :current-page="'分享'"></user-page-head>
  <div id="shareContent">
    <h5>链接分享</h5>
    <div class="tableHead" v-if="(!functionOn)">
      <div class="fileName" @click="sortByName">
        <div class="chooseAll" @click="selectAllShareLink" :class="{'allIsChosen': selectAll}"></div>
        <span>分享文件名</span>
        <div class="downArrow"
             v-if="sortByNameActive"
             :class="{'upArrow':isIncreaseSort}"></div>
      </div>
      <div class="skimTimes" @click="sortBySkimTime">
        <span>浏览次数</span>
        <div class="downArrow"
             v-if="sortBySkimTActive"
             :class="{'upArrow':isIncreaseSort}"></div>
      </div>
      <div class="saveTimes" @click="sortBySaveTimes">
        <span>保存次数</span>
        <div class="downArrow"
             v-if="sortBySTActive"
             :class="{'upArrow':isIncreaseSort}"></div>
      </div>
      <div class="downloadTimes" @click="sortByDTimes" >
        <span>下载次数</span>
        <div class="downArrow"
             v-if="sortByDTActive"
             :class="{'upArrow':isIncreaseSort}"></div>
      </div>
      <div class="shareTime" @click="sortByShareTime">
        <span>分享时间</span>
        <div class="downArrow"
             v-if="sortByShareTActive"
             :class="{'upArrow':isIncreaseSort}"></div>
      </div>
      <div class="invalidTime" @click="sortByInvalidTime">
        <span>失效时间</span>
        <div class="downArrow"
             v-if="sortByITActive"
             :class="{'upArrow':isIncreaseSort}"></div>
      </div>
    </div>
    <!--选中之后弹出下面的div -->
    <div class="tableHead" v-if="functionOn">
      <div class="chooseAllAfterFO" @click="selectAllShareLink" :class="{'allIsChosen': selectAll}"></div>
      <div id="chosenNum">已经选择了{{selectedNum}}个文件/文件夹</div>
      <div id="cancelBtn">取消共享</div>
    </div>
    <!--选中之后弹出上面的div -->
    <div id="shareList">
        <one-link v-for="(item,index) in shareList"
                  :link-item="item"
                  :key="index"
                  :is-selected="item.isSelected"
                  @chooseEvent="selectOneOrNot(index)"></one-link>
    </div>
  </div>
</div>
</template>

<script>
import UserPageHead from '../mainUP/userpagehead'
import OneLink from './oneLink'
export default {
  name: 'sharePage',
  components: {OneLink, UserPageHead},
  data: function () {
    return {
      shareList: [
        {
          fileName: '恋恋笔记本',
          fileType: 'folder',
          skimTimes: 2,
          shareTime: '2018年10月11日',
          downloadTimes: 1,
          saveTimes: 1,
          invalidTime: '永久有效',
          isSelected: false
        },
        {
          fileName: '实验报告.doc',
          fileType: 'document',
          skimTimes: 4,
          shareTime: '2018年11月3日',
          downloadTimes: 3,
          saveTimes: 3,
          invalidTime: '2018年12月1号',
          isSelected: false
        },
        {
          fileName: 'web安全教程.pdf',
          fileType: 'document',
          skimTimes: 6,
          shareTime: '2018年11月2日',
          downloadTimes: 2,
          saveTimes: 5,
          invalidTime: '永久有效',
          isSelected: false
        }
      ],
      selectAll: false,
      functionOn: false,
      selectedNum: 0,
      sortByNameActive: false,
      sortBySkimTActive: false,
      sortBySTActive: false,
      sortByDTActive: false,
      sortByShareTActive: false,
      sortByITActive: false,
      isIncreaseSort: false
    }
  },
  methods: {
    selectOneOrNot: function (index) {
      this.shareList[index].isSelected = !this.shareList[index].isSelected
      console.log(this.shareList[index].isSelected)
      if (this.shareList[index].isSelected) {
        this.selectedNum += 1
        if (this.selectedNum === this.shareList.length) this.selectAll = true
        console.log('选择了' + this.selectedNum + '个')
        this.functionOn = true
      } else {
        this.selectedNum -= 1
        if (this.selectedNum < this.shareList.length) this.selectAll = false
        console.log('选择了' + this.selectedNum + '个')
        this.functionOn = false
      }
    },
    selectAllShareLink: function () {
      this.selectAll = !this.selectAll
      if (this.selectAll) {
        for (let i = 0; i < this.shareList.length; i++) {
          this.shareList[i].isSelected = true
        }
        this.selectedNum = this.shareList.length
        this.selectAll = true
        this.functionOn = true
      } else {
        for (let i = 0; i < this.shareList.length; i++) {
          this.shareList[i].isSelected = false
        }
        this.selectedNum = 0
        this.selectAll = false
        this.functionOn = false
      }
    },
    sortByName: function () {
      this.sortByNameActive = true
      this.sortBySkimTActive = false
      this.sortBySTActive = false
      this.sortByDTActive = false
      this.sortByShareTActive = false
      this.sortByITActive = false
      this.isIncreaseSort = !this.isIncreaseSort
      if (this.isIncreaseSort) {
        this.shareList.sort(function (a, b) {
          return a.fileName.localeCompare(b.fileName, 'zh-Hans-CN')
        })
      } else {
        this.shareList.sort(function (a, b) {
          let result = a.fileName.localeCompare(b.fileName, 'zh-Hans-CN')
          switch (result) {
            case 1: return -1
            case 0: return 0
            case -1: return 1
          }
        })
      }
    },
    sortBySkimTime: function () {
      this.sortByNameActive = false
      this.sortBySkimTActive = true
      this.sortBySTActive = false
      this.sortByDTActive = false
      this.sortByShareTActive = false
      this.sortByITActive = false
      this.isIncreaseSort = !this.isIncreaseSort
      if (this.isIncreaseSort) {
        this.shareList.sort(function (a, b) {
          return a.skimTimes - b.skimTimes
        })
      } else {
        this.shareList.sort(function (a, b) {
          return b.skimTimes - a.skimTimes
        })
      }
    },
    sortByDTimes: function () {
      this.sortByNameActive = false
      this.sortBySkimTActive = false
      this.sortBySTActive = false
      this.sortByDTActive = true
      this.sortByShareTActive = false
      this.sortByITActive = false
      this.isIncreaseSort = !this.isIncreaseSort
      if (this.isIncreaseSort) {
        this.shareList.sort(function (a, b) {
          return a.downloadTimes - b.downloadTimes
        })
      } else {
        this.shareList.sort(function (a, b) {
          return b.downloadTimes - a.downloadTimes
        })
      }
    },
    sortByShareTime: function () {
      this.sortByNameActive = false
      this.sortBySkimTActive = false
      this.sortBySTActive = false
      this.sortByDTActive = false
      this.sortByShareTActive = true
      this.sortByITActive = false
      this.isIncreaseSort = !this.isIncreaseSort
      if (this.isIncreaseSort) {
        this.shareList.sort(function (a, b) {
          if (a.shareTime > b.shareTime) return 1
          else if (a.shareTime < b.shareTime) return -1
          else return 0
        })
      } else {
        this.shareList.sort(function (a, b) {
          if (a.shareTime < b.shareTime) return 1
          else if (a.shareTime > b.shareTime) return -1
          else return 0
        })
      }
    },
    sortByInvalidTime: function () {
      this.sortByNameActive = false
      this.sortBySkimTActive = false
      this.sortBySTActive = false
      this.sortByDTActive = false
      this.sortByShareTActive = false
      this.sortByITActive = true
      this.isIncreaseSort = !this.isIncreaseSort
      if (this.isIncreaseSort) {
        this.shareList.sort(function (a, b) {
          if (a.invalidTime > b.invalidTime) return 1
          else if (a.invalidTime < b.invalidTime) return -1
          else return 0
        })
      } else {
        this.shareList.sort(function (a, b) {
          if (a.invalidTime < b.invalidTime) return 1
          else if (a.invalidTime > b.invalidTime) return -1
          else return 0
        })
      }
    },
    sortBySaveTimes: function () {
      this.sortByNameActive = false
      this.sortBySkimTActive = false
      this.sortBySTActive = true
      this.sortByDTActive = false
      this.sortByShareTActive = false
      this.sortByITActive = false
      this.isIncreaseSort = !this.isIncreaseSort
      if (this.isIncreaseSort) {
        this.shareList.sort(function (a, b) {
          return a.saveTimes - b.saveTimes
        })
      } else {
        this.shareList.sort(function (a, b) {
          return b.saveTimes - a.saveTimes
        })
      }
    }
  }
}
</script>

<style scoped>
#app{
  width:100%;
  height:100%;
}
  #shareContent{
    padding:10px;
    background-color: white;
    width:70%;
    height:84%;
    margin: 0 auto;
    border-radius: 5px;
    box-shadow: 0 0 10px #eff4f8;
  }
  h5{
    padding:0;
    margin:0 0 4px 0;
  }
  #shareList{
    width:99%;
    height: 91%;
    overflow-x:hidden;
    overflow-y:auto;
  }
  .tableHead{
    width:99%;
    height:5%;
    border-bottom:1px solid #eeeeee;
    letter-spacing: -5px;
  }
  span{
    letter-spacing: 0;
    display: inline-block;
    vertical-align: top;
  }
  .fileName,.skimTimes,.saveTimes,
  .downloadTimes,.invalidTime,.shareTime{
    display: inline-block;
    vertical-align: top;
    padding:2px;
    margin:0;
    height:83%;
    font-size:0.2em;
    cursor:pointer;
  }
  .chooseAll{
    display:inline-block;
    width:14px;
    height:14px;
    margin-top:1px;
    vertical-align:top;
    margin-right:5%;
    cursor:pointer;
    background-image:url('/static/img/checkbox1_unchecked.png');
  }
  .chooseAllAfterFO{
    display:inline-block;
    width:14px;
    height:14px;
    vertical-align:top;
    background-image:url('/static/img/checkbox1_unchecked.png');
    cursor:pointer;
    margin:3px 1% 0 2px;
  }
  .allIsChosen{
    background-image:url('/static/img/checkbox1.png');
  }
  .fileName{
    width:38%;
  }
  .fileName:hover,.skimTimes:hover,.saveTimes:hover,
  .downloadTimes:hover,.shareTime:hover,.invalidTime:hover{
    background-color: #eafcff;
  }
  .skimTimes{
    width:10%;
  }
  .saveTimes{
    width:10%;
  }
  .downloadTimes{
    width:10%;
  }
  .shareTime{
    width:15%;
  }
  .invalidTime{
    width:13%;
  }
  .downArrow{
    display:inline-block;
    width:14px;
    height:14px;
    background-image: url("/static/img/downArrow.png");
  }
  .upArrow{
    background-image: url("/static/img/upArrow.png");
  }
  #chosenNum{
    display: inline-block;
    vertical-align:top;
    font-size:0.2em;
    margin-top:2px;
    letter-spacing:0;
  }
  #cancelBtn{
    display:inline-block;
    vertical-align:top;
    font-size:0.2em;
    letter-spacing:0;
    margin-left:5%;
    border: 1px solid #4fbaff;
    padding:2px 10px 2px 10px;
    border-radius: 4px;
    color: #4fbaff;
    cursor: pointer;
  }
  #cancelBtn:hover{
    color: rgba(79,186,255,0.7);
  }
</style>
