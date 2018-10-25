<template lang="pug">
  header
    .top
      .container
        .row
          .col-md-12
            router-link.navbar-brand.logo(:to="{name: 'home'}")
              img(:src="resellerInfo.logo" :alt="resellerInfo.name")
    .bottom(:class="{hidden: (String)($route.name).includes('step')}")
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'VHeader',
    computed: {
      ...mapState('reseller', ['resellerInfo'])
    },
  }
</script>

<style lang="sass">
  header
    .custom-container
      max-width: 1248px
      margin: auto
    background: #fff
    .top
      padding: 25px 0
    .bottom
      height: 200px
      background: url("~@/assets/img/header-bg.jpg") no-repeat
      background-position-y: center
      background-position-x: 80%
      background-size: cover
      &.hidden
        display: none

    .logo
      display: inline-block
      height: 50px
      img
        height: 50px
    .navbar
      padding: 0 !important
    .navbar-nav
      li.nav-item
        &:hover
          .nav-link
            &::before
              background: #ffcc00
              width: 60%
        .nav-link
          position: relative
          display: inline-block
          color: #000
          font-size: 16px
          font-weight: 700
          text-transform: uppercase
          padding: 10px 10px
          margin: 0 40px
          @media screen and (max-width: 1200px)
            margin: 0 10px
          @media screen and (max-width: 992px)
            margin: 0
          @media screen and (max-width: 768px)
            padding-left: 0
            &::before
              margin: 0 !important
          &::before
            content: ''
            position: absolute
            left: 0
            right: 0
            top: 100%
            width: 0
            height: 2px
            margin: auto
            background: transparent
            transition: .2s
</style>
