// loader.js — entry point CDN. Auto-generado por CI en cada release (no editar a mano).
// Elementor carga SOLO este archivo con @latest; el loader inyecta CSS y JS
// apuntando al tag inmutable correcto, evitando el cache agresivo de assets en @latest.
(function () {
  var v = "1.0.6";
  var base = "https://cdn.jsdelivr.net/gh/karenrebecag/AT_CTLP";

  var jsInjected = false;
  function injectJS() {
    if (jsInjected) return;
    jsInjected = true;
    var js = document.createElement("script");
    js.type = "module";
    js.setAttribute("data-cfasync", "false");
    js.src = base + "@" + v + "/dist/landing.js";
    document.head.appendChild(js);
  }

  var css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = base + "@" + v + "/dist/landing.css";
  // Arranca el JS solo cuando el CSS aplicó. Si el módulo corre antes que el stylesheet,
  // SplitText mide los headings contra un ancho sin estilar y hornea líneas angostas.
  css.onload = injectJS;
  css.onerror = injectJS; // el CSS falla → no bloquear el render, montar igual
  document.head.appendChild(css);
  // Red de seguridad: si onload no dispara (algunos navegadores con cache), monta tras un tick.
  setTimeout(injectJS, 3000);
})();
