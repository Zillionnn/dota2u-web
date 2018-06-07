import Vue from 'vue';
import Router from 'vue-router';

import Player from '@/components/Player';
import Parent from '@/components/Parent';
import MatchDetail from '@/components/MatchDetail';
import Index from '@/components/Index';
import PlayerAllMatchesComponent from '@/components/PlayerAllMatchesComponent';
import RecentMatchesComponent from '@/components/RecentMatchesComponent';
import Child from '@/components/child';
import Signup from '@/components/Signup';
import BindAccountID from '@/components/BindAccountID';
import Signin from '@/components/Signin';

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
          path: 'allMatches',
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
