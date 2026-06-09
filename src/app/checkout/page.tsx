"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCartStore } from "@/store/cartStore"
import { getProductById } from "@/lib/api/products"
import type { Product } from "@/types"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCartStore()
  const [products,setProducts]=useState<Product[]>([])
  const [name,setName]=useState("");const [addr1,setAddr1]=useState("");const [city,setCity]=useState("");const [zip,setZip]=useState("");const [country,setCountry]=useState("FI");const [step,setStep]=useState(1);const [loading,setLoading]=useState(true)

  useEffect(()=>{if(items.length===0){router.push("/products");return}
    Promise.all(items.map(i=>getProductById(i.productId))).then(r=>setProducts(r.filter(Boolean)as Product[])).finally(()=>setLoading(false))
  },[items,router])

  const total=items.reduce((s,i)=>{const p=products.find(x=>x.id===i.productId);return s+(p?.price??0)*i.quantity},0)
  const address={fullName:name,addressLine1:addr1,city,postalCode:zip,country}

  const handleOrder=async()=>{setLoading(true)
    try{const res=await fetch("/api/checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items,address})})
      const data=await res.json()
      if(data.url)window.location.href=data.url
    }catch(e){alert("Maksun aloitus epäonnistui")}finally{setLoading(false)}}

  if(loading)return<div className="min-h-[70vh] flex items-center justify-center"><p className="text-muted-foreground">Ladataan…</p></div>
  if(step===1)return(<div className="max-w-lg mx-auto py-16 px-4"><h1 className="text-3xl font-bold mb-8">Toimitusosoite</h1><div className="space-y-4"><Input placeholder="Koko nimi" value={name} onChange={e=>setName(e.target.value)}/><Input placeholder="Osoite" value={addr1} onChange={e=>setAddr1(e.target.value)}/><div className="grid grid-cols-2 gap-4"><Input placeholder="Postinumero" value={zip} onChange={e=>setZip(e.target.value)}/><Input placeholder="Kaupunki" value={city} onChange={e=>setCity(e.target.value)}/></div><Input placeholder="Maa" value={country} onChange={e=>setCountry(e.target.value)}/><Button className="w-full" disabled={!name||!addr1||!city||!zip} onClick={()=>setStep(2)}>Jatka</Button></div></div>)

  return(<div className="max-w-lg mx-auto py-16 px-4"><h1 className="text-3xl font-bold mb-8">Vahvista tilaus</h1>
    <div className="space-y-4 mb-6">{items.map(i=>{const p=products.find(x=>x.id===i.productId);return p?<div key={i.productId} className="flex justify-between"><span>{p.title} ×{i.quantity}</span><span>{new Intl.NumberFormat("fi-FI",{style:"currency",currency:"EUR"}).format(p.price*i.quantity)}</span></div>:null})}
      <hr className="border-border"/><div className="flex justify-between font-bold text-lg"><span>Yhteensä</span><span>{new Intl.NumberFormat("fi-FI",{style:"currency",currency:"EUR"}).format(total)}</span></div></div>
    <p className="text-sm text-muted-foreground mb-4">Toimitus: {name}, {addr1}, {zip} {city}, {country}</p>
    <Button className="w-full" size="lg" onClick={handleOrder} disabled={loading}>{loading?"Käsitellään…":"Siirry maksamaan →"}</Button>
    <Button variant="ghost" className="w-full mt-2" onClick={()=>setStep(1)}>← Muokkaa osoitetta</Button>
  </div>)
}
