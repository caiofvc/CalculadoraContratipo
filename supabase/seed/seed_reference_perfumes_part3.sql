-- Continuação do seed de perfumes de referência (Perfumes 11-25)

-- ============================================================================
-- 11. ACQUA DI GIO — GIORGIO ARMANI
-- ============================================================================
INSERT INTO reference_perfumes (name, brand, year_launched, perfumer, gender, olfactive_family, olfactive_subfamily, concentration_type, description, popularity_score, is_system)
VALUES (
  'Acqua di Gio',
  'Giorgio Armani',
  1996,
  'Alberto Morillas',
  'masculino',
  'Aquático Cítrico',
  'Aromático Aquático',
  'EDT',
  'Clássico aquático com notas marinhas, bergamota e patchouli. Fresco e atemporal.',
  100,
  true
);

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Bergamota', 'Limoneno + Acetato de Linalila', 10.0, true, 1 FROM reference_perfumes WHERE name = 'Acqua di Gio';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Limão', 'Citral + Limoneno', 5.0, false, 2 FROM reference_perfumes WHERE name = 'Acqua di Gio';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Notas Marinhas', 'Calone', 8.0, true, 3 FROM reference_perfumes WHERE name = 'Acqua di Gio';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Jasmin', 'Hedione', 8.0, false, 1 FROM reference_perfumes WHERE name = 'Acqua di Gio';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Rosa', 'Álcool Feniletílico + Geraniol', 5.0, false, 2 FROM reference_perfumes WHERE name = 'Acqua di Gio';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Alecrim', 'Eucaliptol + Borneol', 3.0, false, 3 FROM reference_perfumes WHERE name = 'Acqua di Gio';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Patchouli', 'Patchoulol', 10.0, true, 1 FROM reference_perfumes WHERE name = 'Acqua di Gio';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Cedro', 'Cedreno', 8.0, false, 2 FROM reference_perfumes WHERE name = 'Acqua di Gio';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Almíscar Branco', 'Galaxolide', 10.0, false, 3 FROM reference_perfumes WHERE name = 'Acqua di Gio';

-- ============================================================================
-- 12. AVENTUS — CREED
-- ============================================================================
INSERT INTO reference_perfumes (name, brand, year_launched, perfumer, gender, olfactive_family, olfactive_subfamily, concentration_type, description, popularity_score, is_system)
VALUES (
  'Aventus',
  'Creed',
  2010,
  'Olivier Creed & Erwin Creed',
  'masculino',
  'Frutal Amadeirado',
  'Chipre Frutal',
  'EDP',
  'Perfume de luxo com abacaxi, bergamota e bétula. Sofisticado e poderoso.',
  100,
  true
);

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Abacaxi', 'Allyl Amyl Glycolate + Ethyl Maltol', 8.0, true, 1 FROM reference_perfumes WHERE name = 'Aventus';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Bergamota', 'Limoneno + Acetato de Linalila', 10.0, true, 2 FROM reference_perfumes WHERE name = 'Aventus';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Groselha Preta', 'Cassis Base', 5.0, false, 3 FROM reference_perfumes WHERE name = 'Aventus';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Maçã', 'Damascona Delta', 3.0, false, 4 FROM reference_perfumes WHERE name = 'Aventus';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Rosa', 'Álcool Feniletílico + Geraniol', 6.0, false, 1 FROM reference_perfumes WHERE name = 'Aventus';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Jasmin', 'Hedione', 5.0, false, 2 FROM reference_perfumes WHERE name = 'Aventus';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Patchouli', 'Patchoulol', 4.0, false, 3 FROM reference_perfumes WHERE name = 'Aventus';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Bétula (Birch)', 'Guaiacol + Isoeugenol', 12.0, true, 1 FROM reference_perfumes WHERE name = 'Aventus';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Almíscar', 'Galaxolide + Habanolide', 10.0, false, 2 FROM reference_perfumes WHERE name = 'Aventus';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Oakmoss / Musgo', 'Evernyl + Veramoss', 5.0, false, 3 FROM reference_perfumes WHERE name = 'Aventus';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Baunilha', 'Vanilina', 4.0, false, 4 FROM reference_perfumes WHERE name = 'Aventus';

-- ============================================================================
-- 13. VERSACE EROS — VERSACE
-- ============================================================================
INSERT INTO reference_perfumes (name, brand, year_launched, perfumer, gender, olfactive_family, olfactive_subfamily, concentration_type, description, popularity_score, is_system)
VALUES (
  'Versace Eros',
  'Versace',
  2012,
  'Aurélien Guichard',
  'masculino',
  'Aromático Fougère',
  'Oriental Fougère',
  'EDT',
  'Perfume sedutor com menta, baunilha e tonka. Doce e poderoso.',
  90,
  true
);

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Menta', 'L-Mentol + Mentona', 8.0, true, 1 FROM reference_perfumes WHERE name = 'Versace Eros';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Limão', 'Citral + Limoneno', 5.0, false, 2 FROM reference_perfumes WHERE name = 'Versace Eros';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Maçã Verde', 'cis-3-Hexenol + Damascona', 4.0, false, 3 FROM reference_perfumes WHERE name = 'Versace Eros';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Gerânio', 'Geraniol + Citronelol', 6.0, false, 1 FROM reference_perfumes WHERE name = 'Versace Eros';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Ambroxan', 'Ambroxan', 10.0, true, 2 FROM reference_perfumes WHERE name = 'Versace Eros';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Tonka', 'Cumarina', 12.0, true, 1 FROM reference_perfumes WHERE name = 'Versace Eros';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Baunilha', 'Vanilina + Etilvanilina', 10.0, true, 2 FROM reference_perfumes WHERE name = 'Versace Eros';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Cedro', 'Cedreno', 8.0, false, 3 FROM reference_perfumes WHERE name = 'Versace Eros';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Vetiver', 'Vetiveryl Acetate', 5.0, false, 4 FROM reference_perfumes WHERE name = 'Versace Eros';

-- ============================================================================
-- 14. JEAN PAUL GAULTIER LE MALE — JPG
-- ============================================================================
INSERT INTO reference_perfumes (name, brand, year_launched, perfumer, gender, olfactive_family, olfactive_subfamily, concentration_type, description, popularity_score, is_system)
VALUES (
  'Jean Paul Gaultier Le Male',
  'Jean Paul Gaultier',
  1995,
  'Francis Kurkdjian',
  'masculino',
  'Oriental Fougère',
  'Aromático Fougère',
  'EDT',
  'Icônico perfume com lavanda, menta e baunilha. Sedutor e marcante.',
  95,
  true
);

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Menta', 'L-Mentol', 6.0, true, 1 FROM reference_perfumes WHERE name = 'Jean Paul Gaultier Le Male';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Lavanda', 'Linalol + Acetato de Linalila', 10.0, true, 2 FROM reference_perfumes WHERE name = 'Jean Paul Gaultier Le Male';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Bergamota', 'Limoneno + Acetato de Linalila', 5.0, false, 3 FROM reference_perfumes WHERE name = 'Jean Paul Gaultier Le Male';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Canela', 'Cinamaldeído', 5.0, true, 1 FROM reference_perfumes WHERE name = 'Jean Paul Gaultier Le Male';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Cumarina', 'Cumarina', 8.0, false, 2 FROM reference_perfumes WHERE name = 'Jean Paul Gaultier Le Male';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Flor de Laranjeira', 'Linalol + Nerolidol', 4.0, false, 3 FROM reference_perfumes WHERE name = 'Jean Paul Gaultier Le Male';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Baunilha', 'Vanilina + Etilvanilina', 12.0, true, 1 FROM reference_perfumes WHERE name = 'Jean Paul Gaultier Le Male';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Tonka', 'Cumarina', 8.0, false, 2 FROM reference_perfumes WHERE name = 'Jean Paul Gaultier Le Male';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Cedro', 'Cedreno', 6.0, false, 3 FROM reference_perfumes WHERE name = 'Jean Paul Gaultier Le Male';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Sândalo', 'Sandalore + Javanol', 8.0, false, 4 FROM reference_perfumes WHERE name = 'Jean Paul Gaultier Le Male';

-- ============================================================================
-- 15. DOLCE & GABBANA THE ONE — D&G
-- ============================================================================
INSERT INTO reference_perfumes (name, brand, year_launched, perfumer, gender, olfactive_family, olfactive_subfamily, concentration_type, description, popularity_score, is_system)
VALUES (
  'Dolce & Gabbana The One',
  'Dolce & Gabbana',
  2008,
  'Olivier Polge',
  'masculino',
  'Especiado Oriental',
  'Oriental Amadeirado',
  'EDP',
  'Perfume elegante com tabaco, gengibre e cedro. Sofisticado e sedutor.',
  85,
  true
);

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Toranja', 'Nootkatone + Limoneno', 6.0, false, 1 FROM reference_perfumes WHERE name = 'Dolce & Gabbana The One';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Coentro', 'Linalol + Geraniol', 3.0, false, 2 FROM reference_perfumes WHERE name = 'Dolce & Gabbana The One';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Manjericão', 'Linalol + Eugenol', 2.0, false, 3 FROM reference_perfumes WHERE name = 'Dolce & Gabbana The One';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Gengibre', 'Zingibereno', 5.0, true, 1 FROM reference_perfumes WHERE name = 'Dolce & Gabbana The One';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Cardamomo', 'Eucaliptol + Terpineol', 4.0, false, 2 FROM reference_perfumes WHERE name = 'Dolce & Gabbana The One';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Flor de Laranjeira', 'Linalol + Nerolidol', 5.0, false, 3 FROM reference_perfumes WHERE name = 'Dolce & Gabbana The One';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Tabaco', 'Tobacco Absolute + Cumarina', 10.0, true, 1 FROM reference_perfumes WHERE name = 'Dolce & Gabbana The One';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Cedro', 'Cedreno + Cedramber', 12.0, true, 2 FROM reference_perfumes WHERE name = 'Dolce & Gabbana The One';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Âmbar', 'Ambroxan + Benzil Benzoato', 8.0, false, 3 FROM reference_perfumes WHERE name = 'Dolce & Gabbana The One';

-- Continua com perfumes 16-25 no próximo bloco...
