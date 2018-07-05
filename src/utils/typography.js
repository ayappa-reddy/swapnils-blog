import Typography from 'typography';
import lawtonTheme from 'typography-theme-lawton';
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants';

lawtonTheme.baseFontSize = '20px';
lawtonTheme.baseLineHeight = 1.6;
lawtonTheme.headerFontFamily = ['Open Sans', 'sans-serif'];
lawtonTheme.bodyFontFamily = ['Roboto', 'sans-serif'];
lawtonTheme.overrideThemeStyles = () => ({
  [MOBILE_MEDIA_QUERY]: {
    // Make baseFontSize on mobile 16px.
    html: {
      fontSize: `${(16 / 16) * 100}%`,
    },
  },
});
console.log(lawtonTheme);

const typography = new Typography(lawtonTheme);

export default typography;
