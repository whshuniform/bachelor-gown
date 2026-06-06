<template>
  <div
    class="preveiw"
    :class="{ 'center' : zoom.w !== null && $isMobile === false }"
    onselectstart="return false;"
    oncontextmenu="window.event.returnValue=false;"
  >

    <div
      v-if="quality"
      class="zoom-in"
      :class="{ mobile: zoom.w !== null && $isMobile === true }"
      :style="{ left: `${zoom.box.x}px`, top: `${zoom.box.y}px`, width: `${zoom.box.w}px`, height: `${zoom.box.h}px` }"
    >
      <Loading v-if="loading === true" />
      <picture>
        <source
          :srcset="require(`~/assets/image/${path}/${quality}/${name}.avif`)"
          type="image/avif"
        />
        <source
          :srcset="require(`~/assets/image/${path}/${quality}/${name}.jpg`)"
          type="image/jpeg"
        />
        <img
          :style="{ left: `${zoom.x}px`, top: `${zoom.y}px`, width: `${zoom.w}px`, height: `${zoom.h}px`, visibility:
        loading === false && zoom.y ? 'visible' : 'hidden' }"
          alt="學士服畢業大合照"
          title="學士服合照"
          :src="require(`~/assets/image/${path}/${quality}/${name}.jpg`)"
          @load="loadPhoto"
        />
      </picture>
      <!-- <img
        v-show="loading === false && zoom.y"
        :style="{ left: `${zoom.x}px`, top: `${zoom.y}px`, width: `${zoom.w}px`, height: `${zoom.h}px` }"
        :src="require(`~/assets/image/${path}/${quality}/${name}.jpg`)"
        @load="loadPhoto"
      /> -->
      <!-- <Photo
        v-show="loading === false && zoom.y"
        :style="{ left: `${zoom.x}px`, top: `${zoom.y}px`, width: `${zoom.w}px`, height: `${zoom.h}px` }"
        alt="學士服畢業大合照"
        title="學士服合照"
        :src="require(`~/assets/image/${path}/${quality}/${name}.jpg`)"
        @load="loadPhoto"
      /> -->
      <!-- <Photo
        :style="{ left: `${zoom.x}px`, top: `${zoom.y}px`, width: `${zoom.w}px`, height: `${zoom.h}px`, visibility:
        loading === false && zoom.y ? 'visible' : 'hidden' }"
        alt="學士服畢業大合照"
        title="學士服合照"
        :src="`/${path}/${quality}/${name}.jpg`"
        @load="loadPhoto"
      /> -->
    </div>

    <div
      v-if="name"
      ref="preview"
      style="display: block; position: relative;"
    >
      <picture>
        <source
          :srcset="require(`~/assets/image/${path}/s/${ name }.avif`) + ' 1080w, ' +
         require(`~/assets/image/${path}/m/${ name }.avif`) + ' 1440w'"
          type="image/avif"
        />
        <source
          :srcset="require(`~/assets/image/${path}/s/${ name }.jpg`) + ' 1080w, ' +
         require(`~/assets/image/${path}/m/${ name }.jpg`) + ' 1440w'"
          type="image/jpeg"
        />
        <img
          alt="學士服畢業大合照"
          title="學士服合照"
          ref="photo"
          style="width: 100%;"
          :srcset="require(`~/assets/image/${path}/s/${ name }.jpg`) + ' 1080w, ' +
         require(`~/assets/image/${path}/m/${ name }.jpg`) + ' 1440w'"
          :src="require(`~/assets/image/${path}/m/${ name }.jpg`)"
        />
      </picture>
      <!-- <img
        alt="學士服畢業大合照"
        title="學士服合照"
        ref="photo"
        style="width: 100%;"
        :srcset="require(`~/assets/image/${path}/s/${ name }.jpg`) + ' 1080w, ' +
        require(`~/assets/image/${path}/m/${ name }.jpg`) + ' 1440w'"
        :src="require(`~/assets/image/${path}/m/${ name }.jpg`)"
      /> -->
      <!-- <Photo
        alt="學士服畢業大合照"
        title="學士服合照"
        ref="photo"
        style="width: 100%;"
        :srcset="[{ path: require(`~/assets/image/${path}/s/${ name }.jpg`), definition: '1080w' }, { path:
        require(`~/assets/image/${path}/m/${ name }.jpg`), definition: '1440w' }]"
        :src="require(`~/assets/image/${path}/m/${ name }.jpg`)"
      /> -->

      <div
        v-if="touchpad.top"
        ref="touchpad"
        class="touchpad"
        :style="{ left: `${touchpad.left}px`, top: `${touchpad.top}px`, width: `${touchpad.w}px`, height: `${touchpad.h}px` }"
        @mousedown="touchdown"
        @touchstart="touchdown"
        @mousemove="touchmove"
        @touchmove.prevent="touchmove"
        @mouseup="touchend"
        @touchend="touchend"
      ></div>

    </div>

    <div
      class="preview-close"
      @click="close"
    >
      <span></span>
      <span></span>
    </div>

    <div
      class="preview-download-block"
      @click.stop="download"
    >
      <div class="preview-download"> </div>
    </div>


  </div>
</template>

<script>
  import Photo from '@/components/Photo'
  import Loading from '@/components/Loading'

  import {
    resizeObserver,
    downloadImage
  } from '@/assets/js/util.js'


  export default {
    props: {
      path: {
        default: null
      },
      quality: {
        default: null
      },
      name: {
        default: null
      },
      size: {
        default: () => {
          return {
            w: 0,
            h: 0
          }
        }
      },
      center: {
        default: () => {
          return {
            x: 0,
            y: 0
          }
        }
      }
    },
    components: {
      Photo,
      Loading
    },
    data() {
      return {
        zoom: {
          w: null,
          h: null,
          x: null,
          y: null,
          box: {
            w: 0,
            h: 0,
            x: 0,
            y: 0,
          },
          ratio: {
            x: 0,
            y: 0
          },
        },
        touchpad: {
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          left: 0,
          top: 0
        },
        start: {
          x: 0,
          y: 0
        },
        flags: false,

        loading: true
      }
    },
    mounted() {
      if (process.browser) {
        this.setPosition()
        this.setSize()
      }
    },
    methods: {
      loadPhoto() {
        console.log('loadPhoto ====');
        this.setConfig()
      },
      setConfig() {
        this.showHint()
        this.$nextTick(() => {
          this.setSize()
          this.setPosition()
          this.loading = false
          let resize = resizeObserver(() => {
            this.setSize()
            this.setPosition()
          })
          resize.observe(this.$refs.preview)

          this.$once("hook:beforeDestroy", () => {
            resize.disconnect()
          });
        })
      },
      showHint() {
        let hint = localStorage.getItem('preview-hint')
        if (hint === null || this.checkTimeExpiration(JSON.parse(hint)) === true) {
          let msg = ''

          if (this.$isMobile === true) {
            msg = '使用手指輕觸'
          } else {
            msg = '使用滑鼠點擊'
          }

          this.$toastr.Add({
            type: 'info',
            title: "",
            msg: `${msg}並拖曳照片中的紫色區域上下左右滑動，可以選擇想要放大照片中的部分，看看其他同學美麗的倩影 🥳`,
            timeout: 10000,
            clickClose: true,
            position: 'toast-top-center'
          });

          hint = {
            expiration: Date.now(),
            data: true
          }

          localStorage.setItem('preview-hint', JSON.stringify(hint))
        }
      },
      checkTimeExpiration(data) {
        const now = Date.now()
        return (now - data.expiration) / 1000 / 60 / 60 / 24 > 30
      },
      setSize() {
        if (!this.$refs.preview) {
          return
        }

        const w = this.$refs.preview.offsetWidth
        const h = window.innerHeight
        const imgH = w * this.size.h / this.size.w

        if (this.$isMobile === true) {
          this.zoom.box.w = w
          this.zoom.box.h = h - imgH

          this.touchpad.w = (w / this.size.w) * w
          this.touchpad.h = (imgH / this.size.h) * this.zoom.box.h
        } else {
          const boxSize = 0.3 * w
          const padSize = (boxSize / this.size.w) * w

          this.zoom.box.w = boxSize
          this.zoom.box.h = boxSize

          this.touchpad.w = padSize
          this.touchpad.h = padSize
        }

        this.zoom.ratio.x = (this.size.w - this.zoom.box.w) / (w - this.touchpad.w)
        this.zoom.ratio.y = (this.size.h - this.zoom.box.h) / (imgH - this.touchpad.h)

        this.zoom.w = this.size.w
        this.zoom.h = this.size.h

        if (this.isRetina() === true || this.$isMobile === true) {
          this.touchpad.w *= 2
          this.touchpad.h *= 2
          this.zoom.ratio.x /= 2
          this.zoom.ratio.y /= 2
          this.zoom.w /= 2
          this.zoom.h /= 2
        }
      },
      setPosition() {
        if (!this.$refs.photo) {
          return
        }

        const x = this.$refs.photo.offsetWidth * this.center.x - this.touchpad.w / 2
        const y = this.$refs.photo.offsetHeight * this.center.y - this.touchpad.h / 2
        this.setZoomPosition(x, y)

        if (this.$isMobile === false) {
          const left = this.touchpad.left + 10 + this.touchpad.w
          const top = this.touchpad.top - this.zoom.box.h / 2
          this.setZoomBoxPosition(left, top)
        }
      },
      setZoomPosition(x = 0, y = 0) {
        this.touchpad.left = x;
        this.touchpad.top = y;

        this.zoom.x = -x * this.zoom.ratio.x
        this.zoom.y = -y * this.zoom.ratio.y
      },
      setZoomBoxPosition(x = 0, y = 0) {
        this.zoom.box.x = x
        this.zoom.box.y = y
      },
      isRetina() {
        return ((window.matchMedia && (window.matchMedia(
          `only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and
      (min-resolution: 75.6dpcm)`
        ).matches || window.matchMedia(
          `only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only
      screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)`
        ).matches)) || (window.devicePixelRatio && window.devicePixelRatio >= 2)) && /(iPad|iPhone|iPod)/g.test(
          navigator.userAgent);
      },
      touchdown(event) {
        if (this.loading === true) {
          return
        }
        this.flags = true; //是否開啟拖拽

        const touch = event.touches ? event.touches[0] : event;
        this.start.x = touch.clientX;
        this.start.y = touch.clientY;
        this.touchpad.x = this.$refs.touchpad.offsetLeft;
        this.touchpad.y = this.$refs.touchpad.offsetTop;
      },
      touchmove(event) {
        if (this.flags === true && this.loading === false) {
          const touch = event.touches ? event.touches[0] : event;

          const moveWidth = this.$refs.photo.offsetWidth;
          const moveHeight = this.$refs.photo.offsetHeight;
          const moveX = touch.clientX - this.start.x;
          const moveY = touch.clientY - this.start.y;

          var x;
          var y = this.touchpad.y + moveY;

          if (this.touchpad.x + moveX <= 0) {
            x = 0;
          } else if (this.touchpad.x + moveX >= moveWidth - this.touchpad.w) {
            x = moveWidth - this.touchpad.w;
          } else {
            x = this.touchpad.x + moveX;
          }

          if (this.touchpad.y + moveY < 1) {
            y = 0.5;
          } else
          if (this.touchpad.y + moveY >= moveHeight - this.touchpad.h) {
            y = moveHeight - this.touchpad.h;
          } else {
            y = this.touchpad.y + moveY;
          }

          this.setZoomPosition(x, y)

          if (this.$isMobile === false) {
            var left = this.touchpad.left + 10 + this.touchpad.w

            if (left >= moveWidth - this.zoom.box.w) {
              left = this.touchpad.left - 10 - this.zoom.box.w
            }
            this.setZoomBoxPosition(left, this.touchpad.top - this.zoom.box.h / 2)
          }
        }
      },
      touchend() {
        this.flags = false;
      },
      close() {
        this.$emit('close')
      },
      download() {
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

        const href = require(`~/assets/image/${this.path}/${this.quality}/${this.name}.jpg`)
        console.log('url', location.origin + href)

        downloadImage(location.origin + href, `${this.name}.jpg`)
      }
    },
  }
</script>

<style>
  .preveiw {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    touch-action: none;
    -webkit-overflow-scrolling: touch;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 2013;
  }

  .touchpad {
    position: absolute;
    display: block;
    touch-action: none;
    z-index: 2;
    background-color: purple;
    opacity: 0.5;
  }

  .zoom-in {
    z-index: 10;
    overflow: hidden;
    position: absolute;
    box-shadow: rgba(0, 0, 0, 0.9) 0px 2px 13px 0px;
  }

  .zoom-in.mobile {
    position: relative;
  }

  .zoom-in img {
    position: absolute;
    z-index: 5;
  }

  .preview-close {
    position: fixed;
    top: 15px;
    left: 15px;
    background: rgba(55, 55, 55, 0.5);
    width: 45px;
    height: 45px;
    border-radius: 50%;
    cursor: pointer;
    user-select: none;
    box-sizing: border-box;
    z-index: 3000;
  }

  .preview-close span {
    position: absolute;
    display: block;
    left: 10px;
    top: 22px;
    background: white;
    height: 2px;
    width: 25px;
    border-radius: 1px;
  }

  .preview-close span:nth-child(1) {
    transform: rotate(45deg);
  }

  .preview-close span:nth-child(2) {
    transform: rotate(135deg);
  }

  .preview-close:hover {
    background: rgba(70, 70, 70, 0.5);
  }



  .preview-download {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    box-sizing: border-box;
    background: rgba(55, 55, 55, 0.5);
    z-index: 10;
    cursor: pointer;
  }

  .preview-download::before,
  .preview-download::after {
    content: "";
    display: block;
    position: absolute;
  }

  .preview-download::before {
    top: 12px;
    left: 16.5px;
    width: 12px;
    height: 12px;
    background: #fff;
  }

  .preview-download::after {
    top: 23px;
    left: 10.5px;
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 12px 12px 0 12px;
    border-color: #fff transparent transparent transparent;
  }


  @media only screen and (-webkit-min-device-pixel-ratio: 2),
  only screen and (min--moz-device-pixel-ratio: 2),
  only screen and (-o-min-device-pixel-ratio: 2/1),
  only screen and (min-device-pixel-ratio: 2),
  only screen and (min-resolution: 192dpi),
  only screen and (min-resolution: 2dppx) {}
</style>
