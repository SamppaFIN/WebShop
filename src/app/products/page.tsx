import Link from "next/link"
import { getProducts, getCategories } from "@/lib/api/products"
import { ProductCard } from "@/components/product/ProductCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Props { searchParams: Promise<{ category?: string; search?: string; sort?: string }> }

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams
  const result = await getProducts({ category: params.category, search: params.search, sort: params.sort as "price_asc"|"price_desc"|"newest"|undefined, limit: 12, available: true }).catch(() => null)
  const products = result?.data ?? []
  const categories = await getCategories().catch(() => [] as string[])

  return (
    <div className="py-16 px-6"><div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-foreground mb-2">Tuotteet</h1>
      <p className="text-muted-foreground mb-8">{result?.total ?? 0} tuotetta valikoimassa</p>
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <form className="flex-1 flex gap-3" method="GET">
          <Input name="search" placeholder="Hae tuotteita..." defaultValue={params.search} className="max-w-md" />
          {params.category && <input type="hidden" name="category" value={params.category} />}
          <Button type="submit">Hae</Button>
          {(params.search||params.category)&&<Link href="/products" className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">Tyhjennä</Link>}
        </form>
        <div className="flex gap-2 flex-wrap">
          <Link href="/products" className={`inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${!params.category?"bg-accent text-accent-foreground":"border border-border hover:bg-muted"}`}>Kaikki</Link>
          {categories.map(c=><Link key={c} href={`/products?category=${encodeURIComponent(c)}${params.search?`&search=${encodeURIComponent(params.search)}`:""}`} className={`inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${params.category===c?"bg-accent text-accent-foreground":"border border-border hover:bg-muted"}`}>{c}</Link>)}
        </div>
      </div>
      {products.length>0?<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="text-center py-20"><p className="text-xl text-muted-foreground mb-4">Ei tuotteita hakuehdoilla</p><Link href="/products" className="inline-flex items-center justify-center rounded-lg border border-border bg-transparent px-6 py-3 text-sm font-medium hover:bg-muted transition-colors">Tyhjennä suodattimet</Link></div>}
    </div></div>
  )
}
