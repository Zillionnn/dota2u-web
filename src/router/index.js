import Vue from 'vue';
import Router from 'vue-router';

import SearchAccountProfile from '@/components/SearchAccountProfile';
import Parent from '@/components/Parent';
import MatchDetail from '@/components/MatchDetail';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
    name: 'search-account-profile',
    component: SearchAccountProfile
    },
    {
      path: '/parent_component',
      name: 'Parent',
      component: Parent
    },
      {
          path:'/matchdetail/:match_id',
          name:'matchdetail',
          component:MatchDetail
      }
  ]
});
