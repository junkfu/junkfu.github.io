# resume

張復 Fu Chang 的終端機風格個人履歷網站。純 HTML / CSS / JS，沒有 build step，直接由 GitHub Pages 提供。

**網址：** https://junkfu.github.io/resume/

## 檔案說明

| 檔案 | 用途 |
|---|---|
| `index.html` | 頁面骨架、meta / Open Graph 標籤 |
| `js/data.js` | **所有履歷內容**（繁中 `zh` 與英文 `en` 兩份，結構相同） |
| `js/main.js` | 渲染、開場打字動畫、語言切換、底部指令列 |
| `css/style.css` | 終端機配色（dark / light / dracula）、RWD、列印樣式 |
| `assets/avatar.jpg` | 大頭照 |
| `assets/favicon.svg` | 網站圖示 |

## 指令列支援的指令

`help` `about` `exp` `projects` `skills` `edu` `contact` `ls` `cat <file>` `lang [zh|en]` `theme [dark|light|dracula]` `clear` `top`，以及幾個彩蛋。支援 `↑` `↓` 歷史指令與 `Tab` 補齊，按 `/` 可快速聚焦指令列。

## 部署

推送到 `main` 分支後 GitHub Pages 會自動更新，通常一分鐘內生效。
