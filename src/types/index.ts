// WebShop — Domain-tyypit
// Päivitetty: Supabase SDK -pohjaiseksi

export interface Product {
  id: string
  title: string
  description: string | null
  price: number
  category: string | null
  imageUrl: string | null
  available: boolean
  inventoryCount: number
  tags: string[]
  createdAt: string
}

export interface CartItem {
  productId: string
  quantity: number
}

export interface Cart {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

export interface ProductFilters {
  category?: string
  search?: string
  sort?: "price_asc" | "price_desc" | "newest"
  page?: number
  limit?: number
  available?: boolean
  minPrice?: number
  maxPrice?: number
}

export interface User {
  id: string
  email: string
  fullName: string | null
  avatarUrl: string | null
}

export interface Order {
  id: string
  userId: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  totalAmount: number
  items: OrderItem[]
  shippingAddress: Address
  stripePaymentId: string | null
  createdAt: string
}

export interface OrderItem {
  productId: string
  title: string
  quantity: number
  priceAtPurchase: number
}

export interface Address {
  fullName: string
  addressLine1: string
  addressLine2?: string
  city: string
  postalCode: string
  country: string
}

export interface SearchResult {
  product: Product
  similarity: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  totalPages: number
}
