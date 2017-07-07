<template>
  <div class="login">
    <div class="content">
      <div class="title">
        <div class="logo"><img src="../../img/logo.png"></div>
        <div class="name"><h3>非常导购</h3></div>
      </div>
      <div class="input">
        <el-input class="user" placeholder="请输入帐号" type="text" v-model="user_name">
          <template slot="prepend"><img src="../../img/person.png"/></template>
        </el-input>
        <p class="user_p" v-model="user_p"></p>
        <el-input class="password" placeholder="请输入密码" type="password" v-model="password">
          <template slot="prepend"><img src="../../img/person.png"/></template>
        </el-input>
        <p class="password_p" v-model="password_p"></p>
        <div class="get_forgive">
          <el-checkbox v-model="checked">记住密码</el-checkbox><el-button style="margin-left: 150px;" type="text">忘记密码</el-button>
        </div>
      </div>
      <div class="btn">
        <el-button class="login_btn" type="primary" size="large" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user_name: '',
        password: '',
        checked: false,
        user_p: '',
        password_p: ''
      };
    },
    //  相当于init doAjax
    beforeCreate() {
      // console.log('login页面 加载完成！')
    },
    //  相当于ready 模板编译挂载之后
    mounted: function() {
      //  读取cookie中的账号信息，如果有accountInfo的话，则说明该用户之前勾选了记住密码的功能，则需要自动填上账号密码
//      this.loadAccountInfo();
    },
    methods: {
      login() {
        if (this.user_name === 'admin' && this.password === '123') {
          this.$store.state.showIndex = true;
          this.$store.state.showLogin = false;
        }
      },
      //  设置cookie
      setCookie (name, value, expiremMinutes) {
        let exdate = new Date();
        exdate.setTime(exdate.getTime() + expiremMinutes * 60 * 1000);
        document.cookie = name + '=' + escape(value) + ((expiremMinutes === null) ? '' : ';expires=' + exdate.toGMTString());
      },
      //  读取cookie
      getCookie (name) {
          if (document.cookie.length > 0) {
            let start = document.cookie.indexOf(name + '=');
            if (start !== -1) {
              start = start + name.length + 1;
              let end = document.cookie.indexOf(';', start);
              if (end === -1) end = document.cookie.length;
              return decodeURI(document.cookie.substring(start, end));
          }
        }
        return '';
      },
      setLocalStorage() {
        if (!window.localStorage) {
          alert('浏览器支持localstorage');
          return false;
        } else {
          let storage = window.localStorage;
          //  写入a字段
          storage['a'] = 1;
          //  写入b字段
          storage.b = 1;
          //  写入c字段
          storage.setItem('c', 3);
          console.log(typeof storage['a']);
          console.log(typeof storage['b']);
          console.log(typeof storage['c']);
        }
      },
      getLocalStorage() {
        if (!window.localStorage) {
          alert('浏览器支持localstorage');
          return false;
        } else {
          let storage = window.localStorage;
          //  写入a字段
          storage['a'] = 1;
          //  写入b字段
          storage.b = 1;
          //  写入c字段
          storage.setItem('c', 3);
          console.log(typeof storage['a']);
          console.log(typeof storage['b']);
          console.log(typeof storage['c']);
          //  第一种方法读取
          let a = storage.a;
          console.log(a);
          //  第二种方法读取
          let b = storage['b'];
          console.log(b);
          //  第三种方法读取
          let c = storage.getItem('c');
          console.log(c);
          //  修改值
          storage.a = 4;
          console.log(storage.a);
          //  localStorage的键获取
          storage.a = 1;
          storage.setItem('c', 3);
          for (let i = 0; i < storage.length; i++) {
            let key = storage.key(i);
            console.log(key);
          }
        }
      },
      deleteLocalStorage() {
        //   将localStorage的所有内容清除
        let storage = window.localStorage;
        storage.a = 1;
        storage.setItem('c', 3);
        console.log(storage);
        storage.clear();
        console.log(storage);
        //   将localStorage的所有内容清除
        let storage2 = window.localStorage;
        storage2.a = 1;
        storage2.setItem('c', 3);
        console.log(storage2);
        storage2.removeItem('a');
        console.log(storage2.a);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .login
    position absolute;
    margin 0;
    padding 0;
    width 100%;
    height 100%;
    background-color #475669;
    .content
      position absolute;
      left 50%;
      top 50%;
      margin-top -200px;
      margin-left -200px;
      width 400px;
      height 300px;
      border-radius 5px;
      box-shadow 0 0 5px #1F2D3D;
      background-color white;
      .title
        margin-left 50px;
        margin-right  50px;
        height 60px;
        text-align center;
        font-family "Hiragino Sans GB";
        .logo
          margin-top 10px;
          float left;
          display inline-block;
          margin-left 75px;
          height 44px;
          width 44px;
        .name
          float left;
          display inline-block;
          margin-top 10px;
          height 44px;
          line-height 44px;
          font-size 20px;
          h3
            margin 0;
      .input
        margin-left 50px;
        margin-right  50px;
        .user
        .user_p
          height 12px;
          line-height 12px;
          font-size 12px;
          color #EE0000;
        .password
        .password_p
          height 12px;
          line-height 12px;
          font-size 12px;
          color #EE0000;
        .get_forgive
          float left;
          height 40px;
      .btn
        margin-top 15px;
        text-align center;
        .login_btn
          width 300px;
</style>
