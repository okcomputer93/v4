module.exports = {
  email: 'jseo114730@upemor.edu.mx',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/okcomputer93',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/bchiang7',
    },
  ],

  navLinks: [
    {
      name: 'about',
      url: '/#about',
    },
    {
      name: 'technologies',
      url: '/#technologies',
    },
    {
      name: 'work',
      url: '/#projects',
    },
    {
      name: 'contact',
      url: '/#contact',
    },
  ],

  technologies: [
    'PHP',
    'Laravel',
    'NodeJS',
    'Express',
    'SQL',
    'NOSQL',
    'HTML',
    'CSS',
    'SASS',
    'Tailwind',
    'Javascript',
    'Webpack',
    'Vue',
    'React',
    'Pug',
    'Docker',
  ],

  colors: {
    green: '#59eff7',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
