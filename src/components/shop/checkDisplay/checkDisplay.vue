<template>
  <div class="check_display">
    <el-row>
      <div class="top">
        <el-row>
          <el-col :span="3">
            <div class="logo"></div>
          </el-col>
          <el-col :span="7">
            <div>
              <p class="title_p">门店陈列标准</p>
              <p class="content_p">NO.123213123</p>
            </div>
          </el-col>
          <el-col :span="7">
            <div>
              <p class="title_p">上海门店</p>
              <p class="content_p">店长：我是谁</p>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="rate">
              <el-rate disabled v-model="value1"></el-rate>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="require">
        <div class="title">
          <p class="left">陈列要求：</p>
          <p class="right">更新于： 2017-12-12 12：12</p>
        </div>
        <div class="show_img">
          <img src="#"/><img src="#"/><img src="#"/><img src="#"/><img src="#"/>
        </div>
        <div class="remark">
          <p>备注：</p>
          <p class="text">我是谁？我在哪？为什么都在垂涎我的美色？</p>
        </div>
      </div>
      <div class="swiper">
        <p>陈列情况：</p>
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
        <p class="right">上传人：我是谁     更新于：2017-7-7 12：11</p>
      </div>
      <div class="comment">
        <ul>
          <li>
            <div class="title">
              <div>
                <el-row>
                  <el-col :span="4">
                    <div>
                      <p class="name">我是谁的评价：</p>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="rate">
                      <el-rate disabled v-model="value1"></el-rate>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="time">
                      <p>2017-7-7 12:00</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="content">
              <p>我是谁  我在哪里  不敢当</p>
            </div>
          </li>
          <li>
            <div class="title">
              <div>
                <el-row>
                  <el-col :span="4">
                    <div>
                      <p class="name">我是谁的评价：</p>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="rate">
                      <el-rate disabled v-model="value1"></el-rate>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="time">
                      <p>2017-7-7 12:00</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="content">
              <p>不行  我受不了这种委屈</p>
            </div>
          </li>
          <li>
            <div class="title">
              <div>
                <el-row>
                  <el-col :span="4">
                    <div>
                      <p class="name">我是谁的评价：</p>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="rate">
                      <el-rate disabled v-model="value1"></el-rate>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="time">
                      <p>2017-7-7 12:00</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="content">
              <p>我是谁  我在哪里  不敢当</p>
            </div>
          </li>
          <li>
            <div class="title">
              <div>
                <el-row>
                  <el-col :span="4">
                    <div>
                      <p class="name">我是谁的评价：</p>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="rate">
                      <el-rate disabled v-model="value1"></el-rate>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="time">
                      <p>2017-7-7 12:00</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="content">
              <p>我是谁  我在哪里  不敢当</p>
            </div>
          </li>
        </ul>
      </div>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value1: 4.5
      };
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
    margin-left 30px;
    width 898px;
    height 778px;
    overflow auto;
    background-color white;
    box-shadow 0 0 2px #1F2D3D;
    padding 30px;
    .top
      padding-bottom  10px;
      height 70px;
      border-bottom 1px solid #D3DCE6;
      .logo
        width 50px;
        height 70px;
        background-color #1c8de0;
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
            margin-left 145px;
            font-size 14px;
            p
              margin 0;
</style>
