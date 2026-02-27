"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/hooks/use-auth'

export default function RecipeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [recipe, setRecipe] = useState<any>(null)
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState('')
  const [rating, setRating] = useState(0)
  const [savingNotes, setSavingNotes] = useState(false)

  useEffect(() => {
    if (!user || !params.id) return

    const fetchRecipe = async () => {
      const supabase = createClient()
      
      const { data: recipeData, error } = await (supabase as any)
        .from('recipes')
        .select('*')
        .eq('id', params.id as string)
        .eq('user_id', user.id)
        .single()

      if (error || !recipeData) {
        router.push('/dashboard/recipes')
        return
      }

      setRecipe(recipeData)
      setNotes(recipeData.notes || '')
      setRating(recipeData.rating || 0)

      // Fetch maceration logs if exists
      if (recipeData.maceration_start_date) {
        const { data: logsData } = await (supabase as any)
          .from('maceration_logs')
          .select('*')
          .eq('recipe_id', params.id as string)
          .order('log_date', { ascending: false })

        if (logsData) {
          setLogs(logsData)
        }
      }

      setLoading(false)
    }

    fetchRecipe()
  }, [user, params.id, router])

  const handleSaveNotes = async () => {
    if (!recipe) return

    setSavingNotes(true)
    const supabase = createClient()
    
    await (supabase as any)
      .from('recipes')
      .update({ notes, rating })
      .eq('id', recipe.id)

    setSavingNotes(false)
  }

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir esta receita?')) return

    const supabase = createClient()
    await supabase.from('recipes').delete().eq('id', recipe.id)
    router.push('/dashboard/recipes')
  }

  const calculateProgress = (startDate: string, targetDays: number) => {
    const start = new Date(startDate)
    const now = new Date()
    const elapsed = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    const progress = Math.min((elapsed / targetDays) * 100, 100)
    return { elapsed, progress }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Carregando receita...</p>
      </div>
    )
  }

  if (!recipe) return null

  const ingredients = recipe.ingredients ? JSON.parse(recipe.ingredients) : []
  const { elapsed, progress } = recipe.maceration_start_date 
    ? calculateProgress(recipe.maceration_start_date, recipe.maceration_target_days || 30)
    : { elapsed: 0, progress: 0 }

  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/dashboard/recipes" className="text-purple-400 hover:text-purple-300 text-sm mb-2 inline-block">
            ← Voltar para receitas
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{recipe.name}</h1>
              <p className="text-muted-foreground">
                {recipe.concentration_type} · {recipe.total_volume}ml · Criado em {new Date(recipe.created_at).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleDelete} className="text-red-400 hover:text-red-300">
                Excluir
              </Button>
            </div>
          </div>
        </div>

        {/* Maceration Status */}
        {recipe.maceration_start_date && recipe.maceration_status === 'macerando' && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Status da Maceração</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300">
                  🟡 Macerando
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Dia {elapsed} de {recipe.maceration_target_days || 30}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Iniciado em {new Date(recipe.maceration_start_date).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ingredients Table */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Ingredientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Ingrediente</th>
                    <th className="text-right py-2 px-4">Porcentagem</th>
                    <th className="text-right py-2 px-4">Volume (ml)</th>
                    <th className="text-right py-2 px-4">Gotas</th>
                  </tr>
                </thead>
                <tbody>
                  {ingredients.map((ing: any, idx: number) => (
                    <tr key={idx} className="border-b">
                      <td className="py-2 px-4">{ing.name}</td>
                      <td className="text-right py-2 px-4">{ing.percentage}%</td>
                      <td className="text-right py-2 px-4">{ing.volume?.toFixed(2)}</td>
                      <td className="text-right py-2 px-4">{ing.drops || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Maceration Actions */}
        {recipe.maceration_start_date && recipe.maceration_status === 'macerando' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Ações de Maceração</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Use a página de receita completa para registrar testes e ações de maceração.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/macerations">Ver todas as macerações</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Timeline */}
        {logs.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Timeline de Maceração</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {logs.map((log) => (
                  <div key={log.id} className="border-l-2 border-purple-500 pl-4 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{log.action}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(log.log_date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    {log.smell_rating && (
                      <p className="text-sm text-yellow-500 mb-1">
                        {'⭐'.repeat(log.smell_rating)}
                      </p>
                    )}
                    {log.notes && (
                      <p className="text-sm text-muted-foreground">{log.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notes and Rating */}
        <Card>
          <CardHeader>
            <CardTitle>Notas Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="text-2xl hover:scale-110 transition-transform"
                  >
                    {star <= rating ? '⭐' : '☆'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Observações</label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Adicione suas observações sobre esta receita..."
                rows={6}
              />
            </div>
            <Button 
              onClick={handleSaveNotes}
              disabled={savingNotes}
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
            >
              {savingNotes ? 'Salvando...' : 'Salvar alterações'}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
