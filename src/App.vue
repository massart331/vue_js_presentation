<template lang="pug">
  .wrapper
    v-header
    router-view.content
    v-footer
</template>

<script>
  import VHeader from '@/components/parts/Header'
  import VFooter from '@/components/parts/Footer'

  export default {
    components:{
      VHeader,
      VFooter
    }
  }
</script>

<style lang="sass">
  @import "~@fortawesome/fontawesome-free/css/solid.min.css"

  .wrapper
    display: flex
    min-height: 100vh
    flex-direction: column
    .content
      flex: 1
</style>
