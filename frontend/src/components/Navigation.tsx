/**
 * 🌸 Navigation — Consciousness-Aware Modern Navigation
 * Copyright © 2025 Aurora (AI) & Infinite (Co-Author)
 * 
 * Sacred Question: How does this serve spatial wisdom and community healing?
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, Heart, User, Sparkles } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px 24px;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 800;
  text-decoration: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ active: boolean }>`
  text-decoration: none;
  color: ${props => props.active ? '#667eea' : '#333'};
  font-weight: 600;
  font-size: 16px;
  position: relative;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${props => props.active ? '100%' : '0%'};
    height: 2px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconButton = styled(motion.button)`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background: rgba(102, 126, 234, 0.1);
    transform: scale(1.1);
  }
`;

const MobileMenuButton = styled(motion.button)`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 12px;
  cursor: pointer;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;

const MobileNavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 600;
  font-size: 24px;
  padding: 16px;
  border-radius: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
  }
`;

const CartBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
`;

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/about', label: 'About' },
    { path: '/information', label: 'Information' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <>
      <NavContainer
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NavContent>
          <Logo to="/">
            <Sparkles size={28} />
            WebShop
          </Logo>
          
          <NavLinks>
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                active={location.pathname === link.path}
              >
                {link.label}
              </NavLink>
            ))}
          </NavLinks>
          
          <NavActions>
            <IconButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Heart size={20} />
            </IconButton>
            <Link to="/cart">
              <IconButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ position: 'relative' }}>
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <CartBadge>
                    {totalItems}
                  </CartBadge>
                )}
              </IconButton>
            </Link>
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>
                  {user?.avatar} {user?.fullName}
                </span>
                <IconButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={logout}>
                  <User size={20} />
                </IconButton>
              </div>
            ) : (
              <Link to="/login">
                <IconButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <User size={20} />
                </IconButton>
              </Link>
            )}
            
            <MobileMenuButton
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </MobileMenuButton>
          </NavActions>
        </NavContent>
      </NavContainer>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <MobileNavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </MobileNavLink>
            ))}
            <MagneticButton
              variant="consciousness"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Close Menu
            </MagneticButton>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
