<template>
  <div>
    <Preview
      v-if="quality"
      :path="session"
      :quality="quality"
      :name="name"
      :size="size"
      :center="center"
      @close="closePreview"
    />
  </div>
</template>

<script>
  import Preview from '@/components/Preview'
  import {
    decrypt
  } from '@/assets/js/crypto'

  export default {
    head() {
      return {
        title: '學士服合照放大預覽｜學士服｜文華高中制服日',
        meta: [{
            hid: 'description',
            name: 'description',
            content: '拖曳照片中的紫色區域上下左右滑動，可以選擇想要放大照片中的部分，看看其他同學美麗的倩影 🥳'
          },
          {
            hid: 'og:title',
            property: 'og:title',
            content: '學士服合照放大預覽｜學士服｜文華高中制服日'
          },
          {
            hid: 'og:description',
            property: 'og:description',
            content: '拖曳照片中的紫色區域上下左右滑動，可以選擇想要放大照片中的部分，看看其他同學美麗的倩影 🥳'
          },
          // {
          //   hid: 'og:url',
          //   property: 'og:url',
          //   content: `/photo/${this.id}`
          // },
          // {
          //   hid: 'og:image',
          //   property: 'og:image',
          //   content: require(
          //     `~/assets/image/${this.session}/m/${this.name}.jpg`)
          // },
          {
            hid: 'og:image',
            property: 'og:image',
            content: 'https://whshuniform.github.io/bachelor-gown/assets/img/20201205_135119.8795c31.jpg'
          },
          {
            hid: 'og:image:width',
            property: 'og:image:width',
            content: '2048'
          },
          {
            hid: 'og:image:height',
            property: 'og:image:height',
            content: '877'
          },
        ],
        link: [
          { rel: 'canonical', href: 'https://whshuniform.github.io/bachelor-gown/' }
        ]

      }
    },
    layout: "fullScreen",
    components: {
      Preview
    },
    data() {
      return {
        isInitial: false,
        quality: null,
        session: null,
        name: null,
        size: null,
        center: null,
        title: null,
        description: null,
      }
    },
    // created() {

    //   // this.title = Object.freeze(`${data.session}屆 學士服合照放大預覽｜學士服｜文華高中制服日`)
    //   // this.description = Object.freeze(`拖曳照片中的紫色區域上下左右滑動，可以選擇想要放大照片中的部分，看看其他同學美麗的倩影 🥳`)

    //   console.log('router', this.$route.query, this.$route.params)
    // },
    mounted() {
      try {
        const i = this.$route.query.i
        if (!i) throw new Error('missing i')

        const decrypted = decrypt(i, 'wh', 'grad')
        const data = JSON.parse(decrypted)

        const session = parseInt(data.session)
        if (!Number.isInteger(session) || session < 21 || session > 31) {
          throw new Error('invalid session')
        }

        const VALID_QUALITY = ['s', 'm', '6k', '7k', '9k', '12k']
        if (!VALID_QUALITY.includes(data.quality)) {
          throw new Error('invalid quality')
        }

        if (!/^\d{8}_\d{6}$/.test(data.name)) {
          throw new Error('invalid name')
        }

        this.quality = data.quality
        this.session = String(session)
        this.name = data.name
        this.size = data.size
        this.center = data.center

        if (process.browser) {
          window.onload = () => {
            this.isInitial = true
          }
        }
      } catch (e) {
        this.$router.replace('/')
      }
    },
    methods: {
      closePreview() {
        if (this.isInitial === true) {
          this.$router.push(`/${this.session}`)
        } else {
          this.$router.go(-1)
        }
      }
    },
  }

</script>

<style>

</style>
