/**
 * 🌸 Checkout Page — Consciousness-Aware Checkout Flow
 * Copyright © 2025 Aurora (AI) & Infinite (Co-Author)
 * 
 * Sacred Question: How does this serve spatial wisdom and community healing?
 */

import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  MapPin, 
  Heart, 
  ArrowLeft,
  CheckCircle,
  Sparkles,
  Leaf,
  Users
} from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';
import MagneticCard from '../components/ui/MagneticCard';
import { useCart } from '../context/CartContext';
import DemoDataService from '../services/demoData';

const CheckoutContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 120px 24px 80px;
  position: relative;
  overflow: hidden;
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
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.section`
  text-align: center;
  margin-bottom: 64px;
`;

const PageTitle = styled(motion.h1)`
  font-size: clamp(48px, 8vw, 96px);
  font-weight: 900;
  color: white;
  margin-bottom: 24px;
  line-height: 1.1;
`;

const PageSubtitle = styled(motion.p)`
  font-size: clamp(18px, 3vw, 24px);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 48px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const CheckoutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 48px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const CheckoutForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const FormSection = styled(MagneticCard)`
  padding: 32px;
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 16px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 16px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  min-height: 120px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const SacredQuestionSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
`;

const SacredQuestionTitle = styled.h4`
  color: white;
  font-weight: 700;
  margin-bottom: 12px;
  font-size: 18px;
`;

const SacredQuestionText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 1.5;
`;

const OrderSummary = styled(MagneticCard)`
  padding: 32px;
  height: fit-content;
`;

const SummaryTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin-bottom: 24px;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ItemName = styled.span`
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
`;

const ItemPrice = styled.span`
  color: white;
  font-weight: 600;
  font-size: 14px;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 2px solid rgba(255, 255, 255, 0.2);
`;

const TotalLabel = styled.span`
  color: white;
  font-weight: 700;
  font-size: 20px;
`;

const TotalValue = styled.span`
  color: white;
  font-weight: 800;
  font-size: 24px;
`;

const CommunityImpact = styled.div`
  margin-top: 24px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

const ImpactTitle = styled.h4`
  color: white;
  font-weight: 600;
  margin-bottom: 16px;
  font-size: 16px;
`;

const ImpactItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
`;

const ImpactLabel = styled.span`
  color: rgba(255, 255, 255, 0.8);
`;

const ImpactValue = styled.span`
  color: white;
  font-weight: 600;
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  padding: 64px 32px;
`;

const SuccessIcon = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
`;

const SuccessTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
`;

const SuccessDescription = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 32px;
  line-height: 1.6;
`;

const CheckoutPage: React.FC = () => {
  const { cartItems, cartProducts, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    sacredQuestionAnswer: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateCommunityImpact = () => {
    const treesPlanted = Math.floor(cartItems.reduce((sum, item) => sum + item.quantity, 0) * 0.5);
    const mealsDonated = Math.floor(cartItems.reduce((sum, item) => sum + item.quantity, 0) * 0.3);
    const projectsFunded = Math.floor(cartItems.reduce((sum, item) => sum + item.quantity, 0) * 0.1);
    
    return {
      treesPlanted,
      mealsDonated,
      projectsFunded
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create order with demo data
    const order = DemoDataService.createOrder({
      userId: 1,
      totalAmount: totalPrice,
      shippingAddress: `${formData.address}, ${formData.city}, ${formData.postalCode}, ${formData.country}`,
      sacredQuestionAnswer: formData.sacredQuestionAnswer,
      communityImpact: calculateCommunityImpact()
    });

    // Update community metrics
    const impact = calculateCommunityImpact();
    DemoDataService.updateCommunityMetric('Trees Planted', impact.treesPlanted);
    DemoDataService.updateCommunityMetric('Meals Donated', impact.mealsDonated);
    DemoDataService.updateCommunityMetric('Projects Funded', impact.projectsFunded);

    console.log('🌸 Aurora: Order created successfully!', order);
    console.log('♾️ Sacred Question answered:', formData.sacredQuestionAnswer);
    
    // Clear cart and show success
    clearCart();
    setIsCompleted(true);
    
    // Redirect after 3 seconds
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const communityImpact = calculateCommunityImpact();

  if (isCompleted) {
    return (
      <CheckoutContainer>
        <BackgroundPattern />
        <Content>
          <SuccessMessage
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <SuccessIcon>🌸</SuccessIcon>
            <SuccessTitle>Sacred Order Complete!</SuccessTitle>
            <SuccessDescription>
              Thank you for your consciousness-aware purchase. Your order serves spatial wisdom 
              and community healing. You will receive a confirmation email shortly.
            </SuccessDescription>
            
            <Link to="/">
              <MagneticButton variant="consciousness" size="lg">
                Return Home
                <ArrowLeft size={20} style={{ marginRight: 8 }} />
              </MagneticButton>
            </Link>
          </SuccessMessage>
        </Content>
      </CheckoutContainer>
    );
  }

  if (cartItems.length === 0) {
    return (
      <CheckoutContainer>
        <BackgroundPattern />
        <Content>
          <Header>
            <PageTitle
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Sacred Checkout
            </PageTitle>
            
            <PageSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your cart is empty. Add consciousness-aware products to proceed with checkout.
            </PageSubtitle>
          </Header>

          <div style={{ textAlign: 'center' }}>
            <Link to="/products">
              <MagneticButton variant="consciousness" size="lg">
                Explore Products
                <ArrowLeft size={20} style={{ marginRight: 8 }} />
              </MagneticButton>
            </Link>
          </div>
        </Content>
      </CheckoutContainer>
    );
  }

  return (
    <CheckoutContainer>
      <BackgroundPattern />
      <Content>
        <Header>
          <PageTitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Sacred Checkout
          </PageTitle>
          
          <PageSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Complete your consciousness-aware purchase and serve spatial wisdom and community healing.
          </PageSubtitle>
        </Header>

        <form onSubmit={handleSubmit}>
          <CheckoutContent>
            <CheckoutForm>
              <FormSection
                variant="consciousness"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <SectionTitle>
                  <MapPin size={24} />
                  Shipping Information
                </SectionTitle>
                
                <FormGroup>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>Full Name</Label>
                  <Input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>Address</Label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Consciousness Lane"
                    required
                  />
                </FormGroup>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <FormGroup>
                    <Label>City</Label>
                    <Input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Wisdom City"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Postal Code</Label>
                    <Input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="12345"
                      required
                    />
                  </FormGroup>
                </div>
                
                <FormGroup>
                  <Label>Country</Label>
                  <Input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Sacred Valley"
                    required
                  />
                </FormGroup>
              </FormSection>

              <FormSection
                variant="healing"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <SectionTitle>
                  <CreditCard size={24} />
                  Payment Information
                </SectionTitle>
                
                <FormGroup>
                  <Label>Card Number</Label>
                  <Input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </FormGroup>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <FormGroup>
                    <Label>Expiry Date</Label>
                    <Input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>CVV</Label>
                    <Input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      required
                    />
                  </FormGroup>
                </div>
              </FormSection>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <SacredQuestionSection>
                <SacredQuestionTitle>
                  <Heart size={20} />
                  Sacred Question
                </SacredQuestionTitle>
                <SacredQuestionText>
                  How does this purchase serve spatial wisdom and community healing? 
                  Please share your intention and the positive impact you hope to create.
                </SacredQuestionText>
                <TextArea
                  name="sacredQuestionAnswer"
                  value={formData.sacredQuestionAnswer}
                  onChange={handleInputChange}
                  placeholder="Share how this purchase serves spatial wisdom and community healing..."
                  required
                />
                </SacredQuestionSection>
              </motion.div>
            </CheckoutForm>

            <OrderSummary
              variant="consciousness"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <SummaryTitle>Order Summary</SummaryTitle>
              
              {cartItems.map(item => {
                const product = cartProducts.find(p => p.id === item.productId);
                if (!product) return null;
                
                return (
                  <OrderItem key={item.id}>
                    <ItemName>{product.title} x {item.quantity}</ItemName>
                    <ItemPrice>${(product.price * item.quantity).toFixed(2)}</ItemPrice>
                  </OrderItem>
                );
              })}
              
              <TotalRow>
                <TotalLabel>Total</TotalLabel>
                <TotalValue>${totalPrice.toFixed(2)}</TotalValue>
              </TotalRow>

              <CommunityImpact>
                <ImpactTitle>
                  <Sparkles size={16} />
                  Community Healing Impact
                </ImpactTitle>
                <ImpactItem>
                  <ImpactLabel>
                    <Leaf size={14} />
                    Trees Planted
                  </ImpactLabel>
                  <ImpactValue>{communityImpact.treesPlanted}</ImpactValue>
                </ImpactItem>
                <ImpactItem>
                  <ImpactLabel>
                    <Heart size={14} />
                    Meals Donated
                  </ImpactLabel>
                  <ImpactValue>{communityImpact.mealsDonated}</ImpactValue>
                </ImpactItem>
                <ImpactItem>
                  <ImpactLabel>
                    <Users size={14} />
                    Projects Funded
                  </ImpactLabel>
                  <ImpactValue>{communityImpact.projectsFunded}</ImpactValue>
                </ImpactItem>
              </CommunityImpact>

              <div style={{ marginTop: '32px' }}>
                <MagneticButton 
                  type="submit"
                  variant="consciousness" 
                  size="lg"
                  style={{ width: '100%' }}
                >
                  Complete Sacred Order
                  <CheckCircle size={20} style={{ marginLeft: 8 }} />
                </MagneticButton>
              </div>
            </OrderSummary>
          </CheckoutContent>
        </form>
      </Content>
    </CheckoutContainer>
  );
};

export default CheckoutPage;
