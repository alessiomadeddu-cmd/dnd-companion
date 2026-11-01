import { traduci } from '../data/translations';

const BASE_URL = 'https://api.open5e.com/v2';

const getSlug = (item) => {
  return item.slug || item.key || (item.name ? item.name.toLowerCase().replace(/\s+/g, '-') : 'unknown');
};

const fetchAndFormat = async (endpoint) => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);
    const data = await response.json();
    
    const results = Array.isArray(data) ? data : (data.results || []);
    
    // 1. Filtra i duplicati di slug
    const seenSlugs = new Set();
    const uniqueBySlug = results.filter(item => {
      const slug = getSlug(item);
      if (seenSlugs.has(slug)) return false;
      seenSlugs.add(slug);
      return true;
    });
    
    // 2. Mappa i risultati
    const mapped = uniqueBySlug.map(item => {
      const slug = getSlug(item);
      return {
        label: traduci(item.name),
        value: slug,
        api_url: item.url || item.document_url || `${BASE_URL}${endpoint}${slug}/`,
        originale: item.name
      };
    });
    
    // 3. Filtra i duplicati per NOME TRADOTTO
    const seenLabels = new Set();
    const deduped = mapped.filter(item => {
      if (seenLabels.has(item.label)) return false;
      seenLabels.add(item.label);
      return true;
    });
    
    // 4. Ordinamento alfabetico italiano
    return deduped.sort((a, b) => a.label.localeCompare(b.label, 'it'));
  } catch (error) {
    console.error(`Errore nel recupero dati da ${endpoint}:`, error);
    return [];
  }
};

export const getRazze = () => fetchAndFormat('/species/');

export const getClassi = () => fetchAndFormat('/classes/').then(classi => {
  // Filtro di sicurezza: esclude qualsiasi voce che sembri una sottoclasse/archetipo
  return classi.filter(c => 
    !c.label.toLowerCase().includes('sottoclasse') && 
    !c.label.toLowerCase().includes('archetype') &&
    !c.label.toLowerCase().includes('subclass')
  );
});

export const getBackgrounds = () => fetchAndFormat('/backgrounds/');

/**
 * Recupera le sottoclassi (Archetypes) per una classe specifica.
 * Usa l'endpoint corretto con il filtro char_class__slug come da schema DB.
 */
export const getSottoclassi = async (classeSlug) => {
  if (!classeSlug) return [];
  
  try {
    const url = `${BASE_URL}/archetypes/?char_class__slug=${classeSlug}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    const results = Array.isArray(data) ? data : (data.results || []);
    
    const mapped = results.map(item => {
      const slug = getSlug(item);
      return {
        label: traduci(item.name),
        value: slug,
        api_url: item.url || `${BASE_URL}/archetypes/${slug}/`,
        originale: item.name
      };
    });
    
    return mapped.sort((a, b) => a.label.localeCompare(b.label, 'it'));
  } catch (error) {
    console.error(`Errore nel recupero sottoclassi per ${classeSlug}:`, error);
    return [];
  }
};