-- Atualizar densidades corretas e marcar químicos sólidos
-- NOTAS DE TOPO

UPDATE aromatic_chemicals SET density = 0.8420, is_solid = false WHERE name = 'Limoneno' AND is_system = true;
UPDATE aromatic_chemicals SET density = 0.8600, is_solid = false WHERE name = 'Linalol' AND is_system = true;
UPDATE aromatic_chemicals SET density = 0.8800, is_solid = false WHERE name = 'Bergamota' AND is_system = true;
UPDATE aromatic_chemicals SET density = 0.8930, is_solid = false WHERE name = 'Citral' AND is_system = true;
UPDATE aromatic_chemicals SET density = 0.9240, is_solid = false WHERE name = 'Eucaliptol (1,8-Cineol)' AND is_system = true;
UPDATE aromatic_chemicals SET density = 0.8950, is_solid = false WHERE name = 'Acetato de Linalila' AND is_system = true;
UPDATE aromatic_chemicals SET density = 0.8340, is_solid = false WHERE name = 'Aldeído C-12 (Lauric)' AND is_system = true;
UPDATE aromatic_chemicals SET density = 0.8910, is_solid = false WHERE name = 'Dihidromircenol (DHM)' AND is_system = true;
UPDATE aromatic_chemicals SET density = 0.8550, is_solid = false WHERE name = 'Citronelal' AND is_system = true;
UPDATE aromatic_chemicals SET density = 1.0200, is_solid = false WHERE name = 'Hedione (Metil Dihidrojasmonato)' AND is_system = true;

-- NOTAS DE CORAÇÃO

UPDATE aromatic_chemicals SET density = 0.8890, is_solid = false WHERE name = 'Geraniol' AND is_system = true;
UPDATE aromatic_chemicals SET density = 1.0660, is_solid = false WHERE name = 'Eugenol' AND is_system = true;
UPDATE aromatic_chemicals SET density = 1.0500, is_solid = false WHERE name = 'Cinamaldeído' AND is_system = true;
UPDATE aromatic_chemicals SET density = 0.9330, is_solid = false WHERE name = 'Ionona Alpha' AND is_system = true;
UPDATE aromatic_chemicals SET density = 0.9460, is_solid = false WHERE name = 'Ionona Beta' AND is_system = true;
UPDATE aromatic_chemicals SET density = 1.0380, is_solid = false WHERE name = 'Lyral (Hidroxicitronelal)' AND is_system = true;
UPDATE aromatic_chemicals SET density = 1.0330, is_solid = false WHERE name = 'Fenilacetato de Etila' AND is_system = true;
UPDATE aromatic_chemicals SET density = 0.9340, is_solid = false WHERE name = 'Metilionona (Irisone)' AND is_system = true;

-- Cumarina e Heliotropina são sólidos
UPDATE aromatic_chemicals 
SET density = 0.9350, 
    is_solid = true, 
    default_dilution_pct = 10.00, 
    default_dilution_solvent = 'DPG ou Álcool'
WHERE name = 'Cumarina' AND is_system = true;

UPDATE aromatic_chemicals 
SET density = 1.1290, 
    is_solid = true, 
    default_dilution_pct = 10.00, 
    default_dilution_solvent = 'DPG ou Álcool'
WHERE name = 'Heliotropina (Piperonil)' AND is_system = true;

UPDATE aromatic_chemicals SET density = 1.1230, is_solid = false WHERE name = 'Aldeído Anísico' AND is_system = true;
UPDATE aromatic_chemicals SET density = 0.9460, is_solid = false WHERE name = 'Ciclamen Aldeído' AND is_system = true;

-- NOTAS DE FUNDO

-- Vanilina, Etilvanilina, Musk Cetona, Ambroxan e Coumarin são sólidos
UPDATE aromatic_chemicals 
SET density = 1.0560, 
    is_solid = true, 
    default_dilution_pct = 10.00, 
    default_dilution_solvent = 'DPG ou Álcool'
WHERE name = 'Vanilina' AND is_system = true;

UPDATE aromatic_chemicals 
SET density = 1.0600, 
    is_solid = true, 
    default_dilution_pct = 10.00, 
    default_dilution_solvent = 'DPG ou Álcool'
WHERE name = 'Etilvanilina' AND is_system = true;

UPDATE aromatic_chemicals 
SET density = 1.2940, 
    is_solid = true, 
    default_dilution_pct = 10.00, 
    default_dilution_solvent = 'DPG ou Álcool'
WHERE name = 'Musk Cetona' AND is_system = true;

UPDATE aromatic_chemicals SET density = 1.0040, is_solid = false WHERE name = 'Galaxolide' AND is_system = true;
UPDATE aromatic_chemicals SET density = 0.9630, is_solid = false WHERE name = 'Cashmeran' AND is_system = true;

UPDATE aromatic_chemicals 
SET density = 0.9600, 
    is_solid = true, 
    default_dilution_pct = 10.00, 
    default_dilution_solvent = 'DPG ou Álcool'
WHERE name = 'Ambroxan' AND is_system = true;

UPDATE aromatic_chemicals SET density = 0.9460, is_solid = false WHERE name = 'ISO E Super' AND is_system = true;

-- Coumarin (nota: pode ser diferente de Cumarina se houver duplicata)
UPDATE aromatic_chemicals 
SET density = 0.9350, 
    is_solid = true, 
    default_dilution_pct = 10.00, 
    default_dilution_solvent = 'DPG ou Álcool'
WHERE name LIKE '%Coumarin%' AND is_system = true AND name != 'Cumarina';

UPDATE aromatic_chemicals SET density = 1.0300, is_solid = false WHERE name = 'Vetiveryl Acetate' AND is_system = true;
UPDATE aromatic_chemicals SET density = 0.9350, is_solid = false WHERE name = 'Sandalore' AND is_system = true;
UPDATE aromatic_chemicals SET density = 0.9450, is_solid = false WHERE name LIKE '%Cedro%' AND is_system = true;
UPDATE aromatic_chemicals SET density = 0.9900, is_solid = false WHERE name = 'Muskenone' AND is_system = true;
UPDATE aromatic_chemicals SET density = 1.0300, is_solid = false WHERE name = 'Ethylene Brassylate' AND is_system = true;
UPDATE aromatic_chemicals SET density = 1.1180, is_solid = false WHERE name = 'Benzil Benzoato' AND is_system = true;
UPDATE aromatic_chemicals SET density = 1.0200, is_solid = false WHERE name = 'Álcool Feniletílico' AND is_system = true;
UPDATE aromatic_chemicals SET density = 0.9760, is_solid = false WHERE name = 'Javanol' AND is_system = true;
UPDATE aromatic_chemicals SET density = 0.9700, is_solid = false WHERE name = 'Habanolide' AND is_system = true;
