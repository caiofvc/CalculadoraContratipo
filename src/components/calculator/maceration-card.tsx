"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Droplet, CheckCircle, ChevronDown, ChevronUp } from "lucide-react"
import { MacerationTimeline } from "./maceration-timeline"
import { MacerationQuickLog } from "./maceration-quick-log"

interface MacerationCardProps {
  recipeId: string
  recipeName: string
  startDate: Date
  targetDays: number
  status: string
}

interface StatusInfo {
  color: string
  emoji: string
  label: string
  tip: string
}

export function MacerationCard({ recipeId, recipeName, startDate, targetDays, status }: MacerationCardProps) {
  const [showTimeline, setShowTimeline] = useState(false)
  const [daysElapsed, setDaysElapsed] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [statusInfo, setStatusInfo] = useState<StatusInfo>({
    color: "bg-yellow-500",
    emoji: "🟡",
    label: "Macerando",
    tip: "Agite suavemente o frasco 1x por dia nesta fase."
  })

  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date()
      const start = new Date(startDate)
      const diffTime = Math.abs(now.getTime() - start.getTime())
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      
      setDaysElapsed(diffDays)
      
      const pct = Math.min((diffDays / targetDays) * 100, 100)
      setPercentage(pct)
      
      const end = new Date(start)
      end.setDate(end.getDate() + targetDays)
      setEndDate(end)
      
      // Determinar status e dica
      let info: StatusInfo
      
      if (status === "pronto") {
        info = {
          color: "bg-green-500",
          emoji: "🟢",
          label: "Pronto!",
          tip: "🎉 Seu perfume está pronto para uso!"
        }
      } else if (diffDays > targetDays) {
        info = {
          color: "bg-green-500 animate-pulse",
          emoji: "🟢",
          label: "Maturando",
          tip: "Maturação extra refina a fragrância. Quanto mais, melhor!"
        }
      } else if (diffDays >= 15) {
        info = {
          color: "bg-orange-500",
          emoji: "🟠",
          label: "Macerando",
          tip: "Quase lá! Teste em papel mata-borrão para acompanhar."
        }
      } else if (diffDays >= 8) {
        info = {
          color: "bg-yellow-500",
          emoji: "🟡",
          label: "Macerando",
          tip: "Agite 1x a cada 3 dias. A fragrância está evoluindo."
        }
      } else {
        info = {
          color: "bg-yellow-500",
          emoji: "🟡",
          label: "Macerando",
          tip: "Agite suavemente o frasco 1x por dia nesta fase."
        }
      }
      
      setStatusInfo(info)
    }
    
    calculateProgress()
    
    // Atualizar a cada hora
    const interval = setInterval(calculateProgress, 1000 * 60 * 60)
    return () => clearInterval(interval)
  }, [startDate, targetDays, status])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  return (
    <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20">
      <CardHeader>
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          MACERAÇÃO EM ANDAMENTO
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Informações principais */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold">📅 Início:</span>
            <span>{formatDate(startDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">🎯 Meta:</span>
            <span>{targetDays} dias ({formatDate(endDate)})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">📆 Dias passados:</span>
            <span className="font-bold text-purple-600 dark:text-purple-400">
              {daysElapsed} de {targetDays}
            </span>
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="space-y-2">
          <Progress value={percentage} className="h-3" />
          <div className="text-xs text-right text-muted-foreground">
            {percentage.toFixed(1)}%
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
          <span className="text-lg">{statusInfo.emoji}</span>
          <div className="flex-1">
            <div className="font-semibold">Status: {statusInfo.label}</div>
            <div className="text-sm text-muted-foreground mt-1">
              💡 {statusInfo.tip}
            </div>
          </div>
        </div>

        {/* Botões de ação rápida */}
        <MacerationQuickLog recipeId={recipeId} recipeName={recipeName} />

        {/* Toggle timeline */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setShowTimeline(!showTimeline)}
        >
          {showTimeline ? (
            <>
              Recolher histórico <ChevronUp className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              Ver histórico de maceração <ChevronDown className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>

        {/* Timeline expansível */}
        {showTimeline && (
          <MacerationTimeline recipeId={recipeId} startDate={startDate} targetDays={targetDays} />
        )}
      </CardContent>
    </Card>
  )
}
