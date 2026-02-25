-- Tabela de perfis do usuário
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  nickname TEXT,
  avatar_url TEXT,
  experience_level TEXT CHECK (experience_level IN ('iniciante', 'intermediario', 'avancado', 'profissional')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de químicos aromáticos (banco pré-cadastrado + custom do usuário)
CREATE TABLE aromatic_chemicals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  cas_number TEXT,
  olfactive_family TEXT NOT NULL,
  olfactive_note TEXT NOT NULL CHECK (olfactive_note IN ('topo', 'coracao', 'fundo')),
  description TEXT,
  min_dosage DECIMAL(5,2),
  max_dosage DECIMAL(5,2),
  ifra_limit DECIMAL(5,2),
  density DECIMAL(6,4) DEFAULT 1.000,
  is_system BOOLEAN DEFAULT false,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de receitas/formulações salvas
CREATE TABLE recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  concentration_type TEXT NOT NULL,
  total_volume_ml DECIMAL(8,2) NOT NULL,
  calculation_mode TEXT DEFAULT 'volume' CHECK (calculation_mode IN ('volume', 'massa')),
  
  pct_essence DECIMAL(5,2),
  pct_alcohol DECIMAL(5,2),
  pct_pg DECIMAL(5,2),
  pct_glycerin DECIMAL(5,2),
  pct_water DECIMAL(5,2),
  
  alcohol_gl DECIMAL(5,2),
  alcohol_density DECIMAL(6,4),
  
  olfactive_family_main TEXT,
  olfactive_subfamily TEXT,
  fixation_score INTEGER CHECK (fixation_score BETWEEN 1 AND 10),
  estimated_duration TEXT,
  
  formula_type TEXT DEFAULT 'base_pronta' CHECK (formula_type IN ('base_pronta', 'quimicos_aromaticos')),
  
  maceration_start_date TIMESTAMPTZ,
  maceration_target_days INTEGER DEFAULT 30,
  maceration_status TEXT DEFAULT 'aguardando' CHECK (maceration_status IN ('aguardando', 'macerando', 'pronto', 'arquivado')),
  
  personal_notes TEXT,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de ingredientes de cada receita
CREATE TABLE recipe_ingredients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE NOT NULL,
  chemical_id UUID REFERENCES aromatic_chemicals(id),
  ingredient_type TEXT NOT NULL CHECK (ingredient_type IN ('chemical', 'alcohol', 'pg', 'glycerin', 'water', 'essence', 'carrier_oil')),
  olfactive_note TEXT CHECK (olfactive_note IN ('topo', 'coracao', 'fundo')),
  percentage DECIMAL(5,2) NOT NULL,
  amount_ml DECIMAL(8,4),
  amount_g DECIMAL(8,4),
  amount_drops INTEGER,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de log de maceração
CREATE TABLE maceration_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE NOT NULL,
  log_date TIMESTAMPTZ DEFAULT now(),
  action TEXT NOT NULL,
  notes TEXT,
  smell_rating INTEGER CHECK (smell_rating BETWEEN 1 AND 5),
  photo_url TEXT
);

-- Tabela de químicos do estoque pessoal do usuário
CREATE TABLE user_inventory (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  chemical_id UUID REFERENCES aromatic_chemicals(id),
  custom_name TEXT,
  quantity_ml DECIMAL(8,2),
  purchase_date DATE,
  supplier TEXT,
  batch_number TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE aromatic_chemicals ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE maceration_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_inventory ENABLE ROW LEVEL SECURITY;

-- Policies para profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Policies para aromatic_chemicals
CREATE POLICY "System chemicals visible to all" ON aromatic_chemicals FOR SELECT USING (is_system = true);
CREATE POLICY "Users can see own chemicals" ON aromatic_chemicals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own chemicals" ON aromatic_chemicals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own chemicals" ON aromatic_chemicals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own chemicals" ON aromatic_chemicals FOR DELETE USING (auth.uid() = user_id);

-- Policies para recipes
CREATE POLICY "Users can view own recipes" ON recipes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own recipes" ON recipes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own recipes" ON recipes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own recipes" ON recipes FOR DELETE USING (auth.uid() = user_id);

-- Policies para recipe_ingredients
CREATE POLICY "Users can view own recipe ingredients" ON recipe_ingredients FOR SELECT USING (
  recipe_id IN (SELECT id FROM recipes WHERE user_id = auth.uid())
);
CREATE POLICY "Users can insert own recipe ingredients" ON recipe_ingredients FOR INSERT WITH CHECK (
  recipe_id IN (SELECT id FROM recipes WHERE user_id = auth.uid())
);
CREATE POLICY "Users can update own recipe ingredients" ON recipe_ingredients FOR UPDATE USING (
  recipe_id IN (SELECT id FROM recipes WHERE user_id = auth.uid())
);
CREATE POLICY "Users can delete own recipe ingredients" ON recipe_ingredients FOR DELETE USING (
  recipe_id IN (SELECT id FROM recipes WHERE user_id = auth.uid())
);

-- Policies para maceration_logs
CREATE POLICY "Users can view own maceration logs" ON maceration_logs FOR SELECT USING (
  recipe_id IN (SELECT id FROM recipes WHERE user_id = auth.uid())
);
CREATE POLICY "Users can insert own maceration logs" ON maceration_logs FOR INSERT WITH CHECK (
  recipe_id IN (SELECT id FROM recipes WHERE user_id = auth.uid())
);
CREATE POLICY "Users can update own maceration logs" ON maceration_logs FOR UPDATE USING (
  recipe_id IN (SELECT id FROM recipes WHERE user_id = auth.uid())
);
CREATE POLICY "Users can delete own maceration logs" ON maceration_logs FOR DELETE USING (
  recipe_id IN (SELECT id FROM recipes WHERE user_id = auth.uid())
);

-- Policies para user_inventory
CREATE POLICY "Users can view own inventory" ON user_inventory FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own inventory" ON user_inventory FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own inventory" ON user_inventory FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own inventory" ON user_inventory FOR DELETE USING (auth.uid() = user_id);

-- Índices para performance
CREATE INDEX idx_recipes_user_id ON recipes(user_id);
CREATE INDEX idx_recipes_maceration_status ON recipes(maceration_status);
CREATE INDEX idx_recipe_ingredients_recipe_id ON recipe_ingredients(recipe_id);
CREATE INDEX idx_maceration_logs_recipe_id ON maceration_logs(recipe_id);
CREATE INDEX idx_user_inventory_user_id ON user_inventory(user_id);
CREATE INDEX idx_aromatic_chemicals_is_system ON aromatic_chemicals(is_system);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recipes_updated_at BEFORE UPDATE ON recipes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Função para criar perfil automaticamente após signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, nickname)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'nickname');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
