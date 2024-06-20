import { type Theme, type ThemeSettings } from '@lib/data-model-shared';

export const availableThemes: Theme[] = [
  {
    name: 'zinc',
    label: 'Zinc',
    activeColor: {
      light: '#2D2D35',
      dark: '#52525B',
    },
  },
  {
    name: 'slate',
    label: 'Slate',
    activeColor: {
      light: '#64748B',
      dark: '#475569',
    },
  },
  {
    name: 'stone',
    label: 'Stone',
    activeColor: {
      light: '#78716C',
      dark: '#57534E',
    },
  },
  {
    name: 'brown',
    label: 'Brown',
    activeColor: {
      light: '#5F4D3A',
      dark: '#5F4D3A',
    },
  },
  {
    name: 'gold',
    label: 'Gold',
    activeColor: {
      light: '#C28D51',
      dark: '#C28D51',
    },
  },
  {
    name: 'red',
    label: 'Red',
    activeColor: {
      light: '#DC2626',
      dark: '#DC2626',
    },
  },
  {
    name: 'rose',
    label: 'Rose',
    activeColor: {
      light: '#E11D48',
      dark: '#E11D48',
    },
  },
  {
    name: 'orange',
    label: 'Orange',
    activeColor: {
      light: '#F97316',
      dark: '#EA580C',
    },
  },
  {
    name: 'green',
    label: 'Green',
    activeColor: {
      light: '#16A34A',
      dark: '#22C55E',
    },
  },
  {
    name: 'blue',
    label: 'Blue',
    activeColor: {
      light: '#2563EB',
      dark: '#3B82F6',
    },
  },
  {
    name: 'yellow',
    label: 'Yellow',
    activeColor: {
      light: '#FACC15',
      dark: '#FACC15',
    },
  },
  {
    name: 'violet',
    label: 'Violet',
    activeColor: {
      light: '#7C3AED',
      dark: '#6D28D9',
    },
  },
] as const;

export const defaultThemeSettings: ThemeSettings = {
  theme: 'zinc',
  radius: 0.5,
};
