"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductImage } from "@/components/product/ProductImage"
import { useCartStore } from "@/store/cartStore"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const price = new Intl.NumberFormat("fi-FI", {
    style: "currency",
    currency: "EUR",
  }).format(product.price)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/products/${product.id}`}>
        <Card className="h-full overflow-hidden group cursor-pointer">
          <div className="aspect-square bg-muted relative overflow-hidden">
            <ProductImage src={product.imageUrl} alt={product.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform" />
            {!product.available && (
              <Badge variant="destructive" className="absolute top-2 right-2">
                Loppunut
              </Badge>
            )}
          </div>
          <CardContent className="p-4">
            <Badge variant="secondary" className="mb-2 text-xs">
              {product.category}
            </Badge>
            <h3 className="font-medium line-clamp-2 mb-1">{product.title}</h3>
            <p className="text-lg font-bold">{price}</p>
            <Button
              className="w-full mt-3"
              disabled={!product.available}
              onClick={(e) => {
                e.preventDefault()
                addItem(product.id)
              }}
            >
              {product.available ? "Lisää koriin" : "Loppunut"}
            </Button>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

export function ProductCardSkeleton() {
  return (
    <Card className="h-full">
      <Skeleton className="aspect-square w-full" />
      <CardContent className="p-4 space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-10 w-full mt-3" />
      </CardContent>
    </Card>
  )
}
