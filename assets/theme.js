// Bascule clair / sombre. Le choix est mémorisé ; sinon on suit le système.
(function () {
  var root = document.documentElement;
  var KEY = "theme";

  function systemDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function current() {
    return root.getAttribute("data-theme") || (systemDark() ? "dark" : "light");
  }
  function apply(theme) {
    root.setAttribute("data-theme", theme);
    var btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    var dark = theme === "dark";
    btn.setAttribute("aria-label", dark ? "Passer au thème clair" : "Passer au thème sombre");
    btn.querySelector(".label").textContent = dark ? "Clair" : "Sombre";
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply(current());
    var btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
    });
  });
})();
