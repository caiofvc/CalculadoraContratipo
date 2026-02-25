-- Atualizar tipo de ingrediente para suportar coadjuvantes genéricos
-- Remover constraint antigo
ALTER TABLE recipe_ingredients DROP CONSTRAINT IF EXISTS recipe_ingredients_ingredient_type_check;

-- Adicionar novo constraint com 'coadjuvant' no lugar de 'pg' e 'glycerin'
ALTER TABLE recipe_ingredients 
ADD CONSTRAINT recipe_ingredients_ingredient_type_check 
CHECK (ingredient_type IN ('chemical', 'alcohol', 'coadjuvant', 'water', 'essence', 'carrier_oil'));

-- Adicionar campos para coadjuvantes personalizados
ALTER TABLE recipe_ingredients 
ADD COLUMN IF NOT EXISTS custom_name TEXT,
ADD COLUMN IF NOT EXISTS density DECIMAL(6,4);

-- Comentários
COMMENT ON COLUMN recipe_ingredients.custom_name IS 'Nome personalizado do ingrediente (usado para coadjuvantes)';
COMMENT ON COLUMN recipe_ingredients.density IS 'Densidade usada no cálculo (para rastreabilidade)';

-- Migrar dados existentes de 'pg' e 'glycerin' para 'coadjuvant'
UPDATE recipe_ingredients 
SET ingredient_type = 'coadjuvant', 
    custom_name = CASE 
        WHEN ingredient_type = 'pg' THEN 'Propilenoglicol (PG)'
        WHEN ingredient_type = 'glycerin' THEN 'Glicerina Bi-destilada'
        ELSE custom_name
    END
WHERE ingredient_type IN ('pg', 'glycerin');
