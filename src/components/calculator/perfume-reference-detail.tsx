"use client"

import { ReferencePerfumeWithNotes } from "@/types/reference-perfume"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Star } from "lucide-react"
import { formatBrazilianNumber } from "@/lib/calculations/perfume-calculator"

interface PerfumeReferenceDetailProps {
  perfume: ReferencePerfumeWithNotes | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onUseAsBase: (perfume: ReferencePerfumeWithNotes) => void
}

export function PerfumeReferenceDetail({ perfume, open, onOpenChange, onUseAsBase }: PerfumeReferenceDetailProps) {
  if (!perfume) return null

  const totalPct = [
    ...perfume.notes.topo,
    ...perfume.notes.coracao,
    ...perfume.notes.fundo
  ].reduce((sum, note) => sum + note.suggestedPct, 0)

  const renderNotesList = (notes: typeof perfume.notes.topo, title: string, emoji: string, color: string) => {
    if (notes.length === 0) return null

    return (
      <div className="space-y-3">
        <h3 className="font-semibold flex items-center gap-2">
          <span>{emoji}</span>
          {title}
          <Badge variant="secondary" className="ml-auto">
            {formatBrazilianNumber(notes.reduce((sum, n) => sum + n.suggestedPct, 0), 1)}%
          </Badge>
        </h3>
        <div className="space-y-2">
          {notes.map((note) => (
            <div 
              key={note.id} 
              className={`p-3 rounded-lg border ${note.isKeyNote ? 'bg-purple-500/5 border-purple-500/20' : 'bg-muted/30'}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{note.chemicalName}</span>
                    {note.isKeyNote && (
                      <Star className="h-3 w-3 fill-purple-500 text-purple-500" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {note.suggestedChemical}
                  </p>
                  {note.notes && (
                    <p className="text-xs text-muted-foreground italic">
                      {note.notes}
                    </p>
                  )}
                </div>
                <Badge variant="outline" className="flex-shrink-0">
                  {formatBrazilianNumber(note.suggestedPct, 1)}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{perfume.name}</DialogTitle>
              <DialogDescription className="text-base">
                {perfume.brand}
                {perfume.yearLaunched && ` • ${perfume.yearLaunched}`}
                {perfume.perfumer && ` • Nariz: ${perfume.perfumer}`}
              </DialogDescription>
            </div>
            {perfume.imageUrl && (
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <img 
                  src={perfume.imageUrl} 
                  alt={perfume.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Info Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">
              {perfume.gender === 'masculino' ? '♂' : perfume.gender === 'feminino' ? '♀' : '⚥'} {perfume.gender}
            </Badge>
            <Badge variant="outline">
              {perfume.olfactiveFamily}
            </Badge>
            {perfume.olfactiveSubfamily && (
              <Badge variant="outline">
                {perfume.olfactiveSubfamily}
              </Badge>
            )}
            {perfume.concentrationType && (
              <Badge variant="secondary">
                {perfume.concentrationType}
              </Badge>
            )}
          </div>

          {/* Description */}
          {perfume.description && (
            <p className="text-sm text-muted-foreground">
              {perfume.description}
            </p>
          )}

          {/* Alert sobre percentuais */}
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <p className="text-sm text-blue-700 dark:text-blue-400">
              💡 <strong>Fórmula de Contratipo:</strong> Os percentuais abaixo são da <strong>base aromática</strong> ({formatBrazilianNumber(totalPct, 1)}% total). 
              O restante será completado com álcool, coadjuvantes e água conforme sua configuração.
            </p>
          </div>

          {/* Pirâmide Olfativa */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold">🔬 Pirâmide Olfativa</h2>
            
            {renderNotesList(perfume.notes.topo, 'Notas de Topo', '🌬️', 'yellow')}
            {renderNotesList(perfume.notes.coracao, 'Notas de Coração', '💐', 'pink')}
            {renderNotesList(perfume.notes.fundo, 'Notas de Fundo', '🪵', 'brown')}
          </div>

          {/* Legenda */}
          <div className="p-3 rounded-lg bg-muted/30 text-xs space-y-1">
            <p className="flex items-center gap-2">
              <Star className="h-3 w-3 fill-purple-500 text-purple-500" />
              <span className="text-muted-foreground">Nota assinatura / característica do perfume</span>
            </p>
            <p className="text-muted-foreground">
              💡 Você pode ajustar as porcentagens e adicionar/remover químicos após usar como base
            </p>
          </div>

          {/* Action Button */}
          <Button 
            onClick={() => {
              onUseAsBase(perfume)
              onOpenChange(false)
            }}
            className="w-full"
            size="lg"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Usar como base para minha fórmula
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
