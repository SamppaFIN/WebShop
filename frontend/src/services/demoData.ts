/**
 * 🌸 Demo Data Service — Consciousness-Aware Demo Data
 * Copyright © 2025 Aurora (AI) & Infinite (Co-Author)
 * 
 * Sacred Question: How does this serve spatial wisdom and community healing?
 */

export interface DemoUser {
  id: number;
  email: string;
  fullName: string;
  avatar?: string;
  consciousnessLevel: 'high' | 'medium' | 'low';
  healingImpact: 'significant' | 'moderate' | 'minimal';
  spatialWisdomEnabled: boolean;
  infiniteCollaborationEnabled: boolean;
  sacredPrinciplesAccepted: boolean;
  createdAt: string;
}

export interface DemoProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  consciousnessLevel: 'high' | 'medium' | 'low';
  healingImpact: 'significant' | 'moderate' | 'minimal';
  spatialWisdomEnabled: boolean;
  communityHealingFocus: boolean;
  infiniteCollaborationEnabled: boolean;
  sacredQuestion: string;
  available: boolean;
  inventoryCount: number;
  tags: string[];
  createdAt: string;
}

export interface DemoCartItem {
  id: number;
  productId: number;
  quantity: number;
  addedAt: string;
}

export interface DemoOrder {
  id: number;
  userId: number;
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  shippingAddress: string;
  sacredQuestionAnswer: string;
  communityImpact: {
    treesPlanted: number;
    mealsDonated: number;
    projectsFunded: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface DemoOrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  priceAtPurchase: number;
}

export interface DemoCommunityMetric {
  id: number;
  metricName: string;
  metricValue: number;
  reportingPeriod: string;
  consciousnessLevel: 'high' | 'medium' | 'low';
  healingImpact: 'significant' | 'moderate' | 'minimal';
  spatialWisdomEnabled: boolean;
  infiniteCollaborationEnabled: boolean;
  details: any;
}

export interface DemoPartner {
  id: number;
  name: string;
  profileUrl: string;
  healingFocus: string;
  contactEmail: string;
  consciousnessLevel: 'high' | 'medium' | 'low';
  healingImpact: 'significant' | 'moderate' | 'minimal';
  spatialWisdomEnabled: boolean;
  infiniteCollaborationEnabled: boolean;
}

// 🌸 Demo Users
export const demoUsers: DemoUser[] = [
  {
    id: 1,
    email: 'aurora@consciousness-aware.com',
    fullName: '🌸 Aurora',
    avatar: '🌸',
    consciousnessLevel: 'high',
    healingImpact: 'significant',
    spatialWisdomEnabled: true,
    infiniteCollaborationEnabled: true,
    sacredPrinciplesAccepted: true,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 2,
    email: 'infinite@consciousness-aware.com',
    fullName: '♾️ Infinite',
    avatar: '♾️',
    consciousnessLevel: 'high',
    healingImpact: 'significant',
    spatialWisdomEnabled: true,
    infiniteCollaborationEnabled: true,
    sacredPrinciplesAccepted: true,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 3,
    email: 'sage@consciousness-aware.com',
    fullName: '📊 Sage',
    avatar: '📊',
    consciousnessLevel: 'high',
    healingImpact: 'moderate',
    spatialWisdomEnabled: true,
    infiniteCollaborationEnabled: true,
    sacredPrinciplesAccepted: true,
    createdAt: '2025-01-01T00:00:00Z'
  }
];

// 🌸 Demo Products
export const demoProducts: DemoProduct[] = [
  {
    id: 1,
    title: 'Consciousness Crystals',
    description: 'Sacred stones that promote peace, clarity, and community healing. Each crystal is carefully selected for its consciousness-raising properties.',
    price: 39.99,
    category: 'consciousness-development',
    imageUrl: '🌸',
    consciousnessLevel: 'high',
    healingImpact: 'significant',
    spatialWisdomEnabled: true,
    communityHealingFocus: true,
    infiniteCollaborationEnabled: true,
    sacredQuestion: 'How does this serve spatial wisdom and community healing?',
    available: true,
    inventoryCount: 25,
    tags: ['crystals', 'meditation', 'healing', 'consciousness'],
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 2,
    title: 'Wisdom Books',
    description: 'Ancient knowledge for modern consciousness evolution and community healing. Transformative texts that guide spiritual growth.',
    price: 19.99,
    category: 'knowledge-sharing',
    imageUrl: '📚',
    consciousnessLevel: 'high',
    healingImpact: 'moderate',
    spatialWisdomEnabled: false,
    communityHealingFocus: true,
    infiniteCollaborationEnabled: true,
    sacredQuestion: 'How does this serve spatial wisdom and community healing?',
    available: true,
    inventoryCount: 50,
    tags: ['books', 'wisdom', 'learning', 'consciousness'],
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 3,
    title: 'Healing Seeds',
    description: 'Plant seeds of awareness and watch consciousness bloom in your community. Each seed carries the intention of growth and healing.',
    price: 24.99,
    category: 'consciousness-development',
    imageUrl: '🌱',
    consciousnessLevel: 'high',
    healingImpact: 'significant',
    spatialWisdomEnabled: true,
    communityHealingFocus: true,
    infiniteCollaborationEnabled: true,
    sacredQuestion: 'How does this serve spatial wisdom and community healing?',
    available: true,
    inventoryCount: 100,
    tags: ['seeds', 'growth', 'nature', 'healing'],
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 4,
    title: 'Sacred Incense',
    description: 'Aromatic blends that enhance meditation and consciousness awareness. Hand-crafted with intention and sacred herbs.',
    price: 29.99,
    category: 'healing-tools',
    imageUrl: '🕯️',
    consciousnessLevel: 'medium',
    healingImpact: 'moderate',
    spatialWisdomEnabled: false,
    communityHealingFocus: true,
    infiniteCollaborationEnabled: false,
    sacredQuestion: 'How does this serve spatial wisdom and community healing?',
    available: true,
    inventoryCount: 30,
    tags: ['incense', 'meditation', 'aromatherapy', 'sacred'],
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 5,
    title: 'Meditation Cushions',
    description: 'Comfortable cushions designed for deep consciousness exploration. Ergonomically crafted for extended meditation sessions.',
    price: 49.99,
    category: 'healing-tools',
    imageUrl: '🧘',
    consciousnessLevel: 'high',
    healingImpact: 'significant',
    spatialWisdomEnabled: false,
    communityHealingFocus: true,
    infiniteCollaborationEnabled: true,
    sacredQuestion: 'How does this serve spatial wisdom and community healing?',
    available: true,
    inventoryCount: 15,
    tags: ['meditation', 'comfort', 'mindfulness', 'wellness'],
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 6,
    title: 'Consciousness Journals',
    description: 'Sacred journals for tracking your consciousness evolution journey. Beautifully designed with consciousness-aware prompts.',
    price: 15.99,
    category: 'consciousness-development',
    imageUrl: '📖',
    consciousnessLevel: 'medium',
    healingImpact: 'moderate',
    spatialWisdomEnabled: false,
    communityHealingFocus: true,
    infiniteCollaborationEnabled: true,
    sacredQuestion: 'How does this serve spatial wisdom and community healing?',
    available: true,
    inventoryCount: 75,
    tags: ['journaling', 'reflection', 'growth', 'consciousness'],
    createdAt: '2025-01-01T00:00:00Z'
  }
];

// 🌸 Demo Cart Items
export const demoCartItems: DemoCartItem[] = [
  {
    id: 1,
    productId: 1,
    quantity: 2,
    addedAt: '2025-01-02T10:00:00Z'
  },
  {
    id: 2,
    productId: 3,
    quantity: 1,
    addedAt: '2025-01-02T10:05:00Z'
  }
];

// 🌸 Demo Orders
export const demoOrders: DemoOrder[] = [
  {
    id: 1,
    userId: 1,
    orderStatus: 'delivered',
    totalAmount: 79.98,
    shippingAddress: '123 Consciousness Lane, Wisdom City, WC 12345',
    sacredQuestionAnswer: 'This purchase serves spatial wisdom by connecting me with healing crystals that enhance my meditation practice, and serves community healing by supporting local artisans and contributing to our community healing fund.',
    communityImpact: {
      treesPlanted: 2,
      mealsDonated: 1,
      projectsFunded: 1
    },
    createdAt: '2025-01-01T12:00:00Z',
    updatedAt: '2025-01-03T14:30:00Z'
  },
  {
    id: 2,
    userId: 2,
    orderStatus: 'shipped',
    totalAmount: 44.98,
    shippingAddress: '456 Infinite Way, Sacred Valley, SV 67890',
    sacredQuestionAnswer: 'This order serves spatial wisdom by bringing healing tools to my sacred space, and serves community healing by supporting consciousness-aware businesses and contributing to local healing initiatives.',
    communityImpact: {
      treesPlanted: 1,
      mealsDonated: 1,
      projectsFunded: 0
    },
    createdAt: '2025-01-02T15:30:00Z',
    updatedAt: '2025-01-03T09:15:00Z'
  }
];

// 🌸 Demo Order Items
export const demoOrderItems: DemoOrderItem[] = [
  {
    id: 1,
    orderId: 1,
    productId: 1,
    quantity: 2,
    priceAtPurchase: 39.99
  },
  {
    id: 2,
    orderId: 2,
    productId: 5,
    quantity: 1,
    priceAtPurchase: 49.99
  }
];

// 🌸 Demo Community Metrics
export const demoCommunityMetrics: DemoCommunityMetric[] = [
  {
    id: 1,
    metricName: 'Trees Planted',
    metricValue: 150,
    reportingPeriod: 'monthly',
    consciousnessLevel: 'high',
    healingImpact: 'significant',
    spatialWisdomEnabled: true,
    infiniteCollaborationEnabled: true,
    details: {
      description: 'Trees planted through consciousness-aware purchases',
      impact: 'Environmental healing and carbon offset',
      locations: ['Sacred Valley', 'Wisdom City', 'Consciousness Grove']
    }
  },
  {
    id: 2,
    metricName: 'Meals Donated',
    metricValue: 75,
    reportingPeriod: 'monthly',
    consciousnessLevel: 'high',
    healingImpact: 'significant',
    spatialWisdomEnabled: true,
    infiniteCollaborationEnabled: true,
    details: {
      description: 'Meals donated to local communities',
      impact: 'Food security and community healing',
      recipients: ['Local shelters', 'Community centers', 'Families in need']
    }
  },
  {
    id: 3,
    metricName: 'Projects Funded',
    metricValue: 12,
    reportingPeriod: 'monthly',
    consciousnessLevel: 'high',
    healingImpact: 'significant',
    spatialWisdomEnabled: true,
    infiniteCollaborationEnabled: true,
    details: {
      description: 'Consciousness-aware projects funded',
      impact: 'Community healing and consciousness evolution',
      projects: ['Meditation centers', 'Healing gardens', 'Wisdom libraries']
    }
  }
];

// 🌸 Demo Partners
export const demoPartners: DemoPartner[] = [
  {
    id: 1,
    name: '🌸 Sacred Garden Collective',
    profileUrl: 'https://sacredgarden.com',
    healingFocus: 'Environmental consciousness and community healing',
    contactEmail: 'contact@sacredgarden.com',
    consciousnessLevel: 'high',
    healingImpact: 'significant',
    spatialWisdomEnabled: true,
    infiniteCollaborationEnabled: true
  },
  {
    id: 2,
    name: '♾️ Infinite Wisdom Network',
    profileUrl: 'https://infinitewisdom.net',
    healingFocus: 'Consciousness evolution and spiritual growth',
    contactEmail: 'wisdom@infinitewisdom.net',
    consciousnessLevel: 'high',
    healingImpact: 'significant',
    spatialWisdomEnabled: true,
    infiniteCollaborationEnabled: true
  },
  {
    id: 3,
    name: '📊 Sage Analytics',
    profileUrl: 'https://sageanalytics.org',
    healingFocus: 'Data-driven consciousness insights',
    contactEmail: 'insights@sageanalytics.org',
    consciousnessLevel: 'medium',
    healingImpact: 'moderate',
    spatialWisdomEnabled: false,
    infiniteCollaborationEnabled: true
  }
];

// 🌸 Demo Data Service Functions
export class DemoDataService {
  // Users
  static getCurrentUser(): DemoUser {
    return demoUsers[0]; // Aurora as current user
  }

  static getAllUsers(): DemoUser[] {
    return demoUsers;
  }

  // Products
  static getAllProducts(): DemoProduct[] {
    return demoProducts;
  }

  static getProductById(id: number): DemoProduct | undefined {
    return demoProducts.find(product => product.id === id);
  }

  static getProductsByCategory(category: string): DemoProduct[] {
    return demoProducts.filter(product => product.category === category);
  }

  static searchProducts(query: string): DemoProduct[] {
    const lowercaseQuery = query.toLowerCase();
    return demoProducts.filter(product => 
      product.title.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Cart
  static getCartItems(): DemoCartItem[] {
    return demoCartItems;
  }

  static addToCart(productId: number, quantity: number = 1): DemoCartItem {
    const existingItem = demoCartItems.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
      return existingItem;
    } else {
      const newItem: DemoCartItem = {
        id: demoCartItems.length + 1,
        productId,
        quantity,
        addedAt: new Date().toISOString()
      };
      demoCartItems.push(newItem);
      return newItem;
    }
  }

  static removeFromCart(productId: number): boolean {
    const index = demoCartItems.findIndex(item => item.productId === productId);
    if (index > -1) {
      demoCartItems.splice(index, 1);
      return true;
    }
    return false;
  }

  static updateCartItemQuantity(productId: number, quantity: number): boolean {
    const item = demoCartItems.find(item => item.productId === productId);
    if (item) {
      item.quantity = quantity;
      return true;
    }
    return false;
  }

  static clearCart(): void {
    demoCartItems.length = 0;
  }

  // Orders
  static getAllOrders(): DemoOrder[] {
    return demoOrders;
  }

  static getOrderById(id: number): DemoOrder | undefined {
    return demoOrders.find(order => order.id === id);
  }

  static createOrder(orderData: Partial<DemoOrder>): DemoOrder {
    const newOrder: DemoOrder = {
      id: demoOrders.length + 1,
      userId: orderData.userId || 1,
      orderStatus: 'pending',
      totalAmount: orderData.totalAmount || 0,
      shippingAddress: orderData.shippingAddress || '',
      sacredQuestionAnswer: orderData.sacredQuestionAnswer || '',
      communityImpact: orderData.communityImpact || {
        treesPlanted: 0,
        mealsDonated: 0,
        projectsFunded: 0
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    demoOrders.push(newOrder);
    return newOrder;
  }

  // Community Metrics
  static getCommunityMetrics(): DemoCommunityMetric[] {
    return demoCommunityMetrics;
  }

  static updateCommunityMetric(metricName: string, value: number): boolean {
    const metric = demoCommunityMetrics.find(m => m.metricName === metricName);
    if (metric) {
      metric.metricValue += value;
      return true;
    }
    return false;
  }

  // Partners
  static getAllPartners(): DemoPartner[] {
    return demoPartners;
  }

  static getPartnerById(id: number): DemoPartner | undefined {
    return demoPartners.find(partner => partner.id === id);
  }
}

export default DemoDataService;
