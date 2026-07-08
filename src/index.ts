// Entry point. Cada punto de montaje declara su configuración por atributos:
//   <div data-aa-mount
//        data-aa-theme="light|dark"
//        data-aa-lang="es|en"></div>
//
//   <script data-cfasync="false"
//     src="https://cdn.jsdelivr.net/gh/karenrebecag/AT_CTLP@latest/loader.js"></script>
const _v = document.querySelector<HTMLScriptElement>('script[src*="AT_CTLP@"]')?.src.match(/AT_CTLP@([^/]+)/)?.[1] ?? 'dev';
console.log(`[atfx-copytrading-lp] v${_v} loaded`);

import { type Theme, type Lang } from './core/types';
import { detectLang } from './core/geo';
import { storedLang, persistLang, LANG_PARAM } from './core/lang';
import { initMotion } from './ui/motion';
import { renderNavbar, initNavbar } from './ui/navbar';
import { renderTopbar, initTopbar } from './ui/topbar';
import { renderScrollProgress, initScrollProgress } from './ui/scroll-progress';
import { initSpline } from './ui/spline';
import { initParallax } from './ui/parallax';
import { initDirectionalHover } from './ui/directional-hover';
import { renderHero } from './sections/hero';
import { renderFormSection, initAtfxForm } from './sections/form';
import { renderStepsSection } from './sections/steps';
import { renderChooseSection } from './sections/choose';
import { renderControlSection } from './sections/control';
import { renderCostsSection } from './sections/costs';
import { renderFaqSection } from './sections/faq';
import { renderFooterSection } from './sections/footer';
import { initAccordion } from './ui/accordion';
import { initPillarSlider } from './ui/pillar-slider';
import { initRotatingText } from './ui/rotating-text';
import { initBenefitsScroll } from './ui/benefits-scroll';
import { initMomentumHover } from './ui/momentum-hover';
import { initButton004 } from './ui/button004';
import { initDriftGallery } from './ui/drift-gallery';
import { initNumberOdometer } from './ui/odometer';
import { initTimeline } from './ui/timeline';
import { initHero108 } from './ui/hero108-scroll';

// Scroll suave para anclas internas (#id) sin tocar CSS global de Elementor.
function initAnchorScroll(root: HTMLElement): void {
  root.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href')?.slice(1);
    if (!id) return;
    const target = root.querySelector(`#${CSS.escape(id)}`);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function resolveTheme(raw: string | undefined): Theme {
  return raw === 'dark' ? 'dark' : 'light';
}

function resolveLang(raw: string | undefined): Lang {
  return raw === 'en' ? 'en' : 'es';
}

// Resuelve el idioma una sola vez, con precedencia:
//   1) ?aalang= en la URL (elección manual del toggle) → gana y se recuerda
//   2) localStorage (última elección manual) → no lo pisa el geo en cada visita
//   3) geo-IP (país → es/en)
//   4) data-aa-lang del mount (default es)
async function resolveLangAsync(mount: HTMLElement): Promise<Lang> {
  const urlLang = new URLSearchParams(window.location.search).get(LANG_PARAM);
  if (urlLang === 'es' || urlLang === 'en') {
    persistLang(urlLang);
    return urlLang;
  }
  const stored = storedLang();
  if (stored) return stored;
  const geo = await detectLang();
  if (geo) return geo;
  return resolveLang(mount.dataset.aaLang);
}

async function boot(): Promise<void> {
  const mounts = document.querySelectorAll<HTMLElement>('[data-aa-mount]');
  if (!mounts.length) return;
  // Idioma global (manual/recordado/geo) resuelto ANTES de pintar → sin flash de idioma.
  // El form hereda este idioma vía data-lang (form.ts), así cambia a inglés por geoloc.
  const lang = await resolveLangAsync(mounts[0]);
  mounts.forEach((mount) => {
    const theme = resolveTheme(mount.dataset.aaTheme);

    // Root wrapper — todo el CSS está scopeado a .aa-landing
    const root = document.createElement('div');
    root.className = 'aa-landing';
    root.setAttribute('data-aa-theme', theme);
    root.setAttribute('data-aa-lang', lang);

    // Navbar (fixed) + cada sección como módulo, recibiendo `root` como contenedor.
    renderTopbar(root, lang); // barra fija superior (botón de registro permanente)
    renderScrollProgress(root);
    renderNavbar(root, lang);
    renderHero(root, lang);
    renderFormSection(root, lang); // registro / abre tu cuenta (form atfx-forms)
    renderStepsSection(root, lang); // "Cómo funciona" (4 pasos, Layout 626, light)
    renderChooseSection(root, lang); // "Elige con datos" (Layout 682, light)
    renderControlSection(root, lang); // "Tú mantienes el control" (Layout 617, dark)
    renderCostsSection(root, lang); // "Costos" (Pricing 13 adaptado, light)
    renderFaqSection(root, lang);
    renderFooterSection(root, lang);

    mount.replaceChildren(root);
    initAnchorScroll(root);
    // Pines primero: crean sus pin-spacers (~200vh) para que initMotion mida los triggers
    // de reveal con la altura real. Si no, en el layout colapsado las secciones de abajo
    // caen dentro del viewport y sus reveals once:true disparan antes de tiempo (el texto
    // ya está visible cuando llegas, sin animación).
    initHero108(root); // pin al tope: su spacer desplaza lo de abajo → va antes que el resto
    initBenefitsScroll(root);
    initDriftGallery(root);
    initMotion(root);
    initNavbar(root);
    initTopbar(root);
    initScrollProgress(root);
    initSpline();
    initParallax(root);
    initDirectionalHover(root);
    initAccordion(root);
    initPillarSlider(root);
    initRotatingText(root);
    // Cursor personalizado desactivado: se usa el puntero nativo del sistema.
    initMomentumHover(root);
    initButton004(root);
    initNumberOdometer();
    initTimeline(root);
    initAtfxForm();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
