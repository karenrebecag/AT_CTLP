// "Costos" — maquetación Relume "Pricing 13" adaptada: header centrado + 2 tarjetas de costo
// (icono + concepto + badge de "cómo se cobra" + descripción + nota). Sin precios/planes: son
// los 2 conceptos del brief (Spread / Performance fee). Copy CopyTrading bilingüe (ES/EN).
// id=costos. Strip light.

import { renderContainer } from '../ui/layout';
import { renderSectionHeader } from '../ui/section-header';
import { renderButton } from '../ui/atoms/button';
import type { Lang } from '../core/types';

interface CostCard {
  icon: string; // inner SVG markup (stroke currentColor)
  name: string;
  badge: string; // cómo se cobra (reemplaza el "precio/mo" del layout original)
  desc: string;
  note: string;
}

interface CostsCopy {
  eyebrow: string;
  heading: string;
  description: string;
  cta: string;
  cards: CostCard[];
}

const ICON = {
  transfer: '<path d="M17 3v18"/><path d="m21 7-4-4-4 4"/><path d="M7 21V3"/><path d="m3 17 4 4 4-4"/>',
  trending: '<path d="M3 17l6-6 4 4 8-8"/><path d="M17 7h4v4"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
};

const COPY: Record<Lang, CostsCopy> = {
  es: {
    eyebrow: 'Costos',
    heading: 'Sin costos ocultos',
    description: 'Pagas el spread habitual y, si el trader genera ganancias, una comisión de desempeño. Nada más.',
    cta: 'Empieza a copiar',
    cards: [
      {
        icon: ICON.transfer,
        name: 'Spread',
        badge: 'Por operación',
        desc: 'El spread normal de cada operación replicada.',
        note: 'El mismo spread que en una operación normal.',
      },
      {
        icon: ICON.trending,
        name: 'Performance fee',
        badge: 'Sobre ganancias',
        desc: 'Una comisión sobre las ganancias, pagada al trader que copias.',
        note: 'Solo pagas si el trader genera ganancias.',
      },
    ],
  },
  en: {
    eyebrow: 'Costs',
    heading: 'No hidden costs',
    description: 'You pay the usual spread and, if the trader generates profits, a performance fee. Nothing else.',
    cta: 'Start copying',
    cards: [
      {
        icon: ICON.transfer,
        name: 'Spread',
        badge: 'Per trade',
        desc: 'The standard spread on each replicated trade.',
        note: 'The same spread as a normal trade.',
      },
      {
        icon: ICON.trending,
        name: 'Performance fee',
        badge: 'On profits',
        desc: 'A commission on profits, paid to the trader you copy.',
        note: 'You only pay if the trader generates profits.',
      },
    ],
  },
};

function buildCard(card: CostCard): HTMLElement {
  const el = document.createElement('div');
  el.className = 'aa-costs__card';
  el.setAttribute('data-aa-fade', '');

  const icon = document.createElement('span');
  icon.className = 'aa-costs__icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${card.icon}</svg>`;

  const name = document.createElement('h3');
  name.className = 'aa-costs__name aa-h-m';
  name.textContent = card.name;

  const badge = document.createElement('span');
  badge.className = 'aa-costs__badge';
  badge.textContent = card.badge;

  const head = document.createElement('div');
  head.className = 'aa-costs__head';
  head.append(name, badge);

  const desc = document.createElement('p');
  desc.className = 'aa-costs__desc aa-p-l';
  desc.textContent = card.desc;

  const divider = document.createElement('div');
  divider.className = 'aa-costs__divider';

  const check = document.createElement('span');
  check.className = 'aa-costs__check';
  check.setAttribute('aria-hidden', 'true');
  check.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON.check}</svg>`;
  const noteText = document.createElement('p');
  noteText.textContent = card.note;
  const note = document.createElement('div');
  note.className = 'aa-costs__note';
  note.append(check, noteText);

  el.append(icon, head, desc, divider, note);
  return el;
}

export function renderCostsSection(root: Element, lang: Lang): void {
  const t = COPY[lang];

  const section = document.createElement('section');
  section.className = 'aa-section aa-costs';
  section.id = 'costos';
  section.setAttribute('data-aa-section-theme', 'light');
  section.setAttribute('data-aa-nav-anchor', '');

  const header = renderSectionHeader({ eyebrow: t.eyebrow, heading: t.heading, sub: t.description, align: 'center' });
  header.classList.add('aa-costs__header');

  const grid = document.createElement('div');
  grid.className = 'aa-costs__grid';
  t.cards.forEach((c) => grid.appendChild(buildCard(c)));

  const cta = document.createElement('div');
  cta.className = 'aa-costs__cta';
  cta.setAttribute('data-aa-fade', '');
  cta.appendChild(renderButton({ href: '#registro', label: t.cta, variant: 'primary' }));

  const wrap = document.createElement('div');
  wrap.className = 'aa-costs__wrap';
  wrap.append(header, grid, cta);

  section.appendChild(renderContainer({ size: 'default', children: [wrap] }));
  root.appendChild(section);
}
