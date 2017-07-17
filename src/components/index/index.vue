<template>
  <div class="index">
    <el-row>
      <div class="left">
        <div class="shop_performance">
          <div class="title"><p>门店业绩</p></div>
          <div class="main">
            <el-select filterable v-model="value" placeholder="请选择展示的门店">
              <el-option
                v-for="item in shopModels"
                :key="item.shopid"
                :label="item.shopname"
                :value="item.shopid">
              </el-option>
            </el-select>
            <el-button @click="test">展示</el-button>
            <div class="chart">
              <div id="myChart" style="width: 800px;height: 600px;"></div>
            </div>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
  export default {
      data() {
          return {
            value: '',
            shopModels: []  // 门店和门店id
        };
      },
      beforeCreate() {
        //  获取门店和门店id
        this.$http.jsonp('http://120.55.85.65:8088/spg/admin/display/getShops', {jsonp: 'jsonpCallback'}).then(function (response) {
          // response.data 为服务端返回的数据
          this.shopModels = response.data.result.shopModels;
          console.log('获取获取门店和门店id成功');
        }).catch(function (response) {
          // 出错处理
          console.log(response);
        });
      },
      mounted() {
          this.drawLine();
      },
      methods: {
        test() {
              console.log(this.value);
        },
        drawLine() {
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart'));

          let data = [
            [[28604, 77, 17096869, 'Australia', 1990], [31163, 77.4, 27662440, 'Canada', 1990], [1516, 68, 1154605773, 'China', 1990], [13670, 74.7, 10582082, 'Cuba', 1990], [28599, 75, 4986705, 'Finland', 1990], [29476, 77.1, 56943299, 'France', 1990], [31476, 75.4, 78958237, 'Germany', 1990]]
          ];
          // 绘制图表
          let option = {
            backgroundColor: new this.$echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
              offset: 0,
              color: '#f7f8fa'
            }, {
              offset: 1,
              color: '#cdd0d5'
            }]),
            title: {
              text: ''
            },
            legend: {
              right: 10,
              data: ['1990', '2015']
            },
            xAxis: {
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              }
            },
            yAxis: {
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              },
              scale: true
            },
            series: [{
              name: '1990',
              data: data[0],
              type: 'scatter',
              symbolSize: function (data) {
                return Math.sqrt(data[2]) / 5e2;
              },
              label: {
                emphasis: {
                  show: true,
                  formatter: function (param) {
                    return param.data[3];
                  },
                  position: 'top'
                }
              },
              itemStyle: {
                normal: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(120, 36, 50, 0.5)',
                  shadowOffsetY: 5,
                  color: new this.$echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    offset: 0,
                    color: 'rgb(251, 118, 123)'
                  }, {
                    offset: 1,
                    color: 'rgb(204, 46, 72)'
                  }])
                }
              }
            }, {
              name: '2015',
              data: data[1],
              type: 'scatter',
              symbolSize: function (data) {
                return Math.sqrt(data[2]) / 5e2;
              },
              label: {
                emphasis: {
                  show: true,
                  formatter: function (param) {
                    return param.data[3];
                  },
                  position: 'top'
                }
              },
              itemStyle: {
                normal: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(25, 100, 150, 0.5)',
                  shadowOffsetY: 5,
                  color: new this.$echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    offset: 0,
                    color: 'rgb(129, 227, 238)'
                  }, {
                    offset: 1,
                    color: 'rgb(25, 183, 207)'
                  }])
                }
              }
            }]
          };
          myChart.setOption(option);
        }
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  body
    margin 0;
    padding 0;
  .index
    margin-top -898px;
    margin-left 180px;
    padding-top 30px;
    width 1020px;
    height 868px;
    background #ecf0f1;
    .left
      float left;
      margin-left 30px;
      width 578px;
      height 752px;
      .shop_performance
        width 578px;
        height 754px;
        border 1px solid #E0EEE0;
        border-radius 2px;
        background white;
        .title
          width 578px;
          height 40px;
          border-bottom 1px solid #E0EEE0;
          p
            margin-top 10px;
            margin-left 20px;
            font-size 16px;
            color #1abc9c;
      .shop_fun
        margin-top 30px;
        width 578px;
        height 398px;
        border 1px solid #E0EEE0;
        border-radius 2px;
        background white;
        .title
          width 578px;
          height 40px;
          border-bottom 1px solid #E0EEE0;
          p
            margin-top 10px;
            margin-left 20px;
            font-size 16px;
            color #ff8643;
    .right
      float left;
      margin-left 30px;
      width 352px;
      height 752px;
      .date
        width 352px;
        height 240px;
        border 1px solid #E0EEE0;
        border-radius 2px;
        background white;
        .title
          width 352px;
          height 40px;
          border-bottom 1px solid #E0EEE0;
          p
            margin-top 10px;
            margin-left 20px;
            font-size 16px;
            color #0096ff;
      .later
        margin-top 30px;
        width 352px;
        height 276px;
        border 1px solid #E0EEE0;
        border-radius 2px;
        background white;
        color #99A9BF;
        .title
          width 352px;
          height 40px;
          border-bottom 1px solid #E0EEE0;
          p
            margin-top 10px;
            margin-left 20px;
            font-size 16px;
            color #99A9BF;
        .main
          .state
            padding 0;
            margin 0;
            li
              display: block;
              margin-right 14px;
              padding-top 9px;
              height 40px;
              list-style-type:none;
              line-height 31px;
              border-bottom 1px solid #bdc3c7;
              font-size 14px;
              &:hover
                background #f6f8fc;
                padding-top 9px;
                height 40px;
                border-left 2px solid #8e44ad;
      .help
        margin-top 30px;
        width 352px;
        height 174px;
        border 1px solid #E0EEE0;
        border-radius 2px;
        background white;
        .title
          width 352px;
          height 40px;
          border-bottom 1px solid #E0EEE0;
          p
            margin-top 10px;
            margin-left 20px;
            font-size 16px;
            color #e74c3c;
</style>
