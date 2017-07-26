<template>
  <div class="study">
    <!--<div class="study_top">-->
      <!--<span>搜索课程：</span>-->
      <!--<div class="study_input">-->
        <!--<el-input v-model="input" placeholder="请输入课程名称"></el-input>-->
      <!--</div>-->
      <!--<el-button><i class="el-icon-search"></i>搜索</el-button>-->
      <!--<el-button><i class="el-icon-plus"></i>新增类</el-button>-->
    <!--</div>-->
    <div class="study_main">
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane v-for="(item, index) in allCourse" :name="item.num" :label="item.type" :key="index">
          <el-table
            ref="multipleTable"
            :data="item.course"
            tooltip-effect="dark"
            @select="selectRow"
            @select-all="selectRowAll"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="coursename"
              align="center"
              label="课程"
              >
            </el-table-column>
            <el-table-column
              prop="passrate"
              align="center"
              label="通过率">
            </el-table-column>
            <el-table-column
              prop="averagescore"
              align="center"
              label="平均分"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="num"
              align="center"
              label="学习人数"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template scope="scope">
                <el-button
                  size="small"
                  @click="openDetail(scope.row)">编辑</el-button>
                <!--<el-button-->
                  <!--size="small"-->
                  <!--type="danger"-->
                  <!--@click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
              </template>
            </el-table-column>
          </el-table>
          <div class="study_but">
            <!--<el-button @click="toggleSelection(item.course)">全选</el-button>-->
            <el-button @click="deleteCourse"><i class="el-icon-delete"></i>删除</el-button>
            <el-button @click="handleDownload"><i class="el-icon-upload2"></i>导出</el-button>
            <el-button @click="addCourse"><i class="el-icon-plus"></i>新增课程</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <course :course="oneCourse" class="course_detail" v-show="$store.state.showCourse"></course>
    <add-course class="course-detail" v-show="$store.state.show_addCourse"></add-course>
  </div>
</template>

<script>
  import paging from '../../paging/paging.vue';
  import course from './course/course.vue';
  import addCourse from './addCourse/addCourse.vue';
  import $ from 'jquery';

    export default {
      data() {
        return {
          activeName: '1',
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
          number: '', // 需要删除的index
          allCourse: [],  //  获取的课程集合
          oneCourse: [
            {
              averagescore: '',
              checked: '',
              courseid: '',
              coursename: '',
              num: '',
              passrate: '',
              path: '',
              ranking: '',
              scores: ''
            },
            {
              questions: [],
              traininginfo: []
            }
          ],  //  查看单个课程时的详情
          courseType: []  //  课程种类
        };
      },

      created() {
        this.getCourse();
      },
      watch: {
      },
      methods: {
        getCourse() {
          //  获取所有课程
          this.$http.jsonp('http://120.55.85.65:8088/spg/admin/training/allcourses?username=chencheng1604', {jsonp: 'jsonpCallback'}).then(function (response) {
            // response.data 为服务端返回的数据
            let allCourse = response.data.result.AllCourses;

            for (let tmp in allCourse) {
//          console.log(tmp);  //  键名
//          console.log(list[tmp]);  //  键值'
              this.allCourse.push({type: tmp, num: '', course: allCourse[tmp]});
            }
            for (let i = 0; i < this.allCourse.length; i++) {
              this.allCourse[i].num = String(i + 1);
            }
            console.log(this.allCourse);
            for (let i = 0; i < this.allCourse.length; i++) {
              this.courseType.push({value: this.allCourse[i].type});
            }
            console.log(this.courseType);
          }).catch(function (response) {
            // 出错处理
          });
        },
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
          this.$store.state.showCourse = true;
          //  获取课程详情
          this.$http.jsonp('http://120.55.85.65:8088/spg/admin/training/testresult?courseid=' + row.courseid, {jsonp:
            'jsonpCallback'}).then(function (response) {
            // response.data 为服务端返回的数据
            this.oneCourse = [];
            this.oneCourse.push(row);
            this.oneCourse.push(response.data.result);
            for (let i = 0; i < this.oneCourse[1].questions.length; i++) {
              this.oneCourse[1].questions[i].options = this.oneCourse[1].questions[i].options.split(';');
              for (let x = 0; x < this.oneCourse[1].questions[i].options.length; x++) {
                switch (x) {
                  case 0:
                    this.oneCourse[1].questions[i].A = this.oneCourse[1].questions[i].options[x].substr(2);
                    break;
                  case 1:
                    this.oneCourse[1].questions[i].B = this.oneCourse[1].questions[i].options[x].substr(2);
                    break;
                  case 2:
                    this.oneCourse[1].questions[i].C = this.oneCourse[1].questions[i].options[x].substr(2);
                  	break;
                  case 3:
                    this.oneCourse[1].questions[i].D = this.oneCourse[1].questions[i].options[x].substr(2);
                  	break;
                }
              }
            }
            console.log(this.oneCourse);
          }).catch(function (response) {
//             出错处理
          });
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
              const tHeader = ['课程', '通过率', '平均分', '人数'];
              const filterVal = ['coursename', 'passrate', 'averagescore', 'num'];
              const list = this.excel;
              const data = this.formatJson(filterVal, list);
              export_json_to_excel(tHeader, data, '课程');
            });
          }
        },
        formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]));
        },
        testSelect(rows) {
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
        },
        selectRowAll(row) {
          this.excel = row;
        },
        addCourse() {
            this.$store.state.show_addCourse = true;
        },
        deleteCourse() {
          let deleteId = [];
          console.log(this.excel);
          if (this.excel.length > 0) {
            for (let i = 0; i < this.excel.length; i++) {
//            let id = this.excel[i].id;
              let newId = this.excel[i].courseid;
              deleteId.push(newId);
            }
          }
          let params = JSON.stringify(deleteId);
          console.log(params);
          $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/spg/admin/training/delcourse',
            contentType: 'application/json;charset=utf-8', // 设置请求头信息
            dataType: 'json',
            async: false,
            data: params,
            success: function(data) {
              console.log('删除成功');
              console.log(data);
            }
          });
        }
      },
      components: {
        paging,
        course,
        addCourse
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .study
    position relative;
    height 590px;
    .study_top
      height 50px;
      border-bottom 1px solid #D3DCE6;
      .study_input
        display inline-block;
        margin-right 30px;
        width 250px;
    .study_main
      margin-top 0;
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
      width 867px;
      height 550px;
      overflow-x hidden;
</style>
