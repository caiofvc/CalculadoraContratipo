import Link from "next/link"
import { Heart, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-lg font-semibold">Sobre</h3>
            <p className="text-sm text-muted-foreground">
              Sistema profissional para formulação de perfumes, fragrâncias e contratipos.
              Desenvolvido para perfumistas iniciantes e profissionais.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold">Links Úteis</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Calculadora Simples
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/recipes" className="text-muted-foreground hover:text-foreground transition-colors">
                  Minhas Receitas
                </Link>
              </li>
              <li>
                <Link href="/dashboard/inventory" className="text-muted-foreground hover:text-foreground transition-colors">
                  Meu Estoque
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold">Comunidade</h3>
            <a
              href="https://www.youtube.com/@clubedoscontratipos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Youtube className="h-4 w-4" />
              Clube dos Contratipos
            </a>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Feito com <Heart className="h-4 w-4 fill-red-500 text-red-500" /> para perfumistas
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} Calculadora de Perfumes Profissional. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
