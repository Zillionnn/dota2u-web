import 'whatwg-fetch';



export default {
    getPlayerRank:function(account_id,callback){
        let leaderboard_rank,
            rank_img,
            rank_stars_img='';
        let rankInfo={};
        let account=account_id;
        console.log(account);
        //玩家信息更新；
        fetch('/api/player/fetchUserInfoByAccount',{
            method:'POST',
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({account:account})
        }).then((res) => {
            return res.json();
        }).then((data) => {
            leaderboard_rank=data.leaderboard_rank;

            if(leaderboard_rank<=10){
                rank_img=`/static/img/rank/rank_icon_7c.png`;
            }
            if(leaderboard_rank>10 && leaderboard_rank<=100){
                rank_img=`/static/img/rank/rank_icon_7b.png`;
            }
            if(leaderboard_rank>100){
                rank_img=`/static/img/rank/rank_icon_7a.png`;
            }
            if(leaderboard_rank==0){
                let rank=data.rank_tier.substr(0,1);
                let stars=data.rank_tier.substr(1,1);
                if(parseInt(stars)>5){

                }
                rank_img=`/static/img/rank/rank_icon_${rank}.png`;
                if(stars>=0){
                    rank_stars_img=`/static/img/rank/rank_star_${stars}.png`;
                }

            }
            rankInfo.leaderboard_rank=leaderboard_rank;
                rankInfo.rank_img=rank_img;
                rankInfo.rank_stars_img=rank_stars_img;
            callback(rankInfo);
        });
    },

    getOrUpdatePlayerInfo:function(account_id,callback){
        let leaderboard_rank,
         rank_img,
            rank_stars_img='';
        let playerInfo={};
        let account=account_id;
        console.log(account);
        //获取玩家信息；
        fetch('/api/player/getUserInfoByAccount',{
            method:'POST',
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({account:account})
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            console.log("PLAYER  INFO>>\n",data);
             playerInfo=data;
            playerInfo.rank_img=rank_img;
            playerInfo.leaderboard_rank=leaderboard_rank;
            playerInfo.rank_stars_img=rank_stars_img;

           // console.log("API>>\n",playerInfo);
            callback(playerInfo);

        });
    },
}
