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
  ],
  linkActiveClass: 'active'
});
