-- WebShop — RLS-politiikat webshop-skemalle
-- Aja: Supabase SQL Editorissa
-- HUOM: auth.uid() palauttaa UUID:n → castataan TEXT:ksi koska ID-kentät ovat TEXT

-- Tuotteet: julkisesti luettavissa
ALTER TABLE webshop."Product" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tuotteet ovat julkisesti luettavissa" ON webshop."Product"
  FOR SELECT USING (true);

-- Tuotekuvat: julkisesti luettavissa
ALTER TABLE webshop."ProductImage" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Kuvat ovat julkisesti luettavissa" ON webshop."ProductImage"
  FOR SELECT USING (true);

-- Tuotevariantit: julkisesti luettavissa
ALTER TABLE webshop."ProductVariant" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Variantit ovat julkisesti luettavissa" ON webshop."ProductVariant"
  FOR SELECT USING (true);

-- Arvostelut: julkisesti luettavissa, vain kirjautuneet voivat lisätä
ALTER TABLE webshop."Review" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Arvostelut ovat julkisesti luettavissa" ON webshop."Review"
  FOR SELECT USING (true);
CREATE POLICY "Kirjautuneet voivat lisätä arvosteluja" ON webshop."Review"
  FOR INSERT WITH CHECK (auth.uid()::text = "userId");
CREATE POLICY "Käyttäjä voi muokata omia arvostelujaan" ON webshop."Review"
  FOR UPDATE USING (auth.uid()::text = "userId");
CREATE POLICY "Käyttäjä voi poistaa omia arvostelujaan" ON webshop."Review"
  FOR DELETE USING (auth.uid()::text = "userId");

-- Ostoskori: vain omistaja
ALTER TABLE webshop."Cart" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Käyttäjä näkee oman korinsa" ON webshop."Cart"
  FOR SELECT USING (auth.uid()::text = "userId");
CREATE POLICY "Käyttäjä voi luoda korin" ON webshop."Cart"
  FOR INSERT WITH CHECK (auth.uid()::text = "userId");
CREATE POLICY "Käyttäjä voi päivittää omaa koriaan" ON webshop."Cart"
  FOR UPDATE USING (auth.uid()::text = "userId");

ALTER TABLE webshop."CartItem" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Käyttäjä näkee omat kori-tuotteensa" ON webshop."CartItem"
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM webshop."Cart" WHERE id = "CartItem"."cartId" AND "userId" = auth.uid()::text)
  );
CREATE POLICY "Käyttäjä voi lisätä koriinsa" ON webshop."CartItem"
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM webshop."Cart" WHERE id = "CartItem"."cartId" AND "userId" = auth.uid()::text)
  );
CREATE POLICY "Käyttäjä voi päivittää kori-tuotteitaan" ON webshop."CartItem"
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM webshop."Cart" WHERE id = "CartItem"."cartId" AND "userId" = auth.uid()::text)
  );
CREATE POLICY "Käyttäjä voi poistaa kori-tuotteitaan" ON webshop."CartItem"
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM webshop."Cart" WHERE id = "CartItem"."cartId" AND "userId" = auth.uid()::text)
  );

-- Tilaukset: vain omistaja
ALTER TABLE webshop."Order" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Käyttäjä näkee omat tilauksensa" ON webshop."Order"
  FOR SELECT USING (auth.uid()::text = "userId");
CREATE POLICY "Käyttäjä voi luoda tilauksen" ON webshop."Order"
  FOR INSERT WITH CHECK (auth.uid()::text = "userId");

ALTER TABLE webshop."OrderItem" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Käyttäjä näkee omat tilausrivinsä" ON webshop."OrderItem"
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM webshop."Order" WHERE id = "OrderItem"."orderId" AND "userId" = auth.uid()::text)
  );
CREATE POLICY "Käyttäjä voi lisätä tilausrivejä" ON webshop."OrderItem"
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM webshop."Order" WHERE id = "OrderItem"."orderId" AND "userId" = auth.uid()::text)
  );

-- Osoitteet: vain omistaja
ALTER TABLE webshop."Address" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Käyttäjä näkee omat osoitteensa" ON webshop."Address"
  FOR SELECT USING (auth.uid()::text = "userId");
CREATE POLICY "Käyttäjä voi lisätä osoitteen" ON webshop."Address"
  FOR INSERT WITH CHECK (auth.uid()::text = "userId");
CREATE POLICY "Käyttäjä voi päivittää osoitettaan" ON webshop."Address"
  FOR UPDATE USING (auth.uid()::text = "userId");
CREATE POLICY "Käyttäjä voi poistaa osoitteensa" ON webshop."Address"
  FOR DELETE USING (auth.uid()::text = "userId");

-- Profiili: vain omistaja
ALTER TABLE webshop."Profile" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Käyttäjä näkee oman profiilinsa" ON webshop."Profile"
  FOR SELECT USING (auth.uid()::text = "userId");
CREATE POLICY "Käyttäjä voi luoda profiilin" ON webshop."Profile"
  FOR INSERT WITH CHECK (auth.uid()::text = "userId");
CREATE POLICY "Käyttäjä voi päivittää profiiliaan" ON webshop."Profile"
  FOR UPDATE USING (auth.uid()::text = "userId");

-- Hakuloki: kirjautuneet voivat lukea, kaikki voivat kirjoittaa
ALTER TABLE webshop."SearchLog" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Haut ovat julkisesti lisättävissä" ON webshop."SearchLog"
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Kirjautuneet näkevät haut" ON webshop."SearchLog"
  FOR SELECT USING (auth.uid() IS NOT NULL);
