/* extras.js — depoimentos + notificações de compra (dados reais) */
(function () {
  "use strict";
  var DEMO = /[?&]demo=1\b/.test(location.search);

  // ---------- helpers ----------
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function starsSVG(n) {
    var s = "";
    for (var i = 0; i < 5; i++) {
      s +=
        '<svg viewBox="0 0 24 24" fill="' +
        (i < n ? "#650d25" : "none") +
        '" stroke="#650d25" stroke-width="1.6"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" stroke-linejoin="round"/></svg>';
    }
    return s;
  }
  function checkSVG() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M5 12l5 5L20 7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }
  function xSVG() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg>';
  }
  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
  function fmtNameCity(p) {
    // Retorna null se faltar nome ou cidade/UF -> frase genérica.
    if (!p.firstName || !p.city || !p.uf) return null;
    return p.firstName + ", de " + p.city + "/" + p.uf;
  }
  function relTime(iso) {
    var diff = Math.max(0, Date.now() - new Date(iso).getTime());
    var m = Math.floor(diff / 60000);
    if (m < 1) return "há instantes";
    if (m === 1) return "há 1 minuto";
    if (m < 60) return "há " + m + " minutos";
    var h = Math.floor(m / 60);
    if (h === 1) return "há 1 hora";
    return "há " + h + " horas";
  }

  // ---------- DEPOIMENTOS ----------
  var DEMO_TESTIMONIALS = [
    {
      comment:
        "Material muito claro, comecei do zero e finalmente entendi a ordem do aprendizado.",
      firstName: "Exemplo",
      city: "São Paulo",
      uf: "SP",
      rating: 5,
    },
    {
      comment:
        "Apostila organizada e fácil de acessar pelo celular. Já estou montando meu primeiro atendimento.",
      firstName: "Exemplo",
      city: "Belo Horizonte",
      uf: "MG",
      rating: 5,
    },
    {
      comment:
        "Gostei das fichas e do checklist. Me ajudou a planejar preços e primeiras clientes.",
      firstName: "Exemplo",
      city: "Recife",
      uf: "PE",
      rating: 5,
    },
  ];

  function mountTestimonials(items, offer) {
    var mount = document.getElementById("nc-testimonials-mount");
    if (!mount || mount.dataset.mounted) return;
    mount.dataset.mounted = "1";

    var section = el("section", "nc-ts");
    section.setAttribute("aria-label", "Quem começou, conta");
    section.id = "depoimentos";

    var head = el("div", "nc-ts__head");
    head.appendChild(el("span", "nc-ts__eyebrow", "Quem começou, conta"));
    head.appendChild(el("h2", "nc-ts__title", "Quem começou, conta"));
    section.appendChild(head);

    var testBadge = !!DEMO;

    function cardHTML(it) {
      return (
        '<div class="nc-ts__card">' +
        (testBadge ? '<span class="nc-ts__testbadge">Teste</span>' : "") +
        '<div class="nc-ts__stars">' + starsSVG(it.rating) + "</div>" +
        '<p class="nc-ts__comment">' + escapeHTML(it.comment) + "</p>" +
        '<div class="nc-ts__author"><b>' + escapeHTML(it.firstName) +
        "</b> · " + escapeHTML(it.city) + "/" + escapeHTML(it.uf) + "</div>" +
        "</div>"
      );
    }

    var viewport = el("div", "nc-ts__viewport");
    var track = el("div", "nc-ts__track");

    // 1ª cópia: acessível a leitores de tela.
    var groupA = el("div", "nc-ts__group");
    groupA.innerHTML = items.map(cardHTML).join("");
    // 2ª cópia: apenas para continuidade da animação (aria-hidden).
    var groupB = el("div", "nc-ts__group");
    groupB.setAttribute("aria-hidden", "true");
    groupB.innerHTML = items.map(cardHTML).join("");

    // Move os cards para o track (não queremos wrappers no DOM).
    while (groupA.firstChild) track.appendChild(groupA.firstChild);
    while (groupB.firstChild) track.appendChild(groupB.firstChild);

    viewport.appendChild(track);
    section.appendChild(viewport);

    // Insere ANTES da oferta.
    if (offer && offer.parentNode) {
      offer.parentNode.insertBefore(section, offer);
    } else {
      mount.appendChild(section);
    }
  }

  function loadTestimonials() {
    if (DEMO) {
      waitAndMountTestimonials(DEMO_TESTIMONIALS);
      return;
    }
    fetch("/api/testimonials", { headers: { Accept: "application/json" } })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (items) { waitAndMountTestimonials(items); })
      .catch(function () { /* sem depoimentos -> seção oculta */ });
  }

  // Espera o #oferta existir (React pode montar depois do DOMContentLoaded)
  // e então insere a seção ANTES dela.
  function waitAndMountTestimonials(items) {
    if (!items || !items.length) return;
    var tries = 0;
    function attempt() {
      var offer = document.getElementById("oferta");
      if (offer && offer.parentNode) {
        mountTestimonials(items, offer);
        return;
      }
      if (++tries < 40) setTimeout(attempt, 250); // até ~10s
    }
    attempt();
  }

  // ---------- NOTIFICAÇÕES DE COMPRA ----------
  var DEMO_PURCHASES = [
    { id: "demo-1", firstName: "Exemplo", city: "Guarulhos", uf: "SP", confirmedAt: new Date(Date.now() - 3 * 60000).toISOString() },
    { id: "demo-2", firstName: "Exemplo", city: "Contagem", uf: "MG", confirmedAt: new Date(Date.now() - 12 * 60000).toISOString() },
  ];

  var shown = new Set();
  var shownCount = 0;
  var lastShownAt = 0;
  var currentCard = null;
  var dismissTimer = null;
  var nextTimer = null;
  var dismissedAll = false;
  var MAX_PER_VISIT = 4;
  var MIN_GAP_MS = 30000;
  var VISIBLE_MS = 5000;

  function showPurchase(p) {
    if (dismissedAll) return;
    if (shownCount >= MAX_PER_VISIT) return;
    if (Date.now() - lastShownAt < MIN_GAP_MS) return;
    if (shown.has(p.id)) return;
    shown.add(p.id);
    shownCount++;
    lastShownAt = Date.now();

    var mount = document.getElementById("nc-purchase-mount");
    if (!mount) return;
    var wrap = document.getElementById("nc-purchase-wrap");
    if (!wrap) {
      wrap = el("div", "");
      wrap.id = "nc-purchase-wrap";
      mount.appendChild(wrap);
    }
    // limpa card anterior
    if (currentCard && currentCard.parentNode) currentCard.parentNode.removeChild(currentCard);

    var who = fmtNameCity(p);
    var mainText = who
      ? "<b>" + escapeHTML2(who) + "</b> adquiriu Limpeza de Pele do Zero."
      : "Uma nova inscrição foi confirmada.";

    var card = el("div", "nc-px nc-in");
    card.innerHTML =
      '<div class="nc-px__icon">' + checkSVG() + "</div>" +
      '<div class="nc-px__body">' +
        '<div class="nc-px__main">' + mainText + "</div>" +
        '<div class="nc-px__time"><span class="nc-px__dot"><span class="p"></span><span></span></span>' +
        escapeHTML2(relTime(p.confirmedAt)) + "</div>" +
      "</div>" +
      (DEMO ? '<span class="nc-px__test">Teste</span>' : "") +
      '<button class="nc-px__close" aria-label="Fechar">' + xSVG() + "</button>";

    wrap.appendChild(card);
    currentCard = card;

    card.querySelector(".nc-px__close").addEventListener("click", function () {
      dismissedAll = true;
      hideCard();
    });

    dismissTimer = setTimeout(hideCard, VISIBLE_MS);
  }

  function escapeHTML2(s) { return escapeHTML(s); }

  function hideCard() {
    if (dismissTimer) { clearTimeout(dismissTimer); dismissTimer = null; }
    if (!currentCard) return;
    var c = currentCard;
    currentCard = null;
    c.className = "nc-px nc-out";
    setTimeout(function () {
      if (c.parentNode) c.parentNode.removeChild(c);
    }, 360);
  }

  function tryShowFromList(list) {
    if (!list || !list.length) return;
    for (var i = 0; i < list.length; i++) {
      var p = list[i];
      if (!shown.has(p.id)) {
        showPurchase(p);
        return;
      }
    }
  }

  function pollPurchases() {
    if (DEMO) {
      tryShowFromList(DEMO_PURCHASES);
      return;
    }
    if (dismissedAll || shownCount >= MAX_PER_VISIT) return;
    if (Date.now() - lastShownAt < MIN_GAP_MS) return;
    var since = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    fetch("/api/recent-purchases?since=" + encodeURIComponent(since), {
      headers: { Accept: "application/json" },
    })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (list) { tryShowFromList(list); })
      .catch(function () { /* integração indisponível -> sem notificações */ });
  }

  // ---------- init ----------
  function init() {
    loadTestimonials();
    // primeira verificação após 5s; depois a cada 30s (respeitando gap mínimo).
    setTimeout(pollPurchases, 5000);
    setInterval(pollPurchases, 30000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
