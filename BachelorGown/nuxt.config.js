const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

//process.env.DEPLOY_ENV === 'production'
const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/bachelor-gown/'
        }
      }
    : {
        router: {
          base: '/'
        }
      }

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  mode: 'universal',
  //mode: 'spa',
  target: 'static',

  ...routerBase,

  head: {
    title: '學士服大合照 | 文華高中制服日',
    htmlAttrs: {
      lang: 'zh-TW'
    },
    meta: [
      { charset: 'utf-8' },
      { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { "http-equiv": "X-UA-Compatible", content: "IE=edge,chrome=1" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
      { name: "author", content: "文華高中制服日" },
      { name: "copyright", content: "文華高中制服日" },
      { name: "source", content: "文華高中制服日" },
      //Open Graph Tag 
      { property: "fb:app_id", content: "246786583555444" },
      { property: "og:type", content: "website" },
      { hid: 'og:site_name', property: "og:site_name", content: "文華高中制服日" },
      { hid: 'og:locale', property: "og:locale", content: "zh_TW" },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `${routerBase.router.base}favicon.ico` },
      { rel: 'icon', type: 'image/png', sizes: "32x32", href: `${routerBase.router.base}favicon-32x32.png` },
      { rel: 'apple-touch-icon', sizes: '180x180', href: `${routerBase.router.base}apple-touch-icon.png` },
      { rel: 'icon', sizes: "192x192", href: `${routerBase.router.base}favicon-192x192.png` },
      //{ rel: 'dns-prefetch', href: 'https://i.imgur.com/'},
      //{ rel: 'dns-prefetch', href: 'https://instagram.fknu1-1.fna.fbcdn.net/'}
      //{ rel: 'dns-prefetch', href: '//url'} DNS
    ]
  },

  loading: {
    color: "#00dfff"
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],
  
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: "@/plugins/in-app-detect",
      mode: "client"
    },
    {
      src: "@/plugins/detect",
      mode: "client"
    },
    {
      src: "@/plugins/toastr",
      mode: "client"
    },
    {
      src: "@/plugins/gtag",
      mode: "client"
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: process.env.DEPLOY_ENV === 'GH_PAGES' ? `assets/` : '/__nuxt/',

    extend(config, {
      isDev,
      isClient
    }) {
      // if (!isDev) {
      //   config.output.publicPath = routerBase.router.base + "static/";

      //   console.log('routerBase = ', routerBase)
      // }
      // if (!isDev) {
      //   //config.output.publicPath = process.env.DEPLOY_ENV === 'GH_PAGES' ? `/static/` : '/';

      //   console.log(routerBase.router.base);
      // }
      console.log('env = ', process.env.DEPLOY_ENV);
      console.log('isDev = ', isDev)

      if (!isDev && isClient) {
        config.plugins.push(
          new UglifyJsPlugin({
            uglifyOptions: {
              warnings: false, // 在UglifyJs删除没有用到的代码时不輸出警告
              compress: {
                drop_console: true, //將所有的console.log移除
                drop_debugger: true,
                collapse_vars: true, // 内嵌定義了但是只用到一次的變量
                reduce_vars: true // 提取出出现多次但是没有定義成變量去引用的静態值
              }
            },
            sourceMap: false,  // 去除打包后生成的.map文件
            cache: true,
            parallel: true // 使用外部引入的新版本的js壓縮工具
          })
        );
      }

      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })



      return config;
    },
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.(css|vue)$/,
            chunks: "all",
            enforce: true
          }
        }
      }
    }
  }
}
