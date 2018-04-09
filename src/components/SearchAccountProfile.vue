<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <input type="text" id="input_account"/>
    <button v-on:click="getRecentMatchesByAccount">search</button>
      <div v-if="userInfo" class="userinfo">

          <div class="headPic">
              <img  v-bind:src="userInfo.avatarfull"/>
              <span class="headID">ID:{{userInfo.account_id}}</span>
          </div>


          <span class="headPersonname">{{userInfo.personaname}}</span>

      </div>

      <p v-if="playerForbid">
          用户未开放数据
      </p>

      <p v-if="!playerForbid" v-for="matches in playerRecent25Matches">
          <img class="hero_icon"  v-bind:src="matches.hero_img"/>           {{matches.match_id}} {{matches.time}}
      </p>

  </div>
</template>

<script>
import 'whatwg-fetch';
import dotaconstants from   'dotaconstants';

export default {
  name: 'search-account-profile',
  data () {
      return{
          playerRecent25Matches:[],
          heroes:dotaconstants.hero,
          userInfo:null,
          playerForbid:false
      }

  },
  methods: {
    getRecentMatchesByAccount: function () {
      let account = document.getElementById('input_account').value;
     // console.log(account);

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
          }
            this.playerRecent25Matches=[];
            for(var i in data){
                let match={};
                match.match_id=data[i].match_id;
            match.time=new Date(parseInt(data[i].start_time+'000')).toLocaleString();
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
      });
    }
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
</style>
