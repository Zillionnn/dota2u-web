import Vue from 'vue';
import Router from 'vue-router';

import Player from '@/components/views/player/Player';
import Parent from '@/components/views/Parent';
import MatchDetail from '@/components/views/player/matchDetail/MatchDetail';
import Index from '@/components/Index';
import PlayerAllMatchesComponent from '@/components/views/player/allMatch/playerAllMatchesComponent.vue';
import RecentMatchesComponent from '@/components/views/player/recentMatch/RecentMatchesComponent';
import Child from '@/components/child';
import Signup from '@/components/views/Signup';
import BindAccountID from '@/components/BindAccountID';
import Signin from '@/components/views/Signin';

Vue.use(Router);

export default new Router({
  /* mode: 'history', */
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/player/:account_id',
      name: 'Player',
      component: Player,
      children: [
        {
          path: '',
          component: RecentMatchesComponent
        },
        {
          // 当 /player/:account_id/allMatches 匹配成功，
          // PlayerAllMatchesComponent 会被渲染在 User 的 <router-view> 中
          path: '/allMatches',
          name: 'allMatches',
          component: PlayerAllMatchesComponent
        }
      ]
    },
    {
      path: '/parent_component',
      name: 'Parent',
      component: Parent
      /*      children:[
            {
                path:'',
                component:Child
            }
        ] */
    },
    {
      path: '/matchdetail/:match_id',
      name: 'matchdetail',
      component: MatchDetail
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/bindaccount',
      name: 'bindaccount',
      component: BindAccountID
    }
  ]
});
