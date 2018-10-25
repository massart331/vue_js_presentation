<template lang="pug">
  .pre-loader(:class="[ show ? 'show' : '', size ]")
    slot.content
</template>

<script>
  export default {
    props: {
      show: {
        default: true
      },
      size: {
        default: 'sm'
      }
    },
  }
</script>

<style lang="sass">
  .pre-loader
    position: relative
    &::before
      z-index: 0
      transition: 0.5s
    &.show
      &::before
        content: ''
        position: absolute
        width: 100%
        height: 100%
        background: #fff
        z-index: 10
      &::after
        content: ""
        width: 50px
        height: 50px
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        margin: auto
        border-radius: 50%
        border: 3px solid transparent
        border-top-color: #fccb04
        animation: spin 1.5s linear infinite
        z-index: 50
    .sm
      &::after
        width: 20px
        height: 20px
    .md
      &::after
        width: 30px
        height: 30px
    .lg
      &::after
        width: 50px
        height: 50px

    @keyframes spin
      0%
        transform: rotate(0deg)
      100%
        transform: rotate(360deg)
</style>