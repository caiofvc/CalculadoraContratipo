"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search } from "lucide-react"
import { useChemicalsByNote } from "@/hooks/use-chemicals"
import { AromaticChemical } from "@/types/chemical"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ChemicalSelectorProps {
  note: "topo" | "coracao" | "fundo"
  onSelect: (chemical: AromaticChemical) => void
}

export function ChemicalSelector({ note, onSelect }: ChemicalSelectorProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const { chemicals, loading } = useChemicalsByNote(note)

  const filteredChemicals = chemicals.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.olfactiveFamily.toLowerCase().includes(search.toLowerCase()) ||
    c.description?.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (chemical: AromaticChemical) => {
    onSelect(chemical)
    setOpen(false)
    setSearch("")
  }

  const noteLabels = {
    topo: "Topo",
    coracao: "Coração",
    fundo: "Fundo",
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Químico
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Adicionar Químico - Notas de {noteLabels[note]}</DialogTitle>
          <DialogDescription>
            Selecione um químico aromático para adicionar à sua formulação
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, família ou descrição..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Carregando químicos...
            </div>
          ) : filteredChemicals.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum químico encontrado
            </div>
          ) : (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2">
                {filteredChemicals.map((chemical) => (
                  <button
                    key={chemical.id}
                    onClick={() => handleSelect(chemical)}
                    className="w-full text-left p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm">{chemical.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {chemical.olfactiveFamily}
                          </Badge>
                        </div>
                        {chemical.description && (
                          <p className="text-xs text-muted-foreground mb-2">
                            {chemical.description}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                          <span>
                            Dosagem: {chemical.minDosage}–{chemical.maxDosage}%
                          </span>
                          {chemical.ifraLimit && (
                            <span className="text-orange-500">
                              IFRA: max {chemical.ifraLimit}%
                            </span>
                          )}
                          {chemical.casNumber && (
                            <span>CAS: {chemical.casNumber}</span>
                          )}
                        </div>
                      </div>
                      <Plus className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
