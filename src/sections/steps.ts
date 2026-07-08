// "Cómo funciona" — maquetación Relume "Layout 626": header (izq) + fila de 4 pasos con
// divisores + CTA. Los 4 pasos del copytrading (Elige · Asigna · Copia · Controla),
// numerados 01–04. Copy CopyTrading bilingüe (ES/EN). id=como-funciona. Strip light.

import { renderContainer } from '../ui/layout';
import { renderSectionHeader } from '../ui/section-header';
import { renderButton } from '../ui/atoms/button';
import type { Lang } from '../core/types';

interface Step {
  num: string;
  title: string;
  desc: string;
}

interface StepsCopy {
  eyebrow: string;
  heading: string;
  sub: string;
  cta: string;
  steps: Step[];
}

const COPY: Record<Lang, StepsCopy> = {
  es: {
    eyebrow: 'Cómo funciona',
    heading: 'Copiar a un trader, en cuatro pasos',
    sub: 'Tú decides a quién copiar y cuánto asignar; la plataforma hace el resto.',
    cta: 'Empieza a copiar',
    steps: [
      { num: '01', title: 'Elige', desc: 'Revisa la lista de traders y su ranking, con estadísticas de desempeño.' },
      { num: '02', title: 'Asigna', desc: 'Asignas cuánto quieres destinar a copiar a ese trader.' },
      { num: '03', title: 'Copia', desc: 'Cada operación que abre el trader se replica automáticamente en tu cuenta.' },
      { num: '04', title: 'Controla', desc: 'Sigues tu rendimiento en tiempo real y ajustas o detienes cuando quieras.' },
    ],
  },
  en: {
    eyebrow: 'How it works',
    heading: 'Copy a trader in four steps',
    sub: 'You decide who to copy and how much to allocate; the platform does the rest.',
    cta: 'Start copying',
    steps: [
      { num: '01', title: 'Choose', desc: 'Browse the list of traders and their ranking, with performance statistics.' },
      { num: '02', title: 'Allocate', desc: 'Allocate how much you want to dedicate to copying that trader.' },
      { num: '03', title: 'Copy', desc: 'Every trade the trader opens is automatically replicated in your account.' },
      { num: '04', title: 'Control', desc: 'Track your performance in real time and adjust or stop whenever you want.' },
    ],
  },
};

function buildStep(step: Step): HTMLElement {
  const item = document.createElement('div');
  item.className = 'aa-steps__item';
  item.setAttribute('data-aa-fade', '');

  const num = document.createElement('span');
  num.className = 'aa-steps__num';
  num.setAttribute('aria-hidden', 'true');
  num.setAttribute('data-odometer-element', ''); // los dígitos ruedan al entrar (initNumberOdometer)
  num.textContent = step.num;

  const title = document.createElement('h3');
  title.className = 'aa-steps__title aa-h-m'; // heading tier (fuente display + escala DS)
  title.textContent = step.title;

  const desc = document.createElement('p');
  desc.className = 'aa-steps__desc aa-p-l'; // cuerpo estándar del sistema
  desc.textContent = step.desc;

  item.append(num, title, desc);
  return item;
}

export function renderStepsSection(root: Element, lang: Lang): void {
  const t = COPY[lang];

  const section = document.createElement('section');
  section.className = 'aa-section aa-steps';
  section.id = 'como-funciona';
  section.setAttribute('data-aa-section-theme', 'light');
  section.setAttribute('data-aa-nav-anchor', '');

  const header = renderSectionHeader({ eyebrow: t.eyebrow, heading: t.heading, sub: t.sub, align: 'left' });
  header.classList.add('aa-steps__header');

  const grid = document.createElement('div');
  grid.className = 'aa-steps__grid';
  grid.setAttribute('data-odometer-group', ''); // rueda los 01–04 con stagger al entrar la fila
  t.steps.forEach((s) => grid.appendChild(buildStep(s)));

  const cta = document.createElement('div');
  cta.className = 'aa-steps__cta';
  cta.setAttribute('data-aa-fade', '');
  cta.appendChild(renderButton({ href: '#registro', label: t.cta, variant: 'primary' }));

  const wrap = document.createElement('div');
  wrap.className = 'aa-steps__wrap';
  wrap.append(header, grid, cta);

  section.appendChild(renderContainer({ size: 'default', children: [wrap] }));
  root.appendChild(section);
}
