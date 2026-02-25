-- Continuação do seed de perfumes de referência (Perfumes 16-25)

-- ============================================================================
-- 16. DIOR HOMME INTENSE — DIOR
-- ============================================================================
INSERT INTO reference_perfumes (name, brand, year_launched, perfumer, gender, olfactive_family, olfactive_subfamily, concentration_type, description, popularity_score, is_system)
VALUES (
  'Dior Homme Intense',
  'Dior',
  2011,
  'François Demachy',
  'masculino',
  'Floral Amadeirado',
  'Amadeirado Floral',
  'EDP',
  'Perfume sofisticado com iris, lavanda e cedro. Elegante e sensual.',
  85,
  true
);

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Lavanda', 'Linalol + Acetato de Linalila', 8.0, false, 1 FROM reference_perfumes WHERE name = 'Dior Homme Intense';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Bergamota', 'Limoneno + Acetato de Linalila', 5.0, false, 2 FROM reference_perfumes WHERE name = 'Dior Homme Intense';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Iris', 'Metilionona (Irisone) + Ionona Alpha', 15.0, true, 1 FROM reference_perfumes WHERE name = 'Dior Homme Intense';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Patchouli', 'Patchoulol', 6.0, false, 2 FROM reference_perfumes WHERE name = 'Dior Homme Intense';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Ambrette', 'Ambrettolide', 4.0, false, 3 FROM reference_perfumes WHERE name = 'Dior Homme Intense';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Cedro', 'Cedreno + Cedramber', 12.0, true, 1 FROM reference_perfumes WHERE name = 'Dior Homme Intense';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Vetiver', 'Vetiveryl Acetate', 8.0, false, 2 FROM reference_perfumes WHERE name = 'Dior Homme Intense';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Almíscar', 'Galaxolide + Habanolide', 10.0, false, 3 FROM reference_perfumes WHERE name = 'Dior Homme Intense';

-- ============================================================================
-- 17. TOM FORD NOIR EXTREME — TOM FORD
-- ============================================================================
INSERT INTO reference_perfumes (name, brand, year_launched, perfumer, gender, olfactive_family, olfactive_subfamily, concentration_type, description, popularity_score, is_system)
VALUES (
  'Tom Ford Noir Extreme',
  'Tom Ford',
  2015,
  'Sonia Constant',
  'masculino',
  'Oriental Amadeirado',
  'Oriental Especiado',
  'EDP',
  'Perfume luxuoso com cardamomo, baunilha e âmbar. Intenso e sedutor.',
  80,
  true
);

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Cardamomo', 'Eucaliptol + Terpineol', 6.0, true, 1 FROM reference_perfumes WHERE name = 'Tom Ford Noir Extreme';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Néroli', 'Linalol + Nerolidol', 4.0, false, 2 FROM reference_perfumes WHERE name = 'Tom Ford Noir Extreme';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Mandarina', 'Limoneno + Dimetil Antranilato', 3.0, false, 3 FROM reference_perfumes WHERE name = 'Tom Ford Noir Extreme';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Kulfi (Especiarias)', 'Cumarina + Cinamaldeído', 8.0, true, 1 FROM reference_perfumes WHERE name = 'Tom Ford Noir Extreme';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Rosa', 'Álcool Feniletílico + Geraniol', 5.0, false, 2 FROM reference_perfumes WHERE name = 'Tom Ford Noir Extreme';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Jasmin', 'Hedione', 4.0, false, 3 FROM reference_perfumes WHERE name = 'Tom Ford Noir Extreme';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Baunilha', 'Vanilina + Etilvanilina', 12.0, true, 1 FROM reference_perfumes WHERE name = 'Tom Ford Noir Extreme';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Âmbar', 'Ambroxan + Benzil Benzoato', 10.0, true, 2 FROM reference_perfumes WHERE name = 'Tom Ford Noir Extreme';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Sândalo', 'Sandalore + Javanol', 8.0, false, 3 FROM reference_perfumes WHERE name = 'Tom Ford Noir Extreme';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Madeira', 'ISO E Super + Cedreno', 6.0, false, 4 FROM reference_perfumes WHERE name = 'Tom Ford Noir Extreme';

-- ============================================================================
-- 18. YVES SAINT LAURENT Y — YSL
-- ============================================================================
INSERT INTO reference_perfumes (name, brand, year_launched, perfumer, gender, olfactive_family, olfactive_subfamily, concentration_type, description, popularity_score, is_system)
VALUES (
  'Yves Saint Laurent Y',
  'Yves Saint Laurent',
  2017,
  'Dominique Ropion',
  'masculino',
  'Aromático Fougère',
  'Aromático Fresco',
  'EDP',
  'Perfume moderno com bergamota, sálvia e cedro. Fresco e masculino.',
  85,
  true
);

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Bergamota', 'Limoneno + Acetato de Linalila', 10.0, true, 1 FROM reference_perfumes WHERE name = 'Yves Saint Laurent Y';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Gengibre', 'Zingibereno', 4.0, false, 2 FROM reference_perfumes WHERE name = 'Yves Saint Laurent Y';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Aldeídos', 'Aldeído C-12 + Aldeído C-10', 3.0, false, 3 FROM reference_perfumes WHERE name = 'Yves Saint Laurent Y';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Sálvia', 'Linalol + Eucaliptol', 8.0, true, 1 FROM reference_perfumes WHERE name = 'Yves Saint Laurent Y';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Gerânio', 'Geraniol + Citronelol', 5.0, false, 2 FROM reference_perfumes WHERE name = 'Yves Saint Laurent Y';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Lavanda', 'Linalol + Acetato de Linalila', 6.0, false, 3 FROM reference_perfumes WHERE name = 'Yves Saint Laurent Y';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Cedro', 'Cedreno + Cedramber', 12.0, true, 1 FROM reference_perfumes WHERE name = 'Yves Saint Laurent Y';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Vetiver', 'Vetiveryl Acetate', 8.0, false, 2 FROM reference_perfumes WHERE name = 'Yves Saint Laurent Y';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Olíbano', 'Incensol Acetate', 5.0, false, 3 FROM reference_perfumes WHERE name = 'Yves Saint Laurent Y';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Fava Tonka', 'Cumarina', 6.0, false, 4 FROM reference_perfumes WHERE name = 'Yves Saint Laurent Y';

-- Continua com perfumes 19-25...
