<template lang="pug">
  .drop-down(:class="{'active': show}" :ref="generateRef('dropDown')")
    label {{ label }}
    button.drop-down-toggle(:ref="generateRef('toggle')" :disabled="disabled" :readonly="suitable") {{ selectedValues }}
    .drop-down-menu(v-show="show" :ref="generateRef('menu')")
      .drop-down-menu-item(
      :ref="generateRef('menuItem')"
      v-for="option in options"
      :key="option.id"
      :class="{active: isActive(option[optionValue])}"
      @click="update(option[optionValue] || option)")
        .checkbox
        span {{ option[optionLabel] || option }}
</template>

<script>
  export default {
    data: () => ({
      show: false,
    })
    ,
    props: {
      optionLabel: {},
      optionValue: {},
      options: {},
      label: {},
      multiple: {
        default: false
      },
      disabled: {
        default: false
      },
      value: {
        default: () => []
      },
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    watch: {
      value: function (value) {
        this.$emit('changed', value)
      }
    },
    computed: {
      suitable() {
        return this.options !== [] && this.options && this.options !== 'undefined'
      },
      selectedValues() {
        let value = this.options
            .filter(option => this.value.includes(option.id))
            .map(option => option[this.optionLabel])

        return value.length <= 1 ? value[0] || 'Alla' : this.countSelected
      },
      countSelected() {
        return `${this.value.length} av ${this.options.length} val`
      },
    },
    methods: {
      generateRef(ref) {
        return `${ref}_${this._uid}`
      },
      update(value) {
        if (this.multiple) {
          let index = this.value.indexOf(value)
          if (index !== -1) {
            this.value.splice(index, 1)
          } else {
            this.value.push(value)
          }
          this.$emit('change', this.value)
        } else {
          this.$emit('change', value)
        }
      },
      showToggle() {
        this.show = !this.show
      },
      isActive(value) {
        if (this.multiple) {
          return this.value.includes(value)
        } else {
          return this.value === value
        }
      },
      close(e) {
        let target = e.target,
            toggle = this.$refs[this.generateRef('toggle')],
            menuItems = this.$refs[this.generateRef('menuItem')]

        if (this.show) {
          const menuHasTarget = menuItems.includes(target)

          if (!menuHasTarget || target === toggle) {
            this.show = false
          }
        } else {
          if (target === toggle) this.showToggle()
        }
      }
    },
    mounted() {
      document.addEventListener('mousedown', this.close)
    }
  }
</script>

<style lang="sass">
  .drop-down
    width: 100%
    position: relative
    text-align: left
    &-toggle
      height: 40px
      width: 100%
      background: #E5E4E5
      font-size: 12px
      padding: 10px 15px
      text-align: left
      border: none
      color: #555
      position: relative
      display: inline-block
      font-style: normal
      font-variant: normal
      text-rendering: auto
      line-height: 1
      transition: 0.5s
      overflow: hidden
      &.active, &:active, &:focus
        outline: none
      &::after
        content: ''
        background: url("~@/assets/img/arrow.svg") no-repeat
        background-size: 50%
        background-position: 50% 45%
        position: absolute
        margin: auto
        top: 0
        right: 10px
        bottom: 0
        height: 23px
        width: 23px
        text-align: center
        padding: 4px
        transition: 0.5s
        font-size: xx-large
      &:disabled
        background: #ccc
        cursor: not-allowed
      &:hover
        cursor: pointer
        &:disabled
          cursor: not-allowed !important
    &.active
      button
        &::after
          transform: rotate(-180deg)
    &-menu
      color: #000
      position: absolute
      top: 100%
      left: 0
      width: auto
      min-width: 100%
      background: #fff
      margin-top: 2px
      z-index: 999
      border: 1px solid #ccc
      &-item
        display: flex
        align-items: center
        margin: 5px
        padding: 3px 5px
        background: #e8e8e8
        transition: 0.5s
        position: relative
        &:hover
          cursor: pointer
        &::before
          position: absolute
          width: 100%
          height: 100%
          z-index: 5
          background: transparent
          top: 0
          left: 0
          content: ''
        &:not(:last-child)
          margin-bottom: 3px
        &.active
          background: #ffcc00
</style>
