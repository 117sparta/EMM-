<template>
  <div id="videoFrame">
    <header>
      <div id="search">
        <input id="searchInput" type="text" placeholder="请输入你要搜索的内容"/>
        <button id="searchBtn">搜索</button>
      </div>
      <button id="uploadBtn" @click="chooseFile">
        <input id="fileList" type="file" @change="fileUpload($event)"/>上传
      </button>
      <button class="BtnStyle">
        下载
      </button>
      <button class="BtnStyle"  @click="deleteWarningIsActive=true">
        删除
      </button>
      <button
        class="BtnStyle"
        :class="{'renameBtnDisabled': totalSelectedNum>1}"
        @click="rename"
        id="renameBtn">
        重命名
      </button>
      <button class="BtnStyle">
        分享
      </button>
      <!--删除提示组件-->
      <d-w :is-active="deleteWarningIsActive"
           @deleteConfirm="deleteConfirm"
           @deleteAbort="deleteWarningIsActive=false"></d-w>
      <!--删除提示组件-->
      <!--重命名组件-->
      <rename :is-active="renameIsActive"
              :file-name="fileNameReadyToBeRevised"
              @renameAbort="renameIsActive=false"
              @renameConfirm="renameConfirm"></rename>
      <!--重命名组件-->
      <div>
        <div id="fileType">全部视频</div><div id="loadingState">加载完毕(共{{fileList.length}}个)</div>
      </div>
    </header>
    <div id="listHead">
      <div class="fileName1" @click="sortByName">
        <div class="selectAllCheckbox" :class="{'selectAllCheckbox_checked':isSelectedAll}" @click="selectAll"></div>
        <div class="fileNameText">文件名</div>
        <div class="downArrow"
             v-if="sortByNameActive"
             :class="{'upArrow':isIncreaseSort}"></div>
      </div>
      <div class="sizeText" @click="sortBySize">大小
        <div class="downArrow"
             v-if="sortBySizeActive"
             :class="{'upArrow':isIncreaseSort}"></div></div>
      <div class="lastModified" @click="sortByLT">修改时间
        <div class="downArrow"
             v-if="sortByLTActive"
             :class="{'upArrow':isIncreaseSort}"></div></div>
    </div><!-- end div listHead -->
    <div id="content">
      <file v-for="(item,index) in fileList"
            :file-item="item"
            :is-selected="item.isSelected"
            :key="index"
            @event1="eventHandler(index)"></file>
    </div>
  </div><!--end div videoFrame-->
</template>

<script>
import file from '@/mainUP/file'
import $ from 'jquery'
import DW from './deleteWarning'
import rename from './rename'
export default {
  name: 'videoDC', // video Display component
  components: {file, DW, rename},
  data: function () {
    return {
      isSelectedAll: false,
      totalSelectedNum: 0,
      deleteWarningIsActive: false,
      renameIsActive: false,
      fileNameReadyToBeRevised: '',
      sortByNameActive: false,
      sortBySizeActive: false,
      sortByLTActive: false,
      isIncreaseSort: false,
      fileList: [{
        fileName: '文件.mp4',
        fileType: 'document',
        fileSize: '27KB',
        lastModified: '2018/5/12',
        isSelected: false
      },
      {
        fileName: '恋恋笔记本.mp4',
        fileType: 'document',
        fileSize: '27KB',
        lastModified: '2018/5/12',
        isSelected: false
      },
      {
        fileName: '生化危机4.mp4',
        fileType: 'document',
        fileSize: '27KB',
        lastModified: '2018/5/12',
        isSelected: false
      }]
    }
  },
  created: function () {
    for (let i = 0; i < this.fileList.length; i++) {
      this.fileList[i].isSelected = false
    }
  },
  methods: {
    fileUpload: function (event) {
      let file = event.currentTarget.files[0]
      let form = new FormData()
      form.append('file', file)
      /* let httpPoster = new XMLHttpRequest()
      httpPoster.open("POST",)
      httpPoster.send(form)
      httpPoster.onreadystatechange = function () {
        if(httpPoster.readyState === 4 && httpPoster.status === 200){
          let flag = httpPoster.responseText
        }
      } */
    },
    chooseFile: function () {
      $('#fileList').click()
    },
    selectAll: function () {
      this.isSelectedAll = !this.isSelectedAll
      if (!this.isSelectedAll) {
        for (let i = 0; i < this.fileList.length; i++) {
          this.fileList[i].isSelected = false
          this.totalSelectedNum = 0
          $('#renameBtn').attr('disabled', false)
          $('.BtnStyle').hide()
        }
        console.log('选择总数为' + this.totalSelectedNum)
      } else {
        for (let i = 0; i < this.fileList.length; i++) {
          this.fileList[i].isSelected = true
          this.totalSelectedNum = this.fileList.length
        }
        $('.BtnStyle').show()
        $('#renameBtn').attr('disabled', true)
        console.log('选择总数为' + this.totalSelectedNum)
      }
    },
    eventHandler: function (index) {
      // console.log('成功进入函数')
      if (this.totalSelectedNum === this.fileList.length) {
        // console.log('进入了第一个分支')
        this.isSelectedAll = false
        if (this.fileList[index].isSelected === true) {
          this.fileList[index].isSelected = false
          this.totalSelectedNum -= 1
          // console.log('编号为' + index + '是否选中为' + this.fileList[index].isSelected)
          //  console.log('总选择数为' + this.totalSelectedNum)
        }
      } else {
        // console.log('进入了第二个分支')
        if (this.fileList[index].isSelected === true) {
          // console.log('进入了2.1个分支')
          this.fileList[index].isSelected = false
          this.totalSelectedNum -= 1
          // console.log('编号为' + index + '是否选中为' + this.fileList[index].isSelected)
          // console.log('总选择数为' + this.totalSelectedNum)
        } else {
          // console.log('进入了2.2个分支')
          this.fileList[index].isSelected = true
          this.totalSelectedNum += 1
          // console.log('编号为' + index + '是否选中为' + this.fileList[index].isSelected)
          // console.log('总选择数为' + this.totalSelectedNum)
          if (this.totalSelectedNum === this.fileList.length) {
            this.isSelectedAll = true
            // console.log('编号为' + index + '是否选中为' + this.fileList[index].isSelected)
            // console.log('总选择数为' + this.totalSelectedNum)
          }
        }
      }
      if (this.totalSelectedNum !== 0) {
        $('.BtnStyle').show()
      } else {
        $('.BtnStyle').hide()
      }
      if (this.totalSelectedNum > 1) {
        $('#renameBtn').attr('disabled', true)
      } else {
        $('#renameBtn').attr('disabled', false)
      }
      // console.log('函数执行完成')
    },
    deleteConfirm: function () {
      this.deleteWarningIsActive = false
      $('.BtnStyle').hide()
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].isSelected === true) {
          this.fileList.splice(i, 1)
          i--
        }
      }
    },
    rename: function () {
      this.renameIsActive = true
      if (this.totalSelectedNum === 1) {
        for (let i = 0; i < this.fileList.length; i++) {
          console.log('enterLoop')
          if (this.fileList[i].isSelected === true) {
            this.fileNameReadyToBeRevised = this.fileList[i].fileName
          }
        }
      }
    },
    renameConfirm: function (data) {
      this.renameIsActive = false
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].isSelected === true && data !== '') {
          this.fileList[i].fileName = data
          return
        } else if (this.fileList[i].isSelected === true) {
          let oldFileName = this.fileList[i].fileName
          this.fileList[i].fileName = data + oldFileName.substring(oldFileName.lastIndexOf('.'), oldFileName.length)
          return
        }
      }
    },
    sortByName: function () {
      this.sortByNameActive = true
      this.sortBySizeActive = false
      this.sortByLTActive = false
      this.isIncreaseSort = !this.isIncreaseSort
      if (this.isIncreaseSort) {
        this.fileList.sort(function (a, b) {
          return a.fileName.localeCompare(b.fileName, 'zh-Hans-CN')
        })
      } else {
        this.fileList.sort(function (a, b) {
          let result = a.fileName.localeCompare(b.fileName, 'zh-Hans-CN')
          switch (result) {
            case 1: return -1
            case 0: return 0
            case -1: return 1
          }
        })
      }
    },
    sortBySize: function () {
      this.sortByNameActive = false
      this.sortBySizeActive = true
      this.sortByLTActive = false
      this.isIncreaseSort = !this.isIncreaseSort
      if (this.isIncreaseSort) {
        this.fileList.sort(function (a, b) {
          return a.fileSize - b.fileSize
        })
      } else {
        this.fileList.sort(function (a, b) {
          return b.fileSize - a.fileSize
        })
      }
    },
    sortByLT: function () {
      this.sortByNameActive = false
      this.sortBySizeActive = false
      this.sortByLTActive = true
      this.isIncreaseSort = !this.isIncreaseSort
      if (this.isIncreaseSort) {
        this.fileList.sort(function (a, b) {
          if (a.lastModified > b.lastModified) return 1
          else if (a.lastModified < b.lastModified) return -1
          else return 0
        })
      } else {
        this.fileList.sort(function (a, b) {
          if (a.lastModified > b.lastModified) return -1
          else if (a.lastModified < b.lastModified) return 1
          else return 0
        })
      }
    }
  }
}
</script>

<style scoped>
  div#videoFrame{
    width:99%;
    height:90%;
  }
  header{
    padding:1%;
    width:98%;
    height:15%;
  //border:1px solid black;
    overflow:hidden;
  }
  #uploadBtn,#searchBtn{
    height:1.5em;
    font-size:1em;
    cursor: pointer;
    outline:none;
  }
  #uploadBtn{
    width:8%;
    height:42%;
    padding:10px;
    font-size: 0.92em;
    text-align:center;
    border-radius:4px;
    color: white;
    line-height:10px;
    background-color: #4e97ff;
    box-shadow: 3px 3px 3px #fffff4;
    border:none;
  }
  #uploadBtn:hover{
    color: rgba(255,255,255,0.7);
  }
  #fileType,#loadingState{
    display:inline-block;
    font-size:0.7em;
    font-family: "Microsoft YaHei", "微软雅黑",sans-serif;
  }
  #fileType{
    float:left;
    margin:2% 0 0 0;
  }
  #loadingState{
    float:right;
    margin:2% 3% 0 0;
  }
  .BtnStyle{
    display:none;
    cursor: pointer;
    outline:none;
    width: 10%;
    height:42%;
    line-height: 5px;
    border-radius:4px;
    font-size: 0.92em;
    color: #4e97ff;
    background-color: white;
    box-shadow: 3px 3px 3px #fffff4;
    border: 1px solid #c0d9fe;
  }
  .BtnStyle:hover{
    color: rgba(78,151,255,0.7);
  }
  .renameBtnDisabled{
    color: rgba(78,151,255,0.7);
    cursor: not-allowed;
  }
  #searchBtn{
    width:25%;
    color: #b9b3bf;
    background-color: #f8f8f8;
    border-top-right-radius:6px;
    border-bottom-right-radius:6px;
    border: none;
  }
  #searchBtn:hover{
    color: #c4c6c2;
  }
  #search{
    width:24%;
    float: right;
    display: inline-block;
    background-color: #f8f8f8;
    border:1px solid #EEFFE5;
    border-radius:4px;
  }
  #searchInput{
    display:inline-block;
    width:72%;
    height:1.5em;
    outline:none;
    text-indent:0.7em;
    background-color: #f8f8f8;
    border:none;
  }
  #content{
    width:100%;
    height:75%;
    overflow-x:hidden;
    overflow-y:auto;
  }
  input[type='file']{
    display:none;
  }
  span#search{
    margin-left:55%;
  }
  p{
    font-size: 0.4em;
    margin-top: 32px;
  }
  span#fileType{
    font-size:0.4em;
  }
  span#loadingState{
    margin-left:80%;
    font-size:0.4em;
  }
  #listHead{
    width:100%;
    height:5.3%;
    border-bottom:1px solid #eeeeee;
    font-size:0.56em;
    letter-spacing:-5px;
  }
  .fileName1,.sizeText,.lastModified{
    display:inline-block;
    vertical-align: top;
    letter-spacing: 0;
    cursor:pointer
  }
  .selectAllCheckbox,.fileNameText{
    display:inline-block;
    vertical-align:top;
    letter-spacing:0;
  }
  .fileName1{
    width: 64%;
    height:100%;
  }
  .fileName1:hover,.sizeText:hover,.lastModified:hover{
    background-color:#eafcff;
  }
  .selectAllCheckbox{
    width: 14px;
    height: 14px;
    margin:3px 3% 0 3px;
    cursor:default;
    background-image: url("/static/img/checkbox1_unchecked.png");
  }
  .selectAllCheckbox_checked{
    background-image: url("/static/img/checkbox1.png");
  }
  .fileNameText{
    margin-top: 2px;
  }
  .sizeText{
    width:15%;
    padding-top:2px;
    height:90%;
  }
  .lastModified{
    width:19%;
    padding-top:2px;
    height:90%;
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
  #content::-webkit-scrollbar{/*滚动条整体部分，其中的属性有width,height,background,border等（就和一个块级元素一样）（位置1）*/
    width:10px;
    height:10px;
  }
  #content::-webkit-scrollbar-button{/*滚动条两端的按钮，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置2）*/
  //background:#74D334;
    display:none;
  }
  #content::-webkit-scrollbar-track{/*外层轨道，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置3）*/
    background:#FFFFFF;
    border-radius: 4px;
  }
  #content::-webkit-scrollbar-track-piece{/*内层轨道，滚动条中间部分（位置4）*/
    background:#eeeeee;
    border-radius: 4px;
  }
  #content::-webkit-scrollbar-thumb{/*滚动条里面可以拖动的那部分（位置5）*/
    background:#FFA711;
    border-radius:4px;
  }
  #content::-webkit-scrollbar-corner {/*边角（位置6）*/
    background:#82AFFF;
  }
  /*#content::-webkit-scrollbar-resizer {定义右下角拖动块的样式（位置7）
    background:#FF0BEE;
  } */
  #content {
    scrollbar-arrow-color: #f4ae21; /**//*三角箭头的颜色*/
    scrollbar-face-color: #333; /**//*立体滚动条的颜色*/
    scrollbar-3dlight-color: #666; /**//*立体滚动条亮边的颜色*/
    scrollbar-highlight-color: #666; /**//*滚动条空白部分的颜色*/
    scrollbar-shadow-color: #999; /**//*立体滚动条阴影的颜色*/
    scrollbar-darkshadow-color: #666; /**//*立体滚动条强阴影的颜色*/
    scrollbar-track-color: #666; /**//*立体滚动条背景颜色*/
    scrollbar-base-color: #f8f8f8; /**//*滚动条的基本颜色*/
  }
</style>
