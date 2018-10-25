export default {
  namespaced: true,
  state: {
    brands: [],
    models: [],
    types: [],
    fuel: []
  },
  mutations: {
    setBrands: (state, brands) => state.brands = brands,
    setModels: (state, models) => state.models = models,
    setTypes: (state, types) => state.types = types,
    setFuel: (state, fuel) => state.fuel = fuel
  },
  actions: {
    getBrands({commit}) {
      axios.get('/car/brands')
          .then(response => {
            commit('setBrands', response.data.data)
            return response.data
          })
    },
    getModels({commit}, brand) {
      axios.get('/car/models', {params: {brandId: brand}})
          .then(response => {
            commit('setModels', response.data.data)
            return response.data
          })
    },
    getTypes({commit}, {brands = [], models = []}) {
      axios.get('/car/types', {params: {brands: brands, models: models}})
          .then(response => {
            commit('setTypes', response.data.data)
            return response.data
          })
    },
    getFuel({commit}, {brands = [], models = [], types = []}) {
      axios.get('/car/fuels', {
        params: {
          brands: brands,
          models: models,
          types: types
        }
      })
          .then(response => {
            commit('setFuel', response.data.data)
            return response.data
          })
    }
  }
}
