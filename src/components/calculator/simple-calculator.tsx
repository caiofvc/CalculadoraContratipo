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
import { BaseSelector } from "./base-selector"
import { Coadjuvant } from "@/types/chemical"
import { BaseConfig } from "@/types/base"
import { MacerationButton } from "./maceration-button"
import { MacerationCard } from "./maceration-card"
import { handleNumericInput, parseNumericValue } from "@/lib/utils/number-input"

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
  const [totalVolume, setTotalVolume] = useState("100")
  
  // Percentuais
  const [pctEssence, setPctEssence] = useState("25")
  const [coadjuvants, setCoadjuvants] = useState<Coadjuvant[]>([])
  const [pctWater, setPctWater] = useState("6")
  
  // Densidades
  const [essenceDensity, setEssenceDensity] = useState("1.000")
  const [waterDensity, setWaterDensity] = useState("1.000")
  
  // Base config (substitui alcoholGl e alcoholDensity)
  const [baseConfig, setBaseConfig] = useState<BaseConfig>({
    baseType: 'propria',
    alcoholType: 'cereais',
    alcoholPurity: 96.2,
    alcoholDensity: 0.810,
    baseDensity: 0.850,
  })
  
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")
  
  // Estado de maceração
  const [macerationRecipeId, setMacerationRecipeId] = useState<string | null>(null)
  const [macerationStartDate, setMacerationStartDate] = useState<Date | null>(null)
  const [macerationTargetDays, setMacerationTargetDays] = useState<number>(30)
  const [macerationStatus, setMacerationStatus] = useState<string>("aguardando")

  // Calcular % total de coadjuvantes
  const totalCoadjuvantsPct = coadjuvants.reduce((sum, c) => sum + c.percentage, 0)

  // Calcular % de álcool/base automaticamente
  const alcoholPct = Math.max(0, 100 - parseNumericValue(pctEssence) - totalCoadjuvantsPct - parseNumericValue(pctWater))

  const handleMacerationStarted = (recipeId: string, startDate: Date, targetDays: number) => {
    setMacerationRecipeId(recipeId)
    setMacerationStartDate(startDate)
    setMacerationTargetDays(targetDays)
    setMacerationStatus("macerando")
  }

  const handleCalculate = () => {
    setError("")
    
    const totalVolumeNum = parseNumericValue(totalVolume)
    if (totalVolumeNum <= 0) {
      setError("Informe uma quantidade total válida.")
      return
    }

    const pctEssenceNum = parseNumericValue(pctEssence)
    const pctWaterNum = parseNumericValue(pctWater)
    const somaOutros = pctEssenceNum + totalCoadjuvantsPct + pctWaterNum
    if (somaOutros > 100) {
      setError("A soma dos ingredientes ultrapassa 100%. Reduza as porcentagens.")
      return
    }

    const input: SimpleCalculatorInput = {
      totalVolume: totalVolumeNum,
      calculationMode,
      pctEssence: pctEssenceNum,
      pctAlcohol: alcoholPct,
      pctPg: 0, // Removido - mantido apenas para compatibilidade
      pctGlycerin: 0, // Removido - mantido apenas para compatibilidade
      pctWater: pctWaterNum,
      alcoholGl: baseConfig.alcoholPurity,
      alcoholDensity: baseConfig.baseType === 'pronta' ? baseConfig.baseDensity : baseConfig.alcoholDensity,
      essenceDensity: parseNumericValue(essenceDensity),
      pgDensity: 1.036, // Valor padrão para compatibilidade
      glycerinDensity: 1.261, // Valor padrão para compatibilidade
      waterDensity: parseNumericValue(waterDensity),
      coadjuvants, // Novo campo
      baseConfig, // Adicionar baseConfig
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
                type="text"
                inputMode="decimal"
                value={totalVolume}
                onChange={(e) => setTotalVolume(handleNumericInput(e.target.value))}
                onBlur={() => {
                  if (totalVolume === "" || totalVolume === ".") setTotalVolume("0")
                }}
                className="text-base"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Essência */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-purple-500 flex items-center gap-2">
            🌸 Essência / Óleo Essencial
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 p-4 rounded-lg border bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: COLORS.essence }} />
                <span className="font-semibold">Essência / Óleo Essencial</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pctEssence">Concentração (%)</Label>
                <Input
                  id="pctEssence"
                  type="text"
                  inputMode="decimal"
                  value={pctEssence}
                  onChange={(e) => setPctEssence(handleNumericInput(e.target.value))}
                  onBlur={() => {
                    if (pctEssence === "" || pctEssence === ".") setPctEssence("0")
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="essenceDensity">Densidade (g/ml)</Label>
                <Input
                  id="essenceDensity"
                  type="text"
                  inputMode="decimal"
                  value={essenceDensity}
                  onChange={(e) => setEssenceDensity(handleNumericInput(e.target.value))}
                  onBlur={() => {
                    if (essenceDensity === "" || essenceDensity === ".") setEssenceDensity("1")
                  }}
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

      {/* Base / Veículo */}
      <BaseSelector
        config={baseConfig}
        onChange={setBaseConfig}
        remainingPercentage={alcoholPct}
      />

      {/* Coadjuvantes / Químicos Aromáticos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-purple-500 flex items-center gap-2">
            🧴 Coadjuvantes / Químicos Aromáticos
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
                  type="text"
                  inputMode="decimal"
                  value={pctWater}
                  onChange={(e) => setPctWater(handleNumericInput(e.target.value))}
                  onBlur={() => {
                    if (pctWater === "" || pctWater === ".") setPctWater("0")
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="waterDensity">Densidade (g/ml)</Label>
                <Input
                  id="waterDensity"
                  type="text"
                  inputMode="decimal"
                  value={waterDensity}
                  onChange={(e) => setWaterDensity(handleNumericInput(e.target.value))}
                  onBlur={() => {
                    if (waterDensity === "" || waterDensity === ".") setWaterDensity("1")
                  }}
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
                Concentração: {formatBrazilianNumber(parseNumericValue(pctEssence), 1)}% · Álcool: {formatBrazilianNumber(alcoholPct, 1)}% · 
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
              {!macerationRecipeId && (
                <MacerationButton
                  recipeName={recipeName}
                  recipeData={{
                    concentrationType: "edp",
                    totalVolume,
                    calculationMode,
                    pctEssence,
                    pctAlcohol: alcoholPct,
                    pctWater,
                    alcoholGl: baseConfig.alcoholPurity,
                    alcoholDensity: baseConfig.baseType === 'pronta' ? baseConfig.baseDensity : baseConfig.alcoholDensity,
                    formulaType: "base_pronta",
                    ingredients: result.ingredients,
                  }}
                  onMacerationStarted={handleMacerationStarted}
                />
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Card de Maceração */}
      {macerationRecipeId && macerationStartDate && (
        <MacerationCard
          recipeId={macerationRecipeId}
          recipeName={recipeName || "Sem nome"}
          startDate={macerationStartDate}
          targetDays={macerationTargetDays}
          status={macerationStatus}
        />
      )}
    </div>
  )
}
