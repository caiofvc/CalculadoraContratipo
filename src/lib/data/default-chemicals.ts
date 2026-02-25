import { AromaticChemical, OlfactiveFamily, OlfactiveNote } from '@/types/chemical'

export const DEFAULT_CHEMICALS: Omit<AromaticChemical, 'id' | 'createdAt' | 'userId' | 'isSystem'>[] = [
  // NOTAS DE TOPO
  {
    name: 'Limoneno',
    casNumber: '5989-27-5',
    olfactiveFamily: 'citrico',
    olfactiveNote: 'topo',
    description: 'Cítrico fresco de limão e laranja',
    minDosage: 1,
    maxDosage: 10,
    density: 0.8411
  },
  {
    name: 'Linalol',
    casNumber: '78-70-6',
    olfactiveFamily: 'floral',
    olfactiveNote: 'topo',
    description: 'Floral fresco com notas de lavanda',
    minDosage: 1,
    maxDosage: 15,
    density: 0.8700
  },
  {
    name: 'Bergamota',
    casNumber: '8007-75-8',
    olfactiveFamily: 'citrico',
    olfactiveNote: 'topo',
    description: 'Cítrico floral elegante',
    minDosage: 2,
    maxDosage: 8,
    density: 0.8800
  },
  {
    name: 'Citral',
    casNumber: '5392-40-5',
    olfactiveFamily: 'citrico',
    olfactiveNote: 'topo',
    description: 'Cítrico forte de limão',
    minDosage: 0.5,
    maxDosage: 5,
    ifraLimit: 2.4,
    density: 0.8888
  },
  {
    name: 'Eucaliptol (1,8-Cineol)',
    casNumber: '470-82-6',
    olfactiveFamily: 'herbal',
    olfactiveNote: 'topo',
    description: 'Fresco herbal eucalipto',
    minDosage: 1,
    maxDosage: 10,
    density: 0.9225
  },
  {
    name: 'Acetato de Linalila',
    casNumber: '115-95-7',
    olfactiveFamily: 'floral',
    olfactiveNote: 'topo',
    description: 'Floral fresco bergamota',
    minDosage: 2,
    maxDosage: 15,
    density: 0.8980
  },
  {
    name: 'Aldeído C-12 (Lauric)',
    casNumber: '112-54-9',
    olfactiveFamily: 'citrico',
    olfactiveNote: 'topo',
    description: 'Metálico limpo cítrico',
    minDosage: 0.1,
    maxDosage: 1,
    density: 0.8352
  },
  {
    name: 'Dihidromircenol (DHM)',
    casNumber: '18479-58-8',
    olfactiveFamily: 'citrico',
    olfactiveNote: 'topo',
    description: 'Fresco ozônico limpo',
    minDosage: 1,
    maxDosage: 10,
    density: 0.8500
  },
  {
    name: 'Citronelal',
    casNumber: '106-23-0',
    olfactiveFamily: 'citrico',
    olfactiveNote: 'topo',
    description: 'Cítrico rosa fresco',
    minDosage: 0.5,
    maxDosage: 5,
    density: 0.8550
  },
  {
    name: 'Hedione (Metil Dihidrojasmonato)',
    casNumber: '24851-98-7',
    olfactiveFamily: 'floral',
    olfactiveNote: 'topo',
    description: 'Floral jasmin radiante',
    minDosage: 5,
    maxDosage: 25,
    density: 1.0400
  },

  // NOTAS DE CORAÇÃO
  {
    name: 'Geraniol',
    casNumber: '106-24-1',
    olfactiveFamily: 'floral',
    olfactiveNote: 'coracao',
    description: 'Rosa gerânio floral',
    minDosage: 1,
    maxDosage: 8,
    density: 0.8790
  },
  {
    name: 'Eugenol',
    casNumber: '97-53-0',
    olfactiveFamily: 'especiaria',
    olfactiveNote: 'coracao',
    description: 'Especiaria cravo quente',
    minDosage: 0.5,
    maxDosage: 5,
    ifraLimit: 1.0,
    density: 1.0652
  },
  {
    name: 'Cinamaldeído',
    casNumber: '104-55-2',
    olfactiveFamily: 'especiaria',
    olfactiveNote: 'coracao',
    description: 'Canela quente picante',
    minDosage: 0.1,
    maxDosage: 3,
    ifraLimit: 0.5,
    density: 1.0497
  },
  {
    name: 'Ionona Alpha',
    casNumber: '127-41-3',
    olfactiveFamily: 'floral',
    olfactiveNote: 'coracao',
    description: 'Violeta floral em pó',
    minDosage: 1,
    maxDosage: 5,
    density: 0.9450
  },
  {
    name: 'Ionona Beta',
    casNumber: '14901-07-6',
    olfactiveFamily: 'floral',
    olfactiveNote: 'coracao',
    description: 'Violeta amadeirado',
    minDosage: 1,
    maxDosage: 5,
    density: 0.9460
  },
  {
    name: 'Lyral (Hidroxicitronelal)',
    casNumber: '107-75-5',
    olfactiveFamily: 'floral',
    olfactiveNote: 'coracao',
    description: 'Muguet lírio fresco',
    minDosage: 1,
    maxDosage: 10,
    ifraLimit: 0.6,
    density: 0.9200
  },
  {
    name: 'Fenilacetato de Etila',
    casNumber: '101-97-3',
    olfactiveFamily: 'floral',
    olfactiveNote: 'coracao',
    description: 'Mel rosa doce',
    minDosage: 0.5,
    maxDosage: 5,
    density: 1.0330
  },
  {
    name: 'Metilionona (Irisone)',
    casNumber: '1335-46-2',
    olfactiveFamily: 'floral',
    olfactiveNote: 'coracao',
    description: 'Iris violeta em pó',
    minDosage: 1,
    maxDosage: 8,
    density: 0.9300
  },
  {
    name: 'Cumarina',
    casNumber: '91-64-5',
    olfactiveFamily: 'gourmand',
    olfactiveNote: 'coracao',
    description: 'Baunilha amêndoa doce',
    minDosage: 1,
    maxDosage: 10,
    density: 0.9350
  },
  {
    name: 'Heliotropina (Piperonil)',
    casNumber: '120-57-0',
    olfactiveFamily: 'gourmand',
    olfactiveNote: 'coracao',
    description: 'Baunilha amêndoa em pó',
    minDosage: 1,
    maxDosage: 5,
    density: 1.0400
  },
  {
    name: 'Aldeído Anísico',
    casNumber: '123-11-5',
    olfactiveFamily: 'especiaria',
    olfactiveNote: 'coracao',
    description: 'Aniz floral doce',
    minDosage: 0.5,
    maxDosage: 3,
    density: 1.1230
  },
  {
    name: 'Ciclamen Aldeído',
    casNumber: '103-95-7',
    olfactiveFamily: 'floral',
    olfactiveNote: 'coracao',
    description: 'Floral fresco aquático',
    minDosage: 0.5,
    maxDosage: 5,
    density: 1.0040
  },

  // NOTAS DE FUNDO
  {
    name: 'Vanilina',
    casNumber: '121-33-5',
    olfactiveFamily: 'gourmand',
    olfactiveNote: 'fundo',
    description: 'Baunilha doce clássica',
    minDosage: 1,
    maxDosage: 10,
    density: 1.0560
  },
  {
    name: 'Etilvanilina',
    casNumber: '121-32-4',
    olfactiveFamily: 'gourmand',
    olfactiveNote: 'fundo',
    description: 'Baunilha potente (3x mais forte)',
    minDosage: 0.5,
    maxDosage: 5,
    density: 1.0900
  },
  {
    name: 'Musk Cetona',
    casNumber: '81-14-1',
    olfactiveFamily: 'almicar',
    olfactiveNote: 'fundo',
    description: 'Almíscar clássico',
    minDosage: 1,
    maxDosage: 8,
    ifraLimit: 1.4,
    density: 1.0390
  },
  {
    name: 'Galaxolide',
    casNumber: '1222-05-5',
    olfactiveFamily: 'almicar',
    olfactiveNote: 'fundo',
    description: 'Almíscar branco limpo',
    minDosage: 2,
    maxDosage: 15,
    density: 1.0300
  },
  {
    name: 'Cashmeran',
    casNumber: '33704-61-9',
    olfactiveFamily: 'amadeirado',
    olfactiveNote: 'fundo',
    description: 'Amadeirado almíscar aveludado',
    minDosage: 1,
    maxDosage: 8,
    density: 0.9800
  },
  {
    name: 'Ambroxan',
    casNumber: '6790-58-5',
    olfactiveFamily: 'ambar',
    olfactiveNote: 'fundo',
    description: 'Âmbar amadeirado marinho',
    minDosage: 1,
    maxDosage: 10,
    density: 0.9450
  },
  {
    name: 'ISO E Super',
    casNumber: '54464-57-2',
    olfactiveFamily: 'amadeirado',
    olfactiveNote: 'fundo',
    description: 'Amadeirado veludo suave',
    minDosage: 5,
    maxDosage: 30,
    density: 0.9300
  },
  {
    name: 'Vetiveryl Acetate',
    casNumber: '117-98-6',
    olfactiveFamily: 'amadeirado',
    olfactiveNote: 'fundo',
    description: 'Vetiver terroso amadeirado',
    minDosage: 1,
    maxDosage: 5,
    density: 0.9730
  },
  {
    name: 'Sandalore',
    casNumber: '65113-99-7',
    olfactiveFamily: 'amadeirado',
    olfactiveNote: 'fundo',
    description: 'Sândalo cremoso suave',
    minDosage: 2,
    maxDosage: 10,
    density: 0.9500
  },
  {
    name: 'Cedrol',
    casNumber: '77-53-2',
    olfactiveFamily: 'amadeirado',
    olfactiveNote: 'fundo',
    description: 'Cedro seco amadeirado',
    minDosage: 1,
    maxDosage: 10,
    density: 1.0070
  },
  {
    name: 'Muskenone',
    casNumber: '81786-73-4',
    olfactiveFamily: 'almicar',
    olfactiveNote: 'fundo',
    description: 'Almíscar animal potente',
    minDosage: 1,
    maxDosage: 5,
    density: 1.0200
  },
  {
    name: 'Ethylene Brassylate',
    casNumber: '105-95-3',
    olfactiveFamily: 'almicar',
    olfactiveNote: 'fundo',
    description: 'Almíscar floral suave',
    minDosage: 2,
    maxDosage: 15,
    density: 1.0280
  },
  {
    name: 'Benzil Benzoato',
    casNumber: '120-51-4',
    olfactiveFamily: 'resinoso',
    olfactiveNote: 'fundo',
    description: 'Fixador balsâmico',
    minDosage: 1,
    maxDosage: 20,
    density: 1.1180
  },
  {
    name: 'Álcool Feniletílico',
    casNumber: '60-12-8',
    olfactiveFamily: 'floral',
    olfactiveNote: 'fundo',
    description: 'Rosa mel suave',
    minDosage: 2,
    maxDosage: 10,
    density: 1.0200
  },
  {
    name: 'Javanol',
    casNumber: '171489-36-2',
    olfactiveFamily: 'amadeirado',
    olfactiveNote: 'fundo',
    description: 'Sândalo cremoso rico',
    minDosage: 1,
    maxDosage: 8,
    density: 0.9400
  },
  {
    name: 'Habanolide',
    casNumber: '136954-20-6',
    olfactiveFamily: 'almicar',
    olfactiveNote: 'fundo',
    description: 'Almíscar amadeirado suave',
    minDosage: 1,
    maxDosage: 10,
    density: 1.0100
  }
]

export const CONCENTRATION_TYPES: Record<ConcentrationType, ConcentrationConfig> = {
  eau_fraiche: {
    type: 'eau_fraiche',
    name: 'Eau Fraîche',
    essenceMin: 1,
    essenceMax: 3,
    alcoholMin: 80,
    alcoholMax: 90,
    waterMin: 10,
    waterMax: 15,
    description: 'Levíssimo, pós-banho'
  },
  splash: {
    type: 'splash',
    name: 'Splash / Body Splash',
    essenceMin: 3,
    essenceMax: 5,
    alcoholMin: 70,
    alcoholMax: 80,
    waterMin: 15,
    waterMax: 25,
    description: 'Leve, refrescante'
  },
  edc: {
    type: 'edc',
    name: 'Eau de Cologne (EDC)',
    essenceMin: 3,
    essenceMax: 8,
    alcoholMin: 70,
    alcoholMax: 80,
    waterMin: 10,
    waterMax: 20,
    description: 'Clássico cítrico, duração curta'
  },
  edt: {
    type: 'edt',
    name: 'Eau de Toilette (EDT)',
    essenceMin: 8,
    essenceMax: 15,
    alcoholMin: 75,
    alcoholMax: 85,
    waterMin: 5,
    waterMax: 10,
    description: 'Uso diário, moderado'
  },
  edp: {
    type: 'edp',
    name: 'Eau de Parfum (EDP)',
    essenceMin: 15,
    essenceMax: 20,
    alcoholMin: 70,
    alcoholMax: 80,
    waterMin: 0,
    waterMax: 5,
    description: 'Intenso, boa duração'
  },
  parfum: {
    type: 'parfum',
    name: 'Parfum (Extrait)',
    essenceMin: 20,
    essenceMax: 30,
    alcoholMin: 65,
    alcoholMax: 75,
    waterMin: 0,
    waterMax: 5,
    description: 'Luxo, altíssima fixação'
  },
  parfum_absolut: {
    type: 'parfum_absolut',
    name: 'Parfum Absolut / Extrato Puro',
    essenceMin: 30,
    essenceMax: 40,
    alcoholMin: 55,
    alcoholMax: 65,
    waterMin: 0,
    waterMax: 5,
    description: 'Ultra concentrado'
  },
  perfume_oil: {
    type: 'perfume_oil',
    name: 'Perfume Oil (Óleo Perfumado)',
    essenceMin: 15,
    essenceMax: 30,
    alcoholMin: 0,
    alcoholMax: 0,
    waterMin: 0,
    waterMax: 0,
    description: 'Base em óleo carreador'
  },
  attar: {
    type: 'attar',
    name: 'Attar / Ittar',
    essenceMin: 100,
    essenceMax: 100,
    alcoholMin: 0,
    alcoholMax: 0,
    waterMin: 0,
    waterMax: 0,
    description: 'Puro, tradição árabe'
  },
  body_mist: {
    type: 'body_mist',
    name: 'Body Mist',
    essenceMin: 3,
    essenceMax: 5,
    alcoholMin: 50,
    alcoholMax: 60,
    waterMin: 35,
    waterMax: 45,
    description: 'Leve, grande volume'
  },
  brume: {
    type: 'brume',
    name: 'Brume (Bruma)',
    essenceMin: 1,
    essenceMax: 3,
    alcoholMin: 40,
    alcoholMax: 50,
    waterMin: 45,
    waterMax: 55,
    description: 'Ultra-leve, cabelos/corpo'
  }
}

import { ConcentrationType, ConcentrationConfig } from '@/types/perfume'
