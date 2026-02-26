"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

interface MacerationTimelineProps {
  recipeId: string
  startDate: Date
  targetDays: number
}

interface LogEntry {
  id: string
  log_date: string
  action: string
  notes: string | null
  smell_rating: number | null
}

const ACTION_ICONS: Record<string, string> = {
  iniciou: "🧪",
  agitou: "🔄",
  testou: "👃",
  marcou_pronto: "✅",
}

const ACTION_LABELS: Record<string, string> = {
  iniciou: "Início da maceração",
  agitou: "Agitação registrada",
  testou: "Teste olfativo",
  marcou_pronto: "Marcado como pronto",
}

export function MacerationTimeline({ recipeId, startDate, targetDays }: MacerationTimelineProps) {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("maceration_logs")
          .select("*")
          .eq("recipe_id", recipeId)
          .order("log_date", { ascending: false })

        if (error) throw error

        setLogs(data || [])
      } catch (error) {
        console.error("Erro ao carregar histórico:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [recipeId])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

  const getDaysElapsed = () => {
    const now = new Date()
    const start = new Date(startDate)
    const diffTime = Math.abs(now.getTime() - start.getTime())
    return Math.floor(diffTime / (1000 * 60 * 60 * 24))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="border rounded-lg p-4 bg-muted/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">📋 Histórico de Maceração</h3>
      </div>

      <div className="space-y-4">
        {logs.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Nenhum registro ainda.
          </p>
        ) : (
          <>
            {logs.map((log, index) => (
              <div key={log.id} className="relative pl-6 pb-4 border-l-2 border-muted-foreground/30">
                {/* Ícone */}
                <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-muted-foreground/30 flex items-center justify-center text-lg">
                  {ACTION_ICONS[log.action] || "📝"}
                </div>

                {/* Conteúdo */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">
                      📅 {formatDate(log.log_date)}
                    </span>
                    <span className="text-muted-foreground">
                      {formatTime(log.log_date)}
                    </span>
                  </div>

                  <div className="font-medium">
                    {ACTION_LABELS[log.action] || log.action}
                  </div>

                  {log.smell_rating && (
                    <div className="text-sm">
                      {"⭐".repeat(log.smell_rating)} ({log.smell_rating}/5)
                    </div>
                  )}

                  {log.notes && (
                    <div className="text-sm text-muted-foreground italic mt-1 pl-2 border-l-2 border-muted-foreground/20">
                      "{log.notes}"
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Marcador "Hoje" */}
            <div className="relative pl-6">
              <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-purple-500 border-2 border-purple-600 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
              </div>
              <div className="font-semibold text-purple-600 dark:text-purple-400">
                ● Hoje — Dia {getDaysElapsed()} de {targetDays}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
