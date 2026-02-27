import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Get profile
  const { data: profile } = await (supabase as any)
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Get recipe counts
  const { count: totalRecipes } = await (supabase as any)
    .from('recipes')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  const { count: macerandoCount } = await (supabase as any)
    .from('recipes')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('maceration_status', 'macerando')

  const { count: prontasCount } = await (supabase as any)
    .from('recipes')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('maceration_status', 'pronto')

  // Get active macerations
  const { data: activeMacerations } = await (supabase as any)
    .from('recipes')
    .select('*')
    .eq('user_id', user.id)
    .eq('maceration_status', 'macerando')
    .order('maceration_start_date', { ascending: false })
    .limit(5)

  // Get recent recipes
  const { data: recentRecipes } = await (supabase as any)
    .from('recipes')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(6)

  const displayName = profile?.nickname || profile?.full_name || user.email?.split('@')[0] || 'Usuário'

  const calculateProgress = (startDate: string, targetDays: number) => {
    const start = new Date(startDate)
    const now = new Date()
    const elapsed = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    const progress = Math.min((elapsed / targetDays) * 100, 100)
    return { elapsed, progress }
  }

  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Olá, {displayName}! 👋</h1>
          <p className="text-muted-foreground">Bem-vindo ao seu painel de controle</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                🧪 Receitas Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalRecipes || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                ⏱️ Macerando
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{macerandoCount || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                ✅ Prontas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{prontasCount || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Macerations */}
        {activeMacerations && activeMacerations.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">⏱️ Macerações em Andamento</h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/macerations">Ver todas</Link>
              </Button>
            </div>

            <div className="space-y-4">
              {activeMacerations.map((recipe: any) => {
                const { elapsed, progress } = calculateProgress(
                  recipe.maceration_start_date!,
                  recipe.maceration_target_days || 30
                )
                const targetDays = recipe.maceration_target_days || 30
                const startDate = new Date(recipe.maceration_start_date!).toLocaleDateString('pt-BR')

                return (
                  <Card key={recipe.id}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{recipe.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {recipe.concentration_type} · Iniciado em {startDate}
                          </p>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-medium">
                              Dia {elapsed} de {targetDays}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300">
                              🟡 Macerando
                            </span>
                          </div>
                          <Progress value={progress} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">{Math.round(progress)}%</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/recipes/${recipe.id}`}>Ver detalhes</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Recent Recipes */}
        {recentRecipes && recentRecipes.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">📋 Receitas Recentes</h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/recipes">Ver todas</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentRecipes.map((recipe: any) => (
                <Card key={recipe.id} className="hover:border-purple-500/50 transition-colors cursor-pointer">
                  <Link href={`/dashboard/recipes/${recipe.id}`}>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2 truncate">{recipe.name}</h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>{recipe.concentration_type}</p>
                        <p>{recipe.total_volume}ml</p>
                        <p>{new Date(recipe.created_at).toLocaleDateString('pt-BR')}</p>
                        {recipe.rating && (
                          <p className="text-yellow-500">
                            {'⭐'.repeat(recipe.rating)}{' '}
                            {recipe.rating}/5
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">🧪</div>
              <h3 className="text-xl font-semibold mb-2">Nenhuma receita ainda</h3>
              <p className="text-muted-foreground mb-6">
                Crie sua primeira fórmula na calculadora e salve para acompanhar a maceração!
              </p>
              <Button asChild className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
                <Link href="/">Ir para a Calculadora →</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
