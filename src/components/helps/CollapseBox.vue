<template lang="pug">
  .collapse-box
    .collapse-button(@click="toggleShow" v-if="!alwaysShow && isTop")
      slot(name="button" :show="show")
        span.m-t-25.m-b-10.equipment-list-show
          span(v-if="!show") Se mer av utrustningslistan
          span(v-else) Se mindre av utrustningslistan
          i.fas.fa-chevron-down.arrow(:class="{turn:show}")
    .collapse-content(:style="styleContent", :class="{show:show || alwaysShow}" )
      .slot(ref="content")
        slot
    .collapse-button(@click="toggleShow" v-if="!alwaysShow && isBottom")
      slot(name="button" :show="show")
        span.m-t-25.m-b-10.equipment-list-show
          span(v-if="!show") Se mer av utrustningslistan
          span(v-else) Se mindre av utrustningslistan
          i.fas.fa-chevron-down.arrow(:class="{turn:show}")

</template>

<script>
  import WindowWidth from '@/mixins/WindowWidth'

  export default {
    mixins: [WindowWidth],
    props: {
      minHeight: {
        default: 80
      },
      alwaysShow: {
        default: false
      },
      overflow: {
        default: false
      },
      buttonPosition: {
        default: 'bottom'
      }
    },
    data: () => ({
      show: false,
      height: 0
    }),
    computed: {
      computedMinHeight() {
        return this.height > this.minHeight ? this.minHeight : this.height
      },
      heightContent() {
        return this.show || this.alwaysShow ? `height:${this.height}px;` : `height:${this.computedMinHeight}px;`
      },
      overflowConent() {
        if (!this.show) {
          if (this.overflow) {
            return 'overflow: hidden'
          } else {
            if (!this.alwaysShow) return 'visibility: hidden; opacity: 0;';
            return ''
          }
        }
      },
      styleContent() {
        return `${this.heightContent} ${this.overflowConent}`
      },
      isTop() {
        return this.buttonPosition === 'top'
      },
      isBottom() {
        return this.buttonPosition === 'bottom'
      }
    },
    methods: {
      toggleShow() {
        this.show = !this.show
      },
      getHeight() {
        this.$nextTick(() => this.height = this.$slots.default ? this.$slots.default[0].elm.clientHeight : 0)
      }
    },
    mounted() {
      this.getHeight()
      window.addEventListener('resize', this.getHeight)
    },
    updated() {
      this.getHeight()
    }
  }
</script>

<style lang="sass" scoped>
  .collapse
    &-box
      text-align: right
    &-content
      transition: 0.5s all linear
      list-style: none
      position: relative
      text-align: center
      &:after
        content: ''
        position: absolute
        bottom: 0
        left: 0
        width: 100%
        height: 35px
        background: linear-gradient(to top, #fff, rgba(255, 255, 255, .5), transparent)
        transition: .5s
      &.show
        visibility: inherit
        opacity: 1
        &:after
          height: 0

    &-button
      position: relative
      text-align: right
      &:hover
        cursor: pointer
      &::after, &::before
        content: ''
        clear: both
        display: block
      .arrow
        transition: 0.5s
        &.turn
          transform: rotate(180deg)
</style>
