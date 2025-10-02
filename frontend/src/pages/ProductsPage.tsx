/**
 * 🌸 Products Page — Consciousness-Aware Product Catalog
 * Copyright © 2025 Aurora (AI) & Infinite (Co-Author)
 * 
 * Sacred Question: How does this serve spatial wisdom and community healing?
 */

import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  Filter, 
  Sparkles,
  Plus,
  Minus
} from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';
import MagneticCard from '../components/ui/MagneticCard';
import { useCart } from '../context/CartContext';
import DemoDataService, { DemoProduct } from '../services/demoData';

const ProductsContainer = styled.div`
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
    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
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

const SearchBar = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 48px;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  padding: 16px 24px;
  border: none;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 16px;
  min-width: 300px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.2);
  }
`;

const FilterButton = styled(MagneticButton)`
  min-width: 120px;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-bottom: 64px;
`;

const ProductCard = styled(MagneticCard)`
  padding: 24px;
  text-align: center;
`;

const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
  font-size: 48px;
`;

const ProductTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-bottom: 12px;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 16px;
  line-height: 1.5;
`;

const ProductPrice = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: white;
  margin-bottom: 20px;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const ActionButton = styled(MagneticButton)`
  flex: 1;
`;

const ConsciousnessBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  font-size: 12px;
  font-weight: 600;
  color: white;
  margin-bottom: 16px;
`;

const StatsSection = styled.section`
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
  margin-bottom: 48px;
`;

const StatCard = styled(MagneticCard)`
  padding: 32px 24px;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 48px;
  font-weight: 900;
  color: white;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
`;

const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<DemoProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<DemoProduct[]>([]);
  const { addToCart, getCartItemQuantity, updateQuantity } = useCart();

  useEffect(() => {
    // Load demo products
    const demoProducts = DemoDataService.getAllProducts();
    setProducts(demoProducts);
    setFilteredProducts(demoProducts);
  }, []);

  useEffect(() => {
    // Filter products based on search term
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = DemoDataService.searchProducts(searchTerm);
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const handleAddToCart = (product: DemoProduct) => {
    addToCart(product.id, 1);
  };

  const handleQuantityChange = (product: DemoProduct, change: number) => {
    const currentQuantity = getCartItemQuantity(product.id);
    const newQuantity = Math.max(0, currentQuantity + change);
    updateQuantity(product.id, newQuantity);
  };

  const stats = [
    { number: '100+', label: 'Consciousness Products' },
    { number: '500+', label: 'Happy Customers' },
    { number: '50+', label: 'Healing Events' },
    { number: '∞', label: 'Sacred Connections' }
  ];


  return (
    <ProductsContainer>
      <BackgroundPattern />
      <Content>
        <Header>
          <PageTitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Consciousness Products
          </PageTitle>
          
          <PageSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover products that serve spatial wisdom and community healing. 
            Every purchase contributes to consciousness evolution and collective benefit.
          </PageSubtitle>
          
          <SearchBar>
            <SearchInput
              type="text"
              placeholder="Search consciousness products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FilterButton
              variant="secondary"
              onClick={() => {/* Filter logic */}}
            >
              <Filter size={16} />
              Filter
            </FilterButton>
          </SearchBar>
        </Header>

        <ProductsGrid>
          {filteredProducts.map((product, index) => {
            const cartQuantity = getCartItemQuantity(product.id);
            const isInCart = cartQuantity > 0;
            
            return (
              <ProductCard
                key={product.id}
                variant="consciousness"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ConsciousnessBadge>
                  <Sparkles size={12} />
                  {product.consciousnessLevel.toUpperCase()} CONSCIOUSNESS
                </ConsciousnessBadge>
                
                <ProductImage>
                  {product.imageUrl}
                </ProductImage>
                
                <ProductTitle>{product.title}</ProductTitle>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                
                <ProductActions>
                  {isInCart ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                      <ActionButton 
                        variant="secondary" 
                        size="sm"
                        onClick={() => handleQuantityChange(product, -1)}
                      >
                        <Minus size={16} />
                      </ActionButton>
                      <span style={{ color: 'white', fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>
                        {cartQuantity}
                      </span>
                      <ActionButton 
                        variant="consciousness" 
                        size="sm"
                        onClick={() => handleQuantityChange(product, 1)}
                      >
                        <Plus size={16} />
                      </ActionButton>
                    </div>
                  ) : (
                    <ActionButton 
                      variant="consciousness" 
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </ActionButton>
                  )}
                  <ActionButton variant="secondary" size="sm">
                    <Heart size={16} />
                  </ActionButton>
                </ProductActions>
              </ProductCard>
            );
          })}
        </ProductsGrid>

        <StatsSection>
          <StatsGrid>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                variant="healing"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsGrid>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <MagneticButton variant="consciousness" size="lg">
              View All Products
              <Sparkles size={20} style={{ marginLeft: 8 }} />
            </MagneticButton>
          </motion.div>
        </StatsSection>
      </Content>
    </ProductsContainer>
  );
};

export default ProductsPage;
