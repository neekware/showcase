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
          background: 'hsl(var(--ws-background))',
          foreground: 'hsl(var(--ws-foreground))',
          primary: {
            DEFAULT: 'hsl(var(--ws-primary))',
            foreground: 'hsl(var(--ws-primary-foreground))',
          },
          secondary: {
            DEFAULT: 'hsl(var(--ws-secondary))',
            foreground: 'hsl(var(--ws-secondary-foreground))',
          },
          accent: {
            DEFAULT: 'hsl(var(--ws-accent))',
            foreground: 'hsl(var(--ws-accent-foreground))',
          },
          warning: {
            DEFAULT: 'hsl(var(--ws-warning))',
            foreground: 'hsl(var(--ws-warning-foreground))',
          },
          error: {
            DEFAULT: 'hsl(var(--ws-error))',
            foreground: 'hsl(var(--ws-error-foreground))',
          },
          success: {
            DEFAULT: 'hsl(var(--ws-success))',
            foreground: 'hsl(var(--ws-success-foreground))',
          },
          information: {
            DEFAULT: 'hsl(var(--ws-information))',
            foreground: 'hsl(var(--ws-information-foreground))',
          },
          muted: {
            DEFAULT: 'hsl(var(--ws-muted))',
            foreground: 'hsl(var(--ws-muted-foreground))',
          },
          popover: {
            DEFAULT: 'hsl(var(--ws-popover))',
            foreground: 'hsl(var(--ws-popover-foreground))',
          },
          card: {
            DEFAULT: 'hsl(var(--ws-card))',
            foreground: 'hsl(var(--ws-card-foreground))',
          },
          border: 'hsl(var(--ws-border))',
          input: 'hsl(var(--ws-input))',
          ring: 'hsl(var(--ws-ring))',
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
