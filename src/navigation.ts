import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
     {
      text: 'For Hiring Teams',
      href: '/',
      reload: true,
    },
    {
      text: 'For Candidates',
      href: '/candidates',
      reload: true,
    },

    {
      text: 'About',
      href: getPermalink('/about'),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
    // {
    //   text: 'Careers',
    //   href: getPermalink('/careers'),
    // },
    {
      text: 'Blog',
      href: getBlogPermalink(), // resolves to /blog/
    },
    //  {
    //   text: 'Services',
    //   href: getPermalink('/services'), // resolves to /blog/
    // },
  ],
  actions: [],
};

export const footerData = {
  links: [
    {
      title: 'Product',
      links: [
        { text: 'Overview', href: getPermalink('/') },
        { text: 'How it Works', href: getPermalink('/#how-it-works') },
        { text: 'Interview Prep', href: getPermalink('/candidates#interview') },
        { text: 'Pricing', href: getPermalink('/#platform-performance') },
        { text: 'Screening', href: getPermalink('/candidates#screening') },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: getPermalink('/about') },
        { text: 'Careers', href: getPermalink('/careers') },
        { text: 'Blog', href: getPermalink('/blog') },
        { text: 'Contact', href: getPermalink('/contact') },
        { text: 'Services', href: getPermalink('/services')},
      ],
    },
    {
      title: 'about us',
      links: [
        {
          text: `
            <span class="text-[#da0007] font-semibold">Tribera</span> is a talent intelligence platform that combines AI agents
            with human judgment to help hiring teams make confident decisions.
            <br /><br />
            We align recruiters, hiring managers, and candidates early —
            reducing mis-hires, interview drop-offs, and wasted effort.
          `,
          ariaLabel: 'Tribera company description',
        },
      ],
    },
  ],

  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],

  socialLinks: [
    {
      ariaLabel: 'LinkedIn',
      icon: 'tabler:brand-linkedin',
      href: 'https://linkedin.com/company/triberaai',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      ariaLabel: 'X (Twitter)',
      icon: 'tabler:brand-x',
      href: 'https://twitter.com/TriberaA46978',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      ariaLabel: 'Email',
      icon: 'tabler:mail',
      href: 'mailto:hello@tribera.ai',
    },
  ],

  footNote: `
   © tribera · A registered trademark of Eragina Digital Solutions Pvt. Ltd. All rights reserved.
  `,
};
