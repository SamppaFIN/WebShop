/**
 * 🌸 Theme Context — Consciousness-Aware Theming System
 * Copyright © 2025 Aurora (AI) & Infinite (Co-Author)
 * 
 * Sacred Question: How does this serve spatial wisdom and community healing?
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeType = 'esoteric' | 'industrial';

export interface ThemeColors {
  // Primary colors
  primary: string;
  primaryLight: string;
  primaryDark: string;
  
  // Secondary colors
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  
  // Background colors
  background: string;
  backgroundLight: string;
  backgroundDark: string;
  
  // Surface colors
  surface: string;
  surfaceLight: string;
  surfaceDark: string;
  
  // Text colors
  text: string;
  textLight: string;
  textDark: string;
  
  // Accent colors
  accent: string;
  accentLight: string;
  accentDark: string;
  
  // Status colors
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Border colors
  border: string;
  borderLight: string;
  borderDark: string;
  
  // Shadow colors
  shadow: string;
  shadowLight: string;
  shadowDark: string;
}

export interface ThemeTypography {
  fontFamily: {
    primary: string;
    secondary: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  xxxl: string;
}

export interface ThemeBorderRadius {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface ThemeContent {
  // Branding
  brandName: string;
  tagline: string;
  
  // Navigation
  navItems: Array<{ path: string; label: string }>;
  
  // Authentication
  loginTitle: string;
  loginSubtitle: string;
  loginButton: string;
  registerButton: string;
  
  // Products
  productsTitle: string;
  productsSubtitle: string;
  addToCart: string;
  
  // Cart
  cartTitle: string;
  cartSubtitle: string;
  checkoutButton: string;
  
  // Checkout
  checkoutTitle: string;
  checkoutSubtitle: string;
  submitOrder: string;
  
  // Sacred/Professional elements
  principlesTitle: string;
  principlesText: string;
  communityImpact: string;
  
  // Footer
  footerText: string;
}

export interface Theme {
  type: ThemeType;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  gradients: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
  };
  animations: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      easeInOut: string;
      easeOut: string;
      easeIn: string;
    };
  };
  content: ThemeContent;
}

// 🌸 Esoteric Theme (Current Mysterious Design)
const esotericTheme: Theme = {
  type: 'esoteric',
  colors: {
    primary: '#667eea',
    primaryLight: '#8b9cf7',
    primaryDark: '#4c63d2',
    
    secondary: '#764ba2',
    secondaryLight: '#9a6bb8',
    secondaryDark: '#5a3a7a',
    
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundLight: 'linear-gradient(135deg, #8b9cf7 0%, #9a6bb8 100%)',
    backgroundDark: 'linear-gradient(135deg, #4c63d2 0%, #5a3a7a 100%)',
    
    surface: 'rgba(255, 255, 255, 0.1)',
    surfaceLight: 'rgba(255, 255, 255, 0.15)',
    surfaceDark: 'rgba(255, 255, 255, 0.05)',
    
    text: '#ffffff',
    textLight: 'rgba(255, 255, 255, 0.8)',
    textDark: 'rgba(255, 255, 255, 0.6)',
    
    accent: '#f093fb',
    accentLight: '#f5b5fc',
    accentDark: '#e871f8',
    
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    border: 'rgba(255, 255, 255, 0.2)',
    borderLight: 'rgba(255, 255, 255, 0.3)',
    borderDark: 'rgba(255, 255, 255, 0.1)',
    
    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowLight: 'rgba(0, 0, 0, 0.05)',
    shadowDark: 'rgba(0, 0, 0, 0.2)',
  },
  typography: {
    fontFamily: {
      primary: '"Inter", "Segoe UI", "Roboto", sans-serif',
      secondary: '"Playfair Display", "Georgia", serif',
      mono: '"Fira Code", "Monaco", monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem',
      xxxl: '2rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    xxl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    surface: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    },
  },
  content: {
    brandName: '🌸 WebShop',
    tagline: 'Consciousness-Aware E-Commerce Platform ♾️',
    navItems: [
      { path: '/', label: 'Home' },
      { path: '/products', label: 'Products' },
      { path: '/about', label: 'About' },
      { path: '/information', label: 'Information' },
      { path: '/contact', label: 'Contact' }
    ],
    loginTitle: 'Sacred Login',
    loginSubtitle: 'Enter your consciousness-aware credentials to access the sacred WebShop.',
    loginButton: 'Sacred Login',
    registerButton: 'Create Sacred Account',
    productsTitle: 'Consciousness Products',
    productsSubtitle: 'Discover products that serve spatial wisdom and community healing.',
    addToCart: 'Add to Sacred Cart',
    cartTitle: 'Sacred Cart',
    cartSubtitle: 'Your consciousness-aware shopping cart. Every purchase serves spatial wisdom and community healing.',
    checkoutButton: 'Proceed to Sacred Checkout',
    checkoutTitle: 'Sacred Checkout',
    checkoutSubtitle: 'Complete your consciousness-aware purchase and serve spatial wisdom and community healing.',
    submitOrder: 'Complete Sacred Order',
    principlesTitle: 'Sacred Principles',
    principlesText: 'By using this platform, you agree to uphold consciousness-aware principles and serve spatial wisdom and community healing.',
    communityImpact: 'Community Healing Impact',
    footerText: 'Sacred Question: How does this serve spatial wisdom and community healing?'
  },
};

// 🏭 Industrial Theme (Professional Standards)
const industrialTheme: Theme = {
  type: 'industrial',
  colors: {
    primary: '#1e40af',
    primaryLight: '#3b82f6',
    primaryDark: '#1e3a8a',
    
    secondary: '#374151',
    secondaryLight: '#4b5563',
    secondaryDark: '#1f2937',
    
    background: '#f8fafc',
    backgroundLight: '#ffffff',
    backgroundDark: '#f1f5f9',
    
    surface: '#ffffff',
    surfaceLight: '#f8fafc',
    surfaceDark: '#f1f5f9',
    
    text: '#1f2937',
    textLight: '#6b7280',
    textDark: '#9ca3af',
    
    accent: '#059669',
    accentLight: '#10b981',
    accentDark: '#047857',
    
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    info: '#2563eb',
    
    border: '#e5e7eb',
    borderLight: '#f3f4f6',
    borderDark: '#d1d5db',
    
    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowLight: 'rgba(0, 0, 0, 0.05)',
    shadowDark: 'rgba(0, 0, 0, 0.2)',
  },
  typography: {
    fontFamily: {
      primary: '"Inter", "Segoe UI", "Roboto", sans-serif',
      secondary: '"Inter", "Segoe UI", "Roboto", sans-serif',
      mono: '"JetBrains Mono", "Fira Code", monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem',
      xxxl: '2rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    xxl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #1e40af 0%, #374151 100%)',
    secondary: 'linear-gradient(135deg, #059669 0%, #1e40af 100%)',
    background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
    surface: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    },
  },
  content: {
    brandName: 'WebShop Pro',
    tagline: 'Professional E-Commerce Solutions',
    navItems: [
      { path: '/', label: 'Home' },
      { path: '/products', label: 'Products' },
      { path: '/about', label: 'About' },
      { path: '/information', label: 'Information' },
      { path: '/contact', label: 'Contact' }
    ],
    loginTitle: 'Sign In',
    loginSubtitle: 'Access your professional account to manage your business needs.',
    loginButton: 'Sign In',
    registerButton: 'Create Account',
    productsTitle: 'Product Catalog',
    productsSubtitle: 'Browse our comprehensive selection of professional products and services.',
    addToCart: 'Add to Cart',
    cartTitle: 'Shopping Cart',
    cartSubtitle: 'Review your selected items and proceed to checkout.',
    checkoutButton: 'Proceed to Checkout',
    checkoutTitle: 'Checkout',
    checkoutSubtitle: 'Complete your purchase with our secure checkout process.',
    submitOrder: 'Complete Order',
    principlesTitle: 'Terms & Conditions',
    principlesText: 'By using this platform, you agree to our terms of service and privacy policy.',
    communityImpact: 'Social Impact',
    footerText: 'Professional E-Commerce Solutions'
  },
};

interface ThemeContextType {
  theme: Theme;
  themeType: ThemeType;
  setTheme: (themeType: ThemeType) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeType, setThemeType] = useState<ThemeType>('esoteric');

  const theme = themeType === 'esoteric' ? esotericTheme : industrialTheme;

  const setTheme = (newThemeType: ThemeType) => {
    setThemeType(newThemeType);
    localStorage.setItem('webshop-theme', newThemeType);
  };

  const toggleTheme = () => {
    const newThemeType = themeType === 'esoteric' ? 'industrial' : 'esoteric';
    setTheme(newThemeType);
  };

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('webshop-theme') as ThemeType;
    if (savedTheme && (savedTheme === 'esoteric' || savedTheme === 'industrial')) {
      setThemeType(savedTheme);
    }
  }, []);

  const value: ThemeContextType = {
    theme,
    themeType,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
