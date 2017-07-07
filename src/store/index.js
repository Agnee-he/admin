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
  showIndex: false, // 是否显示首页
  showLogin: true,  // 是否显示登录界面
  showCourse: false   // 显示课程详情页
};

//  把上面的融到一起
export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});
