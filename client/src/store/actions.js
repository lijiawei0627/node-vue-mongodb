import types from './type';

const actions = {
  // Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，
  // 因此你可以调用 context.commit 提交一个 mutation，
  // 或者通过 context.state 和 context.getters 来获取 state 和 getters。
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
