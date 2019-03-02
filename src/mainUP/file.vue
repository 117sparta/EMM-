<template>
  <div id="oneItem">
    <div class="fileName1">
      <div class="chooseOneItem" :class="{'chooseOneItem_checked':fileItem.isSelected}" @click="$emit('event1')"></div>
      <div class="image" :style="{'background-image': 'url('+addImg()+')'}"></div>
      <div class="fileNameText">{{fileItem.fileName}}</div>
    </div>
    <div class="sizeText">{{fileItem.fileSize}}</div>
    <div class="lastModified">{{fileItem.lastModified}}</div>
  </div>
</template>

<script>
export default {
  name: 'file',
  props: ['fileItem'],
  data: function () {
    return {
      imgSrc: '/static/img/excel.png'
    }
  },
  methods: {
    addImg: function () {
      if (this.fileItem.fileType === 'document') {
        let fileName = this.fileItem.fileName
        let type = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length)
        switch (type) {
          case 'txt': return './static/img/txt.png'
          case 'xlsx': return './static/img/excel.png'
          case 'pdf': return './static/img/pdf.png'
          case 'mp3': return './static/img/music.png'
          case 'mp4': return './static/img/video.png'
          case 'doc': return './static/img/doc.png'
        }
      } else {
        return './static/img/folder.png'
      }
    }
  }
}
</script>

<style scoped>
  #oneItem{
    width:100%;
    height:10%;
    border-bottom:1px solid #eeeeee;
    font-size:0.56em;
    letter-spacing:-5px;
  }
  #oneItem:hover{
    background-color:#eafcff;
  }
  .fileName1,.sizeText,.lastModified{
    display:inline-block;
    vertical-align: top;
    letter-spacing: 0;
  }
  .chooseOneItem,.fileNameText,.image{
    display:inline-block;
    vertical-align:top;
    letter-spacing:0;
  }
  .image{
    margin-top:2px;
    width:32px;
    height:32px;
  }
  .fileName1{
    width: 64.3%;
    height:100%;
  }
  .fileName1:hover,.sizeText:hover,.lastModified:hover{
    background-color:#eafcff;
  }
  .chooseOneItem{
    width: 14px;
    height: 14px;
    margin:10px 3% 0 3px;
    cursor:default;
    background-image: url("/static/img/checkbox1_unchecked.png");
  }
  .chooseOneItem_checked{
    background-image: url("/static/img/checkbox1.png");
  }
  .fileNameText{
    margin-top: 10px;
    margin-left: 6px;
  }
  .sizeText{
    width:15.2%;
    padding-top:2px;
    height:90%;
  }
  .lastModified{
    width:19%;
    padding-top:2px;
    height:90%;
  }
</style>
