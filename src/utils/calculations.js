/**
 * Calcola il modificatore di una caratteristica in base al punteggio totale.
 * Formula D&D 5e: (Punteggio / 2) arrotondato per difetto - 5
 */
export const calcolaModificatore = (punteggioTotale) => {
  return Math.floor(punteggioTotale / 2) - 5;
};

/**
 * Restituisce il bonus di competenza in base al livello del personaggio.
 * Tabella standard D&D 5e.
 */
export const calcolaBonusCompetenza = (livello) => {
  if (livello >= 17) return 6;
  if (livello >= 13) return 5;
  if (livello >= 9) return 4;
  if (livello >= 5) return 3;
  return 2;
};

/**
 * Calcola il punteggio totale di una caratteristica sommando base, razziale e magico.
 */
export const calcolaPunteggioTotale = (caratteristica) => {
  return (caratteristica.punteggioBase || 10) + 
         (caratteristica.bonusRazziale || 0) + 
         (caratteristica.bonusMagico || 0);
};

/**
 * Calcola il bonus totale per un Tiro Salvezza.
 * Include: modificatore di caratteristica + bonus di competenza (se competente) + bonus maestria (se applicabile, es. regole 2024 o homebrew che raddoppiano la competenza).
 */
export const calcolaBonusTiroSalvezza = (caratteristica, livello) => {
  const punteggioTotale = calcolaPunteggioTotale(caratteristica);
  const modificatore = calcolaModificatore(punteggioTotale);
  const bonusCompetenza = calcolaBonusCompetenza(livello);
  
  let bonusTotale = modificatore;
  if (caratteristica.competenzaTS) {
    bonusTotale += bonusCompetenza;
  }
  if (caratteristica.maestriaTS) {
    bonusTotale += bonusCompetenza; // La maestria aggiunge un ulteriore bonus pari alla competenza
  }
  
  return bonusTotale;
};

/**
 * Calcola il bonus totale per una Skill.
 * @param {number} livelloCompetenza - 0 (nessuno), 1 (competenza), 2 (metà competenza), 3 (maestria/espertise)
 * @param {number} abilityModifier - Il modificatore della caratteristica associata alla skill
 * @param {number} livello - Livello del personaggio per calcolare il bonus di competenza base
 */
export const calcolaBonusSkill = (livelloCompetenza, abilityModifier, livello) => {
  const bonusCompetenza = calcolaBonusCompetenza(livello);
  let bonusTotale = abilityModifier;

  switch (livelloCompetenza) {
    case 1: // Competenza standard
      bonusTotale += bonusCompetenza;
      break;
    case 2: // Metà competenza (es. Ladro Affidabile)
      bonusTotale += Math.floor(bonusCompetenza / 2);
      break;
    case 3: // Maestria / Espertise (doppio bonus di competenza)
      bonusTotale += (bonusCompetenza * 2);
      break;
    default: // 0 o altri valori = nessuna competenza
      break;
  }

  return bonusTotale;
};

/**
 * Helper per mappare le skill alle loro caratteristiche di riferimento (in italiano).
 * Utile per l'UI per sapere quale modificatore usare.
 */
export const SKILL_ABILITY_MAP = {
  acrobazia: 'DES',
  addestrareAnimali: 'SAG',
  arcanismo: 'INT',
  atletica: 'FOR',
  furtivita: 'DES',
  inganno: 'CAR',
  indagine: 'INT',
  intimidazione: 'CAR',
  intuizione: 'SAG',
  intrattenere: 'CAR',
  storia: 'INT',
  medicina: 'SAG',
  natura: 'INT',
  percezione: 'SAG',
  persuasione: 'CAR',
  rapiditaDiMano: 'DES',
  religione: 'INT',
  sopravvivenza: 'SAG'
};