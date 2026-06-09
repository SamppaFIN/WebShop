import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold mb-3">🧠 WebShop</h4>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} WebShop. Kaikki oikeudet pidätetään.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Sivusto</h4>
            <nav className="flex flex-col gap-1 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">Etusivu</Link>
              <Link href="/products" className="hover:text-primary">Tuotteet</Link>
            </nav>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Asiakaspalvelu</h4>
            <nav className="flex flex-col gap-1 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-primary">Toimitusehdot</Link>
              <Link href="/privacy" className="hover:text-primary">Tietosuoja</Link>
              <Link href="/contact" className="hover:text-primary">Yhteystiedot</Link>
            </nav>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Maksutavat</h4>
            <p className="text-sm text-muted-foreground">💳 Visa · Mastercard · Stripe</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
