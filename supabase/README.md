# Configuração do Banco de Dados Supabase

## Como Aplicar as Migrations

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto: **haeeysbtgxhaqcqivlml**
3. No menu lateral, vá em **SQL Editor**
4. Execute os arquivos SQL na ordem:

### 1. Schema Inicial (001_initial_schema.sql)

Copie e cole o conteúdo completo do arquivo `migrations/001_initial_schema.sql` no SQL Editor e execute.

Este arquivo cria:
- ✅ Tabela `profiles` (perfis de usuário)
- ✅ Tabela `aromatic_chemicals` (químicos aromáticos)
- ✅ Tabela `recipes` (receitas/formulações)
- ✅ Tabela `recipe_ingredients` (ingredientes das receitas)
- ✅ Tabela `maceration_logs` (logs de maceração)
- ✅ Tabela `user_inventory` (estoque pessoal)
- ✅ Row Level Security (RLS) e Policies
- ✅ Índices de performance
- ✅ Triggers automáticos

### 2. Seed de Químicos (002_seed_chemicals.sql)

Após executar o schema inicial, copie e cole o conteúdo do arquivo `migrations/002_seed_chemicals.sql` e execute.

Este arquivo popula o banco com **38 químicos aromáticos** pré-cadastrados:
- 10 notas de topo (cítricos, florais, herbais)
- 12 notas de coração (florais, especiarias)
- 16 notas de fundo (amadeirados, almíscares, gourmands)

## Verificação

Após executar as migrations, você pode verificar se tudo está correto executando:

```sql
-- Verificar tabelas criadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Verificar químicos inseridos
SELECT COUNT(*) as total_chemicals, olfactive_note
FROM aromatic_chemicals
WHERE is_system = true
GROUP BY olfactive_note;
```

Você deve ver:
- 6 tabelas criadas
- 10 químicos de topo
- 12 químicos de coração
- 16 químicos de fundo

## Troubleshooting

Se encontrar erros:

1. **Erro de permissão**: Certifique-se de estar logado como owner do projeto
2. **Tabela já existe**: Se precisar recriar, execute `DROP TABLE nome_tabela CASCADE;` antes
3. **Erro em trigger**: Verifique se a função `update_updated_at_column()` foi criada corretamente

## Próximos Passos

Após aplicar as migrations, o banco estará pronto para:
- ✅ Autenticação de usuários
- ✅ Salvar receitas
- ✅ Gerenciar químicos personalizados
- ✅ Rastrear maceração
- ✅ Controlar estoque
