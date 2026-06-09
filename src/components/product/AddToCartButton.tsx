"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cartStore"
import { useUIStore } from "@/store/uiStore"
import type { Product } from "@/types"

interface Props { product: Product }

export function AddToCartButton({ product }: Props) {
  const [qty,setQty]=useState(1)
  const addItem=useCartStore(s=>s.addItem)
  const openCart=useUIStore(s=>s.openCart)
  const max=Math.min(10,product.inventoryCount)

  const handleAdd=()=>{addItem(product.id,qty);openCart()}

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" onClick={()=>setQty(q=>Math.max(1,q-1))} disabled={qty<=1}><Minus className="h-4 w-4"/></Button>
        <span className="text-lg font-bold w-8 text-center">{qty}</span>
        <Button variant="outline" size="icon" onClick={()=>setQty(q=>Math.min(max,q+1))} disabled={qty>=max}><Plus className="h-4 w-4"/></Button>
      </div>
      <Button size="lg" className="w-full" onClick={handleAdd} disabled={!product.available}>{product.available?`Lisää koriin — ${new Intl.NumberFormat("fi-FI",{style:"currency",currency:"EUR"}).format(product.price*qty)}`:"Loppunut"}</Button>
    </div>
  )
}
