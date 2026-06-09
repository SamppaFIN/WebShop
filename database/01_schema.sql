-- ============================================================
-- WebShop v2.0 - Tietokantaskeema (webshop-schema)
-- Aja: Supabase Dashboard > SQL Editor > liitä ja suorita
-- ============================================================

CREATE SCHEMA IF NOT EXISTS webshop;
CREATE EXTENSION IF NOT EXISTS vector;

-- NextAuth.js
CREATE TABLE webshop."User" (id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text, name TEXT, email TEXT UNIQUE NOT NULL, "emailVerified" TIMESTAMPTZ, image TEXT);
CREATE TABLE webshop."Account" (id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text, "userId" TEXT NOT NULL REFERENCES webshop."User"(id) ON DELETE CASCADE, type TEXT NOT NULL, provider TEXT NOT NULL, "providerAccountId" TEXT NOT NULL, refresh_token TEXT, access_token TEXT, expires_at INTEGER, token_type TEXT, scope TEXT, id_token TEXT, session_state TEXT, UNIQUE(provider, "providerAccountId"));
CREATE TABLE webshop."Session" (id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text, "sessionToken" TEXT UNIQUE NOT NULL, "userId" TEXT NOT NULL REFERENCES webshop."User"(id) ON DELETE CASCADE, expires TIMESTAMPTZ NOT NULL);
CREATE TABLE webshop."VerificationToken" (identifier TEXT NOT NULL, token TEXT UNIQUE NOT NULL, expires TIMESTAMPTZ NOT NULL, UNIQUE(identifier, token));
CREATE TABLE webshop."Profile" (id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text, "userId" TEXT UNIQUE NOT NULL REFERENCES webshop."User"(id) ON DELETE CASCADE, "fullName" TEXT, "avatarUrl" TEXT, "createdAt" TIMESTAMPTZ DEFAULT NOW(), "updatedAt" TIMESTAMPTZ DEFAULT NOW());

-- Tuotteet
CREATE TABLE webshop."Product" (id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text, title TEXT NOT NULL, description TEXT, price DECIMAL(10,2) NOT NULL CHECK (price >= 0), category TEXT, "imageUrl" TEXT, available BOOLEAN DEFAULT TRUE, "inventoryCount" INTEGER DEFAULT 0, tags TEXT[] DEFAULT '{}', embedding vector(1536), "createdAt" TIMESTAMPTZ DEFAULT NOW(), "updatedAt" TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE webshop."ProductImage" (id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text, "productId" TEXT NOT NULL REFERENCES webshop."Product"(id) ON DELETE CASCADE, url TEXT NOT NULL, alt TEXT, "createdAt" TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE webshop."ProductVariant" (id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text, "productId" TEXT NOT NULL REFERENCES webshop."Product"(id) ON DELETE CASCADE, sku TEXT UNIQUE, name TEXT NOT NULL, value TEXT NOT NULL, stock INTEGER DEFAULT 0, "createdAt" TIMESTAMPTZ DEFAULT NOW());

-- Arvostelut
CREATE TABLE webshop."Review" (id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text, "productId" TEXT NOT NULL REFERENCES webshop."Product"(id) ON DELETE CASCADE, "userId" TEXT NOT NULL REFERENCES webshop."User"(id) ON DELETE CASCADE, rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5), comment TEXT, "createdAt" TIMESTAMPTZ DEFAULT NOW());

-- Ostoskori
CREATE TABLE webshop."Cart" (id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text, "userId" TEXT UNIQUE NOT NULL REFERENCES webshop."User"(id) ON DELETE CASCADE, "createdAt" TIMESTAMPTZ DEFAULT NOW(), "updatedAt" TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE webshop."CartItem" (id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text, "cartId" TEXT NOT NULL REFERENCES webshop."Cart"(id) ON DELETE CASCADE, "productId" TEXT NOT NULL REFERENCES webshop."Product"(id), "variantId" TEXT, quantity INTEGER DEFAULT 1 CHECK (quantity > 0), "addedAt" TIMESTAMPTZ DEFAULT NOW());

-- Tilaukset
CREATE TABLE webshop."Order" (id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text, "userId" TEXT NOT NULL REFERENCES webshop."User"(id), status TEXT DEFAULT 'pending' CHECK (status IN ('pending','processing','shipped','delivered','cancelled')), "totalAmount" DECIMAL(10,2) NOT NULL, "shippingAddress" JSONB NOT NULL, "stripePaymentId" TEXT, "createdAt" TIMESTAMPTZ DEFAULT NOW(), "updatedAt" TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE webshop."OrderItem" (id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text, "orderId" TEXT NOT NULL REFERENCES webshop."Order"(id) ON DELETE CASCADE, "productId" TEXT NOT NULL REFERENCES webshop."Product"(id), title TEXT NOT NULL, quantity INTEGER NOT NULL CHECK (quantity > 0), "priceAtPurchase" DECIMAL(10,2) NOT NULL);

-- Osoitteet
CREATE TABLE webshop."Address" (id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text, "userId" TEXT NOT NULL REFERENCES webshop."User"(id) ON DELETE CASCADE, "fullName" TEXT NOT NULL, "addressLine1" TEXT NOT NULL, "addressLine2" TEXT, city TEXT NOT NULL, "postalCode" TEXT NOT NULL, country TEXT DEFAULT 'FI', "isDefault" BOOLEAN DEFAULT FALSE, "createdAt" TIMESTAMPTZ DEFAULT NOW(), "updatedAt" TIMESTAMPTZ DEFAULT NOW());

-- Hakuloki
CREATE TABLE webshop."SearchLog" (id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text, query TEXT NOT NULL, "resultsCount" INTEGER DEFAULT 0, "userId" TEXT REFERENCES webshop."User"(id) ON DELETE SET NULL, "createdAt" TIMESTAMPTZ DEFAULT NOW());

-- Indeksit
CREATE INDEX idx_product_category ON webshop."Product"(category);
CREATE INDEX idx_product_available ON webshop."Product"(available);
CREATE INDEX idx_product_price ON webshop."Product"(price);
CREATE INDEX idx_product_created ON webshop."Product"("createdAt" DESC);
CREATE INDEX idx_cart_user ON webshop."Cart"("userId");
CREATE INDEX idx_order_user ON webshop."Order"("userId");
CREATE INDEX idx_review_product ON webshop."Review"("productId");
CREATE INDEX idx_address_user ON webshop."Address"("userId");

-- VALMIS
