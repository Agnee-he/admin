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
        <!--<div class="get_forgive">-->
          <!--<el-checkbox v-model="checked">记住密码</el-checkbox><el-button style="margin-left: 150px;" type="text">忘记密码</el-button>-->
        <!--</div>-->
      </div>
      <div class="btn">
        <el-button class="login_btn" type="primary" size="large" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '../../router';
  import $ from 'jquery';

  export default {
    data() {
      return {
        url: this.$store.state.lastUrl,
        user_name: '',
        password: '',
        checked: false,
        user_p: '',
        password_p: '',
        shop: [] //  门店列表信息
      };
    },
    //  相当于init doAjax
    beforeCreate() {
    },
    created() {
      // console.log('login页面 加载完成！')
      //  获取门店列表
      this.$http.jsonp(this.url + 'spg/admin/display/getShops', {jsonp: 'jsonpCallback'}).then(function (response) {
        // response.data 为服务端返回的数据
        this.shop = response.data.result.shopModels;
      }).catch(function (response) {
        // 出错处理
      });
    },
    //  相当于ready 模板编译挂载之后
    mounted: function() {
      //  读取cookie中的账号信息，如果有accountInfo的话，则说明该用户之前勾选了记住密码的功能，则需要自动填上账号密码
      //  this.loadAccountInfo();
    },
    methods: {
      login1() {
        //  登录请求
        this.$http.jsonp(this.url + 'spg/admin/login?username=' + this.user_name + '&password=' + this.password, {jsonp: 'jsonpCallback'}).then(function (response) {
          // response.data 为服务端返回的数据
          let user = response.data.result;
          let returnData = response.data.result.permissions.functionList;
          if (user.location === null) {
            sessionStorage.setItem('shopname', '总部');
            this.$store.state.userShop = '总部';
          } else {
            for (let i = 0; i < this.shop.length; i++) {
              if (user.location.shopId === this.shop[i].shopid) {
                sessionStorage.setItem('shopname', this.shop[i].shopname);
                this.$store.state.userShop = this.shop[i].shopname;
              }
            }
          }
          let quanxian = 0;
          for (let i = 0; i < returnData.length; i++) {
            if (returnData[i].functionId === 'Platform') {
              if ((returnData[i].authId === 'Ins') || (returnData[i].authId === 'Del') || (returnData[i].authId === 'Mod') || (returnData[i].authId === 'Que')) {
                quanxian = quanxian + 1;
              }
            }
          }
          if (quanxian === 4) {
            sessionStorage.setItem('user', user.jobnumber);
            this.$store.state.user = user.jobnumber;
            this.$notify({
              title: '成功成功',
              message: '欢迎进入非常导购管理系统！',
              type: 'success'
            });
            sessionStorage.setItem('login', '100');
            router.push({ path: '/shouye' });
          } else {
            this.$notify.error({
              title: '登录失败',
              message: '权限不足！'
            });
          }
        }).catch(function (response) {
          // 出错处理
          console.log(response);
          this.$notify.error({
            title: '登录失败',
            message: '请确认帐号密码！'
          });
        });
      },
      login() {
        //  登录请求
        let post = [];
        post.push({username: this.user_name, password: this.password});
        let postParams = JSON.stringify(post);
        console.log(postParams);
//        let success = false;
        let response;
        $.ajax({
          type: 'POST',
          url: this.url + 'spg/admin/login',
//          contentType: 'application/json;charset=utf-8', // 设置请求头信息
          dataType: 'json',
          async: false,
          data: {username: this.user_name, password: this.password},
          success: function(data) {
            response = data;
            let user = response.result;
            let returnData = response.result.permissions.functionList;
            if (user.location === null) {
              sessionStorage.setItem('shopname', '总部');
//              this.$store.state.userShop = '总部';
            } else {
              console.log('shop:' + this.shop);
              for (let i = 0; i < this.shop.length; i++) {
                if (user.location.shopId === this.shop[i].shopid) {
                  sessionStorage.setItem('shopname', this.shop[i].shopname);
                  this.$store.state.userShop = this.shop[i].shopname;
                }
              }
            }
            let quanxian = 0;
            for (let i = 0; i < returnData.length; i++) {
              if (returnData[i].functionId === 'Platform') {
                if ((returnData[i].authId === 'Ins') || (returnData[i].authId === 'Del') || (returnData[i].authId === 'Mod') || (returnData[i].authId === 'Que')) {
                  quanxian = quanxian + 1;
                }
              }
            }
            if (quanxian === 4) {
              sessionStorage.setItem('user', user.jobnumber);
              this.$store.state.user = user.jobnumber;
              alert('登录成功');
              sessionStorage.setItem('login', '100');
              router.push({ path: '/shouye' });
            } else {
              alert('登录失败');
            }
          },
          error: function () {
            // 出错处理
            alert('登录失败');
          }
        });
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
