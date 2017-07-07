<template>
  <div class="index">
    <el-row>
      <div class="left">
        <div class="shop_performance">
          <div class="title"><p>门店业绩</p></div>
          <div class="main"></div>
        </div>
        <div class="shop_fun">
          <div class="title"><p>常用功能</p></div>
          <div class="main"></div>
        </div>
      </div>
      <div class="right">
        <div class="date">
          <div class="title"><p>日期天气</p></div>
          <div class="main"></div>
        </div>
        <div class="later">
          <div class="title"><p>最新动态</p></div>
          <div class="main">
            <ul class="state">
              <li>
                <div class="state_left">
                  <img src="../../img/head.png">
                </div>
                <div class="state_mid">
                  <span class="name">超级管理员</span><span class="fun">登陆系统</span>
                </div>
                <div class="state_right">
                  <span class="li_date">11：30</span>
                </div>
              </li>
              <li>
                <div class="state_left">
                  <img src="../../img/head.png">
                </div>
                <div class="state_mid">
                  <span class="name">超级管理员</span><span class="fun">登陆系统</span>
                </div>
                <div class="state_right">
                  <span class="li_date">11：30</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="help">
          <div class="title"><p>操作小贴士</p></div>
          <div class="main"></div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'shop'
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  body
    margin 0;
    padding 0;
  .index
    margin-top -898px;
    margin-left 180px;
    padding-top 30px;
    width 1020px;
    height 868px;
    background #ecf0f1;
    .left
      float left;
      margin-left 30px;
      width 478px;
      height 752px;
      .shop_performance
        width 478px;
        height 324px;
        border 1px solid #E0EEE0;
        border-radius 2px;
        background white;
        .title
          width 478px;
          height 40px;
          border-bottom 1px solid #E0EEE0;
          p
            margin-top 10px;
            margin-left 20px;
            font-size 16px;
            color #1abc9c;
      .shop_fun
        margin-top 30px;
        width 478px;
        height 398px;
        border 1px solid #E0EEE0;
        border-radius 2px;
        background white;
        .title
          width 478px;
          height 40px;
          border-bottom 1px solid #E0EEE0;
          p
            margin-top 10px;
            margin-left 20px;
            font-size 16px;
            color #ff8643;
    .right
      float left;
      margin-left 30px;
      width 452px;
      height 752px;
      .date
        width 452px;
        height 240px;
        border 1px solid #E0EEE0;
        border-radius 2px;
        background white;
        .title
          width 478px;
          height 40px;
          border-bottom 1px solid #E0EEE0;
          p
            margin-top 10px;
            margin-left 20px;
            font-size 16px;
            color #0096ff;
      .later
        margin-top 30px;
        width 452px;
        height 276px;
        border 1px solid #E0EEE0;
        border-radius 2px;
        background white;
        .title
          width 478px;
          height 40px;
          border-bottom 1px solid #E0EEE0;
          p
            margin-top 10px;
            margin-left 20px;
            font-size 16px;
            color #8e44ad;
        .main
          .state
            padding 0;
            margin 0;
            li
              display: block;
              margin-right 14px;
              height 40px;
              list-style-type:none;
              border-bottom 1px solid #bdc3c7;
              &:hover
                background #f6f8fc;
                height 40px;
                border-left 2px solid #8e44ad;
              .state_left
                float left;
                margin-left 20px;
                width 40px;
                height 40px;
                line-height 40px;
                img
                  margin-top 10px;
                  height 27px;
              .state_mid
                float left;
                width 200px;
                height 40px;
                line-height 40px;
                .name
                  display inline;
                  font-size 14px;
                  line-height 50px;
                  color #0096ff;
                .fun
                  margin-left 10px;
                  font-size 14px;
                  color #89969b;
              .state_right
                float right;
                width 152px;
                height 40px;
                line-height 40px;
                text-align right;
                font-size 12px;
                color #bdc3c7;
                .li_date
                  margin-right 14px;
                  text-align right;
      .help
        margin-top 30px;
        width 452px;
        height 174px;
        border 1px solid #E0EEE0;
        border-radius 2px;
        background white;
        .title
          width 478px;
          height 40px;
          border-bottom 1px solid #E0EEE0;
          p
            margin-top 10px;
            margin-left 20px;
            font-size 16px;
            color #e74c3c;
</style>
