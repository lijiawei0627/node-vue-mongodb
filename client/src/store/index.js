import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from './getters';
// import myPlugin from './plugin/savaInLocal'

Vue.use(Vuex);

export default new Vuex.Store({
  // 在严格模式下，任何 mutation 处理函数以外修改 Vuex state 都会抛出错误。
  // 确保在发布环境下关闭严格模式，以避免性能损失。
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  getters,
  // 使用vuex插件
  // plugins: [ myPlugin ]
});


// vuex模块化及命名空间
/* new Vuex.Store({
  // 在模块中，state 是被限制到模块的命名空间下，需要命名空间才能访问。 this.$store.state.a.age
  // 但actions 和mutations, 其实还有 getters 却没有被限制，在默认情况下，
  // 它们是注册到全局命名空间下的，所谓的注册到全局命名空间下，
  // 其实就是我们访问它们的方式和原来没有module 的时候是一样的。this.$store.dispatch('getAge', 30)
  // 但是写在module 中的actions, mutations 和getters, 
  // 它们获得的默认参数却不是全局的，都是局部的，被限定在它们所在的模块中的。
  // 那么怎样才能获取到根store 中的state 和 getters 呢？
  //  Vuex 提供了 rootState, rootGetters 作为module 中 getters 中默认参数, 
  // actions中context 对象，也会多了两个属性：context.getters, context.rootState, 
  // 这些全局的默认参数，都排在局部参数的后面。
  // 其实actions, mutations, getters, 也可以限定在当前模块的命名空间中。
  // 只要给我们的模块加一个namespaced 属性：{namespaced: true}
  // 此时actions, mutations, getters 都被限定到模块的命名空间下
  // this.$store.dispatch("a/getAge", 30) this.$store.getters["a/lastAge"]
  modules: {
    a: {
      // 此时在组件中访问state.age，需要使用this.$store.state.a.age
      state: {
        age: 20
      },
      mutations: {
        // 此时state参数为局部state，即a模块下的state
        setAge (state, newAge) {
          state.age = newAge;
        }
      },
      actions: {
        // 此时context为局部context，即a模块实例
        getAge (context, age) {
          context.commit('setAge', age)
        }
      },
      getters: {
        // 与mutation同理
        lastAge (state, getters, rootState, rootGetters) {
          return state.age + '岁'
        }
      }
    }
  }
})
 */