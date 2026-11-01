// Mappa locale completa delle Classi e Sottoclassi D&D 5e
// Tutte le sottoclassi sono selezionabili dal livello 3
export const CLASSI = {
  artificer: {
    slug: 'artificer',
    nome: 'Artefice',
    livelloSottoclasse: 3,
    sottoclassi: [
      { slug: 'alchemist', nome: 'Alchimista' },
      { slug: 'armorer', nome: 'Armaiolo' },
      { slug: 'artillerist', nome: 'Artigliere' },
      { slug: 'battle-smith', nome: 'Fabbro da Battaglia' }
    ]
  },
  barbarian: {
    slug: 'barbarian',
    nome: 'Barbaro',
    livelloSottoclasse: 3,
    sottoclassi: [
      { slug: 'berserker', nome: 'Sentiero del Berserker' },
      { slug: 'ancestral-guardian', nome: 'Sentiero del Guardiano Ancestrale' },
      { slug: 'zealot', nome: 'Sentiero dello Zelota' },
      { slug: 'beast', nome: 'Sentiero della Bestia' },
      { slug: 'totem-warrior', nome: 'Sentiero del Totem' },
      { slug: 'wild-magic-barbarian', nome: 'Sentiero della Magia Selvaggia' }
    ]
  },
  bard: {
    slug: 'bard',
    nome: 'Bardo',
    livelloSottoclasse: 3,
    sottoclassi: [
      { slug: 'lore', nome: 'Collegio della Conoscenza' },
      { slug: 'valor', nome: 'Collegio del Valore' },
      { slug: 'spirits', nome: 'Collegio degli Spiriti' },
      { slug: 'glamour', nome: 'Collegio del Glamour' },
      { slug: 'swords', nome: 'Collegio delle Spade' },
      { slug: 'whispers', nome: 'Collegio dei Sussurri' },
      { slug: 'creation', nome: 'Collegio della Creazione' }
    ]
  },
  cleric: {
    slug: 'cleric',
    nome: 'Chierico',
    livelloSottoclasse: 3,
    sottoclassi: [
      { slug: 'life', nome: 'Dominio della Vita' },
      { slug: 'light', nome: 'Dominio della Luce' },
      { slug: 'war', nome: 'Dominio della Guerra' },
      { slug: 'knowledge', nome: 'Dominio della Conoscenza' },
      { slug: 'nature', nome: 'Dominio della Natura' },
      { slug: 'tempest', nome: 'Dominio della Tempesta' },
      { slug: 'trickery', nome: "Dominio dell'Inganno" },
      { slug: 'grave', nome: 'Dominio della Tomba' },
      { slug: 'forge', nome: 'Dominio della Forgia' },
      { slug: 'arcana', nome: "Dominio dell'Arcano" },
      { slug: 'order', nome: "Dominio dell'Ordine" },
      { slug: 'peace', nome: 'Dominio della Pace' },
      { slug: 'twilight', nome: 'Dominio del Crepuscolo' }
    ]
  },
  druid: {
    slug: 'druid',
    nome: 'Druido',
    livelloSottoclasse: 3,
    sottoclassi: [
      { slug: 'land', nome: 'Circolo della Terra' },
      { slug: 'moon', nome: 'Circolo della Luna' },
      { slug: 'dreams', nome: 'Circolo dei Sogni' },
      { slug: 'shepherd', nome: 'Circolo del Pastore' },
      { slug: 'spores', nome: 'Circolo delle Spore' },
      { slug: 'stars', nome: 'Circolo delle Stelle' },
      { slug: 'wildfire', nome: 'Circolo del Fuoco Selvaggio' }
    ]
  },
  fighter: {
    slug: 'fighter',
    nome: 'Guerriero',
    livelloSottoclasse: 3,
    sottoclassi: [
      { slug: 'champion', nome: 'Campione' },
      { slug: 'battle-master', nome: 'Maestro di Battaglia' },
      { slug: 'eldritch-knight', nome: 'Cavaliere Arcano' },
      { slug: 'arcane-archer', nome: 'Arciere Arcano' },
      { slug: 'cavalier', nome: 'Cavaliere' },
      { slug: 'samurai', nome: 'Samurai' },
      { slug: 'psi-warrior', nome: 'Guerriero Psi' },
      { slug: 'rune-knight', nome: 'Cavaliere Runico' }
    ]
  },
  rogue: {
    slug: 'rogue',
    nome: 'Ladro',
    livelloSottoclasse: 3,
    sottoclassi: [
      { slug: 'thief', nome: 'Ladro' },
      { slug: 'assassin', nome: 'Assassino' },
      { slug: 'arcane-trickster', nome: 'Ingannatore Arcano' },
      { slug: 'phantom', nome: 'Fantasma' },
      { slug: 'soulknife', nome: "Lama dell'Anima" },
      { slug: 'inquisitive', nome: 'Investigatore' },
      { slug: 'swashbuckler', nome: 'Acrobata' },
      { slug: 'scout', nome: 'Esploratore' }
    ]
  },
  wizard: {
    slug: 'wizard',
    nome: 'Mago',
    livelloSottoclasse: 3,
    sottoclassi: [
      { slug: 'abjuration', nome: 'Scuola di Abiurazione' },
      { slug: 'conjuration', nome: 'Scuola di Conjurazione' },
      { slug: 'divination', nome: 'Scuola di Divinazione' },
      { slug: 'enchantment', nome: 'Scuola di Ammaliamento' },
      { slug: 'evocation', nome: 'Scuola di Evocazione' },
      { slug: 'illusion', nome: 'Scuola di Illusione' },
      { slug: 'necromancy', nome: 'Scuola di Necromanzia' },
      { slug: 'transmutation', nome: 'Scuola di Trasmutazione' },
      { slug: 'bladesinging', nome: 'Cantore delle Lame' },
      { slug: 'chronurgy', nome: 'Cronurgia' },
      { slug: 'graviturgy', nome: 'Graviturgia' },
      { slug: 'order-of-scribes', nome: 'Ordine degli Scribi' }
    ]
  },
  monk: {
    slug: 'monk',
    nome: 'Monaco',
    livelloSottoclasse: 3,
    sottoclassi: [
      { slug: 'open-hand', nome: 'Via della Mano Aperta' },
      { slug: 'shadow', nome: "Via dell'Ombra" },
      { slug: 'four-elements', nome: 'Via dei Quattro Elementi' },
      { slug: 'long-death', nome: 'Via della Lunga Morte' },
      { slug: 'sun-soul', nome: 'Via del Sole Splendente' },
      { slug: 'kensei', nome: 'Via del Kensei' },
      { slug: 'mercy', nome: 'Via della Misericordia' },
      { slug: 'ascendant-dragon', nome: 'Via del Drago Ascendente' }
    ]
  },
  paladin: {
    slug: 'paladin',
    nome: 'Paladino',
    livelloSottoclasse: 3,
    sottoclassi: [
      { slug: 'devotion', nome: 'Giuramento della Devozione' },
      { slug: 'ancients', nome: 'Giuramento degli Antichi' },
      { slug: 'vengeance', nome: 'Giuramento della Vendetta' },
      { slug: 'conquest', nome: 'Giuramento della Conquista' },
      { slug: 'redemption', nome: 'Giuramento della Redenzione' },
      { slug: 'glory', nome: 'Giuramento della Gloria' },
      { slug: 'watchers', nome: 'Giuramento dei Guardiani' },
      { slug: 'oathbreaker', nome: 'Giuramento Infranto' }
    ]
  },
  ranger: {
    slug: 'ranger',
    nome: 'Ranger',
    livelloSottoclasse: 3,
    sottoclassi: [
      { slug: 'hunter', nome: 'Cacciatore' },
      { slug: 'beast-master', nome: 'Padrone delle Bestie' },
      { slug: 'gloom-stalker', nome: 'Cacciatore delle Ombre' },
      { slug: 'fey-wanderer', nome: 'Viandante Fatato' },
      { slug: 'swarmkeeper', nome: 'Custode dello Sciame' },
      { slug: 'drakewarden', nome: 'Custode dei Drake' },
      { slug: 'horizon-walker', nome: "Camminatore dell'Orizzonte" },
      { slug: 'monster-slayer', nome: 'Cacciatore di Mostri' }
    ]
  },
  sorcerer: {
    slug: 'sorcerer',
    nome: 'Stregone',
    livelloSottoclasse: 3,
    sottoclassi: [
      { slug: 'draconic', nome: 'Discendenza Draconica' },
      { slug: 'wild-magic', nome: 'Magia Selvaggia' },
      { slug: 'storm', nome: 'Anima della Tempesta' },
      { slug: 'shadow', nome: 'Anima Ombra' },
      { slug: 'aberrant-mind', nome: 'Mente Aberrante' },
      { slug: 'clockwork', nome: 'Anima Meccanica' },
      { slug: 'divine-soul', nome: 'Anima Divina' }
    ]
  },
  warlock: {
    slug: 'warlock',
    nome: 'Warlock',
    livelloSottoclasse: 3,
    sottoclassi: [
      { slug: 'fiend', nome: "L'Immondo" },
      { slug: 'great-old-one', nome: 'Il Grande Antico' },
      { slug: 'archfey', nome: "L'Archifata" },
      { slug: 'celestial', nome: 'Il Celestiale' },
      { slug: 'hexblade', nome: 'La Lama Fatata' },
      { slug: 'genie', nome: 'Il Genio' },
      { slug: 'undead', nome: 'Il Non Morto' },
      { slug: 'undying', nome: "L'Immortale" }
    ]
  }
};

/**
 * Restituisce l'array delle classi in formato { value, label } per AutocompleteSelect
 */
export const getClassiOptions = () => {
  return Object.values(CLASSI)
    .map(c => ({
      value: c.slug,
      label: c.nome,
      api_url: null
    }))
    .sort((a, b) => a.label.localeCompare(b.label, 'it'));
};

/**
 * Restituisce le sottoclassi di una classe specifica
 */
export const getSottoclassiForClasse = (classeSlug) => {
  const classe = CLASSI[classeSlug];
  if (!classe || !classe.sottoclassi) return [];
  
  return classe.sottoclassi.map(s => ({
    value: s.slug,
    label: s.nome,
    api_url: null
  }));
};

/**
 * Restituisce il livello in cui si sceglie la sottoclasse
 * (Ora sempre 3 per tutte le classi)
 */
export const getLivelloSottoclasse = (classeSlug) => {
  const classe = CLASSI[classeSlug];
  return classe ? classe.livelloSottoclasse : 3;
};