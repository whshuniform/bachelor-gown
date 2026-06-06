# 踩過的坑

> 記錄開發過程中遇到的問題與解法，避免重複踩坑。

### PIT-001：修改 nuxt.config.js 後 dev server 出現 webpackMissingModule 錯誤

- **日期**：2026-06-01
- **症狀**：修改 `nuxt.config.js`（如新增/移除 `head.script`）後，已在跑的 dev server 顯示 `Cannot find module '.nuxt/server...'`，頁面全白或顯示 Error 畫面
- **原因**：`nuxt.config.js` 異動會觸發 Nuxt 重新生成 `.nuxt/` 快取，但舊 server process 持有舊版模組路徑，HMR 熱更新無法修復此類結構性重建
- **解法**：
  ```bash
  pkill -f "node_modules/.bin/nuxt"   # 殺掉所有 nuxt process
  npm run dev                          # 重新啟動，等 port 3000 監聽後再測試
  ```
- **影響範圍**：所有 `nuxt.config.js` 的結構性異動（`head` 區段、`plugins` 增刪、`buildModules` 變更等）

### PIT-002：photo.vue — `?i` 參數無保護導致頁面崩潰

- **日期**：2026-06-02
- **症狀**：訪問 `/photo`（無 `?i`）或 `/photo?i=任意亂碼`，頁面拋出 `Uncaught SyntaxError`，整個元件崩潰白屏
- **原因**：`mounted()` 裡直接呼叫 `decrypt()` + `JSON.parse()`，無 `try/catch`；解密後的 `session`、`quality`、`name` 欄位也無白名單驗證，任意值可直接傳入 `require()` 路徑
- **解法**：
  1. 整個 `mounted()` 包進 `try/catch`，catch 時執行 `this.$router.replace('/')`
  2. 驗證 `session` 必須是 21–31 的整數
  3. 驗證 `quality` 只能是白名單值（`s`、`m`、`6k`、`7k`、`9k`、`12k`）
  4. 驗證 `name` 必須符合正規表達式 `^\d{8}_\d{6}$`（防止路徑穿越）
- **影響範圍**：`pages/photo.vue`（`mounted()` 第 97–131 行）

### PIT-003：`_class/index.vue` — YouTube `<iframe>` 缺少 `sandbox`，允許導向父框架

- **日期**：2026-06-02
- **症狀**：內嵌的 YouTube iframe 可發起 top-level navigation，攻擊者若能影響影片來源，可做 open redirect 跳轉
- **原因**：直接沿用 YouTube 官方 embed 產生的程式碼，官方預設不加 `sandbox` 屬性
- **解法**：
  1. 加上 `sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"`
  2. 移除舊的 `allowfullscreen` 屬性，改用現代寫法：在 `allow` 屬性中加入 `fullscreen`（`allow="... fullscreen"`）
  3. 實測 YouTube 播放與全螢幕功能正常
- **影響範圍**：`pages/_class/index.vue`（`<iframe>` 第 16–19 行）

### PIT-004：`in-app-detect.js` — LINE 外部瀏覽器重導向 URL 拼接錯誤

- **日期**：2026-06-02
- **症狀**：若原始 URL 已有 query string（如 `?class=22`），LINE 偵測後重導向 URL 變成 `?class=22?openExternalBrowser=1`（double `?`），LINE 無法正確解析並開啟外部瀏覽器
- **原因**：直接做 `location.href + "?openExternalBrowser=1"`，未判斷是否已有 query string，也未防止重複觸發
- **解法**：
  ```js
  if (/Line/.test(userAgent)) {
    if (!/openExternalBrowser=1/.test(location.search)) {
      const sep = location.search ? '&' : '?'
      location.href = location.href + sep + 'openExternalBrowser=1'
    }
    return;
  }
  ```
- **影響範圍**：`plugins/in-app-detect.js`（第 37–43 行）

<!-- 新增踩坑紀錄請複製上方模板，編號遞增 -->
