# 架構決策紀錄

## 整體架構

- **框架**：Nuxt 2（mode: universal, target: static）、Vue 2
- **部署**：GitHub Pages，`npm run generate:gh-pages` 產出靜態檔後複製至 **`main` branch 根目錄**（非 gh-pages branch）
- **路由**：`/`（列表）、`/<屆別>`（各屆頁）、`/photo`（放大預覽，client-side only）
- **圖片管理**：`assets/image/<屆別>/<品質>/`，品質層 `s`（縮圖）/ `m`（中圖）/ `6k~12k`（高清）

## Git Repository 結構

| 路徑 | 進 Git | 說明 |
|------|--------|------|
| 根目錄（`/`）的 build output | ✅ | GitHub Pages serve 的靜態檔（`*.html`、`assets/`、`21/`～`31/`、`photo/` 等） |
| `BachelorGown/`（Nuxt 2 源碼） | ❌ | 只存在本機，**不追蹤**；clone 下來無法直接 generate |
| `CLAUDE.md`、`package.json` | ❌ | 同上，本機設定檔 |

> **意涵**：git 只是部署載體，不是源碼版控。源碼需另行備份。

## 決策清單

### ADR-001：深色模式使用純 CSS @media query，不做 JS 手動切換

- **日期**：2026-06-01
- **狀態**：已採用
- **背景**：初版實作了 PageHeader 手動切換按鈕（localStorage + `html.dark` class），後來使用者要求改成「自動跟系統設定」
- **決策**：移除所有 JS 切換邏輯，只保留 `@media (prefers-color-scheme: dark)` CSS rule
- **後果**：實作極簡，系統切換即時反應，無 FOUC 疑慮；代價是使用者無法手動覆蓋系統設定（目前不需要此功能）

### ADR-002：URL 路由參數用 AES 加密傳遞（client-side 混淆）

- **日期**：2026-06-02
- **狀態**：已採用
- **背景**：`/photo` 頁需要從上一頁取得照片的 `session`、`quality`、`size`、`center`、`name` 等資訊，但不想把這些參數以明文暴露在 URL query string
- **決策**：用 `crypto-js` AES-CBC 加密整個 JSON payload，結果放在 `?i=` 參數。key 與 IV 皆為 hardcoded 常數（`'wh'`、`'grad'`）
- **後果**：URL 較難直接猜測，提供基本混淆；由於 key 在 client bundle 中明文存在，本質上是 security through obscurity，無法防範有意攻擊者。解密後的欄位必須做白名單驗證（見 PIT-002）

<!-- 新增決策請複製上方模板，編號遞增 -->
