// Mappa locale dei Background con le skill consigliate
// Ogni background ha 2 skill fisse (regole 2014 PHB)

export const BACKGROUNDS = {
  acolyte: {
    slug: 'acolyte',
    nome: 'Accolito',
    skill: ['intuizione', 'religione']
  },
  'guild-artisan': {
    slug: 'guild-artisan',
    nome: 'Artigiano di Gilde',
    skill: ['intuizione', 'persuasione']
  },
  charlatan: {
    slug: 'charlatan',
    nome: 'Ciarlatano',
    skill: ['inganno', 'furtivita']
  },
  criminal: {
    slug: 'criminal',
    nome: 'Criminale',
    skill: ['furtivita', 'inganno']
  },
  'folk-hero': {
    slug: 'folk-hero',
    nome: 'Eroe del Popolo',
    skill: ['addestrareAnimali', 'sopravvivenza']
  },
  hermit: {
    slug: 'hermit',
    nome: 'Eremita',
    skill: ['medicina', 'religione']
  },
  noble: {
    slug: 'noble',
    nome: 'Nobile',
    skill: ['storia', 'persuasione']
  },
  urchin: {
    slug: 'urchin',
    nome: 'Orfano',
    skill: ['furtivita', 'rapiditaDiMano']
  },
  sage: {
    slug: 'sage',
    nome: 'Saggio',
    skill: ['arcanismo', 'storia']
  },
  soldier: {
    slug: 'soldier',
    nome: 'Soldato',
    skill: ['atletica', 'intimidazione']
  }
};

/**
 * Restituisce l'array dei background in formato { value, label } per AutocompleteSelect
 */
export const getBackgroundsOptions = () => {
  return Object.values(BACKGROUNDS)
    .map(b => ({
      value: b.slug,
      label: b.nome,
      api_url: null
    }))
    .sort((a, b) => a.label.localeCompare(b.label, 'it'));
};

/**
 * Restituisce le skill consigliate per un background specifico
 * @param {string} backgroundSlug - slug del background
 * @returns {Array} array di skill slug
 */
export const getSkillForBackground = (backgroundSlug) => {
  const bg = BACKGROUNDS[backgroundSlug];
  return bg ? bg.skill : [];
};