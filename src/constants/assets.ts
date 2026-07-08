// Assets externos (CDN).

const CDN = 'https://pub-62c41549a44642efbcd3f775bdb039b3.r2.dev';

export const ASSETS = {
  heroVideo: `${CDN}/poker-casino-loop.mp4`,
  // Fondo del hero: textura de pizarra verde (mesa). Vacío = sin fondo (solo color de tema).
  heroBg: `${CDN}/top-view-of-knowledge-texture-of-green-chalkboard-2026-03-13-01-19-06-utc_e2ae1c4539b6a777125c6c87eaa309013e6dd71adbc5546e398e904cece2e154.webp`,
  // Vacío = el hero usa el <video> bg (loop muted) en vez de la escena Spline.
  splineScene: '',
  // Foto de Diego Albuja. Vacío = placeholder dashed; pega aquí la URL del CDN al tenerla.
  instructorPhoto: `${CDN}/Gemini_Generated_Image_dnjgd3dnjgd3dnjg%20copy_f6cf5d8c80c763dca2ece58976dc56c8848b8fcd7dc72b0a96eab65647b6fda8.webp`,
  // Imagen de "Elige con datos" (Layout 682). Interim: reemplazar por un mockup de perfil de
  // trader con estadísticas cuando exista.
  chooseImage: `${CDN}/young-worker-leading-business-meeting-about-crypto-2026-01-08-02-14-17-utc_b3e331eb714c71f60cd153e7eabf14f2aef73b525ce9e295719a518f3cc44036.webp`,
  // Collage del hero (Header 153): 6 imágenes (poker/trading). Orden: l1,l2,l3,r1,r2,r3.
  // Las posiciones sin URL se pintan como placeholder de superficie.
  heroCollage: [
    `${CDN}/card1.png`,
    `${CDN}/card2.png`,
    `${CDN}/card3.png`,
    `${CDN}/card4.png`,
    `${CDN}/cardgoup2.png`,
    `${CDN}/cardgroup1.png`,
  ] as string[],
  // Cluster del hero (Header 108): 7 imágenes generadas (poker × mercados, paleta ATFX).
  // Orden esperado por hero.ts:
  //   0 lateral-izq (2/3) · 1 stack-izq (1/1) · 2 stack-izq (3/4) · 3 CENTRO (16/9) ·
  //   4 stack-der (3/4) · 5 stack-der (1/1) · 6 lateral-der (2/3).
  hero108: [
    `${CDN}/slot1_c26e05ebba6b37f50948931a24b88183f53f80cb9a48dcedbf5f03172da44fe1.webp`,
    `${CDN}/slot2_bfded2a554f41a3f20c3eb4c4001c895a37ca9252d70419df5d436db0a5041a1.webp`,
    `${CDN}/team-of-traders-working-at-monitor-computer-and-br-2026-03-25-09-41-49-utc_3f97b88834b4e75771215f01501d71123b6de183c4ae67b26bb0844288daf2cd.webp`,
    `${CDN}/assda_e7b958424330c7ccc4eeda4834890acaf19670d266cc1f45e3a4033952f6fda2.webp`,
    `${CDN}/slot4_28c0f231e7d36bd758b4400d31726b26e85b10139dbdd6459e7788996cc5ece2.webp`,
    `${CDN}/businessman-trading-and-headset-with-smile-at-off-2026-06-09-16-15-36-utc_c02d0aa32981ce312013e4ec5652738ec45c1d0f4a417c3c66d9edb476c7dbbc.webp`,
    `${CDN}/slot6_496544a3c1cc102b82a1937ad4ef25e62389d7299cddb21a5b480babd64de7a2.webp`,
  ] as string[],
};

// Runtime de Spline vía CDN (no npm). Se inyecta solo si hay una <spline-viewer> montada.
export const SPLINE_RUNTIME = 'https://unpkg.com/@splinetool/viewer@1.12.97/build/spline-viewer.js';
