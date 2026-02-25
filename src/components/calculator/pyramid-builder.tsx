"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, AlertTriangle } from "lucide-react"
import { ChemicalSelector } from "./chemical-selector"
import { AromaticChemical, ChemicalInFormula } from "@/types/chemical"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PyramidBuilderProps {
  onChemicalsChange: (chemicals: ChemicalInFormula[]) => void
  initialChemicals?: ChemicalInFormula[]
}

export function PyramidBuilder({ onChemicalsChange, initialChemicals = [] }: PyramidBuilderProps) {
  const [topoChemicals, setTopoChemicals] = useState<ChemicalInFormula[]>([])
  const [coracaoChemicals, setCoracaoChemicals] = useState<ChemicalInFormula[]>([])
  const [fundoChemicals, setFundoChemicals] = useState<ChemicalInFormula[]>([])

  // Preencher com químicos iniciais quando fornecidos
  useEffect(() => {
    if (initialChemicals.length > 0) {
      const topo = initialChemicals.filter(c => c.chemical.olfactiveNote === 'topo')
      const coracao = initialChemicals.filter(c => c.chemical.olfactiveNote === 'coracao')
      const fundo = initialChemicals.filter(c => c.chemical.olfactiveNote === 'fundo')
      
      setTopoChemicals(topo)
      setCoracaoChemicals(coracao)
      setFundoChemicals(fundo)
    }
  }, [initialChemicals])

  const updateAllChemicals = (topo: ChemicalInFormula[], coracao: ChemicalInFormula[], fundo: ChemicalInFormula[]) => {
    onChemicalsChange([...topo, ...coracao, ...fundo])
  }

  const addChemical = (note: "topo" | "coracao" | "fundo", chemical: AromaticChemical) => {
    const newChemical: ChemicalInFormula = {
      chemical,
      percentage: chemical.minDosage || 1,
    }

    if (note === "topo") {
      const updated = [...topoChemicals, newChemical]
      setTopoChemicals(updated)
      updateAllChemicals(updated, coracaoChemicals, fundoChemicals)
    } else if (note === "coracao") {
      const updated = [...coracaoChemicals, newChemical]
      setCoracaoChemicals(updated)
      updateAllChemicals(topoChemicals, updated, fundoChemicals)
    } else {
      const updated = [...fundoChemicals, newChemical]
      setFundoChemicals(updated)
      updateAllChemicals(topoChemicals, coracaoChemicals, updated)
    }
  }

  const removeChemical = (note: "topo" | "coracao" | "fundo", index: number) => {
    if (note === "topo") {
      const updated = topoChemicals.filter((_, i) => i !== index)
      setTopoChemicals(updated)
      updateAllChemicals(updated, coracaoChemicals, fundoChemicals)
    } else if (note === "coracao") {
      const updated = coracaoChemicals.filter((_, i) => i !== index)
      setCoracaoChemicals(updated)
      updateAllChemicals(topoChemicals, updated, fundoChemicals)
    } else {
      const updated = fundoChemicals.filter((_, i) => i !== index)
      setFundoChemicals(updated)
      updateAllChemicals(topoChemicals, coracaoChemicals, updated)
    }
  }

  const updatePercentage = (note: "topo" | "coracao" | "fundo", index: number, percentage: number) => {
    if (note === "topo") {
      const updated = [...topoChemicals]
      updated[index] = { ...updated[index], percentage }
      setTopoChemicals(updated)
      updateAllChemicals(updated, coracaoChemicals, fundoChemicals)
    } else if (note === "coracao") {
      const updated = [...coracaoChemicals]
      updated[index] = { ...updated[index], percentage }
      setCoracaoChemicals(updated)
      updateAllChemicals(topoChemicals, updated, fundoChemicals)
    } else {
      const updated = [...fundoChemicals]
      updated[index] = { ...updated[index], percentage }
      setFundoChemicals(updated)
      updateAllChemicals(topoChemicals, coracaoChemicals, updated)
    }
  }

  const calculateTotalPct = (chemicals: ChemicalInFormula[]) => {
    return chemicals.reduce((sum, c) => sum + c.percentage, 0)
  }

  const topoPct = calculateTotalPct(topoChemicals)
  const coracaoPct = calculateTotalPct(coracaoChemicals)
  const fundoPct = calculateTotalPct(fundoChemicals)

  const renderChemicalList = (
    chemicals: ChemicalInFormula[],
    note: "topo" | "coracao" | "fundo",
    color: string
  ) => {
    return (
      <div className="space-y-3">
        {chemicals.map((item, index) => {
          const hasIfraWarning = item.chemical.ifraLimit && item.percentage > item.chemical.ifraLimit

          return (
            <div key={index} className="p-3 rounded-lg border bg-muted/30">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                    <span className="font-semibold text-sm">{item.chemical.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {item.chemical.olfactiveFamily}
                    </Badge>
                  </div>
                  {item.chemical.description && (
                    <p className="text-xs text-muted-foreground mt-1">{item.chemical.description}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => removeChemical(note, index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">Dosagem (%)</Label>
                  <Input
                    type="number"
                    value={item.percentage}
                    onChange={(e) => updatePercentage(note, index, Number(e.target.value))}
                    min={0}
                    max={100}
                    step={0.1}
                    className="h-8"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Recomendado</Label>
                  <div className="h-8 flex items-center text-xs text-muted-foreground">
                    {item.chemical.minDosage}–{item.chemical.maxDosage}%
                    {item.chemical.ifraLimit && (
                      <span className="ml-2 text-orange-500">
                        (IFRA: max {item.chemical.ifraLimit}%)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {hasIfraWarning && (
                <div className="mt-2 flex items-center gap-2 text-xs text-orange-500">
                  <AlertTriangle className="h-3 w-3" />
                  Atenção: Dosagem acima do limite IFRA
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Notas de Topo */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              🌬️ Notas de Topo
              <Badge variant={topoPct > 25 ? "destructive" : "secondary"}>
                {topoPct.toFixed(1)}%
              </Badge>
            </CardTitle>
            <ChemicalSelector note="topo" onSelect={(c) => addChemical("topo", c)} />
          </div>
          <p className="text-xs text-muted-foreground">
            Duração: 15min - 2h · Recomendado: 5-20% da composição
          </p>
        </CardHeader>
        <CardContent>
          {topoChemicals.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nenhum químico adicionado. Clique em "Adicionar Químico" para começar.
            </p>
          ) : (
            renderChemicalList(topoChemicals, "topo", "#fbbf24")
          )}
        </CardContent>
      </Card>

      {/* Notas de Coração */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              💐 Notas de Coração
              <Badge variant={coracaoPct < 30 && coracaoPct > 0 ? "destructive" : "secondary"}>
                {coracaoPct.toFixed(1)}%
              </Badge>
            </CardTitle>
            <ChemicalSelector note="coracao" onSelect={(c) => addChemical("coracao", c)} />
          </div>
          <p className="text-xs text-muted-foreground">
            Duração: 2h - 6h · Recomendado: 30-50% da composição
          </p>
        </CardHeader>
        <CardContent>
          {coracaoChemicals.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nenhum químico adicionado. Clique em "Adicionar Químico" para começar.
            </p>
          ) : (
            renderChemicalList(coracaoChemicals, "coracao", "#ec4899")
          )}
        </CardContent>
      </Card>

      {/* Notas de Fundo */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              🪵 Notas de Fundo
              <Badge variant={fundoPct < 20 && fundoPct > 0 ? "destructive" : "secondary"}>
                {fundoPct.toFixed(1)}%
              </Badge>
            </CardTitle>
            <ChemicalSelector note="fundo" onSelect={(c) => addChemical("fundo", c)} />
          </div>
          <p className="text-xs text-muted-foreground">
            Duração: 6h - 24h+ · Recomendado: 30-60% da composição
          </p>
        </CardHeader>
        <CardContent>
          {fundoChemicals.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nenhum químico adicionado. Clique em "Adicionar Químico" para começar.
            </p>
          ) : (
            renderChemicalList(fundoChemicals, "fundo", "#92400e")
          )}
        </CardContent>
      </Card>

      {/* Resumo da Pirâmide */}
      {(topoPct > 0 || coracaoPct > 0 || fundoPct > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">📊 Resumo da Pirâmide Olfativa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Topo:</span>
                <span className="font-semibold">{topoPct.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Coração:</span>
                <span className="font-semibold">{coracaoPct.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Fundo:</span>
                <span className="font-semibold">{fundoPct.toFixed(1)}%</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-sm font-bold">
                <span>Total da Base Aromática:</span>
                <span>{(topoPct + coracaoPct + fundoPct).toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
