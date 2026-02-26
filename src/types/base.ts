export type BaseType = 'pronta' | 'propria'

export type AlcoholType = 'cereais' | 'etilico' | 'isopropilico' | 'cana' | 'outro'

export interface BaseConfig {
  baseType: BaseType
  // Para Base Pronta
  baseName?: string
  baseConcentration?: number // % alcoólica da base pronta
  baseDensity: number
  // Para Base Própria
  alcoholType?: AlcoholType
  alcoholCustomName?: string // quando alcoholType = 'outro'
  alcoholPurity: number // ºGL
  alcoholDensity: number
}

export const ALCOHOL_TYPES = {
  cereais: {
    label: 'Álcool de Cereais',
    density: 0.810,
    defaultPurity: 96.2,
  },
  etilico: {
    label: 'Álcool Etílico (96ºGL)',
    density: 0.810,
    defaultPurity: 96.0,
  },
  isopropilico: {
    label: 'Álcool Isopropílico',
    density: 0.786,
    defaultPurity: 99.5,
  },
  cana: {
    label: 'Álcool de Cana',
    density: 0.810,
    defaultPurity: 96.0,
  },
  outro: {
    label: 'Outro (especificar)',
    density: 0.810,
    defaultPurity: 96.0,
  },
} as const
