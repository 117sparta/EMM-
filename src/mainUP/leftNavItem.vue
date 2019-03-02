<template>
    <li class="left-nav-item" v-bind:class="{'selected': itemName===currentTag}" @click="changeRoute">{{itemName}}</li>
</template>

<script>
export default {
  name: 'leftNavItem',
  props: ['itemName', 'pathName', 'currentTag'],
  /* data: function () {
    return {
      selected: {
        borderBottom: '1px solid black'
      }
    }
  }, */
  methods: {
    changeRoute: function () {
      this.$router.push({path: this.pathName})
      this.$emit('changeCurrentTag', this.itemName)
    }
  }
}
</script>

<style scoped>
  .left-nav-item{
    display:block;
    margin-top:15px;
    padding:10px;
    width:100%;
    height:20%;
    cursor:pointer;
    text-indent:1.5em;
    color: #b9b3bf;
    line-height: 1em;
    font-size: 0.94em;
  }
  .selected{
    background-color: #e3e8eb;
  }
  .left-nav-item:hover{
    background-color: #e3e8eb;
    transition: all 30ms ease-in;
  }
</style>
