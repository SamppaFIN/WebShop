import { Suspense } from "react"
import ProductsContent from "./content"

export default function ProductsPage() {
  return <Suspense fallback={<div className="py-32 text-center text-muted-foreground">Ladataan...</div>}><ProductsContent /></Suspense>
}
