"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User, Settings, LogOut, LayoutDashboard, BookOpen, Clock, Package } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

export function UserMenu() {
  const router = useRouter()
  const { user, profile, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  if (!user) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
        onClick={() => router.push('/auth/login')}
      >
        <User className="h-5 w-5" />
        <span className="sr-only">Fazer login</span>
      </Button>
    )
  }

  const displayName = profile?.nickname || profile?.full_name || user.email?.split('@')[0] || 'Usuário'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
        >
          <User className="h-5 w-5" />
          <span className="sr-only">Menu do usuário</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-2 border-b border-border">
          <p className="font-semibold text-sm">{displayName}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/recipes">
            <BookOpen className="mr-2 h-4 w-4" />
            Minhas Receitas
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/macerations">
            <Clock className="mr-2 h-4 w-4" />
            Macerações
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Package className="mr-2 h-4 w-4" />
          Meu Estoque
          <span className="ml-auto text-xs text-muted-foreground">Em breve</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
