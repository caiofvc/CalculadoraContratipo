import { FormulaIngredient, CalculationMode } from "@/types/perfume"
import { formatBrazilianNumber } from "@/lib/calculations/perfume-calculator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface ResultsTableProps {
  ingredients: FormulaIngredient[]
  calculationMode: CalculationMode
  totalVolumeMl: number
  totalMassG: number
}

export function ResultsTable({ ingredients, calculationMode, totalVolumeMl, totalMassG }: ResultsTableProps) {
  const unitPrimary = calculationMode === "volume" ? "ml" : "g"
  const unitSecondary = calculationMode === "volume" ? "g" : "ml"
  const totalPrimary = calculationMode === "volume" ? totalVolumeMl : totalMassG
  const totalSecondary = calculationMode === "volume" ? totalMassG : totalVolumeMl
  const totalPct = ingredients.reduce((sum, ing) => sum + ing.percentage, 0)

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ingrediente</TableHead>
            <TableHead>%</TableHead>
            <TableHead>{calculationMode === "volume" ? "Volume (ml)" : "Massa (g)"}</TableHead>
            <TableHead>{calculationMode === "volume" ? "Massa (g)" : "Volume (ml)"}</TableHead>
            <TableHead>Barra</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ingredients.map((ingredient, index) => {
            const primaryQty = calculationMode === "volume" ? ingredient.amountMl : ingredient.amountG
            const secondaryQty = calculationMode === "volume" ? ingredient.amountG : ingredient.amountMl

            return (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ background: ingredient.color }}
                    />
                    <span className="font-medium">{ingredient.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <strong>{formatBrazilianNumber(ingredient.percentage, 1)}%</strong>
                </TableCell>
                <TableCell>
                  <strong>{formatBrazilianNumber(primaryQty, 1)} {unitPrimary}</strong>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {formatBrazilianNumber(secondaryQty, 2)} {unitSecondary}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="w-20 h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(ingredient.percentage, 100)}%`,
                        background: ingredient.color,
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow className="font-bold">
            <TableCell>TOTAL</TableCell>
            <TableCell>
              {formatBrazilianNumber(totalPct, 1)}% <Badge variant="default" className="ml-2">✓</Badge>
            </TableCell>
            <TableCell>{formatBrazilianNumber(totalPrimary, 1)} {unitPrimary}</TableCell>
            <TableCell>
              <span className="text-sm text-muted-foreground">
                {formatBrazilianNumber(totalSecondary, 2)} {unitSecondary}
              </span>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
