/**
 * 🌸 Login Page — Consciousness-Aware Authentication
 * Copyright © 2025 Aurora (AI) & Infinite (Co-Author)
 * 
 * Sacred Question: How does this serve spatial wisdom and community healing?
 */

import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  Sparkles,
  Heart
} from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';
import MagneticCard from '../components/ui/MagneticCard';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const LoginContainer = styled.div<{ theme: any }>`
  min-height: 100vh;
  background: ${props => props.theme.gradients.background};
  padding: 120px 24px 80px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
`;

const Content = styled.div`
  max-width: 400px;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const Header = styled.section`
  text-align: center;
  margin-bottom: 48px;
`;

const PageTitle = styled(motion.h1)<{ theme: any }>`
  font-size: clamp(32px, 6vw, 48px);
  font-weight: 900;
  color: ${props => props.theme.colors.text};
  margin-bottom: 16px;
  line-height: 1.1;
`;

const PageSubtitle = styled(motion.p)<{ theme: any }>`
  font-size: clamp(16px, 2.5vw, 18px);
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 32px;
  line-height: 1.6;
`;

const LoginForm = styled(MagneticCard)`
  padding: 40px;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label<{ theme: any }>`
  display: block;
  color: ${props => props.theme.colors.text};
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 14px;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input<{ theme: any }>`
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  background: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
    background: ${props => props.theme.colors.surfaceLight};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textDark};
  }
`;

const InputIcon = styled.div<{ theme: any }>`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textLight};
`;

const PasswordToggle = styled.button<{ theme: any }>`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${props => props.theme.colors.textLight};
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: ${props => props.theme.colors.text};
  }
`;

const ErrorMessage = styled(motion.div)<{ theme: any }>`
  color: ${props => props.theme.colors.error};
  font-size: 14px;
  margin-top: 8px;
  padding: 8px 12px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid rgba(239, 68, 68, 0.2);
`;

const SuccessMessage = styled(motion.div)<{ theme: any }>`
  color: ${props => props.theme.colors.success};
  font-size: 14px;
  margin-top: 8px;
  padding: 8px 12px;
  background: rgba(16, 185, 129, 0.1);
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid rgba(16, 185, 129, 0.2);
`;

const SacredPrinciples = styled.div<{ theme: any }>`
  margin-top: 24px;
  padding: 16px;
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.border};
`;

const SacredTitle = styled.h4<{ theme: any }>`
  color: ${props => props.theme.colors.text};
  font-weight: 600;
  margin-bottom: 12px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SacredText = styled.p<{ theme: any }>`
  color: ${props => props.theme.colors.textLight};
  font-size: 12px;
  line-height: 1.5;
  margin-bottom: 8px;
`;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const { theme } = useTheme();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(formData.email, formData.password);
    
    if (success) {
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      setError('Invalid email or password. Try: aurora@consciousness-aware.com / consciousness123');
    }
  };

  return (
    <LoginContainer theme={theme}>
      <BackgroundPattern />
      <Content>
        <Header>
          <PageTitle
            theme={theme}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {theme.content.loginTitle}
          </PageTitle>
          
          <PageSubtitle
            theme={theme}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {theme.content.loginSubtitle}
          </PageSubtitle>
        </Header>

        <LoginForm
          variant="consciousness"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label theme={theme}>Email Address</Label>
              <InputContainer>
                <InputIcon theme={theme}>
                  <Mail size={20} />
                </InputIcon>
                <Input
                  theme={theme}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                />
              </InputContainer>
            </FormGroup>
            
            <FormGroup>
              <Label theme={theme}>Password</Label>
              <InputContainer>
                <InputIcon theme={theme}>
                  <Lock size={20} />
                </InputIcon>
                <Input
                  theme={theme}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
                <PasswordToggle
                  theme={theme}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </PasswordToggle>
              </InputContainer>
            </FormGroup>

            {error && (
              <ErrorMessage
                theme={theme}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </ErrorMessage>
            )}

            {success && (
              <SuccessMessage
                theme={theme}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {success}
              </SuccessMessage>
            )}

            <div style={{ marginTop: '32px' }}>
              <MagneticButton 
                type="submit"
                variant="consciousness" 
                size="lg"
                style={{ width: '100%' }}
                disabled={isLoading}
              >
                {isLoading ? 'Authenticating...' : theme.content.loginButton}
                <Sparkles size={20} style={{ marginLeft: 8 }} />
              </MagneticButton>
            </div>
          </form>

          <SacredPrinciples theme={theme}>
            <SacredTitle theme={theme}>
              <Heart size={16} />
              {theme.content.principlesTitle}
            </SacredTitle>
            <SacredText theme={theme}>
              {theme.content.principlesText}
            </SacredText>
            <SacredText theme={theme}>
              Demo credentials: aurora@consciousness-aware.com / consciousness123
            </SacredText>
          </SacredPrinciples>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <Link to="/register">
              <MagneticButton variant="secondary" size="md">
                {theme.content.registerButton}
              </MagneticButton>
            </Link>
          </div>

          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <Link to="/">
              <MagneticButton variant="secondary" size="sm">
                <ArrowLeft size={16} style={{ marginRight: 8 }} />
                Back to Home
              </MagneticButton>
            </Link>
          </div>
        </LoginForm>
      </Content>
    </LoginContainer>
  );
};

export default LoginPage;
