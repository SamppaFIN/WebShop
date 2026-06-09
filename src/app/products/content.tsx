"use client"

import { useEffect, useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { getProducts, getCategories } from "@/lib/api/products"
import { ProductCard } from "@/components/product/ProductCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Product } from "@/types"

export default function ProductsContent() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category") ?? undefined
  const search = searchParams.get("search") ?? undefined
  const sort = searchParams.get("sort") ?? undefined

  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async (cat?: string, s?: string, sortVal?: string) => {
    setLoading(true)
    try {
      const [result, cats] = await Promise.all([
        getProducts({ category: cat, search: s, sort: sortVal as "price_asc"|"price_desc"|"newest"|undefined, limit: 12, available: true }),
        getCategories(),
      ])
      setProducts(result.data)
      setTotal(result.total)
      setCategories(cats as string[])
    } catch {} finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchData(category, search, sort) }, [category, search, sort, fetchData])

  return (
    <div className="py-16 px-6"><div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-foreground mb-2">Tuotteet</h1>
      <p className="text-muted-foreground mb-8">{total} tuotetta valikoimassa</p>
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <form className="flex-1 flex gap-3" method="GET">
          <Input name="search" placeholder="Hae tuotteita..." defaultValue={search} className="max-w-md" />
          {category && <input type="hidden" name="category" value={category} />}
          <Button type="submit">Hae</Button>
          {(search||category)&&<Link href="/products" className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">Tyhjennä</Link>}
        </form>
        <div className="flex gap-2 flex-wrap">
          <Link href="/products" className={`inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${!category?"bg-accent text-accent-foreground":"border border-border hover:bg-muted"}`}>Kaikki</Link>
          {categories.map(c=><Link key={c} href={`/products?category=${encodeURIComponent(c)}${search?`&search=${encodeURIComponent(search)}`:""}`} className={`inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${category===c?"bg-accent text-accent-foreground":"border border-border hover:bg-muted"}`}>{c}</Link>)}
        </div>
      </div>
      {loading ? <div className="text-center py-20"><p className="text-muted-foreground">Ladataan...</p></div> :
      products.length>0?<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="text-center py-20"><p className="text-xl text-muted-foreground mb-4">Ei tuotteita hakuehdoilla</p><Link href="/products" className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-medium hover:bg-muted transition-colors">Tyhjennä suodattimet</Link></div>}
    </div></div>
  )
}
