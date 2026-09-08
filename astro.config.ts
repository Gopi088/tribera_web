import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';
import autoprefixer from 'autoprefixer';

import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import partytown from '@astrojs/partytown';
import compress from 'astro-compress';
import tailwindcss from 'tailwindcss';
import type { AstroIntegration } from 'astro';

import astrowind from './vendor/integration';

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hasExternalScripts = false;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

export default defineConfig({
  // It overlays interactive content in local visual reviews and is not part of the product UI.
  devToolbar: {
    enabled: false,
  },

  output: 'static',
  trailingSlash: 'ignore',

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  integrations: [
    sitemap({
      filter(page) {
        const pathname = new URL(page).pathname;

        if (
          pathname.startsWith('/category/') ||
          pathname.startsWith('/tag/') ||
          pathname === '/privacy/' ||
          pathname === '/terms/'
        ) {
          return false;
        }

        if (/^\/blog\/\d+\/$/.test(pathname)) {
          return false;
        }

        return true;
      },
    }),
    mdx(),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),

    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),

    astrowind({
      config: './src/config.yaml',
    }),
  ],

  image: {
    domains: ['cdn.pixabay.com', 'www.tribera.ai', 'tribera.ai'],
  },

  markdown: {
    processor: unified({
      remarkPlugins: [readingTimeRemarkPlugin],
      rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
    }),
  },

  vite: {
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
    resolve: {
      alias: {
        'astro-icon/components': path.resolve(__dirname, './src/components/common/icon-module.ts'),
        'astro-icon/components/Icon.astro': path.resolve(__dirname, './src/components/common/Icon.astro'),
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
