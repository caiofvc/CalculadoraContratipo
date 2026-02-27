"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Search, Plus, Trash2, Copy, Eye } from "lucide-react"

interface Recipe {
  id: string
  name: string
  concentration_type: string
  total_volume: number
  calculation_mode: string
  maceration_status: string | null
  maceration_start_date: string | null
  maceration_target_days: number | null
  created_at: string
  notes: string | null
}

export default function RecipesPage() {
  const supabase = createClient()
  const router = useRouter()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("todos")
  const [filterType, setFilterType] = useState("todos")

  useEffect(() => {
    loadRecipes()
  }, [])

  async function loadRecipes() {
    try {
      setLoading(true)
      setError(null)
      const { data, error: queryError } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false })

      if (queryError) {
        console.error("Erro ao carregar receitas:", queryError)
        setError(queryError.message)
        setRecipes([])
      } else {
        setRecipes(data || [])
      }
    } catch (err) {
      console.error("Erro inesperado:", err)
      setError("Erro ao carregar receitas")
      setRecipes([])
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Tem certeza que deseja excluir "${name || 'Sem nome'}"? Esta ação não pode ser desfeita.`)) return
    const { error } = await supabase.from("recipes").delete().eq("id", id)
    if (!error) {
      setRecipes(recipes.filter(r => r.id !== id))
    }
  }

  async function handleDuplicate(recipe: Recipe) {
    const { data, error } = await (supabase as any)
      .from("recipes")
      .insert({
        name: `${recipe.name || "Sem nome"} (cópia)`,
        concentration_type: recipe.concentration_type,
        total_volume: recipe.total_volume,
        calculation_mode: recipe.calculation_mode,
        notes: recipe.notes,
      })
      .select()
      .single()

    if (!error && data) {
      loadRecipes()
    }
  }

  // Filtros client-side
  const filtered = recipes.filter(r => {
    const matchSearch = !search || (r.name || "").toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "todos" || r.maceration_status === filterStatus
    const matchType = filterType === "todos" || r.concentration_type === filterType
    return matchSearch && matchStatus && matchType
  })

  function getStatusBadge(status: string | null) {
    switch (status) {
      case "macerando": return { label: "Macerando", color: "bg-yellow-500/20 text-yellow-400" }
      case "pronto": return { label: "Pronto", color: "bg-green-500/20 text-green-400" }
      case "arquivado": return { label: "Arquivado", color: "bg-gray-500/20 text-gray-400" }
      default: return { label: "Rascunho", color: "bg-purple-500/20 text-purple-400" }
    }
  }

  function getMacerationProgress(recipe: Recipe) {
    if (!recipe.maceration_start_date || !recipe.maceration_target_days) return null
    const start = new Date(recipe.maceration_start_date)
    const now = new Date()
    const days = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    const pct = Math.min((days / recipe.maceration_target_days) * 100, 100)
    return { days, target: recipe.maceration_target_days, pct }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">📋 Minhas Receitas</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {recipes.length} receita{recipes.length !== 1 ? "s" : ""} salva{recipes.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-all active:scale-95">
          <Plus size={16} /> Nova Receita
        </Link>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm cursor-pointer"
        >
          <option value="todos">Status: Todos</option>
          <option value="macerando">🟡 Macerando</option>
          <option value="pronto">🟢 Pronto</option>
          <option value="arquivado">📦 Arquivado</option>
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm cursor-pointer"
        >
          <option value="todos">Tipo: Todos</option>
          <option value="edc">EDC</option>
          <option value="edt">EDT</option>
          <option value="edp">EDP</option>
          <option value="parfum">Parfum</option>
          <option value="extrait">Extrait</option>
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-20 text-muted-foreground">
          <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4" />
          Carregando receitas...
        </div>
      )}

      {/* Erro */}
      {error && !loading && (
        <div className="text-center py-20">
          <p className="text-red-400 mb-2">❌ Erro ao carregar receitas</p>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <button onClick={loadRecipes}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm transition-all">
            Tentar novamente
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20 rounded-xl border border-white/10 bg-white/5">
          <div className="text-5xl mb-4">🧪</div>
          <h3 className="text-lg font-semibold mb-2">
            {recipes.length === 0 ? "Nenhuma receita ainda" : "Nenhuma receita encontrada"}
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            {recipes.length === 0
              ? "Crie sua primeira fórmula na calculadora e salve para acompanhar!"
              : "Tente ajustar os filtros de busca."}
          </p>
          {recipes.length === 0 && (
            <Link href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium transition-all">
              Ir para a Calculadora →
            </Link>
          )}
        </div>
      )}

      {/* Lista de receitas */}
      {!loading && !error && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((recipe) => {
            const badge = getStatusBadge(recipe.maceration_status)
            const progress = getMacerationProgress(recipe)
            return (
              <div key={recipe.id}
                className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/[0.07] transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold truncate">{recipe.name || "Sem nome"}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span>{(recipe.concentration_type || "").toUpperCase()}</span>
                      <span>{recipe.total_volume}ml</span>
                      <span>{new Date(recipe.created_at).toLocaleDateString("pt-BR")}</span>
                    </div>

                    {/* Barra de maceração */}
                    {progress && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>Dia {progress.days} de {progress.target}</span>
                          <span>{Math.round(progress.pct)}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              progress.pct >= 100 ? "bg-green-500" :
                              progress.pct >= 50 ? "bg-orange-400" : "bg-yellow-400"
                            }`}
                            style={{ width: `${Math.min(progress.pct, 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Ações */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Link href={`/dashboard/recipes/${recipe.id}`}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors" title="Ver detalhes">
                      <Eye size={16} />
                    </Link>
                    <button onClick={() => handleDuplicate(recipe)}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors" title="Duplicar">
                      <Copy size={16} />
                    </button>
                    <button onClick={() => handleDelete(recipe.id, recipe.name)}
                      className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors" title="Excluir">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
