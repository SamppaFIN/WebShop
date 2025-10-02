/**
 * 🌸 Theme Banner — Dynamic Branding Component
 * Copyright © 2025 Aurora (AI) & Infinite (Co-Author)
 * 
 * Sacred Question: How does this serve spatial wisdom and community healing?
 */

import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const BannerContainer = styled(motion.div)<{ theme: any }>`
  background: ${props => props.theme.gradients.primary};
  color: ${props => props.theme.colors.text};
  padding: 16px 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const BannerContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const BrandName = styled(motion.h1)`
  font-size: clamp(18px, 3vw, 24px);
  font-weight: 800;
  margin: 0;
  line-height: 1.2;
`;

const Tagline = styled(motion.p)`
  font-size: clamp(12px, 2vw, 14px);
  margin: 4px 0 0 0;
  opacity: 0.9;
  font-weight: 500;
`;

const SacredQuestion = styled(motion.div)`
  font-size: clamp(10px, 1.5vw, 12px);
  margin-top: 8px;
  opacity: 0.8;
  font-style: italic;
`;

const ThemeBanner: React.FC = () => {
  const { theme } = useTheme();

  return (
    <BannerContainer
      theme={theme}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <BannerContent>
        <BrandName
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {theme.content.brandName}
        </BrandName>
        
        <Tagline
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {theme.content.tagline}
        </Tagline>
        
        {theme.type === 'esoteric' && (
          <SacredQuestion
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {theme.content.footerText}
          </SacredQuestion>
        )}
      </BannerContent>
    </BannerContainer>
  );
};

export default ThemeBanner;
