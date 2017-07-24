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
              <div id="myChart" style="width: 1100px;height: 600px;"></div>
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
          this.$nextTick(function() {
            // DOM 更新了
            this.drawLine();
          });
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
          let colors = ['#5793f3', '#d14a61'];
//           绘制图表
          let option = {
            color: colors,

            tooltip: {
              trigger: 'axis',
              axisPointer: {type: 'cross'}
            },
            title: {
              show: true,
              text: '最近一个月门店销量TOP20',
              left: '30%'
            },
            grid: {
              right: '20%'
            },
            legend: {
              data: ['销售数量', '销售业绩'],
              right: '15%'
            },
            xAxis: [
              {
                type: 'category',
                axisTick: {
                  alignWithLabel: true
                },
                axisLabel: {
                  interval: 0, // 横轴信息全部显示
                  rotate: -30 // -30度角倾斜显示
                },
                data: this.shopName
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '销售数量',
//                min: 0,
//                max: 250,
                position: 'right',
                axisLine: {
                  lineStyle: {
                    color: colors[0]
                  }
                },
                axisLabel: {
                  formatter: '{value} 件'
                }
              },
              {
                type: 'value',
                name: '销售业绩',
//                min: 0,
//                max: 250,
                position: 'left',
                axisLine: {
                  lineStyle: {
                    color: colors[1]
                  }
                },
                axisLabel: {
                  formatter: '{value} 元'
                }
              }
            ],
            series: [
              {
                name: '销售数量',
                type: 'bar',
                data: this.shopNum
              },
              {
                name: '销售业绩',
                type: 'bar',
                yAxisIndex: 1,
                data: this.shopCount
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
    margin-top -698px;
    margin-left 180px;
    padding-top 30px;
    width 1020px;
    height 688px;
    background #ecf0f1;
    .left
      float left;
      margin-left 30px;
      width 578px;
      height 572px;
      .shop_performance
        width 578px;
        height 554px;
</style>
