import * as userInfo from './userInfo';
const state = {
  easeHis: sessionStorage.getItem('easeHis') ? sessionStorage.getItem('easeHis') : false,
  easeHisType: sessionStorage.getItem('easeHisType') ? sessionStorage.getItem('easeHisType') : false,
};

const actions = {
  
  setUserInfo ({commit}, res) { // 这里的res可以由页面传过来，改变底下的true或者false
    sessionStorage.setItem('easeHis', res.username);
    sessionStorage.setItem('easeHisType', res.type);
    commit(userInfo.SET_LOGIN_NAME, res.username);
    commit(userInfo.SET_LOGIN_TYPE, res.type);
  },

  
  setSignOut ({commit}) {
    sessionStorage.removeItem('easeHis');
    sessionStorage.removeItem('easeHisType');
    commit(userInfo.SET_LOGIN_NAME, false);
  }

};

const getters = {
  easeHis: state => state.easeHis,
  easeHisType: state => state.easeHisType,
};

const mutations = {
  [userInfo.SET_LOGIN_TYPE] (state, type) {
    state.easeHisType = type;
  },
  [userInfo.SET_LOGIN_NAME] (state, username) {
    state.easeHis = username;
  }
};

export default {
  state, // 状态
  actions, // 提交mutations,可做异步操作
  getters, // 对数据进行一些操作
  mutations// 对状态做更改（同步）
};