
<template>
  <div class="shop">
    <el-tabs type="border-card" class="tabs" v-show="show_store_display">
      <el-tab-pane label="门店陈列">
        <div class="top">
          <div class="search_input1">
            <span>搜索主题：</span>
            <div class="el-inp">
              <el-input v-model="displayType" placeholder="请输入陈列主题"></el-input>
            </div>
          </div>
          <div class="search_input2">
            <span>搜索门店：</span>
            <div class="el-inp">
              <el-input v-model="displayShop" placeholder="请输入门店名称"></el-input>
            </div>
          </div>
          <div class="choose_date">
            <div class="block">
              <span class="demonstration">发布日期：</span>
              <el-date-picker
                v-model="displayTime"
                type="daterange"
                placeholder="选择日期范围">
              </el-date-picker>
            </div>
          </div>
          <div class="but">
            <el-button @click="searchDisplay"><i class="el-icon-search"></i>搜索</el-button><el-button @click="resetSearchDisplay"><img src="../../img/resetting.png" width="12px" height="12px;"/>重置</el-button><el-button @click="openNewDisplay"><i class="el-icon-plus"></i>新增陈列</el-button>
          </div>
        </div>
        <div class="main">
          <el-table
            ref="multipleTable"
            :data="display"
            @select="selectRow"
            @select-all="selectRowAll"
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55"
              align="center">
            </el-table-column>
            <el-table-column
              prop="displayName"
              label="陈列名称"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              prop="displayType"
              label="陈列主题"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="publishTime"
              label="发布日期"
              sortable
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="shopName"
              label="门店"
              width="230"
              align="center">
            </el-table-column>
            <el-table-column
              prop="stars"
              label="陈列考评(星)"
              sortable
              width="160"
              align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  @click="openCheckDisplay(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="but_select">
            <el-button @click="toggleSelection(display)">全选</el-button>
            <el-button @click="deleteDisplay"><i class="el-icon-delete"></i>删除</el-button>
            <el-button @click="handleDownload"><i class="el-icon-upload2"></i>导出</el-button>
          </div>
          <div class="paging">
            <div class="block">
              <el-pagination
                :current-page.sync="displayPage"
                :page-size="10"
                layout="total, prev, pager, next"
                :total="displayTotal">
              </el-pagination>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="考勤排班">
        <div class="two_btn" v-show="show_content">
          <!--<el-button class="btn1" type="primary"><i class="el-icon-edit"></i>考勤</el-button>-->
          <el-button style="margin-left: 85px;" class="btn2" type="primary" @click="showChooseOrder"><i class="el-icon-date"></i>排班</el-button>
        </div>
        <div class="content" v-show="show_content">
          <!-- 考勤时间查询 -->
          <!--<div>-->
            <!--<el-row>-->
              <!--<el-col :span="4"><div>-->
                <!--<p>选择考勤日期：</p>-->
              <!--</div></el-col>-->
              <!--<el-col :span="6"><div style="margin-top: 10px">-->
                <!--<div class="block">-->
                  <!--<el-date-picker-->
                    <!--v-model="value1"-->
                    <!--type="date"-->
                    <!--placeholder="选择日期">-->
                  <!--</el-date-picker>-->
                <!--</div>-->
              <!--</div></el-col>-->
              <!--<el-col :span="8"><div style="margin-top: 10px"><el-button @click="checking">查询</el-button><el-button @click="resetChecking">重置</el-button></div></el-col>-->
            <!--</el-row>-->
          <!--</div>-->
          <el-row class="con_row2">
            <el-col :span="24"><div>
              <div class="content_top">
                <el-table
                  :data="attendance"
                  style="width: 100%">
                  <el-table-column
                    fixed
                    prop="chname"
                    label="姓名"
                    align="center"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="shopname"
                    label="门店"
                    align="center"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    prop="bctype"
                    label="班次"
                    align="center"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="dkdate"
                    label="考勤时间"
                    align="center"
                    width="240">
                  </el-table-column>
                  <el-table-column
                    prop="dktype"
                    label="考勤类型"
                    width="100"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="dklocation"
                    label="打卡地点"
                    width="500"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="result"
                    label="考勤结果"
                    width="100"
                    align="center">
                  </el-table-column>
                </el-table>
                <span style="font-size: 14px;">选择导出考勤时间段：</span>
                <el-date-picker
                  v-model="attendenceRangeDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
                <el-button style="margin-top: 10px;" @click="pushAttendence">导出</el-button>
                <div class="block" style="float: right;margin-top: 10px;">
                  <el-pagination
                    :current-page.sync="attendencePage"
                    :page-size="10"
                    layout="total, prev, pager, next"
                    :total="attendenceTotal">
                  </el-pagination>
                </div>
              </div>
            </div></el-col>
          </el-row>
        </div>
        <!-- 排班时间 -->
        <div class="choose_order" v-show="show_choose_order">
          <div class="choose2">
            <el-row>
              <el-col :span="2"><div style="margin-top: 5px;margin-left: 5px;">日期范围:</div></el-col>
              <el-col :span="6"><div>
                <div class="block">
                  <el-date-picker
                    v-model="banZuDate"
                    type="daterange"
                    placeholder="选择日期范围">
                  </el-date-picker>
                </div>
              </div></el-col>
              <el-col :span="4"><div><el-button @click="searchBanZu"><i class="el-icon-search"></i>搜索</el-button ></div></el-col>
              <el-col :span="12"><div style="float: right">
                <el-button @click="showChoose5"><i class="el-icon-plus"></i>新增</el-button ><el-button @click="closeChooseOrder"><i class="el-icon-close"></i>关闭</el-button>
              </div></el-col>
            </el-row>
          </div>
          <div class="banci">
            <el-collapse accordion>
              <el-collapse-item v-for="(item, index) in banZu" :key="index" :title="item.theme" :name="index">
                <div>
                  <el-row>
                    <el-col :span="2"><div>时间范围：</div></el-col>
                    <el-col :span="8"><div>{{item.startTime}}~{{item.endTime}}</div></el-col>
                  </el-row>
                </div>
                <el-row>
                  <el-col :span="2"><div>班次：</div></el-col>
                  <el-col v-for="(ban, index) in item.bcDetail" :key="index" :span="4"><div>{{ban}}</div></el-col>
                </el-row>
                <div>
                  <el-col :span="2"><div>使用门店：</div></el-col>
                  <span v-for="(shop, index) in item.shop">{{shop}};</span>
                </div>
              </el-collapse-item>
            </el-collapse>
            <div class="block" style="float: right;margin-top: 10px;">
              <el-pagination
                :current-page.sync="banZuPage"
                :page-size="10"
                layout="total, prev, pager, next"
                :total="banZuTotal">
              </el-pagination>
            </div>
          </div>
          <!--新增班次组-->
          <div class="choose5" v-show="show_choose5">
            <div class="close">
              <el-row>
                <el-col :span="24"><div><i @click="closeChoose5" class="el-icon-circle-close"></i></div></el-col>
              </el-row>
            </div>
            <div class="title">
              <el-row>
                <el-col :span="3"><div>
                  <div class="logo"></div>
                </div></el-col>
                <el-col :span="13"><div>
                  <p>新增班组</p>
                </div></el-col>
                <el-col :span="8"><div>
                </div></el-col>
              </el-row>
            </div>
            <div class="choose5_content">
              <div class="choose_address">
                <el-row>
                  <el-col :span="4"><div>
                    <p>班组名称：</p>
                  </div></el-col>
                  <el-col class="el_input" :span="9"><div>
                    <el-input v-model="banciname" placeholder="请输入班次名称"></el-input>
                  </div></el-col>
                </el-row>
              </div>
              <div class="setting_date">
                <el-row>
                  <el-col :span="4"><div>
                    <p>日期范围：</p>
                  </div></el-col>
                  <el-col :span="20"><div>
                    <div class="block" style="margin-top: 10px;">
                      <el-date-picker
                        v-model="schedulingdate"
                        type="daterange"
                        placeholder="选择日期范围">
                      </el-date-picker>
                    </div>
                  </div></el-col>
                </el-row>
              </div>
              <div class="setting_date">
                <el-row>
                  <el-col :span="4"><div>
                    <p>使用门店：</p>
                  </div></el-col>
                  <el-col :span="20"><div>
                    <v-select style="margin-top: 10px;" v-model="shopList" multiple="multiple" :options="shopName">
                    </v-select>
                  </div></el-col>
                </el-row>
              </div>
              <div class="setting">
                <el-row>
                  <el-col :span="4"><div>
                    <p>班次设置：</p>
                  </div></el-col>
                    <el-col :span="6"><div>
                      <p>班次类型</p>
                      <el-select v-for="item in schedule" :key="item.id" v-model="item.bctype" placeholder="请选择">
                        <el-option
                          v-for="item in ban"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                      <el-button @click="addBci">添加班次</el-button></el-col>
                    <el-col :span="14"><div>
                      <p>时间段</p>
                      <div v-for="item in schedule" :key="item.id">
                        <el-time-select style="width: 150px;"
                                        placeholder="起始时间"
                                        v-model="item.stime"
                                        :picker-options="{
                                        start: '00:00',
                                        step: '00:30',
                                        end: '24:00'
                                      }">
                        </el-time-select>
                        <el-time-select style="width: 150px;"
                                        placeholder="结束时间"
                                        v-model="item.etime"
                                        :picker-options="{
                                        start: '00:00',
                                        step: '00:30',
                                        end: '24:00',
                                        minTime: item.stime
                                      }">
                        </el-time-select>
                      </div>
                    </div></el-col>
                </el-row>
              </div>
            </div>
            <div class="choose5_btn">
              <el-row>
                <el-col :span="4"><div>
                  <p>提交成功后，在范围中的门店设置排班时能够选择使用。</p>
                </div></el-col>
                <el-col :span="20"><div  class="btn_sub">
                  <el-button type="primary" @click="submit">提交</el-button>
                </div></el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane class="address_shop" label="门店位置">
        <el-row>
          <el-col :span="3"><div>
            <p>门店名称：</p>
          </div></el-col>
          <el-col :span="6"><div class="shop_input">
            <!--<select class="selectSelf2" v-model="shopOptions.shopName">-->
              <!--<option v-for="item in allShop">{{item.shopname}}</option>-->
            <!--</select>-->
            <v-select class="selectSelf2" v-model="shopOptions.shopName" :options="shopName">
            </v-select>
          </div></el-col>
          <el-col :span="3"><div>
            <p>门店地址：</p>
          </div></el-col>
          <el-col :span="8"><div class="shop_input">
            <el-input v-model="shopOptions.shopAddress" placeholder="请输入门店地址"></el-input>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="3"><div>
            <p>门店经度：</p>
          </div></el-col>
          <el-col :span="6"><div class="shop_input add_input">
            <el-input v-model="shopOptions.longitude" placeholder="请输入经度"></el-input>
          </div></el-col>
          <el-col :span="3"><div>
            <p>门店纬度：</p>
          </div></el-col>
          <el-col :span="6"><div class="shop_input add_input">
            <el-input v-model="shopOptions.latitude" placeholder="请输入纬度"></el-input>
          </div></el-col>
          <el-col :span="4"><div class="shop_input float_right">
            <el-button @click="submitShop" type="primary">提交</el-button>
          </div></el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <!-- 新增陈列 -->
    <new-display v-show="$store.state.show_newDisplay"></new-display>
    <check-display :display-detail="displayDetail" v-show="$store.state.show_checkDisplay"></check-display>
  </div>
</template>
<script>
  import paging from '../paging/paging.vue';
  import newDisplay from './newDisplay/newDisplay.vue';
  import checkDisplay from './checkDisplay/checkDisplay.vue';
  import $ from 'jquery';
  import router from '../../router';
  import ElInput from '../../../node_modules/element-ui/packages/input/src/input.vue';
  import Vue from 'vue';
  import vSelect from 'vue-select';
  Vue.component('v-select', vSelect);

  export default {
    data() {
      const generateData2 = _ => {
        const data = [];
        const cities = ['一号', '二号', '三号', '四号', '五号', '六号', '七号'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index
          });
        });
        return data;
      };
      return {
        url: this.$store.state.lastUrl,
        show_store_display: true,
        show_attendance: false,
        show_content: true,
        show_choose_order: false,  // 排班时间
        show_order_position: false, // 门店排班查询与操作
        show_order: false,  // 门店排班设置
        show_choose5: false, // 新增班次组
        activeName: 'first',
        input1: '',  // 输入框1内容
        input2: '',    // 输入框2内容
        value6: '',     // 时间选择器内容
        input3: '',   // 113
        date: '',     // 120
        input_banCi: '',
        value3: '',
        checked: false, // 是否全选
        value: '',
        value1: '',
        data2: generateData2(),
        value2: [],
        textarea: '',
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        activeNames: '',
        input: '',
        startTime: '',
        endTime: '',
        //  分割线
        city_list: [], // 城市列表
        city_shop: [], //  城市与门店之间关系
        banciname: '',
        schedulingdate: [],  //  新增班次时间
        shopList: [],  // 新增班次门店列表
        schedule: [
          {
            bctype: '',
            stime: '',
            etime: ''
          }
        ],  // 新增班次组 排班设置
        postschedule: [],  //  新建班次组提交的整个json
        display: [],   //  陈列首页  陈列列表
        displayTotal: 0,  // 陈列总数
        displayPage: 1, //   陈列显示第几页
        displayType: '',  //  搜索时输入的陈列类别
        displayShop: '',  //  搜索时输入的陈列类别
        displayTime: '',  //  搜索陈列时选择的时间段
        displayDetail: {}, // 陈列详情
        shopModels: [],  // 门店列表 门店-id之间的对应关系数组
        orderList: [],  // 班次列表
        attendance: [], //  考勤
        attendencePage: 1,  //  考勤列表第几页
        attendenceTotal: 0,   //  考勤总条数
        attendenceDate: '',  //  搜索时输入的考勤日期
        atendenceShop: '', //  搜索时输入的考勤门店
        excel: [],  //  要导出的内容
        ban: [
          {
            value: '早班'
          },
          {
            value: '午班'
          },
          {
            value: '晚班'
          },
          {
            value: '夜班'
          },
          {
            value: '周末班'
          }
        ], //  新建班次时选择的班次名称
        allShop: [],  // 所有门店name-id
        shopName: [],
        shopOptions: {
          shopId: '',
          shopName: '',
          longitude: '',  // 经度
          latitude: ''
        },  // 门店信息列表
        dateRange: '',
        banZu: [],  //  班组
        banZuDate: '', // 班组搜索时间段
        banZuPage: 1,  // 班组第几页
        banZuTotal: 0,  // 班组数量
        attendenceRangeDate: ''  // 考勤导出时间段
      };
    },
    created() {
      //  获取城市列表
      this.$http.jsonp(this.url + 'spg/admin/attendance/cityshop', {jsonp: 'jsonpCallback'}).then(function (response) {
        // response.data 为服务端返回的数据
        let list = response.data.result.门店列表;
        this.city_shop = list;
        for (let tmp in list) {
          this.city_list.push({label: tmp, value: tmp});
        }
      }).catch(function () {
        // 出错处理
      });
      //  获取首页陈列列表
      this.$http.jsonp(this.url + 'spg/admin/display/qryDisplays?page=' + this.displayPage +
        '&rows=10', {jsonp: 'jsonpCallback'}).then(function (response) {
        // response.data 为服务端返回的数据
        this.display = response.data.result.rows;
        console.log(this.display);
        this.displayTotal = response.data.result.total;
      }).catch(function () {
        // 出错处理
      });
      // 获取排班列表
      this.$http.jsonp(this.url + 'spg/admin/attendance/periodSchedulings?stime=1&etime=1', {jsonp: 'jsonpCallback'}).then(function (response) {
        // response.data 为服务端返回的数据
        let list = response.data.result.spgSchedulings;
        for (let x = 0; x < list.length; x++) {
            let newList = {city: list[x].city, date: list[x].schedulingdate, shop: [{shopid: list[x].shopid}], bci: [{bcitype: list[x].bctype, stime: list[x].stime, etime: list[x].etime}], shopName: [{shopName: list[x].shopname}]};
            this.orderList.push(newList);
            for (let y = 0; y < list.length; y++) {
              if ((this.orderList[x].city === list[y].city) && (this.orderList[x].date === list[y].schedulingdate)) {
                this.orderList[x].shop.push({shopid: list[y].shopid});
                this.orderList[x].shopName.push({shopName: list[y].shopname});
                this.orderList[x].bci.push({bcitype: list[y].bctype, stime: list[y].stime, etime: list[y].etime});
              }
            }
        }
        let newList = [];
        for (let i = 0; i < this.orderList.length; i++) {
          let isRepeated = false;
          for (let x = 0; x < newList.length; x++) {
            if ((this.orderList[i].city === newList[x].city) && (this.orderList[i].date === newList[x].date)) {
              isRepeated = true;
              break;
            }
          }
          if (!isRepeated) {
            newList.push(this.orderList[i]);
          }
        }
        this.orderList = newList;
        let banci = [];
        let shopAall = [];
        for (let i = 0; i < this.orderList.length; i++) {
          for (let x = 0; x < this.orderList[i].bci.length; x++) {
            let isRepeated = false;
            for (let y = 0; y < banci.length; y++) {
              if (this.orderList[i].bci[x].bcitype === banci[y].bcitype) {
                isRepeated = true;
              break;
              }
            }
            if (!isRepeated) {
              banci.push(this.orderList[i].bci[x]);
            }
          }
          this.orderList[i].bci = banci;
          for (let x = 0; x < this.orderList[i].shopName.length; x++) {
            let isRepeated = false;
            for (let y = 0; y < shopAall.length; y++) {
              if (this.orderList[i].shopName[x].shopName === shopAall[y].shopName) {
                isRepeated = true;
              break;
              }
            }
            if (!isRepeated) {
              shopAall.push(this.orderList[i].shopName[x]);
            }
          }
          this.orderList[i].shopName = shopAall;
          shopAall = [];
        }
      }).catch(function () {
        // 出错处理
      });
      //  获取班组列表
      this.$http.jsonp(this.url + 'spg/admin/attendance/groupScheduling?page=' + this.banZuPage + '&rows=10', {jsonp: 'jsonpCallback'}).then(function (response) {
        // response.data 为服务端返回的数据
        let data = response.data.result.rows;
        this.banZuTotal = response.data.result.total;
        for (let i = 0; i < data.length; i++) {
          let shop = data[i].shops.split(',');
          let banci = data[i].bcDetail.split(',');
          data[i].bcDetail = banci.reverse();
          for (let x = 0; x < shop.length; x++) {
            let shopFirst = shop[x].split('>');
            shop[x] = shopFirst[0];
          }
          data[i].shop = shop;
        }
        this.banZu = data;
      }).catch(function () {
        // 出错处理
      });
      // 获取考勤列表
      let now = new Date();
      now.setDate(now.getDate() + 7);
      now.setDate(now.getDate() - 14);
      this.$http.jsonp(this.url + 'spg/admin/attendance/attendanceinfo?page=' + this.attendencePage + '&rows=10', {jsonp: 'jsonpCallback'}).then(function (response) {
        // response.data 为服务端返回的数据
        this.attendance = response.data.result.rows;
        this.attendenceTotal = response.data.result.total;
        for (let i = 0; i < this.attendance.length; i++) {
          this.attendance[i].dkdate = this.getLocalTime(this.attendance[i].dkdate.toString().substring(0, 10));
//          let time = this.attendance[i].dkdate.split(' ');
//          let lastTime = time[1].split(':');
//          let hour;
//          let allTime;
//          if (lastTime[0] > 12) {
//            hour = lastTime[0] - 12;
//            allTime = '下午' + hour + ' ' + lastTime[1] + ' ' + lastTime[2];
//          } else {
//            hour = lastTime[0];
//            allTime = '上午' + hour + ':' + lastTime[1] + ':' + lastTime[2];
//          }
//          this.attendance[i].dkdate = '2017-8-11 10:30:08';
        }
      }).catch(function () {
        // 出错处理
      });
      // 获取所有门店name-id
      this.$http.jsonp(this.url + 'spg/admin/display/getShops', {jsonp: 'jsonpCallback'}).then(function (response) {
        // response.data 为服务端返回的数据
        this.allShop = response.data.result.shopModels;
        this.allShop.sort(function(x, y) {
          return y.shopname.localeCompare(x.shopname);
        });
        for (let i = 0; i < this.allShop.length; i++) {
          this.shopName.push(this.allShop[i].shopname);
        }
      }).catch(function () {
        // 出错处理
      });
    },
    computed: {
    },
    watch: {
      banZuPage: {
        handler: function () {
          this.searchBanZu();
        }
      },
      displayPage: {
          handler: function() {
              if (this.displayName === '' && this.displayShop === '' && this.displayTime === '') {
                //  获取首页陈列列表
                this.$http.jsonp(this.url + 'spg/admin/display/qryDisplays?page=' + this.displayPage +
                  '&rows=10', {jsonp: 'jsonpCallback'}).then(function (response) {
                  // response.data 为服务端返回的数据
                  this.display = response.data.result.rows;
                  this.displayTotal = response.data.result.total;
                }).catch(function () {
                  // 出错处理
                });
              } else {
                  this.searchDisplay();
              }
          }
      },
      attendencePage: {
          handler: function () {
              if (this.attendenceDate === '' && this.atendenceShop === '') {
                // 获取考勤列表
                this.$http.jsonp(this.url + 'spg/admin/attendance/attendanceinfo?page=' + this.attendencePage + '&rows=10', {jsonp: 'jsonpCallback'}).then(function (response) {
                  // response.data 为服务端返回的数据
                  this.attendance = response.data.result.rows;
                  this.attendenceTotal = response.data.result.total;
                  for (let i = 0; i < this.attendance.length; i++) {
                    this.attendance[i].dkdate = this.getLocalTime(this.attendance[i].dkdate.toString().substring(0, 10));
                  }
                }).catch(function () {
                  // 出错处理
                });
              } else {
                  this.searchAttendence();
              }
          }
      },
      shopOptions: {
        handler: function () {
          if (!isNaN(this.shopOptions.longitude)) {
            if ((this.shopOptions.longitude > 180) || (this.shopOptions.longitude < 0)) {
              this.shopOptions.longitude = '';
              this.$message({
                message: '请输入正确的经度！',
                type: 'warning'
              });
            }
          } else {
            this.shopOptions.longitude = '';
            this.$message({
              message: '请输入正确的经度！',
              type: 'warning'
            });
          }
          if (!isNaN(this.shopOptions.latitude)) {
            if ((this.shopOptions.latitude > 90) || (this.shopOptions.latitude < 0)) {
              this.shopOptions.latitude = '';
              this.$message({
                message: '请输入正确的纬度！',
                type: 'warning'
              });
            }
          } else {
            this.shopOptions.latitude = '';
            this.$message({
              message: '请输入正确的纬度！',
              type: 'warning'
            });
          }
        },
        deep: true
      }
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      showChooseOrder() {
        this.show_choose_order = true;
        this.show_content = false;
      },
      closeChooseOrder() {
        this.show_choose_order = false;
        this.show_content = true;
      },
      showOrder() {   // 打开门店排班设置
        this.show_order_position = false;
        this.show_order = true;
      },
      closeOrder() {  //  关闭门店排班设置
        console.log(1);
        this.show_order_position = true;
        this.show_order = false;
      },
      showOrderPosition() {  // 打开门店排班查询与操作
        this.show_order_position = true;
        this.show_store_display = false;
      },
      closeOrderPosition() { // 关闭门店排班查询与操作
        this.show_order_position = false;
        this.show_store_display = true;
      },
      showChoose5() {
        this.show_choose5 = true;
      },
      closeChoose5() {
        this.show_choose5 = false;
        this.postschedule = [];
      },
      test() {
        let formData = this.schedule;
        let formarDate = this.formatDateTime(this.schedulingdate);  //  格式化时间
        for (let i = 0; i < formData.length - 1; i++) {
          formData[i].city = this.city;
          formData[i].schedulingdate = formarDate;
        }
        let params = JSON.stringify(formData);
        this.$http.jsonp(this.url + 'spg/admin/attendance/addSchedulings', params, {jsonp: 'jsonpCallback'}).then(function (response) {
          // response.data 为服务端返回的数据
        }).catch(function (response) {
          // 出错处理
        });
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
      submit() {  // 提交新增班次组
        //  判断输入内容是否为空
        if (this.banciname === '') {
          // 没选城市
          this.$message({
            message: '请填写班次名称！',
            type: 'warning'
          });
        } else if (this.schedulingdate.length === 0) {
          // 没选时间
          this.$message({
            message: '请选择使用日期！',
            type: 'warning'
          });
        } else if (this.shopList.length === 0) {
          // 没选店门
          this.$message({
            message: '请选择使用门店！',
            type: 'warning'
          });
//        } else if (this.schedule.length === 0) {
//          // 没选店门
//          this.$message({
//            message: '请输入排班！',
//            type: 'warning'
//          });
        } else {
          let startTime = this.formatDateTime(this.schedulingdate[0]);
          let endTime = this.formatDateTime(this.schedulingdate[1]);
          let time = startTime + '~' + endTime;
          let shops = [];
          for (let i = 0; i < this.shopList.length; i++) {
            for (let x = 0; x < this.allShop.length; x++) {
              if (this.shopList[i] === this.allShop[x].shopname) {
                let newShop = this.allShop[x].shopname + '>' + this.allShop[x].shopid;
                shops.push(newShop);
              }
            }
          }
          let schduleTime = [];
          for (let i = 0; i < this.schedule.length; i++) {
            let newT = this.schedule[i].bctype + '-' + this.schedule[i].stime + '-' + this.schedule[i].etime;
            schduleTime.push(newT);
          }
          this.postschedule = {theme: this.banciname, daterange: time, shops: shops, bcsinfo: schduleTime};
          let postParams = JSON.stringify(this.postschedule);
          let success = false;
          $.ajax({
            type: 'POST',
            url: this.url + 'spg/admin/attendance/addSchedulings',
            contentType: 'application/json;charset=utf-8', // 设置请求头信息
            dataType: 'json',
            async: false,
            data: postParams,
            success: function(data) {
              success = true;
            }
          });
          if (success) {
            this.$message({
              message: '添加班组成功！',
              type: 'success'
            });
            this.postschedule = [];
            this.show_choose5 = false;
            router.go({path: '/shop'});
          }
        }
      },
      openCheckDisplay(row) {
        console.log(row.id);
      	this.$store.state.show_checkDisplay = true;
        // 查询陈列详情
        this.$http.jsonp(this.url + 'spg/admin/display/getDisplay?id=' + row.id, {jsonp: 'jsonpCallback'}).then((response) => {
          // response.data 为服务端返回的数据
          this.displayDetail = response.data.result.陈列信息;
          this.displayDetail.stars = Number(this.displayDetail.stars);
        }, (response) => {
        });
      },
      openNewDisplay() {
        this.$store.state.show_newDisplay = true;
      },
      searchDisplay() {
        let startTime = '1900-1-1';
        let endTime = '3000-1-1';
        if (this.displayTime.length === 2) {
          startTime = this.formatDateTime(this.displayTime[0]);
          endTime = this.formatDateTime(this.displayTime[1]);
        }
        //  获取首页陈列列表
        this.$http.jsonp(this.url + 'spg/admin/display/qryDisplays?page=' + this.displayPage +
          '&rows=10&filter_EQS_displayType=' + this.displayType + '&filter_LIKES_shopName=' + this.displayShop + '&filter_LES_startTime=' + endTime + '&filter_GES_startTime=' + startTime, {jsonp: 'jsonpCallback'}).then(function (response) {
          // response.data 为服务端返回的数据
          this.display = response.data.result.rows;
          this.displayTotal = response.data.result.total;
        }).catch(function () {
          // 出错处理
        });
      },
      resetSearchDisplay() {
        this.displayTime = '';
        this.displayType = '';
        this.displayShop = '';
        //  获取首页陈列列表
        this.$http.jsonp(this.url + 'spg/admin/display/qryDisplays?page=' + this.displayPage +
          '&rows=10', {jsonp: 'jsonpCallback'}).then(function (response) {
          // response.data 为服务端返回的数据
          this.display = response.data.result.rows;
          this.displayTotal = response.data.result.total;
        }).catch(function () {
          // 出错处理
        });
      },
      test1() {
          console.log(this.displayName, this.displayType);
          console.log(this.formatDateTime(this.displayTime[0]), this.formatDateTime(this.displayTime[1]));
      },
      unique(array) {  // 数组去重
        let r = [];
        for (let i = 0, l = array.length; i < l; i++) {
          for (let j = i + 1; j < l; j++) {
            if (array[i].shopid === array[j].shopid) j = ++i;
          }
          r.push(array[i].shopid);
        }
        return r;
      },
      addBci() {  // 添加班次
          let newBci = {bctype: '', stime: '', etime: ''};
          this.schedule.push(newBci);
      },
      handleDownload() {
        if (this.excel.length === 0) {
          this.$message({
            message: '未选择数据！',
            type: 'warning'
          });
        } else {
          require.ensure([], () => {
            const { export_json_to_excel } = require('../../vendor/Export2Excel');
            const tHeader = ['陈列主题', '发布时间', '门店', '陈列考评'];
            const filterVal = ['displayType', 'startTime', 'shopName', 'stars'];
            const list = this.excel;
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '门店陈列');
          });
        }
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      },
      selectRow(row) {
        this.excel = row;
      },
      selectRowAll(row) {
        this.excel = row;
      },
      searchAttendence() {
        if (this.attendenceDate !== '') {
          this.attendenceDate = Date.parse(this.attendenceDate);
        }
        // 获取考勤列表
        this.$http.jsonp(this.url + 'spg/admin/attendance/attendanceinfo?page=' + this.attendencePage + '&rows=10&filter_EQS_dkdate=' + this.attendenceDate + '&filter_LIKES_shopname=' + this.atendenceShop, {jsonp: 'jsonpCallback'}).then(function (response) {
          // response.data 为服务端返回的数据
          this.attendance = response.data.result.rows;
          this.attendenceTotal = response.data.result.total;
          for (let i = 0; i < this.attendance.length; i++) {
            this.attendance[i].dkdate = this.getLocalTime(this.attendance[i].dkdate.toString().substring(0, 10));
          }
        }).catch(function () {
          // 出错处理
        });
      },
      getLocalTime(nS) {
        return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
      },
      deleteDisplay() {
        let deleteId = [];
        if (this.excel.length > 0) {
          for (let i = 0; i < this.excel.length; i++) {
//            let id = this.excel[i].id;
            let newId = this.excel[i].id;
            deleteId.push(newId);
          }
        }
        let params = JSON.stringify(deleteId);
//        console.log(params);
        $.ajax({
          type: 'POST',
          url: this.url + '/spg/admin/display/delDisplay',
          contentType: 'application/json;charset=utf-8', // 设置请求头信息
          dataType: 'json',
          async: false,
          data: params,
          success: function(data) {
          }
        });
        router.go({path: '/shop'});
      },
      submitShop() {
        for (let i = 0; i < this.allShop.length; i++) {
          if (this.shopOptions.shopName === this.allShop[i].shopname) {
            this.shopOptions.shopId = this.allShop[i].shopid;
          }
        }
        if ((this.shopOptions.latitude !== '') || (this.shopOptions.longitude !== '') || (this.shopOptions.shopAddress !== '') || (this.shopOptions.shopId !== '')) {
          let params = JSON.stringify(this.shopOptions);
          let success = false;
          $.ajax({
            type: 'POST',
            url: this.url + 'spg/admin/attendance/setaddress',
            contentType: 'application/json;charset=utf-8', // 设置请求头信息
            dataType: 'json',
            async: false,
            data: params,
            success: function(data) {
              success = true;
            }
          });
          if (success) {
            this.$message({
              message: '设置门店信息成功！',
              type: 'success'
            });
            this.shopOptions = {
              shopId: '',
              shopName: '',
              shopAddress: '',
              longitude: '',  // 经度
              latitude: ''
            };  // 门店信息列表
          }
        } else {
          this.$message({
            message: '门店信息不完整！',
            type: 'warning'
          });
        }
      },
      searchBanci() {
        if (this.dateRange !== '') {
          let startTime = this.formatDateTime(this.dateRange[0]);
          let endTime = this.formatDateTime(this.dateRange[1]);
          // 获取排班列表
          this.$http.jsonp(this.url + 'spg/admin/attendance/periodSchedulings?stime=' + startTime + '&etime=' + endTime, {jsonp: 'jsonpCallback'}).then(function (response) {
            // response.data 为服务端返回的数据
            let list = response.data.result.spgSchedulings;
            if (list.length === 0) {
              this.orderList = [];
            } else {
              for (let x = 0; x < list.length; x++) {
                let newList = {
                  city: list[x].city,
                  date: list[x].schedulingdate,
                  shop: [{shopid: list[x].shopid}],
                  bci: [{bcitype: list[x].bctype, stime: list[x].stime, etime: list[x].etime}],
                  shopName: [{shopName: list[x].shopname}]
                };
                this.orderList.push(newList);
                for (let y = 0; y < list.length; y++) {
                  if ((this.orderList[x].city === list[y].city) && (this.orderList[x].date === list[y].schedulingdate)) {
                    this.orderList[x].shop.push({shopid: list[y].shopid});
                    this.orderList[x].shopName.push({shopName: list[y].shopname});
                    this.orderList[x].bci.push({bcitype: list[y].bctype, stime: list[y].stime, etime: list[y].etime});
                  }
                }
              }
              let newList = [];
              for (let i = 0; i < this.orderList.length; i++) {
                let isRepeated = false;
                for (let x = 0; x < newList.length; x++) {
                  if ((this.orderList[i].city === newList[x].city) && (this.orderList[i].date === newList[x].date)) {
                    isRepeated = true;
                    break;
                  }
                }
                if (!isRepeated) {
                  newList.push(this.orderList[i]);
                }
              }
              this.orderList = newList;
              let banci = [];
              let shopAall = [];
              for (let i = 0; i < this.orderList.length; i++) {
                for (let x = 0; x < this.orderList[i].bci.length; x++) {
                  let isRepeated = false;
                  for (let y = 0; y < banci.length; y++) {
                    if (this.orderList[i].bci[x].bcitype === banci[y].bcitype) {
                      isRepeated = true;
                      break;
                    }
                  }
                  if (!isRepeated) {
                    banci.push(this.orderList[i].bci[x]);
                  }
                }
                this.orderList[i].bci = banci;
                for (let x = 0; x < this.orderList[i].shopName.length; x++) {
                  let isRepeated = false;
                  for (let y = 0; y < shopAall.length; y++) {
                    if (this.orderList[i].shopName[x].shopName === shopAall[y].shopName) {
                      isRepeated = true;
                      break;
                    }
                  }
                  if (!isRepeated) {
                    shopAall.push(this.orderList[i].shopName[x]);
                  }
                }
                this.orderList[i].shopName = shopAall;
                shopAall = [];
              }
            }
          }).catch(function () {
            // 出错处理
          });
        }
      },
      checking() {
        console.log(1);
      },
      resetChecking() {
        console.log(2);
      },
      searchBanZu() {
        if (this.banZuDate.length === 0) {
          this.$message({
            message: '请先选择时间范围！',
            type: 'warning'
          });
        } else {
          let start = this.formatDateTime(this.banZuDate[0]);
          let end = this.formatDateTime(this.banZuDate[1]);
          //  获取班组列表
          this.$http.jsonp(this.url + 'spg/admin/attendance/groupScheduling?page=' + this.banZuPage + '&rows=10&filter_LES_startTime=' + end + '&filter_GES_endTime=' + start, {jsonp: 'jsonpCallback'}).then(function (response) {
            // response.data 为服务端返回的数据
            let data = response.data.result.rows;
            this.banZuTotal = response.data.result.total;
            for (let i = 0; i < data.length; i++) {
              let shop = data[i].shops.split(',');
              let banci = data[i].bcDetail.split(',');
              data[i].bcDetail = banci.reverse();
              for (let x = 0; x < shop.length; x++) {
                let shopFirst = shop[x].split('>');
                shop[x] = shopFirst[0];
              }
              data[i].shop = shop;
            }
            this.banZu = data;
          }).catch(function () {
            // 出错处理
          });
        }
      },
      pushAttendence() {
        if (this.attendenceRangeDate.length === 0) {
          console.log('000');
        } else {
          let stime = this.formatDateTime(this.attendenceRangeDate[0]);
          let etime = this.formatDateTime(this.attendenceRangeDate[1]);
          console.log(stime, etime);
          // 获取考勤列表
          this.$http.jsonp(this.url + 'spg/admin/attendance/kqinfobydate?sdate=' + stime + '&edate=' + etime, {jsonp: 'jsonpCallback'}).then(function (response) {
            // response.data 为服务端返回的数据
            let attendance = response.data.result.result;
            for (let i = 0; i < attendance.length; i++) {
              attendance[i].dkdate = this.getLocalTime(attendance[i].dkdate.toString().substring(0, 10));
            }
            console.log(attendance);
            require.ensure([], () => {
              const { export_json_to_excel } = require('../../vendor/Export2Excel');
              const tHeader = ['班次', '姓名', '考勤时间', '门店', '考勤类型', '打卡地点', '考勤结果'];
              const filterVal = ['bctype', 'chname', 'dkdate', 'shopname', 'dktype', 'dklocation', 'result'];
              const list = attendance;
              const data = this.formatJson(filterVal, list);
              export_json_to_excel(tHeader, data, stime + '至' + etime + '考勤');
            });
          }).catch(function () {
            // 出错处理
          });
        }
      }
    },
    components: {
      ElInput,
      paging,
      newDisplay,
      checkDisplay
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .address_shop
    height 608px;
  .selectSelf
    width 100px;
    height 35px;
    border 1px solid #C0CCDA;
    border-radius 5px;
  .selectSelf2
    width 220px;
    font-size 16px;
  body
    margin 0;
    padding 0;
  .shop_input
    margin-top 10px;
  .add_input
    width 100px;
  .float_right
    float right;
  .top_p
    margin-top 40px;
    font-size 14px;
  .top_p1
    margin-top 55px;
    font-size 14px;
  .select_p1
    font-size 14px;
  .select_p2
    margin-top -10px;
    font-size 12px;
    color #8492A6;
  .select_p3
    font-size 14px;
  .shop
    margin-top -698px;
    margin-left 180px;
    padding-top 20px;
    width 1020px;
    height 698px;
    overflow auto;
    background #ecf0f1;
    .tabs
      margin-left 30px;
      margin-right 30px;
      .top
        height 100px;
        border-bottom 1px solid #D3DCE6;
        .search_input1
          float left;
          width 400px;
          .el-inp
            display inline-block;
            width 220px;
        .search_input2
          float left;
          width 400px;
          .el-inp
            display inline-block;
            width 220px;
        .choose_date
          float left;
          margin-top 15px;
          width 400px;
        .but
          float right;
          margin-top 15px;
      .main
        .but_select
          float left;
          margin-top 15px;
        .paging
          float right;
          margin-top 15px;
      .top1
        margin-top 5px;
        height 30px;
        border-bottom 1px solid #D3DCE6;
      .two_btn
        margin-top 5px;
        margin-left 340px;
        margin-right 300px;
        .btn1
          margin-right 100px;
      .content
        margin-top 5px;
        border-top 5px solid #D3DCE6;
        .center_p
          text-align center;
        .con_row
          border-bottom 1px solid #D3DCE6;
          .left
            float left;
            .sp
              display inline-block;
            .input3
              display inline-block;
              width 200px;
          .block
            margin-top 5px;
            margin-left 60px;
          .btn
            float right;
            margin-top 5px;
        .con_row2
          margin-top 5px;
          .content_top
            margin-left 0;
            font-size 12px;
      .choose_order
        height 568px;
        overflow-y auto;
        .choose1
          border-bottom 1px solid #D3DCE6;
        .choose2
          margin-top 0;
        .banci
          margin-top 5px;
        .choose3
          .choose3_ul
            li
              height 70px;
              list-style-type none;
              border-bottom 1px solid #D3DCE6;
              p
                font-size 12px;
        .choose5
          position absolute;
          top 65%;
          left 50%;
          margin-top -350px;
          margin-left -300px;
          width 600px;
          height 450px;
          padding 30px;
          background-color white;
          box-shadow 0 0 2px black;
          overflow auto;
          .close
            margin-top -10px;
            margin-right -10px;
            float right;
          .title
            border-bottom 1px solid #D3DCE6;
            .logo
              width 64px;
              height 64px;
              background-image url("../../img/banci.png");
          .choose5_content
            .choose_address
              .el_input
                margin-top 10px;
          .choose5_btn
            margin-top 15px;
            border-top 1px solid #D3DCE6;
            font-size 12px;
            color #99A9BF;
            .btn_sub
              margin-top 10px;
              text-align center;
    .order_position
      margin-left 30px;
      margin-right 30px;
      padding-left 15px;
      padding-right 15px;
      max-height 638px;
      overflow auto;
      background white;
      border 1px solid #D3DCE6;
      box-shadow 0 0 5px black;
      .close
        margin-right -10px;
        float right;
      .position1
        border-bottom 1px solid #D3DCE6;
      .position2
        margin-top 15px;
        .search1
          float left;
          margin-bottom 10px;
          .input1
            display inline-block;
            width 300px;
        .search2
          clear both;
          .input2
            width 300px;
        .search3
          float right ;
          margin-top 45px;
      .position3
        margin-top 10px;
        border-top 1px solid #D3DCE6;
        .position3_top
          margin-top 15px;
          .btn
            float right;
            display inline-block;
        .position3_content
          margin-top -10px;
          height 100%;
          width 100%;
          .pos_ul
            margin-left -39px;
            li
              margin-bottom 5px;
              list-style-type none;
              .pad
                width 868px;
                overflow-y auto;
                .pos_li
                  width 1128px;
                  table
                    margin-top 5px;
                    float left;
                    display inline-block;
                    text-align center;
                    border-collapse: collapse;
                    tr
                      height 40px;
                      border 1px solid #E5E9F2;
                    th
                      width 70px;
                      font-size 12px;
                      background-color #D3DCE6;
                    td
                      font-size 12px;
    .order
      margin-left 30px;
      margin-right 30px;
      padding-left 15px;
      padding-right 15px;
      max-height 638px;
      overflow auto;
      background white;
      border 1px solid #D3DCE6;
      box-shadow 0 0 5px black;
      .close
        margin-right -10px;
        float right;
      .order_top
        border-bottom 1px solid #D3DCE6;
      .order_content
        .setting_banCi
          height 340px;
        .remark
          padding-bottom 14px;
          border-bottom 1px solid #D3DCE6;
        .sub_btn
          margin-top 14px;
          text-align center;
</style>
