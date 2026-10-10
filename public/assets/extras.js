/* extras.js — depoimentos reais + provas sociais + notificações de compra contínuas */
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
  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function randInt(a, b) { return Math.floor(a + Math.random() * (b - a + 1)); }

  // ---------- DEPOIMENTOS (reais, ocultos até cadastro) ----------
  var DEMO_TESTIMONIALS = [
    { comment: "Material muito claro, comecei do zero e finalmente entendi a ordem do aprendizado.", firstName: "Exemplo", city: "São Paulo", uf: "SP", rating: 5 },
    { comment: "Apostila organizada e fácil de acessar pelo celular. Já estou montando meu primeiro atendimento.", firstName: "Exemplo", city: "Belo Horizonte", uf: "MG", rating: 5 },
    { comment: "Gostei das fichas e do checklist. Me ajudou a planejar preços e primeiras clientes.", firstName: "Exemplo", city: "Recife", uf: "PE", rating: 5 },
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
    var groupA = el("div", "nc-ts__group");
    groupA.innerHTML = items.map(cardHTML).join("");
    var groupB = el("div", "nc-ts__group");
    groupB.setAttribute("aria-hidden", "true");
    groupB.innerHTML = items.map(cardHTML).join("");
    while (groupA.firstChild) track.appendChild(groupA.firstChild);
    while (groupB.firstChild) track.appendChild(groupB.firstChild);
    viewport.appendChild(track);
    section.appendChild(viewport);

    if (offer && offer.parentNode) offer.parentNode.insertBefore(section, offer);
    else mount.appendChild(section);
  }

  function loadTestimonials() {
    if (DEMO) { waitAndMountTestimonials(DEMO_TESTIMONIALS); return; }
    fetch("/api/testimonials", { headers: { Accept: "application/json" } })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (items) { waitAndMountTestimonials(items); })
      .catch(function () { /* sem depoimentos -> seção oculta */ });
  }

  function waitAndMountTestimonials(items) {
    if (!items || !items.length) return;
    var tries = 0;
    function attempt() {
      var offer = document.getElementById("oferta");
      if (offer && offer.parentNode) { mountTestimonials(items, offer); return; }
      if (++tries < 40) setTimeout(attempt, 250);
    }
    attempt();
  }

  // ---------- PROVAS SOCIAIS (carrossel contínuo, factual) ----------
  // Cards factuais baseados no dossiê do produto (F01-F07). Sem inventar resultados.
  function proofIconSVG() {
    var icons = [
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19V6a2 2 0 012-2h9a2 2 0 012 2v13M4 19h13M4 19l-1 2h15l-1-2M17 9h2a2 2 0 012 2v3a1 1 0 01-1 1h-3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12l4 4L21 4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path d="M19 12a7 7 0 00-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 00-2-1.2L14 2h-4l-.5 2.6a7 7 0 00-2 1.2l-2.4-1-2 3.4 2 1.6A7 7 0 005 12a7 7 0 00.1 1.2l-2 1.6 2 3.4 2.4-1a7 7 0 002 1.2L10 22h4l.5-2.6a7 7 0 002-1.2l2.4 1 2-3.4-2-1.6A7 7 0 0019 12z" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2v20M5 9l7-7 7 7M5 15l7 7 7-7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v5M16 4v5" stroke-linecap="round"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    ];
    return icons;
  }

  var PROOF_CARDS = [
    { icon: 0, html: "<b>Apostila de 54 páginas</b> ilustradas — do básico ao atendimento." },
    { icon: 1, html: "Aulas <b>introdutórias</b> para começar do zero, sem experiência." },
    { icon: 2, html: "<b>Certificado de conclusão</b> incluso no curso." },
    { icon: 3, html: "Pagamento único de <b>R$47</b> — sem mensalidades." },
    { icon: 4, html: "Fichas de <b>anamnese e checklist</b> para organizar a rotina." },
    { icon: 5, html: "Acesso <b>vitalício</b>: estude no celular, tablet ou impresso." },
  ];

  function mountSocialProof(offer) {
    var mount = document.getElementById("nc-testimonials-mount");
    if (!mount || mount.dataset.spMounted) return;
    mount.dataset.spMounted = "1";

    var icons = proofIconSVG();
    var section = el("section", "nc-sp");
    section.setAttribute("aria-label", "Provas sociais");
    section.id = "provas-sociais";

    var head = el("div", "nc-sp__head");
    head.appendChild(el("span", "nc-sp__eyebrow", "Por que começar"));
    head.appendChild(el("h2", "nc-sp__title", "Tudo que você leva no curso"));
    section.appendChild(head);

    function cardHTML(c) {
      return (
        '<div class="nc-sp__card">' +
        '<div class="nc-sp__icon">' + icons[c.icon] + "</div>" +
        '<div class="nc-sp__text">' + c.html + "</div>" +
        "</div>"
      );
    }

    var viewport = el("div", "nc-sp__viewport");
    var track = el("div", "nc-sp__track");
    var groupA = el("div", "nc-sp__group");
    groupA.innerHTML = PROOF_CARDS.map(cardHTML).join("");
    var groupB = el("div", "nc-sp__group");
    groupB.setAttribute("aria-hidden", "true");
    groupB.innerHTML = PROOF_CARDS.map(cardHTML).join("");
    while (groupA.firstChild) track.appendChild(groupA.firstChild);
    while (groupB.firstChild) track.appendChild(groupB.firstChild);
    viewport.appendChild(track);
    section.appendChild(viewport);

    // Insere DEPOIS da oferta (depois do preço), antes do próximo irmão.
    if (offer && offer.parentNode) {
      if (offer.nextSibling) offer.parentNode.insertBefore(section, offer.nextSibling);
      else offer.parentNode.appendChild(section);
    } else {
      mount.appendChild(section);
    }
  }

  function waitAndMountSocialProof() {
    var tries = 0;
    function attempt() {
      var offer = document.getElementById("oferta");
      if (offer && offer.parentNode) { mountSocialProof(offer); return; }
      if (++tries < 40) setTimeout(attempt, 250);
    }
    attempt();
  }

  // ---------- NOTIFICAÇÕES DE COMPRA CONTÍNUAS ----------
  // 20 nomes ilustrativos que ciclam continuamente ("X acabou de comprar").
  // Cidades: capitais e cidades médias de SP, MG e Nordeste.
  var BUYER_NAMES = [
    "Ana", "Juliana", "Camila", "Marina", "Beatriz", "Letícia", "Amanda",
    "Fernanda", "Patrícia", "Larissa", "Vanessa", "Carolina", "Gabriela",
    "Aline", "Bruna", "Renata", "Márcia", "Roberta", "Priscila", "Bianca",
  ];
  var BUYER_CITIES = [
    "São Paulo/SP", "Guarulhos/SP", "Campinas/SP", "Santo André/SP", "Osasco/SP",
    "Sorocaba/SP", "Ribeirão Preto/SP", "Santos/SP", "Belo Horizonte/MG",
    "Contagem/MG", "Betim/MG", "Uberlândia/MG", "Juiz de Fora/MG",
    "Montes Claros/MG", "Divinópolis/MG", "Poços de Caldas/MG", "Salvador/BA",
    "Lauro de Freitas/BA", "Recife/PE", "Olinda/PE", "Fortaleza/CE",
    "Caucaia/CE", "São Luís/MA", "Natal/RN", "João Pessoa/PB",
    "Campina Grande/PB", "Maceió/AL", "Aracaju/SE", "Teresina/PI",
  ];

  // Gera a fila de 20 compradores (nome único + cidade + tempo relativo variado).
  function buildBuyerQueue() {
    var names = BUYER_NAMES.slice();
    // embaralha nomes
    for (var i = names.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = names[i]; names[i] = names[j]; names[j] = tmp;
    }
    return names.map(function (name, idx) {
      var city = rand(BUYER_CITIES);
      var minsAgo = idx === 0 ? randInt(1, 4) : randInt(1, 18);
      return {
        id: "b" + idx,
        firstName: name,
        city: city.split("/")[0],
        uf: city.split("/")[1],
        confirmedAt: new Date(Date.now() - minsAgo * 60000).toISOString(),
      };
    });
  }

  var queue = [];
  var queueIdx = 0;
  var currentCard = null;
  var dismissTimer = null;
  var nextTimer = null;
  var dismissedAll = false;
  var VISIBLE_MS = 5000;        // 5s visível
  var GAP_MIN_MS = 10000;       // ≥10s entre avisos (continua aparecendo)
  var GAP_MAX_MS = 16000;       // até 16s
  var FIRST_DELAY_MS = 4000;    // primeira após 4s
  var MAX_PER_VISIT = 999;      // sem limite — fica aparecendo

  function showPurchase(p) {
    if (dismissedAll) return;
    var mount = document.getElementById("nc-purchase-mount");
    if (!mount) return;
    var wrap = document.getElementById("nc-purchase-wrap");
    if (!wrap) {
      wrap = el("div", "");
      wrap.id = "nc-purchase-wrap";
      mount.appendChild(wrap);
    }
    if (currentCard && currentCard.parentNode) currentCard.parentNode.removeChild(currentCard);

    var who = fmtNameCity(p);
    var mainText = who
      ? "<b>" + escapeHTML(p.firstName) + "</b> acabou de comprar"
      : "Uma nova inscrição foi confirmada.";

    var card = el("div", "nc-px nc-in");
    card.innerHTML =
      '<div class="nc-px__icon">' + checkSVG() + "</div>" +
      '<div class="nc-px__body">' +
        '<div class="nc-px__main">' + mainText + "</div>" +
        '<div class="nc-px__time"><span class="nc-px__dot"><span class="p"></span><span></span></span>' +
        escapeHTML(p.city) + "/" + escapeHTML(p.uf) + " · " + escapeHTML(relTime(p.confirmedAt)) + "</div>" +
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

  function hideCard() {
    if (dismissTimer) { clearTimeout(dismissTimer); dismissTimer = null; }
    if (!currentCard) return;
    var c = currentCard;
    currentCard = null;
    c.className = "nc-px nc-out";
    setTimeout(function () { if (c.parentNode) c.parentNode.removeChild(c); }, 360);
  }

  function nextPurchase() {
    if (dismissedAll) return;
    if (queue.length === 0) { queue = buildBuyerQueue(); queueIdx = 0; }
    var p = queue[queueIdx % queue.length];
    queueIdx++;
    showPurchase(p);
    // agenda próxima após gap aleatório
    nextTimer = setTimeout(nextPurchase, GAP_MIN_MS + Math.random() * (GAP_MAX_MS - GAP_MIN_MS));
  }

  function startPurchaseNotifications() {
    queue = buildBuyerQueue();
    queueIdx = 0;
    setTimeout(nextPurchase, FIRST_DELAY_MS);
  }

  // ---------- init ----------
  function init() {
    loadTestimonials();
    waitAndMountSocialProof();
    startPurchaseNotifications();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
