<template>
  <div>

    <div
      class="bg menu"
      v-for="(item, index) in list"
      :key="index"
    >

      <nuxt-link
        class="menu-link"
        :to="{path: `/${item.class}`}"
      >
        <div
          class="memory"
          :style="{'background-image': `url(${require(`~/assets/image/${item.path}.jpg`)})`}"
        >
        </div>
        <div class="bg-title">
          <span class="bg-title-class">{{ item.class }}屆</span>
          <span class="bg-title-detail">{{ item.title.split('屆 ')[1] ? item.title.split('屆 ')[1].trim() : '' }} · {{ item.date }}</span>
        </div>
      </nuxt-link>
    </div>

  </div>
</template>

<script>
  export default {
    head() {
      return {
        title: '歷屆學士服大合照｜學士服｜文華高中制服日',
        meta: [{
            hid: 'description',
            name: 'description',
            content: this.description
          },
          {
            hid: 'og:title',
            property: 'og:title',
            content: '歷屆學士服大合照｜學士服｜文華高中制服日'
          },
          {
            hid: 'og:description',
            property: 'og:description',
            content: this.description
          },
          {
            hid: 'og:url',
            property: 'og:url',
            content: 'https://whshuniform.github.io/bachelor-gown/'
          },
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
    asyncData() {
      const date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1
      year = year - 2015 + 1 - (month < 12 ? 1 : 0)
  
      return {
        list: Object.freeze([{
          class: 31,
          title: '31屆 (學號8字頭 2019~2022年在校) ',
          date: '2025年12月06日',
          path: '31/m/20251206_145513'
        },{
          class: 30,
          title: '30屆 (學號7字頭 2018~2021年在校)',
          date: '2024年12月07日',
          path: '30/m/20241207_144318'
        },{
          class: 29,
          title: '29屆 (學號7字頭 2017~2020年在校) ',
          date: '2023年12月02日',
          path: '29/m/20231202_143645'
        }, {
          class: 28,
          title: '28屆 (學號5字頭 2016~2019年在校) ',
          date: '2022年12月03日',
          path: '28/m/20221203_135702'
        }, {
          class: 27,
          title: '27屆 (學號4字頭 2015~2018年在校) ',
          date: '2021年12月04日',
          path: '27/m/20211204_135551'
        }, {
          class: 26,
          title: '26屆 (學號3字頭 2014~2017年在校) ',
          date: '2020年12月05日',
          path: '26/m/20201205_135119'
        }, {
          class: 25,
          title: '25屆 (學號2字頭 2013~2016年在校) ',
          date: '2019年12月07日',
          path: '25/m/20191207_145707'
        },{
          class: 24,
          title: '24屆 (學號1字頭 2012~2015年在校) ',
          date: '2018年12月01日',
          path: '24/m/20181201_142943'
        },{
          class: 23,
          title: '23屆 (學號0字頭 2011~2014年在校) ',
          date: '2017年12月02日',
          path: '23/m/20171202_141302'
        },{
          class: 22,
          title: '22屆 (學號9字頭 2010~2013年在校) ',
          date: '2017年02月17日',
          path: '22/m/20170217_145801'
        },{
          class: 21,
          title: '21屆 (學號8字頭 2009~2012年在校) ',
          date: '2015年12月05日',
          path: '21/m/20151205_142503'
        },]),
        description: Object.freeze(
          `始於2015年21屆一直延續至今已有${year}屆${year}年歷史，每年校慶時刻在各地念大學的大四畢業生，都會回到在這個充滿青春回憶的校園，和當初的老朋友們一起換上學士服合影留念`)
      }
    },
    data() {
      return {

      }
    },
    mounted() {

    },

  }

</script>

<style>
  .bg.menu {
    position: relative;
    width: 90vw;
    height: 55vw;
    max-width: 600px;
    max-height: 360px;
    margin: 3% auto;
    overflow: hidden;
  }

  .menu-link {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
  }

  .memory {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    transition: all .3s;
  }

  .menu-link:hover .memory {
    transform: scale(1.1);
  }

  .bg-title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 28px 18px 12px;
  }

  .bg-title-class {
    font-size: clamp(18px, 6.5vw, 28px);
    font-weight: 500;
    letter-spacing: 0.04em;
    line-height: 1.2;
  }

  .bg-title-detail {
    font-size: clamp(10px, 3.4vw, 17px);
    opacity: 0.85;
    margin-top: 3px;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

</style>
