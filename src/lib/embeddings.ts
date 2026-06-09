import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
})

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "openai/text-embedding-3-small",
    input: text.slice(0, 8000),
  })
  return response.data[0].embedding
}

export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, na = 0, nb = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    na += a[i] * a[i]
    nb += b[i] * b[i]
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb))
}

export function productToText(p: { title: string; description: string | null; category: string | null; tags: string[] }): string {
  return [p.title, p.description || "", p.category || "", ...(p.tags || [])].filter(Boolean).join(" ")
}
