import InApp from 'detect-inapp';
import Vue from 'vue';

const detect = new InApp(navigator.userAgent || navigator.vendor || window.opera);

var os = () => {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
      return "Android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
  }

  if (/Windows/.test(userAgent)) {
      return "Windows";
  }

  if (/Mac/.test(userAgent)) {
      return "Mac";
  }

  if (/Linux/.test(userAgent)) {
      return "Linux";
  }

  if (/X11/.test(userAgent)) {
      return "UNIX";
  }

  return "unknown";
}

const install = (Vue, options) => {
console.log('---------')

  //於原型添加屬性
  Vue.prototype.$isMobile = detect.isMobile
  Vue.prototype.$isDesktop = detect.isDesktop
  Vue.prototype.$isInApp = detect.isInApp
  Vue.prototype.$browser = detect.browser

  Vue.prototype.$os = os()

  if (detect.isInApp === true) {
    const os =  Vue.prototype.$os
    var msg = '請額外開啟'

    if (os === 'iOS') {
      msg += ' Safari 或'
    } else if (os === 'Android') {
      msg += ' Chrome 或'
    }

    msg += `其他瀏覽器才能下載照片們!! 😝`

    if (detect.browser !== 'other') {
      msg += `</br> ${detect.browser} 並不支援下載功能～～`
    
      Vue.prototype.$downloadErrMsg = msg
    }
  }

  console.log('-----111------')
  console.log('prototype', Vue.prototype)
  console.log('downloadErrMsg', Vue.prototype.$downloadErrMsg)
};

Vue.use(install)
