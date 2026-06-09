-- WebShop — pgvector similarity search function
-- Aja: Supabase SQL Editorissa

CREATE OR REPLACE FUNCTION webshop.match_products(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.3,
  match_count int DEFAULT 20
)
RETURNS TABLE(
  id text,
  title text,
  description text,
  price decimal,
  category text,
  "imageUrl" text,
  available boolean,
  "inventoryCount" int,
  tags text[],
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id, p.title, p.description, p.price, p.category,
    p."imageUrl", p.available, p."inventoryCount", p.tags,
    1 - (p.embedding <=> query_embedding) AS similarity
  FROM webshop."Product" p
  WHERE p.embedding IS NOT NULL
    AND p.available = true
    AND 1 - (p.embedding <=> query_embedding) > match_threshold
  ORDER BY p.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
