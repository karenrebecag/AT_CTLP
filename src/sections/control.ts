// "Tú mantienes el control" — maquetación Relume "Layout 617": header asimétrico (heading a
// la izq, descripción a la der) + fila de items con divisores + CTA. Los 4 puntos de control
// del brief. Copy CopyTrading bilingüe (ES/EN). id=control. Strip dark.

import { renderContainer } from '../ui/layout';
import { renderHeading, renderParagraph } from '../ui/text';
import { renderPill } from '../ui/atoms/pill';
import { renderButton } from '../ui/atoms/button';
import type { Lang } from '../core/types';

interface ControlItem {
  icon: string; // inner SVG markup (stroke currentColor)
  title: string;
  desc: string;
}

interface ControlCopy {
  eyebrow: string;
  heading: string;
  description: string;
  cta: string;
  items: ControlItem[];
}

const ICON = {
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>',
  sliders: '<path d="M4 21v-6M4 11V3M12 21v-8M12 9V3M20 21v-4M20 13V3"/><path d="M2 15h4M10 9h4M18 17h4"/>',
  stop: '<rect x="5" y="5" width="14" height="14" rx="3"/>',
  wallet: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>',
};

const COPY: Record<Lang, ControlCopy> = {
  es: {
    eyebrow: 'Siempre a tu ritmo',
    heading: 'Tú mantienes el control',
    description: 'Copiar no significa ceder el mando. Decides todo y puedes cambiarlo cuando quieras.',
    cta: 'Empieza a copiar',
    items: [
      { icon: ICON.target, title: 'Decides a quién y cuánto', desc: 'Eliges el trader y el monto que destinas a copiar.' },
      { icon: ICON.sliders, title: 'Ajustas cuando quieras', desc: 'Cambias el monto asignado en cualquier momento.' },
      { icon: ICON.stop, title: 'Detienes al instante', desc: 'Dejas de copiar en el momento que decidas.' },
      { icon: ICON.wallet, title: 'Retiras tus fondos', desc: 'Según las condiciones de tu cuenta.' },
    ],
  },
  en: {
    eyebrow: 'Always on your terms',
    heading: 'You stay in control',
    description: 'Copying doesn’t mean handing over the wheel. You decide everything, and you can change it whenever you want.',
    cta: 'Start copying',
    items: [
      { icon: ICON.target, title: 'You decide who and how much', desc: 'You pick the trader and the amount you allocate.' },
      { icon: ICON.sliders, title: 'Adjust anytime', desc: 'Change the allocated amount whenever you want.' },
      { icon: ICON.stop, title: 'Stop instantly', desc: 'Stop copying the moment you decide.' },
      { icon: ICON.wallet, title: 'Withdraw your funds', desc: 'Subject to your account conditions.' },
    ],
  },
};

function buildItem(item: ControlItem): HTMLElement {
  const el = document.createElement('div');
  el.className = 'aa-control__item';
  el.setAttribute('data-aa-fade', '');

  const icon = document.createElement('span');
  icon.className = 'aa-control__icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${item.icon}</svg>`;

  const title = document.createElement('h3');
  title.className = 'aa-control__title aa-h-m';
  title.textContent = item.title;

  const desc = document.createElement('p');
  desc.className = 'aa-control__desc aa-p-l';
  desc.textContent = item.desc;

  el.append(icon, title, desc);
  return el;
}

export function renderControlSection(root: Element, lang: Lang): void {
  const t = COPY[lang];

  const section = document.createElement('section');
  section.className = 'aa-section aa-control';
  section.id = 'control';
  section.setAttribute('data-aa-section-theme', 'dark');
  section.setAttribute('data-aa-nav-anchor', '');

  // Header asimétrico: heading a la izquierda, descripción a la derecha.
  const left = document.createElement('div');
  left.className = 'aa-control__header-left';
  const pill = renderPill(t.eyebrow);
  pill.setAttribute('data-aa-fade', '');
  left.append(pill, renderHeading({ size: 'l', tag: 'h2', text: t.heading, split: true }));

  const right = document.createElement('div');
  right.className = 'aa-control__header-right';
  const desc = renderParagraph({ size: 'l', text: t.description });
  desc.setAttribute('data-aa-fade', '');
  right.appendChild(desc);

  const header = document.createElement('div');
  header.className = 'aa-control__header';
  header.append(left, right);

  const grid = document.createElement('div');
  grid.className = 'aa-control__grid';
  t.items.forEach((it) => grid.appendChild(buildItem(it)));

  const cta = document.createElement('div');
  cta.className = 'aa-control__cta';
  cta.setAttribute('data-aa-fade', '');
  cta.appendChild(renderButton({ href: '#registro', label: t.cta, variant: 'primary' }));

  const wrap = document.createElement('div');
  wrap.className = 'aa-control__wrap';
  wrap.append(header, grid, cta);

  section.appendChild(renderContainer({ size: 'default', children: [wrap] }));
  root.appendChild(section);
}
