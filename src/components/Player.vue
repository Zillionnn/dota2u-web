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
                <img class="rank" v-bind:src="playerInfo.rank_img" v-if="playerInfo.rank_img"/>
                <img class="rank_stars" v-bind:src="playerInfo.rank_stars_img"  v-if="playerInfo.rank_stars_img"/>
                <span v-if="playerInfo.leaderboard_rank">{{playerInfo.leaderboard_rank}}</span>
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
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'Player',
        data () {
            return{
                account_id:this.$route.params.account_id,
                recent20matches:[],
                heroes:dotaconstants.hero,
                synchronousState:'同步数据'
            }

        },
        computed:mapGetters({
            playerInfo:'getterPlayerInfo',
            rankInfo:'getterRankInfo'
        }),
        created:function () {
            let account_id=this.account_id;
            console.log(account_id);
            this.$store.dispatch('actionGetOrUpdatePlayerInfo',account_id);
        },
        mounted:function(){

        },
        methods: {
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
            }

            //methods
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
