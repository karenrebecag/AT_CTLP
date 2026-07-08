// Navegación — labels + anclas, bilingües (ES/EN). Las anclas apuntan a secciones que
// existen en el DOM; el indicador del navbar se activa solo cuando el ancla existe.

import type { Lang } from '../core/types';

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: Record<Lang, NavLink[]> = {
  es: [
    { label: 'Por qué asistir', href: '#problema' },
    { label: 'Qué aprenderás', href: '#aprenderas' },
    { label: 'Instructor', href: '#instructor' },
    { label: 'FAQ', href: '#faq' },
  ],
  en: [
    { label: 'Why attend', href: '#problema' },
    { label: 'What you’ll learn', href: '#aprenderas' },
    { label: 'Instructor', href: '#instructor' },
    { label: 'FAQ', href: '#faq' },
  ],
};

export const NAV_CTA: Record<Lang, NavLink> = {
  es: { label: 'Reserva tu lugar', href: '#registro' },
  en: { label: 'Reserve your spot', href: '#registro' },
};
