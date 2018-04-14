<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div>
        <h2>Match Details</h2>
        <p>
            <span class="match_head">比赛id：  {{matchDetail.match_id}}</span>
            <span class="match_head">比赛模式：{{matchDetail.game_mode}}</span>
            <span class="match_head">开始时间：{{matchDetail.start_time}}</span>
            <span class="match_head">时长：{{matchDetail.duration}} </span>
            <span class="match_head">一血时间：{{matchDetail.first_blood_time}}</span>

        </p>


        <h2>天辉<span class="word_win" v-if="matchDetail.radiant_win">WIN</span>   <span>{{matchDetail.radiant_score}}</span></h2>
        <table class="match_detail_table">
            <tr>
                <td></td>
                <td class="td_player_name"><h3>PLAYER</h3></td>
                <td><h3>HERO</h3></td>
                <td><h3>level</h3></td>
                <td><h3>K/D/A</h3></td>
                <td><h3>H/D</h3></td>
                <td><h3>hero damage</h3></td>
                <td><h3>tower damage</h3></td>
                <td><h3>GPM</h3></td>
                <td><h3>XPM</h3></td>
                <td><h3>ITEMS</h3></td>
            </tr>
            <tr v-for="(player,index) in matchDetail.players" v-if="index<5">
                <td style="display: none">{{player.account_id}}</td>

                <td >
                        <img v-if="player.player_head_icon" v-bind:src="player.player_head_icon"/>
                        <img v-if="!player.player_head_icon" src="/static/img/null_head_icon.png"/>
                </td>

                <td class="td_player_name" >
                    <span v-if="player.player_name">{{player.player_name}}</span>
                    <span  v-if="!player.player_name">匿名玩家</span>
                </td>
                <td> <img class="hero_icon"  v-bind:src="player.hero_img"/></td>
                <td>{{player.level}}</td>
                <td>{{player.kda}} ({{player.kills}}/{{player.deaths}}/{{player.assists}})</td>
                <td>{{player.last_hits}}/{{player.denies}}</td>
                <td>{{player.hero_damage}}</td>
                <td>{{player.tower_damage}}</td>
                <td>{{player.gold_per_min}}</td>
                <td>{{player.xp_per_min}}</td>
                <td class="td_game_item">
                    <div class="inventory">
                        <img class="game_item_s" v-if="player.item_0_pic" v-bind:src="player.item_0_pic"/>
                        <img class="game_item_s" v-if="player.item_0_pic" v-bind:src="player.item_1_pic"/>
                        <img class="game_item_s" v-if="player.item_0_pic" v-bind:src="player.item_2_pic"/>
                        <img class="game_item_s" v-if="player.item_0_pic" v-bind:src="player.item_3_pic"/>
                        <img class="game_item_s" v-if="player.item_0_pic" v-bind:src="player.item_4_pic"/>
                        <img class="game_item_s" v-if="player.item_0_pic" v-bind:src="player.item_5_pic"/>
                    </div>

                    <div class="back_bag">
                        <img class="back_bag_item" v-if="player.backpack_0_pic" v-bind:src="player.backpack_0_pic"/>
                        <img class="back_bag_item" v-if="player.backpack_1_pic" v-bind:src="player.backpack_1_pic"/>
                        <img class="back_bag_item" v-if="player.backpack_2_pic" v-bind:src="player.backpack_2_pic"/>
                    </div>

                </td>
            </tr>
        </table>



        <h2>夜魇<span  class="word_win"  v-if="!matchDetail.radiant_win">WIN</span>     <span>{{matchDetail.dire_score}}</span></h2>
        <table class="match_detail_table">
            <tr>
                <td></td>
                <td class="td_player_name"><h3>PLAYER</h3></td>
                <td><h3>HERO</h3></td>
                <td><h3>level</h3></td>
                <td><h3>K/D/A</h3></td>
                <td><h3>H/D</h3></td>
                <td><h3>hero damage</h3></td>
                <td><h3>tower damage</h3></td>
                <td><h3>GPM</h3></td>
                <td><h3>XPM</h3></td>
                <td><h3>ITEMS</h3></td>
            </tr>
            <tr v-for="(player,index) in matchDetail.players" v-if="index>=5">
                <td style="display: none">{{player.account_id}}</td>

                <td >
                    <img v-if="player.player_head_icon" v-bind:src="player.player_head_icon"/>
                    <img v-if="!player.player_head_icon" src="/static/img/null_head_icon.png"/>
                </td>

                <td class="td_player_name" >
                    <span v-if="player.player_name">{{player.player_name}}</span>
                    <span  v-if="!player.player_name">匿名玩家</span>
                </td>
                <td> <img class="hero_icon"  v-bind:src="player.hero_img"/></td>
                <td>{{player.level}}</td>
                <td>{{player.kda}} ({{player.kills}}/{{player.deaths}}/{{player.assists}})</td>
                <td>{{player.last_hits}}/{{player.denies}}</td>
                <td>{{player.hero_damage}}</td>
                <td>{{player.tower_damage}}</td>
                <td>{{player.gold_per_min}}</td>
                <td>{{player.xp_per_min}}</td>
                <td class="td_game_item">
                    <div class="inventory">
                        <img class="game_item_s" v-if="player.item_0_pic" v-bind:src="player.item_0_pic"/>
                        <img class="game_item_s" v-if="player.item_0_pic" v-bind:src="player.item_1_pic"/>
                        <img class="game_item_s" v-if="player.item_0_pic" v-bind:src="player.item_2_pic"/>
                        <img class="game_item_s" v-if="player.item_0_pic" v-bind:src="player.item_3_pic"/>
                        <img class="game_item_s" v-if="player.item_0_pic" v-bind:src="player.item_4_pic"/>
                        <img class="game_item_s" v-if="player.item_0_pic" v-bind:src="player.item_5_pic"/>
                    </div>

                    <div class="back_bag">
                        <img class="back_bag_item" v-if="player.backpack_0_pic" v-bind:src="player.backpack_0_pic"/>
                        <img class="back_bag_item" v-if="player.backpack_1_pic" v-bind:src="player.backpack_1_pic"/>
                        <img class="back_bag_item" v-if="player.backpack_2_pic" v-bind:src="player.backpack_2_pic"/>
                    </div>

                </td>
            </tr>
        </table>





    </div>

</template>

<script>
    import 'whatwg-fetch';
    import dotaconstants from   'dotaconstants';
    import game_mode from '../assets/game_mode.json';
    import game_items from '../assets/game_items.json';
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
                console.log('get match detail>>', this);
                let match_id = parseInt(this.match_id);
              //  console.log(match_id);
                fetch('/api/player/getonematchdetail/' + match_id, {
                    method: 'GET'
                }).then((res) => {
                    console.log(res);
                return res.json();
            }).then((data)=>{
                    console.log(data[0]);
                let matchDetail = data[0];

                let _self = this;
                //游戏模式
                let game_mode_code = matchDetail.game_mode;
                matchDetail.game_mode = game_mode[game_mode_code].mode;
                let duration = matchDetail.duration;
                matchDetail.duration = utils.s2Min$Second(duration);

                //开始时间
                let start_time = matchDetail.start_time;
                start_time = utils.formatVTime(start_time);
                matchDetail.start_time = start_time;

                //一血时间
                let first_blood_time = matchDetail.first_blood_time;
                first_blood_time = utils.s2Min$Second(first_blood_time);
                console.log("first_blood_time\n", first_blood_time);
                matchDetail.first_blood_time = first_blood_time;

                this.matchDetail = matchDetail;

                //===========遍历players数组，每一项添加新属性；使其能够响应数据变化==========
                //服务端需要修改？？？？？？？？？
                _self.matchDetail.players.map(function (player) {
                    //设置英雄头像
                    //  console.log(item.hero_id);
                    let hero_name, heroes = dotaconstants.hero;
                    for (var i in heroes) {
                        if (heroes[i].id == player.hero_id) {
                            hero_name = heroes[i].name.replace("npc_dota_hero_", "");
                        }
                    }
                    //  console.log("hero_name>>",hero_name);
                    let hero_img = `/static/img/hero_icon/${hero_name}_hphover.png`;
                    _self.$set(player, "hero_name",hero_name);
                    _self.$set(player, "hero_img", hero_img);

                    //计算kda
                    let kda = parseFloat((player.kills + player.assists) / player.deaths).toFixed(2);
                    _self.$set(player, "kda", kda);

                    //添加物品图片
                    //console.log("多少个物品？",game_items.length);
                    for(var i in game_items){
                        if(game_items[i].id==player.item_0){
                            let item_path=utils.itemID2Path(game_items[i].name);
                            _self.$set(player,"item_0_pic",item_path);
                        }
                        if(game_items[i].id==player.item_1){
                            let item_path=utils.itemID2Path(game_items[i].name);
                            _self.$set(player,"item_1_pic",item_path);
                        }
                        if(game_items[i].id==player.item_2){
                            let item_path=utils.itemID2Path(game_items[i].name);
                            _self.$set(player,"item_2_pic",item_path);
                        }
                        if(game_items[i].id==player.item_3){
                            let item_path=utils.itemID2Path(game_items[i].name);
                            _self.$set(player,"item_3_pic",item_path);
                        }
                        if(game_items[i].id==player.item_4){
                            let item_path=utils.itemID2Path(game_items[i].name);
                            _self.$set(player,"item_4_pic",item_path);
                        }
                        if(game_items[i].id==player.item_5){
                            let item_path=utils.itemID2Path(game_items[i].name);
                            _self.$set(player,"item_5_pic",item_path);
                        }
                        if(game_items[i].id==player.backpack_0){
                            let item_path=utils.itemID2Path(game_items[i].name);
                            _self.$set(player,"backpack_0_pic",item_path);
                        }
                        if(game_items[i].id==player.backpack_1){
                            let item_path=utils.itemID2Path(game_items[i].name);
                            _self.$set(player,"backpack_1_pic",item_path);
                        }
                        if(game_items[i].id==player.backpack_2){
                            let item_path=utils.itemID2Path(game_items[i].name);
                            _self.$set(player,"backpack_2_pic",item_path);
                        }

                    }

                        //设置玩家头像，名称
                        utils.getPlayerInfo(player.account_id, function (playerInfo) {
                            console.log("util  playerInfo>>", playerInfo);
                            _self.$set(player, "player_name", playerInfo.personaname);
                            _self.$set(player, "player_head_icon", playerInfo.avatar);

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
    @media only screen and (max-width: 1109px){
        .match_detail_table{
            width: 700px;
            text-align: center;
        }
    }

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
        width: 4em;
        word-wrap:break-word;
        word-break: break-all;
        overflow:hidden;
    }

    .word_win{
        color:red;
    }
    .hero_icon{
        width: 4em;
        height: 2.1em;
    }
    .inventory{
        width: 6em;
        height: 3em;
        float: left;
    }
    .game_item_s{
        width: 2em;
        height: 1.5em;
        float: left;
    }

    .back_bag{
        float: right;
        width: 1.6em;
        height: 3.6em;
        background: #272727;
    }
    .back_bag_item{
        width: 1.6em;
        height: 1.2em;
        float: left;
    }
    .td_game_item{
        width: 8em;
    }
</style>

