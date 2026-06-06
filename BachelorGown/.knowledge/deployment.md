# 部署流程

> 最後更新：2026-06-02

## 環境清單

| 環境 | URL | 說明 |
|------|-----|------|
| 本機開發 | `http://localhost:3000` | `npm run dev` |
| 正式（GitHub Pages） | `https://whshuniform.github.io/bachelor-gown/` | `DEPLOY_ENV=GH_PAGES npm run generate` 後推至 **main branch 根目錄** |

## 部署步驟（GitHub Pages）

1. `cd BachelorGown`
2. `npm run generate:gh-pages`（產出至 `dist/`）
3. 將 `dist/` 內容用 `rsync` 複製到 **repository 根目錄**（`/`），取代舊有 build 檔案
4. `git add` 所有根目錄的 build 產出（不包含 `BachelorGown/` 源碼目錄）
5. `git commit` 並 `git push origin main`

> ⚠️ **重要**：GitHub Pages 是從 **`main` branch 根目錄** serve，**不是** gh-pages branch。

## 環境設定差異

| 設定項 | 本機 | GitHub Pages |
|--------|------|------|
| `router.base` | `/` | `/bachelor-gown/` |
| `build.publicPath` | `/__nuxt/` | `assets/` |
| `DEPLOY_ENV` | 未設定 | `GH_PAGES` |

## Git 追蹤範圍

| 目錄 / 檔案 | 進 Git？ | 說明 |
|-------------|---------|------|
| 根目錄 build 產出（`*.html`、`assets/`、`photo/`、`21/`～`31/` 等） | ✅ | GitHub Pages 實際 serve 的靜態檔案 |
| `BachelorGown/`（Nuxt 2 源碼） | ❌ | **不在 git 追蹤範圍**，只存在本機 |

> 若 clone 新的環境，`BachelorGown/` 源碼不存在，無法重新 generate，需要另外取得源碼。

## 注意事項

- 靜態站，無 server-side runtime，所有頁面於 generate 時預渲染
- `/photo` 頁為 client-side only（`layouts/fullScreen.vue`），query param 用 AES 加密
- `.nojekyll` 確保 GitHub Pages 不忽略底線開頭的資料夾

## 常見問題

### push 被拒（remote 有不相關的歷史）

若 remote 曾被 force push，`git push` 可能報錯 `refusing to merge unrelated histories`。

解法：
```bash
git fetch origin main
git merge origin/main --allow-unrelated-histories -X ours --no-edit
git push origin main
```

`-X ours` 確保衝突時保留本地（含最新 build）版本。
