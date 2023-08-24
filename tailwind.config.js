function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `hsla(var(${variableName}), ${opacityValue})`;
    }
    return `hsl(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
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
        border: withOpacity('--color-border'),
        input: withOpacity('--color-input'),
        ring: withOpacity('--color-ring'),
        background: withOpacity('--color-background'),
        foreground: withOpacity('--color-foreground'),
        primary: {
          DEFAULT: withOpacity('--color-primary'),
          foreground: withOpacity('--color-primary-foreground'),
        },
        secondary: {
          DEFAULT: withOpacity('--color-secondary'),
          foreground: withOpacity('--color-secondary-foreground'),
        },
        warning: {
          DEFAULT: withOpacity('--color-warning'),
          foreground: withOpacity('--color-warning-foreground'),
        },
        muted: {
          DEFAULT: withOpacity('--color-muted'),
          foreground: withOpacity('--color-muted-foreground'),
        },
        accent: {
          DEFAULT: withOpacity('--color-accent'),
          foreground: withOpacity('--color-accent-foreground'),
        },
        popover: {
          DEFAULT: withOpacity('--color-popover'),
          foreground: withOpacity('--color-popover-foreground'),
        },
        card: {
          DEFAULT: withOpacity('--color-card'),
          foreground: withOpacity('--color-card-foreground'),
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
