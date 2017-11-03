<template>
  <div class="follow">
    <div>
      <div class="follow_top">
        <!--<div class="search">-->
          <!--<div class="search_input1">-->
            <!--<span>搜索地区：</span>-->
            <!--<div class="el-inp">-->
              <!--<el-input v-model="input1" placeholder="请输入地区"></el-input>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="search_input2">-->
            <!--<span>搜索员工：</span>-->
            <!--<div class="el-inp">-->
              <!--<el-input v-model="input1" placeholder="请输入员工"></el-input>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="but">-->
            <!--<el-button><i class="el-icon-search"></i>搜索</el-button><el-button><i class="el-icon-edit"></i>重置</el-button>-->
          <!--</div>-->
        <!--</div>-->
      </div>
      <div class="follow_main">
        <el-table
          ref="multipleTable"
          :data="allGrade"
          @select="selectRow"
          @select-all="selectRowAll"
          border
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="shopname"
            label="所属门店/地址"
            width="160"
            align="center">
          </el-table-column>
          <el-table-column
            prop="employee"
            label="员工姓名"
            align="center">
          </el-table-column>
          <el-table-column
            prop="haslearn"
            label="已学课程"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="nolearn"
            label="未学课程"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="passrate"
            label="合格率(%)"
            width="140"
            align="center"
            sortable
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="averagescore"
            label="平均分"
            align="center"
            sortable
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column align="center" width="80" label="操作">
            <template scope="scope">
              <el-button
                size="small"
                @click="openGrade(scope.row)">查看</el-button>
              <!--<el-button-->
              <!--size="small"-->
              <!--type="danger"-->
              <!--@click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection(allGrade)">全选</el-button>
          <el-button @click="handleDownload"><i class="el-icon-upload2"></i>导出</el-button>
        </div>
      </div>
      <div class="block paging">
          <el-pagination
            :current-page.sync="gradePage"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="gradeTotal">
          </el-pagination>
      </div>
    </div>
    <grade :name="name" :id="userId" :pass-rate="passRate" :aver-grade="averGrade" v-show="$store.state.show_grade"></grade>
  </div>
</template>

<script>
  import paging from '../../paging/paging.vue';
  import grade from './grade/grade.vue';
    export default {
      data() {
        return {
          url: this.$store.state.lastUrl,
          tableData3: [
            {
            address: '上海一号店',
            name: '王虎',
            studied: '55',
            not_study: '44',
            pass: '19',
            average: '76'
            },
            {
              address: '上海一号店',
              name: '王小',
              studied: '55',
              not_study: '44',
              pass: '98',
              average: '88'
            },
            {
              address: '上海一号店',
              name: '小虎',
              studied: '55',
              not_study: '44',
              pass: '78',
              average: '55'
            },
            {
              address: '上海一号店',
              name: '虎',
              studied: '55',
              not_study: '44',
              pass: '70',
              average: '27'
            }
            ],
          multipleSelection: [],
          input1: '',
          excel: '', //  需要导出的数据
          allGrade: [],  //  考核跟进总表
          gradePage: 1,  //  考核跟进总表当前页
          gradeTotal: 0,   // 考核跟进总表条数
          name: '',   //  具体某人
          userId: 0,  //   具体某人id
          passRate: '',  //  某人透过率
          averGrade: ''   //  某人平均分
        };
      },
      watch: {
        gradePage: {
          handler: function () {
            //  获取考核跟进 成绩总表
            this.$http.jsonp(this.url + 'spg/admin/training/pqResult?page=' + this.gradePage +
              '&rows=10', {jsonp: 'jsonpCallback'}).then(function (response) {
              // response.data 为服务端返回的数据
              this.allGrade = response.data.result.rows;
              this.gradeTotal = response.data.result.total;
            }).catch(function (response) {
              // 出错处理
            });
          }
        }
      },
      created() {
        //  获取考核跟进 成绩总表
        this.$http.jsonp(this.url + 'spg/admin/training/pqResult?page=' + this.gradePage +
          '&rows=10', {jsonp: 'jsonpCallback'}).then(function (response) {
          // response.data 为服务端返回的数据
          this.allGrade = response.data.result.rows;
          this.gradeTotal = response.data.result.total;
        }).catch(function (response) {
          // 出错处理
        });
      },

      methods: {
        toggleSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row, true);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        openGrade(row) {
            this.name = String(row.employee);
            console.log(row);
            this.userId = row.userid;
            this.passRate = String(row.passrate);
            this.averGrade = String(row.averagescore);
            this.$store.state.show_grade = true;
        },
        handleDownload() {
          if (this.excel.length === 0) {
            this.$message({
              message: '未选择数据！',
              type: 'warning'
            });
          } else {
            require.ensure([], () => {
              const { export_json_to_excel } = require('../../../vendor/Export2Excel');
              const tHeader = ['所属门店/地址', '员工姓名', '已学课程', '未学课程', '合格率(%)', '平均分'];
              const filterVal = ['shopname', 'employee', 'haslearn', 'nolearn', 'passrate', 'averagescore'];
              const list = this.excel;
              const data = this.formatJson(filterVal, list);
              export_json_to_excel(tHeader, data, '考核成绩');
            });
          }
        },
        formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]));
        },
        selectRow(row) {
          this.excel = row;
        },
        selectRowAll(row) {
          this.excel = row;
        }
      },

      components: {
        paging,
        grade
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .follow
    height 588px;
    .follow_top
      .search
        /*height 50px;*/
        border-bottom 1px solid #D3DCE6;
        .search_input1
          float left;
          width 305px;
          .el-inp
            display inline-block;
            width 220px;
        .search_input2
          float left;
          width 305px;
          .el-inp
            display inline-block;
            width 220px;
        .but
          float right;
  .follow_main
    margin-top 0px;
  .paging
    float right;
    margin-top -40px;
</style>
