<template>
  <div class="index">
    <el-row>
      <div class="left">
        <div class="shop_performance">
          <div class="main">
            <!--<el-select filterable v-model="value" placeholder="请选择展示的门店">-->
              <!--<el-option-->
                <!--v-for="item in shopModels"-->
                <!--:key="item.shopid"-->
                <!--:label="item.shopname"-->
                <!--:value="item.shopid">-->
              <!--</el-option>-->
            <!--</el-select>-->
            <!--<el-button @click="test">展示</el-button>-->
            <div class="chart">
              <div id="myChart" style="width: 950px;height: 600px;"></div>
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
            shopModels: [],  // 门店和门店id
            shopName: [],  // 门店名
            shopNum: [],  // 销售数量
            shopCount: []  // 销售额
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
        //  获取门店排名
        this.$http.jsonp('http://120.55.85.65:8088/spg/admin/sales/ranking?stime=1&etime=1&orderby=num&top=20', {jsonp: 'jsonpCallback'}).then(function (response) {
          // response.data 为服务端返回的数据
          let result = response.data.result.result;
          console.log(result);
          for (let i = 0; i < result.length; i++) {
              this.shopName.push(result[i].shopname);
              this.shopNum.push(result[i].num);
              this.shopCount.push(result[i].amount);
          }
          console.log(this.shopName);
          console.log(this.shopNum);
          console.log(this.shopCount);
          this.drawLine();
          console.log('获取门店排名成功');
        }).catch(function (response) {
          // 出错处理
          console.log(response);
        });
      },
      methods: {
        test() {
              console.log(this.value);
        },
        drawLine() {
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart'));
          let colors = ['#5793f3', '#d14a61', '#675bba'];
//           绘制图表
          let option = {
            color: colors,

            tooltip: {
              trigger: 'axis',
              axisPointer: {type: 'cross'}
            },
            grid: {
              right: '20%'
            },
            toolbox: {
              feature: {
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            legend: {
              data:['蒸发量','降水量','平均温度']
            },
            xAxis: [
              {
                type: 'category',
                axisTick: {
                  alignWithLabel: true
                },
                data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '蒸发量',
                min: 0,
                max: 250,
                position: 'right',
                axisLine: {
                  lineStyle: {
                    color: colors[0]
                  }
                },
                axisLabel: {
                  formatter: '{value} ml'
                }
              },
              {
                type: 'value',
                name: '降水量',
                min: 0,
                max: 250,
                position: 'right',
                offset: 80,
                axisLine: {
                  lineStyle: {
                    color: colors[1]
                  }
                },
                axisLabel: {
                  formatter: '{value} ml'
                }
              }
            ],
            series: [
              {
                name: '蒸发量',
                type: 'bar',
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
              },
              {
                name: '降水量',
                type: 'bar',
                yAxisIndex: 1,
                data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
              }
            ]
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
