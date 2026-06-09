import { supabase } from "@/lib/supabase"
import type { Product, ProductFilters, PaginatedResponse, SearchResult } from "@/types"

const PAGE_SIZE = 12

export async function getProducts(
  filters: ProductFilters = {}
): Promise<PaginatedResponse<Product>> {
  const { category, search, sort, page = 1, limit = PAGE_SIZE, available, minPrice, maxPrice } = filters
  const from = (page - 1) * limit
  const to = from + limit - 1

  let query = supabase
    .from("Product")
    .select("*", { count: "exact" })
    .range(from, to)

  if (category) query = query.eq("category", category)
  if (available !== undefined) query = query.eq("available", available)
  if (minPrice !== undefined) query = query.gte("price", minPrice)
  if (maxPrice !== undefined) query = query.lte("price", maxPrice)

  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
  }

  switch (sort) {
    case "price_asc": query = query.order("price", { ascending: true }); break
    case "price_desc": query = query.order("price", { ascending: false }); break
    default: query = query.order("createdAt", { ascending: false })
  }

  const { data, error, count } = await query

  if (error) throw new Error(error.message)

  return {
    data: data as Product[],
    total: count ?? 0,
    page,
    totalPages: Math.ceil((count ?? 0) / limit),
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("Product")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    if (error.code === "PGRST116") return null
    throw new Error(error.message)
  }
  return data as Product
}

export async function getCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from("Product")
    .select("category")

  if (error) throw new Error(error.message)

  const categories = [...new Set(data.map((d: { category: string | null }) => d.category).filter(Boolean))]
  return categories as string[]
}

export async function searchProducts(
  query: string,
  limit = 20
): Promise<Product[]> {
  const { data, error } = await supabase
    .from("Product")
    .select("*")
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .eq("available", true)
    .limit(limit)

  if (error) throw new Error(error.message)
  return data as Product[]
}

export async function searchProductsSemantic(
  query: string,
  limit = 20
): Promise<SearchResult[]> {
  // Fallback: tekstihaku kunnes WS-020 toteuttaa embedding-haun
  const products = await searchProducts(query, limit)
  return products.map(p => ({ product: p, similarity: 1 }))
}
