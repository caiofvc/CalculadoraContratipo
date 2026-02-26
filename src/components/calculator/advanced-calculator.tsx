"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calculator, CheckCircle2, AlertCircle, Printer, Copy } from "lucide-react"
import { PyramidBuilder } from "./pyramid-builder"
import { PerfumeReferenceSelector } from "./perfume-reference-selector"
import { CoadjuvantsManager } from "./coadjuvants-manager"
import { BaseSelector } from "./base-selector"
import { MacerationButton } from "./maceration-button"
import { MacerationCard } from "./maceration-card"
import { ChemicalInFormula, Coadjuvant } from "@/types/chemical"
import { ReferencePerfumeWithNotes } from "@/types/reference-perfume"
import { BaseConfig } from "@/types/base"
import { calculateAdvancedFormula, formatBrazilianNumber, type AdvancedCalculatorInput } from "@/lib/calculations/perfume-calculator"
import { ResultsTable } from "./results-table"
import { StackBar } from "./stack-bar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CONCENTRATION_TYPES } from "@/lib/data/default-chemicals"

export function AdvancedCalculator() {
  const [showReferenceSelector, setShowReferenceSelector] = useState(true)
  const [recipeName, setRecipeName] = useState("")
  const [calculationMode, setCalculationMode] = useState<"volume" | "massa">("volume")
  const [totalVolume, setTotalVolume] = useState(100)
  const [concentrationType, setConcentrationType] = useState("edp")
  
  // Químicos da pirâmide
  const [chemicals, setChemicals] = useState<ChemicalInFormula[]>([])
  
  // Coadjuvantes editáveis
  const [coadjuvants, setCoadjuvants] = useState<Coadjuvant[]>([])
  const [pctWater, setPctWater] = useState(6)
  
  // Base config (substitui alcoholGl e alcoholDensity)
  const [baseConfig, setBaseConfig] = useState<BaseConfig>({
    baseType: 'propria',
    alcoholType: 'cereais',
    alcoholPurity: 96.2,
    alcoholDensity: 0.810,
    baseDensity: 0.850,
  })
  const [waterDensity, setWaterDensity] = useState(1.000)
  
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")
  
  // Estado de maceração
  const [macerationRecipeId, setMacerationRecipeId] = useState<string | null>(null)
  const [macerationStartDate, setMacerationStartDate] = useState<Date | null>(null)
  const [macerationTargetDays, setMacerationTargetDays] = useState<number>(30)
  const [macerationStatus, setMacerationStatus] = useState<string>("aguardando")

  // Calcular % total dos químicos
  const totalChemicalsPct = chemicals.reduce((sum, c) => sum + c.percentage, 0)
  
  // Calcular % total de coadjuvantes
  const totalCoadjuvantsPct = coadjuvants.reduce((sum, c) => sum + c.percentage, 0)
  
  // Calcular % de álcool automaticamente
  const alcoholPct = Math.max(0, 100 - totalChemicalsPct - totalCoadjuvantsPct - pctWater)

  const handleMacerationStarted = (recipeId: string, startDate: Date, targetDays: number) => {
    setMacerationRecipeId(recipeId)
    setMacerationStartDate(startDate)
    setMacerationTargetDays(targetDays)
    setMacerationStatus("macerando")
  }

  // Atualizar percentuais quando mudar o tipo de concentração
  const handleConcentrationChange = (value: string) => {
    setConcentrationType(value)
    // Tipo de concentração atualizado - usuário pode ajustar manualmente
  }

  // Preencher pirâmide automaticamente com perfume de referência
  const handleSelectReferencePerfume = (perfume: ReferencePerfumeWithNotes) => {
    // Preencher nome da receita
    setRecipeName(`Inspirado em ${perfume.name}`)
    
    // Converter notas do perfume para ChemicalInFormula
    const newChemicals: ChemicalInFormula[] = []
    
    // Processar todas as notas
    const allNotes = [
      ...perfume.notes.topo.map(n => ({ ...n, note: 'topo' as const })),
      ...perfume.notes.coracao.map(n => ({ ...n, note: 'coracao' as const })),
      ...perfume.notes.fundo.map(n => ({ ...n, note: 'fundo' as const })),
    ]
    
    allNotes.forEach((note) => {
      // Criar um químico fictício baseado na nota de referência
      const chemical: ChemicalInFormula = {
        chemical: {
          id: `ref-${note.id}`,
          name: note.chemicalName,
          olfactiveFamily: perfume.olfactiveFamily as any, // Conversão temporária
          olfactiveNote: note.olfactiveNote,
          description: note.suggestedChemical,
          density: 0.950, // Densidade padrão
          isSystem: false,
          createdAt: new Date().toISOString(),
        },
        percentage: note.suggestedPct,
      }
      
      newChemicals.push(chemical)
    })
    
    setChemicals(newChemicals)
    setShowReferenceSelector(false)
  }

  const handleSkipReferenceSelector = () => {
    setShowReferenceSelector(false)
  }

  const handleCalculate = () => {
    setError("")
    
    if (totalVolume <= 0) {
      setError("Informe uma quantidade total válida.")
      return
    }

    if (chemicals.length === 0) {
      setError("Adicione pelo menos um químico aromático à pirâmide.")
      return
    }

    const somaOutros = totalChemicalsPct + totalCoadjuvantsPct + pctWater
    if (somaOutros > 100) {
      setError("A soma dos ingredientes ultrapassa 100%. Reduza as porcentagens.")
      return
    }

    const input: AdvancedCalculatorInput = {
      totalVolume,
      calculationMode,
      chemicals,
      pctAlcohol: alcoholPct,
      pctPg: 0, // Removido - mantido para compatibilidade
      pctGlycerin: 0, // Removido - mantido para compatibilidade
      pctWater,
      alcoholGl: baseConfig.alcoholPurity,
      alcoholDensity: baseConfig.baseType === 'pronta' ? baseConfig.baseDensity : baseConfig.alcoholDensity,
      pgDensity: 1.036, // Valor padrão para compatibilidade
      glycerinDensity: 1.261, // Valor padrão para compatibilidade
      waterDensity,
      coadjuvants, // Novo campo
      baseConfig, // Adicionar baseConfig
    }

    const calculationResult = calculateAdvancedFormula(input)
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
    txt += `Tipo: ${CONCENTRATION_TYPES[concentrationType as keyof typeof CONCENTRATION_TYPES]?.name || concentrationType}\n`
    txt += `Modo: ${calculationMode === "volume" ? "Volume (ml)" : "Massa (g)"}\n`
    txt += `Data: ${new Date().toLocaleString("pt-BR")}\n\n`
    
    txt += `=== PIRÂMIDE OLFATIVA ===\n\n`
    
    if (result.pyramid) {
      if (result.pyramid.topo.length > 0) {
        txt += `NOTAS DE TOPO:\n`
        result.pyramid.topo.forEach((ing: any) => {
          const qty = calculationMode === "volume" ? ing.amountMl : ing.amountG
          txt += `  ${ing.name.padEnd(30)} ${formatBrazilianNumber(ing.percentage, 1).padStart(6)}%  ${formatBrazilianNumber(qty, 2).padStart(10)} ${unitPrimary}\n`
        })
        txt += `\n`
      }
      
      if (result.pyramid.coracao.length > 0) {
        txt += `NOTAS DE CORAÇÃO:\n`
        result.pyramid.coracao.forEach((ing: any) => {
          const qty = calculationMode === "volume" ? ing.amountMl : ing.amountG
          txt += `  ${ing.name.padEnd(30)} ${formatBrazilianNumber(ing.percentage, 1).padStart(6)}%  ${formatBrazilianNumber(qty, 2).padStart(10)} ${unitPrimary}\n`
        })
        txt += `\n`
      }
      
      if (result.pyramid.fundo.length > 0) {
        txt += `NOTAS DE FUNDO:\n`
        result.pyramid.fundo.forEach((ing: any) => {
          const qty = calculationMode === "volume" ? ing.amountMl : ing.amountG
          txt += `  ${ing.name.padEnd(30)} ${formatBrazilianNumber(ing.percentage, 1).padStart(6)}%  ${formatBrazilianNumber(qty, 2).padStart(10)} ${unitPrimary}\n`
        })
        txt += `\n`
      }
    }
    
    txt += `=== OUTROS INGREDIENTES ===\n\n`
    const otherIngredients = result.ingredients.filter((i: any) => !i.olfactiveNote)
    otherIngredients.forEach((ing: any) => {
      const qty = calculationMode === "volume" ? ing.amountMl : ing.amountG
      txt += `${ing.name.padEnd(30)} ${formatBrazilianNumber(ing.percentage, 1).padStart(6)}%  ${formatBrazilianNumber(qty, 2).padStart(10)} ${unitPrimary}\n`
    })

    navigator.clipboard.writeText(txt).then(() => {
      alert("Receita copiada para a área de transferência!")
    })
  }

  return (
    <div className="space-y-6">
      {/* Seletor de Perfume de Referência */}
      {showReferenceSelector && (
        <PerfumeReferenceSelector
          onSelect={handleSelectReferencePerfume}
          onSkip={handleSkipReferenceSelector}
        />
      )}

      {/* Identificação */}
      {!showReferenceSelector && (
      <>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-purple-500">
            📋 Identificação e Configurações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipeName">Nome da fragrância</Label>
            <Input
              id="recipeName"
              placeholder="Ex: Eau de Parfum Amadeirado Oriental"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalVolume">
                {calculationMode === "volume" ? "Volume total (ml)" : "Massa total (g)"}
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

            <div className="space-y-2">
              <Label>Tipo de concentração</Label>
              <Select value={concentrationType} onValueChange={handleConcentrationChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CONCENTRATION_TYPES).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.name} ({config.essenceMin}-{config.essenceMax}%)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Modo de cálculo</Label>
              <div className="flex rounded-lg overflow-hidden border">
                <Button
                  variant={calculationMode === "volume" ? "default" : "ghost"}
                  className="flex-1 rounded-none"
                  onClick={() => setCalculationMode("volume")}
                >
                  Volume (ml)
                </Button>
                <Button
                  variant={calculationMode === "massa" ? "default" : "ghost"}
                  className="flex-1 rounded-none"
                  onClick={() => setCalculationMode("massa")}
                >
                  Massa (g)
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pirâmide Olfativa */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-purple-500">
            🔬 Monte sua Pirâmide Olfativa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PyramidBuilder 
            onChemicalsChange={setChemicals}
            initialChemicals={chemicals}
          />
        </CardContent>
      </Card>

      {/* Outros Ingredientes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-purple-500">
            🧴 Outros Ingredientes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Base / Veículo */}
          <div className="mb-4">
            <BaseSelector
              config={baseConfig}
              onChange={setBaseConfig}
              remainingPercentage={alcoholPct}
            />
          </div>

          {/* Coadjuvantes / Químicos Aromáticos */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="font-semibold">Coadjuvantes / Químicos Aromáticos</span>
              <span className="text-sm text-muted-foreground ml-auto">
                Total: {formatBrazilianNumber(totalCoadjuvantsPct, 1)}%
              </span>
            </div>
            <CoadjuvantsManager
              coadjuvants={coadjuvants}
              onChange={setCoadjuvants}
            />
          </div>

          {/* Água */}
          <div className="grid grid-cols-1 gap-4">

            {/* Água */}
            <div className="p-3 rounded-lg border bg-muted/30 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                <span className="font-semibold text-sm">Água Deionizada</span>
              </div>
              <div className="space-y-2">
                <Input
                  type="number"
                  value={pctWater}
                  onChange={(e) => setPctWater(Number(e.target.value))}
                  min={0}
                  max={100}
                  step={0.5}
                  placeholder="%"
                />
                <Input
                  type="number"
                  value={waterDensity}
                  onChange={(e) => setWaterDensity(Number(e.target.value))}
                  min={0.5}
                  max={2}
                  step={0.001}
                  placeholder="Densidade"
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
            ⚗️ Calcular Fórmula Avançada
          </Button>
        </CardContent>
      </Card>
      </>
      )}

      {/* Resultados */}
      {result && !showReferenceSelector && (
        <Card>
          <CardHeader>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-purple-400">
                {recipeName || "Sem nome"}
              </h2>
              <p className="text-sm text-muted-foreground">
                Tipo: {CONCENTRATION_TYPES[concentrationType as keyof typeof CONCENTRATION_TYPES]?.name || concentrationType} · 
                Modo: {calculationMode === "volume" ? "Volume (ml)" : "Massa (g)"} · {new Date().toLocaleString("pt-BR")}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {result.warnings.length > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <ul className="list-disc list-inside space-y-1">
                    {result.warnings.map((warning: string, i: number) => (
                      <li key={i}>{warning}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {result.olfactiveProfile && (
              <Card className="bg-purple-500/10 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-sm">🎭 Perfil Olfativo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Família Principal:</span>
                    <span className="font-semibold capitalize">{result.olfactiveProfile.mainFamily}</span>
                  </div>
                  {result.olfactiveProfile.subFamily && (
                    <div className="flex justify-between">
                      <span>Subfamília:</span>
                      <span className="font-semibold capitalize">{result.olfactiveProfile.subFamily}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Score de Fixação:</span>
                    <span className="font-semibold">{result.olfactiveProfile.fixationScore}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duração Estimada:</span>
                    <span className="font-semibold">{result.olfactiveProfile.estimatedDuration}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                ✅ Fórmula calculada com sucesso!
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
                    concentrationType,
                    totalVolume,
                    calculationMode,
                    pctEssence: totalChemicalsPct,
                    pctAlcohol: alcoholPct,
                    pctWater,
                    alcoholGl: baseConfig.alcoholPurity,
                    alcoholDensity: baseConfig.baseType === 'pronta' ? baseConfig.baseDensity : baseConfig.alcoholDensity,
                    formulaType: "quimicos_aromaticos",
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
