"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { createClient } from '@/lib/supabase/client'
import { handleNumericInput, parseNumericValue } from '@/lib/utils/number-input'
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Clock, Lock } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

interface MacerationButtonProps {
  recipeName: string
  recipeData: any
  onMacerationStarted: (recipeId: string, startDate: Date, targetDays: number) => void
}

const PRESET_DAYS = [
  { label: "2 sem", days: 14 },
  { label: "30 dias", days: 30 },
  { label: "45 dias", days: 45 },
  { label: "3 meses", days: 90 },
  { label: "6 meses", days: 180 },
  { label: "1 ano", days: 365 },
]

export function MacerationButton({ recipeName, recipeData, onMacerationStarted }: MacerationButtonProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [name, setName] = useState(recipeName || "Sem nome")
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const [targetDays, setTargetDays] = useState(30)
  const [notes, setNotes] = useState("")

  const handleClick = () => {
    if (!user) {
      setShowLoginModal(true)
      return
    }
    
    setName(recipeName || "Sem nome")
    setShowConfigModal(true)
  }

  const handleSaveAndStart = async () => {
    if (!user) return
    
    setLoading(true)
    try {
      const { createClient } = await import("@/lib/supabase/client")
      const supabase = createClient()
      
      // Salvar receita
      const { data: recipe, error: recipeError } = await supabase
        .from("recipes")
        .insert({
          user_id: user.id,
          name,
          description: notes,
          concentration_type: recipeData.concentrationType || "edp",
          total_volume_ml: recipeData.totalVolume,
          calculation_mode: recipeData.calculationMode || "volume",
          pct_essence: recipeData.pctEssence,
          pct_alcohol: recipeData.pctAlcohol,
          pct_water: recipeData.pctWater,
          alcohol_gl: recipeData.alcoholGl,
          alcohol_density: recipeData.alcoholDensity,
          formula_type: recipeData.formulaType || "base_pronta",
          maceration_start_date: startDate,
          maceration_target_days: targetDays,
          maceration_status: "macerando",
          personal_notes: notes,
        } as any)
        .select()
        .single()

      if (recipeError) throw recipeError

      // Salvar ingredientes
      if (recipeData.ingredients && recipeData.ingredients.length > 0) {
        const ingredientsToInsert = recipeData.ingredients.map((ing: any, index: number) => ({
          recipe_id: (recipe as any).id,
          ingredient_type: ing.type || "chemical",
          percentage: ing.percentage,
          amount_ml: ing.volumeMl,
          amount_g: ing.massG,
          amount_drops: ing.drops,
          sort_order: index,
        }))

        const { error: ingredientsError } = await supabase
          .from("recipe_ingredients")
          .insert(ingredientsToInsert as any)

        if (ingredientsError) throw ingredientsError
      }

      // Log inicial de maceração
      const { error: logError } = await supabase
        .from("maceration_logs")
        .insert({
          recipe_id: (recipe as any).id,
          action: "iniciou",
          notes: `Maceração iniciada. Meta: ${targetDays} dias.`,
        } as any)

      if (logError) throw logError

      setShowConfigModal(false)
      onMacerationStarted((recipe as any).id, new Date(startDate), targetDays)
    } catch (error) {
      console.error("Erro ao salvar receita:", error)
      alert("Erro ao iniciar maceração. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outline"
        className="gap-2"
      >
        <Clock className="w-4 h-4" />
        Iniciar Maceração
      </Button>

      {/* Modal de Login Necessário */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Login necessário
            </DialogTitle>
            <DialogDescription>
              Para acompanhar a maceração dos seus perfumes, você precisa ter uma conta.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowLoginModal(false)}>
              Fechar
            </Button>
            <Button onClick={() => router.push("/auth/signup")}>
              Criar conta
            </Button>
            <Button variant="secondary" onClick={() => router.push("/auth/login")}>
              Fazer login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Configuração */}
      <Dialog open={showConfigModal} onOpenChange={setShowConfigModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Iniciar Maceração
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Nome da fragrância */}
            <div className="space-y-2">
              <Label htmlFor="fragrance-name">Nome da fragrância:</Label>
              <Input
                id="fragrance-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Amadeirado Cítrico"
              />
            </div>

            {/* Data de preparo */}
            <div className="space-y-2">
              <Label htmlFor="start-date">Data de preparo:</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* Meta de maceração */}
            <div className="space-y-2">
              <Label htmlFor="target-days">Meta de maceração (dias):</Label>
              <Input
                id="target-days"
                type="text"
                inputMode="decimal"
                value={targetDays}
                onChange={(e) => setTargetDays(parseNumericValue(e.target.value) || 30)}
                className="w-full"
              />
            </div>

            {/* Presets rápidos */}
            <div className="space-y-2">
              <Label>Presets rápidos:</Label>
              <div className="flex flex-wrap gap-2">
                {PRESET_DAYS.map((preset) => (
                  <Button
                    key={preset.days}
                    type="button"
                    variant={targetDays === preset.days ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTargetDays(preset.days)}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Notas pessoais */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notas pessoais (opcional):</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder='Ex: "Primeira tentativa, aumentei Ambroxan"'
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfigModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveAndStart} disabled={loading}>
              {loading ? "Salvando..." : "✅ Salvar e Iniciar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
