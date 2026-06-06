<template>
  <a
    class="btn download overlay from-left"
    :style="{ 'pointer-events': loading === true ? 'none' : '' }"
    @click="onClick"
  >
    <span class="box-inner">
      <slot></slot>
    </span>
    <i class="icon-download box-inner"></i>
    <span
      v-if="loading === true"
      class="download-loading"
    >
      <Loading />
    </span>
  </a>
</template>

<script>
  import Loading from "@/components/Loading.vue";

  export default {
    components: {
      Loading,

    },
    props: {
      loading: {
        type: Boolean,
        default: false
      },
    },
    methods: {
      onClick() {
        this.$emit('click');
      },
    },
  }

</script>

<style>

</style>
