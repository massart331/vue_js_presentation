export default {
  namespaced: true,
  state: {
    resellerInfo: {}
  },
  mutations: {
    setResellerInfo: (state, resellerInfo) => state.resellerInfo = resellerInfo
  }
}
