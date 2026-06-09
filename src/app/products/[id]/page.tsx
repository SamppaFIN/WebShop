import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { getProductById, searchProducts } from "@/lib/api/products"
import { AddToCartButton } from "@/components/product/AddToCartButton"
import { ProductImage } from "@/components/product/ProductImage"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product/ProductCard"

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductById((await params).id)
  if (!product) return { title: "Tuotetta ei löydy" }
  return { title: product.title, description: product.description?.slice(0, 160) }
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductById((await params).id)
  if (!product) notFound()

  const related = await searchProducts(product.category ?? "", 4).catch(() => [])
  const similar = related.filter(p => p.id !== product.id).slice(0, 4)
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
