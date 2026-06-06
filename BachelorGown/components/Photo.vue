<template>
  <picture
    v-if="src"
    class="full"
  >
    <source
      :srcset="require(`~/assets/image${avifPath}`)"
      type="image/avif"
    />
    <source
      :srcset="require(`~/assets/image${src}`)"
      type="image/jpeg"
    />
    <img
      class="image-inner"
      :src="require(`~/assets/image${src}`)"
      :title="title"
      :alt="alt"
      loading="lazy"
      @load="load"
    />
  </picture>
</template>

<script>
  export default {
    props: {
      src: {
        type: String,
        default: null,
      },
      fileName: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        default: null,
      },
      alt: {
        type: String,
        default: null,
      },
    },
    computed: {
      // path() {
      //   if (!this.src) {
      //     return ''
      //   }
      //   console.log('src', this.src);
      //   console.log('require', `${require('../assets/image/29/s/20231202_143702.jpg')}`);

      //   return require('../assets/image/29/s/20231202_143702.jpg')
      //   //return require(`${this.src}`)
      // },
      avifPath() {
        if (!this.src) {
          return '';
        }

        let paths = this.src.split(".")
        paths.pop()
        console.log('->', this.src)
        console.log('-', paths.join('.') + ".avif")
        return paths.join('.') + ".avif";
      }
    },
    methods: {
      // convertPath(path) {
      //   return require(path)
      // },
      // convertWepPPath(path) {
      //   if (!path) {
      //     return;
      //   }

      //   return path.split(".")[0] + ".webp";
      // },
      load() {
        console.log('load');
        this.$emit('load')
      }
    },
  };

</script>

<style>
  .full {
    width: 100%;
    height: 100%;
  }

  .image-inner {
    position: relative;
    display: inline-block;
    overflow: hidden;
  }

</style>
