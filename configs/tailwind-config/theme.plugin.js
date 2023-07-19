const tailwindPlugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = tailwindPlugin(
  function ({ addBase }) {
    addBase({
      '@layer base': {
        '*': { '@apply border-border': true },
        body: {
          '@apply bg-background text-foreground': true,
          fontFeatureSettings: '"rlig" 1, "calt" 1',
        },
      },
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
          background: 'hsl(var(--ws-background) / <alpha-value>)',
          foreground: 'hsl(var(--ws-foreground) / <alpha-value>)',
          primary: {
            DEFAULT: 'hsl(var(--ws-primary) / <alpha-value>)',
            foreground: 'hsl(var(--ws-primary-foreground) / <alpha-value>)',
          },
          secondary: {
            DEFAULT: 'hsl(var(--ws-secondary) / <alpha-value>)',
            foreground: 'hsl(var(--ws-secondary-foreground) / <alpha-value>)',
          },
          accent: {
            DEFAULT: 'hsl(var(--ws-accent) / <alpha-value>)',
            foreground: 'hsl(var(--ws-accent-foreground) / <alpha-value>)',
          },
          warning: {
            DEFAULT: 'hsl(var(--ws-warning) / <alpha-value>)',
            foreground: 'hsl(var(--ws-warning-foreground) / <alpha-value>)',
          },
          error: {
            DEFAULT: 'hsl(var(--ws-error) / <alpha-value>)',
            foreground: 'hsl(var(--ws-error-foreground) / <alpha-value>)',
          },
          success: {
            DEFAULT: 'hsl(var(--ws-success) / <alpha-value>)',
            foreground: 'hsl(var(--ws-success-foreground) / <alpha-value>)',
          },
          information: {
            DEFAULT: 'hsl(var(--ws-information) / <alpha-value>)',
            foreground: 'hsl(var(--ws-information-foreground) / <alpha-value>)',
          },
          muted: {
            DEFAULT: 'hsl(var(--ws-muted) / <alpha-value>)',
            foreground: 'hsl(var(--ws-muted-foreground) / <alpha-value>)',
          },
          popover: {
            DEFAULT: 'hsl(var(--ws-popover) / <alpha-value>)',
            foreground: 'hsl(var(--ws-popover-foreground) / <alpha-value>)',
          },
          card: {
            DEFAULT: 'hsl(var(--ws-card) / <alpha-value>)',
            foreground: 'hsl(var(--ws-card-foreground) / <alpha-value>)',
          },
          border: 'hsl(var(--ws-border) / <alpha-value>)',
          input: 'hsl(var(--ws-input) / <alpha-value>)',
          ring: 'hsl(var(--ws-ring) / <alpha-value>)',
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
