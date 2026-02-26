-- Migration: Add base type fields for Base Pronta / Base Própria feature
-- Created: 2026-02-26
-- Description: Adds fields to support two modes of alcohol/base in formulas:
--              1. Base Pronta (ready-made base from supplier)
--              2. Base Própria (custom base with pure alcohol)

-- Add fields to recipes table
ALTER TABLE recipes 
  ADD COLUMN IF NOT EXISTS base_type TEXT DEFAULT 'propria' 
    CHECK (base_type IN ('pronta', 'propria'));

ALTER TABLE recipes 
  ADD COLUMN IF NOT EXISTS base_name TEXT;

ALTER TABLE recipes 
  ADD COLUMN IF NOT EXISTS alcohol_type TEXT DEFAULT 'cereais';

-- Add fields to recipe_ingredients table
ALTER TABLE recipe_ingredients 
  ADD COLUMN IF NOT EXISTS base_name TEXT;

ALTER TABLE recipe_ingredients 
  ADD COLUMN IF NOT EXISTS alcohol_type TEXT;

-- Add comments for documentation
COMMENT ON COLUMN recipes.base_type IS 'Type of base: pronta (ready-made) or propria (custom with pure alcohol)';
COMMENT ON COLUMN recipes.base_name IS 'Name/brand of ready-made base (only for base_type=pronta)';
COMMENT ON COLUMN recipes.alcohol_type IS 'Type of alcohol used (only for base_type=propria): cereais, etilico, isopropilico, cana, outro';
COMMENT ON COLUMN recipe_ingredients.base_name IS 'Name/brand of ready-made base ingredient';
COMMENT ON COLUMN recipe_ingredients.alcohol_type IS 'Type of alcohol in this ingredient';
