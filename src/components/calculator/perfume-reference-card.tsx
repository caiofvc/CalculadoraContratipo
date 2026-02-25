import { ReferencePerfume } from "@/types/reference-perfume"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface PerfumeReferenceCardProps {
  perfume: ReferencePerfume
  onSelect: (perfume: ReferencePerfume) => void
  onViewDetails: (perfume: ReferencePerfume) => void
}

export function PerfumeReferenceCard({ perfume, onSelect, onViewDetails }: PerfumeReferenceCardProps) {
  const genderColors = {
    masculino: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
    feminino: 'bg-pink-500/10 text-pink-700 dark:text-pink-400',
    unissex: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
  }

  const genderIcons = {
    masculino: '♂',
    feminino: '♀',
    unissex: '⚥',
  }

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {perfume.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {perfume.brand}
                {perfume.yearLaunched && ` • ${perfume.yearLaunched}`}
              </p>
            </div>
            
            {perfume.imageUrl && (
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <img 
                  src={perfume.imageUrl} 
                  alt={perfume.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge className={genderColors[perfume.gender]}>
              {genderIcons[perfume.gender]} {perfume.gender}
            </Badge>
            <Badge variant="outline">
              {perfume.olfactiveFamily}
            </Badge>
            {perfume.concentrationType && (
              <Badge variant="secondary">
                {perfume.concentrationType}
              </Badge>
            )}
          </div>

          {/* Description */}
          {perfume.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {perfume.description}
            </p>
          )}

          {/* Perfumer */}
          {perfume.perfumer && (
            <p className="text-xs text-muted-foreground italic">
              Nariz: {perfume.perfumer}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button 
              onClick={(e) => {
                e.stopPropagation()
                onSelect(perfume)
              }}
              className="flex-1"
              size="sm"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Usar como base
            </Button>
            <Button 
              onClick={(e) => {
                e.stopPropagation()
                onViewDetails(perfume)
              }}
              variant="outline"
              size="sm"
            >
              Ver detalhes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
