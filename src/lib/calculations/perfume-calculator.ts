import { CalculationMode, CalculationResult, FormulaIngredient } from '@/types/perfume'
import { ChemicalInFormula, OlfactiveNote, Coadjuvant } from '@/types/chemical'

const DROPS_PER_ML = 20

export interface SimpleCalculatorInput {
  totalVolume: number
  calculationMode: CalculationMode
  pctEssence: number
  pctAlcohol: number
  pctPg: number
  pctGlycerin: number
  pctWater: number
  alcoholGl: number
  alcoholDensity: number
  essenceDensity: number
  pgDensity: number
  glycerinDensity: number
  waterDensity: number
  coadjuvants?: Coadjuvant[] // Novo campo para coadjuvantes dinâmicos
}

export interface AdvancedCalculatorInput {
  totalVolume: number
  calculationMode: CalculationMode
  chemicals: ChemicalInFormula[]
  pctAlcohol: number
  pctPg: number
  pctGlycerin: number
  pctWater: number
  alcoholGl: number
  alcoholDensity: number
  pgDensity: number
  glycerinDensity: number
  waterDensity: number
  coadjuvants?: Coadjuvant[] // Novo campo para coadjuvantes dinâmicos
}

function calculateIngredient(
  name: string,
  percentage: number,
  totalVolume: number,
  density: number,
  color: string,
  olfactiveNote?: OlfactiveNote
): FormulaIngredient {
  const amountMl = (totalVolume * percentage) / 100
  const amountG = amountMl * density
  const amountDrops = Math.round(amountMl * DROPS_PER_ML)

  return {
    name,
    percentage,
    amountMl: Number(amountMl.toFixed(4)),
    amountG: Number(amountG.toFixed(4)),
    amountDrops,
    density,
    color,
    olfactiveNote
  }
}

export function calculateSimpleFormula(input: SimpleCalculatorInput): CalculationResult {
  const warnings: string[] = []
  
  // Calcular total de coadjuvantes
  const totalCoadjuvantsPct = input.coadjuvants?.reduce((sum, c) => sum + c.percentage, 0) || 0
  
  // Validar que soma = 100%
  const totalPct = input.pctEssence + input.pctAlcohol + totalCoadjuvantsPct + input.pctWater
  if (Math.abs(totalPct - 100) > 0.01) {
    warnings.push(`A soma dos percentuais é ${totalPct.toFixed(2)}% (deve ser 100%)`)
  }

  const ingredients: FormulaIngredient[] = []

  // Essência/Óleo Aromático
  if (input.pctEssence > 0) {
    ingredients.push(
      calculateIngredient(
        'Essência/Óleo Aromático',
        input.pctEssence,
        input.totalVolume,
        input.essenceDensity,
        '#9333ea'
      )
    )
  }

  // Álcool de Cereais
  if (input.pctAlcohol > 0) {
    ingredients.push(
      calculateIngredient(
        `Álcool de Cereais ${input.alcoholGl}GL`,
        input.pctAlcohol,
        input.totalVolume,
        input.alcoholDensity,
        '#3b82f6'
      )
    )
  }

  // Coadjuvantes dinâmicos
  if (input.coadjuvants && input.coadjuvants.length > 0) {
    input.coadjuvants.forEach((coadjuvant, index) => {
      if (coadjuvant.percentage > 0) {
        ingredients.push(
          calculateIngredient(
            coadjuvant.name || `Coadjuvante ${index + 1}`,
            coadjuvant.percentage,
            input.totalVolume,
            coadjuvant.density,
            '#10b981' // Verde para coadjuvantes
          )
        )
      }
    })
  }

  // Água Deionizada
  if (input.pctWater > 0) {
    ingredients.push(
      calculateIngredient(
        'Água Deionizada',
        input.pctWater,
        input.totalVolume,
        input.waterDensity,
        '#06b6d4'
      )
    )
  }

  const totalMassG = ingredients.reduce((sum, ing) => sum + ing.amountG, 0)

  return {
    totalVolumeMl: input.totalVolume,
    totalMassG: Number(totalMassG.toFixed(4)),
    ingredients,
    warnings
  }
}

export function calculateAdvancedFormula(input: AdvancedCalculatorInput): CalculationResult {
  const warnings: string[] = []
  const ingredients: FormulaIngredient[] = []

  // Calcular % total dos químicos
  const totalChemicalsPct = input.chemicals.reduce((sum, c) => sum + c.percentage, 0)
  
  // Validar que soma total = 100%
  const totalPct = totalChemicalsPct + input.pctAlcohol + input.pctPg + input.pctGlycerin + input.pctWater
  if (Math.abs(totalPct - 100) > 0.01) {
    warnings.push(`A soma dos percentuais é ${totalPct.toFixed(2)}% (deve ser 100%)`)
  }

  // Organizar químicos por nota olfativa
  const pyramid = {
    topo: [] as FormulaIngredient[],
    coracao: [] as FormulaIngredient[],
    fundo: [] as FormulaIngredient[]
  }

  // Adicionar químicos aromáticos
  input.chemicals.forEach(chemicalInFormula => {
    const chemical = chemicalInFormula.chemical
    const ingredient = calculateIngredient(
      chemical.name,
      chemicalInFormula.percentage,
      input.totalVolume,
      chemical.density,
      getColorByFamily(chemical.olfactiveFamily),
      chemical.olfactiveNote
    )

    ingredients.push(ingredient)

    // Adicionar à pirâmide
    const note = chemical.olfactiveNote as 'topo' | 'coracao' | 'fundo'
    pyramid[note].push(ingredient)

    // Verificar limite IFRA
    if (chemical.ifraLimit && chemicalInFormula.percentage > chemical.ifraLimit) {
      warnings.push(
        `⚠️ ${chemical.name}: ${chemicalInFormula.percentage}% excede o limite IFRA de ${chemical.ifraLimit}%`
      )
    }
  })

  // Adicionar outros ingredientes
  if (input.pctAlcohol > 0) {
    ingredients.push(
      calculateIngredient(
        `Álcool de Cereais ${input.alcoholGl}GL`,
        input.pctAlcohol,
        input.totalVolume,
        input.alcoholDensity,
        '#3b82f6'
      )
    )
  }

  // Processar coadjuvantes dinâmicos (novo sistema)
  if (input.coadjuvants && input.coadjuvants.length > 0) {
    input.coadjuvants.forEach(coadjuvant => {
      if (coadjuvant.percentage > 0) {
        ingredients.push(
          calculateIngredient(
            coadjuvant.name,
            coadjuvant.percentage,
            input.totalVolume,
            coadjuvant.density,
            '#10b981' // Verde para coadjuvantes
          )
        )
      }
    })
  } else {
    // Fallback para sistema antigo (compatibilidade)
    if (input.pctPg > 0) {
      ingredients.push(
        calculateIngredient(
          'Propilenoglicol',
          input.pctPg,
          input.totalVolume,
          input.pgDensity,
          '#10b981'
        )
      )
    }

    if (input.pctGlycerin > 0) {
      ingredients.push(
        calculateIngredient(
          'Glicerina Bi-destilada',
          input.pctGlycerin,
          input.totalVolume,
          input.glycerinDensity,
          '#f59e0b'
        )
      )
    }
  }

  if (input.pctWater > 0) {
    ingredients.push(
      calculateIngredient(
        'Água Deionizada',
        input.pctWater,
        input.totalVolume,
        input.waterDensity,
        '#06b6d4'
      )
    )
  }

  // Validar proporções da pirâmide
  const topoPct = pyramid.topo.reduce((sum, ing) => sum + ing.percentage, 0)
  const coracaoPct = pyramid.coracao.reduce((sum, ing) => sum + ing.percentage, 0)
  const fundoPct = pyramid.fundo.reduce((sum, ing) => sum + ing.percentage, 0)

  if (topoPct > 25) {
    warnings.push(`⚠️ Notas de topo (${topoPct.toFixed(1)}%) acima do recomendado (5-20%)`)
  }
  if (fundoPct < 20 && fundoPct > 0) {
    warnings.push(`⚠️ Notas de fundo (${fundoPct.toFixed(1)}%) abaixo do recomendado (30-60%)`)
  }
  if (coracaoPct < 30 && coracaoPct > 0) {
    warnings.push(`⚠️ Notas de coração (${coracaoPct.toFixed(1)}%) abaixo do recomendado (30-50%)`)
  }

  const totalMassG = ingredients.reduce((sum, ing) => sum + ing.amountG, 0)

  // Calcular perfil olfativo
  const olfactiveProfile = calculateOlfactiveProfile(input.chemicals, pyramid)

  return {
    totalVolumeMl: input.totalVolume,
    totalMassG: Number(totalMassG.toFixed(4)),
    ingredients,
    pyramid,
    warnings,
    olfactiveProfile
  }
}

function getColorByFamily(family: string): string {
  const colorMap: Record<string, string> = {
    citrico: '#fbbf24',
    floral: '#ec4899',
    amadeirado: '#92400e',
    oriental: '#dc2626',
    especiaria: '#ea580c',
    herbal: '#10b981',
    frutal: '#f472b6',
    almicar: '#e5e7eb',
    ambar: '#f59e0b',
    verde: '#22c55e',
    aquatico: '#06b6d4',
    gourmand: '#a855f7',
    resinoso: '#78350f',
    animalico: '#57534e'
  }
  return colorMap[family] || '#9333ea'
}

function calculateOlfactiveProfile(
  chemicals: ChemicalInFormula[],
  pyramid: { topo: FormulaIngredient[]; coracao: FormulaIngredient[]; fundo: FormulaIngredient[] }
) {
  // Contar famílias olfativas
  const familyCount: Record<string, number> = {}
  chemicals.forEach(c => {
    const family = c.chemical.olfactiveFamily
    familyCount[family] = (familyCount[family] || 0) + c.percentage
  })

  // Família principal = maior %
  const mainFamily = Object.entries(familyCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'floral'
  
  // Subfamília = segunda maior
  const subFamily = Object.entries(familyCount).sort((a, b) => b[1] - a[1])[1]?.[0]

  // Score de fixação (1-10) baseado em % de notas de fundo
  const fundoPct = pyramid.fundo.reduce((sum, ing) => sum + ing.percentage, 0)
  const fixationScore = Math.min(10, Math.max(1, Math.round((fundoPct / 10) * 2)))

  // Estimativa de duração
  let estimatedDuration = '2-4 horas'
  if (fundoPct >= 40) estimatedDuration = '8-12 horas'
  else if (fundoPct >= 30) estimatedDuration = '6-8 horas'
  else if (fundoPct >= 20) estimatedDuration = '4-6 horas'

  return {
    mainFamily: mainFamily as any,
    subFamily: subFamily as any,
    fixationScore,
    estimatedDuration
  }
}

export function formatBrazilianNumber(num: number, decimals: number = 2): string {
  return num.toFixed(decimals).replace('.', ',')
}
