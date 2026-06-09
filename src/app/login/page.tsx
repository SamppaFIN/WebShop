"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn, signUp } from "@/lib/api/auth"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [password2, setPassword2] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await signIn(email, password)
      router.push("/")
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Kirjautuminen epäonnistui")
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (password !== password2) return setError("Salasanat eivät täsmää")
    if (password.length < 8) return setError("Salasanan tulee olla vähintään 8 merkkiä")
    setLoading(true)
    try {
      await signUp(email, password, name)
      router.push("/")
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Rekisteröityminen epäonnistui")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Tervetuloa</h1>
        <Tabs defaultValue="login">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="login" className="flex-1">Kirjaudu</TabsTrigger>
            <TabsTrigger value="signup" className="flex-1">Luo tili</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <Input type="email" placeholder="Sähköposti" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input type="password" placeholder="Salasana" value={password} onChange={(e) => setPassword(e.target.value)} required />
              {error !== "" && <p className="text-destructive text-sm">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Kirjaudutaan…" : "Kirjaudu sisään"}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4">
              <Input type="text" placeholder="Koko nimi" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input type="email" placeholder="Sähköposti" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input type="password" placeholder="Salasana (väh. 8 merkkiä)" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <Input type="password" placeholder="Vahvista salasana" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
              {error !== "" && <p className="text-destructive text-sm">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Luodaan tiliä…" : "Luo tili"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link href="/" className="hover:text-foreground">← Takaisin etusivulle</Link>
        </p>
      </div>
    </div>
  )
}
