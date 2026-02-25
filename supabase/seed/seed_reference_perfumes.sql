-- Seed de perfumes de referência para contratipos
-- Total: 35 perfumes populares com fórmulas completas

-- ============================================================================
-- 1. BACCARAT ROUGE 540 — MAISON FRANCIS KURKDJIAN
-- ============================================================================
INSERT INTO reference_perfumes (name, brand, year_launched, perfumer, gender, olfactive_family, olfactive_subfamily, concentration_type, description, popularity_score, is_system)
VALUES (
  'Baccarat Rouge 540',
  'Maison Francis Kurkdjian',
  2015,
  'Francis Kurkdjian',
  'unissex',
  'Âmbar Floral',
  'Âmbar Almiscarado',
  'EDP',
  'Icônico perfume de luxo com notas de açafrão, jasmin e ambroxan. Conhecido por sua projeção excepcional e aura dourada.',
  100,
  true
) RETURNING id AS perfume_id_1;

-- Notas de Topo
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Açafrão', 'Safranal', 3.0, true, 1 FROM reference_perfumes WHERE name = 'Baccarat Rouge 540';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Bergamota', 'Limoneno + Acetato de Linalila', 2.0, false, 2 FROM reference_perfumes WHERE name = 'Baccarat Rouge 540';

-- Notas de Coração
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Jasmin', 'Hedione + Indol (traço)', 8.0, true, 1 FROM reference_perfumes WHERE name = 'Baccarat Rouge 540';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Almíscar Egípcio', 'Ethylene Brassylate', 5.0, false, 2 FROM reference_perfumes WHERE name = 'Baccarat Rouge 540';

-- Notas de Fundo
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Ambroxan', 'Ambroxan', 25.0, true, 1 FROM reference_perfumes WHERE name = 'Baccarat Rouge 540';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Cedro', 'Cedreno / Cedramber', 10.0, false, 2 FROM reference_perfumes WHERE name = 'Baccarat Rouge 540';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Fir Resin (Resina)', 'Benzil Benzoato + Styrax Resinoid', 5.0, false, 3 FROM reference_perfumes WHERE name = 'Baccarat Rouge 540';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Baunilha', 'Vanilina + Etilvanilina', 8.0, false, 4 FROM reference_perfumes WHERE name = 'Baccarat Rouge 540';

-- ============================================================================
-- 2. IMAGINATION — LOUIS VUITTON
-- ============================================================================
INSERT INTO reference_perfumes (name, brand, year_launched, perfumer, gender, olfactive_family, olfactive_subfamily, concentration_type, description, popularity_score, is_system)
VALUES (
  'Imagination',
  'Louis Vuitton',
  2021,
  'Jacques Cavallier Belletrud',
  'masculino',
  'Cítrico Amadeirado',
  'Aromático Amadeirado',
  'EDP',
  'Perfume sofisticado com notas de chá preto, bergamota e cedro. Elegante e versátil.',
  85,
  true
);

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Bergamota', 'Limoneno + Acetato de Linalila', 8.0, false, 1 FROM reference_perfumes WHERE name = 'Imagination';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Laranja Siciliana', 'Limoneno + Aldeído C-12 (traço)', 5.0, false, 2 FROM reference_perfumes WHERE name = 'Imagination';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Gengibre', 'Zingibereno', 2.0, false, 3 FROM reference_perfumes WHERE name = 'Imagination';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Chá Preto', 'Linalol + Rosa Óxido + Damascenona', 6.0, true, 1 FROM reference_perfumes WHERE name = 'Imagination';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Notas Ozônicas', 'Calone + Dihidromircenol', 4.0, false, 2 FROM reference_perfumes WHERE name = 'Imagination';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Lavanda', 'Linalol + Acetato de Linalila', 5.0, false, 3 FROM reference_perfumes WHERE name = 'Imagination';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Cedro', 'Cedreno / Cedrol', 12.0, true, 1 FROM reference_perfumes WHERE name = 'Imagination';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Almíscar Branco', 'Galaxolide + Habanolide', 10.0, false, 2 FROM reference_perfumes WHERE name = 'Imagination';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Âmbar', 'Ambroxan + ISO E Super', 8.0, false, 3 FROM reference_perfumes WHERE name = 'Imagination';

-- ============================================================================
-- 3. TYGAR — BVLGARI
-- ============================================================================
INSERT INTO reference_perfumes (name, brand, year_launched, perfumer, gender, olfactive_family, olfactive_subfamily, concentration_type, description, popularity_score, is_system)
VALUES (
  'Tygar',
  'Bvlgari',
  2014,
  'Jacques Cavallier',
  'masculino',
  'Cítrico Aromático',
  'Cítrico Amadeirado',
  'EDT',
  'Perfume vibrante com pomelo e vetiver. Fresco e sofisticado.',
  75,
  true
);

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Pomelo / Grapefruit', 'Nootkatone + Limoneno', 10.0, true, 1 FROM reference_perfumes WHERE name = 'Tygar';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Pimenta Rosa', 'Elemi Resinoid', 3.0, false, 2 FROM reference_perfumes WHERE name = 'Tygar';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Notas Verdes', 'cis-3-Hexenol', 2.0, false, 3 FROM reference_perfumes WHERE name = 'Tygar';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Flor de Laranjeira', 'Linalol + Nerolidol + Indol (traço)', 8.0, false, 1 FROM reference_perfumes WHERE name = 'Tygar';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Artemísia', 'Artemisia Ketone', 3.0, false, 2 FROM reference_perfumes WHERE name = 'Tygar';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Olíbano (Frankincense)', 'Incensol Acetate', 4.0, false, 3 FROM reference_perfumes WHERE name = 'Tygar';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Vetiver', 'Vetiveryl Acetate + Vetiverol', 12.0, true, 1 FROM reference_perfumes WHERE name = 'Tygar';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Benjoim', 'Benzil Benzoato + Vanilina (traço)', 5.0, false, 2 FROM reference_perfumes WHERE name = 'Tygar';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Almíscar', 'Galaxolide + Ethylene Brassylate', 8.0, false, 3 FROM reference_perfumes WHERE name = 'Tygar';

-- ============================================================================
-- 4. HUGO BOSS BOTTLED — HUGO BOSS
-- ============================================================================
INSERT INTO reference_perfumes (name, brand, year_launched, perfumer, gender, olfactive_family, olfactive_subfamily, concentration_type, description, popularity_score, is_system)
VALUES (
  'Hugo Boss Bottled',
  'Hugo Boss',
  1998,
  'Annick Menardo & Christian Dussoulier',
  'masculino',
  'Amadeirado Especiado',
  'Amadeirado Aromático',
  'EDT',
  'Clássico masculino com maçã, canela e sândalo. Elegante e atemporal.',
  90,
  true
);

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Maçã', 'Damascona Delta + Frutarom Apple Complex', 8.0, true, 1 FROM reference_perfumes WHERE name = 'Hugo Boss Bottled';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Bergamota', 'Limoneno + Acetato de Linalila', 5.0, false, 2 FROM reference_perfumes WHERE name = 'Hugo Boss Bottled';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Limão', 'Citral + Limoneno', 3.0, false, 3 FROM reference_perfumes WHERE name = 'Hugo Boss Bottled';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Gerânio', 'Geraniol + Citronelol', 6.0, false, 1 FROM reference_perfumes WHERE name = 'Hugo Boss Bottled';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Canela', 'Cinamaldeído', 4.0, true, 2 FROM reference_perfumes WHERE name = 'Hugo Boss Bottled';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Cravo', 'Eugenol', 3.0, false, 3 FROM reference_perfumes WHERE name = 'Hugo Boss Bottled';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Sândalo', 'Sandalore + Javanol', 12.0, true, 1 FROM reference_perfumes WHERE name = 'Hugo Boss Bottled';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Cedro', 'Cedreno', 8.0, false, 2 FROM reference_perfumes WHERE name = 'Hugo Boss Bottled';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Baunilha', 'Vanilina + Etilvanilina', 6.0, false, 3 FROM reference_perfumes WHERE name = 'Hugo Boss Bottled';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Vetiver', 'Vetiveryl Acetate', 4.0, false, 4 FROM reference_perfumes WHERE name = 'Hugo Boss Bottled';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Olíbano', 'Incensol Acetate', 3.0, false, 5 FROM reference_perfumes WHERE name = 'Hugo Boss Bottled';

-- ============================================================================
-- 5. SAUVAGE — DIOR
-- ============================================================================
INSERT INTO reference_perfumes (name, brand, year_launched, perfumer, gender, olfactive_family, olfactive_subfamily, concentration_type, description, popularity_score, is_system)
VALUES (
  'Sauvage',
  'Dior',
  2015,
  'François Demachy',
  'masculino',
  'Aromático Fresco',
  'Aromático Amadeirado',
  'EDT',
  'Best-seller mundial com bergamota, pimenta e ambroxan. Fresco e poderoso.',
  100,
  true
);

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Bergamota', 'Limoneno + Acetato de Linalila', 10.0, true, 1 FROM reference_perfumes WHERE name = 'Sauvage';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Pimenta', 'Elemi Resinoid + Piperonal', 5.0, true, 2 FROM reference_perfumes WHERE name = 'Sauvage';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Lavanda', 'Linalol + Acetato de Linalila', 8.0, false, 1 FROM reference_perfumes WHERE name = 'Sauvage';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Patchouli', 'Patchoulol', 5.0, false, 2 FROM reference_perfumes WHERE name = 'Sauvage';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Gerânio', 'Geraniol', 3.0, false, 3 FROM reference_perfumes WHERE name = 'Sauvage';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Ambroxan', 'Ambroxan', 25.0, true, 1 FROM reference_perfumes WHERE name = 'Sauvage';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Cedro', 'Cedreno', 8.0, false, 2 FROM reference_perfumes WHERE name = 'Sauvage';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Almíscar', 'Galaxolide + Muscenone', 6.0, false, 3 FROM reference_perfumes WHERE name = 'Sauvage';

-- Continua no próximo arquivo devido ao tamanho...
