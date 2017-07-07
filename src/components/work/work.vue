<template>
  <div class="work">
    <el-tabs type="border-card" v-show="show_work">
      <el-tab-pane label="工作会议">
        <div class="top_search">
          <el-row>
            <el-col :span="8"><div>
              <div class="input1">
                <span>搜索会议：</span><el-input class="input" v-model="input" placeholder="请输入内容"></el-input>
              </div>
              <div class="input2">
                <div class="block">
                  <span class="demonstration">会议时间：</span>
                  <el-date-picker class="input_date"
                    v-model="value3"
                    type="daterange"
                    placeholder="选择时间范围">
                  </el-date-picker>
                </div>
              </div>
            </div></el-col>
            <el-col :span="8"><div>
              <div class="input3">
                <span>会议状态：</span>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div></el-col>
            <el-col :span="8"><div>
              <div class="btn">
                <el-button><i class="el-icon-search"></i>搜索</el-button><el-button><i class="el-icon-loading"></i>重置</el-button><el-button @click="editMeetting"><i class="el-icon-plus"></i>发布会议</el-button>
              </div>
            </div></el-col>
          </el-row>
        </div>
        <div class="main">
          <el-table
            ref="multipleTable"
            :data="conference"
            border
            tooltip-effect="dark"
            style="width: 100%"
            >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              align="center"
              prop="meetingname"
              label="会议名称">
            </el-table-column>
            <el-table-column
              align="center"
              prop="meetingstate"
              label="会议状态">
            </el-table-column>
            <el-table-column
              align="center"
              sortable
              prop="starttime"
              label="会议开始时间">
            </el-table-column>
            <el-table-column
              align="center"
              sortable
              prop="endtime"
              label="会议结束时间">
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template scope="scope">
                <el-button
                  size="small"
                  @click="openCheck">编辑</el-button>
                <!--<el-button-->
                <!--size="small"-->
                <!--type="danger"-->
                <!--@click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 10px">
            <el-button @click="toggleSelection([conference[0],conference[1],conference[2],conference[3],conference[4],conference[5],conference[6],conference[7],conference[8], conference[9]])">全选</el-button><el-button><i class="el-icon-delete"></i>删除</el-button>
          </div>
          <div class="paging">
            <paging></paging>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="合同审批">
        <contract></contract>
      </el-tab-pane>
    </el-tabs>
    <!--发布/编辑会议-->
    <div class="issue" v-show="show_issue">
      <div class="close" @click="closeEditMeetting">
        <el-row>
          <el-col :span="23"><div>
          </div></el-col>
          <el-col :span="1"><div>
            <i class="el-icon-circle-close"></i>
          </div></el-col>
        </el-row>
      </div>
      <div class="issue_top">
        <el-row>
          <el-col :span="3"><div>
            <div class="logo"></div>
          </div></el-col>
          <el-col :span="13"><div>
            <p>发布/编辑会议</p>
            <p>NO.1213213213123</p>
          </div></el-col>
          <el-col :span="8"><div style="float: right">
            <p class="top_p">更新日期：<span>2017-2-2 14:53</span></p>
          </div></el-col>
        </el-row>
      </div>
      <div class="issue_main" v-show="show_first">
        <div class="name">
          <el-row>
            <el-col :span="3"><div>
              <p>会议名称：</p>
            </div></el-col>
            <el-col :span="21"><div>
              <el-input v-model="publishmeeting.meetingName" placeholder="请输入会议名称"></el-input>
            </div></el-col>
          </el-row>
        </div>
        <div class="date">
          <el-row>
            <el-col :span="3"><div>
              <p>会议日期：</p>
            </div></el-col>
            <el-col :span="21"><div>
              <div class="block" style="float: left">
                <el-date-picker style="display: inline-block;"
                  v-model="publishmeeting.startTime"
                  type="date"
                  placeholder="选择开始时间">
                </el-date-picker>
                <el-date-picker style="display: inline-block;"
                  v-model="publishmeeting.endTime"
                  type="date"
                  placeholder="选择结束时间">
                </el-date-picker>
              </div>
            </div></el-col>
          </el-row>
        </div>
        <div class="person">
          <el-row>
            <el-col :span="3"><div>
              <p>与会人员：</p>
            </div></el-col>
            <el-col :span="21"><div>
              <el-select class="block" v-model="publishmeeting.spgParticipants" multiple filterable placeholder="请选择">
                <el-option-group
                  v-for="group in allPerson"
                  :key="group.depname"
                  :label="group.depname">
                  <el-option
                    v-for="item in group.sysUnits"
                    :key="item.parid"
                    :label="item.uname"
                    :value="item.parid">
                  </el-option>
                </el-option-group>
              </el-select>
            </div></el-col>
          </el-row>
        </div>
        <div class="schedule">
          <el-row>
            <el-col :span="3"><div>
              <p>会议日程：</p>
            </div></el-col>
            <el-col :span="21">
              <div class="set_sch">
                <table border="0" cellspacing="0" cellpadding="0" class="table" >
                  <tr class="tr1"><th style="width: 50px;">步骤</th><th style="width: 120px;">日程名称</th><th style="width: 180px;">开始时间</th><th style="width: 180px;">结束时间</th><th>会议地址</th></tr>
                </table>
                <!-- 添加会议步骤 -->
                <table v-for="(item, index) in publishmeeting.spgPrograms" border="0" cellspacing="0" cellpadding="0" class="table" >
                  <tr class="tr2" ><td style="width: 50px;">{{index + 1}}</td><td style="width: 120px;"><el-input v-model="item.programName" placeholder="日程名称"></el-input></td><td style="width: 180px;">
                    <div class="block">
                      <el-date-picker style="width: 180px;"
                                      v-model="item.startTime"
                                      type="datetime"
                                      placeholder="开始时间">
                      </el-date-picker>
                    </div>
                  </td><td style="width: 180px;">
                    <div class="block">
                      <el-date-picker style="width: 180px;"
                                      v-model="item.endTime"
                                      type="datetime"
                                      placeholder="结束时间">
                      </el-date-picker>
                    </div>
                  </td>
                    <td><el-input v-model="item.programAddress" placeholder="地址"></el-input></td></tr>
                  <tr class="tr2" ><td>备注</td><td colspan="3"><el-input v-model="item.remarks" placeholder="请输入备注"></el-input>
                    </td><td><el-button @click="deleteNewMeetting(index)" :plain="true" type="warning" style="float: right">删除该步骤</el-button></td></tr>
                </table>
                <el-button @click="addStep"><i class="el-icon-plus"></i>添加步骤</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="hotel">
          <el-row>
            <el-col :span="3"><div>
              <p>酒店安排：</p>
            </div></el-col>
            <el-col :span="21"><div>
              <div class="set_sch">
                <table border="0" cellspacing="0" cellpadding="0" class="table" >
                  <tr class="tr1"><th style="width: 200px;">酒店名称</th><th style="width: 200px;">酒店地址</th></tr>
                  <!-- 添加酒店安排 -->
                  <tr class="tr2" v-for="(item, index) in publishmeeting.spgHotels" :key="index"><td><el-input v-model="item.hotelName" placeholder="请输入酒店名称"></el-input></td><td><el-input v-model="item.hotelAddress" placeholder="请输入酒店地址"></el-input></td></tr>
                </table>
                <el-button @click="addHotel"><i class="el-icon-plus"></i>添加酒店</el-button>
              </div>
            </div></el-col>
          </el-row>
        </div>
        <div class="people">
          <el-row>
            <el-col :span="3"><div>
              <p>会务人员：</p>
            </div></el-col>
            <el-col :span="21"><div>
              <div class="set_sch">
                <table border="0" cellspacing="0" cellpadding="0" class="table" >
                  <tr class="tr1"><th style="width: 200px;">负责人</th><th style="width: 200px;">负责人联系方式</th><th style="width: 340px;">备注</th></tr>
                  <!-- 添加负责人 -->
                  <tr class="tr2" v-for="(item, index) in publishmeeting.spgConferenceStaffs"><td><el-input v-model="item.name" placeholder="请输入负责人"></el-input></td><td><el-input v-model="item.phoneNumber" placeholder="请输入负责人手机号"></el-input></td><td><el-input type="text" v-model="item.remarks" placeholder="请输入备注"></el-input></td></tr>
                </table>
                <el-button @click="addPeople"><i class="el-icon-plus"></i>添加负责人</el-button>
              </div>
            </div></el-col>
          </el-row>
        </div>
        <div class="request">
          <el-row>
            <el-col :span="3"><div>
              <p>会议要求：</p>
            </div></el-col>
            <el-col :span="21"><div>
              <el-input class="block"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="publishmeeting.meetingRequest">
              </el-input>
            </div></el-col>
          </el-row>
        </div>
      </div>
      <div class="issue_sub" v-show="show_first">
        <div class="btn">
          <el-row class="el_row">
            <el-col :span="4"><div><el-button class="el_btn" type="primary" @click="test">下一步</el-button></div></el-col>
          </el-row>
        </div>
      </div>
      <div class="second" v-show="show_second">
        <el-row>
          <el-col :span="8">
            <div class="top1"><p>日程名称</p></div>
          </el-col>
          <el-col :span="16">
            <div class="top2">
              <span>人员</span><span>会议安排</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="main" v-for="item in sch" :key="item.id">
          <el-col :span="8">
            <div class="sch">
              <p>{{item.schName}}</p>
            </div>
          </el-col>
          <el-col class="right_el" :span="16" v-for="person in item.person" :key="person.id">
            <div class="people">
              <el-select v-model="person.name" placeholder="选择人员">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="room">
              <el-input class="input" v-model="person.address" placeholder="请输入会议安排"></el-input>
            </div>
          </el-col>
          <el-button @click="addPerson(item.person)" class="btn"><i class="el-icon-plus"></i></el-button>
        </el-row>
        <el-row>
          <el-col :span="24"><div style="margin-top: 15px;text-align: center;padding-top: 15px;border-top: 1px solid #D3DCE6;">
            <el-button @click="sub" style="width: 200px;" type="primary">发布会议</el-button>
          </div></el-col>
        </el-row>
      </div>
    </div>
    <!-- 查看会议 -->
    <div class="edit" v-show="show_edit">
      <el-row>
        <div class="close" @click="closeCheck">
          <el-row>
            <el-col :span="23"><div>
            </div></el-col>
            <el-col :span="1"><div>
              <i class="el-icon-circle-close"></i>
            </div></el-col>
          </el-row>
        </div>
        <div class="title">
          <el-row class="el_row">
            <el-col :span="3"><div class="logo"></div></el-col>
            <el-col :span="13"><div>
              <p class="title_p">会议名字1</p>
              <p class="content_p">NO.3333333333333</p>
            </div></el-col>
            <el-col :span="8"><div>
              <div style="text-align: right">
                <el-button @click="openEditMeetting"><i class="el-icon-edit"></i>编辑</el-button>
              </div>
              <p  class="content_p" style="text-align: right"><span>2017-1-1 12:00</span> 发布</p>
            </div></el-col>
          </el-row>
        </div>
        <div class="part">
          <p>参加范围：</p>
          <span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span><span>xxx大区;</span>
        </div>
        <div class="schedule">
          <div class="top">
            <p>会议日程：</p>
            <p class="right"><span>xxxxxxxxx</span> 至 <span>xxxxxxxxxxxxx</span></p>
          </div>
          <div class="main">
            <table border="0" cellspacing="1" cellpadding="0" class="table" >
              <tr class="tr1"><th style="width: 50px;">步骤</th><th style="width: 120px;">日程名称</th><th style="width: 180px;">开始时间</th><th style="width: 180px;">结束时间</th><th>地址</th></tr>
            </table>
            <table v-for="(item, index) in meetting_get" border="0" cellspacing="1" cellpadding="0" class="table" >
              <tr class="tr2" >
                <td style="width: 50px;background-color: #EFF2F7;">{{index+1}}</td>
                <td style="width: 120px;">{{item.name}}</td>
                <td style="width: 180px;">{{item.stime}}</td>
                <td style="width: 180px;">{{item.etime}}</td>
                <td  colspan="2" style="overflow: hidden">{{item.address}}</td>
              </tr>
              <tr class="tr2" >
                <td style="width: 50px;background-color: #EFF2F7;overflow: hidden">备注</td>
                <td colspan="4">{{item.remark}}</td>
                <td style="background-color: #EFF2F7;">查看与会人员安排</td></tr>
            </table>
          </div>
        </div>
        <div class="detail">
          <p>会议须知：</p>
          <div>天气模块</div>
          <div class="people">
            <el-row>
              <el-col :span="3"><div class="left">
                <p>与会人员</p>
                <p>联系方式</p>
              </div></el-col>
              <el-col :span="21"><div class="right">
                <ul>
                  <li>
                    <p>xxxx</p>
                    <p>12345678901</p>
                  </li>
                  <li>
                    <p>xxxx</p>
                    <p>12345678901</p>
                  </li>
                </ul>
              </div></el-col>
            </el-row>
          </div>
        </div>
        <div class="request">
          <p>会议要求：</p>
        </div>
        <div class="stay">
          <p>住宿安排：</p>
        </div>
      </el-row>
    </div>
    <!-- 编辑人员日程/酒店安排 -->
    <staffing class="staf" v-show=""></staffing>
    <!-- 查看人员日程/酒店安排 -->
    <check-person class="check" v-show=""></check-person>
  </div>
</template>

<script>
  import paging from '../paging/paging.vue';
  import staffing from './staffing/staffing.vue';
  import checkPerson from './check_person/check_person.vue';
  import ElRow from 'element-ui/packages/row/src/row';
  import Contract from './contract/contract.vue';

    export default {

      data() {
        return {
          show_work: true, //  首页
          show_issue: false,  //  发布编辑会议
          show_edit: false, // 编辑会议界面
          show_staffing: false, // 添加参加会议人员
          show_check: false, // 查看参加会议人员
          show_first: true, //  编辑发布会议第一步
          show_second: false,  //  编辑发布会议第二步
          state: '0', // 进页面状态    state = 1 =>从工作首页进入发布会议页面    state = 2 => 从编辑会议页面进入发布会议界面
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
          value7: [],
          person: [], // 安排酒店的人员
          people: [],  // 会务人员
          value5: [],
          phone: '',
          meetting: [
            {
              stime: '',
              etime: '',
              name: '',
              address: '',
              phone: '',
              person: '',
              remark: ''
            }
          ],  // 发布编辑会议-数据
          meetting_second: [],  // 编辑已有会议数据
          meetting_get: [
            {
              stime: '2017-06-22 09:41:22',
              etime: '2017-06-22 09:41:22',
              name: 'ccccc',
              address: 'sssssssssssss',
              phone: '123123123123',
              person: 'xxx',
              remark: 'ddd'
            },
            {
              stime: '2017-06-22 09:41:22',
              etime: '2017-06-22 09:41:22',
              name: 'ccccc',
              address: 'sssssssssssss',
              phone: '123123123123',
              person: 'xxx',
              remark: 'ddd'
            },
            {
              stime: '2017-06-22 09:41:22',
              etime: '2017-06-22 09:41:22',
              name: 'ccccc',
              address: 'sssssssssssss',
              phone: '123123123123',
              person: 'xxx',
              remark: 'ddd'
            },
            {
              stime: '2017-06-22 09:41:22',
              etime: '2017-06-22 09:41:22',
              name: 'ccccc',
              address: 'sssssssssssss',
              phone: '123123123123',
              person: 'xxx',
              remark: 'ddd'
            }
          ],  // 会议详情
          textarea: '',
          meeting: {  //  编辑会议  整个数据
              name: '1111',
              date: '',
              person: [],
              schedule: [
                {
                  stime: '',
                  etime: '',
                  name: '',
                  address: '',
                  remark: ''
                }
              ],
              hotel: [
                {
                  name: '',
                  address: ''
                }
              ],
              people: [
                {
                  name: '',
                  phone: '',
                  remark: ''
                }
              ]
            },
          input: '',
          value3: '',
          sch: [
            {
              schName: '我是日程1',
              person: [
                {
                  name: '',
                  address: ''
                }
              ]
            },
            {
              schName: '我是日程2啊',
              person: [
                {
                  name: '建军节',
                  address: '102'
                },
                {
                  name: '散打',
                  address: '102'
                },
                {
                  name: '罚点啥',
                  address: '102'
                }
              ]
            },
            {
              schName: '我是日程3咯',
              person: [
                {
                  name: '',
                  address: ''
                }
              ]
            }
          ],   // 日程第二步数据结构
          // 分割线
          conference: [
            {
              meetingid: '1',
              meetingname: '集团1季度总结大会',
              meetingstate: '已结束',
              starttime: '2017-06-26 10:00',
              endtime: '2017-06-28 10:00'
            }
          ], // 工作首页会议列表
          allPerson: [], //  全部人员
          //  发布-编辑会议的json
          publishmeeting: {
            meetingName: '贝投科技年度表彰大会',
            startTime: '',
            endTime: '',
            meetingRequest: '各位小伙伴自备行李箱，钞票太多拿不了',
            spgParticipants: [],
            spgPrograms: [
            {
              programName: '晚餐',
              startTime: '',
              endTime: '',
              programAddress: '蜡笔小新大酒店',
              remarks: '请带好身份证'
            },
            {
              programName: '会议',
              startTime: '',
              endTime: '',
              programAddress: '万银国际会议中心',
              remarks: '请带好入场牌'
            },
            {
              programName: '总结会议',
              startTime: '',
              endTime: '',
              programAddress: '柯南研究室',
              remarks: '请做好笔记'
            },
            {
              programName: '离场',
              startTime: '',
              endTime: '',
              programAddress: '珂卡夫总部大楼前',
              remarks: '请带好行李,准备离场'
            }
          ],
            spgHotels: [
            {
              hotelName: '如家',
              hotelAddress: '民心路12号'
            },
            {
              hotelName: '7天',
              hotelAddress: '江锦路20号'
            }
          ],
            spgConferenceStaffs: [
            {
              name: '玉米汁',
              phoneNumber: '1234567890',
              remarks: '晚餐、总结会议'
            },
            {
              name: '候雨晨',
              phoneNumber: '1234567890',
              remarks: '会议'
            },
            {
              name: '何立峰',
              phoneNumber: '1234567890',
              remarks: '离场'
            },
            {
              name: '陈诚',
              phoneNumber: '1234567890',
              remarks: '如家、7天'
            }
          ]
          }
        };
      },

      created() {
        //  获取会议全部人员
        this.$http.jsonp('http://192.168.199.145:8080/spg/admin/working/queryEmployees', {jsonp: 'jsonpCallback'}).then(function (response) {
          // response.data 为服务端返回的数据
          console.log(response.data.result.participants);
          this.allPerson = response.data.result.participants;
          console.log(1);
        }).catch(function (response) {
          // 出错处理
          console.log(response);
        });
      },

      watch: {
        // 只要 meeting.person 改变，这个函数就会执行
        meeting: {
          handler: function() {
            console.log(this.meeting.person);
            //  选人数据传递
            let personLength = this.meeting.person.length;
            let length = this.person.length;
            this.person.splice(0, length);
            for (let i = 0; i < personLength; i++) {
              let newPerson = {label: this.meeting.person[i]};
              this.person.push(newPerson);
            }
            //   手机号验证
            let people = this.meeting.people;
            let number = people.length;
            for (let i = 0; i < number; i++) {
              let phone = people[i].phone;
              let length = phone.length;
              if (length > 10) {
                let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                if (myreg.test(phone)) {
                  alert(11);
                } else {
                  alert('请输入正确的手机号');
                }
              }
            }
          },
          deep: true
        }
      },

//      mounted() {
//        let personLength = this.value7.length;
//        for (let i = 0; i < personLength; i++) {
//          let newPerson = {label: this.value7[i]};
//          this.person.push(newPerson);
//        }
//      },

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
        test() {
          console.log(this.publishmeeting);
        },
        addStep() { // 添加日程 按钮
          console.log(this.publishmeeting.spgPrograms);
          let newStep = {startTime: '', endTime: '', programName: '', programAddress: '', remarks: ''};
          this.publishmeeting.spgPrograms.push(newStep);
        },
        editMeetting() {  // 进入发布_编辑会议
          this.show_issue = true;
          this.show_work = false;
          this.state = 1;
        },
        closeEditMeetting() { // 关闭发布_编辑会议
          if (this.show_first === false) {
            this.show_first = true;
            this.show_second = false;
          }
          if (this.state === 1) {
            this.show_issue = false;
            this.show_work = true;
          } else {
            this.show_issue = false;
            this.show_edit = true;
            let length = this.meetting_second.length;
            this.meetting_second.splice(0, length);
          }
          this.state = 0;
        },
        openCheck() {  // 进入会议详情
          this.show_work = false;
          this.show_edit = true;
        },
        closeCheck() {  // 退出会议详情
          this.show_work = true;
          this.show_edit = false;
        },
        openEditMeetting() {  // 会议详情 进入 编辑会议
          this.meetting_second = this.meetting_get;
          this.show_edit = false;
          this.show_issue = true;
          this.state = 2;
        },
//        deleteOldMeetting(index) {
//          this.meetting_second.splice(index, 1);
//        },
        deleteNewMeetting(index) {
          this.publishmeeting.spgPrograms.splice(index, 1);
        },
        next() { //  编辑会议页面  下一步按钮
          if (!this.check(this.publishmeeting.meetingName)) {
            //  没填会议名称
            console.log('name');
          } else if (!this.check(this.publishmeeting.startTime)) {
            //  没填会议开始时间
            console.log('startTime');
          } else if (!this.check(this.publishmeeting.endTime)) {
            //  没填会议结束时间
          } else if (this.publishmeeting.spgParticipants.length === 0) {
            //  没选择人员
            console.log('person');
          } else if (!this.checkSchedule(this.publishmeeting.spgPrograms)) {  //  this.checkSchedule 返回true = 填好了  flase = 没填好
            //  判断是否填好日程
            console.log('schedule');
          } else if (!this.checkHotel(this.publishmeeting.spgHotels)) {
            //  判断时候填好酒店
            console.log('hotel');
          } else if (!this.checkPeople(this.publishmeeting.spgConferenceStaffs)) {
            //  判断会务人员是否填好
            console.log('people');
          } else if (!this.check(this.publishmeeting.meetingRequest)) {
            //  没填会议要求
            console.log('meetingRequest');
          } else {
            this.show_first = false;
            this.show_second = true;
          }
        },
        sub() {   // 编辑会议页面  发布会议按钮
          if (this.state === 1) {  //  判断回到哪个页面   1是从工作首页进入   2是从编辑会议页面进入
            this.show_issue = false;
            this.show_work = true;
            this.show_first = true;
            this.show_second = false;
          } else {
            this.show_issue = false;
            this.show_edit = true;
            this.show_first = true;
            this.show_second = false;
            let length = this.meetting_second.length;
            this.meetting_second.splice(0, length);
          }
          this.state = 0;
        },
        addHotel() {
          let newHotel = {hotelName: '', hotelAddress: ''};
          this.publishmeeting.spgHotels.push(newHotel);
        },
        addPeople() {
          let newPeople = {name: '', phoneNumber: '', remarks: ''};
          this.publishmeeting.spgConferenceStaffs.push(newPeople);
        },
        addPerson(person) {  // 发布编辑会议第二步人员安排添加按钮
          let newPerson = {name: '', address: ''};
          person.push(newPerson);
        },
        check(value) {  // 监控value是否为空   可用于name date
          if (value === '') {
            return false;
          } else {
            return true;
          }
        },
        checkSchedule(value) {
          let sch = value;
          let num = 0;
          for (let i = 0; i < sch.length; i++) {
            if (sch[i].stime !== '' && sch[i].etime !== '' && sch[i].name !== '' && sch[i].address !== '') {
              num = num + 1;
            }
          }
          if (num === sch.length) {
            return true;
          } else {
            return false;
          }
        },
        checkHotel(value) {  //  判断酒店是否为空
          let hotel = value;
          let num = 0;
          for (let i = 0; i < hotel.length; i++) {
            if (hotel[i].name !== '' && hotel[i].address !== '') {
              num = num + 1;
            }
          }
          if (num === hotel.length) {
            return true;
          } else {
            return false;
          }
        },
        checkPeople(value) {
          let people = value;
          let num = 0;
          for (let i = 0; i < people.length; i++) {
            if (people[i].name !== '' && people[i].phone.length > 10 && people[i].remark !== '') {
              num = num + 1;
            }
          }
          if (num === people.length) {
            console.log('true');
            return true;
          } else {
            console.log('false');
            return false;
          }
        }
//        checkPerson(value) {  //  监控发布会议下一步 是否选择人员
//          if (this.value === 0) {
//            return false;
//          } else {
//            return true;
//          }
//        }
      },

      components: {
        ElRow,
        paging,
        staffing,
        checkPerson,
        Contract
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .right_el
    margin-top -28px;
    margin-bottom 30px;
    margin-left 300px;
  .top_p
    margin-top 52px;
  .title_p
    font-size 18px;
    margin-top 0;
  .content_p
    margin-top 5px;
    font-size 14px;
  .work
    position relative;
    margin-top -898px;
    margin-left 180px;
    padding-top 30px;
    width 1020px;
    height 868px;
    background #ecf0f1;
    .el-tabs
      margin-left 30px;
      margin-right 30px;
      .top_search
        .input1
          float left;
          .input
            display inline-block;
            width 200px;
        .input2
          float left;
          margin-top 10px;
          .input_date
            display inline-block;
            margin-left -4px;
            width 200px;
        .btn
          float right;
          margin-top 46px;
      .main
        margin-top 15px;
        border-top 1px solid #D3DCE6;
        .paging
          float right;
          margin-top -30px;
    .issue
      margin-left 30px;
      margin-right 30px;
      padding 30px;
      height 768px;
      background-color white;
      box-shadow 0 0 2px black;
      overflow auto;
      .close
        float right;
        width 22px;
        height 22px;
        margin-top -25px;
      .issue_top
        border-bottom 1px solid #D3DCE6;
        .logo
          width 50px;
          height 80px;
          background-color red;
      .issue_main
        margin-top 15px;
        .name
          .el-input
            margin-top 10px;
            width 220px;
        .date
          .block
            margin-top 10px;
            width 600px;
        .person
          .block
            margin-top 10px;
            width 768px;
        .schedule
          margin-top 10px;
          .set_sch
            .table
              width 100%;
              text-align center;
              border 1px solid #E5E9F2;
              border-collapse collapse;
              font-size 15px;
              font-family "PingFang SC";
              .tr1
                width 100%;
                font-weight 100;
                font-family "PingFang SC";
                background-color #E5E9F2;
                height 40px;
              .tr2
                width 100%;
                height 40px;
                border 1px solid #D3DCE6;
        .hotel
          margin-top 10px;
          .set_sch
            .table
              margin-top 10px;
              width 100%;
              text-align center;
              border 1px solid #E5E9F2;
              border-collapse collapse;
              font-size 15px;
              font-family "PingFang SC";
              .tr1
                width 100%;
                font-weight 100;
                font-family "PingFang SC";
                background-color #E5E9F2;
                height 40px;
              .tr2
                width 100%;
                height 40px;
                border 1px solid #D3DCE6;
                .select
                  width 340px;
        .people
          margin-top 10px;
          .set_sch
            .table
              margin-top 10px;
              width 100%;
              text-align center;
              border 1px solid #E5E9F2;
              border-collapse collapse;
              font-size 15px;
              font-family "PingFang SC";
              .tr1
                width 100%;
                font-weight 100;
                font-family "PingFang SC";
                background-color #E5E9F2;
                height 40px;
              .tr2
                width 100%;
                height 40px;
                border 1px solid #D3DCE6;
        .request
          margin-top 10px;
          .block
            margin-top 10px;
      .issue_sub
        margin-top 50px;
        .btn
          .el_row
            margin-left 340px;
            width 200px;
            .el_btn
              width 200px;
      .second
        margin-top 30px;
        .top1
          text-align center;
          margin-bottom 15px;
          p
            margin 0;
            margin-left 50px;
            text-align center;
            height 30px;
            font-size 18px;
            line-height 30px;
            background-color #E5E9F2;
        .top2
          margin-bottom 15px;
          span
            display inline-block;
            text-align center;
            width 222px;
            height 30px;
            font-size 18px;
            line-height 30px;
            background-color #E5E9F2;
        .main
          .sch
            text-align left;
            margin-left 60px;
            font-size 20px;
            p
              margin 0;
          .people
            display inline-block;
            .select
              margin-top 0;
              width 220px;
          .room
            display inline-block;
            .input
              margin-top 0;
              width 220px;
        .btn
          float left;
          margin-top -28px;
          margin-bottom 5px;
          margin-left 300px;
    .edit
      margin-left 30px;
      margin-right 30px;
      padding 30px;
      height 768px;
      overflow auto;
      background-color white;
      box-shadow 0 0 2px black;
      .close
        float right;
        width 22px;
        height 22px;
        margin-top -25px;
      .title
        margin-top 10px;
        padding-bottom  10px;
        border-bottom 1px solid #D3DCE6;
        .el_row
          height 70px;
          .logo
            height 70px;
            width 50px;
            background-color #1c8de0;
      .part
        border-bottom 1px solid #D3DCE6;
        padding-bottom 10px;
      .schedule
        border-bottom 1px solid #D3DCE6;
        padding-bottom 10px;
        .top
          p
            display inline-block;
          .right
            float right;
        .main
          .table
            width 100%;
            text-align center;
            border 1px solid #E5E9F2;
            border-collapse collapse;
            font-size 15px;
            font-family "PingFang SC";
            .tr1
              width 100%;
              font-weight 100;
              font-family "PingFang SC";
              background-color #E5E9F2;
              height 40px;
            .tr2
              width 100%;
              height 40px;
              border 1px solid #D3DCE6;
              &:hover
                background-color #E5E9F2;
      .detail
        border-bottom 1px solid #D3DCE6;
        padding-bottom 10px;
        .people
          margin-top 10px;
          height 100%;
          .left
            width 110px;
            height 80px;
            text-align center;
            p
              height 40px;
              line-height 40px;
              font-weight 500;
              margin 0;
              background-color #E5E9F2;
              border 1px solid #D3DCE6;
          .right
            float left;
            height 82px;
            padding 0;
            ul
              height 82px;
              margin 0;
              padding 0;
              li
                width 120px;
                list-style-type none;
                float left;
                text-align center;
                p
                  height 40px;
                  line-height 40px;
                  font-weight 500;
                  margin 0;
                  font-size 14px;
                  border 1px solid #D3DCE6;
      .request
        border-bottom 1px solid #D3DCE6;
        padding-bottom 10px;
    .staf
      margin-left 30px;
      margin-right 30px;
      padding 30px;
      height 768px;
      overflow-y scroll;
      background-color white;
      box-shadow 0 0 2px black;
    .check
      margin-left 30px;
      margin-right 30px;
      padding 30px;
      height 768px;
      overflow-y scroll;
      background-color white;
      box-shadow 0 0 2px black;
</style>
