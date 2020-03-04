export const colors = {
  white: {
    base: '#fff',
    light: '#f0f0f0',
    grey: '#cecece',
    dark: '#a0afd7',
  },
  black: {
    base: '#333438',
    light: '#4b4e57',
    blue: '#2e3246',
  },
  primaryPalette: {
    eerieBlack: '#1c1d21',
    vanDykeBrown: '#634133',
    dodgerBlue: '#2191fb',
    gray: '#bebbbb',
    cadetGrey: '#93a3b1',
  },
  primary: {
    base: '#3498db',
    light: '#3e5fbc',
    dark: '#284187',
  },
  background: {
    light: '#3e5fbc',
    dark: '#284187',
  },
  nfl: {
    red: '#d51f26',
    blue: '#1c3667',
    silver: '#C0BFBF',
    green: '#94C112',
    gold: '#D3A82F',
  },
  teamColors: {
    default: {
      primary: '#013369',
      secondary1: '#d50a0a',
    },
    ARI: {
      primary: '#97233F',
      secondary1: '#000000',
      secondary2: '#FFB612',
    },
    ATL: {
      primary: '#A71930',
      secondary1: '#A5ACAF',
      secondary2: '#000000',
    },
    BAL: {
      primary: '#241773',
      secondary1: '#9E7C0C',
      secondary2: '#000000',
    },
    BUF: {
      primary: '#00338D',
      secondary1: '#C60c30',
      secondary2: '#000000',
    },
    CAR: {
      primary: '#0085CA',
      secondary1: '#BFC0BF',
      secondary2: '#000000',
    },
    CHI: {
      primary: '#F26522',
      secondary1: '#00142F',
      secondary2: '#000000',
    },
    CIN: {
      primary: '#FB4F14',
      secondary1: '#000000',
      secondary2: '#000000',
    },
    CLE: {
      primary: '#22150C',
      secondary1: '#FB4F14',
      secondary2: '#000000',
    },
    DAL: {
      primary: '#0C264C',
      secondary1: '#B0B7BC',
      secondary2: '#000000',
    },
    DEN: {
      primary: '#002244',
      secondary1: '#FB4F14',
      secondary2: '#000000',
    },
    DET: {
      primary: '#046EB4',
      secondary1: '#B0B7BC',
      secondary2: '#000000',
    },
    GB: {
      primary: '#24423C',
      secondary1: '#FCBE14',
      secondary2: '#000000',
    },
    HOU: {
      primary: '#00143F',
      secondary1: '#C9243F',
      secondary2: '#000000',
    },
    IND: {
      primary: '#003D79',
      secondary1: '#FFFFFF',
      secondary2: '#000000',
    },
    JAX: {
      primary: '#D8A328',
      secondary1: '#136677',
      secondary2: '#9E7A2C',
    },
    KC: {
      primary: '#CA2430',
      secondary1: '#FFB612',
      secondary2: '#000000',
    },
    LAC: {
      primary: '#0A2342',
      secondary1: '#2072BA',
      secondary2: '#FDB515',
    },
    LAR: {
      primary: '#95774C',
      secondary1: '#002147',
      secondary2: '#000000',
    },
    MIA: {
      primary: '#0091A0',
      secondary1: '#FF8500',
      secondary2: '#002760',
    },
    MIN: {
      primary: '#4F2E84',
      secondary1: '#FEC62F',
      secondary2: '#000000',
    },
    NYG: {
      primary: '#192E6C',
      secondary1: '#B20032',
      secondary2: '#000000',
    },
    NYJ: {
      primary: '#203731',
      secondary1: '#FFFFFF',
      secondary2: '#000000',
    },
    NE: {
      primary: '#0A2342',
      secondary1: '#C81F32',
      secondary2: '#B0B7BD',
    },
    NO: {
      primary: '#A08A58',
      secondary1: '#000000',
      secondary2: '#000000',
    },
    LV: {
      primary: '#C4C9CC',
      secondary1: '#000000',
      secondary2: '#000000',
    },
    PHI: {
      primary: '#014A53',
      secondary1: '#BBC4C9',
      secondary2: '#000000',
    },
    PIT: {
      primary: '#FFC20E',
      secondary1: '#000000',
      secondary2: '#DA2128',
    },

    SF: {
      primary: '#C9243F',
      secondary1: '#C8AA76',
      secondary2: '#000000',
    },
    SEA: {
      primary: '#002A5C',
      secondary1: '#7AC142',
      secondary2: '#B2B7BB',
    },

    TB: {
      primary: '#D40909',
      secondary1: '#B0B9BF',
      secondary2: '#000000',
    },
    TEN: {
      primary: '#4095D1',
      secondary1: '#00295B',
      secondary2: '#DA2128',
    },
    WAS: {
      primary: '#FFC20F',
      secondary1: '#7C1415',
      secondary2: '#000000',
    },
  },
};

export const shadow = {
  card: '0 20px 30px rgba(0, 0, 0, 0.1)',
  image: '0 15px 25px rgba(0, 0, 0, 0.1)',
  suggestion: '0 -5px 30px rgba(0,0,0,0.2)',
  footer: '0 -3px 26px rgba(0,0,0,0.5)',
  feature: {
    big: {
      default: '0 40px 40px rgba(0, 0, 0, 0.2)',
      hover: '0 50px 50px rgba(0, 0, 0, 0.1)',
    },
    small: {
      default: '0 15px 25px rgba(0, 0, 0, 0.2)',
      hover: '0 40px 45px rgba(0, 0, 0, 0.1)',
    },
  },
  text: {
    small: '0 5px 10px rgba(0, 0, 0, 0.25)',
    big: '0 15px 20px rgba(0, 0, 0, 0.13)',
  },
};

export const gradient = {
  // eslint-disable-next-line
  leftToRight: `linear-gradient(-45deg, ${colors.background.light} 0%, ${colors.background.dark} 100%)`,
  // eslint-disable-next-line
  rightToLeft: `linear-gradient(45deg, ${colors.background.light} 0%, ${colors.background.dark} 100%)`,
};

export const transition = {
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  duration: '0.4s',
};

export const theme = {
  colors,
  gradient,
  shadow,
  breakpoints: {
    xs: '400px',
    s: '600px',
    m: '900px',
    l: '1200px',
  },
  fontFamily: {
    // eslint-disable-next-line
    body: `Open Sans,-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
    // eslint-disable-next-line
    heading: `Candal, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
  },
  layout: {
    article: '46rem',
    base: '70rem',
    big: '83.33333rem',
  },
  borderRadius: {
    default: '0.4rem',
    round: '100rem',
  },
  transitions: {
    default: {
      duration: transition.duration,
      timing: transition.easeInOutCubic,
      transition: `all ${transition.duration} ${transition.easeInOutCubic}`,
    },
    boom: {
      duration: transition.duration,
      timing: transition.easeOutBack,
      transition: `all ${transition.duration} ${transition.easeOutBack}`,
    },
    headroom: {
      transition: 'all 0.25s ease-in-out',
    },
  },
};

export default theme;
