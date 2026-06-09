import Link from "next/link"
import { getProducts, getCategories } from "@/lib/api/products"
import { ProductCard } from "@/components/product/ProductCard"
import { Button } from "@/components/ui/button"

export default async function HomePage() {
  let products = [] as Awaited<ReturnType<typeof getProducts>>["data"]
  let categories = [] as string[]

  try {
    const result = await getProducts({ limit: 4, sort: "newest", available: true })
    products = result.data
    categories = await getCategories()
  } catch {
    // Products will be empty, showing skeleton state via client component
  }

  return (
    <div className="flex flex-col">
      {/* ─── Hero ──────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background pointer-events-none" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-16">
          <div className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-10 md:p-16 shadow-2xl shadow-accent/5">
            <p className="text-lg md:text-xl text-muted-foreground mb-4 font-mono tracking-wide">
              <span className="text-accent">🧠</span>
              <span className="ml-2">Moderni AI-semanttinen verkkokauppa</span>
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-foreground leading-tight mb-6">
              Löydä mitä
              <br />
              <span className="text-accent">tarvitset</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10">
              Älykäs semanttinen haku auttaa löytämään juuri sen mitä etsit — nopeammin kuin koskaan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground text-lg font-semibold px-10 py-7 shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-shadow">Selaa tuotteita →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Products ──────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Suosituimmat tuotteet</h2>
          <p className="text-muted-foreground mb-10">Viimeisimmät lisäykset valikoimaamme</p>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">Ladataan tuotteita...</p>
              <Link href="/products" className="inline-flex items-center justify-center rounded-full border border-border bg-transparent text-foreground text-sm font-medium px-6 py-3 hover:bg-muted transition-colors mt-4">Selaa kaikkia tuotteita</Link>
            </div>
          )}
        </div>
      </section>

      {/* ─── Categories ─────────────────────────────────── */}
      {categories.length > 0 && (
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Tuotekategoriat</h2>
            <p className="text-muted-foreground mb-10">Löydä itsellesi sopivin kategoria</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/products?category=${encodeURIComponent(cat)}`}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-accent hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 text-center"
                >
                  <div className="text-3xl mb-3">{getCategoryIcon(cat)}</div>
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">{cat}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ────────────────────────────────────────── */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Valmiina löytämään jotain uutta?</h2>
          <p className="text-muted-foreground mb-8">Selaa koko valikoimaamme ja löydä piilotetut helmet.</p>
          <Link href="/products" className="inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground text-lg font-semibold px-10 py-7 shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-shadow">Selaa kaikkia tuotteita →</Link>
        </div>
      </section>
    </div>
  )
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    Vaporisaattorit: "💨",
    Lasitaide: "🎨",
    Hamppuvaatteet: "👕",
    Hyvinvointi: "✨",
    Herkkuboksi: "🍪",
  }
  return icons[category] ?? "📦"
}
