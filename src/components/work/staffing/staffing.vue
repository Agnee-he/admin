<!-- 安排人员会议地址 -->

<template>
  <div class="staffing">
    <el-row>
      <div class="close" @click="">
        <el-row>
          <el-col :span="23"><div>
          </div></el-col>
          <el-col :span="1"><div>
            <i class="el-icon-circle-close"></i>
          </div></el-col>
        </el-row>
      </div>
      <div class="title">
        <el-row>
          <el-col :span="3"><div class="logo">
          </div></el-col>
          <el-col :span="16"><div>
            <p class="title_p">会议名称</p>
            <p class="content_p">NO.111111111111</p>
          </div></el-col>
          <el-col :span="5"><div>
            <div style="text-align: right">
              <el-button><i class="el-icon-edit"></i>编辑</el-button>
            </div>
            <p  class="content_p" style="text-align: right">日程名称/酒店名称 安排表</p>
          </div></el-col>
        </el-row>
      </div>
      <div class="search">
        <el-row>
          <el-col :span="10"><div class="input_search">
            <span>搜索地区：</span>
            <el-input class="el_input" v-model="input" placeholder="请输入地区名称/编号"></el-input>
          </div></el-col>
          <el-col :span="10"><div class="input_search">
            <span>搜索员工：</span>
            <el-input class="el_input" v-model="input" placeholder="请输入员工姓名/工号"></el-input>
          </div></el-col>
          <el-col :span="4"><div class="btn">
            <el-button>搜索</el-button><el-button>重置</el-button>
          </div></el-col>
        </el-row>
      </div>
      <div class="table_div">
        <table border="0" cellspacing="1" cellpadding="0" class="table" >
          <tr class="tr1"><th style="width: 100px;">序号</th><th>所属门店/地区</th><th>员工姓名</th><th>日程名称/酒店名称</th></tr>
          <tr class="tr2" v-for="(item, index) in person_list" :key="index"><td>{{index + 1}}</td><td>{{item.address}}</td><td>{{item.name}}</td><td>{{item.stay}}</td></tr>
          <tr class="tr2" v-for="(item, index) in new_person_list"><td>{{person_list.length + index + 1}}</td><td><el-input style="width: 200px" v-model="item.address" placeholder="请输入门店/地区"></el-input></td><td><el-input style="width: 200px" v-model="item.name" placeholder="请输入员工"></el-input></td><td><el-input style="width: 200px" v-model="item.stay" placeholder="请输入房间号"></el-input></td></tr>
        </table>
        <el-button @click="addPerson"><i class="el-icon-plus"></i>添加人员</el-button>
      </div>
      <div class="sub">
        <el-button type="primary">保存</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        person_list: [
          {
            address: '111',
            name: 'xxx',
            stay: '1502'
          }
        ], // 已经安排好的住宿
        new_person_list: [
          {
            address: '',
            name: '',
            stay: ''
          }
        ],
        input: ''
      };
    },

    methods: {
      addPerson() {
        let newTr = {address: '', name: '', style: ''};
        this.new_person_list.push(newTr);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .top_p
    margin-top 52px;
  .title_p
    font-size 18px;
    margin-top 0;
  .content_p
    margin-top 5px;
    font-size 14px;
  .staffing
    .close
      float right;
      width 22px;
      height 22px;
      margin-top -25px;
    .title
      margin-top 10px;
      border-bottom 1px solid #D3DCE6;
      .logo
        width 50px;
        height 70px;
        background-color #1c8de0;
    .search
      margin-top 10px;
      padding-bottom 5px;
      border-bottom 1px solid #D3DCE6;
      .input_search
        float left;
        width 400px;
        .el_input
          display inline-block;
          width 200px;
      .btn
        margin-top 45px;
    .table_div
      margin-top 10px;
      padding-bottom 10px;
      border-bottom 1px solid #D3DCE6;
      .table
        width 100%;
        text-align center;
        border 1px solid #E5E9F2;
        border-collapse collapse;
        font-size 15px;
        font-family "PingFang SC";
        .tr1
          width 100%;
          font-weight 100;
          font-family "PingFang SC";
          background-color #E5E9F2;
          height 40px;
        .tr2
          width 100%;
          height 40px;
          border 1px solid #D3DCE6;
          &:hover
            background-color #E5E9F2;
    .sub
      margin-top 20px;
      text-align center;
</style>
