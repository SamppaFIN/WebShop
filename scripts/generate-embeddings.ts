import "dotenv/config"
import { createClient } from "@supabase/supabase-js"
import { generateEmbedding, productToText } from "../src/lib/embeddings"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { db: { schema: "webshop" } }
)

async function main() {
  console.log("Generating embeddings for all products…\n")
  const { data: products, error } = await supabase.from("Product").select("id,title,description,category,tags")
  if (error || !products) { console.error("Failed to fetch products:", error); process.exit(1) }

  let i = 0
  for (const p of products) {
    i++
    try {
      const text = productToText(p)
      const embedding = await generateEmbedding(text)
      await supabase.from("Product").update({ embedding } as any).eq("id", p.id)
      console.log(`  [${i}/${products.length}] ✅ ${p.title}`)
    } catch (e) {
      console.error(`  [${i}/${products.length}] ❌ ${p.title}: ${e instanceof Error ? e.message : e}`)
    }
  }
  console.log(`\nDone — ${products.length} products.`)
}

main()
