// FAQ — card flotante (patrón ATOM): eyebrow + heading + intro + Accordion + CTA.
// Sección light (penúltima antes del footer), sin mapa. Copy CopyTrading bilingüe (ES/EN).

import { renderContainer } from '../ui/layout';
import { renderHeading, renderParagraph } from '../ui/text';
import { renderPill } from '../ui/atoms/pill';
import { renderAccordion } from '../ui/accordion';
import { renderButton } from '../ui/atoms/button';
import type { Lang } from '../core/types';
import type { FaqItem } from '../constants/content';

interface FaqCopy {
  eyebrow: string;
  heading: string;
  intro: string;
  cta: string;
  faqs: FaqItem[];
}

const COPY: Record<Lang, FaqCopy> = {
  es: {
    eyebrow: 'FAQ',
    heading: 'Preguntas frecuentes',
    intro: 'Lo esencial sobre el copytrading. Si te queda alguna duda, abre tu cuenta y te acompañamos.',
    cta: 'Empieza a copiar',
    faqs: [
      { question: '¿Necesito saber de trading?', answer: 'No. Esa es la idea del copytrading: eliges a un trader con experiencia y la plataforma replica sus operaciones por ti.' },
      { question: '¿Cómo elijo a quién copiar?', answer: 'Revisas la lista de traders y su ranking, con estadísticas de desempeño, riesgo y seguidores, y eliges con base en esos datos.' },
      { question: '¿Puedo dejar de copiar cuando quiera?', answer: 'Sí. Puedes ajustar el monto asignado o detener la copia en cualquier momento.' },
      { question: '¿Cuánto cuesta?', answer: 'Pagas el spread normal de cada operación y una comisión de desempeño sobre las ganancias, que va al trader que copias.' },
      { question: '¿Copiar elimina el riesgo?', answer: 'No. Copytrading replica tanto las operaciones ganadoras como las perdedoras. Sigues arriesgando tu capital y el desempeño pasado no garantiza resultados futuros.' },
    ],
  },
  en: {
    eyebrow: 'FAQ',
    heading: 'Frequently asked',
    intro: 'The essentials about copytrading. If you still have questions, open your account and we’ll guide you.',
    cta: 'Start copying',
    faqs: [
      { question: 'Do I need to know about trading?', answer: 'No. That’s the whole point of copytrading: you choose an experienced trader and the platform replicates their trades for you.' },
      { question: 'How do I choose who to copy?', answer: 'You browse the list of traders and their ranking, with statistics on performance, risk, and followers, and choose based on that data.' },
      { question: 'Can I stop copying whenever I want?', answer: 'Yes. You can adjust the allocated amount or stop copying at any time.' },
      { question: 'How much does it cost?', answer: 'You pay the standard spread on each trade and a performance fee on profits, which goes to the trader you copy.' },
      { question: 'Does copying remove the risk?', answer: 'No. Copytrading replicates both winning and losing trades. You’re still risking your capital, and past performance does not guarantee future results.' },
    ],
  },
};

export function renderFaqSection(root: Element, lang: Lang): void {
  const t = COPY[lang];

  const section = document.createElement('section');
  section.className = 'aa-section aa-faq';
  section.id = 'faq';
  section.setAttribute('data-aa-section-theme', 'light');
  section.setAttribute('data-aa-nav-anchor', '');

  const badge = renderPill(t.eyebrow);
  badge.setAttribute('data-aa-fade', '');

  const heading = renderHeading({ size: 'l', tag: 'h2', text: t.heading, split: true });

  const intro = renderParagraph({ size: 'l', text: t.intro, className: 'aa-faq__intro' });
  intro.setAttribute('data-aa-fade', '');

  const acc = renderAccordion(t.faqs);
  acc.setAttribute('data-aa-fade', '');

  const cta = document.createElement('div');
  cta.className = 'aa-faq__cta';
  cta.appendChild(renderButton({ href: '#registro', label: t.cta, variant: 'primary' }));

  const inner = document.createElement('div');
  inner.className = 'aa-faq__inner';
  inner.append(badge, heading, intro, acc, cta);

  const card = renderContainer({ size: 'default', className: 'aa-container--card', children: [inner] });
  section.appendChild(card);
  root.appendChild(section);
}
