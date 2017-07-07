<template>
  <div class="study">
    <div class="study_top">
      <span>搜索课程：</span>
      <div class="study_input">
        <el-input v-model="input" placeholder="请输入课程名称"></el-input>
      </div>
      <el-button><i class="el-icon-search"></i>搜索</el-button>
      <el-button><i class="el-icon-plus"></i>新增类</el-button>
    </div>
    <div class="study_main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="类目一" name="first">
          <el-table
            ref="multipleTable"
            :data="tableData3"
            tooltip-effect="dark"
            @select="selectRow"
            @select-all="selectRowAll"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="course"
              align="center"
              label="课程"
              >
            </el-table-column>
            <el-table-column
              prop="pass"
              align="center"
              label="通过率">
            </el-table-column>
            <el-table-column
              prop="average"
              align="center"
              label="平均分"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="number"
              align="center"
              label="学习人数"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template scope="scope">
                <el-button
                  size="small"
                  @click="openDetail">编辑</el-button>
                <!--<el-button-->
                  <!--size="small"-->
                  <!--type="danger"-->
                  <!--@click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
              </template>
            </el-table-column>
          </el-table>
          <div class="study_but">
            <el-button @click="toggleSelection(tableData3)">全选</el-button>
            <el-button @click="testSelect(tableData3)"><i class="el-icon-delete"></i>删除</el-button>
            <el-button @click="handleDownload"><i class="el-icon-upload2"></i>导出</el-button>
            <el-button><i class="el-icon-plus"></i>新增课程</el-button>
          </div>
          <div class="paging">
            <paging :total="5"></paging>
          </div>
        </el-tab-pane>
        <el-tab-pane label="类目二" name="second"></el-tab-pane>
        <el-tab-pane label="类目三" name="third"></el-tab-pane>
        <el-tab-pane label="类目四" name="fourth"></el-tab-pane>
      </el-tabs>
    </div>
    <course class="course_detail" v-show="$store.state.showCourse"></course>
  </div>
</template>

<script>
  import paging from '../../paging/paging.vue';
  import course from './course/course.vue';

    export default {
      data() {
        return {
          activeName: 'first',
          tableData3: [
            {
              id: '1',
              course: '哒哒哒',
              pass: '32%',
              average: '98',
              number: '333'
            },
            {
              id: '2',
              course: '大苏打',
              pass: '32%',
              average: '98',
              number: '333'
            },
            {
              id: '3',
              course: '银瑞特',
              pass: '32%',
              average: '98',
              number: '333'
            }
            ],
          multipleSelection: [],
          input: '',
          excel: [], // 导出excel表内容
          number: '' // 需要删除的index
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
        },
        openDetail(row) {
          console.log(row);
          this.$store.state.showCourse = true;
        },
        handleDownload() {
          require.ensure([], () => {
            const { export_json_to_excel } = require('../../../vendor/Export2Excel');
            const tHeader = ['序号', '课程', '通过率', '平均分', '人数'];
            const filterVal = ['id', 'course', 'pass', 'average', 'number'];
            const list = this.excel;
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '课程');
          });
          console.log(1);
        },
        formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]));
        },
        testSelect(rows) {
          console.log(1);
          rows.forEach(row => {
              console.log(row.multipleSelection);
          });
        },
//        inExcel(json, jsonAll) {
//          let length = jsonAll.length;
//          for (let i = 0; i < length; i++) {
//            if (jsonAll[i].course === json.course) {
//              this.number = i;
//              return true;
//            }
//          }
//        },
        selectRow(row) {
          this.excel = row;
          console.log(this.excel);
          console.log(row);
        },
        selectRowAll(row) {
          this.excel = row;
          console.log(this.excel);
          console.log(row);
        }
      },
      components: {
        paging,
        course
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .study
    position relative;
    height 750px;
    .study_top
      height 50px;
      border-bottom 1px solid #D3DCE6;
      .study_input
        display inline-block;
        margin-right 30px;
        width 250px;
    .study_main
      margin-top 15px;
      .study_but
        float left;
        margin-top 15px;
      .paging
        float right;
        margin-top 15px;
        display inline-block;
    .course_detail
      position absolute;
      z-index 999;
      top 0;
      width 866px;
      height 650px;
</style>
