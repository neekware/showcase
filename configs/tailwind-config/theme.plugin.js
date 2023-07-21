const tailwindPlugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `hsla(var(${variableName}), ${opacityValue})`;
    }
    return `hsl(var(${variableName}))`;
  };
}

module.exports = tailwindPlugin(
  function ({ addBase }) {
    addBase({
      ':active, :focus': {
        outline: 'none',
      },
    });
  },
  // default config
  {
    theme: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
      extend: {
        colors: {
          background: withOpacity('--ws-color-background'),
          foreground: withOpacity('--ws-color-foreground'),
          primary: {
            DEFAULT: withOpacity('--ws-color-primary'),
            foreground: withOpacity('--ws-color-primary-foreground'),
          },
          secondary: {
            DEFAULT: withOpacity('--ws-color-secondary'),
            foreground: withOpacity('--ws-color-secondary-foreground'),
          },
          accent: {
            DEFAULT: withOpacity('--ws-color-accent'),
            foreground: withOpacity('--ws-color-accent-foreground'),
          },
          warning: {
            DEFAULT: withOpacity('--ws-color-warning'),
            foreground: withOpacity('--ws-color-warning-foreground'),
          },
          error: {
            DEFAULT: withOpacity('--ws-color-error'),
            foreground: withOpacity('--ws-color-error-foreground'),
          },
          success: {
            DEFAULT: withOpacity('--ws-color-success'),
            foreground: withOpacity('--ws-color-success-foreground'),
          },
          information: {
            DEFAULT: withOpacity('--ws-color-information'),
            foreground: withOpacity('--ws-color-information-foreground'),
          },
          muted: {
            DEFAULT: withOpacity('--ws-color-muted'),
            foreground: withOpacity('--ws-color-muted-foreground'),
          },
          popover: {
            DEFAULT: withOpacity('--ws-color-popover'),
            foreground: withOpacity('--ws-color-popover-foreground'),
          },
          card: {
            DEFAULT: withOpacity('--ws-color-card'),
            foreground: withOpacity('--ws-color-card-foreground'),
          },
          border: withOpacity('--ws-color-border'),
          input: withOpacity('--ws-color-input'),
          ring: withOpacity('--ws-color-ring'),
        },

        borderRadius: {
          sm: 'calc(var(--ws-radius) - 4px)',
          md: 'calc(var(--ws-radius) - 2px)',
          lg: 'var(--ws-radius)',
        },
        fontFamily: {
          sans: ['var(--ws-font-sans)', ...defaultTheme.fontFamily.sans],
          heading: ['var(--ws-font-heading)', ...defaultTheme.fontFamily.sans],
        },
        keyframes: {
          'accordion-down': {
            from: { height: 0 },
            to: { height: 'var(--ws-radix-accordion-content-height)' },
          },
          'accordion-up': {
            from: { height: 'var(--ws-radix-accordion-content-height)' },
            to: { height: 0 },
          },
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
        },
      },
    },
  }
);
