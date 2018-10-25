<template lang="pug">
  footer
    .container
      .row
        .col-md-12
          span © 2018

</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'VFooter',
    computed: {
      ...mapState('reseller', ['resellerInfo'])
    },
  }
</script>

<style lang="sass">
  footer
    padding: 50px 0 30px
    background: #000
    color: #fff
    a
      color: #fff
      &:hover, &:active, &:focus
        color: #ffcc00
        text-decoration: none
</style>
