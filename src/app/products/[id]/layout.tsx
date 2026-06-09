import { getProducts } from "@/lib/api/products"

export async function generateStaticParams() {
  try {
    const res = await getProducts({ available: true, limit: 50 })
    return res.data.map((p) => ({ id: p.id }))
  } catch {
    return [{ id: "placeholder" }]
  }
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
