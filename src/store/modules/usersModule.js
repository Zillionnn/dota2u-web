import usersApi from '../api/users';

const state = {
  stateAccount_id: null,
  user_id: null,
  nickName: ''
};

const getters = {
  getterAccountID: (state) => {
    return state.stateAccount_id;
  },
  getterUserID: (state) => {
    return state.user_id;
  },
  getterNickName: (state) => {
    return state.nickName;
  }
};

const actions = {
  actionGetAccountID: ({commit, state}, id) => {
    usersApi.getUserBindAccount(id, (account_id) => {
      commit('setAccountID', account_id);
    });
  },
  actionGetUserID: ({commit, state}, user_id) => {
    commit('setUserID', user_id);
  },
  actionGetNickName: ({commit, state}, nickName) => {
    commit('setNickName', nickName);
  }
};

const mutations = {
  setAccountID: (state, account_id) => {
    // console.log("playerMatchResult>>\n",playerMatchesResult);
    //  window.localStorage.setItem('playerMatchesResult',JSON.stringify(playerMatchesResult));
    state.stateAccount_id = account_id;
  },
  setUserID: (state, user_id) => {
    state.user_id = user_id;
  },
  setNickName (state, payload) {
    state.nickName = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
