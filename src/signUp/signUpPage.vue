<template>
  <div id="registerPage">
    <header>
      <span id="note">我已经注册，现在就<span id="linkToLogin" @click="$router.push({path:'/'})">登录</span></span>
      <h2>注册账号</h2>
    </header>
    <div id="regInputFrame">
      <div id="tips">
      <div class="accountTips" :class="{'wrongPW':notAvailableAccount, 'PWPass': accountPass}">
        {{accountTip}}
      </div><!--end div accountTips-->
      <div id="passwordTips">
        {{passwordTip}}
      </div><!--end div passwordTips-->
      <div class="warningTips" :class="{'wrongPW':wrongPW,'PWPass':PWPass}">
        {{warningMessage}}
      </div><!--end div warningTips-->
      </div><!--end div tips-->
      <div id="inputItems">
        <label for="account">用户名:</label>
        <input type="text"
               id="account"
               placeholder="请输入用户名"
               @focus="accountGetFocus"
               @blur="testAccount"/><br/>
        <label for="PW">密码:</label>
        <input type="password"
               id="PW"
               placeholder="请输入密码"
               @focus="passwordTip='密码在6到14个字符之间，建议字母和数字混合组合'"
               @blur="warningOrAccept"/><br/>
        <label for="SamePW">再次输入密码:</label>
        <input type="password"
               placeholder="请再次输入密码"
               id="SamePW"
               @focus="passwordGetFocus"
               @blur="warningOrAccept"/>
        <button
          class="regBtn"
          :disabled="regBtnIsDisabled"
          :class="{'regBtnDisabled':regBtnIsDisabled}"
          @click="register">注册</button>
      </div><!--end div inputItems -->
    </div><!--end div regInputFrame -->
    <!--注册成功提醒 开始-->
    <div class="registerCoverSheet" v-if="registerIsSuccessful">
        <div id="regSuccessfully">
          <button id="regConfirm"  @click="jumpToLogin">x</button>
          <img src="/static/img/RS1.png" /><br/>
          <span class="regTip">注册成功</span><br/>
        </div>
    </div>
    <!--注册成功提醒 结束-->
  </div><!--end div registerPage -->
</template>

<script>
import $ from 'jquery'
export default {
  name: 'signUpPage',
  data: function () {
    return {
      showAccountTips: false,
      showPasswordTips: false,
      showWarningTips: false,
      warningTipsActive: false,
      accountTip: '',
      notAvailableAccount: false,
      accountPass: false,
      passwordTip: '',
      warningMessage: '',
      wrongPW: false,
      PWPass: false,
      regBtnIsDisabled: true,
      registerIsSuccessful: false
    }
  },
  methods: {
    warningOrAccept: function () {
      this.passwordTip = ''
      let PW = $('#PW')
      let SamePW = $('#SamePW')
      if (PW.val() === SamePW.val() && PW.val() !== '') {
        this.wrongPW = false
        this.PWPass = true
        this.warningMessage = '通过'
        this.regBtnIsDisabled = false
      } else if (PW.val() === SamePW.val() && SamePW.val() === '') {
        this.warningMessage = '密码不能为空'
        this.wrongPW = true
        this.PWPass = false
        this.regBtnIsDisabled = true
      } else {
        this.warningMessage = '两次输入的密码不一致!!!'
        this.regBtnIsDisabled = true
        this.wrongPW = true
        this.PWPass = false
      }
    },
    testAccount: function () {
      let accountInput = $('#account')
      if (accountInput.val() === '') {
        this.accountTip = '用户名不能为空'
        this.notAvailableAccount = true
        this.accountPass = false
        this.regBtnIsDisabled = true
      } else {
        this.notAvailableAccount = false
        this.accountPass = true
        this.accountTip = '用户名可用'
        this.regBtnIsDisabled = false
      }
    },
    accountGetFocus: function () {
      this.accountTip = '用户名可以4~14个字符，中英文皆可'
      this.notAvailableAccount = false
      this.accountPass = false
    },
    passwordGetFocus: function () {
      this.warningMessage = '两次输入的密码需要一致'
      this.wrongPW = false
      this.PWPass = false
    },
    register: function () {
      this.registerIsSuccessful = true
    },
    jumpToLogin: function () {
      this.registerIsSuccessful = false
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style scoped>
#registerPage{
  width:80%;
  height:95%;
  margin: 10px auto;
  padding:1%;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 14px #eff4f8;
}
header{
  border-bottom: 1px solid black;
}
#note{
  float:right;
  margin-right:20px;
}
#linkToLogin{
  color: #16a2ff;
  cursor:pointer;
  text-decoration: underline;
}
#linkToLogin:hover{
  color:rgba(22,162,255,0.7);
}
#regInputFrame{
  width:70%;
  height:50%;
  margin-top: 5%;
}
#inputItems{
  display:inline-block;
  width:60%;
  text-align:right;
}
#tips{
  float:right;
  width:36%;
  height:100%;
}
.accountTips,#passwordTips,.warningTips{
  width:60%;
  height:15%;
  font-size:0.82em;
  color: #bab6b6;
  margin-top:4.3%;
}
.warningTips{
  margin-top:8%;
}
.wrongPW{
  color: red;
}
.PWPass{
  color: #00d000;
}
  #account,#PW,#SamePW{
    margin: 10px 0 10px 10px;
    width:60%;
    height:2.4em;
    text-indent:0.5em;
    border:1px solid #dddddd;
  }
  label{
    font-size:0.97em;
  }
  .regBtn{
    margin-top: 20px;
    width:60%;
    color:white;
    font-size:0.97em;
    height:2.6em;
    outline:none;
    border:none;
    border-radius:10px;
    background-color: #4e97ff;
    text-align:center;
    cursor:pointer;
  }
  .regBtn:hover{
    background-color: rgba(78,151,255,0.7);
    color: rgba(255,255,255,0.7);
  }
  .regBtnDisabled{
    background-color: rgba(78,151,255,0.7);
    color: rgba(255,255,255,0.7);
    cursor: not-allowed;
  }
  .registerCoverSheet{
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
  #regSuccessfully{
    width:10%;
    height:15%;
    margin:15% auto;
    border-radius:6px;
    background-color:#eff4f8;
    box-shadow: 0 0 10px #989898;
  }
  .regTip{
    color: #d1d1d1;
    margin-left:26.1%;
    font-family: "新宋体",sans-serif;
  }
  img{
    margin:0 0 0 25%;
  }
  #regConfirm{
    float:right;
    background-color:#eff4f8;
    outline:none;
    border:none;
    border-radius:2px;
  }
  #regConfirm:hover{
    border: 1px solid #dcdcdc;
  }
</style>
