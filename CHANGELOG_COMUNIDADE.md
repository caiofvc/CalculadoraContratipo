# 📝 Changelog - Alterações da Comunidade

## ✅ Implementado (Sessão Atual)

### 1. Coadjuvantes Editáveis ✅

**Problema:** Campos fixos de PG e Glicerina não atendiam às necessidades da comunidade.

**Solução Implementada:**
- ✅ Removidos campos fixos de Propilenoglicol e Glicerina
- ✅ Criado componente `CoadjuvantsManager` com autocomplete
- ✅ Usuário pode adicionar até 4 coadjuvantes personalizados
- ✅ 10 sugestões pré-cadastradas com densidades:
  - Propilenoglicol (PG) - 1.036 g/ml
  - Glicerina Bi-destilada - 1.261 g/ml
  - Propanediol - 1.053 g/ml
  - Citrato de Trietila (TEC) - 1.136 g/ml
  - Polyglyceryl-3 Caprate - 1.050 g/ml
  - Dicaprylyl Carbonate - 0.850 g/ml
  - IPM (Miristato de Isopropila) - 0.853 g/ml
  - Dipropilenoglicol (DPG) - 1.023 g/ml
  - Triacetin (Triacetina) - 1.155 g/ml
  - Álcool Benzílico - 1.045 g/ml
- ✅ Cada coadjuvante tem: Nome (editável), Porcentagem (%), Densidade (g/ml)
- ✅ Aceita nomes personalizados não listados
- ✅ Calculadora Simples atualizada e funcionando

**Arquivos Modificados:**
- `src/lib/data/coadjuvants.ts` - Lista de sugestões
- `src/components/calculator/coadjuvants-manager.tsx` - Componente gerenciador
- `src/components/calculator/simple-calculator.tsx` - Integração
- `src/lib/calculations/perfume-calculator.ts` - Lógica de cálculo
- `src/types/chemical.ts` - Tipo `Coadjuvant`

### 2. Migrations SQL Criadas ✅

**Arquivos Criados:**
- ✅ `009_add_chemical_solid_fields.sql` - Campos para químicos sólidos
- ✅ `010_update_ingredients_coadjuvant.sql` - Suporte a coadjuvantes genéricos
- ✅ `011_remove_fixed_pg_glycerin.sql` - Remoção de campos fixos
- ✅ `012_update_chemical_densities_and_solids.sql` - Densidades corretas + flags

**Mudanças no Schema:**
```sql
-- aromatic_chemicals
+ is_solid BOOLEAN
+ default_dilution_pct DECIMAL(5,2)
+ default_dilution_solvent TEXT

-- recipe_ingredients
+ is_diluted BOOLEAN
+ dilution_pct DECIMAL(5,2)
+ dilution_solvent TEXT
+ real_amount_ml DECIMAL(8,4)
+ custom_name TEXT
+ density DECIMAL(6,4)
- ingredient_type: 'pg' e 'glycerin' → 'coadjuvant'

-- recipes
- pct_pg (removido)
- pct_glycerin (removido)
```

### 3. Densidades Individuais ✅

**Status:** Migrations criadas, aguardando aplicação no Supabase

**Químicos com Densidades Atualizadas:**
- ✅ 10 químicos de Topo
- ✅ 12 químicos de Coração
- ✅ 17 químicos de Fundo
- ✅ 7 químicos marcados como sólidos (Vanilina, Cumarina, Heliotropina, etc.)

### 4. Tipos TypeScript Atualizados ✅

```typescript
// AromaticChemical
+ isSolid?: boolean
+ defaultDilutionPct?: number
+ defaultDilutionSolvent?: string

// ChemicalInFormula
+ isDiluted?: boolean
+ dilutionPct?: number
+ dilutionSolvent?: string
+ realAmountMl?: number

// Novo tipo
+ Coadjuvant { id, name, percentage, density }
```

---

## 🔄 Pendente (Próxima Sessão)

### 5. Calculadora Avançada
- [ ] Substituir campos fixos de PG/Glicerina por `CoadjuvantsManager`
- [ ] Atualizar função `calculateAdvancedFormula`
- [ ] Testar integração com pirâmide olfativa

### 6. Lógica de Diluição para Sólidos
- [ ] Detectar químicos sólidos na seleção
- [ ] Exibir alerta: "⚠️ Este químico é sólido - dilua antes de usar"
- [ ] Campos adicionais: Concentração da diluição (%), Solvente
- [ ] Cálculo ajustado: 1g de Vanilina a 10% = 10ml de solução
- [ ] Mostrar duas linhas na tabela: quantidade pura + quantidade da solução

### 7. Hook useChemicals
- [ ] Atualizar mapeamento para incluir `isSolid`, `defaultDilutionPct`, `defaultDilutionSolvent`
- [ ] Exibir densidade ao lado do nome do químico
- [ ] Hint: "A densidade pode variar por fornecedor. Consulte a FISPQ/SDS"

### 8. Tabela de Resultados
- [ ] Adicionar coluna "Densidade Usada" para rastreabilidade
- [ ] Exibir informações de diluição quando aplicável
- [ ] Formato expandido para sólidos diluídos

---

## 📋 Instruções para Aplicar as Migrations

**⚠️ IMPORTANTE:** Execute as migrations manualmente no Supabase Dashboard (SQL Editor)

### Ordem de Execução:
```bash
1. supabase/migrations/009_add_chemical_solid_fields.sql
2. supabase/migrations/010_update_ingredients_coadjuvant.sql
3. supabase/migrations/011_remove_fixed_pg_glycerin.sql
4. supabase/migrations/012_update_chemical_densities_and_solids.sql
```

### Como Executar:
1. Acesse: https://supabase.com/dashboard/project/haeeysbtgxhaqcqivlml
2. Vá em **SQL Editor**
3. Copie e cole o conteúdo de cada arquivo na ordem
4. Clique em **Run** para cada migration
5. Verifique se não há erros

---

## 🎯 Benefícios das Alterações

### Para Perfumistas:
- ✅ Liberdade total para escolher coadjuvantes
- ✅ Suporte a ingredientes modernos (Propanediol, TEC, etc.)
- ✅ Densidades precisas por químico
- ✅ Cálculos mais exatos em gramas
- ✅ Suporte a químicos sólidos com diluição

### Para o Sistema:
- ✅ Flexibilidade e extensibilidade
- ✅ Rastreabilidade (densidade usada registrada)
- ✅ Conformidade com práticas profissionais
- ✅ Melhor experiência do usuário

---

## 🧪 Testando as Alterações

### Calculadora Simples (Já Funcional):
1. Acesse a aba "Calculadora Simples"
2. Clique em "Adicionar Coadjuvante"
3. Digite ou selecione um coadjuvante (ex: Propanediol)
4. Configure porcentagem e densidade
5. Adicione água se desejar
6. Clique em "Calcular Fórmula"
7. Verifique que o nome personalizado aparece na tabela

### Calculadora Avançada (Pendente):
- Aguardando implementação na próxima sessão

---

## 📊 Estatísticas

- **Migrations criadas:** 4
- **Arquivos modificados:** 6
- **Componentes novos:** 2
- **Tipos atualizados:** 3
- **Sugestões de coadjuvantes:** 10
- **Químicos com densidade atualizada:** 39
- **Químicos sólidos identificados:** 7

---

**Última atualização:** 25/02/2026 17:30
**Status:** Parcialmente implementado - Calculadora Simples funcional
**Próximo passo:** Aplicar migrations e implementar Calculadora Avançada
