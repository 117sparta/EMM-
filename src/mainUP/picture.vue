<template>
<div id="pictureFrame">
  <header id="picPageHeader">
    <span
      :class="{'way':!(currentWay ==='按照日期查看'),'waySelected': currentWay === '按照日期查看'}"
      v-if="functionIsntActive"
      @click="requirePicByDate">按照日期查看</span>
    <span
      :class="{'way':!(currentWay ==='最近上传'),'waySelected': currentWay === '最近上传'}"
      v-if="functionIsntActive"
      @click="requirePicRecently">最近上传</span>
    <div id="buttonGroup" v-if="!functionIsntActive">
      <button class="functionBtn">下载</button>
      <button class="functionBtn" @click="deleteIsActive = true">删除</button>
      <button class="functionBtn">分享</button>
      <div id="headAside">
      <span v-if="currentWay==='按照日期查看'">已选{{this.totalSelectedPicNum}}张</span>
      <span v-if="currentWay==='最近上传'">已选{{this.singlePicSelectedNum}}张</span>
      <button id="abortChoose" @click="abortChoosePic">取消选择</button>
      </div>
    </div>
  </header>
  <delete-warning
  :is-active="deleteIsActive"
  @deleteAbort="deleteAbort"
  @deleteConfirm="deletePic">
  </delete-warning>
  <div class="pictureList" v-if="currentWay==='按照日期查看'">
    <line-container v-for='(item, index) in dataList'
                    :picItem="item"
                    :key="index"
                    @statusChange="statusChange(index,$event)"
                    @selectAll="selectAllPic(index)"
                    >
    </line-container>
  </div>
  <div class="pictureList" v-if="currentWay==='最近上传'">
    <single-pic
      :selectAll="singlePic_selectAll"
      @SP_selectAll="SP_selectAll"
      :fileList="fileList"
      @chooseOne="chooseOne($event)"
    ></single-pic>
  </div>
</div>
</template>

<script>
import lineContainer from '@/picturePageComp/lineContainer'
import singlePic from '@/picturePageComp/singlePic'
import DeleteWarning from './deleteWarning'
export default {
  name: 'pictureDC', // picture Display Component
  components: {DeleteWarning, lineContainer, singlePic},
  mounted: function () {
    this.dataList.sort(function (a, b) {
      if (a.date > b.date) return -1
      else if (a.date < b.date) return 1
      else return 0
    })
  },
  data: function () {
    return {
      dataList: [
        {
          date: '2018 年 12 月 17 号',
          selectedNumOfSet: 0,
          allIsSelectedInOneSet: false,
          hasSelectedPic: false,
          pictureUrls: [
            {
              url: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1983921038,758562540&fm=173&app=25&f=JPEG?w=218&h=146&s=DD2206D4001B37D6D45184AE03007003',
              isSelected: false
            },
            {
              url: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3538254959,732289903&fm=173&app=25&f=JPEG?w=218&h=146&s=3BA2CC4C4EE3854F5CF17031030090C1',
              isSelected: false
            },
            {
              url: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=590989231,3198621330&fm=173&app=25&f=JPEG?w=218&h=146&s=17839C4DEE525045159D7DC80300E011',
              isSelected: false
            }
          ]
        },
        {
          date: '2018 年 12 月 28 号',
          selectedNumOfSet: 0,
          allIsSelectedInOneSet: false,
          hasSelectedPic: false,
          pictureUrls: [
            {
              url: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1983921038,758562540&fm=173&app=25&f=JPEG?w=218&h=146&s=DD2206D4001B37D6D45184AE03007003',
              isSelected: false
            },
            {
              url: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3538254959,732289903&fm=173&app=25&f=JPEG?w=218&h=146&s=3BA2CC4C4EE3854F5CF17031030090C1',
              isSelected: false
            },
            {
              url: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=590989231,3198621330&fm=173&app=25&f=JPEG?w=218&h=146&s=17839C4DEE525045159D7DC80300E011',
              isSelected: false
            }
          ]
        }
      ],
      fileList: [
        {
          url: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1983921038,758562540&fm=173&app=25&f=JPEG?w=218&h=146&s=DD2206D4001B37D6D45184AE03007003',
          isSelected: false
        },
        {
          url: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2262112666,4008645141&fm=173&app=25&f=JPG?w=218&h=146&s=E9831B701A5047F7A8A4694E020070E6',
          isSelected: false
        }
      ],
      singlePic_selectAll: false,
      totalSelectedPicNum: 0,
      currentWay: '按照日期查看',
      singlePicSelectedNum: 0,
      funtionBtnIsShow: false,
      functionIsntActive: true,
      deleteIsActive: false
    }
  },
  methods: {
    statusChange: function (index, data) {
      let currentSet = this.dataList[index]
      let urls = currentSet.pictureUrls
      urls[data].isSelected = !urls[data].isSelected
      if (urls[data].isSelected) {
        currentSet.selectedNumOfSet += 1
        this.totalSelectedPicNum += 1
        currentSet.hasSelectedPic = true
        if (currentSet.selectedNumOfSet === urls.length) {
          currentSet.allIsSelectedInOneSet = true
        }
        console.log('选择了' + currentSet.selectedNumOfSet + '个')
        console.log('总共选择了' + this.totalSelectedPicNum + '个')
      } else {
        if (currentSet.selectedNumOfSet === urls.length) currentSet.allIsSelectedInOneSet = false
        currentSet.selectedNumOfSet -= 1
        this.totalSelectedPicNum -= 1
        if (currentSet.selectedNumOfSet === 0) currentSet.hasSelectedPic = false
        console.log('选择了' + currentSet.selectedNumOfSet + '个')
        console.log('总共选择了' + this.totalSelectedPicNum + '个')
      }
      this.functionIsntActive = (this.totalSelectedPicNum === 0)
    },
    selectAllPic: function (index) {
      let list = this.dataList[index].pictureUrls
      let currentSet = this.dataList[index]
      if (!currentSet.allIsSelectedInOneSet) {
        currentSet.allIsSelectedInOneSet = true
        currentSet.selectedNumOfSet = list.length
        if (currentSet.hasSelectedPic) {
          for (let i = 0; i < list.length; i++) {
            if (list[i].isSelected === false) {
              this.totalSelectedPicNum += 1
            }
          }
        } else {
          this.totalSelectedPicNum += list.length
        }
        for (let i = 0; i < list.length; i++) {
          list[i].isSelected = true
        }
        console.log('选择了' + currentSet.selectedNumOfSet + '个')
        console.log('总共选择了' + this.totalSelectedPicNum + '个')
      } else {
        currentSet.selectedNumOfSet = 0
        currentSet.allIsSelectedInOneSet = false
        console.log('选择的数量为' + currentSet.selectedNumOfSet)
        for (let i = 0; i < list.length; i++) {
          list[i].isSelected = false
        }
        this.totalSelectedPicNum -= list.length
        console.log('总共选择了' + this.totalSelectedPicNum + '个')
      }
      this.functionIsntActive = (this.totalSelectedPicNum === 0)
    },
    requirePicByDate: function () {
      this.currentWay = '按照日期查看'
    },
    requirePicRecently: function () {
      this.currentWay = '最近上传'
    },
    SP_selectAll: function () {
      if (!this.singlePic_selectAll) {
        this.singlePicSelectedNum = this.fileList.length
        console.log('选择了' + this.singlePicSelectedNum + '个')
        this.singlePic_selectAll = true
        for (let i = 0; i < this.fileList.length; i++) {
          this.fileList[i].isSelected = true
        }
      } else if (this.singlePic_selectAll) {
        this.singlePicSelectedNum = 0
        console.log('选择了' + this.singlePicSelectedNum + '个')
        this.singlePic_selectAll = false
        for (let i = 0; i < this.fileList.length; i++) {
          this.fileList[i].isSelected = false
        }
      }
      this.functionIsntActive = (this.singlePicSelectedNum === 0)
    },
    chooseOne: function (index) {
      this.fileList[index].isSelected = !this.fileList[index].isSelected
      if (this.fileList[index].isSelected) {
        this.singlePicSelectedNum += 1
        console.log('选择了' + this.singlePicSelectedNum + '个')
        if (this.singlePicSelectedNum === this.fileList.length) this.singlePic_selectAll = true
      } else {
        this.singlePicSelectedNum -= 1
        if (!(this.singlePicSelectedNum === this.fileList.length)) this.singlePic_selectAll = false
        console.log('选择了' + this.singlePicSelectedNum + '个')
      }
      this.functionIsntActive = (this.singlePicSelectedNum === 0)
    },
    abortChoosePic: function () {
      if (this.currentWay === '按照日期查看') {
        this.totalSelectedPicNum = 0
        for (let i = 0; i < this.dataList.length; i++) {
          this.dataList[i].selectedNumOfSet = 0
          this.dataList[i].allIsSelectedInOneSet = false
          for (let j = 0; j < this.dataList[i].pictureUrls.length; j++) {
            if (this.dataList[i].pictureUrls[j].isSelected) this.dataList[i].pictureUrls[j].isSelected = false
          }
        }
      } else {
        this.singlePicSelectedNum = 0
        this.singlePic_selectAll = false
        for (let i = 0; i < this.fileList.length; i++) {
          if (this.fileList[i].isSelected) this.fileList[i].isSelected = false
        }
      }
      this.functionIsntActive = true
    },
    deletePic: function () {
      for (let i = 0; i < this.dataList.length; i++) {
        if (this.dataList[i].allIsSelectedInOneSet === true) {
          this.dataList.splice(i, 1)
          i--
        } else {
          for (let j = 0; j < this.dataList[i].pictureUrls.length; j++) {
            if (this.dataList[i].pictureUrls[j].isSelected === true) {
              this.dataList[i].pictureUrls.splice(j, 1)
              j--
            }
          }
        }
      }
      this.functionIsntActive = true
      this.deleteIsActive = false
    },
    deleteAbort: function () {
      this.deleteIsActive = false
    }
  }
}
</script>

<style scoped>
#pictureFrame{
  width:100%;
  height:96%;
  //border:1px solid black;
}
  #picPageHeader{
    width:100%;
    height:10%;
    border-bottom:1px solid #b9b3cc;
  }
  .way{
    display:inline-block;
    margin:5px 20px 0 20px;
    padding:10px;
    border-radius:4px;
    color:#b9b3cc;
    cursor:pointer;
  }
  .way:hover{
    color:rgba(185, 196, 227,0.7);
  }
  .waySelected{
    display:inline-block;
    margin:5px 20px 0 20px;
    padding:10px;
    border-radius:4px;
    cursor:pointer;
    background-color: #0c86ee;
    color:white;
  }
  #buttonGroup{
    display:inline-block;
    margin: 1% 0 0 2%;
    width:80%;
  }
  #headAside{
    display:inline-block;
    float: right;
  }
  #abortChoose{
    background-color:#0c86ee;
    color: white;
    border-radius:4px;
    cursor:pointer;
    outline:none;
    border:none;
    height:2.2em;
  }
  #abortChoose:hover{
    color: rgba(255,255,255,0.7);
  }
  .pictureList{
    overflow-y:auto;
    overflow-x:hidden;
    padding:1%;
    width:97.7%;
    height:84%;
    margin-top:8px;
    //border:1px solid gray;
  }
  .pictureList::-webkit-scrollbar{
    width:10px;
    height:10px;
  }
  .pictureList::-webkit-scrollbar-button{
    display:none;
  }
  .pictureList::-webkit-scrollbar-track{
    background-color: white;
    border-radius: 4px;
  }
  .pictureList::-webkit-scrollbar-track-piece{
    background-color:#eee;
    border-radius:4px;
  }
  .pictureList::-webkit-scrollbar-thumb{
    background-color:#FFA711;
    border-radius:4px;
  }
  .functionBtn{
    width:10%;
    height:2.2em;
    outline:none;
    border: 1px solid #c0d9fe;
    border-radius: 5px;
    background-color: white;
    color: #4e97ff;
    cursor:pointer;
  }
  .functionBtn:hover{
    color: rgba(78,151,255,0.7);
  }
</style>
