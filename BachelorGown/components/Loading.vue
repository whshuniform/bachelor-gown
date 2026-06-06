<template>
  <div class="loading-spinner">
  </div>
</template>

<script>
  export default {

  }

</script>

<style>
  .loading-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .loading-spinner {
    display: inline-block;
    border: 4px solid hsl(222 100% 95%);
    border-left-color: hsl(243 80% 62%);
    border-radius: 50%;
    width: 60px;
    height: 60px;
    position: absolute;
    top: calc(50% - 30px);
    left: calc(50% - 30px);
    animation: donut-spin 1.2s linear infinite;
  }

  @keyframes donut-spin {
    to {
      transform: rotate(1turn);
    }
  }

</style>
