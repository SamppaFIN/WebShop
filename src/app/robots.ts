import { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL || "https://samppafin.github.io/WebShop"
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/checkout", "/orders", "/account"] },
    sitemap: `${base}/sitemap.xml`,
  }
}
