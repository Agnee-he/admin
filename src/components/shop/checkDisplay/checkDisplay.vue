<template>
  <div class="check_display" v-show="$store.state.show_checkDisplay">
    <el-row>
      <div class="close">
        <el-row>
          <el-col :span="24"><div><i @click="closeCheckDisplay" class="el-icon-circle-close"></i></div></el-col>
        </el-row>
      </div>
      <div class="top">
        <el-row>
          <el-col :span="3">
            <div class="logo"></div>
          </el-col>
          <el-col :span="7">
            <div>
              <p class="title_p">门店陈列标准</p>
              <p class="content_p">NO.{{displayDetail.id}}</p>
            </div>
          </el-col>
          <el-col :span="7">
            <div>
              <p class="title_p">{{displayDetail.shopName}}</p>
              <!--<p class="content_p">店长：我是谁</p>-->
            </div>
          </el-col>
          <el-col :span="7">
            <div class="rate">
              <el-rate disabled v-model="displayDetail.stars"></el-rate>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="require">
        <div class="title">
          <p class="left">陈列要求：</p>
          <p class="right">更新于： {{displayDetail.startTime}}</p>
        </div>
        <div class="show_img">
          <img v-for="item in displayDetail.displayStandardurls" :src="item.standardImgurl"/>
        </div>
        <div class="remark">
          <p>备注：</p>
          <p class="text">{{displayDetail.displayRemarks}}</p>
        </div>
      </div>
      <div class="swiper">
        <p>陈列情况：</p>
        <el-carousel :interval="5000" arrow="always" width="880px" height="440px">
          <el-carousel-item v-for="item in displayDetail.displayActualurls" :key="item">
            <img :src="item.actualImgurl" width="880px" height="440px"/>
          </el-carousel-item>
        </el-carousel>
        <!--<p class="right">上传人：我是谁     更新于：2017-7-7 12：11</p>-->
      </div>
      <div class="comment">
        <ul>
          <li>
            <div class="title">
              <div>
                <el-row>
                  <el-col :span="4">
                    <div>
                      <p class="name">评价：</p>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="content" >
                      <p>{{displayDetail.reviews}}</p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <!--<div class="time">-->
                      <!--<p>2017-7-7 12:00</p>-->
                    <!--</div>-->
                  </el-col>
                </el-row>
              </div>
            </div>

          </li>
        </ul>
      </div>
    </el-row>
  </div>
</template>

<script>
  export default {
    props: {
      displayDetail: {
          type: Object
      }
    },
    data() {
      return {
        value1: 4.5
      };
    },
    methods: {
      closeCheckDisplay() {
        this.$store.state.show_checkDisplay = false;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .note_p
    font-size 14px;
    color #99A9BF;
  .top_p
    float right;
    margin-top 52px;
    font-size 14px;
  .title_p
    font-size 18px;
    margin-top 0;
  .content_p
    margin-top 20px;
    font-size 14px;
  .check_display
    position absolute;
    z-index 999;
    top 150px;
    margin-left 30px;
    width 898px;
    height 618px;
    overflow auto;
    background-color white;
    box-shadow 0 0 2px #1F2D3D;
    padding 30px;
    .close
      margin-top -10px;
      margin-right -10px;
      float right;
    .top
      margin-top 30px;
      padding-bottom  10px;
      height 70px;
      border-bottom 1px solid #D3DCE6;
      .logo
        width 60px;
        height 54px;
        background-image url("../../../img/shop.png");
      .rate
        margin-top 40px;
        float right;
    .require
      border-bottom 1px solid #D3DCE6;
      .title
        .left
          display inline-block;
        .right
          float right;
          display inline-block;
          font-size 14px;
      .show_img
        img
          width 100px;
          height 100px;
          display inline-block;
          margin-right 10px;
      .remark
        .text
          font-size 14px;
          color #99A9BF;
    .swiper
      padding-bottom 40px;
      border-bottom 1px solid #D3DCE6;
      .el-carousel__item
        background-color #1abc9c;
      .right
        float right;
        font-size 14px;
        color #99A9BF;
    .comment
      ul
        margin 0;
        padding 0;
        li
          list-style-type:none;
          padding 5px;
          border-bottom 1px solid #EFF2F7;
          .title
            margin-top 10px;
            .name
              margin-top 0;
              width 140px;
              font-size 16px;
            .rate
              float left;
              display inline-block;
            .time
              margin-top -10px;
              float right;
              font-size 14px;
              color #99A9BF;
          .content
            font-size 14px;
            p
              margin 0;
</style>
