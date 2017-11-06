/**
 * Created by Administrator on 2017/6/26 0026.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions/index.js';
import * as getters from './getters/index.js';

Vue.use(Vuex);

//  state
const state = {
  // localUrl: 'http://192.168.199.145:8080/',  // 本地环境http://192.168.199.145:8080/
  lastUrl: 'http://61.130.182.170:8085/',  // 生产环境ip 61.130.182.170:8085
  url: 'http://120.55.85.65:8088/',  // 测试环境接口ip
  login: sessionStorage.getItem('login'), // 判断是否登录
  user: sessionStorage.getItem('user'),  //  用户信息
  userShop: sessionStorage.getItem('shopname'), //  用户所属门店
  showCourse: false,   // 显示课程详情页
  show_checkDisplay: false,  //  查看陈列页面
  show_newDisplay: false, //  新建陈列界面
  show_grade: false,   //  员工考核详情（弹窗）(有饼图)
  show_addCourse: false,  //  新增课程界面
  show_check: false, // 查看参加会议人员
  num_newCrouse: 0  //  新增课程监听
};

const mutations = {
};

//  把上面的融到一起
export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});
