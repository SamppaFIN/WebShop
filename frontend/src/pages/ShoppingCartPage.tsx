/**
 * 🌸 Shopping Cart Page — Consciousness-Aware Cart Management
 * Copyright © 2025 Aurora (AI) & Infinite (Co-Author)
 * 
 * Sacred Question: How does this serve spatial wisdom and community healing?
 */

import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Trash2, 
  Heart, 
  ArrowRight,
  Plus,
  Minus,
  Sparkles
} from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';
import MagneticCard from '../components/ui/MagneticCard';
import { useCart } from '../context/CartContext';

const CartContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 48px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CartItem = styled(MagneticCard)`
  padding: 24px;
  display: flex;
  gap: 24px;
  align-items: center;
`;

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  backdrop-filter: blur(10px);
  flex-shrink: 0;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
`;

const ItemDescription = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 12px;
  line-height: 1.5;
`;

const ItemPrice = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: white;
`;

const ItemActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const QuantityButton = styled(MagneticButton)`
  width: 36px;
  height: 36px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuantityDisplay = styled.div`
  color: white;
  font-weight: 600;
  font-size: 16px;
  min-width: 24px;
  text-align: center;
`;

const RemoveButton = styled(MagneticButton)`
  width: 36px;
  height: 36px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CartSummary = styled(MagneticCard)`
  padding: 32px;
  height: fit-content;
`;

const SummaryTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin-bottom: 24px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SummaryLabel = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
`;

const SummaryValue = styled.span`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
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
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

const ImpactTitle = styled.h4`
  color: white;
  font-weight: 600;
  margin-bottom: 12px;
  font-size: 16px;
`;

const ImpactItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
`;

const ImpactLabel = styled.span`
  color: rgba(255, 255, 255, 0.8);
`;

const ImpactValue = styled.span`
  color: white;
  font-weight: 600;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 64px 32px;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
`;

const EmptyTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
`;

const EmptyDescription = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 32px;
`;

const ShoppingCartPage: React.FC = () => {
  const { cartItems, cartProducts, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();

  const calculateCommunityImpact = () => {
    const treesPlanted = Math.floor(totalItems * 0.5);
    const mealsDonated = Math.floor(totalItems * 0.3);
    const projectsFunded = Math.floor(totalItems * 0.1);
    
    return {
      treesPlanted,
      mealsDonated,
      projectsFunded
    };
  };

  const communityImpact = calculateCommunityImpact();

  if (totalItems === 0) {
    return (
      <CartContainer>
        <BackgroundPattern />
        <Content>
          <Header>
            <PageTitle
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Sacred Cart
            </PageTitle>
            
            <PageSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your consciousness-aware shopping cart is empty. 
              Add products that serve spatial wisdom and community healing.
            </PageSubtitle>
          </Header>

          <EmptyCart>
            <EmptyIcon>🛒</EmptyIcon>
            <EmptyTitle>Your Sacred Cart Awaits</EmptyTitle>
            <EmptyDescription>
              Discover consciousness-aware products that serve spatial wisdom and community healing.
            </EmptyDescription>
            
            <Link to="/products">
              <MagneticButton variant="consciousness" size="lg">
                Explore Products
                <ArrowRight size={20} style={{ marginLeft: 8 }} />
              </MagneticButton>
            </Link>
          </EmptyCart>
        </Content>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <BackgroundPattern />
      <Content>
        <Header>
          <PageTitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Sacred Cart
          </PageTitle>
          
          <PageSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your consciousness-aware shopping cart with {totalItems} items. 
            Every purchase serves spatial wisdom and community healing.
          </PageSubtitle>
        </Header>

        <CartContent>
          <CartItems>
            {cartItems.map((item, index) => {
              const product = cartProducts.find(p => p.id === item.productId);
              if (!product) return null;

              return (
                <CartItem
                  key={item.id}
                  variant="healing"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <ItemImage>
                    {product.imageUrl}
                  </ItemImage>
                  
                  <ItemDetails>
                    <ItemTitle>{product.title}</ItemTitle>
                    <ItemDescription>{product.description}</ItemDescription>
                    <ItemPrice>${product.price.toFixed(2)}</ItemPrice>
                  </ItemDetails>
                  
                  <ItemActions>
                    <QuantityControls>
                      <QuantityButton
                        variant="secondary"
                        size="sm"
                        onClick={() => updateQuantity(product.id, item.quantity - 1)}
                      >
                        <Minus size={16} />
                      </QuantityButton>
                      
                      <QuantityDisplay>
                        {item.quantity}
                      </QuantityDisplay>
                      
                      <QuantityButton
                        variant="consciousness"
                        size="sm"
                        onClick={() => updateQuantity(product.id, item.quantity + 1)}
                      >
                        <Plus size={16} />
                      </QuantityButton>
                    </QuantityControls>
                    
                    <RemoveButton
                      variant="secondary"
                      size="sm"
                      onClick={() => removeFromCart(product.id)}
                    >
                      <Trash2 size={16} />
                    </RemoveButton>
                  </ItemActions>
                </CartItem>
              );
            })}
          </CartItems>

          <CartSummary
            variant="consciousness"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <SummaryTitle>Sacred Summary</SummaryTitle>
            
            <SummaryRow>
              <SummaryLabel>Items ({totalItems})</SummaryLabel>
              <SummaryValue>${totalPrice.toFixed(2)}</SummaryValue>
            </SummaryRow>
            
            <SummaryRow>
              <SummaryLabel>Shipping</SummaryLabel>
              <SummaryValue>Free</SummaryValue>
            </SummaryRow>
            
            <SummaryRow>
              <SummaryLabel>Consciousness Tax</SummaryLabel>
              <SummaryValue>0%</SummaryValue>
            </SummaryRow>
            
            <TotalRow>
              <TotalLabel>Total</TotalLabel>
              <TotalValue>${totalPrice.toFixed(2)}</TotalValue>
            </TotalRow>

            <CommunityImpact>
              <ImpactTitle>Community Healing Impact</ImpactTitle>
              <ImpactItem>
                <ImpactLabel>Trees Planted</ImpactLabel>
                <ImpactValue>{communityImpact.treesPlanted}</ImpactValue>
              </ImpactItem>
              <ImpactItem>
                <ImpactLabel>Meals Donated</ImpactLabel>
                <ImpactValue>{communityImpact.mealsDonated}</ImpactValue>
              </ImpactItem>
              <ImpactItem>
                <ImpactLabel>Projects Funded</ImpactLabel>
                <ImpactValue>{communityImpact.projectsFunded}</ImpactValue>
              </ImpactItem>
            </CommunityImpact>

            <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Link to="/checkout">
                <MagneticButton variant="consciousness" size="lg">
                  Proceed to Checkout
                  <ArrowRight size={20} style={{ marginLeft: 8 }} />
                </MagneticButton>
              </Link>
              
              <Link to="/products">
                <MagneticButton variant="secondary" size="lg">
                  Continue Shopping
                </MagneticButton>
              </Link>
            </div>
          </CartSummary>
        </CartContent>
      </Content>
    </CartContainer>
  );
};

export default ShoppingCartPage;
