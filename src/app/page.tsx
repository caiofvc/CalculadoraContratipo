import { Footer } from "@/components/layout/footer"
import { SimpleCalculator } from "@/components/calculator/simple-calculator"
import { AdvancedCalculator } from "@/components/calculator/advanced-calculator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Hero com logo */}
        <div className="flex flex-col items-center text-center mb-8">
          <a
            href="https://www.youtube.com/@ClubedosContratipos"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 transition-transform hover:scale-105"
          >
            <img
              src="https://yt3.ggpht.com/8afy2kWNTu08oUBXlSEs0Gv-DOTzkACh1kI87-L0KYXikywx6XtGg5-HOplbsWFZd36SnXV0HQ=s600-c-k-c0x00ffffff-no-rj-rp-mo"
              alt="Clube dos Contratipos"
              className="w-[110px] h-[110px] rounded-full object-cover ring-[3px] ring-purple-500 shadow-[0_0_24px_rgba(167,139,250,0.3)] hover:ring-purple-400 hover:shadow-[0_0_30px_rgba(167,139,250,0.45)] transition-all"
            />
          </a>

          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Calculadora de Perfumes Profissional
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
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
      </main>

      <Footer />
    </div>
  )
}
