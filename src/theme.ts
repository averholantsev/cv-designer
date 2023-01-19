import { createTheme, Theme } from '@material-ui/core';

export interface IColors {
  darkRed: string;
  black: string;
  deepBlue: string;
  midnightBlue: string;
  greyRaven: string;
  greyChateau: string;
  greyHeather: string;
  linkWater: string;
  linkLightSecondary: string;
  normalLinkWater: string;
  white: string;
  lightestYellow: string;
  lightBlueberry: string;
  lightGray: string;
  lightBlackberry: string;
  lightApple: string;
  lightPlum: string;
  lightCranberry: string;
  lightStroke: string;
  whiteSmoke: string;
  normalApple: string;
  normalBlueberry: string;
  normalMint: string;
  normalOrange: string;
  normalRaspberry: string;
  normalCranberry: string;
  normalBlackberry: string;
  normalPlum: string;
  normalYellow: string;
  darkBlueberry: string;
  darkApple: string;
  darkYellow: string;
  darkMint: string;
  darkLime: string;
  darkPlum: string;
  darkOrange: string;
  darkestYellow: string;
  darkestMint: string;
  darkestLime: string;
  darkestCranberry: string;
  sinApple: string;
  silverMyst: string;
  cheatas: string;
  navyBlue: string;
  dodgerBlue: string;
  silverSand: string;
  aliceBlue: string;
  lavender: string;
  lightBlack: string;
  inactiveTabbar: string;
  lightestOrange: string;
  textSecondary: string;
}

/**
 * Цветовая палитра
 */
const mapColor: IColors = {
  darkRed: '#E30611',
  black: '#000',
  lightBlack: '#1D2023',
  deepBlue: '#001424',
  midnightBlue: '#202D3D',
  greyRaven: '#6E7782',
  greyChateau: '#9198A0',
  greyHeather: '#BBC1C7',
  linkWater: '#E2E5EB',
  linkLightSecondary: '#969FA8',
  normalLinkWater: '#E7EAFA',
  white: '#FFF',
  lightestYellow: '#FFFDE8',
  lightBlueberry: '#45B6FC',
  lightGray: '#d3d3d3',
  lightBlackberry: '#6384E0',
  lightApple: '#74DF8B',
  lightPlum: '#A86EA7',
  lightCranberry: '#E677AD',
  lightStroke: '#BCC3D0',
  whiteSmoke: '#F2F3F7',
  normalApple: '#26CD58',
  normalBlueberry: '#0097FD',
  normalMint: '#00C19B',
  normalOrange: '#F95721',
  normalRaspberry: '#EA1F49',
  normalCranberry: '#E54887',
  normalBlackberry: '#014FCE',
  normalYellow: '#FBE739',
  normalPlum: '#883888',
  darkApple: '#04AA42',
  darkBlueberry: '#007CFF',
  darkYellow: '#FAC031',
  darkMint: '#03A17B',
  darkLime: '#A6C100',
  darkPlum: '#6D2D79',
  darkOrange: '#E04A17',
  darkestYellow: '#F37F19',
  darkestMint: '#00724D',
  darkestLime: '#808201',
  darkestCranberry: '#7F3363',
  sinApple: '#03AD00',
  silverMyst: '#D3DAE1',
  cheatas: '#F9B021',
  navyBlue: '#0077DB',
  dodgerBlue: '#0097FD',
  silverSand: '#C4C4C4',
  aliceBlue: '#F8F9FB',
  lavender: '#E9EBF7',
  inactiveTabbar: '#AEB5BD',
  lightestOrange: '#FBE9E7',
  textSecondary: '#626C77'
};

interface ICustomShadows {
  card: string;
  cardHover: string;
}

/**
 * Расширяем дефолтный интерфейс Theme
 */
declare module '@material-ui/core/styles/createTheme' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Theme {
    colors: IColors;
    customShadows: ICustomShadows;
  }
  // allow configuration using `createTheme`
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface ThemeOptions {
    colors: IColors;
    customShadows: ICustomShadows;
  }
}

const theme: Theme = createTheme({
  typography: {
    fontFamily: '"Source Sans Pro", "Arial", sans-serif',
    allVariants: {
      color: mapColor.lightBlack
    },
    fontSize: 16,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontSize: 32,
      lineHeight: '36px',
      fontWeight: 600
    },
    h2: {
      fontSize: 24,
      fontWeight: 600,
      lineHeight: '28px'
    },
    h3: {
      fontSize: 20,
      fontWeight: 600,
      lineHeight: '24px'
    },
    h4: {
      fontSize: 20,
      fontWeight: 500,
      lineHeight: '25px'
    },
    h5: {
      fontSize: 20,
      fontWeight: 400,
      lineHeight: '28px'
    },
    h6: {
      fontSize: 17,
      fontWeight: 600,
      lineHeight: '24px'
    },
    subtitle1: {
      fontSize: 17,
      fontWeight: 500,
      lineHeight: '24px'
    },
    body1: {
      fontSize: 17,
      fontWeight: 400,
      lineHeight: '24px'
    },
    body2: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '24px'
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: '20px'
    },
    caption: {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: '16px'
    }
  },
  palette: {
    primary: {
      main: mapColor.darkRed
    },
    /**
     * Перезаписываем дефолтный цвет background
     */
    background: {
      default: mapColor.whiteSmoke
    },
    /**
     * Перезаписываем дефолтный цвет текста secondary
     */
    text: {
      secondary: mapColor.textSecondary
    }
  },
  colors: mapColor,
  customShadows: {
    card: '0px 0px 16px rgba(0, 0, 0, 0.08), 0px 4px 16px rgba(0, 0, 0, 0.08)',
    cardHover: '0px 7px 22px 0px rgba(0, 0, 0, 0.28)'
  },
  props: { MuiTextField: { autoComplete: 'off' } }
});

export default theme;
export { mapColor };
