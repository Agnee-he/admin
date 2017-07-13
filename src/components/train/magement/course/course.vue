<template>
  <div class="course">
    <div class="close" @click="closeDetail">
      <i class="el-icon-circle-cross"></i>
    </div>
    <h3 class="title">课程详情</h3>
    <div class="title">
      <el-row>
        <el-col :span="3"><div></div></el-col>
        <el-col :span="5"><div>
          <p class="left_p course_name">{{course[0].coursename}}</p>
          <p class="left_p">NO.{{course[0].courseid}}</p>
        </div></el-col>
        <el-col :span="4"><div>
          <!--<p>所属分类：XXX</p>-->
        </div></el-col>
        <el-col :span="4"><div>
          <p></p>
        </div></el-col>
        <el-col :span="4"><div>
          <p></p>
        </div></el-col>
        <el-col :span="4"><div>
          <p class="right_p">通过率：{{course[0].passrate}}</p>
          <p class="right_p">平均分：{{course[0].averagescore}}</p>
        </div></el-col>
      </el-row>
    </div>
    <div class="content">
      <p class="til">课程内容：</p>
      <el-row>
        <el-col :span="3"><div></div></el-col>
        <el-col :span="5"><div>
          <p>{{course[0].coursename}}</p>
        </div></el-col>
        <el-col :span="4"><div>
          <p></p>
        </div></el-col>
        <el-col :span="4"><div>
          <p></p>
        </div></el-col>
        <el-col :span="2"><div>
          <p></p>
        </div></el-col>
        <el-col :span="6"><div>
          <p class="left_p">xxxmb,下载</p>
          <p class="left_p">上传于：2017/6/6 10：29</p>
        </div></el-col>
      </el-row>
    </div>
    <div class="study">
      <p class="til">员工学习：<span class="num">{{course[0].num}}人</span></p>
      <el-row class="search">
        <el-col :span="10"><div>
          <div class="search_input1">
            <span>搜索地区：</span>
            <div class="el-inp">
              <el-input v-model="input1" placeholder="请输入地区名称/编号"></el-input>
            </div>
          </div>
          <div class="search_input2">
            <span>搜索员工：</span>
            <div class="el-inp">
              <el-input v-model="input1" placeholder="请输入员工姓名/工号"></el-input>
            </div>
          </div>
        </div></el-col>
        <el-col :span="8"><div>
          <div class="search_input3">
            <span>考试状态：</span>
            <div class="el-inp">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div></el-col>
        <el-col :span="6"><div>
          <div class="but">
            <el-button><i class="el-icon-search"></i>搜索</el-button><el-button><i class="el-icon-information"></i>重置</el-button>
          </div>
        </div></el-col>
      </el-row>
      <el-table class="el_tab"
        ref="multipleTable"
        :data="course[1].traininginfo"
        @select="selectRow"
        @select-all="selectRowAll"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="shop"
          label="所属门店/地区"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="员工姓名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="testresult"
          label="考试状态"
          align="center">
        </el-table-column>
        <el-table-column
          prop="scores"
          sortable
          label="分数"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px; float: left;">
        <el-button @click="toggleSelection(tableData3)">全选</el-button><el-button @click="handleDownload">导出</el-button>
      </div>
      <div class="paging">
        <paging :total="11"></paging>
      </div>
    </div>
    <div class="test">
      <p class="til">考试考题：</p>
      <div class="btn">
        <el-row>
          <el-col :span="12"><div>
            <p>单选题</p>
          </div></el-col>
          <el-col :span="12"><div style="float: right">
            <el-button><i class="el-icon-delete"></i>删除</el-button><el-button @click="showEdit"><i class="el-icon-edit"></i>编辑</el-button>
          </div></el-col>
        </el-row>
      </div>
      <div class="test_content">
        <el-table
          ref="singleTable"
          :data="course[1].questions"
          highlight-current-row
          style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            property="content"
            label="题目"
            width="200"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            property="A"
            label="A"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            property="B"
            label="B"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            property="C"
            label="C"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            property="D"
            label="D"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            property="answer"
            label="答案">
          </el-table-column>
          <el-table-column
            property="scores"
            label="权重">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="edit" v-show="show_edit">
      <div class="close" @click="closeEdit">
        <i class="el-icon-circle-cross"></i>
      </div>
      <div class="til">
        <h3>考题设计</h3>
      </div>
      <div class="top">
        <el-row>
          <el-col :span="3"><div class="left1">

          </div></el-col>
          <el-col :span="5"><div>
            <p class="left_p course_name">课程名称</p>
            <p class="left_p">NO.2342343242</p>
          </div></el-col>
          <el-col :span="4"><div>
            <p>所属分类：XXX</p>
          </div></el-col>
          <el-col :span="4"><div>
            <p></p>
          </div></el-col>
          <el-col :span="2"><div>
            <p></p>
          </div></el-col>
          <el-col :span="6"><div>
            <p>&nbsp;</p>
            <p>更新时间：2017-02-23 14:52</p>
          </div></el-col>
        </el-row>
      </div>
      <div class="main">
        <p>考试试题设计：</p>
        <p>单选题</p>
        <div class="edit_content">
          <table border="0" cellspacing="0" cellpadding="0" class="table" >
            <tr class="tr1">
              <th style="width: 5%">题号</th><th>题目</th><th style="width: 10%">A</th><th style="width: 10%">B</th><th style="width: 10%">C</th><th style="width: 10%">D</th><th style="width: 10%">答案</th><th style="width: 10%">权重</th>
            </tr>
            <tr class="tr2" v-for="(item, index) in oldExam">
              <td>{{index}}</td><td>{{item.exam}}</td><td>{{item.A}}</td><td>{{item.B}}</td><td>{{item.C}}</td><td>{{item.D}}</td><td>{{item.answer}}</td><td>{{item.weight}}</td>
            </tr>
            <tr class="tr2" v-for="(item, index) in newExam">
              <td>{{oldExam.length + index}}</td><td><el-input type="textarea" :rows="2" v-model="item.exam" placeholder="请输入题目"></el-input></td><td><el-input type="textarea" :rows="2" v-model="item.A"></el-input></td><td><el-input type="textarea" :rows="2" v-model="item.B"></el-input></td><td><el-input type="textarea" :rows="2" v-model="item.C" ></el-input></td><td><el-input type="textarea" :rows="2" v-model="item.D"></el-input></td><td><el-input v-model="item.answer"></el-input></td><td><el-input v-model="item.weight"></el-input></td>
            </tr>
            <tr class="tr2">
              <td><i class="el-icon-plus" @click="addRow"></i></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
          </table>
        </div>
        <div class="bottom">
          <el-row>
            <el-col :span="12"><div>
              <p class="thin_p">单选试题只能有一个正确答案；</p>
              <p class="thin_p">每道题目分数=（每题权重值/所有题权重值总和）*100</p>
            </div></el-col>
            <el-col :span="12"><div class="btn">
              <el-button type="primary" size="large" @click="submitExam">保存</el-button>
            </div></el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import paging from '../../../paging/paging.vue';

    export default {
    	props: {
    		course: {
    			type: Array
        }
      },
      data() {
        return {
          options: [
          {
            value: '选项1',
            label: '1'
          }, {
            value: '选项2',
            label: '2'
          }, {
            value: '选项3',
            label: '3'
          }],
          value: '',
          tableData3: [
            {
              address: '上海一号店',
              name: '王小虎',
              state: '合格',
              grade: '88'
            },
            {
              address: '上海一号店',
                name: '王虎',
              state: '合格',
              grade: '98'
            },
            {
              address: '上海一号店',
                name: '小虎',
              state: '合格',
              grade: '68'
            }
          ],
          tableData: [
              {
                test: 'xxxxxxxx',
                a: '1',
                b: '2',
                c: '3',
                d: '4',
                answer: 'A',
                weight: '10'
              }, {
                test: 'xxxxxxxx',
                a: '1',
                b: '2',
                c: '3',
                d: '4',
                answer: 'A',
                weight: '10'
              }, {
                test: 'xxxxxxxx',
                a: '1',
                b: '2',
                c: '3',
                d: '4',
                answer: 'A',
                weight: '10'
              }, {
                test: 'xxxxxxxx',
                a: '1',
                b: '2',
                c: '3',
                d: '4',
                answer: 'A',
                weight: '10'
              }
          ],
          tableData1: [
            {
              test: 'xxxxxxxx',
              a: '1',
              b: '2',
              c: '3',
              d: '4',
              answer: 'A',
              weight: '10'
            }, {
              test: 'xxxxxxxx',
              a: '1',
              b: '2',
              c: '3',
              d: '4',
              answer: 'A',
              weight: '10'
            }, {
              test: 'xxxxxxxx',
              a: '1',
              b: '2',
              c: '3',
              d: '4',
              answer: 'A',
              weight: '10'
            }, {
              test: 'xxxxxxxx',
              a: '1',
              b: '2',
              c: '3',
              d: '4',
              answer: 'A',
              weight: '10'
            }
          ],
          oldExam: [
            {
              exam: 'xxxx',
              A: '1',
              B: '2',
              C: '3',
              D: '4',
              answer: 'a',
              weight: '3'
            },
            {
              exam: 'ddddd',
              A: '1',
              B: '2',
              C: '3',
              D: '4',
              answer: 'b',
              weight: '4'
            },
            {
              exam: 'ddddd',
              A: '1',
              B: '2',
              C: '3',
              D: '4',
              answer: 'b',
              weight: '4'
            }
          ],
          newExam: [
            {
              exam: '',
              A: '',
              B: '',
              C: '',
              D: '',
              answer: '',
              weight: ''
            }
          ], // 新增考题内容
          show_edit: false,
          input1: '',
          excel: ''
        };
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
        closeDetail() {
            this.$store.state.showCourse = false;
        },
        showEdit() {  // 打开编辑试题页
            this.show_edit = true;
        },
        closeEdit() { // 关闭编辑试题页
            this.show_edit = false;
        },
        addRow() {    // 新增一行考题输入框
            let newTr = {exam: '', A: '', B: '', C: '', D: '', answer: '', weight: ''};
            this.newExam.push(newTr);
        },
        submitExam() { //  保存上传新考题
          console.log(this.newExam);
        },
        handleDownload() {
          require.ensure([], () => {
            const { export_json_to_excel } = require('../../../../vendor/Export2Excel');
            const tHeader = ['所属门店/地区', '员工姓名', '考试状态', '分数'];
            const filterVal = ['address', 'name', 'state', 'grade'];
            const list = this.excel;
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '课程详情');
          });
          console.log(1);
        },
        formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]));
        },
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
          paging
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  p
    font-size 12px;
  .left_p
    text-align left;
  .right_p
    text-align right;
  .thin_p
    color #8492A6;
  .course_name
    margin-top 10px;
    font-size 18px;
    line-height 18px;
  .til
    margin 0;
    font-size 14px;
  .course
    border 1px solid #D3DCE6;
    background white;
    padding 30px;
    overflow auto;
    .title
      text-align center;
      margin 0;
    .close
      float right;
      margin-top -20px;
      margin-right -10px;
    .title
      height 75px;
      border-bottom 1px solid #D3DCE6;
      .left
        height 75px;
        width 60px;
        background red;
    .content
      margin-top 5px;
      height 95px;
      border-bottom 1px solid #D3DCE6;
      .left
        height 50px;
        width 50px;
        background red;
    .study
      margin-top 5px;
      padding-bottom  55px;
      border-bottom 1px solid #D3DCE6;
      .til
        .num
          margin-left 40px;
      .search
        margin-top 10px;
        .search_input1
          float left;
          width 400px;
          font-size 14px;
          .el-inp
            display inline-block;
            width 250px;
        .search_input2
          float left;
          margin-top 5px;
          width 400px;
          font-size 14px;
          .el-inp
            display inline-block;
            width 250px;
        .search_input3
          width 200px;
          font-size 14px;
          .el-inp
            display inline-block;
            width 100px;
        .but
          float right;
          margin-top 40px;
      .el_tab
        margin-top 15px;
      .paging
        display inline-block;
        float right;
        margin-top 15px;
        height 50px;
    .test
      margin-top 5px;
      border-bottom 1px solid #D3DCE6;
      .btn
        .right
          float right;
    .edit
      background-color: #fff;
      border  1px solid #D3DCE6;
      border-radius 5px;
      box-shadow 0 0 5px black;
      top: 50%;
      left: 50%;
      margin: -300px 0 0 -390px;
      padding 15px;
      position: fixed;
      width: 925px;
      height: 600px;
      z-index: 25;
      overflow auto;
      .close
        float right;
        margin-right 0px;
        margin-top 0px;
      .til
        text-align center;
      .top
        border-bottom 1px solid #D3DCE6;
        .left1
          margin-left 15px;
          height 75px;
          width 60px;
          background red;
      .main
        margin-left 15px;
        margin-right 15px;
        .edit_content
          .table
            width 100%;
            text-align center;
            border 1px solid #E5E9F2;
            border-collapse: collapse;
            .tr1
              width 100%;
              background-color #E5E9F2;
              height 40px;
            .tr2
              width 100%;
              height 40px;
              border 1px solid #E5E9F2;
              &:hover
                background-color #E5E9F2;
        .bottom
          .btn
            float right;
            margin-top 10px;
            margin-right 100px;
</style>
