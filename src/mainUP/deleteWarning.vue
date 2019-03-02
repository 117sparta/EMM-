<template>
  <div v-if="isActive">
    <div id="coverSheet">
    <div id="deleteOrNotFrame">
      <p id="deleteTip">确认要删除吗？</p>
      <button class="confirmBtn"  @click="deleteConfirm">确定</button>
      <button class="abortBtn" @click="deleteAbort">取消</button>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'deleteWarning',
  props: ['isActive'],
  methods: {
    deleteConfirm: function () {
      this.$emit('deleteConfirm')
    },
    deleteAbort: function () {
      this.$emit('deleteAbort')
    }
  }
}
</script>

<style scoped>
  #deleteTip{
    padding-top:20px;
    padding-left:70px;
    font-size:1.2em;
    font-family: Arial, sans-serif;
  }
  #coverSheet{
    position:absolute;
    min-width:1300px;
    min-height:600px;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:1000;
    background-color:rgba(255,255,255,0.5);
  }
  #deleteOrNotFrame{
    width:20%;
    height:20%;
    margin:15% auto;
    border-radius: 6px;
    background-color:#eff4f8;
    box-shadow: 0 0 14px #c2c2c2;
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
    margin-left:27%;
  }
  .confirmBtn:hover,.abortBtn:hover{
    color:rgba(255,255,255,0.7);
  }
</style>
