import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from './getters';
// import myPlugin from './plugin/savaInLocal'

Vue.use(Vuex);

export default new Vuex.Store({
  // 确保在发布环境下关闭严格模式，以避免性能损失。
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  getters,
  // 使用vuex插件
  // plugins: [ myPlugin ]
});
