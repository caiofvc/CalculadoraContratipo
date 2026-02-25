export type Gender = 'masculino' | 'feminino' | 'unissex'
export type OlfactiveNoteType = 'topo' | 'coracao' | 'fundo'

export interface ReferencePerfume {
  id: string
  name: string
  brand: string
  yearLaunched?: number
  perfumer?: string
  gender: Gender
  olfactiveFamily: string
  olfactiveSubfamily?: string
  concentrationType?: string
  description?: string
  imageUrl?: string
  popularityScore: number
  isActive: boolean
  isSystem: boolean
  userId?: string
  createdAt: string
  updatedAt: string
}

export interface ReferencePerfumeNote {
  id: string
  perfumeId: string
  chemicalId?: string
  olfactiveNote: OlfactiveNoteType
  chemicalName: string
  suggestedChemical: string
  suggestedPct: number
  isKeyNote: boolean
  sortOrder: number
  notes?: string
  createdAt: string
}

export interface ReferencePerfumeWithNotes extends ReferencePerfume {
  notes: {
    topo: ReferencePerfumeNote[]
    coracao: ReferencePerfumeNote[]
    fundo: ReferencePerfumeNote[]
  }
}

export interface PerfumeSearchFilters {
  query?: string
  gender?: Gender | 'all'
  olfactiveFamily?: string
  brand?: string
  sortBy?: 'popularity' | 'name' | 'year'
}
