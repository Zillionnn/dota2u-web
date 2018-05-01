<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div>
        <div v-show="isLoading">
            加载中。。。
        </div>
        <div v-show="!isLoading">
            <p><button v-on:click="prePage(allMatches)">pre page</button>   <button v-on:click="nextPage(allMatches)">next page</button>
                {{current_page.page}}/{{total_page}}</p>
            <table  class="recent_matches_table">
                <thead style="text-align: center">
                <th>英雄</th>
                <th class="win_or_lose">胜败</th>
                <th>比赛编号</th>
                <th>时间</th>
                <th>KDA</th>
                </thead>
                <tbody>
                <tr v-for="(matches,index) in current_page.matches"
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

            <p><button v-on:click="prePage(allMatches)">pre page</button>   <button v-on:click="nextPage(allMatches)">next page</button>
                {{current_page.page}}/{{total_page}}</p>

        </div>

</div>


</template>


<script>
    import 'whatwg-fetch';
    import dotaconstants from   'dotaconstants';
    import * as utils from '../utils/utils';
    import game_mode from '../assets/game_mode.json';
    import PlayerAllMatchesComponent from '../components/PlayerAllMatchesComponent';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'player',
        components:{PlayerAllMatchesComponent},

        data () {
            return{
                account_id:this.$route.params.account_id,
               isLoading:true,
                heroes:dotaconstants.hero,
                allMatches:[],
                total:null,
                per_page:20,
                current_page:{
                    page:1,
                    matches:[]
                },
                total_page:null,
            }

        },
        computed:{
            ...mapGetters({
            playerMatchResult:'getterPlayerMatchesResult'
        }),

        },
        created:function () {
            let account_id=this.account_id;
            console.log(account_id);
          //  this.getOrUpdatePlayerInfo(account_id);
            // this.getAllMatches(account_id);
           // this.getRecentMatchesByAccount(account_id);
            this.getAllMatches(account_id);

        },
        mounted:function(){

        },
        updated:function(){
            this.isLoading=false;
        },
        methods: {
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

            /**
             * 获取所有比赛，分页
             * @param account_id
             */
            getAllMatches:function () {
                let playerMatchesResult=this.$store.state.matchDetail.statePlayerMatchesResult;
                if(playerMatchesResult==null){
                    console.log('is Null');
                    this.$store.dispatch('actionGetPlayerMatchesDetail',this.account_id);
                }else{
                    console.log("not null");
                    this.isLoading=false;
                    this.generateCurrentPage();
                }

                },

            generateCurrentPage:function(){

                let allMatches=this.$store.state.matchDetail.statePlayerMatchesResult.allMatches;
                //  let localStorage=window.localStorage.getItem("playerMatchesResult");
                // let allMatches=JSON.parse(localStorage).allMatches;
                console.log(allMatches);
                this.recent20matches=[];
                let num_win=0;
                for(var i in allMatches){
                    let match={};
                    match.match_id=allMatches[i].match_id;
                    match.start_time=utils.formatVTime_startTime(allMatches[i].start_time);
                    //   console.log(match.start_time);
                    match.duration=utils.s2Min$Second(allMatches[i].duration);

                    let player=allMatches[i].player_json;

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
                    match.win = allMatches[i].radiant_win;
                    match.win = allMatches[i].radiant_win;

                    if (allMatches[i].player_position < 5) {
                        match.win = allMatches[i].radiant_win;
                    } else {
                        match.win = !allMatches[i].radiant_win;
                    }
                    this.allMatches.push(match);
                    this.total = this.allMatches.length;
                    this.total_page = parseInt(this.total / this.per_page) + 1;
                    this.current_page.page = 1;
                    this.current_page.matches = this.allMatches.slice(0, 20);
                    //   console.log(this.current_page);
                    //    console.log("total page>>", this.total_page);

                    //   console.log(this.allMatches);
                }
            },

            prePage:function (allMatches) {
                if(this.current_page.page==1){
                    this.current_page.matches=this.allMatches.slice(0,20);
                    return;
                }
                this.current_page.page-=1;

                let start_index=(this.current_page.page-1)*20;
                //console.log("start index",start_index);
                this.current_page.matches=allMatches.slice(start_index,start_index+20);

               // console.log("NEXT  PAGE",this.current_page);
            },
            nextPage:function (allMatches) {
                this.current_page.page+=1;
                if(this.current_page.page>this.total_page){
                    this.current_page.page=this.total_page;
                    return;
                }
                let start_index=(this.current_page.page-1)*20;
                console.log("start index",start_index);
                this.current_page.matches=allMatches.slice(start_index,start_index+20);

               // console.log("NEXT  PAGE",this.current_page);

            }

            //methods
        },
        watch:{
            '$route':'getRecentMatchesByAccount',
            playerMatchResult:function () {
                this.generateCurrentPage();
            }
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
