-- Adicionar campos para químicos sólidos e diluição
ALTER TABLE aromatic_chemicals 
ADD COLUMN IF NOT EXISTS is_solid BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS default_dilution_pct DECIMAL(5,2),
ADD COLUMN IF NOT EXISTS default_dilution_solvent TEXT;

-- Adicionar campos de diluição em recipe_ingredients
ALTER TABLE recipe_ingredients 
ADD COLUMN IF NOT EXISTS is_diluted BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS dilution_pct DECIMAL(5,2),
ADD COLUMN IF NOT EXISTS dilution_solvent TEXT,
ADD COLUMN IF NOT EXISTS real_amount_ml DECIMAL(8,4);

-- Comentários para documentação
COMMENT ON COLUMN aromatic_chemicals.is_solid IS 'Indica se o químico é sólido em temperatura ambiente';
COMMENT ON COLUMN aromatic_chemicals.default_dilution_pct IS 'Percentual de diluição padrão recomendado (ex: 10 para solução a 10%)';
COMMENT ON COLUMN aromatic_chemicals.default_dilution_solvent IS 'Solvente padrão recomendado (DPG, Álcool, etc.)';

COMMENT ON COLUMN recipe_ingredients.is_diluted IS 'Indica se o ingrediente foi usado em forma diluída';
COMMENT ON COLUMN recipe_ingredients.dilution_pct IS 'Percentual da diluição usada';
COMMENT ON COLUMN recipe_ingredients.dilution_solvent IS 'Solvente usado na diluição';
COMMENT ON COLUMN recipe_ingredients.real_amount_ml IS 'Quantidade real da solução diluída em ml';
