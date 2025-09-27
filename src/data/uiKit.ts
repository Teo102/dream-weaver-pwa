// UI Kit Sleep Reminder - Design System

export const colorPalette = {
  // Primary brand colors
  primary: {
    main: '#7C62FF',      // Main purple brand
    light: '#9B8AFF',     // Lighter variant
    dark: '#5D42E6',      // Darker variant
    glow: '#B39DFF'       // Glow effect variant
  },
  
  // Semantic colors
  background: {
    dark: '#0A0A0B',      // Main dark background
    card: '#1A1A1B',      // Card background
    elevated: '#2A2A2B'   // Elevated surfaces
  },
  
  text: {
    primary: '#FFFFFF',    // Primary text (white)
    secondary: '#B0B0B0',  // Secondary text (gray)
    muted: '#808080',      // Muted text
    accent: '#7C62FF'      // Accent text (purple)
  },
  
  status: {
    success: '#00D96A',    // Success green
    warning: '#FFB800',    // Warning orange
    error: '#FF4757',      // Error red
    info: '#7C62FF'        // Info purple
  },
  
  borders: {
    subtle: '#2A2A2B',     // Subtle borders
    normal: '#404040',     // Normal borders
    accent: '#7C62FF30'    // Accent borders with opacity
  }
};

export const cssTokens = `
/* Sleep Reminder Design Tokens */
:root {
  /* Colors - HSL format for better manipulation */
  --primary: 253 73% 69%;           /* #7C62FF */
  --primary-light: 253 100% 76%;    /* #9B8AFF */
  --primary-dark: 253 73% 56%;      /* #5D42E6 */
  --primary-glow: 253 100% 83%;     /* #B39DFF */
  
  /* Backgrounds */
  --background: 240 8% 4%;          /* #0A0A0B */
  --card: 240 4% 10%;               /* #1A1A1B */
  --elevated: 240 4% 16%;           /* #2A2A2B */
  
  /* Text */
  --foreground: 0 0% 100%;          /* #FFFFFF */
  --muted-foreground: 0 0% 50%;     /* #808080 */
  --secondary-foreground: 0 0% 69%; /* #B0B0B0 */
  
  /* Status */
  --success: 150 100% 42%;          /* #00D96A */
  --warning: 38 100% 50%;           /* #FFB800 */
  --destructive: 348 83% 65%;       /* #FF4757 */
  
  /* Borders */
  --border: 240 4% 16%;             /* #2A2A2B */
  --border-accent: 253 73% 69% / 0.2; /* Primary with opacity */
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-light)));
  --gradient-card: linear-gradient(180deg, hsl(var(--card)), hsl(var(--elevated)));
  --gradient-glow: linear-gradient(90deg, transparent, hsl(var(--primary-glow) / 0.3), transparent);
  
  /* Shadows */
  --shadow-sleep-glow: 0 0 30px hsl(var(--primary) / 0.3);
  --shadow-card: 0 4px 20px hsl(240 8% 2% / 0.4);
  --shadow-elevated: 0 8px 40px hsl(240 8% 2% / 0.6);
  
  /* Animations */
  --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-bounce: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  
  /* Spacing scale */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  
  /* Border radius */
  --radius-sm: 0.375rem;  /* 6px */
  --radius: 0.5rem;       /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
  --radius-full: 9999px;  /* Full round */
  
  /* Typography */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
}

/* Utility classes */
.glow-primary {
  box-shadow: var(--shadow-sleep-glow);
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px hsl(var(--primary) / 0.3);
  }
  50% {
    box-shadow: 0 0 40px hsl(var(--primary) / 0.6);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.text-gradient-primary {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
`;

export const iconsSvg = {
  timer: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12,6 12,12 16,14"/>
    </svg>
  `,
  
  moon: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 3a9 9 0 1 0 9 9c0-5-4-9-9-9Z"/>
    </svg>
  `,
  
  check: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  `,
  
  alarm: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="13" r="8"/>
      <path d="m5 3 2 2"/>
      <path d="m22 6-2-2"/>
      <path d="M6.38 18.7 4 21"/>
      <path d="M17.64 18.67 20 21"/>
      <path d="M9 13h6"/>
    </svg>
  `,
  
  journal: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10,9 9,9 8,9"/>
    </svg>
  `,
  
  settings: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  `
};

export const componentVariants = {
  // Button variants for different contexts
  button: {
    primary: 'bg-primary hover:bg-primary-dark text-white',
    secondary: 'bg-card hover:bg-elevated text-foreground border border-border',
    pill: 'bg-primary hover:bg-primary-dark text-white rounded-full px-6',
    sleep: 'bg-gradient-to-r from-primary to-primary-light text-white shadow-sleep-glow hover:shadow-lg transition-all',
    ghost: 'hover:bg-primary/10 text-muted-foreground hover:text-foreground'
  },
  
  // Card variants
  card: {
    default: 'bg-card border-border',
    elevated: 'bg-elevated border-border shadow-card',
    primary: 'bg-primary/5 border-primary/20',
    glow: 'bg-card border-primary/20 shadow-sleep-glow'
  },
  
  // Badge variants  
  badge: {
    default: 'bg-secondary text-secondary-foreground',
    primary: 'bg-primary text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-black'
  }
};