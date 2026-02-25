export type OlfactiveNote = 'topo' | 'coracao' | 'fundo'

export type OlfactiveFamily = 
  | 'citrico'
  | 'floral'
  | 'amadeirado'
  | 'oriental'
  | 'especiaria'
  | 'herbal'
  | 'frutal'
  | 'almicar'
  | 'ambar'
  | 'verde'
  | 'aquatico'
  | 'gourmand'
  | 'resinoso'
  | 'animalico'

export interface AromaticChemical {
  id: string
  name: string
  casNumber?: string
  olfactiveFamily: OlfactiveFamily
  olfactiveNote: OlfactiveNote
  description?: string
  minDosage?: number
  maxDosage?: number
  ifraLimit?: number
  density: number
  isSystem: boolean
  userId?: string
  createdAt: string
  // Novos campos para sólidos
  isSolid?: boolean
  defaultDilutionPct?: number
  defaultDilutionSolvent?: string
}

export interface ChemicalInFormula {
  chemical: AromaticChemical
  percentage: number
  amountMl?: number
  amountG?: number
  amountDrops?: number
  // Campos de diluição
  isDiluted?: boolean
  dilutionPct?: number
  dilutionSolvent?: string
  realAmountMl?: number
}

export interface Coadjuvant {
  id?: string
  name: string
  percentage: number
  density: number
}
