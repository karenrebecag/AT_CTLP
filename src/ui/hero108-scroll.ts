// Hero Header 108 — animación scroll-driven: el cluster de imágenes se separa (grupo izq
// hacia −Xvw, der hacia +Xvw) mientras el central se expande a fullscreen. Port del efecto
// Relume (useScroll/useTransform) a GSAP ScrollTrigger.
//
// IMPORTANTE: se usa PIN de GSAP (no `position: sticky` de CSS). El root `.aa-landing` tiene
// overflow-x clip, y cualquier ancestro con overflow!=visible rompe el sticky → el stage no
// se fija y el efecto pasa de largo. El pin de ScrollTrigger monta position:fixed vía un
// pin-spacer, inmune a ese clip (mismo patrón que el resto de secciones con scroll aquí).
//
// Valores en vw/vh recalculados en cada refresh (invalidateOnRefresh) para aguantar resize.

import { gsap, ScrollTrigger } from './gsap-env';

export function initHero108(root: HTMLElement): void {
  const section = root.querySelector<HTMLElement>('.aa-hero108');
  if (!section) return;
  const stage = section.querySelector<HTMLElement>('.aa-hero108__stage');
  const left = section.querySelector<HTMLElement>('[data-h108-left]');
  const right = section.querySelector<HTMLElement>('[data-h108-right]');
  const center = section.querySelector<HTMLElement>('[data-h108-center]');
  if (!stage || !left || !right || !center) return;

  // Sin scroll-anim con reduced-motion: el cluster queda estático (el CSS ya lo compone).
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const vw = (): number => window.innerWidth / 100;
  const vh = (): number => window.innerHeight / 100;

  // Ambas condiciones: matchMedia NO corre el callback si ninguna matchea; con solo la de
  // mobile, en desktop no se creaba el ScrollTrigger y no había pin.
  const mm = gsap.matchMedia();
  mm.add({ isMobile: '(max-width: 767px)', isDesktop: '(min-width: 768px)' }, (ctx) => {
    const isMobile = !!ctx.conditions?.isMobile;
    const spread = isMobile ? 25 : 32; // vw que se separan los grupos laterales
    const w0 = isMobile ? 50 : 36; // ancho inicial del central (vw)
    const h0 = isMobile ? 60 : 80; // alto inicial del central (vh)

    // Tamaño inicial del central por JS (el CSS lo replica para el estado pre-hidratación).
    gsap.set(center, { width: () => w0 * vw(), height: () => h0 * vh() });

    const tl = gsap.timeline({
      defaults: { ease: 'none' }, // lineal = equivalente al mapeo useTransform [0,1]
      scrollTrigger: {
        trigger: stage,
        start: 'top top',
        // Largo del riel de scroll = 2× viewport: recorrido amplio para que la expansión no
        // "wappee" de golpe. Ajustable (subir = más lento). Función → recalcula en resize.
        end: () => '+=' + window.innerHeight * 2,
        pin: true,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    tl.to(left, { x: () => -spread * vw() }, 0)
      .to(right, { x: () => spread * vw() }, 0)
      .to(center, { x: () => -spread * vw(), width: () => 100 * vw(), height: () => 100 * vh() }, 0);
  });

  // El cluster carga imágenes remotas: al resolverse cambian la altura → recalibra triggers.
  section.querySelectorAll('img').forEach((img) => {
    if (!img.complete) img.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  });
}
