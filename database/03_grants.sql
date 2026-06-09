-- WebShop — Oikeudet webshop-skemalle
-- Aja: Supabase SQL Editorissa

-- Salli anon-käyttäjälle luku kaikkiin webshop-tauluihin
GRANT USAGE ON SCHEMA webshop TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA webshop TO anon;
GRANT SELECT ON ALL TABLES IN SCHEMA webshop TO authenticated;
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA webshop TO authenticated;

-- Varmista että tulevatkin taulut saavat oikeudet
ALTER DEFAULT PRIVILEGES IN SCHEMA webshop GRANT SELECT ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES IN SCHEMA webshop GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated;
