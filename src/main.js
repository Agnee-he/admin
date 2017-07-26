// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import store from './store/index.js';    //  store
import $ from 'jquery';
import VueResource from 'vue-resource';
import VeeValidate, { Validator } from 'vee-validate';
import messages from './assets/js/zh_CN';
// 引入echarts
import echarts from 'echarts';

Vue.prototype.$echarts = echarts;

Validator.updateDictionary({
  zh_CN: {
    messages
  }
});
const config = {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0,   // 输入多少ms后开始验证
  locale: 'zh_CN',
  messages: null, // messages代表自定义校验信息
  strict: true  // strict=true代表没有设置规则的表单不进行校验
};
Vue.use(VeeValidate, config);
Vue.use(ElementUI);
Vue.use(VueResource);

Vue.config.productionTip = false;

Vue.http.options.emulateJSON = true;
Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';
Vue.http.options.xhr = {withCredentials: true};

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     //  这里判断用户是否登录，我例子中是验证本地存储是否有token
//     if (sessionStorage.getItem('login') !== 100) {
//       next({
//         path: '/login',
//         query: { redirect: '/shouye' }
//       });
//     } else {
//       next();
//     }
//   } else {
//     next(); // 确保一定要调用 next()
//   }
// });

// const router = new VueRouter({ ... })

// // 全局导航钩子
// router.beforeEach((to, from, next) => {
//   // 判断该路由是否需要登录权限
//   if (to.meta.requireAuth) {
//     // 通过vuex state获取当前的token是否存在
//     console.log('login');
//     console.log(isEmptyObject(store.state.user));
//     if (!isEmptyObject(store.state.user)) {
//       next();
//     } else {
//       next({
//         path: '/login',
//         query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       });
//     }
//   } else {
//     next();
//   }
// });
//
// function isEmptyObject(obj) {
//   for (let key in obj) {
//     return false;
//   }
//   return true;
// }

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  $,
  template: '<App/>',
  components: { App }
});
