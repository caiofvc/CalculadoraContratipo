-- Remover campos fixos de PG e Glicerina da tabela recipes
-- Os coadjuvantes agora são armazenados em recipe_ingredients

ALTER TABLE recipes 
DROP COLUMN IF EXISTS pct_pg,
DROP COLUMN IF EXISTS pct_glycerin;

-- Comentário
COMMENT ON TABLE recipes IS 'Receitas de perfumes - coadjuvantes agora são armazenados em recipe_ingredients com tipo coadjuvant';
