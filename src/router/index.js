import Vue from 'vue';
import Router from 'vue-router';
import Shop from '../components/shop/shop.vue';
import Work from '../components/work/work.vue';
import Index from '../components/index/index.vue';
import Train from '../components/train/train.vue';
import Login from '../components/login/login.vue';
import Shouye from '../components/shouye/shouye.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      name: 'shouye',
      path: '/shouye',
      redirect: '/index',
      component: Shouye,
      meta: { requireAuth: true },
      // meta: {auth: true},
      children: [   //  子路由
        {
          name: 'shop',
          path: '/shop',
          // meta: {auth: true},
          meta: { requireAuth: true },
          component: Shop
        },
        {
          name: 'work',
          path: '/work',
          // meta: {auth: true},
          meta: { requireAuth: true },
          component: Work
        },
        {
          name: 'index',
          path: '/index',
          // meta: {auth: true},
          meta: { requireAuth: true },
          component: Index
        },
        {
          name: 'train',
          path: '/train',
          // meta: {auth: true},
          meta: { requireAuth: true },
          component: Train
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      meta: { requireAuth: false },
      component: Login
    },
    {
      path: '/',
      redirect: '/login'
    }  // 这样进/ 就会跳转到/index
  ],
  linkActiveClass: 'active'
});

// 全局导航钩子
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  console.log('login1');
  if (to.meta.requireAuth) {
    // 通过vuex state获取当前的token是否存在
    console.log('login2');
    console.log(sessionStorage.getItem('login'));
    if (sessionStorage.getItem('login') === '100') {
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});

export default router;
