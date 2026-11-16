/* =========================================================
   單元清單（全站唯一的單元登記處）
   - 陣列順序＝首頁卡片順序＝上一單元／下一單元的順序。
   - 新增單元：在對的位置加一筆（或把 planned 改成 done），不要改別的檔案的導覽連結。
   - 欄位：
       slug     英文小寫＋連字號，必須和 notes/<slug>.html、content/<slug>.md 一致
       unit     單元編號（整數，從 1 開始連號）
       title    中文標題
       chapter  對應課本章節（Sedra/Smith）
       summary  一句話摘要（40 字內，給首頁卡片用）
       tags     3～5 個關鍵字
       status   "done"＝已完成可點；"planned"＝規劃中（首頁顯示灰色、不可點）
       updated  最後更新日期 YYYY-MM-DD（planned 可留空字串）
   ========================================================= */

window.NOTES = [
  {
    slug: "pn-junction",
    unit: 1,
    title: "PN 接面",
    chapter: "Sedra/Smith Ch.3",
    summary: "空乏區怎麼形成、內建電位與空乏區寬度怎麼算，以及偏壓下的電流與電容。",
    tags: ["內建電位", "空乏區", "接面電容", "二極體方程式"],
    status: "done",
    updated: "2026-11-16"
  },
  {
    slug: "diode-models",
    unit: 2,
    title: "二極體模型與直流分析",
    chapter: "Sedra/Smith Ch.4",
    summary: "理想、定電壓降、指數模型怎麼選，以及用迭代法解二極體電路。",
    tags: ["理想二極體", "定電壓降模型", "指數模型", "小訊號模型"],
    status: "done",
    updated: "2026-11-16"
  },
  {
    slug: "diode-applications",
    unit: 3,
    title: "二極體應用電路",
    chapter: "Sedra/Smith Ch.4",
    summary: "整流器、濾波電容、限幅器與稽納穩壓電路的分析方法。",
    tags: ["半波整流", "全波整流", "限幅器", "稽納二極體"],
    status: "planned",
    updated: ""
  },
  {
    slug: "bjt-dc",
    unit: 4,
    title: "BJT 工作原理與直流分析",
    chapter: "Sedra/Smith Ch.6",
    summary: "BJT 的工作區、電流關係，以及直流偏壓電路的解題步驟。",
    tags: ["主動區", "飽和區", "β 與 α", "直流偏壓"],
    status: "planned",
    updated: ""
  }
];
