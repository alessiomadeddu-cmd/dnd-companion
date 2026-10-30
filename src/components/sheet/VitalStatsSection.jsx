import { useState } from 'react';
import { useCharacterStore } from '../../store/useCharacterStore';

export default function VitalStatsSection({ personaggioId }) {
  const aggiornaPersonaggio = useCharacterStore((state) => state.aggiornaPersonaggio);
  const personaggio = useCharacterStore((state) => state.personaggi.find(p => p.id === personaggioId));
  const [isOpen, setIsOpen] = useState(true);

  if (!personaggio) return null;

  const modificaAttributo = (campo, delta) => {
    const nuovoValore = Math.max(0, personaggio.attributi[campo] + delta);
    aggiornaPersonaggio(personaggioId, {
      attributi: { ...personaggio.attributi, [campo]: nuovoValore }
    });
  };

  const setAttributo = (campo, valore) => {
    aggiornaPersonaggio(personaggioId, {
      attributi: { ...personaggio.attributi, [campo]: valore }
    });
  };

  return (
    <div className="fantasy-card mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center border-b border-fantasy-700 pb-2 mb-2 focus:outline-none"
      >
        <h2 className="text-lg font-fantasy text-fantasy-gold">Dati Vitali</h2>
        <span className={`text-fantasy-gold transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      
      {isOpen && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-2 md:col-span-2 bg-fantasy-900 p-3 rounded-lg border border-fantasy-700">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-gray-400 uppercase">HP Attuali</label>
              <span className="text-xs text-gray-500">Max: {personaggio.attributi.hpMax}</span>
            </div>
            <div className="flex items-center justify-between">
              <button onClick={() => modificaAttributo('hpAttuali', -1)} className="fantasy-btn px-3 py-1 text-sm bg-fantasy-danger text-white hover:bg-red-700">-</button>
              <input
                type="number"
                value={personaggio.attributi.hpAttuali}
                onChange={(e) => setAttributo('hpAttuali', parseInt(e.target.value) || 0)}
                className="w-16 text-center bg-transparent text-2xl font-bold text-white focus:outline-none"
              />
              <button onClick={() => modificaAttributo('hpAttuali', 1)} className="fantasy-btn px-3 py-1 text-sm bg-fantasy-success text-white hover:bg-green-700">+</button>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <label className="text-xs text-gray-400">Temp:</label>
              <input
                type="number"
                value={personaggio.attributi.hpTemporanei}
                onChange={(e) => setAttributo('hpTemporanei', parseInt(e.target.value) || 0)}
                className="w-12 bg-transparent border-b border-fantasy-700 text-center text-sm text-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-fantasy-900 p-3 rounded-lg border border-fantasy-700 flex flex-col items-center justify-center">
            <label className="text-xs text-gray-400 uppercase mb-1">CA</label>
            <input
              type="number"
              value={personaggio.attributi.ca}
              onChange={(e) => setAttributo('ca', parseInt(e.target.value) || 10)}
              className="w-full text-center bg-transparent text-3xl font-bold text-white focus:outline-none"
            />
          </div>

          <div className="bg-fantasy-900 p-3 rounded-lg border border-fantasy-700 flex flex-col items-center justify-center">
            <label className="text-xs text-gray-400 uppercase mb-1">Iniziativa</label>
            <input
              type="number"
              value={personaggio.attributi.iniziativa}
              onChange={(e) => setAttributo('iniziativa', parseInt(e.target.value) || 0)}
              className="w-full text-center bg-transparent text-3xl font-bold text-white focus:outline-none"
            />
          </div>

          <div className="col-span-2 md:col-span-2 bg-fantasy-900 p-3 rounded-lg border border-fantasy-700 flex items-center justify-between">
            <label className="text-xs text-gray-400 uppercase">Velocità</label>
            <input
              type="number"
              value={personaggio.attributi.velocita}
              onChange={(e) => setAttributo('velocita', parseInt(e.target.value) || 30)}
              className="w-20 text-right bg-transparent text-xl font-bold text-white focus:outline-none"
            />
            <span className="text-gray-500 text-sm">ft.</span>
          </div>
        </div>
      )}
    </div>
  );
}