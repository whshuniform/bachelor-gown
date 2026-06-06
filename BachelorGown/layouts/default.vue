<template>
  <div>
    <PageHeader />
    <div
      class="main container"
      onselectstart="return false;"
      oncontextmenu="window.event.returnValue=false;"
    >
      <Nuxt />
    </div>

  </div>
</template>

<script>
  import PageHeader from '@/components/PageHeader'
  import '@/assets/css/common.css'
  import '@/assets/css/disble-select.css'
  import '@/assets/js/disble-copycat.js'

  export default {
    components: {
      PageHeader,

    },
  }

</script>

<style>
  .main {
    position: initial;
    margin-top: 55px;
    padding: 0.5em 0;
  }

</style>
