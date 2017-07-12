<template>
  <div id="app">
    <login v-show="$store.state.showLogin"></login>
    <div class="ap" v-show="$store.state.showIndex">
      <div class="header">
        <div class="left">
          <div class="icon"></div>
          <div class="title">非常导购</div>
        </div>
        <div class="right">
          <div class="mar_left">
            <div class="system">管理系统</div>
            <div class="address">单位：{{$store.state.userShop}}</div>
          </div>
          <div class="mar_right">
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="person"></i><span style="float: left;font-size: 14px;width: 150px;">{{$store.state.user.jobnumber}}</span><i class="down"></i>
              </span>
              <el-dropdown-menu style="text-align: center;margin-left: -130px;" slot="dropdown">
                <el-dropdown-item>账户资料</el-dropdown-item>
                <el-dropdown-item>账户组织</el-dropdown-item>
                <el-dropdown-item>更改密码</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <i class="help"></i><i class="setting"></i>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="left">
          <!--<div class="search">-->
            <!--<search></search>-->
          <!--</div>-->
          <router-link to="/index" class="index">
            <div class="index_icon"></div><div class="index_word">首页</div>
          </router-link>
          <router-link to="/shop" class="shop">
            <div class="shop_icon"></div><div class="shop_word">门店</div>
          </router-link>
          <router-link to="/work" class="work">
            <div class="work_icon"></div><div class="work_word">工作</div>
          </router-link>
          <router-link to="/train" class="train">
            <div class="train_icon"></div><div class="train_word">培训</div>
          </router-link>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import login from './components/login/login.vue';
  import search from './components/search/search.vue';

export default {
  name: 'app',
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
    show_search_first() {
      this.search_first = true;
    }
  },
  methods: {
    show_search() {
        this.search_first = false;
        this.search_over = true;
    },
    search_close() {
      this.search_over = false;
      this.search_first = true;
    },
    account_click() {
        this.account = !this.account;
    }
  },
  components: {
    login,
    search
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
      height 978px;
      .header
        width 1200px;
        height 80px;
        .left
          float left;
          width 180px;
          height 80px;
          background #0096ff;
          .icon
            float left;
            margin-top 20px;
            margin-left 14px;
            width 44px;
            height 44px;
            background url("./img/logo.png") no-repeat center;
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
            position relative;
            text-align center;
            float left;
            margin-top 32px;
            width 310px;
            .person
              float left;
              margin-right 6px;
              width 16px;
              height 16px;
              background url("./img/person.png") no-repeat center;
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
              background url("./img/down.png") no-repeat center;
            .setting
              float right;
              margin-right 14px;
              width 16px;
              height 16px;
              background url("./img/setting.png") no-repeat center;
            .help
              float right;
              margin-right 24px;
              width 16px;
              height 16px;
              background url("./img/help.png") no-repeat center;
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
        height 898px;
        position relative;
        .left
          float left;
          width 180px;
          height 898px;
          background #344a5d;
          font-weight 400;
          .search
            display block;
            margin-top 18px;
            height 44px;
          .index
            display block;
            margin-top 22px;
            height 44px;
            &:hover
              width 178px;
              border-left 2px solid #0096ff;
              background rgba(0,0,0,0.3);
              color #ffffff;
              .index_icon
                background url("./img/home-sel.png") no-repeat center;
            .index_icon
              float left;
              margin-top 11px;
              margin-left 24px;
              width 22px;
              height 22px;
              background url("./img/home-nor.png") no-repeat center;
            .index_word
              float left;
              margin-top 11px;
              margin-left 20px;
              font-size 16px;
              color #95a5a6;
          .shop
            display block;
            margin-top 22px;
            height 44px;
            &:hover
              width 178px;
              border-left 2px solid #0096ff;
              background rgba(0,0,0,0.3);
              color #ffffff;
              .shop_icon
                background url("./img/shop-sel.png") no-repeat center;
            .shop_icon
              float left;
              margin-top 11px;
              margin-left 24px;
              width 22px;
              height 22px;
              background url("./img/shop-nor.png") no-repeat center;
            .shop_word
              float left;
              margin-top 11px;
              margin-left 20px;
              font-size 16px;
              color #95a5a6;
          .work
            display block;
            margin-top 22px;
            height 44px;
            &:hover
              width 178px;
              border-left 2px solid #0096ff;
              background rgba(0,0,0,0.3);
              color #ffffff;
              .work_icon
                background url("./img/work-sel.png") no-repeat center;
            .work_icon
              float left;
              margin-top 11px;
              margin-left 24px;
              width 22px;
              height 22px;
              background url("./img/work-nor.png") no-repeat center;
            .work_word
              float left;
              margin-top 11px;
              margin-left 20px;
              font-size 16px;
              color #95a5a6;
          .train
            display block;
            margin-top 22px;
            height 44px;
            &:hover
              width 178px;
              border-left 2px solid #0096ff;
              background rgba(0,0,0,0.3);
              color #ffffff;
              .train_icon
                background url("./img/train-sel.png") no-repeat center;
            .train_icon
              float left;
              margin-top 11px;
              margin-left 24px;
              width 22px;
              height 22px;
              background url("./img/train-nor.png") no-repeat center;
            .train_word
              float left;
              margin-top 11px;
              margin-left 20px;
              font-size 16px;
              color #95a5a6;
        .right
          float left;
          width 1020px;
          height 898px;
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
 </style>
