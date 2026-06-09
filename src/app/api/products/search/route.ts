import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { generateEmbedding } from "@/lib/embeddings"

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")
  if (!q || q.length < 2) return NextResponse.json({ products: [] })

  try {
    const embedding = await generateEmbedding(q)
    const { data, error } = await supabase.rpc("match_products", {
      query_embedding: embedding,
      match_threshold: 0.2,
      match_count: 20,
    })
    if (!error && data && data.length > 0) {
      return NextResponse.json({ products: data })
    }
    // Fall through to text search if RPC returns empty
    console.log("RPC returned empty, trying text search for:", q)
  } catch (e) {
    console.error("Semantic search failed, using text search:", e)
  }

  // Fallback: text search
  const pattern = `%${q}%`
  const { data } = await supabase
    .from("Product")
    .select("*")
    .or(`title.ilike.${pattern},description.ilike.${pattern}`)
    .eq("available", true)
    .limit(20)

  return NextResponse.json({ products: data ?? [] })
}
