import types from './type';

const actions = {
  setAuthenticated: ({commit}, isAuthenticated) => {
    commit(types.SET_AUTHENTICATED, isAuthenticated)
  },
  setUser: ({commit}, user) => {
    commit(types.SET_USER, user)
  },
  clearCurrentState: ({commit}) => {
    commit(types.SET_AUTHENTICATED, false)
    commit(types.SET_USER, null)
  }
  // 在actions中使用axios异步请求数据
  // RequestState: ({ commit }) => {
  //   this.$axios.post('/api/users/login')
  //     .then(res => {
  //       console.log(res);
  //       commit(types.GET_STATE, res.data);
  //     })
  //     .catch(err => {
  //       throw err;
  //     })
  // }
}

export default actions;
