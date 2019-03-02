<template>
  <div>
    <div class="controlBar">
      <span class="checkboxToChooseAll" :class="{'checked':picItem.allIsSelectedInOneSet}" @click="selectAllPictureOrNot"></span>
      <span class="date">{{picItem.date}}</span>
      <span class="spanForFolding" @click="displayOrNot">{{buttonText}}</span>
    </div>
    <div class="lineContainer" v-if="showOrNot">
      <div class="imgContainer"
           v-for="(item,index) in picItem.pictureUrls"
           :style="{'background-image': 'url('+item.url+')'}"
           :key="index"
           >
        <span  class="spanUsedForChoosing" :class="{'chosen': item.isSelected}" @click="$emit('statusChange',index)"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lineContainer',
  props: ['picItem'],
  data: function () {
    return {
      isChecked: false,
      showOrNot: true,
      buttonText: '收起',
      showButton: false
    }
  },
  methods: {
    displayOrNot: function () {
      if (this.showOrNot) {
        this.showOrNot = false
        this.buttonText = '展开'
      } else {
        this.showOrNot = true
        this.buttonText = '收起'
      }
    },
    selectAllPictureOrNot: function () {
      this.$emit('selectAll')
    }
  }
}
</script>

<style scoped>
  .controlBar{
    margin-top:6px;
    font-size:0.9em;
    color:#b9b3cc;
  }
  .checkboxToChooseAll{
    display:inline-block;
    width:16px;
    height:16px;
    margin-bottom:-3px;
    background-image:url("/static/img/checkBox_unchecked.png");
  }
  .checked{
    background-image: url("/static/img/checkBox_checked.png");
  }
  .date{
    display:inline-block;
    margin-left:14px;
    margin-right:20px;
  }
  .lineContainer{
    width:98%;
    margin-bottom:20px;
  }
  .imgContainer{
    display:inline-block;
    width:170px;
    height:170px;
    border:1px solid #eeeeee;
    margin:2px;
  }
  .spanUsedForChoosing{
    display:block;
    width:32px;
    height:32px;
    margin-left: 3px;
    margin-top: 3px;
    background-image:url("/static/img/notSelected.png");
  }
  .chosen{
    background-image:url("/static/img/selected.png")
  }
  .spanForFolding{
    display:inline-block;
    line-height:20px;
    border: 1px solid #b9b3cc;
    padding: 0 5px 0 5px;
    border-radius:4px;
    cursor:pointer;
  }
  .spanForFolding:hover{
    background-color:#eeeeee;
    color:white;
  }
</style>
