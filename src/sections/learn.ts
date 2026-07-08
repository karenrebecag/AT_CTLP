// "Lo que vas a aprender" (01–06) — maquetación Relume "Layout 671": card a 2 columnas con
// media sticky a la izquierda (queda fija) mientras el contenido + temario numerado scrollea
// a la derecha. Copy webinar bilingüe (ES/EN). id=aprenderas.

import { renderContainer } from '../ui/layout';
import { renderHeading, renderParagraph } from '../ui/text';
import { renderPill } from '../ui/atoms/pill';
import { renderButton } from '../ui/atoms/button';
import { ASSETS } from '../constants/assets';
import type { Lang } from '../core/types';

interface Concept {
  title: string;
  desc: string;
}

interface ConceptsCopy {
  eyebrow: string;
  heading: string;
  lead: string;
  cta: string;
  concepts: Concept[];
}

const COPY: Record<Lang, ConceptsCopy> = {
  es: {
    eyebrow: 'Lo que vas a aprender',
    heading: 'Lo que vas a aprender en el webinar',
    lead: 'Desde cero: qué son los CFDs, cómo se opera en ambas direcciones, control de riesgo y qué mercados puedes operar.',
    cta: 'Quiero mi lugar',
    concepts: [
      {
        title: '¿Qué son los CFDs?',
        desc: 'Qué son los CFDs y cómo se diferencian de comprar el activo. Operas el precio de divisas, oro, índices y acciones sin poseerlos en ningún momento.',
      },
      {
        title: 'Buy y Sell',
        desc: 'La diferencia entre Buy (largo) y Sell (corto), y cómo puedes ganar en ambas direcciones: cuando el precio sube y cuando baja.',
      },
      {
        title: 'Apalancamiento y margen',
        desc: 'Cómo funcionan y por qué amplifican ganancias y pérdidas por igual. La herramienta más poderosa y, al mismo tiempo, la más peligrosa.',
      },
      {
        title: 'Control de riesgo: TP y SL',
        desc: 'Take Profit y Stop Loss como tu disciplina de bankroll: defines objetivo y límite antes de abrir la operación, no después.',
      },
      {
        title: 'Liquidación',
        desc: 'Qué es y cómo evitarla. Si el mercado se mueve en tu contra y tu margen se agota, la posición se cierra automáticamente.',
      },
      {
        title: 'Qué mercados puedes operar',
        desc: 'Divisas, oro, índices y más, todo desde una sola cuenta.',
      },
    ],
  },
  en: {
    eyebrow: 'What you’ll learn',
    heading: 'What you’ll learn in the webinar',
    lead: 'From scratch: what CFDs are, how to trade in both directions, risk control, and what markets you can trade.',
    cta: 'I want my spot',
    concepts: [
      {
        title: 'What are CFDs?',
        desc: 'What CFDs are and how they differ from buying the asset. You trade the price of forex, gold, indices, and stocks without ever owning them.',
      },
      {
        title: 'Buy and Sell',
        desc: 'The difference between Buy (long) and Sell (short), and how you can profit in both directions: when the price rises and when it falls.',
      },
      {
        title: 'Leverage & margin',
        desc: 'How they work and why they amplify gains and losses equally. The most powerful tool, and at the same time the most dangerous.',
      },
      {
        title: 'Risk controls: TP & SL',
        desc: 'Take Profit and Stop Loss as your bankroll discipline: you set the target and limit before you open the trade, not after.',
      },
      {
        title: 'Liquidation',
        desc: 'What it is and how to avoid it. If the market moves against you and your margin runs out, your position closes automatically.',
      },
      {
        title: 'What markets you can trade',
        desc: 'Forex, gold, indices, and more, all from a single account.',
      },
    ],
  },
};

function pad(n: number): string {
  return String(n + 1).padStart(2, '0');
}

function buildItem(concept: Concept, index: number): HTMLElement {
  const item = document.createElement('li');
  item.className = 'aa-agenda__item';
  item.setAttribute('data-aa-fade', '');

  const num = document.createElement('span');
  num.className = 'aa-agenda__num';
  num.textContent = pad(index);
  num.setAttribute('aria-hidden', 'true');

  const body = document.createElement('div');
  body.className = 'aa-agenda__body';

  const title = document.createElement('h3');
  title.className = 'aa-agenda__title aa-h-m';
  title.textContent = concept.title;

  const desc = document.createElement('p');
  desc.className = 'aa-agenda__desc aa-p-l';
  desc.textContent = concept.desc;

  body.append(title, desc);
  item.append(num, body);
  return item;
}

function buildMedia(): HTMLElement {
  const media = document.createElement('div');
  media.className = 'aa-lscroll__media';
  const video = document.createElement('video');
  video.className = 'aa-lscroll__video';
  video.src = ASSETS.heroVideo;
  video.muted = true;
  video.loop = true;
  video.autoplay = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('preload', 'metadata');
  video.setAttribute('aria-hidden', 'true');
  media.appendChild(video);
  return media;
}

export function renderLearnSection(root: Element, lang: Lang): void {
  const t = COPY[lang];

  const section = document.createElement('section');
  section.className = 'aa-section aa-agenda';
  section.id = 'aprenderas';
  section.setAttribute('data-aa-section-theme', 'dark');
  section.setAttribute('data-aa-nav-anchor', '');

  // Columna derecha (scrollea): eyebrow + heading + lead + temario + CTA
  const content = document.createElement('div');
  content.className = 'aa-lscroll__content';

  const pill = renderPill(t.eyebrow);
  pill.setAttribute('data-aa-fade', '');

  const lead = renderParagraph({ size: 'l', text: t.lead, className: 'aa-lscroll__lead' });
  lead.setAttribute('data-aa-fade', '');

  const items = document.createElement('ol');
  items.className = 'aa-agenda__list';
  t.concepts.forEach((concept, i) => items.appendChild(buildItem(concept, i)));

  const cta = document.createElement('div');
  cta.className = 'aa-agenda__cta';
  cta.setAttribute('data-aa-fade', '');
  cta.appendChild(renderButton({ href: '#registro', label: t.cta, variant: 'primary' }));

  content.append(
    pill,
    renderHeading({ size: 'l', tag: 'h2', text: t.heading, split: true }),
    lead,
    items,
    cta,
  );

  // 2-col: media sticky (izq) + contenido (der). Sin superficie de card (fondo del strip).
  const grid = document.createElement('div');
  grid.className = 'aa-lscroll';
  grid.append(buildMedia(), content);

  section.appendChild(renderContainer({ size: 'default', children: [grid] }));
  root.appendChild(section);
}
