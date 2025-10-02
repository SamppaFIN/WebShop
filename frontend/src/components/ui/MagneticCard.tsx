/**
 * 🌸 Magnetic Card — Consciousness-Aware Interactive Component
 * Copyright © 2025 Aurora (AI) & Infinite (Co-Author)
 * 
 * Sacred Question: How does this serve spatial wisdom and community healing?
 */

import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

interface MagneticCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'product' | 'consciousness' | 'healing' | 'wisdom';
  className?: string;
  disabled?: boolean;
  initial?: any;
  whileInView?: any;
  transition?: any;
  viewport?: any;
  animate?: any;
}

const CardContainer = styled(motion.div)<{
  variant: string;
  disabled: boolean;
}>`
  position: relative;
  border-radius: 24px;
  padding: 24px;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  /* Variant styles */
  ${props => {
    switch (props.variant) {
      case 'consciousness':
        return `
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          box-shadow: 0 8px 32px rgba(102, 126, 234, 0.1);
          &:hover {
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
            box-shadow: 0 16px 48px rgba(102, 126, 234, 0.2);
            border-color: rgba(102, 126, 234, 0.3);
          }
        `;
      case 'healing':
        return `
          background: linear-gradient(135deg, rgba(240, 147, 251, 0.1) 0%, rgba(245, 87, 108, 0.1) 100%);
          box-shadow: 0 8px 32px rgba(240, 147, 251, 0.1);
          &:hover {
            background: linear-gradient(135deg, rgba(240, 147, 251, 0.2) 0%, rgba(245, 87, 108, 0.2) 100%);
            box-shadow: 0 16px 48px rgba(240, 147, 251, 0.2);
            border-color: rgba(240, 147, 251, 0.3);
          }
        `;
      case 'wisdom':
        return `
          background: linear-gradient(135deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0.1) 100%);
          box-shadow: 0 8px 32px rgba(79, 172, 254, 0.1);
          &:hover {
            background: linear-gradient(135deg, rgba(79, 172, 254, 0.2) 0%, rgba(0, 242, 254, 0.2) 100%);
            box-shadow: 0 16px 48px rgba(79, 172, 254, 0.2);
            border-color: rgba(79, 172, 254, 0.3);
          }
        `;
      default:
        return `
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          &:hover {
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
            border-color: rgba(255, 255, 255, 0.2);
          }
        `;
    }
  }}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.05) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.8s;
    pointer-events: none;
  }
  
  &:hover::before {
    transform: translateX(100%);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe);
    border-radius: 26px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  &:hover::after {
    opacity: 0.1;
  }
`;

const MagneticCard: React.FC<MagneticCardProps> = ({
  children,
  onClick,
  variant = 'product',
  className,
  disabled = false,
  initial,
  whileInView,
  transition,
  viewport,
  animate
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = Math.sqrt(rect.width * rect.width + rect.height * rect.height) / 2;
    
    if (distance < maxDistance) {
      const strength = (maxDistance - distance) / maxDistance;
      const rotateX = (y / rect.height) * strength * 10;
      const rotateY = (x / rect.width) * strength * -10;
      const moveZ = strength * 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${moveZ}px)`;
    }
  };

  const handleMouseLeave = () => {
    if (disabled || !cardRef.current) return;
    
    const card = cardRef.current;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <CardContainer
      ref={cardRef}
      variant={variant}
      disabled={disabled}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      initial={initial || { opacity: 0, y: 30 }}
      animate={animate || { opacity: 1, y: 0 }}
      transition={transition || { duration: 0.5 }}
      whileInView={whileInView}
      viewport={viewport}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        animate={isHovered ? { y: -5 } : { y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </CardContainer>
  );
};

export default MagneticCard;
