// "Elige con datos, no con corazonadas" — maquetación Relume "Layout 682": card 2-col con
// imagen a un lado y lista de criterios (icono + título + texto) al otro. Los 4 criterios
// para comparar traders del brief. Copy CopyTrading bilingüe (ES/EN). id=elige. Strip light.

import { renderContainer } from '../ui/layout';
import { renderSectionHeader } from '../ui/section-header';
import { renderButton } from '../ui/atoms/button';
import { ASSETS } from '../constants/assets';
import type { Lang } from '../core/types';

interface Criterion {
  icon: string; // inner SVG markup (stroke currentColor)
  title: string;
  desc: string;
}

interface ChooseCopy {
  eyebrow: string;
  heading: string;
  sub: string;
  legal: string;
  cta: string;
  criteria: Criterion[];
}

const ICON = {
  bars: '<path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/><rect x="17" y="4" width="3" height="14"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  gauge: '<path d="M3 18a9 9 0 1 1 18 0"/><path d="M12 18l4-5"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M21 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
};

const COPY: Record<Lang, ChooseCopy> = {
  es: {
    eyebrow: 'Antes de copiar',
    heading: 'Elige con datos, no con corazonadas',
    sub: 'Cada trader en AT CopyTrading tiene un perfil público con sus estadísticas. Compara antes de decidir a quién copiar.',
    legal: 'El desempeño pasado no garantiza resultados futuros.',
    cta: 'Empieza a copiar',
    criteria: [
      { icon: ICON.bars, title: 'Ranking de desempeño', desc: 'Su posición frente a otros traders según resultados.' },
      { icon: ICON.clock, title: 'Historial de rendimiento', desc: 'Cómo ha operado en el tiempo, no solo su mejor racha.' },
      { icon: ICON.gauge, title: 'Nivel de riesgo y estilo', desc: 'Qué tan agresivo opera y en qué mercados.' },
      { icon: ICON.users, title: 'Seguidores que ya lo copian', desc: 'Cuánta gente confía en su estrategia.' },
    ],
  },
  en: {
    eyebrow: 'Before you copy',
    heading: 'Choose with data, not hunches',
    sub: 'Every trader on AT CopyTrading has a public profile with their statistics. Compare before deciding who to copy.',
    legal: 'Past performance does not guarantee future results.',
    cta: 'Start copying',
    criteria: [
      { icon: ICON.bars, title: 'Performance ranking', desc: 'Where they stand against other traders by results.' },
      { icon: ICON.clock, title: 'Performance history', desc: 'How they’ve traded over time, not just their best streak.' },
      { icon: ICON.gauge, title: 'Risk level and style', desc: 'How aggressively they trade and in which markets.' },
      { icon: ICON.users, title: 'Followers already copying', desc: 'How many people already trust their strategy.' },
    ],
  },
};

function buildCriterion(c: Criterion): HTMLElement {
  const item = document.createElement('li');
  item.className = 'aa-choose__item';
  item.setAttribute('data-aa-fade', '');

  const icon = document.createElement('span');
  icon.className = 'aa-choose__icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${c.icon}</svg>`;

  const title = document.createElement('h3');
  title.className = 'aa-choose__item-title aa-h-m';
  title.textContent = c.title;

  const desc = document.createElement('p');
  desc.className = 'aa-choose__item-desc aa-p-l';
  desc.textContent = c.desc;

  const body = document.createElement('div');
  body.append(title, desc);
  item.append(icon, body);
  return item;
}

export function renderChooseSection(root: Element, lang: Lang): void {
  const t = COPY[lang];

  const section = document.createElement('section');
  section.className = 'aa-section aa-choose';
  section.id = 'elige';
  section.setAttribute('data-aa-section-theme', 'light');
  section.setAttribute('data-aa-nav-anchor', '');

  const header = renderSectionHeader({ eyebrow: t.eyebrow, heading: t.heading, sub: t.sub, align: 'center' });
  header.classList.add('aa-choose__header');

  // Card 2-col: media + lista de criterios.
  const media = document.createElement('div');
  media.className = 'aa-choose__media';
  const img = document.createElement('img');
  img.src = ASSETS.chooseImage;
  img.alt = '';
  img.loading = 'lazy';
  img.decoding = 'async';
  media.appendChild(img);

  const list = document.createElement('ul');
  list.className = 'aa-choose__list';
  t.criteria.forEach((c) => list.appendChild(buildCriterion(c)));

  const legal = document.createElement('p');
  legal.className = 'aa-choose__legal';
  legal.textContent = t.legal;

  const cta = document.createElement('div');
  cta.className = 'aa-choose__cta';
  cta.setAttribute('data-aa-fade', '');
  cta.appendChild(renderButton({ href: '#registro', label: t.cta, variant: 'primary' }));

  const body = document.createElement('div');
  body.className = 'aa-choose__body';
  body.append(list, legal, cta);

  const card = document.createElement('div');
  card.className = 'aa-choose__card';
  card.append(media, body);

  const wrap = document.createElement('div');
  wrap.className = 'aa-choose__wrap';
  wrap.append(header, card);

  section.appendChild(renderContainer({ size: 'default', children: [wrap] }));
  root.appendChild(section);
}
