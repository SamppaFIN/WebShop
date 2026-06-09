import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem, Product } from "@/types"

interface CartState {
  items: CartItem[]
  addItem: (productId: string, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (productId, quantity = 1) => {
        const items = get().items
        const existing = items.find((i) => i.productId === productId)
        if (existing) {
          set({
            items: items.map((i) =>
              i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
            ),
          })
        } else {
          set({ items: [...items, { productId, quantity }] })
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) })
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
        } else {
          set({
            items: get().items.map((i) =>
              i.productId === productId ? { ...i, quantity } : i
            ),
          })
        }
      },
      clearCart: () => set({ items: [] }),
    }),
    { name: "webshop-cart" }
  )
)

export const totalItems = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.quantity, 0)

export function getCartTotal(items: CartItem[], products: Product[]): number {
  return items.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId)
    return total + (product?.price ?? 0) * item.quantity
  }, 0)
}
