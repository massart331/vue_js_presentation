<template lang="pug">
  .list
    pre-loader(:show="!vehiclesLoaded")
      .container
        .row
          template(v-if="vehicles.length")
            .col-xl-3.col-lg-4.col-md-6(v-for="product in getSortedVehicles" )
              v-product(:vehicle="product")
          template(v-else)
            .col-md-12.empty.text-center
              p.title Din sökning gav inget resultat.
              p.text Ändra filterinställningarna och försök igen.
</template>

<script>
  import VProduct from '@/components/blocks/home/Product'
  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapState('list', [
        'vehicles',
        'pagination',
        'vehiclesLoaded'
      ]),
      ...mapGetters('list', [
        'nextPage',
        'getSortedVehicles'
      ])
    },
    watch: {
      selectedBrands: function () {
        this.loadVehicles()
        this.setSelectedModels([])
        this.setSelectedTypes([])
        this.setSelectedFuel([])
        this.setModels([])
        this.setTypes([])
        this.setFuel([])
      },
      selectedModels: function () {
        this.loadVehicles()
        this.setSelectedTypes([])
        this.setSelectedFuel([])
        this.setTypes([])
        this.setFuel([])
      },
      selectedTypes: function () {
        this.loadVehicles()
        this.setSelectedFuel([])
        this.setFuel([])
      },
      selectedFuel: function () {
        this.loadVehicles()
      }
    },
    methods: {
      ...mapActions('list', [
        'getVehicles'
      ]),
      loadMore() {
        this.getVehicles({page: this.nextPage})
      }
    },
    mounted() {
      this.getVehicles(false)
    },
    components: {
      VProduct
    }
  }
</script>

<style lang="sass">
  .list
    padding: 15px 0
    .empty
      .title
        font-size: 32px
      .text
        font-size: 16px
</style>
