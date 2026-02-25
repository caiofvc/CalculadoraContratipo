-- Tabela de perfumes de referência para contratipos
CREATE TABLE reference_perfumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  year_launched INTEGER,
  perfumer TEXT, -- nariz criador
  gender TEXT CHECK (gender IN ('masculino', 'feminino', 'unissex')),
  olfactive_family TEXT NOT NULL, -- Amadeirado, Floral, Oriental, Cítrico, etc.
  olfactive_subfamily TEXT, -- Amadeirado Especiado, Floral Frutal, etc.
  concentration_type TEXT, -- EDT, EDP, Parfum, etc.
  description TEXT,
  image_url TEXT, -- opcional, imagem do frasco
  popularity_score INTEGER DEFAULT 0, -- para ordenar os mais buscados
  is_active BOOLEAN DEFAULT true,
  is_system BOOLEAN DEFAULT true, -- true = perfume do sistema, false = custom do usuário
  user_id UUID REFERENCES auth.users(id), -- NULL para perfumes do sistema
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Índices para busca eficiente
CREATE INDEX idx_ref_perfumes_name ON reference_perfumes USING gin(to_tsvector('portuguese', name));
CREATE INDEX idx_ref_perfumes_brand ON reference_perfumes USING gin(to_tsvector('portuguese', brand));
CREATE INDEX idx_ref_perfumes_family ON reference_perfumes(olfactive_family);
CREATE INDEX idx_ref_perfumes_gender ON reference_perfumes(gender);
CREATE INDEX idx_ref_perfumes_popularity ON reference_perfumes(popularity_score DESC);
CREATE INDEX idx_ref_perfumes_user ON reference_perfumes(user_id) WHERE user_id IS NOT NULL;

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_reference_perfumes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_reference_perfumes_updated_at
  BEFORE UPDATE ON reference_perfumes
  FOR EACH ROW
  EXECUTE FUNCTION update_reference_perfumes_updated_at();

-- RLS: perfumes de referência
ALTER TABLE reference_perfumes ENABLE ROW LEVEL SECURITY;

-- Policy: perfumes do sistema são públicos (leitura para todos)
CREATE POLICY "System reference perfumes are public" 
  ON reference_perfumes 
  FOR SELECT 
  USING (is_system = true OR auth.uid() = user_id);

-- Policy: usuários podem criar seus próprios perfumes de referência
CREATE POLICY "Users can create own reference perfumes" 
  ON reference_perfumes 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id AND is_system = false);

-- Policy: usuários podem atualizar seus próprios perfumes
CREATE POLICY "Users can update own reference perfumes" 
  ON reference_perfumes 
  FOR UPDATE 
  USING (auth.uid() = user_id AND is_system = false);

-- Policy: usuários podem deletar seus próprios perfumes
CREATE POLICY "Users can delete own reference perfumes" 
  ON reference_perfumes 
  FOR DELETE 
  USING (auth.uid() = user_id AND is_system = false);

-- Comentários para documentação
COMMENT ON TABLE reference_perfumes IS 'Biblioteca de perfumes de referência para criação de contratipos';
COMMENT ON COLUMN reference_perfumes.name IS 'Nome do perfume';
COMMENT ON COLUMN reference_perfumes.brand IS 'Marca/Casa de perfumaria';
COMMENT ON COLUMN reference_perfumes.perfumer IS 'Nariz criador do perfume';
COMMENT ON COLUMN reference_perfumes.olfactive_family IS 'Família olfativa principal';
COMMENT ON COLUMN reference_perfumes.popularity_score IS 'Score de popularidade para ordenação (maior = mais popular)';
COMMENT ON COLUMN reference_perfumes.is_system IS 'true = perfume do sistema, false = custom do usuário';
