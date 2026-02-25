# 📦 Comandos Git - Push para GitHub

## 🚀 Passo a Passo Completo

### 1. Verificar Status do Git

```bash
# Verificar se Git está inicializado
git status

# Se não estiver inicializado, inicializar:
git init
```

### 2. Configurar Repositório Remoto

```bash
# Adicionar repositório remoto do GitHub
git remote add origin https://github.com/caiofvc/CalculadoraContratipo.git

# Verificar se foi adicionado corretamente
git remote -v
```

### 3. Adicionar Todos os Arquivos

```bash
# Adicionar todos os arquivos ao staging
git add .

# Verificar o que será commitado
git status
```

### 4. Fazer Commit Inicial

```bash
# Commit com mensagem descritiva
git commit -m "feat: Calculadora de Perfumes completa

- Calculadora Simples com coadjuvantes editáveis
- Calculadora Avançada com pirâmide olfativa
- Biblioteca de 15 perfumes de referência
- Sistema de busca e filtros
- Preenchimento automático da pirâmide
- Tema dark/light
- Responsivo mobile
- 15 migrations SQL
- 38 químicos aromáticos
- Documentação completa"
```

### 5. Renomear Branch para Main (se necessário)

```bash
# Renomear branch atual para main
git branch -M main
```

### 6. Push para GitHub

```bash
# Push inicial (primeira vez)
git push -u origin main

# Ou se já existir conteúdo no GitHub e quiser forçar:
# git push -u origin main --force
```

---

## 🔄 Comandos para Atualizações Futuras

Após o push inicial, para futuras atualizações:

```bash
# 1. Verificar mudanças
git status

# 2. Adicionar arquivos modificados
git add .

# 3. Commit com mensagem
git commit -m "feat: descrição da mudança"

# 4. Push (já configurado)
git push
```

---

## 📋 Checklist Pré-Push

Antes de fazer o push, verifique:

- [ ] `.env.local` NÃO está sendo commitado (está no .gitignore)
- [ ] `.env.example` ESTÁ sendo commitado (tem as variáveis documentadas)
- [ ] `node_modules/` NÃO está sendo commitado
- [ ] `.next/` NÃO está sendo commitado
- [ ] Todos os arquivos de documentação estão incluídos
- [ ] README.md está atualizado
- [ ] Aplicação compila sem erros (`npm run build`)

---

## 🔍 Verificar o que será Commitado

```bash
# Ver lista de arquivos que serão commitados
git diff --cached --name-only

# Ver diferenças detalhadas
git diff --cached

# Ver tamanho do commit
git count-objects -vH
```

---

## ⚠️ Troubleshooting

### Erro: "remote origin already exists"
```bash
# Remover remote existente
git remote remove origin

# Adicionar novamente
git remote add origin https://github.com/caiofvc/CalculadoraContratipo.git
```

### Erro: "failed to push some refs"
```bash
# Opção 1: Pull primeiro (se houver conteúdo no GitHub)
git pull origin main --rebase

# Opção 2: Force push (CUIDADO: sobrescreve tudo no GitHub)
git push -u origin main --force
```

### Erro: "Permission denied"
```bash
# Configurar credenciais do GitHub
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Ou usar GitHub CLI para autenticar
gh auth login
```

### Arquivos grandes demais
```bash
# Ver tamanho dos arquivos
du -sh *

# Se houver arquivos grandes, adicionar ao .gitignore
echo "arquivo-grande.zip" >> .gitignore
```

---

## 📊 Arquivos que DEVEM ser Commitados

✅ **Código fonte:**
- `src/` (todo o código React/TypeScript)
- `public/` (arquivos estáticos)
- `supabase/` (migrations e seeds)

✅ **Configuração:**
- `package.json`
- `tsconfig.json`
- `next.config.js`
- `tailwind.config.ts`
- `.env.example` ⚠️ (sem credenciais reais)
- `.gitignore`

✅ **Documentação:**
- `README.md`
- `DEPLOY.md`
- `GUIA_DE_TESTE.md`
- `CHANGELOG_COMUNIDADE.md`
- Todos os `.md` na raiz

---

## 🚫 Arquivos que NÃO DEVEM ser Commitados

❌ **Dependências:**
- `node_modules/`
- `.pnp/`

❌ **Build:**
- `.next/`
- `out/`
- `build/`

❌ **Ambiente:**
- `.env.local` ⚠️ (contém credenciais reais)
- `.env.development.local`
- `.env.production.local`

❌ **IDE:**
- `.vscode/` (opcional)
- `.idea/`

❌ **Sistema:**
- `.DS_Store`
- `Thumbs.db`

---

## 🎯 Comandos Úteis

```bash
# Ver histórico de commits
git log --oneline

# Ver branches
git branch -a

# Ver tamanho do repositório
git count-objects -vH

# Limpar cache do Git
git rm -r --cached .
git add .
git commit -m "chore: limpar cache do git"

# Ver último commit
git show

# Desfazer último commit (mantém mudanças)
git reset --soft HEAD~1

# Ver diferenças antes de commitar
git diff
```

---

## ✅ Pronto para Push!

Execute os comandos na ordem:

```bash
git init
git remote add origin https://github.com/caiofvc/CalculadoraContratipo.git
git add .
git commit -m "feat: Calculadora de Perfumes completa"
git branch -M main
git push -u origin main
```

**Tempo estimado:** 2-5 minutos (dependendo da velocidade da internet)

**Tamanho estimado do repositório:** ~50-100 MB
