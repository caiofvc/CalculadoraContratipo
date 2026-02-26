"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RotateCw, TestTube, CheckCircle, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"

interface MacerationQuickLogProps {
  recipeId: string
  recipeName: string
}

export function MacerationQuickLog({ recipeId, recipeName }: MacerationQuickLogProps) {
  const { toast } = useToast()
  const [showTestModal, setShowTestModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [rating, setRating] = useState(0)
  const [notes, setNotes] = useState("")

  const handleShake = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from("maceration_logs")
        .insert({
          recipe_id: recipeId,
          action: "agitou",
          notes: "Agitação registrada",
        } as any)

      if (error) throw error

      toast({
        title: "Agitação registrada! ✅",
        description: `${recipeName} - ${new Date().toLocaleString('pt-BR')}`,
      })
    } catch (error) {
      console.error("Erro ao registrar agitação:", error)
      toast({
        title: "Erro",
        description: "Não foi possível registrar a agitação.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleTestSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "Avaliação necessária",
        description: "Por favor, selecione uma avaliação de 1 a 5 estrelas.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from("maceration_logs")
        .insert({
          recipe_id: recipeId,
          action: "testou",
          smell_rating: rating,
          notes: notes || "Teste olfativo realizado",
        } as any)

      if (error) throw error

      toast({
        title: "Teste registrado! 👃",
        description: `Avaliação: ${"⭐".repeat(rating)} (${rating}/5)`,
      })

      setShowTestModal(false)
      setRating(0)
      setNotes("")
    } catch (error) {
      console.error("Erro ao registrar teste:", error)
      toast({
        title: "Erro",
        description: "Não foi possível registrar o teste.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleMarkReady = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      
      // Atualizar status da receita
      const { error: updateError } = await (supabase as any)
        .from("recipes")
        .update({ maceration_status: "pronto" })
        .eq("id", recipeId)
      
      if (updateError) throw updateError

      // Registrar log
      const { error: logError } = await (supabase as any)
        .from("maceration_logs")
        .insert({
          recipe_id: recipeId,
          action: "marcou_pronto",
          notes: "Perfume marcado como pronto",
        })

      if (logError) throw logError

      toast({
        title: "Perfume pronto! 🎉",
        description: "Você pode continuar maturando se desejar.",
      })

      setShowConfirmModal(false)
      
      // Recarregar página para atualizar status
      window.location.reload()
    } catch (error) {
      console.error("Erro ao marcar como pronto:", error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <Button
          variant="outline"
          onClick={handleShake}
          disabled={loading}
          className="gap-2"
        >
          <RotateCw className="w-4 h-4" />
          Registrar Agitação
        </Button>

        <Button
          variant="outline"
          onClick={() => setShowTestModal(true)}
          className="gap-2"
        >
          <TestTube className="w-4 h-4" />
          Registrar Teste
        </Button>

        <Button
          variant="outline"
          onClick={() => setShowConfirmModal(true)}
          className="gap-2 border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
        >
          <CheckCircle className="w-4 h-4" />
          Marcar como Pronto
        </Button>
      </div>

      {/* Modal de Teste Olfativo */}
      <Dialog open={showTestModal} onOpenChange={setShowTestModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TestTube className="w-5 h-5" />
              Registrar Teste Olfativo
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Como está o cheiro? (1-5 ⭐)</Label>
              <div className="flex gap-2 justify-center py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-3xl transition-all hover:scale-110"
                  >
                    {star <= rating ? "⭐" : "☆"}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="test-notes">Observações:</Label>
              <Textarea
                id="test-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder='Ex: "Topo ainda muito forte, fundo começando a aparecer"'
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTestModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleTestSubmit} disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmação */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Marcar como pronto?</DialogTitle>
            <DialogDescription>
              Deseja marcar este perfume como pronto? Você pode continuar maturando depois se desejar.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleMarkReady} disabled={loading}>
              {loading ? "Salvando..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
