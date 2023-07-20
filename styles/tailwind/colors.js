const baseColors = {
  current: 'currentColor',
  transparent: 'transparent',
  inherit: 'inherit',
  initial: 'initial',
  white: '#fff',
  none: 'none',
}

const colors = {
  textColor: {
    ...baseColors,
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    tertiary: 'var(--color-text-tertiary)',
    accent: 'var(--color-text-accent)',
    alert: 'var(--color-text-alert)'
  },
  borderColor: {
    ...baseColors,
    l1: 'var(--color-border-L1)',
    l2: 'var(--color-border-L2)',
    l3: 'var(--color-border-L3)',
  },
  backgroundColor: {
    ...baseColors,
    l0: 'var(--color-bg-L0)',
    l1: 'var(--color-bg-L1)',
    l2: 'var(--color-bg-L2)',
    l3: 'var(--color-bg-L3)',
    accent: 'var(--color-bg-accent)',
    'button-primary': 'var(--color-bg-button-primary)',
    'button-primary-hover': 'var(--color-bg-button-primary-hover)',
    'button-primary-disabled': 'var(--color-bg-button-primary-disabled)',
    'button-secondary': 'var(--color-bg-button-secondary)',
    'button-secondary-hover': 'var(--color-bg-button-secondary-hover)',
    'button-secondary-disabled': 'var(--color-bg-button-secondary-disabled)',
  },
}

module.exports = {
  colors,
}
