import matchDetailApi from '../../api/matchDetail';

const state={
    statePlayerMatchesResult:null
};

const getters={
    getterPlayerMatchesResult:(state)=>{
        return state.statePlayerMatchesResult
    }
};

const actions={
    actionGetPlayerMatchesDetail:({commit,state},account_id)=>{
        matchDetailApi.getAllMatches(account_id,(playerMatchesResult)=>{
            commit('setPlayerMatchesResult',playerMatchesResult);
        })
    }
};

const mutations={
    setPlayerMatchesResult:(state,playerMatchesResult)=>{
        //console.log("playerMatchResult>>\n",playerMatchesResult);
      //  window.localStorage.setItem('playerMatchesResult',JSON.stringify(playerMatchesResult));

        state.statePlayerMatchesResult=playerMatchesResult;
    }
};


export  default {
    state,
    getters,
    actions,
    mutations
}
