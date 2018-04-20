<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div>
        <h2>Match Details</h2>
        <p>
            <span class="match_head">比赛id：  {{matchDetail.match_id}}</span>
            <span class="match_head">比赛模式：{{matchDetail.game_mode}}</span>
            <span class="match_head">开始时间：{{matchDetail.start_time}}</span>
            <span class="match_head">时长：{{matchDetail.duration}} </span>
            <span class="match_head">一血时间：{{matchDetail.first_blood_time}}</span>

        </p>


        <h2>天辉<span class="word_win" v-if="matchDetail.radiant_win">  WIN</span>   <span>{{matchDetail.radiant_score}}</span></h2>
        <table class="match_detail_table">
            <thead>
                <th></th>
                <th class="td_player_name">PLAYER</th>
                <th>HERO</th>
                <th>level</th>
                <th>K/D/A</th>
                <th>H/D</th>
                <th>参战率</th>
                <th>  伤害   </th>
                <th>GPM</th>
                <th>XPM</th>
                <th>ITEMS</th>
            </thead>
            <tr v-for="(player,index) in matchDetail.players" v-if="index<5" v-on:click="toPlayerPage(player.account_id)" class="tr_match_detail">
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
                <td>{{player.combat_percent}}%</td>
                <td class="td_hero_damage">
                   <!-- {{player.hero_damage}}-->
                    <div class="damage_percentage_div">
                        <div v-bind:style="{width: player.hero_damage_percentage+'%',height : damage_div_height+'em'}"
                             style="background: #9b322c;float: left"  ></div>
                        <span style="font-size: 0.5em;float: left;margin-left: 3px">   {{player.hero_damage}} </span>
                    </div>

                    <div class="damage_percentage_div">
                        <div v-bind:style="{width: player.tower_damage_percent+'%',height : damage_div_height+'em'}"
                             style="background: #4284d4;float: left"  ></div>
                        <span style="font-size: 0.5em;float: left;margin-left: 3px"> {{player.tower_damage}}</span>
                    </div>

                </td>

                <td>
                    <span style="color: yellow">{{player.gold_per_min}}</span>
                </td>
                <td>{{player.xp_per_min}}</td>
                <td class="td_game_item">
                    <div class="inventory">
                        <img class="game_item_s" v-if="player.item_0_pic" v-bind:src="player.item_0_pic"/>
                        <img class="game_item_s" v-if="player.item_1_pic" v-bind:src="player.item_1_pic"/>
                        <img class="game_item_s" v-if="player.item_2_pic" v-bind:src="player.item_2_pic"/>
                        <img class="game_item_s" v-if="player.item_3_pic" v-bind:src="player.item_3_pic"/>
                        <img class="game_item_s" v-if="player.item_4_pic" v-bind:src="player.item_4_pic"/>
                        <img class="game_item_s" v-if="player.item_5_pic" v-bind:src="player.item_5_pic"/>
                    </div>

                    <div class="back_bag">
                        <img class="back_bag_item" v-if="player.backpack_0_pic" v-bind:src="player.backpack_0_pic"/>
                        <img class="back_bag_item" v-if="player.backpack_1_pic" v-bind:src="player.backpack_1_pic"/>
                        <img class="back_bag_item" v-if="player.backpack_2_pic" v-bind:src="player.backpack_2_pic"/>
                    </div>

                </td>
            </tr>
        </table>



        <h2>夜魇<span  class="word_win"  v-if="!matchDetail.radiant_win">  WIN</span>     <span>{{matchDetail.dire_score}}</span></h2>
        <table class="match_detail_table">
            <thead>
            <th></th>
            <th class="td_player_name">PLAYER</th>
            <th>HERO</th>
            <th>level</th>
            <th>K/D/A</th>
            <th>H/D</th>
            <th>参战率</th>
            <th>  伤害   </th>
            <th>GPM</th>
            <th>XPM</th>
            <th>ITEMS</th>
            </thead>
            <tr v-for="(player,index) in matchDetail.players" v-if="index>=5" v-on:click="toPlayerPage(player.account_id)" class="tr_match_detail">
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
                <td>{{player.combat_percent}}%</td>
                <td class="td_hero_damage">
                    <!-- {{player.hero_damage}}-->
                    <div class="damage_percentage_div">
                        <div v-bind:style="{width: player.hero_damage_percentage+'%',height : damage_div_height+'em'}"
                             style="background: #9b322c;float: left"  ></div>
                        <span style="font-size: 0.5em;float: left;margin-left: 3px">   {{player.hero_damage}} </span>
                    </div>

                    <div class="damage_percentage_div">
                        <div v-bind:style="{width: player.tower_damage_percent+'%',height : damage_div_height+'em'}"
                             style="background: #4284d4;float: left"  ></div>
                        <span style="font-size: 0.5em;float: left;margin-left: 3px"> {{player.tower_damage}}</span>
                    </div>

                </td>

                <td>
                    <span style="color: yellow">{{player.gold_per_min}}</span>
                </td>
                <td>{{player.xp_per_min}}</td>
                <td class="td_game_item">
                    <div class="inventory">
                        <img class="game_item_s" v-if="player.item_0_pic" v-bind:src="player.item_0_pic"/>
                        <img class="game_item_s" v-if="player.item_1_pic" v-bind:src="player.item_1_pic"/>
                        <img class="game_item_s" v-if="player.item_2_pic" v-bind:src="player.item_2_pic"/>
                        <img class="game_item_s" v-if="player.item_3_pic" v-bind:src="player.item_3_pic"/>
                        <img class="game_item_s" v-if="player.item_4_pic" v-bind:src="player.item_4_pic"/>
                        <img class="game_item_s" v-if="player.item_5_pic" v-bind:src="player.item_5_pic"/>
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
                damage_div_height:0.5,
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

                    let radiantTotalDamage=0,
                        radiantTowerTotalDamage=0,
                        direTotalDamage=0,
                        direTowerTotalDamage=0;
                    let players=_self.matchDetail.players;
                    for(var i in players){
                        if(i<5){
                            radiantTotalDamage+=players[i].hero_damage;
                            radiantTowerTotalDamage+=players[i].tower_damage;
                        }else{
                            direTotalDamage+=players[i].hero_damage;
                            direTowerTotalDamage+=players[i].tower_damage;
                        }
                    }
                    let radian_score=_self.matchDetail.radiant_score;
                    let dire_score=_self.matchDetail.dire_score;
                    //===========遍历players数组，每一项添加新属性；使其能够响应数据变化==========
                //服务端需要修改？？？？？？？？？
                _self.matchDetail.players.map(function (player,index) {
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

                    //计算输出占比
                    //计算参战率
                    //计算建筑伤害占比
                    console.log("map index",index);
                    if(index<5){
                        _self.$set(player,"hero_damage_percentage",parseFloat(player.hero_damage*100/radiantTotalDamage).toFixed(2));
                        _self.$set(player,"tower_damage_percent",parseFloat(player.tower_damage*100/radiantTowerTotalDamage).toFixed(2));
                        _self.$set(player,"combat_percent",parseFloat((player.kills+player.assists)*100/radian_score).toFixed(1));
                    }else{
                        _self.$set(player,"hero_damage_percentage",parseFloat(player.hero_damage*100/direTotalDamage).toFixed(2));
                        _self.$set(player,"tower_damage_percent",parseFloat(player.tower_damage*100/direTowerTotalDamage).toFixed(2));
                        _self.$set(player,"combat_percent",parseFloat((player.kills+player.assists)*100/dire_score).toFixed(1));
                    }

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

            /**
             * 路由
             * 编程式 导航
             * @param account_id
             */
            toPlayerPage:function (account_id) {
                console.log("toPlayerPage>>>",account_id);
                this.$router.push({name:'player', params:{account_id:account_id}});

            }
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
        width: 770px;
        text-align: center;
    }
    .td_player_name{
        width: 6em;
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

    .td_hero_damage{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 59.2px;
        width: 5em;
    }
    .damage_percentage_div{
        width: 85%;
        height: 0.5em;
        /* background: #8c868c;*/
        margin: 2px 0 2px 2em;

    }
    .tr_match_detail:hover{
        cursor: pointer;
    }
</style>

