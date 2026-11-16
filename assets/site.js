/* =========================================================
   電子學筆記站｜全站共用腳本
   1. 用 KaTeX 渲染公式（$$…$$、\[…\] 為置中公式；\(…\) 為行內公式）
   2. 首頁（<body data-page="home">）：依 NOTES 產生單元卡片到 #note-list
   3. 單元頁（<body data-page="note" data-slug="…">）：依 NOTES 產生上一單元／下一單元到 #pager
   單元頁不需要、也不應該手寫卡片或上下頁連結。
   ========================================================= */

(function () {
  "use strict";

  var NOTES = window.NOTES || [];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  /* ---------- 1. 公式 ---------- */
  function renderMath() {
    if (typeof window.renderMathInElement !== "function") return;
    window.renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\[", right: "\\]", display: true },
        { left: "\\(", right: "\\)", display: false }
      ],
      throwOnError: false
    });
  }

  /* ---------- 2. 首頁卡片 ---------- */
  function renderCards() {
    var list = document.getElementById("note-list");
    if (!list) return;
    list.innerHTML = NOTES.map(function (n) {
      var done = n.status === "done";
      var tags = (n.tags || []).map(function (t) {
        return '<span class="tag">' + esc(t) + "</span>";
      }).join("");
      var status = done
        ? '<span class="tag status">已完成・' + esc(n.updated) + "</span>"
        : '<span class="tag status planned">規劃中</span>';
      var inner =
        '<div class="num">單元 ' + pad(n.unit) + "・" + esc(n.chapter) + "</div>" +
        "<h3>" + esc(n.title) + "</h3>" +
        "<p>" + esc(n.summary) + "</p>" +
        "<div>" + status + tags + "</div>";
      return done
        ? '<a class="note-card" href="notes/' + esc(n.slug) + '.html">' + inner + "</a>"
        : '<div class="note-card planned" aria-disabled="true">' + inner + "</div>";
    }).join("");
  }

  /* ---------- 3. 上一單元／下一單元 ---------- */
  function renderPager() {
    var pager = document.getElementById("pager");
    var slug = document.body.getAttribute("data-slug");
    if (!pager || !slug) return;

    var i = -1;
    for (var k = 0; k < NOTES.length; k++) if (NOTES[k].slug === slug) i = k;
    if (i < 0) {
      pager.innerHTML = '<span class="disabled">（這個單元尚未登記在 assets/notes-data.js）</span>';
      return;
    }

    function link(n, cls, label) {
      if (!n) return "";
      var text = "<small>" + label + "</small>單元 " + pad(n.unit) + "：" + esc(n.title);
      return n.status === "done"
        ? '<a class="' + cls + '" href="' + esc(n.slug) + '.html">' + text + "</a>"
        : '<span class="' + cls + ' disabled">' + text + "（規劃中）</span>";
    }

    pager.innerHTML =
      link(NOTES[i - 1], "prev", "← 上一單元") +
      link(NOTES[i + 1], "next", "下一單元 →");
  }

  function init() {
    renderCards();
    renderPager();
    renderMath();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
