<template lang="pug">
  .filter
    v-collapse-box(:min-height="0", :always-show="filterShow" button-position="top")
      .btn-collapse(slot="button" slot-scope="data")
        span.text(v-if="!data.show") Visa filter
        span.text(v-else) Stäng filter
        span.bar(:class="{show:data.show}")
      .container
        .row
          .col-md-12
            .filter-container
              .filter-item
                v-drop-down(
                :options="brands"
                v-model="selectedBrands"
                :disabled="brandsDisabled"
                option-label="name"
                option-value="id"
                label="Välj märke"
                :multiple="true"
                @changed="loadModels"
                )
              .filter-item
                v-drop-down(
                :options="models"
                v-model="selectedModels"
                :disabled="modelsDisabled"
                :multiple="true"
                option-label="name"
                option-value="id"
                label="Välj modell"
                @changed="loadTypes"
                )
              .filter-item
                v-drop-down(
                :options="types"
                v-model="selectedTypes"
                :disabled="typesDisabled"
                :multiple="true"
                option-label="name"
                option-value="id"
                label="Välj biltyp"
                @changed="loadFuel"
                )
              .filter-item
                v-drop-down(
                :options="fuel"
                v-model="selectedFuel"
                :multiple="true"
                :disabled="fuelDisabled"
                option-label="name"
                option-value="id"
                label="Välj drivmedel"
                )
              .filter-item
                button.btn.btn-search.btn-hover(@click="loadVehicles") Sök Bilar
</template>

<script>
  import VDropDown from '@/components/controls/DropDown'
  import VCollapseBox from './../../helps/CollapseBox'
  import WindowWidth from '@/mixins/WindowWidth'

  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
    mixins: [WindowWidth],
    computed: {
      ...mapState('filter', [
        'brands',
        'models',
        'types',
        'fuel'
      ]),
      selectedBrands: {
        get() {
          return this.$store.state.list.selectedBrands
        },
        set(value) {
          this.$store.commit('list/setSelectedBrands', value)
        }
      },
      selectedModels: {
        get() {
          return this.$store.state.list.selectedModels
        },
        set(value) {
          this.$store.commit('list/setSelectedModels', value)
        }
      },
      selectedTypes: {
        get() {
          return this.$store.state.list.selectedTypes
        },
        set(value) {
          this.$store.commit('list/setSelectedTypes', value)
        }
      },
      selectedFuel: {
        get() {
          return this.$store.state.list.selectedFuel
        },
        set(value) {
          this.$store.commit('list/setSelectedFuel', value)
        }
      },
      brandsDisabled() {
        return this.brands.length === 0
      },
      modelsDisabled() {
        return this.selectedBrands.length === 0 || this.selectedBrands.length > 1 || this.models.length === 0
      },
      typesDisabled() {
        return this.types.length === 0
      },
      fuelDisabled() {
        return this.fuel.length === 0
      },
      filterShow() {
        return this.windowWidth > 762
      }
    },
    mounted() {
      this.getBrands();
      this.getTypes({});
      this.getFuel({})
    },
    watch: {
      selectedBrands: function () {
        this.setSelectedModels([]);
        this.setSelectedTypes([]);
        this.setSelectedFuel([]);
        this.setModels([]);
        this.setTypes([]);
        this.setFuel([])

      },
      selectedModels: function () {
        this.setSelectedTypes([]);
        this.setSelectedFuel([]);
        this.setTypes([]);
        this.setFuel([])
      },
      selectedTypes: function () {
        this.setSelectedFuel([]);
        this.setFuel([])
      },
      selectedFuel: function () {
      }
    },
    methods: {
      ...mapActions('filter', [
        'getBrands',
        'getModels',
        'getTypes',
        'getFuel'
      ]),
      ...mapMutations('filter', [
        'setModels',
        'setTypes',
        'setTypes',
        'setFuel'
      ]),
      ...mapActions('list', [
        'getVehicles',
      ]),
      ...mapMutations('list', [
        'setSelectedBrands',
        'setSelectedModels',
        'setSelectedTypes',
        'setSelectedFuel'
      ]),
      loadModels(value) {
        if (value.length === 1)
          this.getModels(value[0])
      },
      loadTypes(value) {
        this.getTypes({brands: this.selectedBrands, models: value})
      },
      loadFuel() {
        this.getFuel({brands: this.selectedBrands, models: this.selectedModels, types: this.selectedTypes})
      },
      loadVehicles() {
        this.getVehicles(false)
      }
    },
    components: {
      VDropDown,
      VCollapseBox
    }
  }
</script>

<style lang="sass">
  .filter
    padding: 40px 0 70px
    background: #808285
    color: #fff
    display: flex
    justify-content: center
    h3
      margin-bottom: 30px
    .btn.btn-search
      width: 100%
      padding: 7px 20px
      border-radius: 0
      background: #ffcc00
      color: #000
      &:active, &:focus
        outline: none
        box-shadow: none
    &-container
      margin: 0 -7.5px
      display: flex
      flex-direction: row
      justify-content: center
      align-items: flex-end
    &-item
      padding: 0 7.5px
      width: 180px
      @media screen and (max-width: 480px)
        width: 50%
        padding: 0 3px
      .dropdown
        width: 100%
    @media screen and (max-width: 768px)
      padding: 10px 0
      &-container
        display: block
      &-item
        display: inline-block
        margin: 0 0 10px
    .btn
      &-collapse
        padding: 5px 15px
        position: relative
        transition: 0.5s
        align-items: center
        display: flex
        justify-content: flex-end
        @media screen and (max-width: 480px)
          margin: 0 20px
        .text
          margin-right: 30px
          vertical-align: middle
          font-size: 10px
        .bar
          position: absolute
          width: 20px
          height: 2px
          background: #fff
          margin: auto
          top: 0
          bottom: 0
          transition: 0.5s
          &::before, &::after
            content: ''
            position: absolute
            width: inherit
            height: inherit
            background: #fff
            left: 0
            transition: inherit
          &::before
            top: -7px
          &::after
            bottom: -7px
          &.show
            background: transparent
            &::before
              transform: translateY(7px) rotateZ(45deg)

            &::after
              transform: translateY(-7px) rotateZ(-45deg)
</style>
