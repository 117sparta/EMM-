<template>
  <div class="oneLink">
    <div class="name">
      <div class="chooseOne"
           :class="{'oneIsChosen': linkItem.isSelected}"
           @click="$emit('chooseEvent')"></div>
      <span class="image" :style="{'background-image':'url('+addImg()+')'}"></span>
      <div class="fileName">{{linkItem.fileName}}</div>
    </div>
    <div class="skimTimes"><span class="text">{{linkItem.skimTimes}}</span></div>
    <div class="saveTimes"><span class="text">{{linkItem.saveTimes}}</span></div>
    <div class="downloadTimes"><span class="text">{{linkItem.downloadTimes}}</span></div>
    <div class="shareTime"><span class="characterText">{{linkItem.shareTime}}</span></div>
    <div class="invalidTime"><span class="characterText">{{linkItem.invalidTime}}</span></div>
  </div>
</template>

<script>
export default {
  name: 'oneLink',
  props: ['linkItem'],
  methods: {
    addImg: function () {
      if (this.linkItem.fileType === 'document') {
        let fileName = this.linkItem.fileName
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
  .name,.skimTimes,.saveTimes,
  .downloadTimes,.invalidTime,.shareTime{
    display: inline-block;
    vertical-align: top;
    padding:2px;
    margin:0;
    height:83%;
    font-size:0.2em;
    letter-spacing: 0;
  }
  .name{
    width:38%;
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
    width:12%;
  }
  .oneLink{
    letter-spacing:-5px;
    height: 9%;
    vertical-align:top;
    border-bottom:1px solid #eeeeee;
  }
  .oneLink:hover{
    background-color: #eafcff;
  }
  .chooseOne{
    display:inline-block;
    width:14px;
    height:14px;
    vertical-align: top;
    margin:2% 1% 0 0;
    cursor:pointer;
    background-image:url('/static/img/checkbox1_unchecked.png');
  }
  .oneIsChosen{
    background-image:url('/static/img/checkbox1.png');
  }
  .image{
    display: inline-block;
    width:32px;
    height:32px;
    vertical-align: center;
    background-image: url("/static/img/folder.png")
  }
  .fileName{
    display:inline-block;
    vertical-align: top;
    margin:2% 1% 0 0;
  }
  .text{
    display: block;
    margin:10% 1% 0 0;
  }
  .characterText{
    display: block;
    margin:6% 1% 0 0;
  }
</style>
