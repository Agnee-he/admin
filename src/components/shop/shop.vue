<template>
  <div class="shop">
    <el-tabs type="border-card" class="tabs" v-show="show_store_display">
      <el-tab-pane label="门店陈列">
        <div class="top">
          <div class="search_input1">
            <span>搜索主题：</span>
            <div class="el-inp">
              <el-input v-model="input1" placeholder="请输入陈列编号/主题"></el-input>
            </div>
          </div>
          <div class="search_input2">
            <span>搜索门店：</span>
            <div class="el-inp">
              <el-input v-model="input1" placeholder="请输入陈列编号/主题"></el-input>
            </div>
          </div>
          <div class="choose_date">
            <div class="block">
              <span class="demonstration">发布日期：</span>
              <el-date-picker
                v-model="value6"
                type="daterange"
                placeholder="选择日期范围">
              </el-date-picker>
            </div>
          </div>
          <div class="but">
            <el-button><i class="el-icon-search"></i>搜索</el-button><el-button><i class="el-icon-edit"></i>重置</el-button><el-button @click="addDisplay"><i class="el-icon-plus"></i>新增陈列</el-button>
          </div>
        </div>
        <div class="main">
          <el-table
            ref="multipleTable"
            :data="display"
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
              prop="id"
              label="编号"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="displayType"
              label="陈列主题"
              width="150"
              align="center">
            </el-table-column>
            <el-table-column
              prop="startTime"
              label="发布日期"
              sortable
              width="160"
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
              label="陈列考评"
              sortable
              width="120"
              align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template scope="scope">
                <el-button
                  size="small"
                  @click="openCheckDisplay(scope.row)">查看</el-button>
                <!--<el-button-->
                  <!--size="small"-->
                  <!--type="danger"-->
                  <!--@click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
              </template>
            </el-table-column>
          </el-table>
          <div class="but_select">
            <el-button @click="toggleSelection(tableData3)">全选</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
            <el-button><i class="el-icon-delete"></i>删除</el-button>
            <el-button><i class="el-icon-upload2"></i>导出</el-button>
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
        <div class="top1">
          <el-row>
            <div style="float: left"><i class="el-icon-date"></i> 班次名称（默认）：</div>
            <el-col :span="4"><div class="grid-content bg-purple-light">早班(9:00~11:00)</div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">午班(9:00~11:00)</div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple-light">晚班(9:00~11:00)</div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">周末班(9:00~11:00)</div></el-col>
            <div style="float: right" @click="showChooseOrder"><i class="el-icon-setting"></i></div>
          </el-row>
        </div>
        <div class="two_btn" v-show="show_content">
          <el-button class="btn1" type="primary"><i class="el-icon-edit"></i>考勤</el-button><el-button class="btn2" type="primary" @click="showOrderPosition"><i class="el-icon-date"></i>排班</el-button>
        </div>
        <div class="content" v-show="show_content">
          <p class="center_p">考勤核对</p>
          <el-row class="con_row">
            <el-col :span="8"><div class="grid-content bg-purple">
              <div class="left">
                <p class="sp">搜索地区：</p><el-input class="input3" v-model="input3" placeholder="请输入地区"></el-input>
              </div>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">
              <div class="block">
                <el-date-picker
                  v-model="date"
                  format
                  type="date"
                  placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">
              <el-button class="btn"><i class="el-icon-upload2"></i>导出</el-button>
            </div></el-col>
          </el-row>
          <el-row class="con_row2">
            <el-col :span="12"><div class="grid-content bg-purple">
              <div class="content_top">
                <span>考勤</span><el-button style="float: right" type="text">查看更多>></el-button>
                <el-table
                  :data="attendance"
                  style="width: 100%">
                  <el-table-column
                    prop="order"
                    label="班次"
                    align="center"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="考勤时间"
                    align="center"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    label="考勤类型"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    align="center"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    prop="late"
                    label="是否迟到"
                    align="center">
                  </el-table-column>
                </el-table>
              </div>
            </div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">
              <div class="content_top1">
                <span>排班</span><el-button style="float: right" type="text" @click="showOrderPosition">查看更多>></el-button>
                <el-table
                  :data="order"
                  style="width: 100%">
                  <el-table-column
                    prop="order"
                    label="班次"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="员工"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="num"
                    label="员工编号"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="position"
                    label="员工职位"
                    align="center">
                  </el-table-column>
                </el-table>
              </div>
            </div></el-col>
          </el-row>
        </div>
        <!-- 排班时间 -->
        <div class="choose_order" v-show="show_choose_order">
          <div class="choose1">
            <p>选择默认班次</p>
          </div>
          <div class="choose2">
            <el-row>
              <el-col :span="3"><div>
                <p>搜索班次组：</p>
              </div></el-col>
              <el-col :span="5"><div>
                <el-input style="float: left; margin-top: 10px;" v-model="input_banCi" placeholder="请输入班次名称"></el-input>
              </div></el-col>
              <el-col :span="4"><div>
                <p></p>
              </div></el-col>
              <el-col :span="2"><div><p></p></div></el-col>
              <el-col :span="2"><div><p></p></div></el-col>
              <el-col :span="8"><div style="margin-top: 10px;">
                <el-button><i class="el-icon-search"></i>搜索</el-button><el-button @click="showChoose5"><i class="el-icon-plus"></i>新增</el-button ><el-button @click="closeChooseOrder"><i class="el-icon-close"></i>关闭</el-button>
              </div></el-col>
            </el-row>
          </div>
          <div class="choose3">
            <el-collapse v-model="activeNames">
              <el-collapse-item title="班次 NO.2222" name="1">
                <el-row style="height: 60px;">
                  <el-col :span="4"><div class="grid-content bg-purple-light">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                </el-row>
                <div>
                  <p>使用门店：<span>xxx门店、xxx门店</span></p><el-button>删除</el-button><el-button type="primary">使用</el-button>
                </div>
              </el-collapse-item>
              <el-collapse-item title="班次 NO.2222" name="2">
                <el-row style="height: 60px;">
                  <el-col :span="4"><div class="grid-content bg-purple-light">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                </el-row>
                <div>
                  <p>使用门店：<span>xxx门店、xxx门店</span></p><el-button>删除</el-button><el-button type="primary">使用</el-button>
                </div>
              </el-collapse-item>
              <el-collapse-item title="班次 NO.2222" name="3">
                <el-row style="height: 60px;">
                  <el-col :span="4"><div class="grid-content bg-purple-light">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                </el-row>
                <div>
                  <p>使用门店：<span>xxx门店、xxx门店</span></p><el-button>删除</el-button><el-button type="primary">使用</el-button>
                </div>
              </el-collapse-item>
              <el-collapse-item title="班次 NO.2222" name="4">
                <el-row style="height: 60px;">
                  <el-col :span="4"><div class="grid-content bg-purple-light">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                </el-row>
                <div>
                  <p>使用门店：<span>xxx门店、xxx门店</span></p><el-button>删除</el-button><el-button type="primary">使用</el-button>
                </div>
              </el-collapse-item>
              <el-collapse-item title="班次 NO.2222" name="5">
                <el-row style="height: 60px;">
                  <el-col :span="4"><div class="grid-content bg-purple-light">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">
                    <p>早班(9:00~11:00)</p>
                  </div></el-col>
                </el-row>
                <div>
                  <p>使用门店：<span>xxx门店、xxx门店</span></p><el-button>删除</el-button><el-button type="primary">使用</el-button>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div class="choose4">

          </div>
          <!--新增班次组-->
          <div class="choose5" v-show="show_choose5">
            <div class="title">
              <el-row>
                <el-col :span="3"><div>
                  <div class="logo"></div>
                </div></el-col>
                <el-col :span="13"><div>
                  <p>新增班次组</p>
                  <p>NO.3123123123123</p>
                </div></el-col>
                <el-col :span="8"><div>
                  <P class="top_p1">创建时间：<span>2017-02-24 15:00</span></P>
                </div></el-col>
              </el-row>
            </div>
            <div class="choose5_content">
              <div class="choose_address">
                <el-row>
                  <el-col :span="4"><div>
                    <p>使用范围：</p>
                  </div></el-col>
                  <el-col class="el_input" :span="20"><div>
                    <el-select v-model="city" placeholder="点击选择地区">
                      <el-option
                        v-for="item in city_list" :key="item.id"
                        :value="item">
                      </el-option>
                    </el-select>
                  </div></el-col>
                </el-row>
              </div>
              <div class="setting_date">
                <el-row>
                  <el-col :span="4"><div>
                    <p>日期设置：</p>
                  </div></el-col>
                  <el-col :span="20"><div>
                    <div class="block" style="margin-top: 10px;width: 217px;">
                      <el-date-picker style="width: 217px;"
                        v-model="schedulingdate"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions0">
                      </el-date-picker>
                    </div>
                  </div></el-col>
                </el-row>
              </div>
              <div class="setting">
                <el-row>
                  <el-col :span="4"><div>
                    <p>班次设置：</p>
                  </div></el-col>
                    <el-col :span="6"><div>
                      <p>班次名称</p>
                      <el-input v-for="item in schedule" :key="item.id" v-model="item.bctype" placeholder="班次名称"></el-input>
                    </div></el-col>
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
                  <el-button type="primary" @click="test">提交</el-button>
                </div></el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 门店排班查询与操作 -->
    <div class="order_position" v-show="show_order_position">
      <div class="close">
        <el-row>
          <el-col :span="23"><div></div></el-col>
          <el-col :span="1"><div>
            <i @click="closeOrderPosition" class="el-icon-circle-close"></i>
          </div></el-col>
        </el-row>
      </div>
      <div @click="closeOrderPosition" class="position1">
        <p>门店排班查询与操作</p>
      </div>
      <div class="position2">
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple">
            <div class="search1">
              <span>搜索地区： </span><el-input class="input1" v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div class="search2">
              <div class="block">
                <span class="demonstration">起止日期：</span>
                <el-date-picker class="input2"
                  v-model="value3"
                  type="daterange"
                  placeholder="选择时间范围">
                </el-date-picker>
              </div>
            </div>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">
            <div class="search3">
              <el-button @click=""><i class="el-icon-search"></i>搜索</el-button><el-button><i class="el-icon-loading
"></i>重置</el-button><el-button @click="showOrder"><i class="el-icon-edit"></i>去排班</el-button>
            </div>
          </div></el-col>
        </el-row>
      </div>
      <div class="position3">
        <div class="position3_top">
          <el-row>
            <el-col :span="12"><div>
              <el-checkbox v-model="checked">全选</el-checkbox>
            </div></el-col>
            <el-col :span="12"><div>
              <div class="btn">
                <el-button><i class="el-icon-close"></i>删除</el-button><el-button><i class="el-icon-upload2"></i>导出</el-button>
              </div>
            </div></el-col>
          </el-row>
        </div>
        <div class="position3_content">
              <ul class="pos_ul">
                <el-row>
                  <el-col :span="24"><div>
                    <li>
                        <el-checkbox v-model="checked">2017-2-2 周六</el-checkbox>
                        <div class="pad">
                          <div class="pos_li">
                            <table border="0" cellspacing="0" cellpadding="0">
                              <tr><th>班次</th></tr>
                              <tr><td>早班</td></tr>
                              <tr><td>10：00~11：00</td></tr>
                            </table>
                            <table border="0" cellspacing="0" cellpadding="0">
                              <tr><th>员工姓名</th><th>员工工号</th><th>员工职位</th></tr>
                              <tr><td>员工一</td><td>12345689789</td><td>店长</td></tr>
                              <tr><td>员工一</td><td>111111</td><td>店长</td></tr>
                              <tr><td>员工一</td><td>111111</td><td>店长</td></tr>
                              <tr><td>员工一</td><td>111111</td><td>店长</td></tr>
                            </table>
                            <table border="0" cellspacing="0" cellpadding="0">
                              <tr><th>班次</th></tr>
                              <tr><td>早班</td></tr>
                              <tr><td>10：00~11：00</td></tr>
                            </table>
                            <table border="0" cellspacing="0" cellpadding="0">
                              <tr><th>员工姓名</th><th>员工工号</th><th>员工职位</th></tr>
                              <tr><td>员工一</td><td>12345689789</td><td>店长</td></tr>
                              <tr><td>员工一</td><td>111111</td><td>店长</td></tr>
                              <tr><td>员工一</td><td>111111</td><td>店长</td></tr>
                              <tr><td>员工一</td><td>111111</td><td>店长</td></tr>
                            </table>
                            <table border="0" cellspacing="0" cellpadding="0">
                              <tr><th>班次</th></tr>
                              <tr><td>早班</td></tr>
                              <tr><td>10：00~11：00</td></tr>
                            </table>
                            <table border="0" cellspacing="0" cellpadding="0">
                              <tr><th>员工姓名</th><th>员工工号</th><th>员工职位</th></tr>
                              <tr><td>员工一</td><td>12345689789</td><td>店长</td></tr>
                              <tr><td>员工一</td><td>111111</td><td>店长</td></tr>
                              <tr><td>员工一</td><td>111111</td><td>店长</td></tr>
                              <tr><td>员工一</td><td>111111</td><td>店长</td></tr>
                            </table>
                            <table border="0" cellspacing="0" cellpadding="0">
                              <tr><th>排班备注</th></tr>
                              <tr><td>2222222222222222222</td></tr>
                            </table>
                          </div>
                        </div>
                      </li>
                  </div></el-col>
                </el-row>
              </ul>
        </div>
      </div>
    </div >
    <!--门店排班设置-->
    <div class="order" v-show="show_order">
      <div class="close">
        <el-row>
          <el-col :span="24"><div><i @click="closeOrder" class="el-icon-circle-close"></i></div></el-col>
        </el-row>
      </div>
      <div class="order_top">
        <el-row style="height: 80px;margin-top: 15px;">
          <el-col :span="2"><div class="grid-content bg-purple">
            <div style="height: 80px;background-color: darkblue;">图标</div>
          </div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">
            <p style="margin-left: 10px;margin-top: 20px;">门店排班设置</p>
          </div></el-col>
          <el-col :span="2"><div class="grid-content bg-purple"><p></p></div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light"><p></p></div></el-col>
          <el-col :span="2"><div class="grid-content bg-purple"><p></p></div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light">
            <p style="margin-top: 50px;font-size: 14px;">设置时间：<span>2017-11-11 11:11</span></p>
          </div></el-col>
        </el-row>
      </div>
      <div class="order_content">
        <div class="select_add">
          <el-row>
            <el-col :span="4"><div>
              <p class="select_p1">请选择门店/地区：</p>
              <p class="select_p2">选择需要排班的门店</p>
            </div></el-col>
            <el-col :span="20"><div>
              <el-select v-model="value" placeholder="点击选择地区" style="margin-top: 16px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div></el-col>
          </el-row>
        </div>
        <div class="select_banCi">
          <el-row>
            <el-col :span="4"><div>
              <p class="select_p1">选择班次组：</p>
              <p class="select_p2">选择排班的班次组</p>
            </div></el-col>
            <el-col :span="6"><div>
              <el-select v-model="value" placeholder="点击选择班次" style="margin-top: 16px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div></el-col>
            <el-col :span="5"><div>
              <p class="select_p3">早班（9：00~11：00）</p>
              <p class="select_p3">早班（9：00~11：00）</p>
            </div></el-col>
            <el-col :span="5"><div>
              <p class="select_p3">早班（9：00~11：00）</p>
              <p class="select_p3">早班（9：00~11：00）</p>
            </div></el-col>
            <el-col :span="2"><div></div></el-col>
            <el-col :span="2"><div></div></el-col>
          </el-row>
        </div>
        <div class="select_date">
          <el-row>
            <el-col :span="4"><div>
              <p class="select_p1">设置排班日期：</p>
              <p class="select_p2">仅能为未来的日起设置排班，如果以设置排班，将会被新排班覆盖。</p>
            </div></el-col>
            <el-col :span="20"><div>
              <div class="block" style="margin-top: 16px;">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions0">
                </el-date-picker>
              </div>
            </div></el-col>
          </el-row>
        </div>
        <div class="setting_banCi">
          <el-row>
            <el-col :span="4"><div>
              <p class="select_p1">设置排班：</p>
              <p class="select_p2">选择需要排班的门店</p>
            </div></el-col>
            <el-col :span="20"><div style="overflow-y: auto">
                <el-transfer style="transform: scale(0.85);margin-left: -55px;"
                             :titles="['人员', '早班']"
                             :footer-format="{ noChecked: '共 ${total} 人', hasChecked: '已选 ${checked}/${total} 人' }"
                             v-model="value2"
                             :data="data2">
                </el-transfer>
                <el-transfer style="transform: scale(0.85);margin-left: -55px;"
                             :titles="['人员', '早班']"
                             :footer-format="{ noChecked: '共 ${total} 人', hasChecked: '已选 ${checked}/${total} 人' }"
                             v-model="value2"
                             :data="data2">
                </el-transfer>
                <el-transfer style="transform: scale(0.85);margin-left: -55px;"
                             :titles="['人员', '早班']"
                             :footer-format="{ noChecked: '共 ${total} 人', hasChecked: '已选 ${checked}/${total} 人' }"
                             v-model="value2"
                             :data="data2">
                </el-transfer>
            </div></el-col>
          </el-row>
        </div>
        <div class="remark">
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">
              <p class="select_p1">备注：</p>
            </div></el-col>
            <el-col :span="20"><div>
              <el-input style="margin-top: 15px;"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="textarea">
              </el-input>
            </div></el-col>
          </el-row>
        </div>
        <div class="sub_btn">
          <el-row>
            <el-col :span="24"><div>
              <el-button type="primary" size="large" @click="closeOrder">确认排班</el-button>
            </div></el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 新增陈列 -->
    <new-display v-show="show_newDisplay"></new-display>
    <check-display v-show="show_checkDisplay"></check-display>
  </div>
</template>
<script>
  import paging from '../paging/paging.vue';
  import newDisplay from './newDisplay/newDisplay.vue';
  import checkDisplay from './checkDisplay/checkDisplay.vue';

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
        show_store_display: true,
        show_attendance: false,
        show_content: true,
        show_choose_order: false,  // 排班时间
        show_order_position: false, // 门店排班查询与操作
        show_order: false,  // 门店排班设置
        show_choose5: false, // 新增班次组
        show_newDisplay: false, //  新增陈列页面
        show_checkDisplay: false,  //  查看陈列页面
        activeName: 'first',
        input1: '',  // 输入框1内容
        input2: '',    // 输入框2内容
        value6: '',     // 时间选择器内容
        input3: '',   // 113
        date: '',     // 120
        tableData3: [
          {
            number: '2222',
            title: '陈列标准',
            date: '2016-05-03',
            name: '广州一店',
            evaluation: '5星',
            picture: '共五张，点击查看'
          },
          {
            number: '2222',
            title: '陈列标准',
            date: '2016-05-04',
            name: '广州一店',
            evaluation: '1星',
            picture: '共五张，点击查看'
          },
          {
            number: '2222',
            title: '陈列标准',
            date: '2016-05-06',
            name: '广州一店',
            evaluation: '3星',
            picture: '共五张，点击查看'
          },
          {
            number: '2222',
            title: '陈列标准',
            date: '2016-05-01',
            name: '广州一店',
            evaluation: '4星',
            picture: '共五张，点击查看'
          },
          {
            number: '2222',
            title: '陈列标准',
            date: '2016-05-03',
            name: '广州一店',
            evaluation: '5星',
            picture: '共五张，点击查看'
          },
          {
            number: '2222',
            title: '陈列标准',
            date: '2016-05-03',
            name: '广州一店',
            evaluation: '5星',
            picture: '共五张，点击查看'
          },
          {
            number: '2222',
            title: '陈列标准',
            date: '2016-05-03',
            name: '广州一店',
            evaluation: '5星',
            picture: '共五张，点击查看'
          },
          {
            number: '2222',
            title: '陈列标准',
            date: '2016-05-03',
            name: '广州一店',
            evaluation: '5星',
            picture: '共五张，点击查看'
          }
        ],
        attendance: [
          {
            order: '早班',
            date: '2017-1-1',
            type: '打卡',
            name: '晓明',
            late: '迟到'
          },
          {
            order: '早班',
            date: '2017-1-1',
            type: '打卡',
            name: '晓明',
            late: '迟到'
          },
          {
            order: '早班',
            date: '2017-1-1',
            type: '打卡',
            name: '晓明',
            late: '迟到'
          },
          {
            order: '早班',
            date: '2017-1-1',
            type: '打卡',
            name: '晓明',
            late: '迟到'
          }
        ],  //  考勤
        order: [
          {
            order: '早班',
            name: '1',
            num: '1',
            position: '1'
          }
        ], //  排班
        input_banCi: '',
        value3: '',
        checked: false, // 是否全选
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
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
        city_list: [],
        city: '',
        schedulingdate: '',
        schedulingdate1: '',
        schedule: [
          {
            city: '',
            schedulingdate: '',
            bctype: '',
            stime: '',
            etime: ''
          },
          {
            city: '',
            schedulingdate: '',
            bctype: '',
            stime: '',
            etime: ''
          },
          {
            city: '',
            schedulingdate: '',
            bctype: '',
            stime: '',
            etime: ''
          },
          {
            city: '',
            schedulingdate: '',
            bctype: '',
            stime: '',
            etime: ''
          },
          {
            city: '',
            schedulingdate: '',
            bctype: '',
            stime: '',
            etime: ''
          }
        ],  // 新增班次组 排班设置
        display: [],   //  陈列首页  陈列列表
        displayTotal: 0,  // 陈列总数
        displayPage: 1 //   陈列显示第几页
      };
    },
    created() {
      //  获取城市列表
      this.$http.jsonp('http://120.55.85.65:8088/spg/admin/attendance/cityinfo', {jsonp: 'jsonpCallback'}).then(function (response) {
        // response.data 为服务端返回的数据
        this.city_list = response.data.result.城市列表;
      }).catch(function () {
        // 出错处理
      });
      //  获取首页陈列列表
      this.$http.jsonp('http://120.55.85.65:8088/spg/admin/display/qryDisplays?page=' + this.displayPage +
        '&rows=10', {jsonp: 'jsonpCallback'}).then(function (response) {
        // response.data 为服务端返回的数据
        this.display = response.data.result.rows;
        this.displayTotal = response.data.result.total;
        console.log(this.display);
      }).catch(function () {
        // 出错处理
        console.log('获取陈列列表失败');
      });
    },
    computed: {
    },
    methods: {
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
      },
      test() {
        let formData = this.schedule;
        let formarDate = this.formatDateTime(this.schedulingdate);  //  格式化时间
        for (let i = 0; i < formData.length - 1; i++) {
          formData[i].city = this.city;
          formData[i].schedulingdate = formarDate;
        }
        let params = JSON.stringify(formData);
        this.$http.jsonp('http://l120.55.85.65:8088/spg/admin/attendance/addSchedulings', params, {jsonp: 'jsonpCallback'}).then(function (response) {
          // response.data 为服务端返回的数据
          console.log(1);
        }).catch(function (response) {
          // 出错处理
          console.log(response);
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
//        let formData = JSON.stringify(this.schedule); // 这里才是你的表单数据
        let formData = this.schedule;
        let formarDate = this.formatDateTime(this.schedulingdate);  //  格式化时间
        for (let i = 0; i < formData.length - 1; i++) {
          formData[i].city = this.city;
          formData[i].schedulingdate = formarDate;
        }
        let params = JSON.stringify(formData);
        this.$http.jsonp('http://192.168.199.145:8080/spg/admin/attendance/addSchedulings', {jsonp: 'jsonpCallback', dataType: 'jsonp', data: params}, {headers: {contentType: 'application/x-www-form-urlencoded'}}).then((response) => {
          // success callback
          console.log(1);
        }, (response) => {
          // error callback
          console.log(params);
          console.log(response);
        });
      },
      addDisplay() {
        this.show_store_display = false;
        this.show_newDisplay = true;
      },
      openCheckDisplay(row) {
      	this.show_store_display = false;
      	this.show_checkDisplay = true;
      }
  },
    components: {
      paging,
      newDisplay,
      checkDisplay
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  body
    margin 0;
    padding 0;
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
    margin-top -898px;
    margin-left 180px;
    padding-top 30px;
    width 1020px;
    height 868px;
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
        margin-top 10px;
        height 40px;
        border-bottom 1px solid #D3DCE6;
      .two_btn
        margin-top 10px;
        margin-left 340px;
        margin-right 300px;
        .btn1
          margin-right 100px;
      .content
        margin-top 10px;
        border-top 10px solid #D3DCE6;
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
            margin-top 10px;
            margin-left 60px;
          .btn
            float right;
            margin-top 10px;
        .con_row2
          margin-top 10px;
          .content_top1
            margin-left 20px;
      .choose_order
        height 708px;
        .choose1
          border-bottom 1px solid #D3DCE6;
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
          top 50%;
          left 50%;
          margin-top -350px;
          margin-left -400px;
          width 600px;
          height 500px;
          padding 30px;
          background-color white;
          box-shadow 0 0 2px black;
          .title
            border-bottom 1px solid #D3DCE6;
            .logo
              width 60px;
              height 70px;
              background-color red;
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
      max-height 838px;
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
      max-height 838px;
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
