import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ngcex.github.io',
  base: '/ds_resume',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap(), icon()],
  vite: { plugins: [tailwindcss()] },
});
