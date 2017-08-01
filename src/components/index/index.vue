<template>
  <div class="index">
    <el-row>
      <div class="left">
        <div class="shop_performance">
          <div class="main">
            <div class="select">
              <div class="one" v-if="type === 'shop'">
                <span class="demonstration">选择门店</span>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in selectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="two" v-if="type === 'straightcamp'">
                <span class="demonstration">选择门店</span>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in selectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="three" v-if="type === 'group'">
                <div class="block">
                  <span class="demonstration">选择门店</span>
                  <el-cascader
                    style="width: 350px"
                    :options="selectOptions"
                    v-model="selectedOptions">
                  </el-cascader>
                </div>
              </div>
            </div>
            <div class="btn">
              <div class="block">
                <span class="demonstration">选择日期</span>
                <el-date-picker
                  v-model="value6"
                  type="daterange"
                  placeholder="选择日期范围">
                </el-date-picker>
              </div>
              <el-button @click="showYeJi">查询业绩</el-button>
            </div>
            <div class="table">
              <el-table
                :data="tableData3"
                height="500"
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="日期"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址">
                </el-table-column>
              </el-table>
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
            url: this.$store.state.url,
            value: '',
            value7: '',
            shopModels: [],  // 门店和门店id
            shopName: [],  // 门店名
            shopNum: [],  // 销售数量
            shopCount: [],  // 销售额
            type: '',
            selectedOptions: [],
            selectOptions: [],
            yeJi: [],  // 门店业绩
            value6: '',
            startTime: '',
            endTime: '',
            tableData3: [{
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-08',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-06',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-07',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }]
        };
      },
      created() {
        //  获取门店和门店id
        this.$http.jsonp(this.url + 'spg/admin/display/getShops', {jsonp: 'jsonpCallback'}).then(function (response) {
          // response.data 为服务端返回的数据
          this.shopModels = response.data.result.shopModels;
          console.log('获取获取门店和门店id成功');
        }).catch(function (response) {
          // 出错处理
          console.log(response);
        });
        // 获取销量
        this.$http.jsonp('http://192.168.199.143:8080/spg/admin/sales/fusion?username=ZXX000', {jsonp: 'jsonpCallback'}).then(function (response) {
          // response.data 为服务端返回的数据
          let returnData = response.data.result;
          this.type = returnData.type;
          console.log(returnData);
          if (returnData.type === 'straightcamp') {
            console.log('straightcamp');
            for (let i = 0; i < returnData.result.length; i++) {
              let newD = {value: returnData.result[i][0], label: returnData.result[i][1]};
              this.selectOptions.push(newD);
            }
            console.log(this.selectOptions);
          } else if (returnData.type === 'group') {
            console.log('group');
            for (let x = 0; x < returnData.result.length; x++) {
//              console.log('x');
//              console.log(this.selectOptions);
              let one = {value: returnData.result[x].grpClassId, label: returnData.result[x].grpClassName, children: []};
              this.selectOptions.push(one);
              for (let y = 0; y < returnData.result[x].sysGroupModels.length; y++) {
//                console.log('y');
//                console.log(this.selectOptions);
                let two = {value: returnData.result[x].sysGroupModels[y].grpId, label: returnData.result[x].sysGroupModels[y].grpName, children: []};
                this.selectOptions[x].children.push(two);
                for (let z = 0; z < returnData.result[x].sysGroupModels[y].shopModels.length; z++) {
//                  console.log('z');
//                  console.log(this.selectOptions);
                  let three = {value: returnData.result[x].sysGroupModels[y].shopModels[z].shopid, label: returnData.result[x].sysGroupModels[y].shopModels[z].shopname};
                  this.selectOptions[x].children[y].children.push(three);
                }
              }
            }
            console.log(this.selectOptions);
          } else {
            console.log('shop');
            let newD = {value: returnData.result.shopid, label: returnData.result.shopname};
            this.selectOptions.push(newD);
            console.log(this.selectOptions);
          }
          console.log('获取门店');
        }).catch(function (response) {
          // 出错处理
          console.log(response);
        });
      },
      methods: {
        test() {
              console.log(this.value);
        },
        formatDateTime(date) { // 格式化时间
          let y = date.getFullYear();
          let m = date.getMonth() + 1;
          m = m < 10 ? ('0' + m) : m;
          let d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
//        let h = date.getHours();
//        let minute = date.getMinutes();
//        minute = minute < 10 ? ('0' + minute) : minute;
          return y + '-' + m + '-' + d;
        },
        showYeJi() {
          if (this.value6 !== []) {  // 判断是否选择时间段
            if (this.value !== '') {
              console.log(this.value);
              console.log(this.value6);
            } else if (this.selectedOptions[2] !== '') {
              console.log(this.selectedOptions[2]);
              console.log(this.formatDateTime((this.value6[0])));
              console.log(this.formatDateTime((this.value6[1])));
            } else {
              console.log('空');
            }
          }
        }
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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
      width 960px;
      height 658px;
      background white;
      border 1px solid black;
      border-radius 5px;
      .shop_performance
        width 960px;
        height 658px;
        .main
          margin-top 30px;
          margin-left 30px;
          margin-right 30px;
          .select
            display inline-block;
          .btn
            display inline-block;
            margin-left 30px;
            .block
              display inline-block;
            .el-button
              margin-left 30px;
          .table
            margin-top 30px;
</style>
