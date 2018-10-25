import Vue from 'vue'
import Vuex from 'vuex'

import FilterModule from './modules/filter'
import ListModule from './modules/list'
import ResellerModule from './modules/reseller'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    filter: FilterModule,
    list: ListModule,
    reseller: ResellerModule,
  }
})
