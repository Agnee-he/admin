<template>
  <div class="check">
    <el-row>
      <div class="close" @click="closeLook">
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
            <p class="title_p">{{name}}</p>
            <p class="content_p">NO.{{id}}</p>
          </div></el-col>
          <el-col :span="5"><div>
            <p  class="top_p" style="text-align: right">日程名称/酒店名称 安排表</p>
          </div></el-col>
        </el-row>
      </div>
      <!--<div class="search">-->
        <!--<el-row>-->
          <!--<el-col :span="10"><div class="input_search">-->
            <!--<span>搜索地区：</span>-->
            <!--<el-input class="el_input" v-model="input" placeholder="请输入地区名称/编号"></el-input>-->
          <!--</div></el-col>-->
          <!--<el-col :span="10"><div class="input_search">-->
            <!--<span>搜索员工：</span>-->
            <!--<el-input class="el_input" v-model="input" placeholder="请输入员工姓名/工号"></el-input>-->
          <!--</div></el-col>-->
          <!--<el-col :span="4"><div class="btn">-->
            <!--<el-button>搜索</el-button><el-button>重置</el-button>-->
          <!--</div></el-col>-->
        <!--</el-row>-->
      <!--</div>-->
      <div class="table_div">
        <el-table
          ref="multipleTable"
          @select="selectRow"
          @select-all="selectRowAll"
          :data="people"
          border
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="selection"
            align="center"
            width="55">
          </el-table-column>
          <el-table-column
            prop="shop"
            align="center"
            label="所属门店/地区">
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="员工姓名">
          </el-table-column>
          <el-table-column
            prop="add"
            align="center"
            label="会议位置"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div style="margin-top: 10px">
          <el-button @click="toggleSelection(people)">全选</el-button>
          <el-button @click="handleDownload">导出</el-button>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
  import paging from '../../paging/paging.vue';

  export default {
    props: {
      people: {
        type: Array
      },
      name: {
        type: String
      },
      id: {
        type: String
      }
    },
    data() {
      return {
        meeting_person: [
          {
            address: '11',
            name: '22',
            stay: 'ddd'
          }
        ],
        input: '',
        excel: []
      };
    },

    methods: {
      handleDownload() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('../../../vendor/Export2Excel');
          const tHeader = ['所属门店/地区', '员工姓名', '会议位置'];
          const filterVal = ['shop', 'name', 'add'];
          const list = this.excel;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '安排表');
        });
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      },
      selectRow(row) {
        this.excel = row;
      },
      selectRowAll(row) {
        this.excel = row;
      },
      handleClick(tab, event) {
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row, true);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      closeLook() {
        this.$store.state.show_check = false;
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
    position absolute;
    top 30px;
    z-index 99;
    width 900px;
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
