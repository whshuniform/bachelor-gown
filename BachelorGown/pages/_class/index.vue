<template>
  <div>
    <h2 class="mem-title">
      {{ $route.params.class }}屆學士服 {{ album.date }}
    </h2>

    <h3>主辦人： {{ album.organizer }}</h3>

    <Loading v-if="loading === true" />
    <template v-else>
      <div v-if="album.videoUrl" class="video-container">
        <iframe
          :src="album.videoUrl"
          title="我們畢業了影片"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          referrerpolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
        ></iframe>
      </div>

      <h3 class="mem-sub-title">正常系列</h3>
      <PhotoCollection
        :base-path="`/${$route.params.class}/s`"
        :download-base-path="`/${$route.params.class}/${album.quality}`"
        :list="album.normalList"
        @show-preview="showPreview"
      />

      <ArtButton
        v-if="album.funList && album.funList.length > 0"
        :loading="downloading"
        @click="download(album.normalList, '正常')"
        >下載正常系列(.zip)</ArtButton
      >

      <template v-if="album.funList">
        <h3 class="mem-sub-title">非常正常系列</h3>
        <PhotoCollection
          :base-path="`/${$route.params.class}/s`"
          :list="album.funList"
          @show-preview="showPreview"
        />
      </template>

      <ArtButton
        v-if="album.normalList && album.normalList.length > 0"
        :loading="downloading"
        @click="downloadAll"
        >下載全部(.zip)</ArtButton
      >

      <!-- <ul class="mem-group">
        <li
          class="mem-col animated fade-in-up"
          v-for="(item, i) in album.normalList"
          :key="'i' + i"
          :style="{ 'animation-delay': `${i / 5}s` }"
        >
          <a
            class="mem draw meet"
            @click="showPreview(item)"
          >
            <Photo
              alt="學士服畢業大合照"
              title="學士服合照"
              :src="`~/assets/image/${$route.params.class}/xs/${item.name}.jpg`"
            />
          </a>
        </li>
      </ul> -->
    </template>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import PhotoCollection from "@/components/PhotoCollection";
import JSZip from "jszip";

import { delay } from "@/assets/js/util";
import { encrypt } from "@/assets/js/crypto";

export default {
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.description,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.description,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `https://whshuniform.github.io/bachelor-gown/${this.$route.params.class}`,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.ogImageUrl,
        },
      ],
      link: [
        { rel: 'canonical', href: `https://whshuniform.github.io/bachelor-gown/${this.$route.params.class}` }
      ]
    };
  },
  middleware: ["authorizedPath"],
  components: {
    Loading,
    PhotoCollection,
  },
  asyncData({ params }) {
    const album = [
      {
        date: "2015年12月05日",
        organizer: "309 李俋欣",
        // quality: "9k",
        // size: { w: 8500, h: 3643 },
        // center: { x: 0.395, y: 0.76 },
        videoUrl:
          "https://www.youtube.com/embed/wGB8ikRu_iE?si=QSFUV3SjOX-c9E2e",
      },
      {
        date: "2017年02月17日",
        organizer: "302 吳岱容",
        videoUrl:
          "https://www.youtube.com/embed/e9g-rCPDa8E?si=LqDJz0PEoJ2KNndo",
        normalList: [
          { name: "20170217_145726" },
          { name: "20170217_145728" },
          { name: "20170217_145729" },
          { name: "20170217_145743" },
          { name: "20170217_145801" },
          { name: "20170217_145817" },
          { name: "20170217_145835" },
        ],
        quality: "6k",
        size: { w: 5730, h: 3820 },
        center: { x: 0.395, y: 0.76 },
      },
      {
        date: "2017年12月02日",
        organizer: "305 白湘苓",
        videoUrl:
          "https://www.youtube.com/embed/hP1E1OJL1es?si=IkfDFWE8SjTsNGHU",
        normalList: [
          { name: "20171202_141300" },
          { name: "20171202_141301" },
          { name: "20171202_141302" },
          { name: "20171202_141415" },
          { name: "20171202_141614" },
        ],
        quality: "6k",
        size: { w: 5732, h: 2457 },
        center: { x: 0.395, y: 0.76 },
      },
      {
        date: "2018年12月01日",
        organizer: "306 張瑛資",
        videoUrl:
          "https://www.youtube.com/embed/bL7XtSH2f8U?si=3qy7SN0u5Ezs1nGq",
        normalList: [
          { name: "20181201_142318" },
          { name: "20181201_142424" },
          { name: "20181201_142631" },
          { name: "20181201_142632" },
          { name: "20181201_142934" },
          { name: "20181201_142936" },
          { name: "20181201_142938" },
          { name: "20181201_142940" },
          { name: "20181201_142943" },
          { name: "20181201_142950" },
          { name: "20181201_142953" },
        ],
        quality: "7k",
        size: { w: 7416, h: 3178 },
        center: { x: 0.395, y: 0.76 },
      },
      {
        date: "2019年12月07日",
        organizer: "319 盧姸伶",
        videoUrl:
          "https://www.youtube.com/embed/BciVyxNY7E4?si=vtqNT6NlYJfQpR26",
        normalList: [
          { name: "20191207_145124" },
          { name: "20191207_145138" },
          { name: "20191207_145707" },
        ],
        quality: "9k",
        size: { w: 9500, h: 4071 },
        center: { x: 0.395, y: 0.76 },
      },
      {
        date: "2020年12月05日",
        organizer: "311 陳安",
        videoUrl:
          "https://www.youtube.com/embed/Etk2xeOGbbI?si=g5KqZI8bVpl9F9_J",
        normalList: [
          { name: "20201205_134938" },
          { name: "20201205_135050" },
          { name: "20201205_135057" },
          { name: "20201205_135107" },
          { name: "20201205_135114" },
          { name: "20201205_135119" },
          { name: "20201205_135213" },
        ],
        quality: "9k",
        size: { w: 8500, h: 3643 },
        center: { x: 0.395, y: 0.76 },
      },
      {
        date: "2021年12月04日",
        organizer: "316 黃宥蓁",
        videoUrl:
          "https://www.youtube.com/embed/uhFQR2RJCUk?si=lPsWWq6HFkV7iiXY",
        normalList: [
          { name: "20211204_135516" },
          { name: "20211204_135532" },
          { name: "20211204_135546" },
          { name: "20211204_135549" },
          { name: "20211204_135551" },
        ],
        quality: "12k",
        size: { w: 11648, h: 4876 },
        center: { x: 0.395, y: 0.6 },
      },
      {
        date: "2022年12月03日",
        organizer: "302 羅家安",
        videoUrl:
          "https://www.youtube.com/embed/wsoAIREjMUk?si=GurlAncSyKzfvM1S",
        normalList: [
          { name: "20221203_135511" },
          { name: "20221203_135514" },
          { name: "20221203_135517" },
          { name: "20221203_135523" },
          { name: "20221203_135526" },
          { name: "20221203_135659" },
          { name: "20221203_135702" },
          { name: "20221203_135707" },
        ],
        quality: "12k",
        size: { w: 11648, h: 4992 },
        center: { x: 0.5, y: 0.5 },
      },
      {
        date: "2023年12月02日",
        organizer: "310 邱詩閒",
        videoUrl:
          "https://www.youtube.com/embed/qSPxwzoo1W4?si=VVl9N3b3WjMD6GyQ",
        normalList: [
          { name: "20231202_143635" },
          { name: "20231202_143645" },
          { name: "20231202_143651" },
          { name: "20231202_143702" },
        ],
        funList: [
          { name: "20231202_143857" },
          { name: "20231202_143901" },
          { name: "20231202_143904" },
          { name: "20231202_143908" },
          { name: "20231202_144047" },
        ],
        quality: "12k",
        size: { w: 11375, h: 4875 },
        center: { x: 0.5, y: 0.5 },
      },
      {
        date: "2024年12月07日",
        organizer: "302 蕭士畯",
        videoUrl:
          "https://www.youtube.com/embed/wuLhImT8Fww?si=Y09NLvLxZBXxD_Gy",
        normalList: [
          { name: "20241207_144239" },
          { name: "20241207_144241" },
          { name: "20241207_144243" },
          { name: "20241207_144303" },
          { name: "20241207_144305" },
          { name: "20241207_144318" },
          { name: "20241207_144320" },
          { name: "20241207_144321" },
        ],
        quality: "12k",
        size: { w: 11648, h: 4992 },
        center: { x: 0.395, y: 0.76 },
      },
      {
        date: "2025年12月06日",
        organizer: "304 鄭雅之",
        videoUrl:
          "https://www.youtube.com/embed/KyFixoyn35Y?si=OPeVy-lD6OYnLin5",
        normalList: [
          { name: "20251206_145454" },
          { name: "20251206_145455" },
          { name: "20251206_145500" },
          { name: "20251206_145503" },
          { name: "20251206_145507" },
          { name: "20251206_145510" },
          { name: "20251206_145513" },
          { name: "20251206_145515" },
          { name: "20251206_145516" },
          { name: "20251206_145517" },
          { name: "20251206_145518" },
          { name: "20251206_145520" },
          { name: "20251206_145522" },
        ],
        quality: "12k",
        size: { w: 11648, h: 4992 },
        center: { x: 0.395, y: 0.76 },
      },
    ];

    console.log("album", album.length, params.class);

    const index = parseInt(params.class) - 21;

    const current = album[index];
    const list = current.normalList || [];
    const photoCount = list.length;
    const descSuffix = photoCount > 0
      ? `收錄 ${photoCount} 張合照，支援線上預覽與高清下載。`
      : `支援線上影片回顧。`;

    const middleName = photoCount > 0
      ? list[Math.floor(photoCount / 2)].name
      : '20151205_142503';
    const ogImagePath = require(`~/assets/image/${params.class}/m/${middleName}.jpg`);
    const ogImageUrl = `https://whshuniform.github.io${ogImagePath}`;

    return {
      album: Object.freeze(current),
      title: Object.freeze(
        `${params.class}屆 學士服大合照｜學士服團拍｜文華高中制服日`
      ),
      description: Object.freeze(
        `文華高中 ${params.class} 屆學士服大合照，攝於 ${current.date}，由 ${current.organizer} 主辦。${descSuffix}`
      ),
      ogImageUrl,
    };
  },
  data() {
    return {
      loading: true,
      downloadCount: 0,
      downloading: false,
      ogImageUrl: '',
    };
  },
  mounted() {
    console.log("1", this.album.normalList);

    if (sessionStorage.getItem(this.$route.params.class) !== "t") {
      sessionStorage.setItem(this.$route.params.class, "t");

      console.log("----========>", this.album.normalList);

      if (this.album.normalList && this.album.normalList.length > 0) {
        this.preloadImages(
          this.album.normalList.map((e) =>
            require(`@/assets/image/${this.$route.params.class}/s/${e.name}.jpg`)
          ),
          () => {
            this.loading = false;

            delay(500).then(() => {
              this.preloading();
            });
          }
        );
      } else {
        delay(100).then(() => {
          this.loading = false;
        });
      }
    } else {
      delay(100).then(() => {
        this.loading = false;
      });
    }

    console.log("os", this.$os);
  },
  methods: {
    preloading() {
      if (!this.album.normalList || !this.album.quality) return;
      this.preloadImages(
        this.album.normalList.map((e) =>
          require(`~/assets/image/${this.$route.params.class}/${this.album.quality}/${e.name}.jpg`)
        ),
        () => {}
      );
    },
    preloadImages(urls, callback) {
      const preloadImage = (url, cb) => {
        var img = new Image();
        img.src = url;
        img.onload = cb;
      };

      var loadedCounter = 0;
      const n = urls.length;
      urls.forEach((url) => {
        preloadImage(url, () => {
          loadedCounter++;

          if (loadedCounter == n) {
            callback();
          }
        });
      });
    },

    showPreview(item) {
      const quality = this.album.quality,
        size = this.album.size,
        center = this.album.center,
        session = this.$route.params.class,
        name = item.name;

      const data = JSON.stringify({
        quality,
        size,
        center,
        session,
        name,
      });

      const id = encrypt(data, "wh", "grad");

      delay(this.$isMobile ? 500 : 0).then(() => {
        console.log(
          "->",
          `/${this.$route.params.class}/picture?p=${item.name}&id=${id}`
        );
        this.$router.push(`/photo?i=${id}`);
      });
    },
    closePreview() {
      this.preview.show = false;
      this.preview.opacity = 0;
    },
    async downloadImg(url, fileName, callback) {
      console.log("download");

      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "blob";
      xhr.onload = function () {
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(this.response);
        var tag = document.createElement("a");
        tag.target = "_blank";
        tag.href = imageUrl;
        tag.download = fileName;
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);

        callback();
      };
      xhr.send();
    },
    verifyDownload() {
      if (this.$downloadErrMsg) {
        this.$toastr.Add({
          type: "warning",
          title: "",
          msg: this.$downloadErrMsg,
          timeout: 10000,
          clickClose: true,
        });

        return false;
      }

      if (this.downloading === true) {
        return false;
      }

      return true;
    },
    async download(album, name) {
      if (this.verifyDownload() === false) {
        return;
      }

      // iOS 14 以下：Web Share API 不支援多檔案，提示長按儲存
      if (this.$os === "iOS") {
        const testFile = new File([""], "test.jpg", { type: "image/jpeg" });
        if (!navigator.canShare || !navigator.canShare({ files: [testFile] })) {
          this.$toastr.Add({
            type: "warning",
            title: "",
            msg: "iOS 不支援批次下載 .zip 檔 😢<br>請逐張儲存<br>或改用電腦下載全部",
            timeout: 15000,
            clickClose: true,
          });
          return;
        }
      }

      this.downloading = true;

      const folder = `${this.$route.params.class}/${this.album.quality}/`;
      this.downloadCount = album.length;

      try {
        const blobs = [];
        for (var i = 0; i < album.length; i++) {
          const url = require(`@/assets/image/${folder}${album[i].name}.jpg`);
          const response = await fetch(url);
          const blob = await response.blob();
          blobs.push({ photoName: album[i].name, blob });
        }

        if (this.$os === "iOS") {
          // iOS 15+：Web Share API 分享到相簿
          const files = blobs.map(
            ({ photoName, blob }) =>
              new File([blob], `${photoName}.jpg`, { type: "image/jpeg" })
          );
          await navigator.share({
            files,
            title: `${this.$route.params.class}屆學士服大合照`,
          });
        } else {
          // 桌機 / Android：打包 ZIP 下載
          const zip = new JSZip();
          for (const { photoName, blob } of blobs) {
            zip.file(`${photoName}.jpg`, blob);
          }
          const zipData = await zip.generateAsync({
            type: "blob",
            streamFiles: true,
          });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(zipData);
          link.download = `${this.$route.params.class}屆學士服大合照(${name}).zip`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(link.href);
        }
      } catch (e) {
        // 使用者取消 iOS 分享選單，不顯示錯誤
        if (e.name !== "AbortError") {
          const device = this.$isMobile ? "手機" : "電腦";
          this.$toastr.Add({
            type: "error",
            title: "",
            msg: `由於${device}記憶體不足，照片檔案過大導致下載失敗了 😓，請改成逐張照片下載，或是扔掉您的${device}`,
            timeout: 10000,
            clickClose: true,
          });
        }
      } finally {
        this.downloading = false;
      }
    },
    async downloadAll() {
      let album = this.album.normalList.concat(this.album.funList || []);
      await this.download(album, "全部");
    },
  },
};
</script>

<style>
.mem-title {
  padding: 5px 10px;
  font-size: 22px;
}

.mem-sub-title {
  margin-top: 0.5em;
  margin-left: 5px;
  color: var(--text-muted);
  transition: color 0.25s;
}

.video-container {
  width: 100%; /* 寬度隨父層填滿 */
  aspect-ratio: 16 / 9; /* 維持 YouTube 標準 16:9 比例 */
}

.video-container iframe {
  width: 100%;
  height: 100%;
}

.btn.overlay {
  padding: 12px 24px;
  position: relative;
  color: var(--btn-text);
  transition: color 0.25s;
}

.btn.overlay span {
  position: relative;
  z-index: 1;
}

.btn.overlay::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  top: 5px;
  right: 5px;
  background: var(--btn-bg);
  transition: transform 0.2s ease-in-out, background 0.25s;
}

.btn.overlay::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border: 1px solid var(--btn-border);
  border-width: 1px 2px 2px 3px;
  border-radius: 1% 102% 1% 95% / 92% 6% 93% 5%;
  transition: transform 0.2s ease-in-out, border-color 0.25s;
}

.btn.overlay:hover::before {
  transform: translate(6px, -4px);
}

.btn.overlay:hover::after {
  transform: translate(-6px, 4px);
}

.from-left span {
  display: inline-block;
  transition: transform 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955);
}

.from-left i {
  position: absolute;
  top: 50%;
  right: 5%;
  fill: hsl(243, 80%, 62%);
  opacity: 0;
  transform: translate(-120%, -50%);
  transition: opacity 0.3s 0.05s cubic-bezier(0.455, 0.03, 0.515, 0.955),
    transform 0.3s 0.05s cubic-bezier(0.455, 0.03, 0.515, 0.955);
}

.from-left:hover span {
  transform: translateX(-15%);
}

.from-left:hover i {
  opacity: 1;
  transform: translate(-55%, -50%);
}

.btn.download {
  display: block;
  cursor: pointer;
  margin: 15px auto;
  width: 90vw;
  height: 13vw;
  max-width: 450px;
  max-height: 85px;
  font-size: 50px;
  font-weight: lighter;
  text-align: center;
}

.btn.download .download-loading {
  position: absolute;
  right: 0;
  top: 0;
  width: 30%;
  height: 100%;
}

.icon-download {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 17px 13px 0 13px;
  border-color: var(--btn-border) transparent transparent transparent;
  transition: border-color 0.25s;
}

@media screen and (max-width: 500px) {
  .btn.download {
    height: 15vw;
    font-size: 4vmax;
  }
}
</style>
