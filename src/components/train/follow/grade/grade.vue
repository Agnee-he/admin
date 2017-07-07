<template>
  <div class="grade">
    <div class="top">
      <el-row>
        <el-col :span="3">
          <div class="logo"></div>
        </el-col>
        <el-col :span="13">
          <div>
            <p class="title_p">我是name</p>
            <p class="content_p">no.111</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <p class="top_p">xxxx</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="chart">
      <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="grade"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="belongshop"
          label="门店"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="grade"
          label="成绩"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        grade: [
          {
            belongshop: '一号店',
            name: '时代感',
            grade: 99
          }
      ]
      };
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({
          title: { text: '' },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        });
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
  .grade
    margin-left 30px;
    width 808px;
    height 718px;
    overflow auto;
    background-color white;
    box-shadow 0 0 2px #1F2D3D;
    padding 30px;
    .top
      border-bottom 1px solid #D3DCE6;
      .logo
        width 50px;
        height 70px;
        background-color aqua;
    .table
      margin-top 15px;
</style>
