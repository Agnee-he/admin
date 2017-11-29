<template>
  <div class="ap">
      <div class="header">
        <div class="left">
          <div class="icon"></div>
          <!--<div class="title">非常导购</div>-->
        </div>
        <div class="right">
          <div class="mar_left">
            <div class="system">管理系统</div>
            <div class="address">单位：{{$store.state.userShop}} </div>
          </div>
          <div class="mar_right">
            <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        用户：{{$store.state.user}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
              <el-dropdown-menu slot="dropdown" style="width: 60px;text-align: center;">
                <el-dropdown-item @click="exit">退出</el-dropdown-item>
                <!--<el-dropdown-item>狮子头</el-dropdown-item>-->
                <!--<el-dropdown-item>螺蛳粉</el-dropdown-item>-->
                <!--<el-dropdown-item>双皮奶</el-dropdown-item>-->
                <!--<el-dropdown-item>蚵仔煎</el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="left">
          <!--<div class="search">-->
          <!--<search></search>-->
          <!--</div>-->
          <!--<router-link to="/index" class="index">-->
            <!--<div class="index_icon"></div><div class="index_word">首页</div>-->
          <!--</router-link>-->
          <!--<router-link to="/shop" class="shop">-->
            <!--<div class="shop_icon"></div><div class="shop_word">门店</div>-->
          <!--</router-link>-->
          <!--<router-link to="/work" class="work">-->
            <!--<div class="work_icon"></div><div class="work_word">工作</div>-->
          <!--</router-link>-->
          <!--<router-link to="/train" class="train">-->
            <!--<div class="train_icon"></div><div class="train_word">培训</div>-->
          <!--</router-link>-->
          <el-col :span="24">
            <!--<h5>自定义颜色</h5>-->
            <el-menu
              default-active="/index"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              router="true"
              background-color="#344a5d"
              text-color="#ffffff"
              active-text-color="#409EFF">
              <el-menu-item index="/index">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>门店</span>
                </template>
                <el-menu-item-group>
                  <!--<el-menu-item index="/shop">门店</el-menu-item>-->
                  <el-menu-item index="/display">门店陈列</el-menu-item>
                  <el-menu-item index="/attendence">考勤排班</el-menu-item>
                  <el-menu-item index="/address">门店位置</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="/work">
                <i class="el-icon-setting"></i>
                <span slot="title">工作</span>
              </el-menu-item>
              <el-menu-item index="/train">
                <i class="el-icon-news"></i>
                <span slot="title">培训</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </div>
      </div>
      <router-view></router-view>
    </div>
</template>

<script>

  export default {
    data () {
      return {
        search_first: true,
        search_over: false,
        account: false
      };
    },
    created() {
    },
    watch: {
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      exit() {
        localStorage.removeItem('login');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  *
    margin 0;
    padding 0;
  body,html
    margin 0;
    width 100%;
    height 100%;
    position: relative;
  #app
    .ap
      margin-top 30px;
      box-shadow 0 0 10px #CCCCCC;
      margin-left auto;
      margin-right auto;
      width 1200px;
      height 818px;
      .header
        width 1200px;
        height 80px;
        .left
          float left;
          width 180px;
          height 80px;
          background #344a5d;
          .icon
            float left;
            margin-top 20px;
            margin-left 60px;
            width 44px;
            height 44px;
            background url("../../img/logo.png") no-repeat center;
          .title
            float left;
            margin-top 32px;
            margin-left 10px;
            width 112px;
            text-align left;
            font-size 16;
            font-family 'Microsoft YaHei';
            color #ffffff;
        .right
          float left;
          width 1020px;
          height 80px;
          background #ffffff;
          .mar_left
            float left;
            width 710px;
            .system
              margin-top 20px;
              margin-left 28px;
              font-size 20px;
              font-family 'Microsoft YaHei';
              color #2c3e50;
              font-weight bold;
            .address
              height 14px;
              margin-top 8px;
              margin-left 28px;
              font-size 14px;
              line-height 14px;
              color #7f8c8d;
          .mar_right
            float right;
            margin-top 32px;
            padding-left 100px;
            width 210px;
            .person
              float left;
              margin-right 6px;
              width 16px;
              height 16px;
              background url("../../img/person.png") no-repeat center;
            .name
              float left;
              margin-right 6px;
              font-size 14px;
              color #0096ff;
            .down
              float left;
              margin-right 30px;
              width 16px;
              height 16px;
              background url("../../img/down.png") no-repeat center;
            .setting
              float right;
              margin-right 14px;
              width 16px;
              height 16px;
              background url("../../img/setting.png") no-repeat center;
            .help
              float right;
              margin-right 24px;
              width 16px;
              height 16px;
              background url("../../img/help.png") no-repeat center;
            .account
              position absolute;
              z-index 9999;
              padding-left 10px;
              padding-right 10px;
              top 20px;
              left 310px;
              list-style-type none;
              text-align center;
              background-color #FFFFFF;
              border 1px solid #475669;
              li
                line-height 30px;
                text-align center;
      .main
        width 1200px;
        height 718px;
        position relative;
        .left
          float left;
          width 180px;
          height 738px;
          background #344a5d;
          font-weight 400;
        .right
          float left;
          width 1020px;
          height 718px;
          background: #ecf0f1;
      .active
        width 178px;
        border-left 2px solid #0096ff;
        background rgba(0,0,0,0.3);
        color #ffffff;
      .transition-box
        margin-bottom: 10px;
        width: 200px;
        height: 100px;
        border-radius: 4px;
        background-color: #20A0FF;
        text-align: center;
        color: #fff;
        padding: 40px 20px;
        box-sizing: border-box;
        margin-right: 20px;
  .el-submenu .el-menu-item
    min-width 0;
</style>
