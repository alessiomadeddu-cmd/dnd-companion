const dizionario = {
  // === CLASSI BASE ===
  "Barbarian": "Barbaro",
  "Bard": "Bardo",
  "Cleric": "Chierico",
  "Druid": "Druido",
  "Fighter": "Guerriero",
  "Monk": "Monaco",
  "Paladin": "Paladino",
  "Ranger": "Ranger",
  "Rogue": "Ladro",
  "Sorcerer": "Stregone",
  "Warlock": "Warlock",
  "Wizard": "Mago",
  "Marshal": "Maresciallo",
  "Gambling General": "Generale d'Azzardo",
  "Abjurationist": "Abiuratore",
  "Evoker": "Invocatore",

  // === SOTTOCLASSI: BARBARO ===
  "Path of the Berserker": "Sentiero del Berserker",
  "Path of the Totem Warrior": "Sentiero del Guerriero Totemico",

  // === SOTTOCLASSI: BARDO ===
  "College of Lore": "Collegio della Conoscenza",
  "College of Skalds": "Collegio degli Skald",
  "College of Valor": "Collegio del Valore",

  // === SOTTOCLASSI: CHIERICO ===
  "Life Domain": "Dominio della Vita",
  "Light Domain": "Dominio della Luce",
  "Tempest Domain": "Dominio della Tempesta",
  "Trickery Domain": "Dominio dell'Inganno",
  "War Domain": "Dominio della Guerra",
  "Demise Domain": "Dominio della Fine",
  "Mischief Domain": "Dominio della Mischia",
  "Storm Domain": "Dominio della Tempesta",

  // === SOTTOCLASSI: DRUIDO ===
  "Circle of the Land": "Circolo della Terra",
  "Circle of the Moon": "Circolo della Luna",
  "Circle of the Many": "Circolo dei Molti",

  // === SOTTOCLASSI: GUERRIERO ===
  "Champion": "Campione",
  "Battle Master": "Maestro di Battaglia",
  "Eldritch Knight": "Cavaliere Arcano",
  "Arcane Warrior": "Guerriero Arcano",
  "Talented Tactician": "Tattico Talentuoso",
  "Warrior of the Open Hand": "Guerriero della Mano Aperta",

  // === SOTTOCLASSI: MONACO ===
  "Way of the Open Hand": "Via della Mano Aperta",
  "Way of Shadow": "Via dell'Ombra",
  "Way of Shadowdancing": "Via della Danza delle Ombre",

  // === SOTTOCLASSI: PALADINO ===
  "Oath of Devotion": "Giuramento di Devozione",
  "Oath of the Ancients": "Giuramento degli Antichi",
  "Oath of Vengeance": "Giuramento di Vendetta",
  "Oathless Betrayer": "Traditore Senza Giuramento",

  // === SOTTOCLASSI: RANGER ===
  "Hunter": "Cacciatore",
  "Beast Master": "Dominatore di Bestie",

  // === SOTTOCLASSI: LADRO ===
  "Thief": "Ladro",
  "Assassin": "Assassino",
  "Arcane Trickster": "Imbroglione Arcano",
  "Eldritch Trickster": "Imbroglione Arcano",

  // === SOTTOCLASSI: STREGONE ===
  "Draconic Bloodline": "Linea di Sangue Draconica",
  "Draconic Sorcery": "Stregoneria Draconica",
  "Wild Magic": "Magia Selvaggia",
  "Wyrd Magic": "Magia del Wyrd",

  // === SOTTOCLASSI: WARLOCK ===
  "The Archfey": "Il Signore delle Fate",
  "The Fiend": "Il Demone",
  "The Great Old One": "Il Grande Antico",
  "Fiend Patron": "Patrono Demoniaco",
  "The Ancient Fey Court": "L'Antica Corte Fatata",
  "The Great Elder Thing": "La Grande Cosa Anziana",

  // === SOTTOCLASSI: MAGO ===
  "School of Abjuration": "Scuola di Abiurazione",
  "School of Conjuration": "Scuola di Invocazione",
  "School of Divination": "Scuola di Divinazione",
  "School of Enchantment": "Scuola di Ammaliamento",
  "School of Evocation": "Scuola di Evocazione",
  "School of Illusion": "Scuola di Illusione",
  "School of Necromancy": "Scuola di Necromanzia",
  "School of Transmutation": "Scuola di Trasmutazione",
  "School of Abjuring and Warding": "Scuola di Abiurazione e Protezione",
  "School of Divining and Soothsaying": "Scuola di Divinazione e Profezia",
  "School of Illusions and Phantasms": "Scuola di Illusioni e Fantasmi",
  "School of Necrotic Arts": "Scuola delle Arti Necrotiche",

  // === ALTRE CLASSI / HOME BREW ===
  "Mechanist": "Meccanico",
  "Metallurgist": "Metallurgista",
  "Swift Strategist": "Stratega Rapido",

  // === SPECIE / RAZZE ===
  "Dragonborn": "Dragonide",
  "Dwarf": "Nano",
  "Hill Dwarf": "Nano delle Colline",
  "Mountain Dwarf": "Nano della Montagna",
  "Elf": "Elfo",
  "High Elf": "Elfo Alto",
  "Wood Elf": "Elfo dei Boschi",
  "Drow": "Drow",
  "Gnome": "Gnomo",
  "Forest Gnome": "Gnomo dei Boschi",
  "Rock Gnome": "Gnomo delle Rocce",
  "Half-Elf": "Mezzelfo",
  "Half-Orc": "Mezzorco",
  "Halfling": "Halfling",
  "Lightfoot": "Halfling Piedelesto",
  "Stout Halfling": "Halfling Robusto",
  "Human": "Umano",
  "Orc": "Orco",
  "Tiefling": "Tiefling",
  "Goliath": "Golia",
  "Catfolk": "Popolo-Gatto",
  "Kobold Heritage": "Eredità dei Koboldi",
  "Stoor Halfling": "Halfling Stoor",
  "Gearforged": "Forgiato",
  "Fever-Bit": "Febbricitante",
  "Gnome Chassis": "Struttura di Gnomo",
  "Gnome Heritage": "Eredità degli Gnomi",
  "Halfling Heritage": "Eredità degli Halfling",
  "Human Chassis": "Struttura Umana",
  "Human/Half-Elf Heritage": "Eredità Umana/Mezzelfica",
  "Kobold Chassis": "Struttura di Koboldo",
  "Acid Cap": "Cappello Acido",
  "Alseid": "Alseide",
  "Bhain Kwai": "Bhain Kwai",
  "Boghaid": "Boghaid",
  "Darakhul": "Darakhul",
  "Delver": "Esploratore",
  "Derro": "Derro",
  "Derro Heritage": "Eredità dei Derro",
  "Dragonborn Heritage": "Eredità dei Dragonidi",
  "Drow Heritage": "Eredità dei Drow",
  "Dwarf Chassis": "Struttura di Nano",
  "Dwarf Heritage": "Eredità dei Nani",
  "Elf/Shadow Fey Heritage": "Eredità Elfo/Fata Ombra",
  "Erina": "Erina",
  "Far-Touched": "Toccato dal Lontano",
  "Favored": "Prediletto",

  // === BACKGROUND ===
  "Acolyte": "Accolito",
  "Artisan": "Artigiano",
  "Charlatan": "Ciarlatano",
  "Criminal": "Criminale",
  "Cultist": "Cultista",
  "Entertainer": "Intrattenitore",
  "Exile": "Esiliato",
  "Farmer": "Contadino",
  "Folk Hero": "Eroe del Popolo",
  "Gambler": "Giocatore d'Azzardo",
  "Guard": "Guardia",
  "Guildmember": "Membro di Gilda",
  "Hermit": "Eremita",
  "Marauder": "Predone",
  "Noble": "Nobile",
  "Outlander": "Silvano",
  "Sage": "Saggio",
  "Sailor": "Marinaio",
  "Soldier": "Soldato",
  "Trader": "Mercante",
  "Urchin": "Monello",
  "Deep Hunter": "Cacciatore delle Profondità",
  "Dungeon Robber": "Ladro di Dungeon",
  "Escapee from Below": "Fuggito dal Sottosuolo",
  "Imposter": "Impostore",
  "Cursed": "Maledetto",
  "Haunted": "Tormentato",
  "Con Artist": "Truffatore",
  "Scoundrel": "Brigante",
  "Crime Syndicate Member": "Membro del Sindacato del Crimine",
  "Elemental Warden": "Custode Elementale",
  "Fate-Touched": "Toccato dal Destino",
  "Lyceum Student": "Studente del Liceo",
  "Recovered Cultist": "Cultista Redento",
  "Court Servant": "Servitore di Corte",
  "Desert Runner": "Corridore del Deserto",
  "Destined": "Predestinato",
  "Diplomat": "Diplomatico",
  "Forest Dweller": "Abitante della Foresta",
  "Former Adventurer": "Ex Avventuriero",
  "Freebooter": "Filibustiere",
  "Gamekeeper": "Guardiacaccia",
  "Innkeeper": "Locandiere",
  "Mercenary Company Scion": "Erede di Compagnia Mercenaria",
  "Mercenary Recruit": "Recluta Mercenaria"
};

/**
 * Funzione di traduzione blindata.
 * Ignora automaticamente qualsiasi spazio accidentale nel file o nell'input.
 */
export const traduci = (testoInglese) => {
  if (!testoInglese) return '';
  
  // Pulisce l'input da spazi iniziali/finali
  const cleanInput = String(testoInglese).trim();
  
  // Cerca la chiave nel dizionario ignorando eventuali spazi accidentali nelle chiavi del file
  const chiaveTrovata = Object.keys(dizionario).find(k => k.trim() === cleanInput);
  
  if (chiaveTrovata) {
    return dizionario[chiaveTrovata].trim();
  }
  
  console.warn(`[Traduzione mancante per]: "${cleanInput}"`);
  return cleanInput;
};