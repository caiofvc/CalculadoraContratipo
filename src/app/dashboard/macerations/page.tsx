"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/hooks/use-auth'

export default function MacerationsPage() {
  const { user } = useAuth()
  const [recipes, setRecipes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'macerando' | 'pronto' | 'all'>('macerando')

  useEffect(() => {
    if (!user) return

    const fetchRecipes = async () => {
      const supabase = createClient()
      let query = supabase
        .from('recipes')
        .select('*')
        .eq('user_id', user.id)
        .not('maceration_start_date', 'is', null)

      if (activeTab !== 'all') {
        query = query.eq('maceration_status', activeTab)
      }

      const { data, error } = await query.order('maceration_start_date', { ascending: false })

      if (!error && data) {
        setRecipes(data)
      }
      setLoading(false)
    }

    fetchRecipes()
  }, [user, activeTab])

  const calculateProgress = (startDate: string, targetDays: number) => {
    const start = new Date(startDate)
    const now = new Date()
    const elapsed = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    const progress = Math.min((elapsed / targetDays) * 100, 100)
    return { elapsed, progress }
  }

  const handleMarkReady = async (recipeId: string) => {
    const supabase = createClient()
    const updateData = { maceration_status: 'pronto' }
    await (supabase as any)
      .from('recipes')
      .update(updateData)
      .eq('id', recipeId)

    setRecipes(recipes.map(r => r.id === recipeId ? { ...r, maceration_status: 'pronto' } : r))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Carregando macerações...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">⏱️ Minhas Macerações</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab('macerando')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'macerando'
                ? 'border-b-2 border-purple-500 text-purple-400'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            🟡 Macerando ({recipes.filter(r => r.maceration_status === 'macerando').length})
          </button>
          <button
            onClick={() => setActiveTab('pronto')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'pronto'
                ? 'border-b-2 border-purple-500 text-purple-400'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            🟢 Prontas ({recipes.filter(r => r.maceration_status === 'pronto').length})
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'all'
                ? 'border-b-2 border-purple-500 text-purple-400'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            📦 Todas ({recipes.length})
          </button>
        </div>

        {/* Recipes List */}
        {recipes.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">
                {activeTab === 'macerando' && 'Nenhuma maceração em andamento'}
                {activeTab === 'pronto' && 'Nenhuma receita pronta'}
                {activeTab === 'all' && 'Nenhuma maceração registrada'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {recipes.map((recipe) => {
              const { elapsed, progress } = calculateProgress(
                recipe.maceration_start_date,
                recipe.maceration_target_days || 30
              )
              const targetDays = recipe.maceration_target_days || 30
              const startDate = new Date(recipe.maceration_start_date).toLocaleDateString('pt-BR')
              const targetDate = new Date(
                new Date(recipe.maceration_start_date).getTime() + targetDays * 24 * 60 * 60 * 1000
              ).toLocaleDateString('pt-BR')

              return (
                <Card key={recipe.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">🧪 {recipe.name}</h3>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>{recipe.concentration_type} · {recipe.total_volume}ml</p>
                            <p>📅 Início: {startDate}</p>
                            <p>🎯 Meta: {targetDays} dias ({targetDate})</p>
                          </div>
                        </div>
                        <div>
                          {recipe.maceration_status === 'macerando' ? (
                            <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300">
                              🟡 Macerando
                            </span>
                          ) : (
                            <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300">
                              🟢 Pronto
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="font-medium">📆 Dia {elapsed} de {targetDays}</span>
                          <span className="text-muted-foreground">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      {/* Quick Actions */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/recipes/${recipe.id}`}>📋 Ver receita completa</Link>
                        </Button>
                        {recipe.maceration_status === 'macerando' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMarkReady(recipe.id)}
                            className="text-green-400 hover:text-green-300 hover:border-green-500/50"
                          >
                            ✅ Marcar pronto
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
