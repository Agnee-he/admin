<template>
  <div class="grade">
    <div class="close">
      <el-row>
        <el-col :span="24"><div><i @click="closeGrade" class="el-icon-circle-close"></i></div></el-col>
      </el-row>
    </div>
    <div class="top">
      <el-row>
        <el-col :span="3">
          <div class="logo"></div>
        </el-col>
        <el-col :span="13">
          <div>
            <p class="title_p">{{name}}</p>
            <p class="content_p">no.{{id}}</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <p class="pass_p">通过率：{{passRate}}</p>
            <p class="ave_p">平均分：{{averGrade}}分</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="chart">
      <div id="myChart"></div>
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="grade.已考核"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="coursename"
          label="课程名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="passrate"
          label="通过率"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="averagescore"
          label="平均分"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="scores"
          label="员工分数"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="ranking"
          label="排名"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      name: {
          type: String
      },
      id: {
          type: Number
      },
      passRate: {
          type: String
      },
      averGrade: {
          type: String
      }
    },
    data() {
        return {
          grade: [],
          weiTongGuo: 0,
          yiTongGuo: 0,
          weiKaoHe: 0
        };
    },
    created() {
    },
    watch: {
      id: {
          handler: function () {
            //  获取具体某人考核
            this.$http.jsonp('http://120.55.85.65:8088/spg/admin/training/myResult?userid=' + this.id, {jsonp: 'jsonpCallback'}).then(function (response) {
              // response.data 为服务端返回的数据
              this.grade = response.data.result.myresult;
              this.weiTongGuo = this.grade.未通过.length;
              this.yiTongGuo = this.grade.已通过.length;
              this.weiKaoHe = this.grade.未考核.length;
              console.log('获取单人成绩成功');
            }).catch(function (response) {
              // 出错处理
              console.log('获取单人成绩失败');
              console.log(response);
            });
          }
      },
      grade: {
          handler: function() {
            this.drawLine();
          }
      }
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption(
          {
            title: {
              text: '',
              subtext: '',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [
              {
                name: '占比',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                  {value: this.weiTongGuo, name: '未通过'},
                  {value: this.yiTongGuo, name: '已通过'},
                  {value: this.weiKaoHe, name: '未考核'}
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
        );
      },
      closeGrade() {
          this.$store.state.show_grade = false;
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
  .pass_p
    float right;
    margin-top 0;
    font-size 14px;
  .ave_p
    margin-top 30px;
    font-size 14px;
  .content_p
    margin-top 20px;
    font-size 14px;
  .grade
    position absolute;
    z-index 999;
    top 10px;
    margin-left 0;
    width 872px;
    height 718px;
    overflow auto;
    background-color white;
    box-shadow 0 0 2px #1F2D3D;
    padding 30px;
    .close
      margin-top -10px;
      margin-right -10px;
      float right;
    .top
      border-bottom 1px solid #D3DCE6;
      .logo
        width 64px;
        height 64px;
        background-image url("../../../../img/grade.png");
    .chart
      text-align center;
      #myChart
        margin 0 auto;
        width 400px;
        height 300px;
    .table
      margin-top 15px;
</style>
