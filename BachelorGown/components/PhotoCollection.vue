<template>
  <ul class="photo-group">
    <li
      class="photo-cell animated fade-in-up"
      v-for="(item, i) in list"
      :key="'i' + i"
      :style="{ 'animation-delay': `${i / 5}s` }"
    >
      <a
        class="photo-link draw meet"
        @click="showPreview(item)"
      >
        <Photo
          alt="學士服畢業大合照"
          title="學士服合照"
          :src="`${basePath}/${item.name}.jpg`"
        />
        <!-- :src="require(`~/assets/image${basePath}/${item.name}.jpg`)" -->
        <div
          class="download-block"
          @click.stop="download(item.name)"
        >
          <div class="btn-download"> </div>
        </div>

      </a>
    </li>
  </ul>
</template>

<script>
  import Preview from '@/components/Preview'
  import Photo from '@/components/Photo'

  import {
    downloadImage
  } from '@/assets/js/util.js'


  export default {
    props: {
      basePath: {
        type: String,
        default: ''
      },
      downloadBasePath: {
        type: String,
        default: ''
      },
      list: {
        type: Array,
        default: () => []
      },
      // session: {},
      // quality: {},
      // size: {},
      // center: {},
    },
    components: {
      Preview,
      Photo
    },
    data() {
      return {

      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      download(name) {
        if (this.$downloadErrMsg) {
          this.$toastr.Add({
            type: 'warning',
            title: "",
            msg: this.$downloadErrMsg,
            timeout: 10000,
            clickClose: true,
          });
          return
        }

        console.log('--------', `~/assets/image/${this.downloadBasePath}/${name}.jpg`)
        const href = require(`~/assets/image${this.downloadBasePath}/${name}.jpg`)
        console.log('url', location.origin + href)

        downloadImage(location.origin + href, `${name}.jpg`)
      },
      showPreview(item) {
        this.$emit('show-preview', item);
        // const quality = this.quality,
        //   size = this.size,
        //   center = this.center,
        //   session = this.session, //this.$route.params.class
        //   name = item.name

        // const data = JSON.stringify({
        //   quality,
        //   size,
        //   center,
        //   session,
        //   name
        // })

        // const id = encrypt(data, 'wh', 'grad')

        // delay(this.$isMobile ? 500 : 0).then(() => {
        //   console.log('->', `/${this.$route.params.class}/picture?p=${name}&id=${id}`);
        //   this.$router.push(`/photo?i=${id}`)
        // })
      },
      closePreview() {
        this.preview.show = false
        this.preview.opacity = 0
      },
    },
  }
</script>

<style>
  .photo-group {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding-left: 0;
  }

  .photo-cell {
    width: 33.33%;
    padding: 5px;
  }

  .photo-link {
    position: relative;
    display: contents;
    cursor: pointer;
  }

  .photo-link img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .download-block {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 70px;
    height: 70px;
    cursor: pointer;
  }

  .btn-download {
    position: absolute;
    right: 18px;
    bottom: 18px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;
  }

  .btn-download::before,
  .btn-download::after {
    content: "";
    display: block;
    position: absolute;
  }

  .btn-download::before {
    top: 9px;
    left: 14px;
    width: 12px;
    height: 12px;
    background: #fff;
  }

  .btn-download::after {
    top: 20px;
    left: 8px;
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 12px 12px 0 12px;
    border-color: #fff transparent transparent transparent;
  }

  .draw {
    transition: color 0.25s;
  }

  .draw::before,
  .draw::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    z-index: 1;
    border: 2px solid transparent;
    box-sizing: inherit;
  }

  .draw::before {
    top: 15px;
    left: 15px;
  }

  .draw::after {
    top: 15px;
    left: 15px;
  }

  .draw:hover::before,
  .draw:hover::after {
    width: calc(100% - 30px);
    height: calc(100% - 30px);
  }

  .draw.meet:hover::before {
    border-top-color: white;
    border-right-color: white;
    transition: width 0.25s ease-out, height 0.25s ease-out 0.25s;
  }

  .draw.meet:hover::after {
    border-bottom-color: white;
    border-left-color: white;
    transition: height 0.25s ease-out, width 0.25s ease-out 0.25s;
  }

  .animated {
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
  }

  .fade-in-up {
    -webkit-animation-name: fade-in-up;
    animation-name: fade-in-up;
  }

  .delay {
    transition-delay: 1s;
  }

  @-webkit-keyframes fade-in-up {
    0% {
      opacity: 0;
      -webkit-transform: translateY(20px);
    }

    100% {
      opacity: 1;
      -webkit-transform: translateY(0);
    }
  }

  @keyframes fade-in-up {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media screen and (max-width: 500px) {

    .photo-cell {
      width: 50vw;
      height: 30vw;
      border-radius: 15px;
    }

    .photo img {
      height: 100%;
      object-fit: cover;
      border-radius: 6px;
      box-shadow: 0 1px 6px 0 silver;
    }

    .btn-download {
      position: absolute;
      right: 12px;
      bottom: 12px;
    }
  }
</style>
