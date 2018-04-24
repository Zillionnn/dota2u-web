//api?
import  playerApi from '../../api/player';

const state ={
    statePlayerInfo:null,
    stateRankInfo:null
};


//getters
const getters={
    getterPlayerInfo:state=>{
       return  state.statePlayerInfo;
    },
    getterRankInfo:(state)=>{
        return state.stateRankInfo;
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
        })
    }
};

const mutations={
    setPlayerInfo(state,playerInfo){
        //console.log("IN MUTATIONS>>\n",playerInfo);
        state.statePlayerInfo=playerInfo;
    },

    setRankInfo(state,rankInfo){
        state.stateRankInfo=rankInfo;
    }
};



export default {
    state,
    getters,
    actions,
    mutations
}
