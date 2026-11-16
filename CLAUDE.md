# CLAUDE.md｜電子學筆記站・給 AI 的專案規則

> 給 AI：動手前先讀完這份，再讀 `PROGRESS.md`（目前做到哪、下一步）。
> 這份是本專案的唯一規則來源；規則跟使用者當下的指示衝突時，先問使用者。
> 規則有改變時，同步更新這份文件，並在 `PROGRESS.md` 的「決策紀錄」記一筆。

---

## 1. 專案目的

- 這是一個**電子學（Electronics I）的個人課程筆記網站**，依課本 Sedra/Smith《Microelectronic Circuits》的章節整理。
- 讀者：修電子學的大學部學生（包括作者自己），用途是**考前複習與觀念查詢**。
- 每個「單元」是一頁，內容包含：觀念說明、定義、重要公式、圖、例題與解答、本頁重點。
- 網站部署在 GitHub Pages，純靜態（HTML＋CSS＋原生 JavaScript），不用任何建置工具或框架。

**這套規則要達成的事：** 只要跟 AI 說「新增單元：○○」，AI 照這份文件就能做出一頁格式、風格、品質都和既有單元一致的筆記，並自動出現在首頁與上下頁導覽中。

---

## 2. 資料夾結構

```
course-notes/                 ← repo 根目錄＝GitHub Pages 網站根目錄
├── index.html                ← 首頁：課程介紹＋單元卡片（卡片由 site.js 依 notes-data.js 自動產生）
├── CLAUDE.md                 ← 本檔：專案規則
├── AGENTS.md                 ← 給其他 AI 工具（Codex 等）的入口，內容只是「請讀 CLAUDE.md」
├── PROGRESS.md               ← 進度白板＋決策紀錄
├── README.md                 ← 給人看的專案說明
├── .nojekyll                 ← 讓 GitHub Pages 不跑 Jekyll（必留）
├── assets/
│   ├── style.css             ← 全站唯一樣式檔（色票、字體、所有元件）
│   ├── site.js               ← 公式渲染、首頁卡片、上下頁導覽
│   └── notes-data.js         ← 單元清單（全站唯一的單元登記處）
├── templates/
│   └── note-template.html    ← 單元頁模板（新單元一律從這裡複製）
├── content/
│   └── <slug>.md             ← 每個單元的內容稿（先寫這個，再做 HTML）
└── notes/
    └── <slug>.html           ← 每個單元的成品網頁
```

- 一個單元＝`content/<slug>.md`＋`notes/<slug>.html`＋`notes-data.js` 裡的一筆，三者 slug 必須一致。
- 參考實作：單元 01 `pn-junction`（`content/pn-junction.md`、`notes/pn-junction.html`）。新單元的寫法、密度、語氣以它為準。

---

## 3. 命名規則

- **slug**：英文小寫、單字之間用連字號，描述主題，不加編號。例：`pn-junction`、`diode-models`、`bjt-dc`。
  - 理由：slug 會變成網址，不能有中文或空白；編號放在 `notes-data.js` 的 `unit`，之後插入新單元時不用改檔名。
- **slug 一旦上線就不改**（改了舊網址會失效）。真的要改，先問使用者。
- 單元編號 `unit` 從 1 開始連號，顯示時補零成兩位數（單元 01）。
- 圖片若需要外部檔案（原則上不需要，見第 7 節），放 `notes/img/<slug>-<描述>.svg`。

---

## 4. 新增一個單元的標準流程（最重要）

使用者說「新增單元：○○」或「把這份筆記做成單元」時，**依序完成以下 6 步，不可跳步**：

1. **確認位置**：讀 `assets/notes-data.js`。
   - 若清單中已有這個主題且 `status: "planned"`，沿用它的 `slug` 與 `unit`。
   - 若沒有，依課本章節順序決定插入位置與編號，新取 slug；若插在中間，後面單元的 `unit` 依序加 1。
2. **先寫內容稿** `content/<slug>.md`（格式見第 5 節）。
   - 使用者有提供自己的筆記或課堂重點時，**以使用者內容為主**，不足處再補，補的地方不需要標記。
   - 不確定的內容（例如老師的特殊記號、考試範圍）標 `✏️待確認`，完成後回報給使用者。
3. **做成網頁**：複製 `templates/note-template.html` 成 `notes/<slug>.html`，依內容稿逐段轉成 HTML（對照表見第 5 節），刪掉模板註解與所有 `{{…}}`。
4. **登記單元**：在 `assets/notes-data.js` 把該筆改成 `status: "done"`、填 `updated`（今天日期）；新單元就新增一筆。**首頁卡片與上下頁導覽會自動更新，不要手改。**
5. **更新進度**：在 `PROGRESS.md` 更新「目前狀態」與「下一步」。
6. **自我檢查**：逐項跑第 10 節的檢查清單，全部通過才算完成；回報時列出新增／修改了哪些檔案。

**修改既有單元**：一律先改 `content/<slug>.md`，再同步改 `notes/<slug>.html`，最後更新 `notes-data.js` 的 `updated`。兩份內容不可以不一致。

---

## 5. 內容稿格式（`content/<slug>.md`）

開頭固定放這段資料（YAML front matter）：

```markdown
---
slug: pn-junction
unit: 1
title: PN 接面
chapter: Sedra/Smith Ch.3
summary: 一句話摘要（40 字內，與 notes-data.js 相同）
tags: [內建電位, 空乏區, 接面電容, 二極體方程式]
status: done
updated: 2026-11-16
---
```

本文用一般 Markdown，加上下面幾種**自訂區塊**（`:::` 開頭、單獨一行 `:::` 結尾）。每種寫法都一對一對應到網頁元件：

| 內容稿寫法 | 網頁 HTML | 用途 |
|---|---|---|
| `## 學習目標` 底下 3～4 點清單 | `<section class="goals">` | 讀完這頁要會的事，用「會算／能說明／能判斷」開頭 |
| `## 1. 觀念名稱` | `<h2>1. 觀念名稱</h2>` | 觀念段落，依序編號 |
| `:::def 名詞` … `:::` | `<div class="box def">`，標題「定義：名詞」 | 名詞第一次正式出現時 |
| `:::formula 公式名稱` … `:::` | `<div class="box formula">`，標題「重要公式：名稱」 | 考試會用到的公式；公式下方要說明每個符號與單位 |
| `:::tip 標題` … `:::` | `<div class="box tip">`，標題省略時用「觀念提醒」 | 易錯觀念、直覺解釋、考試陷阱 |
| `:::figure 圖說` … `:::` | `<figure class="figure">`＋inline SVG | 區塊內用文字描述要畫什麼，由 AI 畫成 SVG |
| `### 例題 N：重點`，題目後接一行 `**解答**` 再寫解答 | `<div class="example">`，解答放 `<details>` | 每單元至少 2 題，解答預設收合 |
| `## 本頁重點` 底下 3～5 點 | `<section class="summary">` | 一句一個重點，考前只看這裡也有用 |

公式寫法在內容稿與網頁中**完全相同**（直接複製），規則見第 7 節。

---

## 6. 單元頁固定結構

每個 `notes/<slug>.html` 的區塊順序固定如下（與模板相同）：

1. 頂部導覽列 `.site-header`（品牌連回首頁＋麵包屑「首頁 ／ 單元 NN」）
2. 標題區：`.unit-label`（單元 NN・課本章節）→ `<h1>` → `.lead` 一句話摘要 → `.meta` 最後更新日期
3. 學習目標 `.goals`
4. 觀念段落：`<h2>1. …</h2>`、`<h2>2. …</h2>`……通常 3～5 段，每段內可用 `.box`、`<figure>`、表格
5. 例題：`<h2>N. 例題</h2>`，底下 2～4 個 `.example`
6. 本頁重點 `.summary`
7. 上下頁導覽：`<nav class="pager" id="pager"></nav>`（留空，由 `site.js` 產生）
8. 頁尾 `.site-footer`

`<body>` 必須寫 `data-page="note" data-slug="<slug>"`，`site.js` 靠它找到這個單元。

---

## 7. 元件、公式與圖的規範

### 元件
- 只能使用 `assets/style.css` 已定義的 class：`box def`、`box formula`、`box tip`、`example`、`figure`、`goals`、`summary`、`table-wrap`、`lead`、`meta`、`unit-label`、`tag`。
- 每個 `.box` 第一個子元素是 `<span class="box-title">`。
- 表格外面包 `<div class="table-wrap">`（手機可橫向捲動）。
- 需要新元件時：先問使用者 → 在本節登記 → 加到 `style.css`（只用色票變數）→ 記到 `PROGRESS.md` 決策紀錄。

### 公式（KaTeX）
- 置中公式用 `$$ … $$`，行內公式用 `\( … \)`。**禁止用單個 `$` 包行內公式**（不會渲染）。
- 符號沿用 Sedra/Smith：\(V_T\)、\(I_S\)、\(V_0\)、\(N_A\)、\(N_D\)、\(n_i\)、\(V_R\)、\(C_j\)、\(\beta\)、\(\alpha\)。下標用 `_{}`。
- 常數一律用這組（題目另給以題目為準）：

| 常數 | 數值 |
|---|---|
| 電子電荷 \(q\) | \(1.602\times10^{-19}\) C |
| 熱電壓 \(V_T\)（300 K） | 25.9 mV |
| 矽本質濃度 \(n_i\)（300 K） | \(1.5\times10^{10}\ \text{cm}^{-3}\) |
| 矽介電常數 \(\varepsilon_s\) | \(11.7\varepsilon_0 = 1.04\times10^{-12}\) F/cm |

- 濃度用 cm⁻³，長度用 μm，電容用 pF 或 fF。
- **例題數字必須驗算**（能跑程式就用程式算），答案保留 3 位有效數字並寫單位。

### 圖
- 一律用 **inline SVG** 直接寫在 HTML 裡，不放點陣圖、不貼課本掃描圖。
- SVG 要有 `viewBox`、不設固定寬高；填色只用 `style.css` 的色票（例如 `var(--p-side)`、`var(--n-side)`、`var(--depl)`、`var(--navy)`）。
- 文字用 `font-family="inherit"`，字級約 14～16。每張圖都要有 `<figcaption>圖 N：…</figcaption>`，全頁連號。

---

## 8. 視覺風格（清爽筆記風）

- 調性：白底卡片、深藍標題、大量留白、圓角、淡陰影，像整理乾淨的筆記本。
- 色票（定義在 `style.css` 的 `:root`，**不要改**）：

| 變數 | 色碼 | 用途 |
|---|---|---|
| `--bg` | #F6F8FB | 頁面底色 |
| `--surface` | #FFFFFF | 卡片底色 |
| `--navy` | #1E3A5F | 標題、本頁重點底色 |
| `--ink` | #2A3441 | 內文 |
| `--muted` | #6A7686 | 次要文字 |
| `--accent` | #2F6FED | 連結、h2 左側色條 |
| `--def` / `--def-bg` | #2F6FED / #EEF4FF | 定義框 |
| `--formula` / `--formula-bg` | #23935A / #ECF8F1 | 公式框 |
| `--tip` / `--tip-bg` | #D99000 / #FFF7E6 | 提醒框 |
| `--example` / `--example-bg` | #7C5CD6 / #F5F2FD | 例題 |

- 字體：`Noto Sans TC`（Google Fonts），內文 17px、行高 1.85。
- 樣式只寫在 `assets/style.css`；單元頁**不可**出現 `<style>` 或 `style="…"`。

---

## 9. 寫作規範

- 繁體中文，**全形標點**（，。、：；「」？！）。
- 中文與英文、數字之間加一個半形空格（例：PN 接面、約 0.7 V、BJT 的 β）；數字與單位之間也加空格（0.33 μm）。
- 語氣：像學長姐寫給同學的筆記，口語但精確；先講直覺，再給公式。
- 專有名詞第一次出現附英文：空乏區（depletion region）。
- 每段觀念控制在 2～4 個短段落；一個段落只講一件事。
- 用自己的話整理，不大段照抄課本原文。

---

## 10. 完成前自我檢查清單

- [ ] `content/<slug>.md`、`notes/<slug>.html` 都存在，slug 與 `notes-data.js` 一致
- [ ] `notes-data.js` 的 `status`、`updated`、`summary` 已更新；首頁出現新卡片、上下頁導覽正確
- [ ] 單元頁區塊順序符合第 6 節；`<body>` 有 `data-page="note"` 與正確 `data-slug`
- [ ] 至少 3 項學習目標、1 個公式框、2 題例題（含收合解答）、3～5 點本頁重點
- [ ] 例題數字已驗算，答案有單位
- [ ] 沒有 `{{…}}` 殘留、沒有單 `$` 行內公式、沒有 `<style>` 或 `style=""`
- [ ] 全形標點；專有名詞首次出現附英文
- [ ] 手機寬度（375px）不會整頁橫向捲動
- [ ] `PROGRESS.md` 已更新

---

## 11. 禁止事項

- ❌ 不改 `style.css` 的色票、字體（除非使用者明確要求）
- ❌ 不手寫首頁卡片或上下頁連結（一律由 `notes-data.js`＋`site.js` 產生）
- ❌ 不引入其他外部資源；只允許 Google Fonts 與 KaTeX（jsDelivr CDN）
- ❌ 不使用框架、套件管理工具或建置步驟（React、npm、Jekyll 主題等）
- ❌ 不改既有單元的 slug，不刪除其他單元
- ❌ 不貼課本原文段落或掃描圖

---

## 12. 常用指令（使用者可以直接這樣說）

| 使用者說 | AI 要做的事 |
|---|---|
| 「新增單元：二極體模型」 | 跑第 4 節完整 6 步 |
| 「把這份筆記做成單元」＋附上筆記 | 同上，內容以使用者筆記為主 |
| 「修改單元 01：補一題逆偏例題」 | 先改 `content/`，再改 `notes/`，更新 `updated` |
| 「檢查全站」 | 對每個 done 單元跑第 10 節清單，回報問題 |

---

## 13. 部署

- GitHub Pages：Settings → Pages → Source 選 `main` 分支、`/ (root)`。
- 網址：`https://st110211221.github.io/course-notes/`；單元頁為 `…/notes/<slug>.html`。
- push 後約 1～2 分鐘生效。commit 訊息用中文寫「做了什麼」，例如「新增單元 02：二極體模型」。

## 14. 延伸到其他課程

`assets/`、`templates/` 與本文件第 3～11 節和課程內容無關，可以直接重複使用。要做另一門課（例如複變）時：複製整個 repo，改第 1 節（課程與課本）、第 7 節的符號與常數表、`notes-data.js` 的單元清單、首頁介紹文字即可。
