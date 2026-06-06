# 模組關係圖

> 最後更新：2026-06-01

## Layouts

| Layout | 說明 | 使用頁面 |
|--------|------|---------|
| `default.vue` | 含 PageHeader，import common.css | `/`、`/<屆別>` |
| `fullScreen.vue` | 全螢幕，無 Header | `/photo` |

## Pages

| 頁面 | 路由 | 說明 |
|------|------|------|
| `pages/index.vue` | `/` | 列出所有屆別，卡片含縮圖、屆別、日期 |
| `pages/_class/index.vue` | `/<屆別>` | 單屆照片列表、YouTube 影片、下載按鈕 |
| `pages/photo.vue` | `/photo?i=<encrypted>` | 放大預覽，解密 query param 取得照片資訊 |

## Components

| 元件 | 說明 | 使用處 |
|------|------|--------|
| `PageHeader.vue` | 固定頂部導覽列，含返回按鈕、標題 | `layouts/default.vue` |
| `PhotoCollection.vue` | 照片 grid，emit `show-preview` | `pages/_class/index.vue` |
| `Photo.vue` | 單張照片（含 lazy load 骨架） | `PhotoCollection.vue` |
| `Preview.vue` | 全螢幕放大預覽，含 zoom/拖曳 | `pages/photo.vue` |
| `Loading.vue` | 旋轉載入動畫 | `pages/_class/index.vue`、`Preview.vue` |
| `ArtButton.vue` | 下載按鈕（手繪復古風格） | `pages/_class/index.vue` |

## CSS 色彩系統

定義於 `assets/css/common.css`，使用 CSS 自訂屬性：

| 變數群組 | 變數 | 用途 |
|---------|------|------|
| 頁面主色 | `--bg`、`--text`、`--text-muted` | body 背景、文字、次要文字 |
| Header | `--header-bg`、`--header-shadow`、`--header-link`、`--header-title` | Header 元件 |
| 下載按鈕 | `--btn-text`、`--btn-bg`、`--btn-border` | ArtButton 元件 |
