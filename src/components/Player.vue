<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
      <div v-if="playerInfo" class="userinfo">
          <div class="headPic">
              <img  v-bind:src="playerInfo.avatarfull"/>
              <span class="headID">ID:{{playerInfo.account_id}}</span>
          </div>


          <span class="headPersonname">{{playerInfo.personaname}}</span>
          <br/>

          <div class="rank_box">
              <img class="rank" v-bind:src="rankInfo.rank_img" v-if="rankInfo.rank_img"/>
              <img class="rank_stars" v-bind:src="rankInfo.rank_stars_img"  v-if="rankInfo.rank_stars_img"/>
              <span v-if="rankInfo.leaderboard_rank">{{rankInfo.leaderboard_rank}}</span>
          </div>



          <!--同步数据-->
          <button class="synchronous_player_data" v-on:click="synchronousPlayerData">{{synchronousState}}</button>

      </div>




      <h3 v-on:click="linkToRecentMatches">最近比赛</h3>
      <h3 v-on:click="linkToAllMatches">查看战绩</h3>

      <!--router -view -->
      <router-view></router-view>

  </div>
</template>

<script>
import 'whatwg-fetch';
import dotaconstants from   'dotaconstants';
import * as utils from '../utils/utils';
import game_mode from '../assets/game_mode.json';
import PlayerAllMatchesComponent from '../components/PlayerAllMatchesComponent';

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'player',
    components:{PlayerAllMatchesComponent},
  data () {
      return{
          account_id:this.$route.params.account_id,
          recent20matches:[],
          heroes:dotaconstants.hero,
       /*   userInfo:null,*/
          playerForbid:false,
          synchronousState:'同步数据',
       /*   rank_img:null,
          rank_stars_img:null,
          leaderboard_rank:null,*/
          latest_20_win_rate:null,
          allMatches:[]
      }

  },
    computed:mapGetters({
        playerInfo:'getterPlayerInfo',
        rankInfo:'getterRankInfo'
    }),
    created:function () {
        let account_id=this.account_id;
        console.log(account_id);
        //this.getOrUpdatePlayerInfo(account_id);
        this.$store.dispatch('actionGetOrUpdatePlayerInfo',account_id);
       // this.getAllMatches(account_id);
     // this.getRecentMatchesByAccount(account_id);

    },
    mounted:function(){

    },
  methods: {

      /*getOrUpdatePlayerInfo:function(account_id){
          let account=account_id;
          console.log(account);
          //玩家信息更新；
          fetch('/api/player/fetchUserInfoByAccount',{
              method:'POST',
              headers:{
                  "Content-Type":'application/json'
              },
              body:JSON.stringify({account:account})
          }).then((res) => {
              return res.json();
          }).then((data) => {
              let leaderboard_rank=data.leaderboard_rank;
              this.leaderboard_rank=leaderboard_rank;
              if(leaderboard_rank<=10){
                  this.rank_img=`/static/img/rank/rank_icon_7c.png`;
              }
              if(leaderboard_rank>10 && leaderboard_rank<=100){
                  this.rank_img=`/static/img/rank/rank_icon_7b.png`;
              }
              if(leaderboard_rank>100){
                  this.rank_img=`/static/img/rank/rank_icon_7a.png`;
              }
              if(leaderboard_rank==0){
                  let rank=data.rank_tier.substr(0,1);
                  let stars=data.rank_tier.substr(1,1);
                  if(parseInt(stars)>5){

                  }
                  this.rank_img=`/static/img/rank/rank_icon_${rank}.png`;
                  if(stars>=0){
                      this.rank_stars_img=`/static/img/rank/rank_star_${stars}.png`;
                  }

              }
              console.log(this.rank_tier_img);
              console.log(this.rank_stars_img);
          });

          //获取玩家信息；
          fetch('/api/player/getUserInfoByAccount',{
              method:'POST',
              headers:{
                  "Content-Type":'application/json'
              },
              body:JSON.stringify({account:account})
          }).then((res)=>{
              return res.json();
          }).then((data)=>{
              console.log("USER INFO>>\n",data);
              this.userInfo=data;
          });
      },*/

      /**
       * 获取玩家最近20场比赛
       * @param account_id
       */
    getRecentMatchesByAccount: function (account_id) {

        //获取玩家比赛概览
      fetch('/api/player/getRecentMatchesByAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({account: account_id})
      }).then((res) => {
        return res.json();
      }).then((data) => {
          if(data.error){
              this.playerForbid=true;
              return;
          }else{
              this.playerForbid=false;
              console.log(data);
              if(data.result==200){
                  this.getAllMatches(account_id);
              }

          }
      });
    },

      /**
       *同步玩家数据
       */
      synchronousPlayerData:function () {
          let account =this.account_id;

          fetch('/api/player/SynchronousPlayerData',{
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({account: account})
          }).then((res)=>{
              return res.json();
          }).then((data)=>{
              console.log(data);
        this.synchronousState=data.result;
          });
      },

      /**
       * 跳转比赛详情页面component
       * @param match_id
       */
      toMatchDetailPage:function (match_id) {
          this.$router.push({name:'matchdetail',params:{match_id:match_id}});
      },
      linkToRecentMatches(){
          let account_id=this.account_id;
          this.$router.push({ path: `/player/${account_id}` });
      },

      linkToAllMatches:function(){
          let account_id=this.account_id;
        this.$router.push({ path: `/player/${account_id}/allMatches` });
      },

      getAllMatches:function (account_id) {
          console.log("get all matches");
          fetch('/api/player/getAllMatches/'+account_id,{
              method:'GET'
          }).then((res)=>{
              return res.json();
          }).then((data)=>{
              console.log("GET PLAYER ALL MATCHES",data);
              this.allMatches=data;
              let recent20Array=data.slice(0,20);
              console.log(recent20Array);
                  this.recent20matches=[];
                  let num_win=0;
                  for(var i in recent20Array){
                      let match={};
                      match.match_id=recent20Array[i].match_id;
                      match.start_time=utils.formatVTime_startTime(recent20Array[i].start_time);
                   //   console.log(match.start_time);
                      match.duration=utils.s2Min$Second(recent20Array[i].duration);

                      let player=recent20Array[i].player_json;

                              let heroes=this.heroes;
                              //   console.log(heroes);
                              for(var k in heroes){
                                  if(heroes[k].id==player.hero_id){
                                      let hero_name=heroes[k].name.replace("npc_dota_hero_","");
                                      match.hero_img=`/static/img/hero_icon/${hero_name}_hphover.png`;
                                      player.hero_name=hero_name;
                                      player.hero_localized_name=heroes[k].localized_name;
                                      break;
                                  }
                              }
                      match.player = player;
                      match.win = recent20Array[i].radiant_win;
                      match.win = recent20Array[i].radiant_win;

                      if(recent20Array[i].player_position<5){
                          match.win=data[i].radiant_win;
                      }else{
                          match.win=!data[i].radiant_win;
                      }

                      if(match.win==true){
                          num_win++;
                          this.latest_20_win_rate=(num_win*100)/20;
                      }

                              //match.game_mode=game_mode[data[i].game_mode].mode;
                              match.game_mode=game_mode[recent20Array[i].game_mode].zh_localized_name;

                      this.recent20matches.push(match);
                  }

                  console.log(this.recent20matches);

          });
      }

      //methods
  },

/*    methods: {
        ...mapActions([
            'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

            // `mapActions` 也支持载荷：
            'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
        ]),
      test:function () {

      }
    },*/

    watch:{
        '$route':'getRecentMatchesByAccount'
    }
};
</script>

<style scoped>
.hero_icon{
    width: 4em;
    height: 2.1em;
    float: left;
}

.userinfo{
    width: 100%;
    height: 210px;
    margin: 30px 0 0 0 ;
}
    .headPic{
        float:left;
        width: 210px;
        height: 210px;
        text-align: center;
    }
    .headID{

    }
    .headPersonname{
        float:left;
        margin: 0 0 0 2em;
        font-size: 1.5em;
    }

    .one_match{

    }
    .one_match:hover{
        cursor: pointer;
    }
    .synchronous_player_data{
        float: right;
    }

    .rank_box{
        float: left;
        width: 5em;
        height: 6em;
        text-align: center;
        color: #ffffff;
        margin-left: 6em;
    }
    .rank{
        width: 5em;
        height: 5em;
        float: left;
    }
    .rank_stars{
        width: 5em;
        height: 5em;
        float: left;
        margin-top: -5em;
    }
    .to_match_detail{
        text-decoration: none;
    }

    .win_word{
        color: #00e200;
    }
    .lose_word{
        color: #ff0000;
    }

    .latest_20_win_rate{
        font-size: 2em;
        font-weight: bold;
    }
    .recent_matches_table{
      /*  width: 80%;*/
        border: 0;
    }
    .recent_matches_table tr{
        border: 0;
    }
    .recent_matches_table td{
        border: 0;
    }
    .tr_match{
       height: 3em;
        text-align: center;
    }
    .tr_match:hover{
        cursor: pointer;
    }
    .td_hero_img{
        width: 12.5em;
    }
    .td_game_mode{
        font-size: 0.8em;
        color: #aaa4aa
    }
.td_duration{
    font-size: 0.8em;
    color: #aaa4aa
}
    .win_or_lose{
        width: 4em;
    }
    .tr_even{
        background: #224e62;
    }

</style>
