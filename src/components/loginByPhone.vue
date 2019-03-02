<template>
  <form id="textForm" v-if="!APLogin">
    <span class="loginWay" @click="$emit('loginByAP')">{{message.loginWay2}}</span>
    <h3>{{message.title2}}</h3>
    <input id="phoneNum" type="text" placeholder="手机号" value=""/>
    <input id="phoneTextCode" class="input" type="text" placeholder="验证码" value=""/>
    <button id="sendVerCode" @click.prevent="send"><span v-show="!message.timer">发送验证码</span><span v-show="message.timer">{{message.countdown}}秒后重试</span></button>
    <input class="submitButton" type="submit" @click="login2" value="登录"/>
  </form>
</template>

<script>
/* eslint-disable */
  import $ from 'jquery'

  export default {
    name: 'loginByPhone',
    props: ['APLogin'],
    data: function () {
      return {
        message: {
          loginWay2: '账号密码登录>',
          title2: '短信快捷登录',
          countdown: 40,
          timer: false,
          cycle: 0
        }
      }
    },
    methods: {
      send: function () {
          this.message.cycle = setInterval(()=>{
            let button = $('#sendVerCode');
          if(this.message.timer===false) this.message.timer=true;
            button.attr("disabled","disabled");
            button.css("backgroundColor","#eeeeee");
          if (this.message.countdown === 0) {
            clearInterval(this.message.cycle);
            this.message.timer=false;
            button.removeAttr("disabled");
            button.removeAttr("style");
            button[0].innerHTML = '发送验证码';
            this.message.countdown = 40;
            this.message.timer = false;
            console.log(this.message.countdown);
            return false;
          } else {
            console.log(this.message.countdown);
            this.message.countdown -= 1;
          }
        },1000);
      },
      login2: function (event) {
        event.preventDefault();
        let textForm = new FormData();
        // let httpPoster = new XMLHttpRequest()
        let phoneNum = $('#phoneNum').val();
        let IDCode = $('#phoneTextCode').val();
        textForm.append('phoneNum', phoneNum);
        textForm.append('verifyCode', IDCode)
        /* httpPoster.open("POST",);
        httpPoster.send(textForm);
        httpPoster.onreadystatechange=function(){
            if(httpPoster.readyState == 4 && httpPoster.status == 200){
                let flag=httpPoster.responseText;
                console.log(flag);
            }
        } */
      }
    }
  }
</script>

<style scoped>
  .submitButton {
    margin-top: 20px;
    width: 100%;
    height: 2.5em;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #3582f8;
    color: white;
    font-size: 1em;
  }

  .submitButton:hover {
    background-color: rgba(53, 130, 248, 0.7);
  }

  #textForm {
  / / position: relative;
  / / left: 67 %;
  / / top: 90 px;
    margin-right:15px;
    float: right;
    width: 24%;
    height: 57%;
    padding: 2%;
    min-width: 290px;
    min-height: 350px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 0 4px #82837f;
  }

  .loginWay {
    float: right;
    display: block;
    cursor: pointer;
    margin-top: 19px;
    color: rgba(12, 180, 255, 1);
  }

  .loginWay:hover {
    color: rgba(12, 180, 255, 0.6);
  }

  #phoneNum, #phoneTextCode {
    border: 1px solid #eaeaea;
  }

  #phoneNum {
    outline: none;
    height: 2.6em;
    text-indent: 1em;
    width: 100%;
    border-radius: 4px;
  }

  #phoneTextCode {
    margin-top: 10px;
    outline: none;
    width: 49%;
    height: 2.6em;
    text-indent: 1em;
    border-radius: 4px;
  }

  #sendVerCode {
    background-color: white;
    outline: none;
    border: 1px solid #eaeaea;
    height: 2.7em;
    width: 47%;
    cursor: pointer;
    border-radius: 4px;
    color: rgb(12, 180, 255);
  }

  #sendVerCode:hover {
    background-color: #eeeeee;
  }
</style>
