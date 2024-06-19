import localFont from 'next/font/local';

export const fontRoboto = localFont({
  src: [
    {
      path: '../../../../libs/data-asset-shared/fonts/Roboto-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../../../libs/data-asset-shared/fonts/Roboto-ThinItalic.woff2',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../../../../libs/data-asset-shared/fonts/Roboto-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../../libs/data-asset-shared/fonts/Roboto-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../../../libs/data-asset-shared/fonts/Roboto-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../../libs/data-asset-shared/fonts/Roboto-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../../../libs/data-asset-shared/fonts/Roboto-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../../libs/data-asset-shared/fonts/Roboto-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../../../libs/data-asset-shared/fonts/Roboto-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../../libs/data-asset-shared/fonts/Roboto-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../../../libs/data-asset-shared/fonts/Roboto-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../../../libs/data-asset-shared/fonts/Roboto-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-roboto',
});
