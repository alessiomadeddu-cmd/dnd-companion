import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Helper per generare un ID univoco senza usare crypto.randomUUID()
// (che richiede HTTPS e fallisce su reti locali HTTP)
const generaIdUnivoco = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

// --- MODELLO DATI INIZIALE ---
const creaPersonaggioVuoto = (nome) => {
  const oggi = new Date().toISOString();
  return {
    id: generaIdUnivoco(), // <-- Modificato qui
    nome: nome || 'Nuovo Personaggio',
    dataCreazione: oggi,
    dataUltimaModifica: oggi,
    versioneModello: '1.0.0',

    identita: {
      razza: '', classe: '', sottoclasse: '', livello: 1, background: '', allineamento: '', xp: 0
    },

    attributi: {
      hpMax: 10, hpAttuali: 10, hpTemporanei: 0,
      ca: 10, velocita: 30, iniziativa: 0, bonusCompetenza: 2,
      puntiIspirazione: 0
    },

    caratteristiche: {
      FOR: { punteggioBase: 10, bonusRazziale: 0, bonusMagico: 0, competenzaTS: false, maestriaTS: false },
      DES: { punteggioBase: 10, bonusRazziale: 0, bonusMagico: 0, competenzaTS: false, maestriaTS: false },
      COS: { punteggioBase: 10, bonusRazziale: 0, bonusMagico: 0, competenzaTS: false, maestriaTS: false },
      INT: { punteggioBase: 10, bonusRazziale: 0, bonusMagico: 0, competenzaTS: false, maestriaTS: false },
      SAG: { punteggioBase: 10, bonusRazziale: 0, bonusMagico: 0, competenzaTS: false, maestriaTS: false },
      CAR: { punteggioBase: 10, bonusRazziale: 0, bonusMagico: 0, competenzaTS: false, maestriaTS: false },
    },

    skill: {
      acrobazia: 0, addestrareAnimali: 0, arcanismo: 0, atletica: 0,
      furtivita: 0, inganno: 0, indagine: 0, intimidazione: 0,
      intuizione: 0, intrattenere: 0, storia: 0, medicina: 0,
      natura: 0, percezione: 0, persuasione: 0, rapiditaDiMano: 0,
      religione: 0, sopravvivenza: 0
    },

    condizioni: {
      accecato: false, affascinato: false, avvelenato: false, deafened: false,
      esautorato: false, invisibile: false, inabile: false, paralizzato: false,
      pietrificato: false, prono: false, stordito: false, trattenuto: false
    },

    tsMorte: { successi: 0, fallimenti: 0 },

    slotIncantesimo: {
      1: { slotMax: 0, slotUsati: 0 }, 2: { slotMax: 0, slotUsati: 0 },
      3: { slotMax: 0, slotUsati: 0 }, 4: { slotMax: 0, slotUsati: 0 },
      5: { slotMax: 0, slotUsati: 0 }, 6: { slotMax: 0, slotUsati: 0 },
      7: { slotMax: 0, slotUsati: 0 }, 8: { slotMax: 0, slotUsati: 0 },
      9: { slotMax: 0, slotUsati: 0 }
    },

    incantesimi: [],
    azioni: [],
    risorse: [],

    equipaggiamento: {
      monete: { MO: 0, MA: 0, MR: 0, MP: 0, PR: 0 },
      oggetti: []
    },

    roleplay: {
      trattiPersonalita: '', ideali: '', legami: '', difetti: '', noteLibere: ''
    },

    proficienze: {
      linguaggi: [], strumenti: [], armature: [], armi: []
    }
  };
};

// --- STORE ZUSTAND ---
export const useCharacterStore = create(
  persist(
    (set, get) => ({
      personaggi: [],
      personaggioAttivoId: null,

      aggiungiPersonaggio: (nome) => {
        const nuovoPersonaggio = creaPersonaggioVuoto(nome);
        set((state) => ({
          personaggi: [...state.personaggi, nuovoPersonaggio],
          personaggioAttivoId: nuovoPersonaggio.id
        }));
      },

      aggiornaPersonaggio: (id, datiAggiornati) => {
        set((state) => ({
          personaggi: state.personaggi.map((p) =>
            p.id === id ? { ...p, ...datiAggiornati, dataUltimaModifica: new Date().toISOString() } : p
          )
        }));
      },

      eliminaPersonaggio: (id) => {
        set((state) => {
          const nuoviPersonaggi = state.personaggi.filter((p) => p.id !== id);
          return {
            personaggi: nuoviPersonaggi,
            personaggioAttivoId: state.personaggioAttivoId === id 
              ? (nuoviPersonaggi.length > 0 ? nuoviPersonaggi[0].id : null) 
              : state.personaggioAttivoId
          };
        });
      },

      impostaPersonaggioAttivo: (id) => {
        set({ personaggioAttivoId: id });
      },

      esportaPersonaggi: () => {
        return JSON.stringify(get().personaggi, null, 2);
      },

      importaPersonaggi: (jsonString) => {
        try {
          const personaggiImportati = JSON.parse(jsonString);
          if (Array.isArray(personaggiImportati)) {
            set({ personaggi: personaggiImportati });
            return true;
          }
          return false;
        } catch (e) {
          console.error("Errore nell'importazione del JSON:", e);
          return false;
        }
      },

      getPersonaggioAttivo: () => {
        const state = get();
        return state.personaggi.find((p) => p.id === state.personaggioAttivoId) || null;
      }
    }),
    {
      name: 'dnd-companion-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);