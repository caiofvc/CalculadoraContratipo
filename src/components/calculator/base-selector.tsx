'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BaseType, AlcoholType, BaseConfig, ALCOHOL_TYPES } from "@/types/base"
import { Info } from "lucide-react"
import { handleNumericInput, parseNumericValue } from "@/lib/utils/number-input"

interface BaseSelectorProps {
  config: BaseConfig
  onChange: (config: BaseConfig) => void
  remainingPercentage: number
}

export function BaseSelector({ config, onChange, remainingPercentage }: BaseSelectorProps) {
  const handleBaseTypeChange = (baseType: BaseType) => {
    onChange({
      ...config,
      baseType,
    })
  }

  const handleAlcoholTypeChange = (alcoholType: AlcoholType) => {
    const alcoholData = ALCOHOL_TYPES[alcoholType]
    onChange({
      ...config,
      alcoholType,
      alcoholDensity: alcoholData.density,
      alcoholPurity: alcoholData.defaultPurity,
      alcoholCustomName: alcoholType === 'outro' ? config.alcoholCustomName : undefined,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🍶 BASE / VEÍCULO
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Toggle Base Pronta / Base Própria */}
        <div className="flex gap-2">
          <button
            onClick={() => handleBaseTypeChange('pronta')}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
              config.baseType === 'pronta'
                ? 'border-primary bg-primary/10 font-semibold'
                : 'border-muted hover:border-primary/50'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">🧴</div>
              <div>Base Pronta</div>
            </div>
          </button>
          <button
            onClick={() => handleBaseTypeChange('propria')}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
              config.baseType === 'propria'
                ? 'border-primary bg-primary/10 font-semibold'
                : 'border-muted hover:border-primary/50'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">🧪</div>
              <div>Base Própria</div>
            </div>
          </button>
        </div>

        <div className="border-t pt-4">
          {config.baseType === 'pronta' ? (
            /* Modo Base Pronta */
            <div className="space-y-4">
              <div>
                <Label htmlFor="baseName">Nome / Marca da base</Label>
                <Input
                  id="baseName"
                  placeholder="Ex: Essência Fina, Base Álcool 80/20..."
                  value={config.baseName || ''}
                  onChange={(e) => onChange({ ...config, baseName: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="baseConcentration">Concentração da base (%)</Label>
                  <Input
                    id="baseConcentration"
                    type="text"
                    inputMode="decimal"
                    placeholder="Ex: 80"
                    step="0.1"
                    value={config.baseConcentration || ''}
                    onChange={(e) => onChange({ ...config, baseConcentration: parseFloat(e.target.value) || undefined })}
                  />
                </div>
                <div>
                  <Label htmlFor="baseDensity">Densidade (g/ml)</Label>
                  <Input
                    id="baseDensity"
                    type="text"
                    inputMode="decimal"
                    value={config.baseDensity}
                    onChange={(e) => onChange({ ...config, baseDensity: parseFloat(e.target.value) || 0.850 })}
                  />
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <div className="flex gap-2 text-sm text-blue-900 dark:text-blue-100">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">A base pronta já contém álcool + fixadores.</p>
                    <p className="text-blue-700 dark:text-blue-300">Informe apenas a concentração alcoólica da base.</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">🍶 Base restante na fórmula:</span>
                  <span className="text-2xl font-bold text-primary">{remainingPercentage.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          ) : (
            /* Modo Base Própria */
            <div className="space-y-4">
              <div>
                <Label htmlFor="alcoholType">Tipo de álcool</Label>
                <Select
                  value={config.alcoholType || 'cereais'}
                  onValueChange={(value) => handleAlcoholTypeChange(value as AlcoholType)}
                >
                  <SelectTrigger id="alcoholType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ALCOHOL_TYPES).map(([key, data]) => (
                      <SelectItem key={key} value={key}>
                        {data.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {config.alcoholType === 'outro' && (
                <div>
                  <Label htmlFor="alcoholCustomName">Nome do álcool</Label>
                  <Input
                    id="alcoholCustomName"
                    placeholder="Especifique o tipo de álcool"
                    value={config.alcoholCustomName || ''}
                    onChange={(e) => onChange({ ...config, alcoholCustomName: e.target.value })}
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="alcoholPurity">Pureza (ºGL)</Label>
                  <Input
                    id="alcoholPurity"
                    type="text"
                    inputMode="decimal"
                    value={config.alcoholPurity}
                    onChange={(e) => onChange({ ...config, alcoholPurity: parseFloat(e.target.value) || 96.2 })}
                  />
                </div>
                <div>
                  <Label htmlFor="alcoholDensity">Densidade (g/ml)</Label>
                  <Input
                    id="alcoholDensity"
                    type="text"
                    inputMode="decimal"
                    value={config.alcoholDensity}
                    onChange={(e) => onChange({ ...config, alcoholDensity: parseFloat(e.target.value) || 0.810 })}
                  />
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>⚡</span>
                    <span>Calculado automaticamente</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">🧪 Álcool restante na fórmula:</span>
                    <span className="text-2xl font-bold text-primary">{remainingPercentage.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
