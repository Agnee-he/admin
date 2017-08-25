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
                  v-model="date"
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
                  sortable
                  align="center"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="total"
                  label="总销量（件）"
                  sortable
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="revenue"
                  label="销售收入（元）"
                  sortable
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="average"
                  label="均价（元）"
                  sortable
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="profit"
                  label="销售毛利（元）"
                  sortable
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="rate"
                  label="销售毛利率"
                  sortable
                  align="center">
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
            url: this.$store.state.lastUrl,
            userName: this.$store.state.user,
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
            date: '',
            startTime: '',
            endTime: '',
            tableData3: []
        };
      },
      created() {
        //  获取门店和门店id
        this.$http.jsonp(this.url + 'spg/admin/display/getShops', {jsonp: 'jsonpCallback'}).then(function (response) {
          // response.data 为服务端返回的数据
          this.shopModels = response.data.result.shopModels;
        }).catch(function (response) {
          // 出错处理
        });
        // 获取销量
        this.$http.jsonp(this.url + 'spg/admin/sales/fusion?username=' + this.userName, {jsonp: 'jsonpCallback'}).then(function (response) {
          // response.data 为服务端返回的数据
          let returnData = response.data.result;
          this.type = returnData.type;
          if (returnData.type === 'straightcamp') {
            console.log('straightcamp');
            for (let i = 0; i < returnData.result.length; i++) {
              let newD = {value: returnData.result[i][0], label: returnData.result[i][1]};
              this.selectOptions.push(newD);
            }
            console.log(this.selectOptions);
          } else if (returnData.type === 'group') {
            for (let x = 0; x < returnData.result.length; x++) {
              let one = {value: returnData.result[x].grpClassId, label: returnData.result[x].grpClassName, children: []};
              this.selectOptions.push(one);
              for (let y = 0; y < returnData.result[x].sysGroupModels.length; y++) {
                let two = {value: returnData.result[x].sysGroupModels[y].grpId, label: returnData.result[x].sysGroupModels[y].grpName, children: []};
                this.selectOptions[x].children.push(two);
                for (let z = 0; z < returnData.result[x].sysGroupModels[y].shopModels.length; z++) {
                  let three = {value: returnData.result[x].sysGroupModels[y].shopModels[z].shopid, label: returnData.result[x].sysGroupModels[y].shopModels[z].shopname};
                  this.selectOptions[x].children[y].children.push(three);
                }
              }
            }
          } else {
            let newD = {value: returnData.result.shopid, label: returnData.result.shopname};
            this.selectOptions.push(newD);
          }
        }).catch(function (response) {
          // 出错处理
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
          this.tableData3 = [];
          if (this.date !== '') {  // 判断是否选择时间段
            this.startTime = this.formatDateTime((this.date[0]));
            this.endTime = this.formatDateTime((this.date[1]));
            if (this.value !== '') {
              this.$http.jsonp(this.url + 'spg/admin/sales/performance?shopid=' + this.value + '&stime=' + this.startTime + '&etime=' + this.endTime + '&orderby=DATE&order=desc', {jsonp: 'jsonpCallback'}).then(function (response) {
                // response.data 为服务端返回的数据
                let data = response.data.result.销售业绩;
                if (data.length === 0) {
                  this.$message({
                    showClose: true,
                    message: '没有销量。'
                  });
                }
                for (let i = 0; i < data.length; i++) {
                  let newData = {date: data[i][2], total: data[i][3], revenue: data[i][4], average: data[i][5], profit: data[i][6], rate: data[i][7]};
                  this.tableData3.push(newData);
                }
              }).catch(function (response) {
                // 出错处理
              });
            } else if (this.selectedOptions[2] !== 'undefined') {
              this.$http.jsonp(this.url + 'spg/admin/sales/performance?shopid=' + this.selectedOptions[2] + '&stime=' + this.startTime + '&etime=' + this.endTime + '&orderby=DATE&order=desc', {jsonp: 'jsonpCallback'}).then(function (response) {
                // response.data 为服务端返回的数据
                let data = response.data.result.销售业绩;
                if (data.length === 0) {
                  this.$message({
                    showClose: true,
                    message: '没有销量。'
                  });
                }
                for (let i = 0; i < data.length; i++) {
                  let newData = {date: data[i][2], total: data[i][3], revenue: data[i][4], average: data[i][5], profit: data[i][6], rate: data[i][7]};
                  this.tableData3.push(newData);
                }
              }).catch(function (response) {
                // 出错处理
              });
            } else {
            }
          } else {
            this.$message({
              message: '请选择时间!',
              type: 'warning'
            });
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
      border 1px solid #D3DCE6;
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
