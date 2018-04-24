import 'whatwg-fetch';

import 'whatwg-fetch';
import dotaconstants from   'dotaconstants';
import * as utils from '../utils/utils';
import game_mode from '../assets/game_mode.json';

let heroes=dotaconstants.hero;


export default {
    getAllMatches:function (account_id,callback) {
        let allMatches,
            recent20Array=[],
             latest_20_win_rate,
            recent20matches=[],
            playerMatchesResult={};

        console.log("get all matches");
        fetch('/api/player/getAllMatches/'+account_id,{
            method:'GET'
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            console.log("GET PLAYER ALL MATCHES",data);
            allMatches=data;
           recent20Array=data.slice(0,20);


            console.log(recent20Array);

            let num_win=0;
            for(var i in recent20Array){
                let match={};
                match.match_id=recent20Array[i].match_id;
                match.start_time=utils.formatVTime_startTime(recent20Array[i].start_time);
                //   console.log(match.start_time);
                match.duration=utils.s2Min$Second(recent20Array[i].duration);

                let player=recent20Array[i].player_json;


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
                     latest_20_win_rate=(num_win*100)/20;
                }

                //match.game_mode=game_mode[data[i].game_mode].mode;
                match.game_mode=game_mode[recent20Array[i].game_mode].zh_localized_name;

                recent20matches.push(match);
            }

          playerMatchesResult.recent20matches=recent20matches;
            playerMatchesResult.allMatches=allMatches;
            playerMatchesResult.latest_20_win_rate=latest_20_win_rate;
           // console.log("API>>\n",playerMatchesResult);
            callback(playerMatchesResult);
        });
    }

}
