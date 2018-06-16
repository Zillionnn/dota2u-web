<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
<div >
    <div v-show="isLoading">
        加载中。。。
    </div>
    <div v-show="!isLoading">
        <!-- 111111111111111111111111
 <button class="synchronous_player_data" v-on:click="getRecentMatchesByAccount(121320102)">123</button>-->
        <p v-if="playerForbid">
            用户未开放数据
        </p>
        <div v-if="playerForbid==false" class="left-section">
        <span class="latest_20_win_rate" v-if="playerMatchResult">
            {{playerMatchResult.latest_20_win_rate}}%
        </span>过去20场胜率

            <table   class="recent_matches_table">
                <thead style="text-align: center">
                <th>英雄</th>
                <th class="win_or_lose">胜败</th>
                <th>比赛编号</th>
                <th>时间</th>
                <th>KDA</th>
                </thead>
                <tbody>
                <tr v-for="(matches,index) in playerMatchResult.recent20matches"
                    v-on:click="toMatchDetailPage(matches.match_id)" class="tr_match" v-bind:class="{tr_even: index%2}">
                    <td class="td_hero_img">
                        <img class="hero_icon"  v-bind:src="matches.hero_img"/>
                        <div style="float:left;margin-top: 0.5em">{{matches.player.hero_localized_name}}</div>
                    </td>
                    <td class="win_or_lose">
                        <span v-if="matches.win==true" class="win_word">胜</span>
                        <span v-if="matches.win==false" class="lose_word">败</span>
                    </td>

                    <td style="width: 10em">
                        <div>
                            <span>{{matches.match_id}}</span><br/>
                            <span class="td_game_mode">{{matches.game_mode}}</span>
                        </div>
                    </td>

                    <td style="width: 10em">
                        <div >
                            <span>{{matches.start_time}}</span><br/>
                            <span class="td_duration">{{matches.duration}}</span>
                        </div>
                    </td>
                    <td>{{matches.player.kills}}/{{matches.player.deaths}}/{{matches.player.assists}}</td>
                </tr>
                </tbody>
            </table>
        </div>

        <div id="player_charts" style=" width: 29%; height: 400px;"  ref="playerCharts"></div>
    </div>
</div>
</template>

<script>
    import 'whatwg-fetch';
    import dotaconstants from   'dotaconstants';
    import * as utils from '../../../../utils/utils';
    import game_mode from '../../../../assets/game_mode.json';
    import { mapGetters, mapActions } from 'vuex';
    import echarts from  'echarts';

    export default {
        name: 'RecentMatchesComponent',

        data () {
            return{
                account_id:this.$route.params.account_id,
                heroes:dotaconstants.hero,
                playerForbid:false,
                synchronousState:'同步数据',
                isLoading:true,
                myChart:{}
            }

        },

        computed:mapGetters({
            playerMatchResult:'getterPlayerMatchesResult',
            recentData:'getterRecentData'
        }),

        created:function () {
            let account_id=this.account_id;
            console.log("recent matches");
            this.getRecentMatchesByAccount(account_id);

        },
        mounted:function(){
            this.isLoading=true;
            this.generateEchart();
        },
        beforeUpdate:function(){
         //   this.data_updated=false;
        },
        updated:function(){
            console.log('something update');
          this.isLoading=false;
        },
        methods: {
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
             * 获取玩家最近20场比赛
             * @param account_id
             */
            getRecentMatchesByAccount: function (account_id) {
                console.log('in get recent matches ');
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
                    localStorage.removeItem('playerMatchesResult');
                    if(data.error){
                        this.playerForbid=true;
                        return;
                    }else{
                        this.playerForbid=false;
                        console.log(data);
                        if(data.result==200){
                            //从store取0-19条
                          //  this.getAllMatches(account_id);
                            this.$store.dispatch('actionGetPlayerMatchesDetail',account_id);
                        }

                    }
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
            generateEchart:function () {
                //  console.log("======recent data-======",this.recentData);
                let fight_score=this.recentData.fight_score;
                let farm_score=this.recentData.farm_score;
                let support_score=this.recentData.support_score;
                let push_score=this.recentData.push_score;
                let versatility_score=this.recentData.versatility_score;
                this.myChart = echarts.init(document.getElementById('player_charts'));

                // 指定图表的配置项和数据
                let option = {
                    title: {

                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        x: 'center',
                    },
                    radar: [
                        {
                            indicator: [
                                {text: 'fight_score', max: 1},
                                {text:'versatility_score',max:1},
                                {text: 'support_score', max: 1},
                                {text:'push_score',max:1},
                                {text: 'farm_score', max: 1}

                            ],
                            center: ['35%','40%'],
                            radius: 60
                        }
                    ],
                    series: [
                        {
                            type: 'radar',
                            /*      tooltip: {
                                      trigger: none
                                  },*/
                            itemStyle: {normal: {areaStyle: {type: 'default'}}},
                            data: [
                                {
                                    value: [fight_score,versatility_score,support_score,push_score,farm_score],
                                }
                            ]
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                this.myChart.setOption(option);
            }
            //methods
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
        font-size: 1.5em;
        font-weight: bold;
    }
    .recent_matches_table{
      /*    width: 60%;*/
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

    .left-section{
        float:left;
        width: 70%;
    }
    #player_charts{
        float: right;
    }

</style>
