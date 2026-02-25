# 🚀 Guia de Deploy - Calculadora de Perfumes

## Deploy na Vercel (Recomendado)

### Pré-requisitos
- Conta no GitHub
- Conta na Vercel (pode usar login do GitHub)
- Projeto Supabase configurado

---

## 📋 Passo a Passo

### 1. Preparar o Repositório GitHub

```bash
# Inicializar Git (se ainda não foi feito)
git init

# Adicionar remote do GitHub
git remote add origin https://github.com/caiofvc/CalculadoraContratipo.git

# Adicionar todos os arquivos
git add .

# Fazer commit inicial
git commit -m "feat: Calculadora de Perfumes completa com biblioteca de referências"

# Push para o GitHub
git branch -M main
git push -u origin main
```

### 2. Deploy na Vercel

#### Opção A: Via Dashboard (Mais Fácil)

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em **"Add New Project"**
4. Selecione o repositório **CalculadoraContratipo**
5. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Clique em **"Deploy"**
7. Aguarde 2-3 minutos
8. ✅ Pronto! Sua aplicação está no ar!

#### Opção B: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login na Vercel
vercel login

# Deploy
vercel

# Seguir as instruções no terminal
# Adicionar as variáveis de ambiente quando solicitado
```

### 3. Configurar Variáveis de Ambiente na Vercel

**No Dashboard da Vercel:**
1. Vá em **Settings** > **Environment Variables**
2. Adicione:

```
NEXT_PUBLIC_SUPABASE_URL = https://haeeysbtgxhaqcqivlml.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = sua_chave_anon_aqui
```

3. Selecione todos os ambientes: Production, Preview, Development
4. Clique em **Save**
5. Faça um novo deploy para aplicar as variáveis

---

## 🔧 Configurações Importantes

### Next.js já está otimizado para Vercel

O projeto usa:
- ✅ Next.js 16 (App Router)
- ✅ React Server Components
- ✅ Otimização automática de imagens
- ✅ Edge Runtime quando possível
- ✅ Tailwind CSS com PostCSS

### Build Command
```bash
npm run build
```

### Output Directory
```
.next
```

### Install Command
```bash
npm install
```

---

## 🗄️ Banco de Dados Supabase

### Migrations já aplicadas:
- ✅ 001-015: Todas as migrations aplicadas
- ✅ Seeds: 38 químicos + 15 perfumes

### Para aplicar em novo projeto Supabase:

```bash
# 1. Criar novo projeto no Supabase
# 2. Copiar URL e ANON_KEY
# 3. Executar migrations na ordem:

# SQL Editor no Supabase Dashboard:
# - Executar 001_initial_schema.sql
# - Executar 002_seed_chemicals.sql
# - ... até 015_create_reference_perfume_notes.sql
# - Executar todos os seeds
```

---

## 🌐 Domínio Personalizado (Opcional)

1. Na Vercel, vá em **Settings** > **Domains**
2. Adicione seu domínio personalizado
3. Configure os DNS conforme instruções
4. Aguarde propagação (até 48h)

---

## 🔍 Verificação Pós-Deploy

Após o deploy, verifique:

- [ ] Página inicial carrega
- [ ] Calculadora Simples funciona
- [ ] Calculadora Avançada funciona
- [ ] Biblioteca de perfumes carrega (15 perfumes)
- [ ] Busca e filtros funcionam
- [ ] Preenchimento automático funciona
- [ ] Tema dark/light funciona
- [ ] Responsivo em mobile

---

## 🐛 Troubleshooting

### Erro: "Failed to fetch"
- Verifique se as variáveis de ambiente estão corretas
- Confirme que o Supabase está acessível
- Verifique RLS policies no Supabase

### Erro: "Build failed"
- Verifique se todas as dependências estão no package.json
- Rode `npm run build` localmente para testar
- Verifique logs de build na Vercel

### Perfumes não carregam
- Confirme que os seeds foram executados no Supabase
- Verifique a tabela `reference_perfumes` no Supabase
- Teste a query SQL diretamente no SQL Editor

---

## 📊 Monitoramento

### Analytics da Vercel
- Acesse **Analytics** no dashboard
- Veja métricas de performance
- Monitore erros em tempo real

### Logs
- Acesse **Deployments** > **Functions**
- Veja logs de cada função serverless
- Identifique erros rapidamente

---

## 🔄 Atualizações Futuras

Para atualizar o site após mudanças:

```bash
# Fazer alterações no código
git add .
git commit -m "feat: descrição da mudança"
git push

# Vercel faz deploy automático!
```

---

## 💡 Dicas de Performance

1. **Imagens**: Use Next.js Image component
2. **Fonts**: Já otimizado com next/font
3. **CSS**: Tailwind já faz purge automático
4. **API**: Supabase tem cache automático
5. **Edge**: Funções leves rodam no Edge

---

## 📞 Suporte

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs

---

**Deploy estimado: 2-3 minutos** ⚡

**Custo: Grátis** (Vercel Hobby Plan + Supabase Free Tier) 🎉
