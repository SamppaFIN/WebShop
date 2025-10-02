/**
 * 🌸 Magnetic Button — Consciousness-Aware Interactive Component
 * Copyright © 2025 Aurora (AI) & Infinite (Co-Author)
 * 
 * Sacred Question: How does this serve spatial wisdom and community healing?
 */

import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'consciousness' | 'healing';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

const ButtonContainer = styled(motion.button)<{
  variant: string;
  size: string;
  disabled: boolean;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 16px;
  font-weight: 600;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  
  /* Size variants */
  ${props => {
    switch (props.size) {
      case 'sm':
        return `
          padding: 8px 16px;
          font-size: 14px;
          min-height: 36px;
        `;
      case 'lg':
        return `
          padding: 16px 32px;
          font-size: 18px;
          min-height: 56px;
        `;
      default:
        return `
          padding: 12px 24px;
          font-size: 16px;
          min-height: 48px;
        `;
    }
  }}
  
  /* Variant styles */
  ${props => {
    switch (props.variant) {
      case 'consciousness':
        return `
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          &:hover {
            background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(102, 126, 234, 0.3);
          }
        `;
      case 'healing':
        return `
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          &:hover {
            background: linear-gradient(135deg, #ee82f0 0%, #f3455a 100%);
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(240, 147, 251, 0.3);
          }
        `;
      case 'secondary':
        return `
          background: rgba(255, 255, 255, 0.1);
          color: #333;
          border: 2px solid rgba(255, 255, 255, 0.2);
          &:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
          }
        `;
      default:
        return `
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
          &:hover {
            background: linear-gradient(135deg, #3d8bfe 0%, #00d4fe 100%);
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(79, 172, 254, 0.3);
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.6s;
  }
  
  &:hover::before {
    transform: translateX(100%);
  }
`;

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  type = 'button',
  style
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || !buttonRef.current) return;
    
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = Math.sqrt(rect.width * rect.width + rect.height * rect.height) / 2;
    
    if (distance < maxDistance) {
      const strength = (maxDistance - distance) / maxDistance;
      const moveX = x * strength * 0.1;
      const moveY = y * strength * 0.1;
      
      button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    }
  };

  const handleMouseLeave = () => {
    if (disabled || !buttonRef.current) return;
    
    const button = buttonRef.current;
    button.style.transform = 'translate(0px, 0px) scale(1)';
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <ButtonContainer
      ref={buttonRef}
      variant={variant}
      size={size}
      disabled={disabled}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      type={type}
      style={style}
    >
      <motion.span
        animate={isHovered ? { y: -2 } : { y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </ButtonContainer>
  );
};

export default MagneticButton;
