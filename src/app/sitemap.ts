import { MetadataRoute } from "next"
import { getProducts } from "@/lib/api/products"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const { data: products } = await getProducts({ available: true, limit: 1000 })
  const productUrls = products.map(p => ({ url: `${base}/products/${p.id}`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.7 }))
  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/products`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    ...productUrls,
  ]
}
