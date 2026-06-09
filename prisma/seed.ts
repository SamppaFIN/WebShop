import { PrismaClient } from "../src/generated/prisma/index.js"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding WebShop products...")

  const products = [
    // Vaporisaattorit & Tarvikkeet
    { title: "PocketVape Mini — Taskukokoinen Höyrystin", description: "Diskreetti taskukokoinen höyrystin kuivalle yrtille. Kolme lämpötila-asetusta, USB-C-lataus, haptinen palaute.", price: 89.99, category: "Vaporisaattorit", imageUrl: "https://images.unsplash.com/photo-1559564426-013b32d47136?w=600", available: true, inventoryCount: 34, tags: ["höyrystin","taskukokoinen","usb-c","savuton"] },
    { title: "CloudMaster 3000 — Pöytähöyrystin", description: "Täydellinen kotihöyrystin jolla saat kaiken irti yrteistäsi. Tarkka digitaalinen lämpötilasäätö. Hiljainen tuuletin, LED-tunnelmavalaistus.", price: 249.99, category: "Vaporisaattorit", imageUrl: "https://images.unsplash.com/photo-1585155967844-ebd6ee06f44a?w=600", available: true, inventoryCount: 12, tags: ["pöytähöyrystin","tarkka","hiljainen","led"] },
    { title: "HerbGrinder Deluxe — 4-kerroksinen Mylly", description: "Premium-mylly terävillä timanttihampailla. 4 kerrosta: jauhatus, keräys, siivilä ja kief-kammio. Magneettikansi.", price: 39.99, category: "Vaporisaattorit", imageUrl: "https://images.unsplash.com/photo-1603807008857-ad66b70431aa?w=600", available: true, inventoryCount: 67, tags: ["mylly","4-kerroksinen","premium","magneetti"] },
    { title: "HerbSaver UV — UV-suojattu Säilytyspurkki", description: "UV-suojattu lasipurkki ilmatiiviillä tiivisteellä ja sisäänrakennetulla kosteusmittarilla. Kolme kokoa.", price: 24.99, category: "Vaporisaattorit", imageUrl: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=600", available: true, inventoryCount: 89, tags: ["säilytys","uv-suoja","ilmatiivis","kosteusmittari"] },
    { title: "CleanKit Pro — Puhdistussetti Höyrystimille", description: "Täydellinen puhdistussetti: isopropyylialkoholipyyhkeitä, piippurasseja, puikkoja, pinsetit ja puhdistusharja.", price: 19.99, category: "Vaporisaattorit", imageUrl: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600", available: true, inventoryCount: 120, tags: ["puhdistus","setti","huolto","tarvikkeet"] },
    // Lasitaide & Säilytys
    { title: "Rainbow Bowl — Käsinpuhallettu Lasikulho", description: "Taiteilijan käsinpuhaltama lasikulho sateenkaaren väreissä. Jokainen kappale uniikki.", price: 59.99, category: "Lasitaide", imageUrl: "https://images.unsplash.com/photo-1576020798425-49a0ba4a0d7a?w=600", available: true, inventoryCount: 8, tags: ["lasitaide","käsintehty","uniikki","värikäs"] },
    { title: "Crystal Clear — Kristallinen Bongi", description: "Tyylikäs minimalistinen bongi borosilikaattilasista. Korkeus 30cm, irrotettava alaosa.", price: 79.99, category: "Lasitaide", imageUrl: "https://images.unsplash.com/photo-1559732277-314a03f52b4f?w=600", available: true, inventoryCount: 15, tags: ["bongi","kristalli","borosilikaatti","minimalistinen"] },
    { title: "StashBox Large — Lukollinen Säilytyslaatikko", description: "Tyylikäs bambuinen säilytyslaatikko numerolukolla. Sisältää lokerot yrteille ja tarvikkeille.", price: 44.99, category: "Lasitaide", imageUrl: "https://images.unsplash.com/photo-1602872030219-ad2b9a54315c?w=600", available: true, inventoryCount: 42, tags: ["säilytys","lukollinen","bambu","hajuton"] },
    { title: "PipeArt Collection — Koristeellinen Piippu", description: "Käsinveistetty puupiippu monimutkaisilla kaiverruksilla. Keräilykappale.", price: 34.99, category: "Lasitaide", imageUrl: "https://images.unsplash.com/photo-1494389360671-0d6b4c3e8e4e?w=600", available: false, inventoryCount: 0, tags: ["piippu","käsityö","puu","keräily"] },
    { title: "SmellProof Bag XL — Hajutiivis Laukku", description: "Aktiivihiilisuodattimella varustettu hajutiivis kantolaukku. Ulospäin näyttää tavalliselta toilettilaukulta.", price: 29.99, category: "Lasitaide", imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600", available: true, inventoryCount: 55, tags: ["hajuton","laukku","aktiivihiili","kantolaukku"] },
    // Hamppuvaatteet
    { title: "HamppuT-paita — Luomuhamppua", description: "100% luomuhamppua. Hengittävä, antibakteerinen ja kestävämpi kuin puuvilla.", price: 34.99, category: "Hamppuvaatteet", imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600", available: true, inventoryCount: 48, tags: ["hamppu","luomu","hengittävä","kestävä"] },
    { title: "HempHoodie — Hamppukollari", description: "Lämmin ja pehmeä hamppu-puuvillasekoitteinen huppari. Vahvistetut saumat, iso etutasku.", price: 69.99, category: "Hamppuvaatteet", imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600", available: true, inventoryCount: 27, tags: ["huppari","hamppu","lämmin","mukava"] },
    { title: "HempCap — Hamppulippis", description: "Tyylikäs hamppukankainen lippis säädettävällä hihnalla. Hengittävä ja kevyt.", price: 24.99, category: "Hamppuvaatteet", imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e36b?w=600", available: true, inventoryCount: 73, tags: ["lippis","hamppu","kevyt","tyylikäs"] },
    { title: "HempSocks 3-pack — Hamppusukat", description: "Kolmen parin setti hamppusukkia. Luonnollinen antibakteerisuus pitää jalat raikkaina.", price: 14.99, category: "Hamppuvaatteet", imageUrl: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600", available: true, inventoryCount: 110, tags: ["sukat","hamppu","setti","hengittävä"] },
    // Hyvinvointi & CBD
    { title: "CBD-öljy 10% — Full Spectrum", description: "Korkealaatuinen täyden spektrin CBD-öljy. 1000mg/10ml. Laboratoriotestattu, ei THC:tä.", price: 49.99, category: "Hyvinvointi", imageUrl: "https://images.unsplash.com/photo-1611070960566-2c62c30b36b4?w=600", available: true, inventoryCount: 38, tags: ["cbd","öljy","full-spectrum","lab-testattu"] },
    { title: "CBD Salve 500mg — Lihasvoide", description: "Viilentävä CBD-lihasvoide mentolilla ja arnikalla. Urheilun jälkeiseen palautumiseen.", price: 34.99, category: "Hyvinvointi", imageUrl: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600", available: true, inventoryCount: 52, tags: ["cbd","voide","lihas","urheilu"] },
    { title: "WellnessTea — Hampputee-sekoitus", description: "Rentouttava yrttitee: hamppua, kamomillaa, laventelia ja sitruunamelissaa. 20 pussia.", price: 9.99, category: "Hyvinvointi", imageUrl: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600", available: true, inventoryCount: 95, tags: ["tee","hamppu","rentoutus","yrtti"] },
    // Keittiö & Herkuttelu
    { title: "MunchBox Premium — Herkkuboksi", description: "Täydellinen herkkuboksi: käsintehtyä suklaata, pähkinöitä, kuivattuja hedelmiä ja keksejä.", price: 29.99, category: "Herkkuboksi", imageUrl: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=600", available: true, inventoryCount: 22, tags: ["herkut","suklaa","lahja","ilta"] },
    { title: "SnackMaster 2000 — Nachopelti", description: "Jättikokoinen nachopelti juustoineen, salsoineen ja guacamoleineen. Pakasteesta uuniin 15min.", price: 14.99, category: "Herkkuboksi", imageUrl: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600", available: false, inventoryCount: 0, tags: ["nachot","juusto","pikaruoka","uuni"] },
    { title: "Cookie Jar — Jättikeksi 25cm", description: "Yksi massiivinen 25cm suklaakeksi. Jaa kavereiden kesken — tai älä.", price: 19.99, category: "Herkkuboksi", imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600", available: true, inventoryCount: 16, tags: ["keksi","suklaa","jättikoko","jaettava"] },
  ]

  for (const product of products) {
    await prisma.product.create({ data: product })
    console.log(`  ✅ ${product.title}`)
  }

  console.log(`\nSeeded ${products.length} products.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
