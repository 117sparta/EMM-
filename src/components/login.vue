<template>
  <div id="mainContainer">
    <header><h1>欢迎使用网盘</h1></header>
    <form id="loginForm" v-if="message.APLogin">
      <span class="loginWay" @click="message.APLogin=false">{{message.loginWay}}</span>
      <h3>{{message.title}}</h3>
      <div id="container">
        <input id="inputAccount" type="text" placeholder="手机/邮箱/用户名" value=""/>
        <input id="inputPassword" class="input" type="password" placeholder="密码" value=""/>
        <p>
          <input id="IDCode" type="text" placeholder="验证码" value=""/>
          <img id="IDCodeImg" :src="message.IDImage"/>
          <span id="changeCode">{{message.changeCode}}</span>
        </p>
        <input type="checkbox" id="autoLogin" checked="checked"/><label id="autoLoginLabel"
                                                                        for="autoLogin">下次自动登录</label>
        <br/>
        <input class="submitButton" @click.prevent="loginByAP" type="submit" value="登录"/>
        <p>
          <span id="forgetPW">忘记密码？</span><span id="register" @click="$router.push({path:'/signUp'})">立即注册</span>
        </p>
      </div><!-- end div#container -->
    </form><!--end form#loginForm-->
    <keep-alive>
      <login-by-phone :a-p-login="message.APLogin" @loginByAP="message.APLogin=true"></login-by-phone>
    </keep-alive>
  </div>
</template>

<script>
/*eslint-disable*/
  import $ from 'jquery'
  import LoginByPhone from "./loginByPhone";
  //var APLogin = true;
  export default {
    name: 'login',
    components: {LoginByPhone},
    loginWay: true,
    data: function () {
      return {
        message: {
          title: '帐号密码登录',
          title2: '短信快捷登录',
          isActive: true,
          loginState: '登录',
          loginWay: '短信快捷登录>',
          APLogin: true,
          changeCode: '换一张',
          countdown: 40,
          IDImage: 'https://passport.baidu.com/cgi-bin/genimage?njG5106f5365bc8e231020115275b0147898135de067f0114ea'
        }
      }
    },
    methods: {
      loginByAP: function () {/* 用于账号和密码登录的函数 */
        this.$router.push({path: '/userPage/allFile'});
        //event.preventDefault();
        let form = new FormData();
        //let httpPoster = new XMLHttpRequest();
        let account = $('#inputAccount').val();
        let password = $('#inputPassword').val();
        let verifyCode = $('#IDCode').val();
        let autoLogin = '';
        if ($('#autoLogin').is(':checked')) {
          autoLogin = 'Yes'
        } else {
          autoLogin = 'No'
        }
        form.append('account', account)
        form.append('password', password)
        form.append('verifyCode', verifyCode)
        form.append('autoLogin', autoLogin)
        /* httpPoster.open("post");
        httpPoster.send(form);
        httpPoster.onreadystatechange = function () {
            if (httpPoster.readyState == 4 && httpPoster.status == 200) {
                let flag = httpPoster.responseText;
                console.log(flag);
            }
        } */
      }
    }

  }
</script>

<style scoped>
  #loginForm {
    float: right;
    width: 24%;
    height: 57%;
    padding: 2%;
    margin-right:15px;
    min-width: 330px;
    min-height: 420px;
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

  #container {
    margin: 0 auto;
  }

  #inputAccount, #inputPassword, #IDCode, #IDCodeImg {
    border: 1px solid #eaeaea;
  }

  #inputAccount, #inputPassword {
    outline: none;
    width: 94%;
    height: 3em;
    text-indent: 0.7em;
  }

  #inputPassword {
    border-top-width: 0;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  #inputAccount {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  #IDCode {
    display: inline-block;
    width: 43%;
    height: 2.5em;
    outline: none;
    text-indent: 0.7em;
  }

  #IDCodeImg {
    display: inline-block;
    height: 2.2em;
    min-width: 1em;
    margin-bottom: -14px;
  }

  #changeCode {
    display: inline-block;
    cursor: pointer;
    color: rgb(53, 130, 248);
    font-size: 0.5em;
  }

  #changeCode:hover {
    color: rgba(53, 130, 248, 0.7);
  }

  #autoLoginLabel {
    font-size: 0.5em;
    margin-top: -3px;
  }

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

  #forgetPW {
    font-size: 1em;
    color: gray;
    cursor: pointer;
  }

  #register {
    margin-left: 50%;
    color: gray;
    font-size: 1em;
    cursor: pointer;
  }

  #forgetPW:hover, #register:hover {
    color: rgba(128, 128, 128, 0.75);
  }
</style>
