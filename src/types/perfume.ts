import { OlfactiveFamily, OlfactiveNote } from './chemical'

export type CalculationMode = 'volume' | 'massa'

export type ConcentrationType = 
  | 'eau_fraiche'
  | 'splash'
  | 'edc'
  | 'edt'
  | 'edp'
  | 'parfum'
  | 'parfum_absolut'
  | 'perfume_oil'
  | 'attar'
  | 'body_mist'
  | 'brume'

export type FormulaType = 'base_pronta' | 'quimicos_aromaticos'

export type MacerationStatus = 'aguardando' | 'macerando' | 'pronto' | 'arquivado'

export interface ConcentrationConfig {
  type: ConcentrationType
  name: string
  essenceMin: number
  essenceMax: number
  alcoholMin: number
  alcoholMax: number
  waterMin: number
  waterMax: number
  description: string
}

export interface IngredientConfig {
  name: string
  density: number
  color: string
}

export interface FormulaIngredient {
  name: string
  percentage: number
  amountMl: number
  amountG: number
  amountDrops: number
  density: number
  color: string
  olfactiveNote?: OlfactiveNote
  olfactiveFamily?: OlfactiveFamily
}

export interface CalculationResult {
  totalVolumeMl: number
  totalMassG: number
  ingredients: FormulaIngredient[]
  pyramid?: {
    topo: FormulaIngredient[]
    coracao: FormulaIngredient[]
    fundo: FormulaIngredient[]
  }
  warnings: string[]
  olfactiveProfile?: {
    mainFamily: OlfactiveFamily
    subFamily?: OlfactiveFamily
    fixationScore: number
    estimatedDuration: string
  }
}

export interface Recipe {
  id: string
  userId: string
  name: string
  description?: string
  concentrationType: string
  totalVolumeMl: number
  calculationMode: CalculationMode
  pctEssence?: number
  pctAlcohol?: number
  pctPg?: number
  pctGlycerin?: number
  pctWater?: number
  alcoholGl?: number
  alcoholDensity?: number
  olfactiveFamilyMain?: string
  olfactiveSubfamily?: string
  fixationScore?: number
  estimatedDuration?: string
  formulaType: FormulaType
  macerationStartDate?: string
  macerationTargetDays: number
  macerationStatus: MacerationStatus
  personalNotes?: string
  rating?: number
  isFavorite: boolean
  createdAt: string
  updatedAt: string
}
