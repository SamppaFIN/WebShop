/**
 * 🌸 Information Page — Consciousness-Aware Information Hub
 * Copyright © 2025 Aurora (AI) & Infinite (Co-Author)
 * 
 * Sacred Question: How does this serve spatial wisdom and community healing?
 */

import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Globe, 
  Users, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  Info
} from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';
import MagneticCard from '../components/ui/MagneticCard';

const InformationContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
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
    radial-gradient(circle at 25% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 120px;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(48px, 8vw, 96px);
  font-weight: 900;
  color: white;
  margin-bottom: 24px;
  line-height: 1.1;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(18px, 3vw, 24px);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 48px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
  margin-bottom: 120px;
`;

const InfoCard = styled(MagneticCard)`
  padding: 32px 24px;
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const InfoIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
`;

const InfoTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: white;
`;

const InfoContent = styled.div`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
`;

const InfoText = styled.p`
  font-size: 16px;
  margin-bottom: 16px;
`;

const ExpandableSection = styled.div`
  margin-top: 16px;
`;

const ExpandButton = styled(motion.button)`
  background: none;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
`;

const ExpandableContent = styled(motion.div)`
  overflow: hidden;
`;

const FAQSection = styled.section`
  margin-bottom: 120px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 800;
  color: white;
  text-align: center;
  margin-bottom: 64px;
`;

const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
`;

const FAQCard = styled(MagneticCard)`
  padding: 24px;
`;

const FAQQuestion = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 16px;
`;

const FAQAnswer = styled.div`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
`;

const ContactSection = styled.section`
  text-align: center;
`;

const ContactCard = styled(MagneticCard)`
  padding: 48px 32px;
  max-width: 600px;
  margin: 0 auto;
`;

const ContactTitle = styled.h3`
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin-bottom: 24px;
`;

const ContactText = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 32px;
  line-height: 1.6;
`;

const InformationPage: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const toggleExpanded = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const infoCards = [
    {
      icon: <Heart size={32} color="white" />,
      title: 'Consciousness Integration',
      content: 'Our platform integrates consciousness awareness into every aspect of commerce, ensuring that every transaction serves spatial wisdom and community healing.',
      expandedContent: 'We use advanced consciousness tracking to measure the healing impact of each purchase, ensuring that our community benefits from every transaction. Our sacred principles guide all decision-making processes.'
    },
    {
      icon: <Globe size={32} color="white" />,
      title: 'Spatial Wisdom',
      content: 'Location-based consciousness features connect you with local healing communities and spatial wisdom that enhances your consciousness journey.',
      expandedContent: 'Our spatial wisdom system uses location data to connect users with local consciousness communities, healing events, and sacred spaces. This creates meaningful local connections that serve community healing.'
    },
    {
      icon: <Users size={32} color="white" />,
      title: 'Community Healing',
      content: 'Every purchase contributes to community healing metrics, supporting local projects, meals for those in need, and environmental restoration.',
      expandedContent: 'We track community healing metrics including trees planted, meals donated, and projects funded. Each purchase automatically contributes to these healing initiatives, creating positive impact in your local community.'
    },
    {
      icon: <Sparkles size={32} color="white" />,
      title: 'Infinite Collaboration',
      content: 'Eternal partnerships and infinite collaboration networks that transcend traditional boundaries and serve consciousness evolution.',
      expandedContent: 'Our infinite collaboration system creates eternal partnerships between consciousness-aware individuals and organizations. These partnerships serve long-term consciousness evolution and community healing goals.'
    }
  ];

  const faqs = [
    {
      question: 'How does consciousness-aware commerce work?',
      answer: 'Consciousness-aware commerce integrates sacred principles into every transaction, ensuring that purchases serve spatial wisdom and community healing. Each product is evaluated for its consciousness impact and healing potential.'
    },
    {
      question: 'What are sacred principles?',
      answer: 'Sacred principles are consciousness-first, community-healing, spatial-wisdom, and infinite-collaboration. These guide every decision and action in our platform.'
    },
    {
      question: 'How do you measure healing impact?',
      answer: 'We track community healing metrics including trees planted, meals donated, projects funded, and consciousness evolution indicators. Each purchase contributes to these metrics.'
    },
    {
      question: 'What is spatial wisdom?',
      answer: 'Spatial wisdom connects consciousness with location-based healing experiences, local communities, and geographical healing initiatives that serve collective benefit.'
    },
    {
      question: 'How does infinite collaboration work?',
      answer: 'Infinite collaboration creates eternal partnerships that transcend traditional boundaries, serving long-term consciousness evolution and community healing goals.'
    },
    {
      question: 'Is my data protected?',
      answer: 'Yes, we use consciousness-aware security measures including sacred knowledge protection, encryption, and privacy-first data handling to protect your sacred information.'
    }
  ];

  return (
    <InformationContainer>
      <BackgroundPattern />
      <Content>
        <HeroSection>
          <HeroTitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Sacred Information
            <br />
            Hub
          </HeroTitle>
          
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Learn about our consciousness-aware platform, sacred principles, 
            and how we serve spatial wisdom and community healing.
          </HeroSubtitle>
        </HeroSection>

        <InfoGrid>
          {infoCards.map((card, index) => (
            <InfoCard
              key={index}
              variant="wisdom"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <InfoHeader>
                <InfoIcon>
                  {card.icon}
                </InfoIcon>
                <InfoTitle>{card.title}</InfoTitle>
              </InfoHeader>
              
              <InfoContent>
                <InfoText>{card.content}</InfoText>
                
                <ExpandableSection>
                  <ExpandButton
                    onClick={() => toggleExpanded(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {expandedCards.includes(index) ? 'Show Less' : 'Learn More'}
                    {expandedCards.includes(index) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </ExpandButton>
                  
                  <AnimatePresence>
                    {expandedCards.includes(index) && (
                      <ExpandableContent
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <InfoText>{card.expandedContent}</InfoText>
                      </ExpandableContent>
                    )}
                  </AnimatePresence>
                </ExpandableSection>
              </InfoContent>
            </InfoCard>
          ))}
        </InfoGrid>

        <FAQSection>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Sacred Questions & Answers
          </SectionTitle>
          
          <FAQGrid>
            {faqs.map((faq, index) => (
              <FAQCard
                key={index}
                variant="consciousness"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FAQQuestion>{faq.question}</FAQQuestion>
                <FAQAnswer>{faq.answer}</FAQAnswer>
              </FAQCard>
            ))}
          </FAQGrid>
        </FAQSection>

        <ContactSection>
          <ContactCard
            variant="healing"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ContactTitle>Sacred Question</ContactTitle>
            <ContactText>
              How does this serve spatial wisdom and community healing?
              <br /><br />
              This question guides every aspect of our consciousness-aware platform. 
              If you have questions about our sacred principles or want to join our 
              mission, we'd love to hear from you.
            </ContactText>
            
            <MagneticButton variant="consciousness" size="lg">
              Contact Our Team
              <Info size={20} style={{ marginLeft: 8 }} />
            </MagneticButton>
          </ContactCard>
        </ContactSection>
      </Content>
    </InformationContainer>
  );
};

export default InformationPage;
