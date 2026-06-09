"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getMyOrders } from "@/lib/api/orders"
import { getCurrentUser } from "@/lib/api/auth"
import { Badge } from "@/components/ui/badge"
import type { Order, User } from "@/types"

const statusColors:Record<string,string>={pending:"bg-yellow-500/10 text-yellow-500 border-yellow-500/20",processing:"bg-blue-500/10 text-blue-500 border-blue-500/20",shipped:"bg-purple-500/10 text-purple-500 border-purple-500/20",delivered:"bg-green-500/10 text-green-500 border-green-500/20",cancelled:"bg-red-500/10 text-red-500 border-red-500/20"}

export default function OrdersPage() {
  const [user,setUser]=useState<User|null>(null)
  const [orders,setOrders]=useState<Order[]>([])
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    getCurrentUser().then(u=>{setUser(u);if(u)getMyOrders(u.id).then(setOrders).catch(()=>{})}).finally(()=>setLoading(false))
  },[])

  if(loading)return<div className="py-16 text-center"><p className="text-muted-foreground">Ladataan...</p></div>
  if(!user)return<div className="py-16 text-center"><p className="text-muted-foreground">Kirjaudu sisään nähdäksesi tilaukset</p><Link href="/login" className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground px-6 py-3 font-medium mt-4 hover:shadow-lg hover:shadow-accent/25 transition-shadow">Kirjaudu</Link></div>

  return(<div className="max-w-3xl mx-auto py-16 px-4"><h1 className="text-3xl font-bold mb-8">Omat tilaukset</h1>
    {orders.length===0?<div className="text-center py-20"><p className="text-xl text-muted-foreground mb-4">Ei tilauksia vielä</p><Link href="/products" className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground px-6 py-3 font-medium hover:shadow-lg hover:shadow-accent/25 transition-shadow">Selaa tuotteita</Link></div>:
    <div className="space-y-4">{orders.map(o=><div key={o.id} className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4"><span className="text-sm text-muted-foreground">#{o.id.slice(0,8)}</span><Badge variant="outline" className={statusColors[o.status]||""}>{o.status}</Badge></div>
      <p className="text-2xl font-bold mb-2">{new Intl.NumberFormat("fi-FI",{style:"currency",currency:"EUR"}).format(o.totalAmount)}</p>
      <p className="text-sm text-muted-foreground">{new Date(o.createdAt).toLocaleDateString("fi-FI")}</p>
    </div>)}</div>}
  </div>)
}
