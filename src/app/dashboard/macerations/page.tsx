"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Clock, CheckCircle, RotateCcw, Eye } from "lucide-react"

interface Recipe {
  id: string
  name: string
  concentration_type: string
  total_volume: number
  maceration_status: string
  maceration_start_date: string
  maceration_target_days: number
  created_at: string
  notes: string | null
}

interface MacerationLog {
  id: string
  recipe_id: string
  action: string
  smell_rating: number | null
  notes: string | null
  created_at: string
}

export default function MacerationsPage() {
  const supabase = createClient()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [logs, setLogs] = useState<Record<string, MacerationLog[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("macerando")

  useEffect(() => {
    loadMacerations()
  }, [])

  async function loadMacerations() {
    try {
      setLoading(true)
      setError(null)

      const { data, error: queryError } = await supabase
        .from("recipes")
        .select("*")
        .not("maceration_start_date", "is", null)
        .order("maceration_start_date", { ascending: false })

      if (queryError) {
        setError(queryError.message)
        setRecipes([])
      } else {
        setRecipes(data || [])

        if (data && data.length > 0) {
          const ids = data.map((r: any) => r.id)
          const { data: allLogs } = await (supabase as any)
            .from("maceration_logs")
            .select("*")
            .in("recipe_id", ids)
            .order("created_at", { ascending: false })

          if (allLogs) {
            const grouped: Record<string, MacerationLog[]> = {}
            allLogs.forEach((log: MacerationLog) => {
              if (!grouped[log.recipe_id]) grouped[log.recipe_id] = []
              grouped[log.recipe_id].push(log)
            })
            setLogs(grouped)
          }
        }
      }
    } catch {
      setError("Erro ao carregar macerações")
      setRecipes([])
    } finally {
      setLoading(false)
    }
  }

  async function handleShake(recipeId: string) {
    await (supabase as any).from("maceration_logs").insert({
      recipe_id: recipeId,
      action: "agitou",
    })
    const newLog: MacerationLog = {
      id: crypto.randomUUID(),
      recipe_id: recipeId,
      action: "agitou",
      smell_rating: null,
      notes: null,
      created_at: new Date().toISOString(),
    }
    setLogs(prev => ({
      ...prev,
      [recipeId]: [newLog, ...(prev[recipeId] || [])],
    }))
    alert("✅ Agitação registrada!")
  }

  async function handleMarkReady(recipeId: string) {
    if (!confirm("Deseja marcar este perfume como pronto?")) return
    await (supabase as any).from("recipes").update({ maceration_status: "pronto" }).eq("id", recipeId)
    await (supabase as any).from("maceration_logs").insert({ recipe_id: recipeId, action: "pronto" })
    setRecipes(prev => prev.map(r => r.id === recipeId ? { ...r, maceration_status: "pronto" } : r))
  }

  function getProgress(recipe: Recipe) {
    const start = new Date(recipe.maceration_start_date)
    const now = new Date()
    const days = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    const target = recipe.maceration_target_days || 30
    const pct = Math.min((days / target) * 100, 100)
    const endDate = new Date(start)
    endDate.setDate(endDate.getDate() + target)
    return { days, target, pct, endDate }
  }

  function getLastAction(recipeId: string): string {
    const recipeLogs = logs[recipeId]
    if (!recipeLogs || recipeLogs.length === 0) return ""
    const last = recipeLogs[0]
    const date = new Date(last.created_at).toLocaleDateString("pt-BR")
    const actionMap: Record<string, string> = {
      agitou: "🔄 Agitação",
      testou: "👃 Teste",
      pronto: "✅ Pronto",
      inicio: "🧪 Início",
    }
    return `${actionMap[last.action] || last.action} em ${date}`
  }

  function getDica(days: number, target: number) {
    if (days >= target) return "🎉 Meta atingida! Maturação extra refina a fragrância."
    if (days >= target * 0.5) return "Quase lá! Teste em papel mata-borrão."
    if (days >= 8) return "Agite 1x a cada 3 dias. A fragrância está evoluindo."
    return "Agite suavemente o frasco 1x por dia nesta fase."
  }

  const counts = {
    macerando: recipes.filter(r => r.maceration_status === "macerando").length,
    pronto: recipes.filter(r => r.maceration_status === "pronto").length,
    todos: recipes.length,
  }

  const filtered = activeTab === "todos"
    ? recipes
    : recipes.filter(r => r.maceration_status === activeTab)

  const tabs = [
    { id: "macerando", label: "🟡 Macerando", count: counts.macerando },
    { id: "pronto", label: "🟢 Prontas", count: counts.pronto },
    { id: "todos", label: "📦 Todas", count: counts.todos },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">⏱️ Minhas Macerações</h1>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer
              ${activeTab === tab.id
                ? "bg-purple-600 text-white"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-20 text-muted-foreground">
          <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4" />
          Carregando macerações...
        </div>
      )}

      {/* Erro */}
      {error && !loading && (
        <div className="text-center py-20">
          <p className="text-red-400 mb-2">❌ Erro ao carregar</p>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <button onClick={loadMacerations}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm">
            Tentar novamente
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20 rounded-xl border border-white/10 bg-white/5">
          <div className="text-5xl mb-4">⏱️</div>
          <h3 className="text-lg font-semibold mb-2">Nenhuma maceração {activeTab !== "todos" ? "neste status" : "ainda"}</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Calcule uma fórmula e clique em "Iniciar Maceração" nos resultados.
          </p>
          <Link href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium transition-all">
            Ir para a Calculadora →
          </Link>
        </div>
      )}

      {/* Cards */}
      {!loading && !error && filtered.length > 0 && (
        <div className="space-y-4">
          {filtered.map(recipe => {
            const progress = getProgress(recipe)
            const lastAction = getLastAction(recipe.id)
            const dica = getDica(progress.days, progress.target)
            const isReady = recipe.maceration_status === "pronto"

            return (
              <div key={recipe.id}
                className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-4">

                {/* Header do card */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{recipe.name || "Sem nome"}</h3>
                    <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                      <span>{(recipe.concentration_type || "").toUpperCase()}</span>
                      <span>{recipe.total_volume}ml</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isReady ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {isReady ? "✅ Pronto" : "🟡 Macerando"}
                  </span>
                </div>

                {/* Info de datas */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">📅 Início</p>
                    <p>{new Date(recipe.maceration_start_date).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">🎯 Meta</p>
                    <p>{progress.target} dias ({progress.endDate.toLocaleDateString("pt-BR")})</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">📆 Progresso</p>
                    <p>Dia {progress.days} de {progress.target}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">🕐 Última ação</p>
                    <p className="text-xs">{lastAction || "Nenhuma"}</p>
                  </div>
                </div>

                {/* Barra de progresso */}
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{Math.round(progress.pct)}%</span>
                    <span>{progress.days >= progress.target ? "Meta atingida! 🎉" : `Faltam ${progress.target - progress.days} dias`}</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        progress.pct >= 100 ? "bg-green-500" :
                        progress.pct >= 50 ? "bg-orange-400" : "bg-yellow-400"
                      }`}
                      style={{ width: `${Math.min(progress.pct, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Dica */}
                <p className="text-xs text-muted-foreground bg-white/5 rounded-lg px-3 py-2">
                  💡 {dica}
                </p>

                {/* Botões de ação */}
                <div className="flex flex-wrap gap-2">
                  {!isReady && (
                    <>
                      <button onClick={() => handleShake(recipe.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-all active:scale-95 cursor-pointer">
                        <RotateCcw size={14} /> Agitar
                      </button>
                      <button
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-all active:scale-95 cursor-pointer">
                        👃 Testar
                      </button>
                      <button onClick={() => handleMarkReady(recipe.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-600/20 hover:bg-green-600/30 text-green-400 text-sm transition-all active:scale-95 cursor-pointer">
                        <CheckCircle size={14} /> Marcar Pronto
                      </button>
                    </>
                  )}
                  <Link href={`/dashboard/recipes/${recipe.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 text-sm transition-all active:scale-95">
                    <Eye size={14} /> Ver Receita
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
