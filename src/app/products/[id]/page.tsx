"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { getProductById, searchProducts } from "@/lib/api/products"
import { AddToCartButton } from "@/components/product/AddToCartButton"
import { ProductImage } from "@/components/product/ProductImage"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product/ProductCard"
import type { Product } from "@/types"

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [similar, setSimilar] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    getProductById(id).then(p => {
      setProduct(p)
      if (p?.category) {
        searchProducts(p.category, 5).then(r => setSimilar(r.filter(x => x.id !== p.id).slice(0, 4)))
      }
    }).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="py-32 text-center text-muted-foreground">Ladataan...</div>
  if (!product) return <div className="py-32 text-center"><p className="text-xl text-muted-foreground">Tuotetta ei löydy</p><Link href="/products" className="text-accent hover:underline">← Takaisin tuotteisiin</Link></div>

  const price = new Intl.NumberFormat("fi-FI", { style: "currency", currency: "EUR" }).format(product.price)

  return (
    <div className="py-16 px-6"><div className="max-w-6xl mx-auto">
      <nav className="text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground">Etusivu</Link> / <Link href="/products" className="hover:text-foreground">Tuotteet</Link> / <span className="text-foreground">{product.title}</span>
      </nav>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="aspect-square rounded-2xl bg-card border border-border overflow-hidden">
          <ProductImage src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col gap-4">
          <Badge variant="secondary" className="w-fit">{product.category}</Badge>
          <h1 className="text-4xl font-bold text-foreground">{product.title}</h1>
          <p className="text-4xl font-bold text-accent">{price}</p>
          {product.available ? <p className="text-green-500 font-medium">✓ Varastossa ({product.inventoryCount} kpl)</p> : <p className="text-destructive font-medium">✕ Loppunut</p>}
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          {product.tags.length>0 && <div className="flex flex-wrap gap-2">{product.tags.map(t=><Badge key={t} variant="outline">{t}</Badge>)}</div>}
          <AddToCartButton product={product} />
        </div>
      </div>
      {similar.length>0 && <section className="mt-20"><h2 className="text-2xl font-bold text-foreground mb-6">Samankaltaiset tuotteet</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-6">{similar.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>}
    </div></div>
  )
}
