# 🧪 Calculadora de Perfumes - Contratipo Profissional

Sistema completo e profissional para cálculo de fórmulas de perfumaria com biblioteca de referências, pirâmide olfativa, coadjuvantes editáveis e muito mais.

## ✨ Funcionalidades
- Tabela de resultados com barra visual empilhada
- Conversão automática ml ↔ g ↔ gotas
- Funções de **Imprimir/PDF** e **Copiar receita**
- Formatação brasileira (vírgula decimal)

### ✅ Calculadora Avançada (Formulação com Químicos Aromáticos)
- **Pirâmide Olfativa** completa:
  - 🌬️ **Notas de Topo** (5-20% da composição, duração 15min-2h)
  - 💐 **Notas de Coração** (30-50% da composição, duração 2h-6h)
  - 🪵 **Notas de Fundo** (30-60% da composição, duração 6h-24h+)
- **38 químicos aromáticos pré-cadastrados** do Supabase
- Seletor de químicos com busca por nome, família ou descrição
- Validação de **limites IFRA** com alertas visuais
- Dosagens recomendadas para cada químico
- **11 tipos de concentração** pré-configurados:
  - Eau Fraîche, Splash, EDC, EDT, EDP, Parfum, Parfum Absolut, Perfume Oil, Attar, Body Mist, Brume
- **Perfil Olfativo Automático**:
  - Família olfativa principal e subfamília
  - Score de fixação (1-10)
  - Estimativa de duração
- Alertas de proporções desbalanceadas
- Cálculo preciso com densidades individuais

### ✅ Interface e UX
- **Tema Dark/Light** com toggle
- Design **mobile-first** responsivo
- Componentes **Shadcn/UI** com Tailwind CSS
- Navbar com logo e menu do usuário
- Footer com links úteis
- Link para o canal **Clube dos Contratipos** no YouTube
- Identidade visual roxa/violeta

### ✅ Backend e Banco de Dados
- **Supabase** configurado (Auth + Database + Storage)
- **PostgreSQL** com Row Level Security (RLS)
- 6 tabelas principais:
  - `profiles` - Perfis de usuário
  - `aromatic_chemicals` - Químicos aromáticos (sistema + custom)
  - `recipes` - Receitas/formulações salvas
  - `recipe_ingredients` - Ingredientes de cada receita
  - `maceration_logs` - Logs de maceração
  - `user_inventory` - Estoque pessoal
- Migrations aplicadas e banco populado

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js 18+ instalado
- Conta no Supabase (gratuita)

### 1. Clone e Instale

```bash
cd perfume-calculator
npm install
```

### 2. Configure as Variáveis de Ambiente

O arquivo `.env.local` já está configurado com:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_chave_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
```

### 3. Execute as Migrations no Supabase

1. Acesse o [Supabase Dashboard]
2. Vá em **SQL Editor**
3. Execute os arquivos na ordem:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_seed_chemicals.sql`

Veja instruções detalhadas em: `supabase/README.md`

### 4. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### 5. Build para Produção

```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout raiz com tema
│   └── page.tsx                 # Página principal
├── components/
│   ├── ui/                      # Componentes Shadcn/UI
│   ├── layout/                  # Navbar e Footer
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   ├── calculator/              # Componentes da calculadora
│   │   ├── simple-calculator.tsx
│   │   ├── advanced-calculator.tsx
│   │   ├── pyramid-builder.tsx
│   │   ├── chemical-selector.tsx
│   │   ├── results-table.tsx
│   │   └── stack-bar.tsx
│   └── theme-provider.tsx       # Provider de tema dark/light
├── lib/
│   ├── calculations/            # Lógica de cálculos
│   │   └── perfume-calculator.ts
│   ├── data/                    # Dados padrão
│   │   └── default-chemicals.ts
│   └── supabase/                # Clientes Supabase
│       ├── client.ts
│       ├── server.ts
│       └── middleware.ts
├── hooks/
│   └── use-chemicals.ts         # Hook para buscar químicos
├── types/
│   ├── database.ts              # Tipos do Supabase
│   ├── chemical.ts              # Tipos de químicos
│   └── perfume.ts               # Tipos de perfumes
└── middleware.ts                # Middleware de autenticação
```

## 🎯 Próximas Funcionalidades

- [ ] Sistema de autenticação (login/registro + Google OAuth)
- [ ] Salvar/editar/deletar receitas
- [ ] Dashboard com histórico de produções
- [ ] Tracker de maceração com timeline e logs
- [ ] Gerador dinâmico de Modo de Preparo
- [ ] Sistema de gestão de estoque pessoal
- [ ] PWA (Progressive Web App)

## 🛠️ Stack Tecnológica

- **Framework:** Next.js 14+ (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Componentes:** Shadcn/UI
- **Backend:** Supabase (Auth + Database + Storage)
- **Banco de Dados:** PostgreSQL
- **Deploy:** Vercel (recomendado)

## 📚 Conhecimento Técnico

Este projeto combina:
- **Desenvolvimento Full-Stack** moderno
- **Química Aromática** profissional (ISIPCA)
- **Perfumaria** técnica e artística

## 🎨 Design

- Tema dark/light
- Identidade visual roxa/violeta
- Mobile-first responsivo
- Acessibilidade (WCAG)

## 📄 Licença

Projeto desenvolvido para o **Clube dos Contratipos**.

## 🔗 Links

- [Canal no YouTube - Clube dos Contratipos](https://www.youtube.com/@clubedoscontratipos)
- [Supabase Dashboard](https://supabase.com/dashboard)
- [Next.js Docs](https://nextjs.org/docs)

---

**Desenvolvido com 💜 para perfumistas**
