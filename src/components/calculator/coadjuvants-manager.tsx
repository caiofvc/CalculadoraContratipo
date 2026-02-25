"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import { Coadjuvant } from "@/types/chemical"
import { COADJUVANT_SUGGESTIONS } from "@/lib/data/coadjuvants"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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
  const [openPopover, setOpenPopover] = useState<number | null>(null)

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

  const selectSuggestion = (index: number, suggestion: typeof COADJUVANT_SUGGESTIONS[0]) => {
    const updated = [...coadjuvants]
    updated[index] = {
      ...updated[index],
      name: suggestion.name,
      density: suggestion.density,
    }
    onChange(updated)
    setOpenPopover(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Coadjuvantes / Aditivos</h3>
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
                    <Label className="text-xs">Nome do Coadjuvante</Label>
                    <Popover 
                      open={openPopover === index} 
                      onOpenChange={(open) => setOpenPopover(open ? index : null)}
                    >
                      <PopoverTrigger asChild>
                        <div className="relative">
                          <Input
                            value={coadjuvant.name}
                            onChange={(e) => updateCoadjuvant(index, 'name', e.target.value)}
                            placeholder="Digite ou selecione..."
                            onFocus={() => setOpenPopover(index)}
                          />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Buscar coadjuvante..." />
                          <CommandList>
                            <CommandEmpty>Nenhum resultado. Digite um nome personalizado.</CommandEmpty>
                            <CommandGroup heading="Sugestões">
                              {COADJUVANT_SUGGESTIONS.map((suggestion) => (
                                <CommandItem
                                  key={suggestion.name}
                                  onSelect={() => selectSuggestion(index, suggestion)}
                                >
                                  <div className="flex flex-col">
                                    <span className="font-medium">{suggestion.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                      Densidade: {suggestion.density} g/ml
                                    </span>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-xs">Porcentagem (%)</Label>
                      <Input
                        type="number"
                        value={coadjuvant.percentage}
                        onChange={(e) => updateCoadjuvant(index, 'percentage', Number(e.target.value))}
                        min={0}
                        max={100}
                        step={0.1}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Densidade (g/ml)</Label>
                      <Input
                        type="number"
                        value={coadjuvant.density}
                        onChange={(e) => updateCoadjuvant(index, 'density', Number(e.target.value))}
                        min={0.5}
                        max={2}
                        step={0.001}
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
