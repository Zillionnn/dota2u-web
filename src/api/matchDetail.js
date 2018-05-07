import 'whatwg-fetch';

import 'whatwg-fetch';
import dotaconstants from   'dotaconstants';
import * as utils from '../utils/utils';
import game_mode from '../assets/game_mode.json';

let heroes=dotaconstants.hero;


export default {
    getAllMatches:function (account_id,callback) {
        let allMatches,
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
        //   allMatches=data.slice(0,20);


            //console.log(allMatches);

            let num_win=0;
            for(var i in allMatches){
                let match={};
                match.match_id=allMatches[i].match_id;
                match.start_time=utils.formatVTime_startTime(allMatches[i].start_time);
                //   console.log(match.start_time);
                match.duration=utils.s2Min$Second(allMatches[i].duration);

                let player=allMatches[i].player_json;


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

                if(allMatches[i].player_position<5){
                    match.win=data[i].radiant_win;
                }else{
                    match.win=!data[i].radiant_win;
                }

                if(match.win==true){
                    num_win++;
                }


                //match.game_mode=game_mode[data[i].game_mode].mode;
                match.game_mode=game_mode[allMatches[i].game_mode].zh_localized_name;

                if(i<20){
                    latest_20_win_rate=(num_win*100)/20;
                    recent20matches.push(match);
                }

            }

          playerMatchesResult.recent20matches=recent20matches;
            playerMatchesResult.allMatches=allMatches;
            playerMatchesResult.latest_20_win_rate=latest_20_win_rate;
            playerMatchesResult.num_win=num_win;
           // console.log("API>>\n",playerMatchesResult);
            callback(playerMatchesResult);
        });
    }

}
