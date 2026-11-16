# 電子學筆記站

依 Sedra/Smith《Microelectronic Circuits》整理的電子學（Electronics I）個人課程筆記網站，用於考前複習與觀念查詢。

**網站：** https://st110211221.github.io/course-notes/

## 這個專案的特色

這個專案的重點不只是網頁本身，而是一套讓 AI 可以「照規則持續新增單元」的設定：

- [`CLAUDE.md`](CLAUDE.md)：專案規則（目的、資料夾結構、命名、新增單元的 6 步流程、內容稿格式、元件與風格規範、自我檢查清單）
- [`AGENTS.md`](AGENTS.md)：給 Codex 等其他 AI 工具的入口
- [`PROGRESS.md`](PROGRESS.md)：進度與決策紀錄
- [`templates/note-template.html`](templates/note-template.html)：單元頁模板
- [`assets/notes-data.js`](assets/notes-data.js)：單元清單；加一筆資料，首頁與上下頁導覽就自動更新

## 怎麼新增一個單元

開啟任何一個能讀寫這個 repo 的 AI 工具，說：

> 先讀 CLAUDE.md，然後新增單元：二極體模型

AI 會依 `CLAUDE.md` 第 4 節的流程：寫內容稿 → 套模板做網頁 → 登記到單元清單 → 更新進度 → 自我檢查。

## 技術

純靜態 HTML＋CSS＋原生 JavaScript，公式用 KaTeX，部署在 GitHub Pages。
