<template>
<div v-if="isActive">
  <div id="cover">
    <div id="folderNameInput">
      <div id="folderNameTip">
        <label for="nameInput">新文件名:</label>
        <br/>
        <input type="text" id="nameInput"/><br/>
      </div><!--end div folderNameTip-->
      <button class="confirmBtn" @click="renameConfirm">确定</button>
      <button class="abortBtn" @click="$emit('renameAbort')">取消</button>
    </div><!--end div folderNameInput-->
  </div><!--end div cover -->
</div>
</template>

<script>
export default {
  name: 'rename',
  props: ['isActive', 'fileName'],
  methods: {
    renameConfirm: function () {
      let nameInput = document.getElementById('nameInput')
      let newFileName = nameInput.value
      console.log(newFileName)
      this.$emit('renameConfirm', newFileName)
    }
  }
}
</script>

<style scoped>
#cover{
  min-width:1300px;
  min-height:600px;
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  z-index:1000;
  background-color:rgba(255,255,255,0.5);
}
#folderNameInput{
  width:20%;
  height:20%;
  margin:15% auto;
  padding-top:2%;
  border-radius: 6px;
  background-color:#eff4f8;
  box-shadow: 0 0 14px #c2c2c2;
}
#folderNameTip{
  margin-left:17%;
  margin-bottom: 2%;
}
label{
  font-size:0.93em;
  font-family: Arial, sans-serif;
}
#nameInput{
  margin-top:10px;
  border-radius:5px;
  border: 1px solid #ececec;
  outline:none;
  text-indent:0.4em;
  box-shadow: 2px 2px 2px #eff4f8;
  width:70%;
}
.confirmBtn,.abortBtn{
  margin-top:13px;
  width:20%;
  height:20%;
  background-color:#4e97ff;
  outline:none;
  color:white;
  border: none;
  border-radius:5px;
  cursor:pointer;
  box-shadow:2px 2px 4px #eff4f8;
}
.confirmBtn{
  margin-left:18%;
}
.abortBtn{
  margin-left:20%;
}
.confirmBtn:hover,.abortBtn:hover{
  color:rgba(255,255,255,0.7);
}
</style>
