<template>
    <div>
      <header>
        <div id="all"
             class="single-pic-selectAll"
             :class="{'single-pic-selectAll-checked':selectAll}"
             @click="$emit('SP_selectAll')"></div>
        <div id="selectAllTip" @click="spanLink">&nbsp;全选</div>
      </header>
      <div class="imgContainer"
        v-for="(item,index) of fileList"
        :style="{'background-image': 'url('+item.url+')'}"
        :key="index">
        <span class="spanUsedForChoosing"
              :class="{'chosen': item.isSelected}"
              @click="$emit('chooseOne',index)"></span>
      </div>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'singlePicComp',
  props: ['selectAll', 'fileList'],
  methods: {
    spanLink: function () {
      $('all').click()
    }
  }
}
</script>

<style scoped>
  header{
    margin-bottom: 10px;
  }
  .single-pic-selectAll{
    display:inline-block;
    width:16px;
    height:16px;
    background-image: url("/static/img/checkBox_unchecked.png");
    cursor:pointer;
  }
  .single-pic-selectAll-checked{
    background-image: url("/static/img/checkBox_checked.png");
  }
  #selectAllTip{
    display: inline-block;
    cursor:pointer;
  }
  .imgContainer{
    display:inline-block;
    width:170px;
    height:170px;
    border:1px solid #eeeeee;
    margin:2px;
    background-image: url("https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4123274233,407043925&fm=173&app=25&f=JPEG?w=218&h=146&s=B8C0608406B28DC2464430990300D080");
  }
  .spanUsedForChoosing{
    display:inline-block;
    width:32px;
    height:32px;
    margin-left: 3px;
    margin-top: 3px;
    background-image:url("/static/img/notSelected.png");
  }
  .chosen{
    background-image:url("/static/img/selected.png")
  }
</style>
