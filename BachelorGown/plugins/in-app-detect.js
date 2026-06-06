
// window.onNuxtReady(() => {
  
// });

/**
 * 取得移動裝置系統
 * @returns {String} 系統
 */
const getMobileSystem = () => {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  return "unknown";
};

/**
 * 偵測是否使用App的webview開啟 如果是則跳轉為使用瀏覽器
 * @returns
 */
const openExternalBrowserIfInApp = () => {
  var userAgent = navigator.userAgent || navigator.vendor;

  console.log('userAgent', userAgent);

  if (/Line/.test(userAgent)) {
    if (!/openExternalBrowser=1/.test(location.search)) {
      const sep = location.search ? '&' : '?'
      location.href = location.href + sep + 'openExternalBrowser=1'
    }
    return;
  }

  if (
    /FB/.test(userAgent) ||
    /Instagram/.test(userAgent) ||
    /(Messenger|MESSENGER)/.test(userAgent)
  ) {
    var device = getMobileSystem();
    if (device === "iOS") {
      window.location.href =
        "googlechrome://" + location.host + location.pathname;
      return;
    }

    if (device === "Android") {
      window.location.href = "intent:" + location.href + "#Intent;end";
      return;
    }
  }
};

console.log('=====>>>>>')

openExternalBrowserIfInApp()
