<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div>
        <h2>Match Details</h2>
        <p>
            <span class="match_head">比赛id：  {{matchDetail.match_id}}</span>
            <span class="match_head">比赛模式：{{matchDetail.game_mode}}</span>
            <span class="match_head">开始时间：{{matchDetail.start_time}}</span>
            <span class="match_head">时长：{{matchDetail.duration}} 分</span>

        </p>

        <h2>天辉<span class="word_win" v-if="matchDetail.radiant_win">WIN</span></h2>

        <table class="match_detail_table">
            <tr>
                <td class="td_player_name"><h3>PLAYER</h3></td>
                <td></td>
                <td><h3>K/D/A</h3></td>
                <td><h3>H/D</h3></td>
            </tr>
            <tr v-for="(player,index) in matchDetail.players" v-if="index<5">
                <td style="display: none">{{player.account_id}}</td>

                <td class="td_player_name" v-if="player.player_name">{{player.player_name}}</td>
                <td class="td_player_name"  v-if="!player.player_name">匿名玩家</td>

                <td>
                    <img v-if="player.player_head_icon" v-bind:src="player.player_head_icon"/>
                    <img v-if="!player.player_head_icon" src="/static/img/null_head_icon.png"/>
                </td>



                <td>{{player.kills}}/{{player.deaths}}/{{player.assists}}</td>

                <td>{{player.last_hits}}/{{player.denies}}</td>
            </tr>
        </table>



        <h2>夜魇<span v-if="!matchDetail.radiant_win">WIN</span></h2>

        <table class="match_detail_table">
            <tr>
                <td class="td_player_name"><h3>PLAYER</h3></td>
                <td></td>
                <td><h3>K/D/A</h3></td>
                <td><h3>H/D</h3></td>
            </tr>
            <tr v-for="(player,index) in matchDetail.players" v-if="index>=5">
                <td style="display: none">{{player.account_id}}</td>

                <td class="td_player_name" v-if="player.player_name">{{player.player_name}}</td>
                <td class="td_player_name" v-if="!player.player_name">匿名玩家</td>

                <td>
                    <img v-if="player.player_head_icon" v-bind:src="player.player_head_icon"/>
                    <img v-if="!player.player_head_icon" src="/static/img/null_head_icon.png"/>
                </td>


                <td>{{player.kills}}/{{player.deaths}}/{{player.assists}}</td>

                <td>{{player.last_hits}}/{{player.denies}}</td>

            </tr>
        </table>





    </div>

</template>

<script>
    import 'whatwg-fetch';
    import dotaconstants from   'dotaconstants';
import game_mode from '../assets/game_mode.json';
import * as utils from '../utils/utils';

    export default {
        name: "MatchDetail",
        data(){
            return{
                match_id:this.$route.params.match_id,
                matchDetail: {
                    barracks_status_dire: 0,
                    barracks_status_radiant: 0,
                    cluster: 0,
                    dire_captain: null,
                    dire_logo: null,
                    dire_name: null,
                    dire_score: 0,
                    dire_team_complete: null,
                    dire_team_id: null,
                    duration: "",
                    engine: 0,
                    first_blood_time: 0,
                    flags: 0,
                    game_mode: 0,
                    human_players: 10,
                    id: 0,
                    leagueid: 0,
                    lobby_type: 0,
                    match_id: "",
                    match_seq_num: "",
                    negative_votes: 0,
                    picks_bans: null,
                    player_accounts: [],
                    players: [],
                    positive_votes: 0,
                    radiant_captain: null,
                    radiant_logo: null,
                    radiant_name: null,
                    radiant_score: 0,
                    radiant_team_complete: null,
                    radiant_team_id: null,
                    radiant_win: true,
                    start_time: "",
                    tournament_id: null,
                    tournament_round: null,
                    tower_status_dire: 0,
                    tower_status_radiant: 0
                },
                firstName: 'Foo',
                lastName: 'Bar'
            }
        },
        props:[],
        beforeCreate:function () {

        },
        created:function(){
            //console.log('==created==\n',this.match_id);

        },

        beforeMount:function(){
          console.log("===beforeMount===\n",this.match_id);
            //this.getMatchDetail();
        },

        mounted:function(){
            //console.log("===mounted===\n",this.match_id);
            this.getMatchDetail();

        },
        beforeUpdate:function () {

        },
        updated:function () {
            console.log('something update');

        },
        computed: {
          /*  fullName: function () {
                console.log("full------------------------ name");
                let players=this.matchDetail.players;
                let _self=this;
                for(var i=0;i<players.length;i++){
                    let account_id=players[i].account_id;
                    utils.getPlayerInfo(account_id,function (playerInfo,) {

                       _self.matchDetail.players[i].player_name=playerInfo.personaname;
                        _self.matchDetail.players[i].player_head_icon=playerInfo.avatar;
                    });

                }
                return _self.matchDetail.players;
            }*/
        },
        methods:{
            getMatchDetail:function () {
                console.log('get match detail>>',this);
                let match_id=parseInt(this.match_id);
                console.log(match_id);
                fetch('/api/player/getonematchdetail/'+match_id,{
                    method:'GET'
                }).then((res)=>{
                    console.log(res);
                    return res.json();
                }).then((data)=>{
                    console.log(data[0]);
                    let matchDetail=data[0];

                let _self=this;
                    let game_mode_code=matchDetail.game_mode;
                   matchDetail.game_mode=game_mode[game_mode_code].mode;
                let duration=matchDetail.duration;
              matchDetail.duration=parseInt(duration/60);

                let start_time=matchDetail.start_time;
                start_time=utils.formatVTime(start_time);
                matchDetail.start_time=start_time;

                this.matchDetail=matchDetail;
                //遍历players数组，每一项添加新属性；使其能够响应数据变化
                 _self.matchDetail.players.map(function (item) {
                     utils.getPlayerInfo(item.account_id,function (playerInfo) {
                         console.log("util  playerInfo>>",playerInfo);
                         _self.$set(item,"player_name",playerInfo.personaname);
                         _self.$set(item,"player_head_icon",playerInfo.avatar);
                     });
                 });

                console.log(this.matchDetail);

                });
            },

        },
        watch :{
            'matchDetail':function (val, oldValue) {
                console.log("WATCH >>",val);
              //  return val;
            }
        },

    }
</script>

<style scoped>
    .match_head{
        margin: 0 1em;
    }
    .player{
        width: 100px;
    }
    .match_detail_table{
        width: 80%;
        text-align: center;
    }
    .td_player_name{
        width: 8em;
    }
    .word_win{
        color:red;
    }
</style>

