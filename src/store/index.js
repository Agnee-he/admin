/**
 * Created by Administrator on 2017/4/26 0026.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions/index.js';
import mutations from './mutations/index.js';
import * as getters from './getters/index.js';

Vue.use(Vuex);

//  state
const state = {
  user: [],  //  用户信息
  userShop: '', //  用户所属门店
  showIndex: false, // 是否显示首页
  showLogin: true,  // 是否显示登录界面
  showCourse: false,   // 显示课程详情页
  show_checkDisplay: false,  //  查看陈列页面
  show_newDisplay: false, //  新建陈列界面
  show_grade: false,   //  员工考核详情（弹窗）(有饼图)
  show_addCourse: false,  //  新增课程界面
  show_check: false // 查看参加会议人员
};

//  把上面的融到一起
export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});
