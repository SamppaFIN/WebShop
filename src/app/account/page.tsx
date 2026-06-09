import { redirect } from "next/navigation"
import Link from "next/link"
import { getCurrentUser, signOut } from "@/lib/api/auth"
import { Button } from "@/components/ui/button"

export default async function AccountPage() {
  const user=await getCurrentUser()
  if(!user)redirect("/login")

  return(<div className="max-w-lg mx-auto py-16 px-4">
    <h1 className="text-3xl font-bold mb-8">Omat tiedot</h1>
    <div className="space-y-6">
      <div><label className="text-sm text-muted-foreground">Sähköposti</label><p className="text-lg">{user.email}</p></div>
      <div><label className="text-sm text-muted-foreground">Nimi</label><p className="text-lg">{user.fullName||"—"}</p></div>
      <div className="flex gap-4 pt-4">
        <Link href="/orders" className="inline-flex items-center justify-center rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">Tilaukset</Link>
        <form action={async()=>{"use server";await signOut();redirect("/")}}><Button variant="destructive">Kirjaudu ulos</Button></form>
      </div>
    </div>
  </div>)
}
