// Mappa dei bonus razziali standard (PHB 5e)
// Contiene le razze principali e le sottorazze classiche
export const RACIAL_BONUSES = {
  // Nano
  'dwarf': { FOR: 0, DES: 0, COS: 2, INT: 0, SAG: 0, CAR: 0 },
  'hill-dwarf': { FOR: 0, DES: 0, COS: 2, INT: 0, SAG: 1, CAR: 0 },
  'mountain-dwarf': { FOR: 2, DES: 0, COS: 2, INT: 0, SAG: 0, CAR: 0 },
  
  // Elfo
  'elf': { FOR: 0, DES: 2, COS: 0, INT: 0, SAG: 0, CAR: 0 },
  'high-elf': { FOR: 0, DES: 2, COS: 0, INT: 1, SAG: 0, CAR: 0 },
  'wood-elf': { FOR: 0, DES: 2, COS: 0, INT: 0, SAG: 1, CAR: 0 },
  
  // Halfling
  'halfling': { FOR: 0, DES: 2, COS: 0, INT: 0, SAG: 0, CAR: 0 },
  'lightfoot-halfling': { FOR: 0, DES: 2, COS: 0, INT: 0, SAG: 0, CAR: 1 },
  'stout-halfling': { FOR: 0, DES: 2, COS: 1, INT: 0, SAG: 0, CAR: 0 },
  
  // Umano
  'human': { FOR: 1, DES: 1, COS: 1, INT: 1, SAG: 1, CAR: 1 },
  'variant-human': null, // Bonus a scelta
  
  // Dragonborn
  'dragonborn': { FOR: 2, DES: 0, COS: 0, INT: 0, SAG: 0, CAR: 1 },
  
  // Gnomo
  'gnome': { FOR: 0, DES: 0, COS: 0, INT: 2, SAG: 0, CAR: 0 },
  'forest-gnome': { FOR: 0, DES: 1, COS: 0, INT: 2, SAG: 0, CAR: 0 },
  'rock-gnome': { FOR: 0, DES: 0, COS: 1, INT: 2, SAG: 0, CAR: 0 },
  
  // Mezzelfo (Bonus a scelta)
  'half-elf': null,
  
  // Mezzorco
  'half-orc': { FOR: 2, DES: 0, COS: 1, INT: 0, SAG: 0, CAR: 0 },
  
  // Tiefling
  'tiefling': { FOR: 0, DES: 0, COS: 0, INT: 1, SAG: 0, CAR: 2 },
  
  // Orco (2024: bonus a scelta)
  'orc': null,
};

/**
 * Normalizza lo slug per trovare corrispondenze nella mappa
 * Gestisce varianti come: srd-2024_elf, srd_hill-dwarf, Hill Dwarf, ecc.
 */
const normalizzaSlug = (slug) => {
  if (!slug) return '';
  return slug.toLowerCase()
    .replace(/^srd-2024[-_]?/i, '') // Rimuove "srd-2024_" o "srd-2024-"
    .replace(/^srd[-_]?/i, '')      // Rimuove "srd_" o "srd-"
    .replace(/_/g, '-')             // Converte underscore in trattini
    .trim();
};

/**
 * Trova i bonus razziali cercando corrispondenze flessibili
 */
export const applicaBonusRazziali = (caratteristiche, razzaSlug) => {
  if (!razzaSlug) return null;

  // 1. Prova con lo slug esatto restituito dall'API
  let bonus = RACIAL_BONUSES[razzaSlug];
  if (bonus !== undefined) return applicaBonus(caratteristiche, bonus);

  // 2. Prova con lo slug normalizzato
  const slugNorm = normalizzaSlug(razzaSlug);
  bonus = RACIAL_BONUSES[slugNorm];
  if (bonus !== undefined) return applicaBonus(caratteristiche, bonus);

  return null; // Nessuna corrispondenza trovata
};

/**
 * Applica i bonus alle caratteristiche
 */
const applicaBonus = (caratteristiche, bonus) => {
  if (bonus === null) return null; // Indica bonus a scelta (es. Mezzelfo)
  
  const nuoveCaratteristiche = {};
  for (const [char, data] of Object.entries(caratteristiche)) {
    nuoveCaratteristiche[char] = { 
      ...data, 
      bonusRazziale: bonus[char] || 0 
    };
  }
  return nuoveCaratteristiche;
};

/**
 * Resetta i bonus razziali a 0
 */
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