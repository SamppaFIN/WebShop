"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ProductImage } from "@/components/product/ProductImage"
import { useCartStore } from "@/store/cartStore"
import { useUIStore } from "@/store/uiStore"
import { getProductById } from "@/lib/api/products"
import type { Product } from "@/types"

export function CartDrawer() {
  const { items, removeItem, updateQuantity } = useCartStore()
  const isOpen = useUIStore((s) => s.isCartOpen)
  const closeCart = useUIStore((s) => s.closeCart)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isOpen && items.length > 0) {
      setLoading(true)
      Promise.all(items.map((i) => getProductById(i.productId)))
        .then((results) => setProducts(results.filter(Boolean) as Product[]))
        .finally(() => setLoading(false))
    }
    if (items.length === 0) setProducts([])
  }, [isOpen, items])

  const total = items.reduce((sum, item) => {
    const p = products.find((p) => p.id === item.productId)
    return sum + (p?.price ?? 0) * item.quantity
  }, 0)

  const handleCheckout = () => {
    closeCart()
    router.push("/checkout")
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { if (!open) closeCart() }}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Ostoskori ({items.length})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <ShoppingCartIcon />
            <p>Ostoskorisi on tyhjä</p>
            <Button variant="outline" onClick={() => { closeCart(); router.push("/products") }}>
              Selaa tuotteita
            </Button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {items.map((item) => {
              const product = products.find((p) => p.id === item.productId)
              if (!product) return null
              return (
                <div key={item.productId} className="flex gap-3 items-start">
                  <div className="w-12 h-12 rounded bg-muted flex-shrink-0 overflow-hidden">
                    <ProductImage src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Intl.NumberFormat("fi-FI", { style: "currency", currency: "EUR" }).format(product.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeItem(item.productId)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )
            })}
          </div>
        )}

        {items.length > 0 && (
          <SheetFooter className="flex-col gap-2">
            <Separator />
            <div className="flex justify-between text-lg font-bold w-full">
              <span>Yhteensä</span>
              <span>{new Intl.NumberFormat("fi-FI", { style: "currency", currency: "EUR" }).format(total)}</span>
            </div>
            <Button className="w-full" onClick={handleCheckout}>Siirry kassalle</Button>
            <Button variant="ghost" className="w-full" onClick={closeCart}>Jatka ostoksia</Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}

function ShoppingCartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  )
}
