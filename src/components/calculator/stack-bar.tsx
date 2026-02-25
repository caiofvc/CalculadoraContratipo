import { FormulaIngredient } from "@/types/perfume"

interface StackBarProps {
  ingredients: FormulaIngredient[]
}

export function StackBar({ ingredients }: StackBarProps) {
  return (
    <div className="flex h-5 rounded-full overflow-hidden bg-border">
      {ingredients.map((ingredient, index) => (
        <div
          key={index}
          className="transition-all duration-500 ease-in-out"
          style={{
            flex: ingredient.percentage,
            background: ingredient.color,
          }}
          title={`${ingredient.name}: ${ingredient.percentage.toFixed(1)}%`}
        />
      ))}
    </div>
  )
}
