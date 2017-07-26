import Vue from 'vue';
import Router from 'vue-router';
import Shop from '../components/shop/shop.vue';
import Work from '../components/work/work.vue';
import Index from '../components/index/index.vue';
import Train from '../components/train/train.vue';
import Login from '../components/login/login.vue';
import Shouye from '../components/shouye/shouye.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: 'shouye',
      path: '/shouye',
      redirect: '/index',
      component: Shouye,
      children: [   //  子路由
        {
          name: 'shop',
          path: '/shop',
          component: Shop
        },
        {
          name: 'work',
          path: '/work',
          component: Work
        },
        {
          name: 'index',
          path: '/index',
          component: Index
        },
        {
          name: 'train',
          path: '/train',
          component: Train
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/login'
    }  // 这样进/ 就会跳转到/index
  ],
  linkActiveClass: 'active'
});
