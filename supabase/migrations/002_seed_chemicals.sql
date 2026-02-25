-- Seed de químicos aromáticos do sistema
-- NOTAS DE TOPO

INSERT INTO aromatic_chemicals (name, cas_number, olfactive_family, olfactive_note, description, min_dosage, max_dosage, ifra_limit, density, is_system) VALUES
('Limoneno', '5989-27-5', 'citrico', 'topo', 'Cítrico fresco de limão e laranja', 1, 10, NULL, 0.8411, true),
('Linalol', '78-70-6', 'floral', 'topo', 'Floral fresco com notas de lavanda', 1, 15, NULL, 0.8700, true),
('Bergamota', '8007-75-8', 'citrico', 'topo', 'Cítrico floral elegante', 2, 8, NULL, 0.8800, true),
('Citral', '5392-40-5', 'citrico', 'topo', 'Cítrico forte de limão', 0.5, 5, 2.4, 0.8888, true),
('Eucaliptol (1,8-Cineol)', '470-82-6', 'herbal', 'topo', 'Fresco herbal eucalipto', 1, 10, NULL, 0.9225, true),
('Acetato de Linalila', '115-95-7', 'floral', 'topo', 'Floral fresco bergamota', 2, 15, NULL, 0.8980, true),
('Aldeído C-12 (Lauric)', '112-54-9', 'citrico', 'topo', 'Metálico limpo cítrico', 0.1, 1, NULL, 0.8352, true),
('Dihidromircenol (DHM)', '18479-58-8', 'citrico', 'topo', 'Fresco ozônico limpo', 1, 10, NULL, 0.8500, true),
('Citronelal', '106-23-0', 'citrico', 'topo', 'Cítrico rosa fresco', 0.5, 5, NULL, 0.8550, true),
('Hedione (Metil Dihidrojasmonato)', '24851-98-7', 'floral', 'topo', 'Floral jasmin radiante', 5, 25, NULL, 1.0400, true);

-- NOTAS DE CORAÇÃO

INSERT INTO aromatic_chemicals (name, cas_number, olfactive_family, olfactive_note, description, min_dosage, max_dosage, ifra_limit, density, is_system) VALUES
('Geraniol', '106-24-1', 'floral', 'coracao', 'Rosa gerânio floral', 1, 8, NULL, 0.8790, true),
('Eugenol', '97-53-0', 'especiaria', 'coracao', 'Especiaria cravo quente', 0.5, 5, 1.0, 1.0652, true),
('Cinamaldeído', '104-55-2', 'especiaria', 'coracao', 'Canela quente picante', 0.1, 3, 0.5, 1.0497, true),
('Ionona Alpha', '127-41-3', 'floral', 'coracao', 'Violeta floral em pó', 1, 5, NULL, 0.9450, true),
('Ionona Beta', '14901-07-6', 'floral', 'coracao', 'Violeta amadeirado', 1, 5, NULL, 0.9460, true),
('Lyral (Hidroxicitronelal)', '107-75-5', 'floral', 'coracao', 'Muguet lírio fresco', 1, 10, 0.6, 0.9200, true),
('Fenilacetato de Etila', '101-97-3', 'floral', 'coracao', 'Mel rosa doce', 0.5, 5, NULL, 1.0330, true),
('Metilionona (Irisone)', '1335-46-2', 'floral', 'coracao', 'Iris violeta em pó', 1, 8, NULL, 0.9300, true),
('Cumarina', '91-64-5', 'gourmand', 'coracao', 'Baunilha amêndoa doce', 1, 10, NULL, 0.9350, true),
('Heliotropina (Piperonil)', '120-57-0', 'gourmand', 'coracao', 'Baunilha amêndoa em pó', 1, 5, NULL, 1.0400, true),
('Aldeído Anísico', '123-11-5', 'especiaria', 'coracao', 'Aniz floral doce', 0.5, 3, NULL, 1.1230, true),
('Ciclamen Aldeído', '103-95-7', 'floral', 'coracao', 'Floral fresco aquático', 0.5, 5, NULL, 1.0040, true);

-- NOTAS DE FUNDO

INSERT INTO aromatic_chemicals (name, cas_number, olfactive_family, olfactive_note, description, min_dosage, max_dosage, ifra_limit, density, is_system) VALUES
('Vanilina', '121-33-5', 'gourmand', 'fundo', 'Baunilha doce clássica', 1, 10, NULL, 1.0560, true),
('Etilvanilina', '121-32-4', 'gourmand', 'fundo', 'Baunilha potente (3x mais forte)', 0.5, 5, NULL, 1.0900, true),
('Musk Cetona', '81-14-1', 'almicar', 'fundo', 'Almíscar clássico', 1, 8, 1.4, 1.0390, true),
('Galaxolide', '1222-05-5', 'almicar', 'fundo', 'Almíscar branco limpo', 2, 15, NULL, 1.0300, true),
('Cashmeran', '33704-61-9', 'amadeirado', 'fundo', 'Amadeirado almíscar aveludado', 1, 8, NULL, 0.9800, true),
('Ambroxan', '6790-58-5', 'ambar', 'fundo', 'Âmbar amadeirado marinho', 1, 10, NULL, 0.9450, true),
('ISO E Super', '54464-57-2', 'amadeirado', 'fundo', 'Amadeirado veludo suave', 5, 30, NULL, 0.9300, true),
('Vetiveryl Acetate', '117-98-6', 'amadeirado', 'fundo', 'Vetiver terroso amadeirado', 1, 5, NULL, 0.9730, true),
('Sandalore', '65113-99-7', 'amadeirado', 'fundo', 'Sândalo cremoso suave', 2, 10, NULL, 0.9500, true),
('Cedrol', '77-53-2', 'amadeirado', 'fundo', 'Cedro seco amadeirado', 1, 10, NULL, 1.0070, true),
('Muskenone', '81786-73-4', 'almicar', 'fundo', 'Almíscar animal potente', 1, 5, NULL, 1.0200, true),
('Ethylene Brassylate', '105-95-3', 'almicar', 'fundo', 'Almíscar floral suave', 2, 15, NULL, 1.0280, true),
('Benzil Benzoato', '120-51-4', 'resinoso', 'fundo', 'Fixador balsâmico', 1, 20, NULL, 1.1180, true),
('Álcool Feniletílico', '60-12-8', 'floral', 'fundo', 'Rosa mel suave', 2, 10, NULL, 1.0200, true),
('Javanol', '171489-36-2', 'amadeirado', 'fundo', 'Sândalo cremoso rico', 1, 8, NULL, 0.9400, true),
('Habanolide', '136954-20-6', 'almicar', 'fundo', 'Almíscar amadeirado suave', 1, 10, NULL, 1.0100, true);
