"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Beaker, Calculator, Printer, Copy, CheckCircle2, AlertCircle } from "lucide-react"
import { calculateSimpleFormula, formatBrazilianNumber, type SimpleCalculatorInput } from "@/lib/calculations/perfume-calculator"
import { ResultsTable } from "./results-table"
import { StackBar } from "./stack-bar"
import { CoadjuvantsManager } from "./coadjuvants-manager"
import { Coadjuvant } from "@/types/chemical"

const COLORS = {
  essence: '#a78bfa',
  alcohol: '#818cf8',
  pg: '#34d399',
  glycerin: '#fbbf24',
  water: '#38bdf8',
}

export function SimpleCalculator() {
  const [recipeName, setRecipeName] = useState("")
  const [calculationMode, setCalculationMode] = useState<"volume" | "massa">("volume")
  const [totalVolume, setTotalVolume] = useState(100)
  
  // Percentuais
  const [pctEssence, setPctEssence] = useState(25)
  const [coadjuvants, setCoadjuvants] = useState<Coadjuvant[]>([])
  const [pctWater, setPctWater] = useState(6)
  
  // Densidades
  const [essenceDensity, setEssenceDensity] = useState(1.000)
  const [alcoholGl, setAlcoholGl] = useState(96.2)
  const [alcoholDensity, setAlcoholDensity] = useState(0.810)
  const [waterDensity, setWaterDensity] = useState(1.000)
  
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")

  // Calcular % total de coadjuvantes
  const totalCoadjuvantsPct = coadjuvants.reduce((sum, c) => sum + c.percentage, 0)

  // Calcular % de álcool automaticamente
  const alcoholPct = Math.max(0, 100 - pctEssence - totalCoadjuvantsPct - pctWater)

  const handleCalculate = () => {
    setError("")
    
    if (totalVolume <= 0) {
      setError("Informe uma quantidade total válida.")
      return
    }

    const somaOutros = pctEssence + totalCoadjuvantsPct + pctWater
    if (somaOutros > 100) {
      setError("A soma dos ingredientes ultrapassa 100%. Reduza as porcentagens.")
      return
    }

    const input: SimpleCalculatorInput = {
      totalVolume,
      calculationMode,
      pctEssence,
      pctAlcohol: alcoholPct,
      pctPg: 0, // Removido - mantido apenas para compatibilidade
      pctGlycerin: 0, // Removido - mantido apenas para compatibilidade
      pctWater,
      alcoholGl,
      alcoholDensity,
      essenceDensity,
      pgDensity: 1.036, // Valor padrão para compatibilidade
      glycerinDensity: 1.261, // Valor padrão para compatibilidade
      waterDensity,
      coadjuvants, // Novo campo
    }

    const calculationResult = calculateSimpleFormula(input)
    setResult(calculationResult)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleCopy = () => {
    if (!result) return

    const name = recipeName || "Sem nome"
    const unitPrimary = calculationMode === "volume" ? "ml" : "g"
    let txt = `RECEITA: ${name}\n`
    txt += `Modo: ${calculationMode === "volume" ? "Volume (ml)" : "Massa (g)"}\n`
    txt += `Data: ${new Date().toLocaleString("pt-BR")}\n\n`
    txt += `${"Ingrediente".padEnd(28)} ${"%".padStart(7)}  ${"Qtd".padStart(12)}\n`
    txt += "-".repeat(52) + "\n"

    result.ingredients.forEach((ing: any) => {
      const qty = calculationMode === "volume" ? ing.amountMl : ing.amountG
      txt += `${ing.name.padEnd(28)} ${formatBrazilianNumber(ing.percentage, 1).padStart(7)}%  ${formatBrazilianNumber(qty, 1).padStart(12)} ${unitPrimary}\n`
    })

    navigator.clipboard.writeText(txt).then(() => {
      alert("Receita copiada para a área de transferência!")
    })
  }

  return (
    <div className="space-y-6">
      {/* Identificação */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-purple-500 flex items-center gap-2">
            📋 Identificação da Receita
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="recipeName">Nome da fragrância</Label>
            <Input
              id="recipeName"
              placeholder="Ex: Eau de Parfum Amadeirado"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Configurações Gerais */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-purple-500 flex items-center gap-2">
            ⚙️ Configurações Gerais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Modo de cálculo</Label>
              <div className="flex rounded-lg overflow-hidden border">
                <Button
                  variant={calculationMode === "volume" ? "default" : "ghost"}
                  className="flex-1 rounded-none"
                  onClick={() => setCalculationMode("volume")}
                >
                  🧪 Volume (ml)
                </Button>
                <Button
                  variant={calculationMode === "massa" ? "default" : "ghost"}
                  className="flex-1 rounded-none"
                  onClick={() => setCalculationMode("massa")}
                >
                  ⚖️ Massa (g)
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalVolume">
                {calculationMode === "volume" ? "Quantidade total (ml)" : "Quantidade total (g)"}
              </Label>
              <Input
                id="totalVolume"
                type="number"
                value={totalVolume}
                onChange={(e) => setTotalVolume(Number(e.target.value))}
                min={1}
                step={1}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Essência */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-purple-500 flex items-center gap-2">
            🌸 Essência / Óleo Aromático
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 p-4 rounded-lg border bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: COLORS.essence }} />
                <span className="font-semibold">Essência / Óleo Aromático</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pctEssence">Concentração (%)</Label>
                <Input
                  id="pctEssence"
                  type="number"
                  value={pctEssence}
                  onChange={(e) => setPctEssence(Number(e.target.value))}
                  min={0}
                  max={100}
                  step={0.5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="essenceDensity">Densidade (g/ml)</Label>
                <Input
                  id="essenceDensity"
                  type="number"
                  value={essenceDensity}
                  onChange={(e) => setEssenceDensity(Number(e.target.value))}
                  min={0.5}
                  max={2}
                  step={0.001}
                />
              </div>
              <div className="flex items-end">
                <p className="text-xs text-muted-foreground">
                  Padrão EDP: 15–30%<br />
                  Padrão EDT: 8–15%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Álcool */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-purple-500 flex items-center gap-2">
            🍶 Álcool de Cereais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 p-4 rounded-lg border bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: COLORS.alcohol }} />
                <span className="font-semibold">Álcool de Cereais</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                ⚡ Calculado automaticamente
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="alcoholGl">Pureza (GL)</Label>
                <Input
                  id="alcoholGl"
                  type="number"
                  value={alcoholGl}
                  onChange={(e) => setAlcoholGl(Number(e.target.value))}
                  min={0}
                  max={100}
                  step={0.1}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alcoholDensity">Densidade (g/ml)</Label>
                <Input
                  id="alcoholDensity"
                  type="number"
                  value={alcoholDensity}
                  onChange={(e) => setAlcoholDensity(Number(e.target.value))}
                  min={0.5}
                  max={1.5}
                  step={0.001}
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <span className="text-sm">🍶 Álcool restante na fórmula:</span>
              <strong className="text-2xl text-purple-400">{formatBrazilianNumber(alcoholPct, 1)}%</strong>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coadjuvantes / Aditivos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-purple-500 flex items-center gap-2">
            🧴 Coadjuvantes / Aditivos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CoadjuvantsManager 
            coadjuvants={coadjuvants} 
            onChange={setCoadjuvants}
            maxCoadjuvants={4}
          />
        </CardContent>
      </Card>

      {/* Água Deionizada */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-purple-500 flex items-center gap-2">
            💧 Água Deionizada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 p-4 rounded-lg border bg-muted/30">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: COLORS.water }} />
              <span className="font-semibold">Água Deionizada</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pctWater">Porcentagem (%)</Label>
                <Input
                  id="pctWater"
                  type="number"
                  value={pctWater}
                  onChange={(e) => setPctWater(Number(e.target.value))}
                  min={0}
                  max={100}
                  step={0.5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="waterDensity">Densidade (g/ml)</Label>
                <Input
                  id="waterDensity"
                  type="number"
                  value={waterDensity}
                  onChange={(e) => setWaterDensity(Number(e.target.value))}
                  min={0.5}
                  max={2}
                  step={0.001}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerta de erro */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Botão Calcular */}
      <Card>
        <CardContent className="pt-6">
          <Button onClick={handleCalculate} className="w-full" size="lg">
            <Calculator className="mr-2 h-5 w-5" />
            ⚗️ Calcular Fórmula
          </Button>
        </CardContent>
      </Card>

      {/* Resultados */}
      {result && (
        <Card>
          <CardHeader>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-purple-400">
                {recipeName || "Sem nome"}
              </h2>
              <p className="text-sm text-muted-foreground">
                Concentração: {formatBrazilianNumber(pctEssence, 1)}% · Álcool: {formatBrazilianNumber(alcoholPct, 1)}% · 
                Modo: {calculationMode === "volume" ? "Volume (ml)" : "Massa (g)"} · {new Date().toLocaleString("pt-BR")}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                ✅ Fórmula fechada em 100% — álcool: {formatBrazilianNumber(alcoholPct, 1)}%
              </AlertDescription>
            </Alert>

            <StackBar ingredients={result.ingredients} />
            
            <ResultsTable
              ingredients={result.ingredients}
              calculationMode={calculationMode}
              totalVolumeMl={result.totalVolumeMl}
              totalMassG={result.totalMassG}
            />

            <div className="flex gap-2 flex-wrap print:hidden">
              <Button variant="secondary" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Imprimir / PDF
              </Button>
              <Button variant="secondary" onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" />
                Copiar receita
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
