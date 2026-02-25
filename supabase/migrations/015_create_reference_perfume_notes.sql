-- Tabela de notas olfativas dos perfumes de referência
CREATE TABLE reference_perfume_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  perfume_id UUID REFERENCES reference_perfumes(id) ON DELETE CASCADE NOT NULL,
  chemical_id UUID REFERENCES aromatic_chemicals(id), -- link com o banco de QAs (pode ser NULL se não houver match)
  olfactive_note TEXT NOT NULL CHECK (olfactive_note IN ('topo', 'coracao', 'fundo')),
  chemical_name TEXT NOT NULL, -- nome descritivo (ex: "Bergamota", "Almíscar Branco")
  suggested_chemical TEXT, -- QA sugerido para replicar (ex: "Limoneno + Acetato de Linalila")
  suggested_pct DECIMAL(5,2), -- % sugerida na composição aromática (base) para o contratipo
  is_key_note BOOLEAN DEFAULT false, -- true = nota assinatura do perfume
  sort_order INTEGER DEFAULT 0, -- ordem de exibição dentro da nota olfativa
  notes TEXT, -- observações adicionais sobre a nota
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Índices para performance
CREATE INDEX idx_ref_notes_perfume ON reference_perfume_notes(perfume_id);
CREATE INDEX idx_ref_notes_chemical ON reference_perfume_notes(chemical_id) WHERE chemical_id IS NOT NULL;
CREATE INDEX idx_ref_notes_olfactive ON reference_perfume_notes(olfactive_note);
CREATE INDEX idx_ref_notes_key ON reference_perfume_notes(is_key_note) WHERE is_key_note = true;

-- RLS: notas de perfumes de referência
ALTER TABLE reference_perfume_notes ENABLE ROW LEVEL SECURITY;

-- Policy: notas de perfumes do sistema são públicas
CREATE POLICY "System reference notes are public" 
  ON reference_perfume_notes 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM reference_perfumes rp 
      WHERE rp.id = perfume_id 
      AND (rp.is_system = true OR rp.user_id = auth.uid())
    )
  );

-- Policy: usuários podem criar notas para seus próprios perfumes
CREATE POLICY "Users can create notes for own perfumes" 
  ON reference_perfume_notes 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM reference_perfumes rp 
      WHERE rp.id = perfume_id 
      AND rp.user_id = auth.uid() 
      AND rp.is_system = false
    )
  );

-- Policy: usuários podem atualizar notas de seus próprios perfumes
CREATE POLICY "Users can update notes for own perfumes" 
  ON reference_perfume_notes 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM reference_perfumes rp 
      WHERE rp.id = perfume_id 
      AND rp.user_id = auth.uid() 
      AND rp.is_system = false
    )
  );

-- Policy: usuários podem deletar notas de seus próprios perfumes
CREATE POLICY "Users can delete notes for own perfumes" 
  ON reference_perfume_notes 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM reference_perfumes rp 
      WHERE rp.id = perfume_id 
      AND rp.user_id = auth.uid() 
      AND rp.is_system = false
    )
  );

-- Comentários para documentação
COMMENT ON TABLE reference_perfume_notes IS 'Notas olfativas e fórmulas de contratipo dos perfumes de referência';
COMMENT ON COLUMN reference_perfume_notes.chemical_name IS 'Nome descritivo da nota (ex: Bergamota, Almíscar Branco)';
COMMENT ON COLUMN reference_perfume_notes.suggested_chemical IS 'Químico aromático sugerido para replicar a nota';
COMMENT ON COLUMN reference_perfume_notes.suggested_pct IS 'Porcentagem sugerida na composição aromática (base), não no perfume final';
COMMENT ON COLUMN reference_perfume_notes.is_key_note IS 'Indica se é uma nota assinatura/característica do perfume';
