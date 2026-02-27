"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import { Coadjuvant } from "@/types/chemical"
import { COADJUVANT_SUGGESTIONS } from "@/lib/data/coadjuvants"
import { handleNumericInput, parseNumericValue } from "@/lib/utils/number-input"

interface CoadjuvantsManagerProps {
  coadjuvants: Coadjuvant[]
  onChange: (coadjuvants: Coadjuvant[]) => void
  maxCoadjuvants?: number
}

export function CoadjuvantsManager({ 
  coadjuvants, 
  onChange, 
  maxCoadjuvants = 4 
}: CoadjuvantsManagerProps) {

  const addCoadjuvant = () => {
    if (coadjuvants.length >= maxCoadjuvants) return
    
    onChange([
      ...coadjuvants,
      {
        id: `coadj-${Date.now()}`,
        name: '',
        percentage: 0,
        density: 1.000,
      }
    ])
  }

  const removeCoadjuvant = (index: number) => {
    onChange(coadjuvants.filter((_, i) => i !== index))
  }

  const updateCoadjuvant = (index: number, field: keyof Coadjuvant, value: any) => {
    const updated = [...coadjuvants]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const handleNameChange = (index: number, value: string) => {
    updateCoadjuvant(index, 'name', value)
    
    // Auto-preencher densidade se selecionar uma sugestão exata
    const suggestion = COADJUVANT_SUGGESTIONS.find(s => s.name === value)
    if (suggestion) {
      updateCoadjuvant(index, 'density', suggestion.density)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Coadjuvantes / Químicos Aromáticos</h3>
        {coadjuvants.length < maxCoadjuvants && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addCoadjuvant}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Coadjuvante
          </Button>
        )}
      </div>

      {coadjuvants.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          Nenhum coadjuvante adicionado. Clique em "Adicionar Coadjuvante" para começar.
        </p>
      ) : (
        <div className="space-y-3">
          {coadjuvants.map((coadjuvant, index) => (
            <div key={coadjuvant.id || index} className="p-4 rounded-lg border bg-muted/30">
              <div className="flex items-start gap-3">
                <div className="flex-1 space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor={`coadjuvant-name-${index}`} className="text-xs">
                      Nome do Coadjuvante
                    </Label>
                    <Input
                      id={`coadjuvant-name-${index}`}
                      list={`coadjuvant-suggestions-${index}`}
                      value={coadjuvant.name}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      onFocus={(e) => e.target.select()}
                      placeholder="Digite ou selecione..."
                      autoComplete="off"
                    />
                    <datalist id={`coadjuvant-suggestions-${index}`}>
                      {COADJUVANT_SUGGESTIONS.map((suggestion) => (
                        <option key={suggestion.name} value={suggestion.name}>
                          {suggestion.name} — {suggestion.density} g/ml
                        </option>
                      ))}
                    </datalist>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor={`coadjuvant-percentage-${index}`} className="text-xs">
                        Porcentagem (%)
                      </Label>
                      <Input
                        id={`coadjuvant-percentage-${index}`}
                        type="text"
                        inputMode="decimal"
                        value={coadjuvant.percentage}
                        onChange={(e) => {
                          const cleaned = handleNumericInput(e.target.value)
                          updateCoadjuvant(index, 'percentage', parseNumericValue(cleaned))
                        }}
                        placeholder="%"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`coadjuvant-density-${index}`} className="text-xs">
                        Densidade (g/ml)
                      </Label>
                      <Input
                        id={`coadjuvant-density-${index}`}
                        type="text"
                        inputMode="decimal"
                        value={coadjuvant.density}
                        onChange={(e) => {
                          const cleaned = handleNumericInput(e.target.value)
                          updateCoadjuvant(index, 'density', parseNumericValue(cleaned))
                        }}
                        placeholder="g/ml"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 mt-6"
                  onClick={() => removeCoadjuvant(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {coadjuvants.length > 0 && (
        <p className="text-xs text-muted-foreground">
          💡 Máximo de {maxCoadjuvants} coadjuvantes. Total atual: {coadjuvants.reduce((sum, c) => sum + c.percentage, 0).toFixed(1)}%
        </p>
      )}
    </div>
  )
}
