"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { UserMenu } from "./user-menu"
import { useAuth } from "@/hooks/use-auth"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const { user } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/')
  
  const navLinkClass = (path: string) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer hover:bg-white/10 active:scale-95 ${
      isActive(path) ? "bg-white/15 text-foreground" : "text-muted-foreground hover:text-foreground"
    }`

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Nome sem logo */}
        <div className="flex flex-col">
          <span className="font-bold text-sm leading-tight hidden sm:block">Calculadora de Perfumes</span>
          <span className="font-bold text-sm leading-tight sm:hidden">Calc. de Perfumes</span>
          <span className="text-[10px] text-muted-foreground leading-tight">Profissional</span>
        </div>

        {/* Links de navegação — desktop */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/" className={navLinkClass("/")}>
            🧪 Calculadora
          </Link>
          {user && (
            <>
              <Link href="/dashboard" className={navLinkClass("/dashboard")}>
                📊 Dashboard
              </Link>
              <Link href="/dashboard/recipes" className={navLinkClass("/dashboard/recipes")}>
                📋 Receitas
              </Link>
              <Link href="/dashboard/macerations" className={navLinkClass("/dashboard/macerations")}>
                ⏱️ Macerações
              </Link>
            </>
          )}
        </nav>

        {/* Actions — always visible */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Alternar tema</span>
          </Button>

          {user ? (
            <UserMenu />
          ) : (
            <Button
              variant="default"
              size="sm"
              asChild
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
            >
              <Link href="/auth/login">Entrar</Link>
            </Button>
          )}

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background animate-in slide-in-from-top-2">
          <nav className="flex flex-col px-4 py-3 gap-1">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                isActive("/") && pathname === "/"
                  ? "bg-secondary text-secondary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              🧪 Calculadora
            </Link>
            
            {/* Conditional links - only show if logged in */}
            {user && (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                    pathname === "/dashboard"
                      ? "bg-secondary text-secondary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  📊 Dashboard
                </Link>
                <Link
                  href="/dashboard/recipes"
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                    pathname?.startsWith("/dashboard/recipes")
                      ? "bg-secondary text-secondary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  📋 Minhas Receitas
                </Link>
                <Link
                  href="/dashboard/macerations"
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                    pathname?.startsWith("/dashboard/macerations")
                      ? "bg-secondary text-secondary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  ⏱️ Macerações
                </Link>
                <Link
                  href="/dashboard/settings"
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                    pathname?.startsWith("/dashboard/settings")
                      ? "bg-secondary text-secondary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  ⚙️ Configurações
                </Link>
              </>
            )}
            
            {!user && (
              <Link
                href="/auth/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-medium"
              >
                🔐 Entrar
              </Link>
            )}
            
            <div className="border-t border-border my-2" />
            <a
              href="https://www.youtube.com/@ClubedosContratipos"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors"
            >
              🔗 Clube dos Contratipos (YouTube)
            </a>
          </nav>
        </div>
      )}
    </nav>
  )
}
