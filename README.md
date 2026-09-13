# junkfu.github.io

張復 Allen Chang 的終端機風格個人履歷網站。純 HTML / CSS / JS，沒有 build step，直接由 GitHub Pages 提供。

**網址：** https://junkfu.github.io/

## 檔案說明

| 檔案 | 用途 |
|---|---|
| `index.html` | 頁面骨架、meta / Open Graph 標籤 |
| `js/data.js` | **所有履歷內容**（繁中 `zh` 與英文 `en` 兩份，結構相同） |
| `js/main.js` | 渲染、開場打字動畫、語言切換、底部指令列 |
| `css/style.css` | 終端機配色（dark / light / dracula）、RWD、列印樣式 |
| `assets/avatar.jpg` | 大頭照 |
| `assets/favicon.svg` | 網站圖示 |

## 如何更新履歷

只需要編輯 `js/data.js`。`zh` 與 `en` 兩個物件的欄位必須一一對應（例如新增一段工作經歷時，兩邊都要加）。

聯絡方式、GitHub、LinkedIn 網址在 `RESUME.shared` 裡。

## 本機預覽

```bash
python3 -m http.server 8000
# 然後開啟 http://localhost:8000/
```

`?lang=en` 可直接以英文開啟，例如 `http://localhost:8000/?lang=en`。

## 指令列支援的指令

`help` `about` `exp` `projects` `skills` `edu` `contact` `ls` `cat <file>` `lang [zh|en]` `theme [dark|light|dracula]` `clear` `top`，以及幾個彩蛋。支援 `↑` `↓` 歷史指令與 `Tab` 補齊，按 `/` 可快速聚焦指令列。

## 部署

推送到 `main` 分支後 GitHub Pages 會自動更新，通常一分鐘內生效。
