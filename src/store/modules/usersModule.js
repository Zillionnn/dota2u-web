import usersApi from '../api/users';

const state={
    stateAccount_id:null,
    user_id:null,
    user:null
};

const getters={
    getterAccountID:(state)=>{
        return state.stateAccount_id
    },
    getterUserID:(state)=>{
        return state.user_id
    },
    getterUser:(state)=>{
        return state.user
    }
};

const actions={
    actionGetAccountID:({commit,state},id)=>{
        usersApi.getUserBindAccount(id,(account_id)=>{
            commit('setAccountID',account_id);
        })
    },
    actionGetUserID:({commit,state},user_id)=>{
        commit('setUserID',user_id);
    },
    actionGetUser:({commit,state},user)=>{
        commit('setUser',user);
    }
};

const mutations={
    setAccountID:(state,account_id)=>{
        //console.log("playerMatchResult>>\n",playerMatchesResult);
        //  window.localStorage.setItem('playerMatchesResult',JSON.stringify(playerMatchesResult));
        state.stateAccount_id=account_id;
    },
    setUserID:(state,user_id)=>{
        state.user_id=user_id;
    },
    setUser:(state,user)=>{
        state.user=user;
    }
};


export  default {
    state,
    getters,
    actions,
    mutations
}
