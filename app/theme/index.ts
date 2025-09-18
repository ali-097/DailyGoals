export const lightTheme = {
  colors: {
    primary: '#0a7ea4',
    background: '#ffffff',
    surface: '#f5f5f5',
    text: '#333333',
    textSecondary: '#666666',
    border: '#e0e0e0',
    error: '#f44336',
    success: '#4CAF50',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};

export const darkTheme = {
  colors: {
    primary: '#0a7ea4',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#cccccc',
    border: '#333333',
    error: '#f44336',
    success: '#4CAF50',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};

export type Theme = typeof lightTheme;