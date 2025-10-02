/**
 * 🌸 Theme Switcher — Consciousness-Aware Theme Selection
 * Copyright © 2025 Aurora (AI) & Infinite (Co-Author)
 * 
 * Sacred Question: How does this serve spatial wisdom and community healing?
 */

import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Palette, Settings, Sparkles, Building2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SwitcherContainer = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  @media (max-width: 768px) {
    top: 80px;
    right: 16px;
  }
`;

const SwitcherButton = styled(motion.button)<{ active: boolean; theme: any }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid ${props => props.active ? props.theme.colors.accent : props.theme.colors.border};
  background: ${props => props.active ? props.theme.colors.accent : props.theme.colors.surface};
  color: ${props => props.active ? props.theme.colors.text : props.theme.colors.textLight};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    border-color: ${props => props.theme.colors.accent};
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.text};
  }
`;

const ThemeLabel = styled(motion.div)<{ active: boolean; theme: any }>`
  position: absolute;
  right: 60px;
  top: 50%;
  transform: translateY(-50%);
  background: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.colors.border};
  opacity: ${props => props.active ? 1 : 0};
  pointer-events: none;
  transition: opacity 0.3s ease;
`;

const ThemeSwitcher: React.FC = () => {
  const { themeType, setTheme, theme } = useTheme();

  return (
    <SwitcherContainer
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div style={{ position: 'relative' }}>
        <SwitcherButton
          active={themeType === 'esoteric'}
          theme={theme}
          onClick={() => setTheme('esoteric')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles size={20} />
        </SwitcherButton>
        <ThemeLabel active={themeType === 'esoteric'} theme={theme}>
          Esoteric Theme
        </ThemeLabel>
      </div>
      
      <div style={{ position: 'relative' }}>
        <SwitcherButton
          active={themeType === 'industrial'}
          theme={theme}
          onClick={() => setTheme('industrial')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Building2 size={20} />
        </SwitcherButton>
        <ThemeLabel active={themeType === 'industrial'} theme={theme}>
          Industrial Theme
        </ThemeLabel>
      </div>
    </SwitcherContainer>
  );
};

export default ThemeSwitcher;
