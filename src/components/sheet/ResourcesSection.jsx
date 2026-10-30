import { useState } from 'react';
import { useCharacterStore } from '../../store/useCharacterStore';

export default function ResourcesSection({ personaggioId }) {
  const aggiornaPersonaggio = useCharacterStore((state) => state.aggiornaPersonaggio);
  const personaggio = useCharacterStore((state) => state.personaggi.find(p => p.id === personaggioId));
  const [isOpen, setIsOpen] = useState(true);

  if (!personaggio) return null;

  const toggleIspirazione = () => {
    aggiornaPersonaggio(personaggioId, {
      attributi: { ...personaggio.attributi, puntiIspirazione: personaggio.attributi.puntiIspirazione ? 0 : 1 }
    });
  };

  const aggiornaSlot = (livello, campo, delta) => {
    const slot = personaggio.slotIncantesimo[livello];
    const nuovoValore = Math.max(0, Math.min(slot.slotMax, slot[campo] + delta));
    
    const nuoviSlot = { ...personaggio.slotIncantesimo };
    nuoviSlot[livello] = { ...slot, [campo]: nuovoValore };
    
    aggiornaPersonaggio(personaggioId, { slotIncantesimo: nuoviSlot });
  };

  const aggiornaTSMorte = (tipo, delta) => {
    const ts = personaggio.tsMorte;
    const nuovoValore = Math.max(0, Math.min(3, ts[tipo] + delta));
    aggiornaPersonaggio(personaggioId, { tsMorte: { ...ts, [tipo]: nuovoValore } });
  };

  return (
    <div className="fantasy-card mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center border-b border-fantasy-700 pb-2 mb-2 focus:outline-none"
      >
        <h2 className="text-lg font-fantasy text-fantasy-gold">Risorse & Stato</h2>
        <span className={`text-fantasy-gold transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      
      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-center bg-fantasy-900 p-4 rounded-lg border border-fantasy-700">
            <label className="text-xs text-gray-400 uppercase mb-2">Ispirazione</label>
            <button 
              onClick={toggleIspirazione}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-2xl transition-colors ${
                personaggio.attributi.puntiIspirazione 
                  ? 'bg-fantasy-gold border-fantasy-gold text-fantasy-900' 
                  : 'bg-transparent border-fantasy-700 text-gray-600'
              }`}
            >
              ★
            </button>
          </div>

          <div className="bg-fantasy-900 p-4 rounded-lg border border-fantasy-700">
            <label className="block text-xs text-gray-400 uppercase mb-3 text-center">Tiri Salvezza Morte</label>
            <div className="flex justify-between items-center mb-2">
              <span className="text-green-500 text-sm">Successi</span>
              <div className="flex gap-2">
                <button onClick={() => aggiornaTSMorte('successi', -1)} className="text-gray-400 hover:text-white">-</button>
                <span className="text-white font-bold w-4 text-center">{personaggio.tsMorte.successi}</span>
                <button onClick={() => aggiornaTSMorte('successi', 1)} className="text-gray-400 hover:text-white">+</button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-red-500 text-sm">Fallimenti</span>
              <div className="flex gap-2">
                <button onClick={() => aggiornaTSMorte('fallimenti', -1)} className="text-gray-400 hover:text-white">-</button>
                <span className="text-white font-bold w-4 text-center">{personaggio.tsMorte.fallimenti}</span>
                <button onClick={() => aggiornaTSMorte('fallimenti', 1)} className="text-gray-400 hover:text-white">+</button>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 bg-fantasy-900 p-4 rounded-lg border border-fantasy-700">
            <label className="block text-xs text-gray-400 uppercase mb-3 text-center">Slot Incantesimo</label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((livello) => {
                const slot = personaggio.slotIncantesimo[livello];
                if (slot.slotMax === 0) return null;
                return (
                  <div key={livello} className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 w-12">{livello}° Liv</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => aggiornaSlot(livello, 'slotUsati', -1)} className="text-gray-400 hover:text-white px-1">-</button>
                      <span className="text-white font-bold w-8 text-center">{slot.slotMax - slot.slotUsati}/{slot.slotMax}</span>
                      <button onClick={() => aggiornaSlot(livello, 'slotUsati', 1)} className="text-gray-400 hover:text-white px-1">+</button>
                    </div>
                  </div>
                );
              })}
              {Object.values(personaggio.slotIncantesimo).every(s => s.slotMax === 0) && (
                <p className="text-gray-600 text-xs text-center">Nessuno slot configurato</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}