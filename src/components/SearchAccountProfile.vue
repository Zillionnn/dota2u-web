<template>
  <div>
    <input type="text" id="input_account"/>
    <button v-on:click="getRecentMatchesByAccount">search</button>

          <p v-for="matches in playerRecent25Matches">
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
          heroes:dotaconstants.hero
      }

  },
  methods: {
    getRecentMatchesByAccount: function () {
      let account = document.getElementById('input_account').value;
     // console.log(account);

      fetch('/api/player/getRecentMatchesByAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({account: account})
      }).then((res) => {
        return res.json();
      }).then((data) => {

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
</style>
