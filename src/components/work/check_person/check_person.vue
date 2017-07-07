<template>
  <div class="check">
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
            <p  class="top_p" style="text-align: right">日程名称/酒店名称 安排表</p>
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
        <el-table
          ref="multipleTable"
          :data="meeting_person"
          border
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="selection"
            align="center"
            width="55">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="所属门店/地区">
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="员工姓名">
          </el-table-column>
          <el-table-column
            prop="stay"
            align="center"
            label="日程名称/酒店名称"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div style="margin-top: 10px">
          <el-button @click="toggleSelection([meeting_person[0],meeting_person[1],meeting_person[2],meeting_person[3],meeting_person[4],meeting_person[5],meeting_person[6],meeting_person[7],meeting_person[8], meeting_person[9]])">全选</el-button>
          <el-button @click="">导出</el-button>
        </div>
        <paging class="paging"></paging>
      </div>
    </el-row>
  </div>
</template>

<script>
  import paging from '../../paging/paging.vue';

  export default {
    data() {
      return {
        meeting_person: [
          {
            address: '11',
            name: '22',
            stay: 'ddd'
          }
        ],
        input: ''
      };
    },

    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row, true);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      }
    },

    components: {
      paging
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .top_p
    margin-top 52px;
    font-size 14px;
  .title_p
    font-size 18px;
    margin-top 0;
  .content_p
    margin-top 5px;
    font-size 14px;
  .check
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
      .paging
        float right;
        margin-top -40px;
</style>
