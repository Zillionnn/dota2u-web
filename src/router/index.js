import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import SearchAccountProfile from '@/components/SearchAccountProfile';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
    name: 'search-account-profile',
    component: SearchAccountProfile
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
});
