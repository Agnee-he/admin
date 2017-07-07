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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  $,
  template: '<App/>',
  components: { App }
});

router.push('/index');
