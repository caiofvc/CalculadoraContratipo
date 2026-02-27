"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '@/hooks/use-auth'

export default function RecipesPage() {
  const { user } = useAuth()
  const [recipes, setRecipes] = useState<any[]>([])
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  useEffect(() => {
    if (!user) return

    const fetchRecipes = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setRecipes(data)
        setFilteredRecipes(data)
      }
      setLoading(false)
    }

    fetchRecipes()
  }, [user])

  useEffect(() => {
    let filtered = [...recipes]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(r => r.concentration_type === typeFilter)
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(r => r.maceration_status === statusFilter)
    }

    // Sort
    if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    }

    setFilteredRecipes(filtered)
  }, [recipes, searchTerm, typeFilter, statusFilter, sortBy])

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta receita?')) return

    const supabase = createClient()
    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id)

    if (!error) {
      setRecipes(recipes.filter(r => r.id !== id))
    }
  }

  const getStatusBadge = (status: string | null) => {
    if (status === 'macerando') return <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300">🟡 Macerando</span>
    if (status === 'pronto') return <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300">🟢 Pronto</span>
    return <span className="text-xs px-2 py-1 rounded-full bg-gray-500/20 text-gray-300">📦 Arquivado</span>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Carregando receitas...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">📋 Minhas Receitas</h1>
          <Button asChild className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
            <Link href="/">+ Nova receita</Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="EDC">EDC</SelectItem>
                <SelectItem value="EDT">EDT</SelectItem>
                <SelectItem value="EDP">EDP</SelectItem>
                <SelectItem value="Parfum">Parfum</SelectItem>
                <SelectItem value="Extrait">Extrait</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="macerando">Macerando</SelectItem>
                <SelectItem value="pronto">Pronto</SelectItem>
                <SelectItem value="arquivado">Arquivado</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Mais recentes</SelectItem>
                <SelectItem value="oldest">Mais antigas</SelectItem>
                <SelectItem value="name">Nome A-Z</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="🔍 Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Recipes List */}
        {filteredRecipes.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">Nenhuma receita encontrada</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredRecipes.map((recipe) => (
              <Card key={recipe.id} className="hover:border-purple-500/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{recipe.name}</h3>
                        {getStatusBadge(recipe.maceration_status)}
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>
                          {recipe.concentration_type} · {recipe.total_volume}ml · {new Date(recipe.created_at).toLocaleDateString('pt-BR')}
                        </p>
                        {recipe.rating && (
                          <p className="text-yellow-500">
                            {'⭐'.repeat(recipe.rating)} {recipe.rating}/5
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/recipes/${recipe.id}`}>Ver</Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(recipe.id)}
                        className="text-red-400 hover:text-red-300 hover:border-red-500/50"
                      >
                        Excluir
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
