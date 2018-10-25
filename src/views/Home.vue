<template lang="pug">
  .home
    v-filter
    v-list
</template>

<script>
  import VFilter from '@/components/blocks/home/Filter'
  import VList from '@/components/blocks/home/List'

  export default {
    name: 'Home',
    components: {
      VFilter,
      VList
    },
  }
</script>
