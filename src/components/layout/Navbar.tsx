"use client"

import Link from "next/link"
import { ShoppingCart, Moon, Sun, Menu, User as UserIcon, LogOut, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCartStore, totalItems } from "@/store/cartStore"
import { useUIStore } from "@/store/uiStore"
import { useThemeStore } from "@/store/themeStore"
import { signOut, getCurrentUser } from "@/lib/api/auth"
import { useEffect, useState } from "react"
import type { User } from "@/types"

export function Navbar() {
  const items = useCartStore((s) => s.items)
  const openCart = useUIStore((s) => s.openCart)
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    getCurrentUser().then(setUser)
  }, [])

  const handleLogout = async () => {
    await signOut()
    setUser(null)
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold tracking-tight">
            🧠 WebShop
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/" className="text-sm font-medium hover:text-primary">Etusivu</Link>
            <Link href="/products" className="text-sm font-medium hover:text-primary">Tuotteet</Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          <Button variant="ghost" size="icon" className="relative" onClick={openCart}>
            <ShoppingCart className="h-5 w-5" />
            {totalItems(items) > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {totalItems(items)}
              </Badge>
            )}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src={user.avatarUrl ?? undefined} />
                  <AvatarFallback>{user.fullName?.[0] ?? user.email[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem><Link href="/account" className="flex items-center"><UserIcon className="mr-2 h-4 w-4" />Omat tiedot</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href="/orders" className="flex items-center"><Package className="mr-2 h-4 w-4" />Tilaukset</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}><LogOut className="mr-2 h-4 w-4" />Kirjaudu ulos</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm">
              <Link href="/login">Kirjaudu</Link>
            </Button>
          )}

          <Sheet>
            <SheetTrigger className="md:hidden p-2 rounded-full hover:bg-muted transition-colors">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-card/95 backdrop-blur-xl border-r border-border">
              <SheetHeader><SheetTitle>Valikko</SheetTitle></SheetHeader>
              <nav className="flex flex-col gap-3 mt-6">
                <Link href="/" className="text-lg font-medium hover:text-accent transition-colors">Etusivu</Link>
                <Link href="/products" className="text-lg font-medium hover:text-accent transition-colors">Tuotteet</Link>
                <div className="border-t border-border pt-3 mt-2">
                  <Button variant="ghost" onClick={toggleTheme} className="justify-start px-0 w-full">
                    {theme === "light" ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
                    {theme === "light" ? "Tumma tila" : "Vaalea tila"}
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
