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
    
    // 1. Filtra i duplicati di slug (per evitare errori tecnici)
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

    // 3. Filtra i duplicati per NOME TRADOTTO (così "Umano" appare una volta sola)
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
export const getClassi = () => fetchAndFormat('/classes/');
export const getBackgrounds = () => fetchAndFormat('/backgrounds/');