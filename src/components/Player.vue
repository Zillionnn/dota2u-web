<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>


      <div v-if="userInfo" class="userinfo">
          <div class="headPic">
              <img  v-bind:src="userInfo.avatarfull"/>
              <span class="headID">ID:{{userInfo.account_id}}</span>
          </div>


          <span class="headPersonname">{{userInfo.personaname}}</span>
          <br/>

          <div class="rank_box">
              <img class="rank" v-bind:src="rank_img" v-if="rank_img"/>
              <img class="rank_stars" v-bind:src="rank_stars_img"  v-if="rank_stars"/>
              <span v-if="leaderboard_rank">{{leaderboard_rank}}</span>
          </div>



          <!--同步数据-->
          <button class="synchronous_player_data" v-on:click="synchronousPlayerData">{{synchronousState}}</button>

      </div>

      <p v-if="playerForbid">
          用户未开放数据
      </p>

      <p v-if="!playerForbid" v-for="matches in playerRecent25Matches" class="one_match">
          <router-link v-bind:to="{name:'matchdetail', params:{match_id:matches.match_id}}">
              <img class="hero_icon"  v-bind:src="matches.hero_img"/>           {{matches.match_id}} {{matches.time}}
          </router-link>

      </p>

  </div>
</template>

<script>
import 'whatwg-fetch';
import dotaconstants from   'dotaconstants';
import * as utils from '../utils/utils';

export default {
  name: 'player',
  data () {
      return{
          account_id:this.$route.params.account_id,
          playerRecent25Matches:[],
          heroes:dotaconstants.hero,
          userInfo:null,
          playerForbid:false,
          synchronousState:'同步数据',
          rank_img:null,
          rank_stars_img:null,
          leaderboard_rank:null
      }

  },
    created:function () {
        let account_id=this.account_id;
        console.log(account_id);
      this.getRecentMatchesByAccount(account_id);
    },
  methods: {
      /**
       * 获取玩家最近20场比赛
       * @param account_id
       */
    getRecentMatchesByAccount: function (account_id) {
   /*   let account = document.getElementById('input_account').value;
      console.log(account);
        */
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
              this.rank_stars_img=`/static/img/rank/rank_star_${stars}.png`;
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

        //获取玩家比赛概览
      fetch('/api/player/getRecentMatchesByAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({account: account})
      }).then((res) => {
        return res.json();
      }).then((data) => {
          if(data.error){
              this.playerForbid=true;
              return;
          }else{
              this.playerForbid=false;
              this.playerRecent25Matches=[];
              for(var i in data){
                  let match={};
                  match.match_id=data[i].match_id;
                  match.time=utils.formatVTime(data[i].start_time);
                  let players=data[i].players;
                  for(var j in players){
                      if(players[j].account_id==account){
                          let heroes=this.heroes;
                          //   console.log(heroes);
                          for(var k in heroes){
                              if(heroes[k].id==players[j].hero_id){
                                  let hero_name=heroes[k].name.replace("npc_dota_hero_","");
                                  match.hero_img=`/static/img/hero_icon/${hero_name}_hphover.png`;
                                  break;
                              }
                          }
                          match.player=players[j];
                          break;
                      }
                  }
                  this.playerRecent25Matches.push(match);
              }

              // console.log(this.playerRecent25Matches);
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
        this.synchronousState=data.info;
          });
      }
  },
    watch:{
        '$route':'getRecentMatchesByAccount'
    }
};
</script>

<style scoped>
.hero_icon{
    width: 4em;
    height: 2.1em;
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
</style>
