<template>
  <div class="index">
    <el-row>
      <div class="left">
        <div class="shop_performance">
          <div class="title"><p>门店业绩</p></div>
          <div class="main">
            <el-select filterable v-model="value" placeholder="请选择展示的门店">
              <el-option
                v-for="item in shopModels"
                :key="item.shopid"
                :label="item.shopname"
                :value="item.shopid">
              </el-option>
            </el-select>
            <el-button @click="test">展示</el-button>
          </div>
        </div>
        <!--<div class="shop_fun">-->
          <!--<div class="title"><p>常用功能</p></div>-->
          <!--<div class="main"></div>-->
        <!--</div>-->
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
                <el-row>
                  <el-col :span="4"><div style="margin-left: 10px;">
                    <img src="../../img/head.png">
                  </div></el-col>
                  <el-col :span="12"><div>
                    <span class="name">超级管理员</span><span class="fun">登陆系统</span>
                  </div></el-col>
                  <el-col :span="8"><div>
                    <span class="li_date">11：30</span>
                  </div></el-col>
                </el-row>
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
      data() {
          return {
            value: '',
            shopModels: []  // 门店和门店id
        };
      },
      beforeCreate() {
        //  获取门店和门店id
        this.$http.jsonp('http://120.55.85.65:8088/spg/admin/display/getShops', {jsonp: 'jsonpCallback'}).then(function (response) {
          // response.data 为服务端返回的数据
          this.shopModels = response.data.result.shopModels;
          console.log(this.shopModels);
          console.log('获取获取门店和门店id成功');
        }).catch(function (response) {
          // 出错处理
          console.log(response);
        });
      },
      methods: {
          test() {
              console.log(this.value);
          }
      }
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
      width 578px;
      height 752px;
      .shop_performance
        width 578px;
        height 754px;
        border 1px solid #E0EEE0;
        border-radius 2px;
        background white;
        .title
          width 578px;
          height 40px;
          border-bottom 1px solid #E0EEE0;
          p
            margin-top 10px;
            margin-left 20px;
            font-size 16px;
            color #1abc9c;
      .shop_fun
        margin-top 30px;
        width 578px;
        height 398px;
        border 1px solid #E0EEE0;
        border-radius 2px;
        background white;
        .title
          width 578px;
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
      width 352px;
      height 752px;
      .date
        width 352px;
        height 240px;
        border 1px solid #E0EEE0;
        border-radius 2px;
        background white;
        .title
          width 352px;
          height 40px;
          border-bottom 1px solid #E0EEE0;
          p
            margin-top 10px;
            margin-left 20px;
            font-size 16px;
            color #0096ff;
      .later
        margin-top 30px;
        width 352px;
        height 276px;
        border 1px solid #E0EEE0;
        border-radius 2px;
        background white;
        color #99A9BF;
        .title
          width 352px;
          height 40px;
          border-bottom 1px solid #E0EEE0;
          p
            margin-top 10px;
            margin-left 20px;
            font-size 16px;
            color #99A9BF;
        .main
          .state
            padding 0;
            margin 0;
            li
              display: block;
              margin-right 14px;
              padding-top 9px;
              height 40px;
              list-style-type:none;
              line-height 31px;
              border-bottom 1px solid #bdc3c7;
              font-size 14px;
              &:hover
                background #f6f8fc;
                padding-top 9px;
                height 40px;
                border-left 2px solid #8e44ad;
      .help
        margin-top 30px;
        width 352px;
        height 174px;
        border 1px solid #E0EEE0;
        border-radius 2px;
        background white;
        .title
          width 352px;
          height 40px;
          border-bottom 1px solid #E0EEE0;
          p
            margin-top 10px;
            margin-left 20px;
            font-size 16px;
            color #e74c3c;
</style>
