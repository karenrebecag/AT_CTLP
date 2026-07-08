// Hero (banner) — maquetación Relume "Header 108": contenido centrado arriba (título +
// descripción + CTA + disclaimer) y, debajo, un cluster de 7 imágenes que al hacer scroll
// se separan mientras la central se expande a fullscreen (sticky + scrub, ver
// ui/hero108-scroll.ts). Copy CopyTrading bilingüe (ES/EN). Imágenes: ASSETS.hero108.
// Tokens --aa-*.

import { renderContainer } from '../ui/layout';
import { renderHeading } from '../ui/text';
import { renderButton } from '../ui/atoms/button';
import { ASSETS } from '../constants/assets';
import type { Lang } from '../core/types';

interface HeroCopy {
  title: string;
  desc: string;
  cta: string;
  disclaimer: string;
}

const COPY: Record<Lang, HeroCopy> = {
  es: {
    title: 'No tienes que estudiar el mercado. Copia a quien ya lo hace.',
    desc: 'Con AT CopyTrading eliges a un trader de nuestra lista y tus operaciones replican las suyas automáticamente. Sin gráficas, sin análisis técnico, sin estar pegado a la pantalla.',
    cta: 'Empieza a copiar',
    disclaimer:
      'Operar y copiar CFDs con apalancamiento implica riesgo de pérdida. Copiar no elimina el riesgo. Opera con responsabilidad.',
  },
  en: {
    title: 'You don’t have to study the markets. Copy those who already do.',
    desc: 'With AT CopyTrading you pick a trader from our list and your trades automatically replicate theirs. No charts, no technical analysis, no being glued to the screen.',
    cta: 'Start copying',
    disclaimer:
      'Trading and copying leveraged CFDs involves risk of loss. Copying does not remove the risk. Trade responsibly.',
  },
};

// Una tesela del cluster: <img> con la relación de aspecto que pide su posición.
function buildImg(src: string, ratio: string, eager = false): HTMLElement {
  const img = document.createElement('img');
  img.className = `aa-hero108__img aa-hero108__img--${ratio}`;
  img.src = src;
  img.alt = '';
  img.decoding = 'async';
  img.loading = eager ? 'eager' : 'lazy';
  return img;
}

// Grupo lateral (izq/der): un retrato grande (oculto en mobile) + un stack de 2 imágenes.
// El orden de los hijos se invierte por lado para que el retrato quede hacia afuera.
function buildSideGroup(side: 'left' | 'right', img: string[]): HTMLElement {
  const group = document.createElement('div');
  group.className = `aa-hero108__group aa-hero108__group--${side}`;
  group.setAttribute(side === 'left' ? 'data-h108-left' : 'data-h108-right', '');

  const portrait = document.createElement('div');
  portrait.className = 'aa-hero108__side';
  portrait.appendChild(buildImg(side === 'left' ? img[0] : img[6], '2x3'));

  const stack = document.createElement('div');
  stack.className = 'aa-hero108__stack';
  if (side === 'left') {
    stack.append(buildImg(img[1], '1x1'), buildImg(img[2], '3x4'));
    group.append(portrait, stack);
  } else {
    stack.append(buildImg(img[4], '3x4'), buildImg(img[5], '1x1'));
    group.append(stack, portrait);
  }
  return group;
}

export function renderHero(root: Element, lang: Lang): void {
  const t = COPY[lang];
  const img = ASSETS.hero108;

  const hero = document.createElement('section');
  hero.className = 'aa-section aa-hero108';
  hero.id = 'top';
  hero.setAttribute('data-aa-section-theme', 'dark');
  hero.setAttribute('data-aa-nav-anchor', '');
  hero.setAttribute('data-aa-intro', ''); // el bloque de texto anima al montar

  // ── Bloque de texto (arriba, centrado) ───────────────────────────────────────
  const head = document.createElement('div');
  head.className = 'aa-hero108__head';

  const desc = document.createElement('p');
  desc.className = 'aa-hero108__desc';
  desc.setAttribute('data-aa-fade', '');
  desc.textContent = t.desc;

  const cta = document.createElement('div');
  cta.className = 'aa-hero108__cta';
  cta.setAttribute('data-aa-fade', '');
  cta.appendChild(renderButton({ href: '#registro', label: t.cta, variant: 'primary' }));

  const disclaimer = document.createElement('p');
  disclaimer.className = 'aa-hero108__disclaimer';
  disclaimer.setAttribute('data-aa-fade', '');
  disclaimer.textContent = t.disclaimer;

  // El título NO se parte con SplitText: el masking por líneas hornea el ancho de cada
  // línea al momento de medir y ya no re-fluye (queda una columna angosta centrada). Como
  // texto real envuelve natural al ancho del head. Reveal del bloque completo con fade.
  const title = renderHeading({ size: 'xxl', tag: 'h1', text: t.title, className: 'aa-hero108__title' });
  title.setAttribute('data-aa-fade', '');

  head.append(title, desc, cta, disclaimer);

  const intro = document.createElement('div');
  intro.className = 'aa-hero108__intro';
  intro.appendChild(renderContainer({ size: 'default', children: [head] }));

  // ── Stage sticky con el cluster de 7 imágenes ────────────────────────────────
  const grid = document.createElement('div');
  grid.className = 'aa-hero108__grid';

  const center = document.createElement('div');
  center.className = 'aa-hero108__center';
  center.setAttribute('data-h108-center', '');
  center.appendChild(buildImg(img[3], 'cover', true));

  grid.append(buildSideGroup('left', img), center, buildSideGroup('right', img));

  const stage = document.createElement('div');
  stage.className = 'aa-hero108__stage';
  stage.setAttribute('aria-hidden', 'true'); // cluster decorativo
  stage.appendChild(grid);

  hero.append(intro, stage);
  root.appendChild(hero);
}
