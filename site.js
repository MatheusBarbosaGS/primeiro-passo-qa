/* Primeiro Passo em QA: comportamento compartilhado entre as páginas */
(function () {
  // Menu: centraliza a página atual e mostra um degradê onde há mais itens para rolar
  var nav = document.querySelector("nav.links");
  if (nav) {
    var cur = nav.querySelector("[aria-current]");
    if (cur && nav.scrollWidth > nav.clientWidth) {
      nav.scrollLeft += cur.getBoundingClientRect().left - nav.getBoundingClientRect().left - (nav.clientWidth - cur.offsetWidth) / 2;
    }
    var fades = function () {
      var max = nav.scrollWidth - nav.clientWidth;
      nav.classList.toggle("fade-l", nav.scrollLeft > 4);
      nav.classList.toggle("fade-r", max > 4 && nav.scrollLeft < max - 4);
    };
    nav.addEventListener("scroll", fades, { passive: true });
    window.addEventListener("resize", fades);
    fades();
  }

  // Subpáginas: mostra o progresso da trilha salvo neste navegador
  var mini = document.getElementById("suiteMini");
  if (mini) {
    var done = 0, total = 36;
    try {
      done = Object.keys(JSON.parse(localStorage.getItem("pp-qa-progress-v2") || "{}") || {}).length;
      total = parseInt(localStorage.getItem("pp-qa-total"), 10) || 36;
    } catch (e) {}
    var pct = Math.round((done / total) * 100);
    mini.innerHTML = '<span>suite: carreira-qa</span><span class="pct">' + done + "/" + total + " · " + pct + "%</span>" +
      '<span class="go">' + (done ? "Continuar a trilha" : "Começar a trilha") + " →</span>";
    mini.setAttribute("aria-label", "Seu progresso na trilha: " + done + " de " + total + " itens. " + (done ? "Continuar a trilha" : "Começar a trilha"));
  }
})();
