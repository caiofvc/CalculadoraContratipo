-- Continuação do seed de perfumes de referência (Perfumes 6-15)

-- ============================================================================
-- 6. BLEU DE CHANEL — CHANEL
-- ============================================================================
INSERT INTO reference_perfumes (name, brand, year_launched, perfumer, gender, olfactive_family, olfactive_subfamily, concentration_type, description, popularity_score, is_system)
VALUES (
  'Bleu de Chanel',
  'Chanel',
  2010,
  'Jacques Polge',
  'masculino',
  'Amadeirado Aromático',
  'Amadeirado Fresco',
  'EDP',
  'Perfume icônico com cedro, ISO E Super e notas cítricas. Elegante e versátil.',
  95,
  true
);

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Limão', 'Citral + Limoneno', 5.0, false, 1 FROM reference_perfumes WHERE name = 'Bleu de Chanel';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Menta', 'L-Mentol + Mentona', 3.0, false, 2 FROM reference_perfumes WHERE name = 'Bleu de Chanel';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Toranja', 'Nootkatone', 4.0, false, 3 FROM reference_perfumes WHERE name = 'Bleu de Chanel';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Jasmin', 'Hedione', 8.0, false, 1 FROM reference_perfumes WHERE name = 'Bleu de Chanel';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Gengibre', 'Zingibereno', 3.0, false, 2 FROM reference_perfumes WHERE name = 'Bleu de Chanel';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'ISO E Super', 'ISO E Super', 15.0, true, 3 FROM reference_perfumes WHERE name = 'Bleu de Chanel';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Cedro', 'Cedreno + Cedramber', 12.0, true, 1 FROM reference_perfumes WHERE name = 'Bleu de Chanel';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Sândalo', 'Sandalore', 8.0, false, 2 FROM reference_perfumes WHERE name = 'Bleu de Chanel';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Patchouli', 'Patchoulol', 5.0, false, 3 FROM reference_perfumes WHERE name = 'Bleu de Chanel';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Incenso', 'Incensol Acetate', 4.0, false, 4 FROM reference_perfumes WHERE name = 'Bleu de Chanel';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Vetiver', 'Vetiveryl Acetate', 3.0, false, 5 FROM reference_perfumes WHERE name = 'Bleu de Chanel';

-- ============================================================================
-- 7. LIGHT BLUE — DOLCE & GABBANA
-- ============================================================================
INSERT INTO reference_perfumes (name, brand, year_launched, perfumer, gender, olfactive_family, olfactive_subfamily, concentration_type, description, popularity_score, is_system)
VALUES (
  'Light Blue',
  'Dolce & Gabbana',
  2001,
  'Olivier Cresp',
  'feminino',
  'Cítrico Floral',
  'Floral Frutal',
  'EDT',
  'Perfume feminino fresco com limão siciliano e maçã verde. Leve e mediterrâneo.',
  90,
  true
);

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Limão Siciliano', 'Citral + Limoneno', 10.0, true, 1 FROM reference_perfumes WHERE name = 'Light Blue';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Maçã Verde', 'cis-3-Hexenol + Damascona', 5.0, true, 2 FROM reference_perfumes WHERE name = 'Light Blue';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Groselha', 'Cassis Base (Buchu Mercaptan traço)', 3.0, false, 3 FROM reference_perfumes WHERE name = 'Light Blue';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Jasmin', 'Hedione', 10.0, false, 1 FROM reference_perfumes WHERE name = 'Light Blue';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Bambu', 'Calone + Dihidromircenol', 5.0, false, 2 FROM reference_perfumes WHERE name = 'Light Blue';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Rosa', 'Álcool Feniletílico + Citronelol', 5.0, false, 3 FROM reference_perfumes WHERE name = 'Light Blue';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Cedro', 'Cedreno', 10.0, false, 1 FROM reference_perfumes WHERE name = 'Light Blue';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Almíscar Branco', 'Galaxolide + Ethylene Brassylate', 10.0, false, 2 FROM reference_perfumes WHERE name = 'Light Blue';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Âmbar', 'Ambroxan', 5.0, false, 3 FROM reference_perfumes WHERE name = 'Light Blue';

-- ============================================================================
-- 8. 1 MILLION — PACO RABANNE
-- ============================================================================
INSERT INTO reference_perfumes (name, brand, year_launched, perfumer, gender, olfactive_family, olfactive_subfamily, concentration_type, description, popularity_score, is_system)
VALUES (
  '1 Million',
  'Paco Rabanne',
  2008,
  'Christophe Raynaud, Olivier Pescheux & Michel Girard',
  'masculino',
  'Especiado Amadeirado',
  'Oriental Especiado',
  'EDT',
  'Perfume ousado com canela, couro e âmbar. Projeção intensa e marcante.',
  95,
  true
);

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Toranja', 'Nootkatone + Limoneno', 8.0, false, 1 FROM reference_perfumes WHERE name = '1 Million';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Menta', 'L-Mentol', 3.0, false, 2 FROM reference_perfumes WHERE name = '1 Million';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Sangue Mandarina', 'Limoneno + Dimetil Antranilato', 5.0, true, 3 FROM reference_perfumes WHERE name = '1 Million';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Rosa', 'Álcool Feniletílico + Geraniol', 6.0, false, 1 FROM reference_perfumes WHERE name = '1 Million';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Canela', 'Cinamaldeído', 5.0, true, 2 FROM reference_perfumes WHERE name = '1 Million';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Especiarias', 'Eugenol + Piperonal', 4.0, false, 3 FROM reference_perfumes WHERE name = '1 Million';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Couro / Âmbar', 'Ambroxan + Cashmeran', 12.0, true, 1 FROM reference_perfumes WHERE name = '1 Million';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Amadeirado', 'ISO E Super + Cedreno', 10.0, false, 2 FROM reference_perfumes WHERE name = '1 Million';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Baunilha', 'Etilvanilina', 5.0, false, 3 FROM reference_perfumes WHERE name = '1 Million';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Almíscar Branco', 'Galaxolide', 8.0, false, 4 FROM reference_perfumes WHERE name = '1 Million';

-- ============================================================================
-- 9. LA VIE EST BELLE — LANCÔME
-- ============================================================================
INSERT INTO reference_perfumes (name, brand, year_launched, perfumer, gender, olfactive_family, olfactive_subfamily, concentration_type, description, popularity_score, is_system)
VALUES (
  'La Vie Est Belle',
  'Lancôme',
  2012,
  'Olivier Polge, Dominique Ropion & Anne Flipo',
  'feminino',
  'Floral Gourmand',
  'Floral Oriental',
  'EDP',
  'Perfume feminino doce com iris, pralinê e baunilha. Elegante e envolvente.',
  95,
  true
);

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Groselha Preta', 'Cassis Base', 5.0, false, 1 FROM reference_perfumes WHERE name = 'La Vie Est Belle';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Pera', 'Acetato de Etila + Frutarom Pear', 5.0, false, 2 FROM reference_perfumes WHERE name = 'La Vie Est Belle';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Iris', 'Metilionona (Irisone) + Ionona Alpha', 10.0, true, 1 FROM reference_perfumes WHERE name = 'La Vie Est Belle';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Jasmin', 'Hedione', 6.0, false, 2 FROM reference_perfumes WHERE name = 'La Vie Est Belle';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Flor de Laranjeira', 'Linalol + Nerolidol', 5.0, false, 3 FROM reference_perfumes WHERE name = 'La Vie Est Belle';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Pralinê / Gourmand', 'Etilvanilina + Ethyl Maltol', 12.0, true, 1 FROM reference_perfumes WHERE name = 'La Vie Est Belle';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Patchouli', 'Patchoulol', 6.0, false, 2 FROM reference_perfumes WHERE name = 'La Vie Est Belle';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Baunilha', 'Vanilina', 8.0, true, 3 FROM reference_perfumes WHERE name = 'La Vie Est Belle';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Almíscar', 'Galaxolide', 8.0, false, 4 FROM reference_perfumes WHERE name = 'La Vie Est Belle';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Tonka', 'Cumarina', 5.0, false, 5 FROM reference_perfumes WHERE name = 'La Vie Est Belle';

-- ============================================================================
-- 10. INVICTUS — PACO RABANNE
-- ============================================================================
INSERT INTO reference_perfumes (name, brand, year_launched, perfumer, gender, olfactive_family, olfactive_subfamily, concentration_type, description, popularity_score, is_system)
VALUES (
  'Invictus',
  'Paco Rabanne',
  2013,
  'Veronique Nyberg, Anne Flipo, Olivier Polge & Dominique Ropion',
  'masculino',
  'Aquático Amadeirado',
  'Aromático Aquático',
  'EDT',
  'Perfume esportivo com toranja, notas marinhas e ambroxan. Fresco e poderoso.',
  90,
  true
);

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Toranja', 'Nootkatone + Limoneno', 8.0, true, 1 FROM reference_perfumes WHERE name = 'Invictus';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Notas Marinhas', 'Calone', 5.0, true, 2 FROM reference_perfumes WHERE name = 'Invictus';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'topo', 'Mandarina', 'Limoneno + Dimetil Antranilato', 4.0, false, 3 FROM reference_perfumes WHERE name = 'Invictus';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Jasmin', 'Hedione', 6.0, false, 1 FROM reference_perfumes WHERE name = 'Invictus';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Louro', 'Eucaliptol + Eugenol (traço)', 4.0, false, 2 FROM reference_perfumes WHERE name = 'Invictus';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'coracao', 'Notas Aquáticas', 'Dihidromircenol + Calone', 5.0, false, 3 FROM reference_perfumes WHERE name = 'Invictus';

INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Guaiacwood', 'Guaiacol', 8.0, false, 1 FROM reference_perfumes WHERE name = 'Invictus';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Patchouli', 'Patchoulol', 5.0, false, 2 FROM reference_perfumes WHERE name = 'Invictus';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Ambroxan', 'Ambroxan', 12.0, true, 3 FROM reference_perfumes WHERE name = 'Invictus';
INSERT INTO reference_perfume_notes (perfume_id, olfactive_note, chemical_name, suggested_chemical, suggested_pct, is_key_note, sort_order)
SELECT id, 'fundo', 'Almíscar', 'Galaxolide + Muscenone', 8.0, false, 4 FROM reference_perfumes WHERE name = 'Invictus';

-- Continua no próximo arquivo (perfumes 11-25)...
