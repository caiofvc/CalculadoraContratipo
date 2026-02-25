"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Search, X, Filter } from "lucide-react"
import { useReferencePerfumes, usePerfumeWithNotes } from "@/hooks/use-reference-perfumes"
import { PerfumeReferenceCard } from "./perfume-reference-card"
import { PerfumeReferenceDetail } from "./perfume-reference-detail"
import { ReferencePerfume, ReferencePerfumeWithNotes, Gender } from "@/types/reference-perfume"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface PerfumeReferenceSelectorProps {
  onSelect: (perfume: ReferencePerfumeWithNotes) => void
  onSkip: () => void
}

export function PerfumeReferenceSelector({ onSelect, onSkip }: PerfumeReferenceSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [genderFilter, setGenderFilter] = useState<Gender | 'all'>('all')
  const [selectedPerfumeId, setSelectedPerfumeId] = useState<string | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)

  const { perfumes, loading, error } = useReferencePerfumes({
    query: searchQuery,
    gender: genderFilter,
    sortBy: 'popularity'
  })

  const { perfume: selectedPerfume, loading: loadingDetails } = usePerfumeWithNotes(selectedPerfumeId)

  const handleViewDetails = (perfume: ReferencePerfume) => {
    setSelectedPerfumeId(perfume.id)
    setDetailModalOpen(true)
  }

  const handleUseAsBase = (perfume: ReferencePerfumeWithNotes) => {
    onSelect(perfume)
  }

  const handleQuickSelect = async (perfume: ReferencePerfume) => {
    // Abrir modal de detalhes para o usuário confirmar
    setSelectedPerfumeId(perfume.id)
    setDetailModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            🔍 Quer se inspirar em um perfume existente?
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Selecione um perfume de referência e o sistema preencherá automaticamente a pirâmide olfativa com os químicos aromáticos sugeridos. 
            Você poderá ajustar livremente depois.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Busca */}
          <div className="space-y-2">
            <Label htmlFor="search">Buscar perfume</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Ex: Sauvage, Baccarat Rouge, Aventus..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-9"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gênero</Label>
              <Select value={genderFilter} onValueChange={(value) => setGenderFilter(value as Gender | 'all')}>
                <SelectTrigger id="gender">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="masculino">♂ Masculino</SelectItem>
                  <SelectItem value="feminino">♀ Feminino</SelectItem>
                  <SelectItem value="unissex">⚥ Unissex</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={onSkip}
                className="w-full"
              >
                Pular → Montar do zero
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-sm text-muted-foreground">Carregando perfumes...</p>
        </div>
      ) : error ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      ) : perfumes.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Filter className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              Nenhum perfume encontrado com os filtros atuais.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("")
                setGenderFilter('all')
              }}
              className="mt-4"
            >
              Limpar filtros
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {perfumes.length} perfume{perfumes.length !== 1 ? 's' : ''} encontrado{perfumes.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {perfumes.map((perfume) => (
              <PerfumeReferenceCard
                key={perfume.id}
                perfume={perfume}
                onSelect={handleQuickSelect}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modal de Detalhes */}
      {selectedPerfume && (
        <PerfumeReferenceDetail
          perfume={selectedPerfume}
          open={detailModalOpen}
          onOpenChange={setDetailModalOpen}
          onUseAsBase={handleUseAsBase}
        />
      )}
    </div>
  )
}
