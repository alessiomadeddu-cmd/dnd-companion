// Mappa dei bonus razziali standard (PHB 5e)
// Le chiavi sono i nomi base in inglese
export const RACIAL_BONUSES = {
  'dwarf': { FOR: 0, DES: 0, COS: 2, INT: 0, SAG: 0, CAR: 0 },
  'hill-dwarf': { FOR: 0, DES: 0, COS: 2, INT: 0, SAG: 1, CAR: 0 },
  'mountain-dwarf': { FOR: 2, DES: 0, COS: 2, INT: 0, SAG: 0, CAR: 0 },
  'elf': { FOR: 0, DES: 2, COS: 0, INT: 0, SAG: 0, CAR: 0 },
  'high-elf': { FOR: 0, DES: 2, COS: 0, INT: 1, SAG: 0, CAR: 0 },
  'wood-elf': { FOR: 0, DES: 2, COS: 0, INT: 0, SAG: 1, CAR: 0 },
  'halfling': { FOR: 0, DES: 2, COS: 0, INT: 0, SAG: 0, CAR: 0 },
  'lightfoot-halfling': { FOR: 0, DES: 2, COS: 0, INT: 0, SAG: 0, CAR: 1 },
  'stout-halfling': { FOR: 0, DES: 2, COS: 1, INT: 0, SAG: 0, CAR: 0 },
  'human': { FOR: 1, DES: 1, COS: 1, INT: 1, SAG: 1, CAR: 1 },
  'variant-human': null,
  'dragonborn': { FOR: 2, DES: 0, COS: 0, INT: 0, SAG: 0, CAR: 1 },
  'gnome': { FOR: 0, DES: 0, COS: 0, INT: 2, SAG: 0, CAR: 0 },
  'forest-gnome': { FOR: 0, DES: 1, COS: 0, INT: 2, SAG: 0, CAR: 0 },
  'rock-gnome': { FOR: 0, DES: 0, COS: 1, INT: 2, SAG: 0, CAR: 0 },
  'half-elf': null,
  'half-orc': { FOR: 2, DES: 0, COS: 1, INT: 0, SAG: 0, CAR: 0 },
  'tiefling': { FOR: 0, DES: 0, COS: 0, INT: 1, SAG: 0, CAR: 2 },
  'orc': null
};

/**
 * Normalizza lo slug per trovare corrispondenze nella mappa
 * Trasforma: "srd-2024_human" -> "human", "srd_hill-dwarf" -> "hill-dwarf"
 */
const normalizzaSlug = (slug) => {
  if (!slug) return '';
  return slug.toLowerCase()
    .replace(/^(srd[-_]?|2024[-_]?)*/i, '') // Rimuove srd-, srd_, 2024-, 2024_ all'inizio
    .replace(/_/g, '-')                     // Converte eventuali underscore residui in trattini
    .trim();
};

export const applicaBonusRazziali = (caratteristiche, razzaSlug) => {
  if (!razzaSlug) return null;
  
  const normSlug = normalizzaSlug(razzaSlug);
  const bonus = RACIAL_BONUSES[normSlug];
  
  // Se non trova la razza nella mappa, restituisce null
  if (bonus === undefined) return null;
  
  // Se il bonus è null (es. half-elf), significa che è a scelta
  if (bonus === null) return null;

  const nuoveCaratteristiche = {};
  for (const [char, data] of Object.entries(caratteristiche)) {
    nuoveCaratteristiche[char] = { 
      ...data, 
      bonusRazziale: bonus[char] || 0 
    };
  }
  return nuoveCaratteristiche;
};

export const resettaBonusRazziali = (caratteristiche) => {
  const nuoveCaratteristiche = {};
  for (const [char, data] of Object.entries(caratteristiche)) {
    nuoveCaratteristiche[char] = { 
      ...data, 
      bonusRazziale: 0 
    };
  }
  return nuoveCaratteristiche;
};