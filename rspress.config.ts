import path from 'path';
import { defineConfig } from 'rspress/config';
import { NavItem, Sidebar } from '@rspress/shared';
import { pluginRss, PluginRssOption } from './rspress/plugin-rss';
import { toArray } from './rspress/plugin-rss/utils';

const PUBLISH_URL = 'https://volcengine.github.io/veScaleWeb';
const COPYRIGHT = '© 2023 Bytedance Inc. All Rights Reserved.';

function getMeta(name: string, value: string) {
  return {
    [name]: {
      property: name,
      content: value,
    },
  };
}

function getI18nHelper(lang: 'zh' | 'en') {
  const isZh = lang === 'zh';
  const prefix = isZh ? '/zh' : '';
  const getLink = (str: string) => `${prefix}${str}`;
  const getText = (zhText: string, enText: string) => (isZh ? zhText : enText);
  return { getText, getLink };
}

function getNavConfig(lang: 'zh' | 'en'): NavItem[] {
  const { getText, getLink } = getI18nHelper(lang);
  return [
    {
      text: getText('指南', 'Guide'),
      link: getLink('/guide/introduction'),
      activeMatch: '/guide/',
    },
    {
      text: getText('文章', 'Publication'),
      link: getLink('/blog/megascale'),
      activeMatch: '/blog',
    },
    {
      text: getText('关于', 'About'),
      items: [
        {
          text: getText('我们', 'Who Are We'),
          link: getLink('/misc/who-are-we'),
        },
        {
          text: getText('加入我们', 'Join Us'),
          link: getLink('/misc/join-us'),
        },
        {
          text: getText('贡献指南', 'Contributing Guide'),
          link: 'https://github.com/volcengine/veScale/blob/main/CONTRIBUTING.md',
        },
      ],
    },
  ];
}

function getSidebarConfig(lang: 'zh' | 'en'): Sidebar {
  const { getText, getLink } = getI18nHelper(lang);

  return {
    [getLink('/guide/')]: [
      {
        collapsible: false,
        text: getText('开始', 'Getting started'),
        items: [
          {
            link: getLink('/guide/introduction'),
            text: getText('介绍', 'Introduction'),
          },
          {
            link: getLink('/guide/quick-start'),
            text: getText('快速开始', 'Quick Start'),
          },
        ],
      },
      {
        collapsible: false,
        text: getText('DTensor', 'DTensor'),
        items: [
          {
            link: getLink('/guide/dtensor'),
            text: getText('概览', 'Overview'),
          },
        ],
      },
      {
        collapsible: false,
        text: getText('Parallel', 'Parallel'),
        items: [
          {
            link: getLink('/guide/dmodule'),
            text: getText('DModule', 'DModule'),
          },
          {
            link: getLink('/guide/ddp'),
            text: getText('DDP', 'DDP'),
          },
          {
            link: getLink('/guide/doptimizer'),
            text: getText('DOptimizer', 'DOptimizer'),
          },
          {
            link: getLink('/guide/pp'),
            text: getText('PP', 'PP'),
          },
        ],
      },
      {
        collapsible: false,
        text: getText('Plan', 'Plan'),
        items: [
          {
            link: getLink('/guide/auto_tp_sp'),
            text: getText('Auto TP & SP', 'Auto TP & SP'),
          },
          {
            link: getLink('/guide/auto_pp'),
            text: getText('Auto PP', 'Auto PP'),
          },
        ],
      },
      {
        collapsible: false,
        text: getText('Checkpoint', 'Checkpoint'),
        items: [
          {
            link: getLink('/guide/checkpoint'),
            text: getText('概览', 'Overview'),
          },
        ],
      },
    ],
    [getLink('/blog/')]: [
      {
        text: getText(
          'MegaScale',
          'MegaScale'
        ),
        link: getLink('/blog/megascale'),
      },
    ],
  };
}

const toFeedItem: PluginRssOption['toFeedItem'] = (page) => {
  const fm = page.frontmatter as Record<string, any>;
  const { date } = fm;
  if (!date) return false;

  const categories = toArray(fm['categories'], fm['category']);

  const isBlog = /blog/.test(page.routePath) || categories.includes('blog');
  // we only include the blogs at the moment
  if (!isBlog) return false;

  const feed = `blog-${page.lang}`;

  return {
    title: fm.title || page.title || '',
    id: fm.rssId || page.id || '',
    link: fm.permalink || page.routePath || '',
    description: fm.rssDescription || fm.description || '',
    content: fm.rssContent || fm.summary || page.content || '',
    date,
    category: categories,
    feed,
  };
};

export default defineConfig({
  base: '/veScaleWeb/',
  root: path.join(__dirname, 'docs'),
  title: 'veScale',
  description: 'A PyTorch Native LLM Training Framework',
  logo: {
    light: '/vescale-logo-light.png',
    dark: '/vescale-logo-dark.png',
  },
  icon: '/icon.png',
  lang: 'en',
  globalStyles: path.join(__dirname, 'theme', 'index.css'),
  markdown: {
    checkDeadLinks: true,
  },
  plugins: [
    pluginRss({
      routePublicPath: PUBLISH_URL,
      feedOptions: { copyright: COPYRIGHT, link: PUBLISH_URL },
      feedOptionsByName: {
        'blog-en': { title: 'veScale Publication', link: `${PUBLISH_URL}/blog` },
        'blog-zh': { title: 'veScale Publication', link: `${PUBLISH_URL}/zh/blog` },
      },
      toFeedItem,
    }),
  ],
  themeConfig: {
    footer: {
      message: '© 2024 Bytedance Inc. All Rights Reserved.',
    },
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/volcengine/veScale',
      },
      {
        icon: 'twitter',
        mode: 'link',
        content: 'https://twitter.com/veScaleAI',
      },
      {
        icon: 'lark',
        mode: 'link',
        content:
          'https://applink.larkoffice.com/client/chat/chatter/add_by_link?link_token=8a9m7db8-5ee9-4561-b3d8-dbf93149ab2v',
      },
      {
        icon: 'slack',
        mode: 'link',
        content:
          'https://join.slack.com/t/vescale/shared_invite/zt-2gw87xkkg-_oLPkBKzLU1BOtH~6oHsYg',
      },
    ],
    locales: [
      {
        lang: 'en',
        title: 'veScale',
        description: 'A PyTorch Native LLM Training Framework',
        nav: getNavConfig('en'),
        sidebar: getSidebarConfig('en'),
        label: 'English',
      },
      { // TODO: enable chinese webpage
        lang: 'en',
        title: 'veScale',
        description: 'A PyTorch Native LLM Training Framework',
        nav: getNavConfig('en'),
        sidebar: getSidebarConfig('en'),
        label: '简体中文',
      },
    ],
  },
  builderConfig: {
    source: {
      alias: {
        '@builtIns': path.join(__dirname, 'components', 'builtIns'),
        '@components': path.join(__dirname, 'components'),
        '@hooks': path.join(__dirname, 'hooks'),
      },
    },
    dev: {
      startUrl: false,
    },
    tools: {
      postcss: (config, { addPlugins }) => {
        addPlugins([require('tailwindcss/nesting'), require('tailwindcss')]);
      },
    },
    html: {
      meta: {
        ...getMeta('og:title', 'veScale'),
        ...getMeta('og:type', 'website'),
        ...getMeta('og:url', PUBLISH_URL),
        ...getMeta(
          'og:description',
          'A PyTorch Native LLM Training Framework'
        ),
        ...getMeta('twitter:site', '@vescale'),
        ...getMeta('twitter:card', 'summary_large_image'),
      },
      tags: [
        // Configure Google Analytics
        {
          tag: 'script',
          attrs: {
            async: true,
            src: 'https://www.googletagmanager.com/gtag/js?id=G-XKKCNZZNJD',
          },
        },
        {
          tag: 'script',
          children: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XKKCNZZNJD');`,
        },
      ],
    },
    output: {
      copy: {
        patterns: [
          {
            from: path.join(__dirname, 'docs', 'public', '_redirects'),
          },
          {
            from: path.join(__dirname, 'docs', 'public', '_headers'),
          },
        ],
      },
    },
  },
});
