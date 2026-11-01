const FULL_CASTER = {
  1: { 1: 2 }, 2: { 1: 3 }, 3: { 1: 4, 2: 2 }, 4: { 1: 4, 2: 3 },
  5: { 1: 4, 2: 3, 3: 2 }, 6: { 1: 4, 2: 3, 3: 3 }, 7: { 1: 4, 2: 3, 3: 3, 4: 1 },
  8: { 1: 4, 2: 3, 3: 3, 4: 2 }, 9: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
  10: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 }, 11: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
  12: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 }, 13: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
  14: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 }, 15: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
  16: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 }, 17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 },
  18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 }, 19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 1, 8: 1, 9: 1 },
  20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1 }
};

const HALF_CASTER = {
  1: {}, 2: { 1: 2 }, 3: { 1: 3 }, 4: { 1: 3 }, 5: { 1: 4, 2: 2 },
  6: { 1: 4, 2: 2 }, 7: { 1: 4, 2: 3 }, 8: { 1: 4, 2: 3 }, 9: { 1: 4, 2: 3, 3: 2 },
  10: { 1: 4, 2: 3, 3: 2 }, 11: { 1: 4, 2: 3, 3: 3 }, 12: { 1: 4, 2: 3, 3: 3 },
  13: { 1: 4, 2: 3, 3: 3, 4: 1 }, 14: { 1: 4, 2: 3, 3: 3, 4: 1 }, 15: { 1: 4, 2: 3, 3: 3, 4: 2 },
  16: { 1: 4, 2: 3, 3: 3, 4: 2 }, 17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 }, 18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
  19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 }, 20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 }
};

const WARLOCK = {
  1: { 1: 1 }, 2: { 1: 2 }, 3: { 2: 2 }, 4: { 2: 2 }, 5: { 3: 2 },
  6: { 3: 2 }, 7: { 4: 2 }, 8: { 4: 2 }, 9: { 5: 2 }, 10: { 5: 2 },
  11: { 5: 3 }, 12: { 5: 3 }, 13: { 5: 3 }, 14: { 5: 3 }, 15: { 5: 3 },
  16: { 5: 3 }, 17: { 5: 4 }, 18: { 5: 4 }, 19: { 5: 4 }, 20: { 5: 4 }
};

const NONE = {};

const normalizzaClasse = (slug) => {
  if (!slug) return '';
  return slug.toLowerCase().replace(/^(srd[-_]?|2024[-_]?)*/i, '').replace(/_/g, '-');
};

const getProgressione = (classeSlug) => {
  const norm = normalizzaClasse(classeSlug);
  if (norm.includes('warlock')) return WARLOCK;
  if (norm.includes('wizard') || norm.includes('cleric') || norm.includes('druid') || 
      norm.includes('bard') || norm.includes('sorcerer')) return FULL_CASTER;
  if (norm.includes('paladin') || norm.includes('ranger')) return HALF_CASTER;
  return NONE;
};

export const calcolaNuoviSlotIncantesimo = (classeSlug, livello, slotAttuali) => {
  const tabella = getProgressione(classeSlug);
  const slotsLivello = tabella[livello] || {};
  const nuoviSlot = {};
  
  for (let i = 1; i <= 9; i++) {
    const slotMax = slotsLivello[i] || 0;
    const slotUsatiPrecedenti = slotAttuali?.[i]?.slotUsati || 0;
    const slotUsati = Math.min(slotUsatiPrecedenti, slotMax);
    
    nuoviSlot[i] = { slotMax, slotUsati };
  }
  return nuoviSlot;
};