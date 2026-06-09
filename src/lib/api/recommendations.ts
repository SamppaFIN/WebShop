import { supabase } from "@/lib/supabase"
import { generateEmbedding, cosineSimilarity } from "@/lib/embeddings"
import type { Product } from "@/types"

export async function getSimilarProducts(productId: string, limit = 4): Promise<Product[]> {
  // Hae kohdetuotteen embedding
  const { data: target } = await supabase.from("Product").select("embedding").eq("id", productId).single()
  if (!target?.embedding) {
    // Fallback: saman kategorian tuotteet
    const { data: product } = await supabase.from("Product").select("category").eq("id", productId).single()
    if (!product?.category) return []
    const { data } = await supabase.from("Product").select("*").eq("category", product.category).neq("id", productId).eq("available", true).limit(limit)
    return (data ?? []) as Product[]
  }

  // Hae lähistöllä olevat embeddingit RPC-funktiolla
  const { data } = await supabase.rpc("match_products", {
    query_embedding: target.embedding as number[],
    match_threshold: 0.5,
    match_count: limit + 5,
  })

  if (!data) return []
  return (data as Product[]).filter((p: any) => p.id !== productId).slice(0, limit)
}

export async function getRecommendationsForCart(productIds: string[], limit = 4): Promise<Product[]> {
  if (productIds.length === 0) return []

  // Hae tuotteiden embeddingit
  const { data: products } = await supabase.from("Product").select("id,embedding").in("id", productIds)
  if (!products || products.length === 0) return []

  // Laske keskiarvo-embedding
  const dim = 1536
  const avg = new Array(dim).fill(0)
  let count = 0
  for (const p of products) {
    if (!p.embedding) continue
    const emb = p.embedding as number[]
    for (let i = 0; i < dim; i++) avg[i] += emb[i]
    count++
  }
  if (count === 0) return []
  for (let i = 0; i < dim; i++) avg[i] /= count

  // Hae lähimmät tuotteet
  const { data } = await supabase.rpc("match_products", {
    query_embedding: avg,
    match_threshold: 0.3,
    match_count: limit + productIds.length,
  })

  if (!data) return []
  return (data as Product[]).filter((p: any) => !productIds.includes(p.id)).slice(0, limit)
}
