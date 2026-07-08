// "Tu instructor" — spotlight photo-forward: intro (tagline + heading + lead) + ficha del
// ponente a 2 columnas (retrato grande + nombre/rol/bio). Copy webinar bilingüe (ES/EN).
// Strip dark. id=instructor (ancla). El retrato es placeholder (iniciales) hasta tener la
// foto real de Diego Albuja en ASSETS.instructorPhoto.

import { renderContainer } from '../ui/layout';
import { renderHeading, renderParagraph } from '../ui/text';
import { renderPill } from '../ui/atoms/pill';
import { ASSETS } from '../constants/assets';
import type { Lang } from '../core/types';

interface InstructorCopy {
  tagline: string;
  heading: string;
  lead: string;
  name: string;
  role: string;
  bio: string[];
  initials: string;
}

const COPY: Record<Lang, InstructorCopy> = {
  es: {
    tagline: 'Tu instructor',
    heading: 'Quién lo imparte',
    lead: 'Un analista en activo, no un vendedor: aprendes con alguien que opera y enseña los mercados todos los días.',
    name: 'Diego Albuja',
    role: 'Market Analyst en ATFX LATAM · Fundador de DF Academy',
    bio: [
      'Con más de 8 años de experiencia en mercados financieros, es especialista en análisis técnico, educación financiera y psicología del inversor.',
      'Ha sido entrevistado en medios como Forbes México, El Economista, El Financiero y Yahoo Finance. Su enfoque: una visión realista y responsable de los mercados, centrada en la disciplina y la correcta gestión del riesgo.',
    ],
    initials: 'DA',
  },
  en: {
    tagline: 'Your instructor',
    heading: 'Who leads it',
    lead: 'An active analyst, not a salesperson: you learn from someone who trades and teaches the markets every day.',
    name: 'Diego Albuja',
    role: 'Market Analyst at ATFX LATAM · Founder of DF Academy',
    bio: [
      'With over 8 years of experience in financial markets, he specializes in technical analysis, financial education, and investor psychology.',
      'He has been interviewed by outlets such as Forbes México, El Economista, El Financiero, and Yahoo Finance. His approach: a realistic, responsible view of the markets, focused on discipline and proper risk management.',
    ],
    initials: 'DA',
  },
};

function buildPhoto(t: InstructorCopy): HTMLElement {
  const photo = document.createElement('div');
  photo.className = 'aa-team__photo';
  if (ASSETS.instructorPhoto) {
    const img = document.createElement('img');
    img.src = ASSETS.instructorPhoto;
    img.alt = t.name;
    img.loading = 'lazy';
    img.decoding = 'async';
    photo.appendChild(img);
  } else {
    const span = document.createElement('span');
    span.className = 'aa-team__initials';
    span.textContent = t.initials;
    photo.appendChild(span);
  }
  return photo;
}

export function renderInstructorSection(root: Element, lang: Lang): void {
  const t = COPY[lang];

  const section = document.createElement('section');
  section.className = 'aa-section aa-team';
  section.id = 'instructor';
  section.setAttribute('data-aa-section-theme', 'light');
  section.setAttribute('data-aa-nav-anchor', '');

  // Intro (tagline + heading + lead)
  const intro = document.createElement('div');
  intro.className = 'aa-team__intro';
  const pill = renderPill(t.tagline);
  pill.setAttribute('data-aa-fade', '');
  const lead = renderParagraph({ size: 'l', text: t.lead, className: 'aa-team__lead' });
  lead.setAttribute('data-aa-fade', '');
  intro.append(pill, renderHeading({ size: 'l', tag: 'h2', text: t.heading, split: true }), lead);

  // Ficha del ponente: retrato grande + meta (2 columnas)
  const member = document.createElement('div');
  member.className = 'aa-team__spot';
  member.setAttribute('data-aa-fade', '');

  const meta = document.createElement('div');
  meta.className = 'aa-team__meta';

  const name = document.createElement('h3');
  name.className = 'aa-team__name aa-h-l';
  name.textContent = t.name;

  const role = document.createElement('p');
  role.className = 'aa-team__role';
  role.textContent = t.role;

  meta.append(name, role);
  t.bio.forEach((p) => {
    const par = document.createElement('p');
    par.className = 'aa-team__bio aa-p-l';
    par.textContent = p;
    meta.appendChild(par);
  });

  member.append(buildPhoto(t), meta);

  const wrap = document.createElement('div');
  wrap.className = 'aa-team__wrap';
  wrap.append(intro, member);

  section.appendChild(renderContainer({ size: 'default', children: [wrap] }));
  root.appendChild(section);
}
