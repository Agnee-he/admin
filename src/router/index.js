import Vue from 'vue';
import Router from 'vue-router';
import Shop from '../components/shop/shop.vue';
import DisPlay from '../components/shop/display.vue';
import Address from '../components/shop/address.vue';
import Attendence from '../components/shop/attendence.vue';
import Work from '../components/work/work.vue';
import Index from '../components/index/index.vue';
import Train from '../components/train/train.vue';
import Login from '../components/login/login.vue';
import Shouye from '../components/shouye/shouye.vue';
import Course from '../components/train/magement/course/course.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      name: 'shouye',
      path: '/shouye',
      redirect: '/index',
      component: Shouye,
      meta: { requireAuth: true },
      children: [   //  子路由
        {
          name: 'shop',
          path: '/shop',
          meta: { requireAuth: false },
          component: Shop
        },
        {
          name: 'display',
          path: '/display',
          meta: { requireAuth: false },
          component: DisPlay
        },
        {
          name: 'attendence',
          path: '/attendence',
          meta: { requireAuth: false },
          component: Attendence
        },
        {
          name: 'address',
          path: '/address',
          meta: { requireAuth: false },
          component: Address
        },
        {
          name: 'work',
          path: '/work',
          meta: { requireAuth: false },
          component: Work
        },
        {
          name: 'index',
          path: '/index',
          meta: { requireAuth: false },
          component: Index
        },
        {
          name: 'train',
          path: '/train',
          meta: { requireAuth: false },
          component: Train,
          children: [
            {
              name: 'course',
              path: '/course',
              meta: { requireAuth: false },
              component: Course
            }
          ]
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
  if (to.meta.requireAuth) {
    // 通过vuex state获取当前的token是否存在
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
