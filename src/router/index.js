import Vue from 'vue';
import Router from 'vue-router';
import Shop from '../components/shop/shop.vue';
import Work from '../components/work/work.vue';
import Index from '../components/index/index.vue';
import Train from '../components/train/train.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/shop',
      component: Shop
    },
    {
      path: '/work',
      component: Work
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/train',
      component: Train
    }
  ],
  linkActiveClass: 'active'
});
