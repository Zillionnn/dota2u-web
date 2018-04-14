import Vue from 'vue';
import Router from 'vue-router';

import Player from '@/components/Player';
import Parent from '@/components/Parent';
import MatchDetail from '@/components/MatchDetail';

Vue.use(Router);

export default new Router({
    mode: 'history',
  routes: [
    {
      path: '/player/:account_id',
    name: 'player',
    component: Player
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
