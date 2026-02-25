import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { SimpleCalculator } from "@/components/calculator/simple-calculator"
import { AdvancedCalculator } from "@/components/calculator/advanced-calculator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Calculadora de Perfumes Profissional
            </h1>
            <p className="text-muted-foreground">
              Calcule sua fórmula com precisão — álcool ajustado automaticamente
            </p>
          </div>

          <Tabs defaultValue="simples" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="simples">Calculadora Simples</TabsTrigger>
              <TabsTrigger value="avancada">
                Formulação Avançada
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="simples" className="mt-6">
              <SimpleCalculator />
            </TabsContent>
            
            <TabsContent value="avancada" className="mt-6">
              <AdvancedCalculator />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
