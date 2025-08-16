export const UI = {
  COLORS: {
    primary: '#fbbf24',
    primaryHover: '#f59e0b',
    primaryDark: '#d97706',

    background: '#09090b',
    backgroundSecondary: '#18181b',
    backgroundTertiary: '#27272a',
    backgroundHover: '#3f3f46',

    text: '#ffffff',
    textMuted: '#a1a1aa',
    textDim: '#71717a',
    textSubtle: '#52525b',

    // Border colors
    border: '#27272a',
    borderLight: '#3f3f46',
    borderSubtle: '#52525b',

    // Status colors
    success: '#22c55e',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  },

  SPACING: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '6rem',
    '4xl': '8rem',
  },

  TYPOGRAPHY: {
    fontFamily: {
      sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      mono: ['var(--font-mono)', 'monospace'],
    },

    fontSize: {
      '8xl': '6rem',
    },

    lineHeight: {
      tight: '1.1',
      snug: '1.25',
      normal: '1.5',
      relaxed: '1.75',
      loose: '2',
    },

    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },

  BREAKPOINTS: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  Z_INDEX: {
    behind: -1,
    base: 0,
    dropdown: 10,
    sticky: 20,
    overlay: 30,
    modal: 40,
    popover: 50,
    tooltip: 60,
    navbar: 100,
    toast: 200,
  },

  RADIUS: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  SHADOWS: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },

  TRANSITIONS: {
    duration: {
      fast: '150ms',
      base: '300ms',
      slow: '500ms',
      slower: '700ms',
    },

    timing: {
      linear: 'linear',
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },

  PATTERNS: {
    glass: {
      background: 'rgba(24, 24, 27, 0.5)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(63, 63, 70, 0.5)',
    },

    gradients: {
      fadeToBlack: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.9))',
      fadeFromBlack: 'linear-gradient(to top, transparent, rgba(0, 0, 0, 0.9))',
      radialGlow: 'radial-gradient(circle at center, rgba(251, 191, 36, 0.1), transparent)',
      primaryGradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    },

    container: {
      maxWidth: '1280px',
      padding: '0 1rem',
      margin: '0 auto',
    },

    section: {
      py: '4rem',
      pyLg: '6rem',
      px: '1rem',
      pxLg: '2rem',
    },
  },
} as const;

export type UIConfig = typeof UI;
export type ColorKey = keyof typeof UI.COLORS;
export type SpacingKey = keyof typeof UI.SPACING;
export type BreakpointKey = keyof typeof UI.BREAKPOINTS;
