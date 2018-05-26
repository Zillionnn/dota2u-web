//api?
import  playerApi from '../api/player';

const state ={
    statePlayerInfo:null,
    stateRankInfo:null,
    stateRecentData:null
};


//getters
const getters={
    getterPlayerInfo:state=>{
       return  state.statePlayerInfo;
    },
    getterRankInfo:(state)=>{
        return state.stateRankInfo;
    },
    getterRecentData:(state)=>{
        return state.stateRecentData
    }
};

const actions={
    actionGetOrUpdatePlayerInfo:({commit,state},account_id)=>{
        playerApi.getOrUpdatePlayerInfo(account_id,(playerInfo)=>{
            //console.log("IN ACTIONS>>\n",playerInfo);
            commit('setPlayerInfo',playerInfo);
        });

        playerApi.getPlayerRank(account_id,(rankInfo)=>{
            commit('setRankInfo',rankInfo);
        });

        playerApi.getRecentData(account_id,(recentData)=>{
            commit('setRecentData',recentData);
        });
    }
};

const mutations={
    setPlayerInfo(state,playerInfo){
        //console.log("IN MUTATIONS>>\n",playerInfo);
        state.statePlayerInfo=playerInfo;
    },

    setRankInfo(state,rankInfo){
        state.stateRankInfo=rankInfo;
    },

    setRecentData(state,recentData){
        state.stateRecentData=recentData;
    }
};



export default {
    state,
    getters,
    actions,
    mutations
}
