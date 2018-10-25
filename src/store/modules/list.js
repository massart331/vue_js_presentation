import {vehicleLoverPrice} from '@/common/vehicle'

export default {
  namespaced: true,
  state: {
    vehiclesLoaded: false,
    selectedBrands: [],
    selectedModels: [],
    selectedTypes: [],
    selectedTypeOfSort: 'price_low',
    selectedFuel: [],
    vehicles: [],
    pagination: {}
  },
  mutations: {
    setVehicles: (state, vehicles) => state.vehicles = vehicles,
    appendVehicles: (state, vehicles) => {
      vehicles.forEach(vehicle => {
        if (!state.vehicles.includes(vehicle)) {
          state.vehicles.push(vehicle)
        }
      })
    },
    setPagination: (state, pagination) => state.pagination = pagination,
    setSelectedBrands: (state, selectedBrands) => state.selectedBrands = selectedBrands,
    setSelectedModels: (state, selectedModels) => state.selectedModels = selectedModels,
    setSelectedTypes: (state, selectedTypes) => state.selectedTypes = selectedTypes,
    setSelectedFuel: (state, selectedFuel) => state.selectedFuel = selectedFuel,
    setVehiclesLoaded: (state, vehiclesLoaded) => state.vehiclesLoaded = vehiclesLoaded,
    setSelectedTypeOfSort: (state, selectedTypeOfSort) => state.selectedTypeOfSort = selectedTypeOfSort
  },
  getters: {
    nextPage: (state) => {
      let currentPage = state.pagination.current_page, totalPages = state.pagination.total_pages;
      return currentPage + 1 <= totalPages ? currentPage + 1 : null
    },
    getSortedVehicles: (state, getters) => {
      switch (state.selectedTypeOfSort) {
        case 'price_low':
          return getters.sortByPriceLowest;
        case 'price_high':
          return getters.sortByPriceHighest;
        case 'delivery_low':
          return getters.sortByDelivaryDayHighest;
      }
    },
    sortByPriceLowest: (state, getters) => {
      return state.vehicles.sort((a, b) => getters.lowestPrice(a) - getters.lowestPrice(b))
    },
    sortByPriceHighest: (state, getters) => state.vehicles.sort((a, b) => getters.lowestPrice(b) - getters.lowestPrice(a)),
    sortByDelivaryDayHighest: (state) => state.vehicles.sort((a, b) => a.delivery_days_count - b.delivery_days_count),
    lowestPrice: () => (vehicle) => vehicleLoverPrice(vehicle.fixedCosts)
  },
  actions: {
    getVehicles({commit, state, getters}, toNextPage = true) {
      commit('setVehiclesLoaded', false);
      axios.get('/vehicles', {
        params: {
          brands: state.selectedBrands,
          models: state.selectedModels,
          types: state.selectedTypes,
          fuels: state.selectedFuel,
          page: toNextPage ? getters.nextPage : 1
        }
      })
          .then(response => {
            if (!toNextPage) {
              commit('setVehicles', response.data.data)
            } else {
              commit('appendVehicles', response.data.data)
            }
            commit('setPagination', response.data.meta.pagination);
            commit('setVehiclesLoaded', true)
            return response.data
          })
    }
  }
}
