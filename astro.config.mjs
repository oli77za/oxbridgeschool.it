// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.oxbridgeschool.it',
  output: 'static',
  redirects: {
    '/business': '/#aziende',
    '/servizi': '/#scuola',
    '/dove': '/#contatti',
    '/contact': '/#contatti',
    '/content/la-scuola': '/#scuola',
    '/content/bambini': '/#bambini',
    '/content/preparazione-esami': '/#esami',
  },
});
