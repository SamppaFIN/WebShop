"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getCurrentUser, signOut } from "@/lib/api/auth"
import { Button } from "@/components/ui/button"
import type { User } from "@/types"

export default function AccountPage() {
  const [user,setUser]=useState<User|null>(null)
  const [loading,setLoading]=useState(true)

  useEffect(()=>{getCurrentUser().then(setUser).finally(()=>setLoading(false))},[])

  const handleLogout = async () => { await signOut(); window.location.href = "/" }

  if(loading)return<div className="py-16 text-center"><p className="text-muted-foreground">Ladataan...</p></div>
  if(!user)return<div className="py-16 text-center"><p className="text-muted-foreground">Kirjaudu sisään</p><Link href="/login" className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground px-6 py-3 font-medium mt-4">Kirjaudu</Link></div>

  return(<div className="max-w-lg mx-auto py-16 px-4">
    <h1 className="text-3xl font-bold mb-8">Omat tiedot</h1>
    <div className="space-y-6">
      <div><label className="text-sm text-muted-foreground">Sähköposti</label><p className="text-lg">{user.email}</p></div>
      <div><label className="text-sm text-muted-foreground">Nimi</label><p className="text-lg">{user.fullName||"—"}</p></div>
      <div className="flex gap-4 pt-4">
        <Link href="/orders" className="inline-flex items-center justify-center rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">Tilaukset</Link>
        <Button variant="destructive" onClick={handleLogout}>Kirjaudu ulos</Button>
      </div>
    </div>
  </div>)
}
