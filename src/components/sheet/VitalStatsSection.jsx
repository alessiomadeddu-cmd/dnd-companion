import { useState } from 'react';
import { useCharacterStore } from '../../store/useCharacterStore';

export default function VitalStatsSection({ personaggioId }) {
  const aggiornaPersonaggio = useCharacterStore((state) => state.aggiornaPersonaggio);
  const personaggio = useCharacterStore((state) => state.personaggi.find(p => p.id === personaggioId));
  const [isOpen, setIsOpen] = useState(true);

  if (!personaggio) return null;

  const { hpAttuali, hpMax, ca, iniziativa, velocita } = personaggio.attributi;

  const hpPercent = hpMax > 0 
    ? Math.min(100, Math.max(0, (hpAttuali / hpMax) * 100)) 
    : 0;

  const getBarBackground = () => {
    if (hpPercent < 25) {
      return '#dc2626'; 
    }
    const redStop = (25 / hpPercent) * 100;
    return `linear-gradient(to right, #dc2626 0%, #dc2626 ${redStop}%, #d4af37 ${redStop}%, #d4af37 100%)`;
  };

  // MODIFICA: gestione del limite massimo per hpAttuali
  const modificaAttributo = (campo, delta) => {
    let nuovoValore = personaggio.attributi[campo] + delta;
    
    // Gli HP attuali non possono superare il massimo
    if (campo === 'hpAttuali') {
      nuovoValore = Math.min(hpMax, Math.max(0, nuovoValore));
    } else {
      nuovoValore = Math.max(0, nuovoValore);
    }
    
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
    <div className="fantasy-card mb-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-fantasy-gold opacity-60"></div>
      <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-fantasy-gold opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-fantasy-gold opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-fantasy-gold opacity-60"></div>

      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center border-b border-fantasy-700 pb-2 mb-3 focus:outline-none relative z-10"
      >
        <h2 className="text-lg font-fantasy text-fantasy-gold">Dati Vitali</h2>
        <span className={`text-fantasy-gold transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      
      {isOpen && (
        <div className="space-y-4">
          <div className="bg-fantasy-900 border border-fantasy-700 rounded-lg p-3 relative"
               style={{ boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)' }}>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => modificaAttributo('hpAttuali', -1)}
                className="flex-shrink-0 w-12 h-12 rounded-lg bg-fantasy-800 hover:bg-fantasy-700 transition-colors flex items-center justify-center"
              >
                <svg className="w-8 h-8 text-fantasy-gold" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  <path d="M9 8.5h6" stroke="#0f0f13" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">HP Attuali</span>
                  <span className="text-xs text-gray-500">Max: {hpMax}</span>
                </div>
                <div className="text-3xl font-bold text-white text-center leading-tight font-fantasy">
                  {hpAttuali}
                </div>
                <div className="mt-2 h-2 bg-fantasy-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-500"
                    style={{ width: `${hpPercent}%`, background: getBarBackground() }}
                  ></div>
                </div>
              </div>

              <button 
                onClick={() => modificaAttributo('hpAttuali', 1)}
                className="flex-shrink-0 w-12 h-12 rounded-lg bg-fantasy-800 hover:bg-fantasy-700 transition-colors flex items-center justify-center"
              >
                <svg className="w-8 h-8 text-fantasy-gold" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  <path d="M9 8.5h6M12 5.5v6" stroke="#0f0f13" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="mt-3 pt-3 border-t border-fantasy-700 flex items-center gap-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Temp:</label>
              <button onClick={() => modificaAttributo('hpTemporanei', -1)} className="w-7 h-7 rounded bg-fantasy-700 text-gray-300 hover:bg-fantasy-600 transition-colors flex items-center justify-center text-sm">−</button>
              <input type="number" value={personaggio.attributi.hpTemporanei} onChange={(e) => setAttributo('hpTemporanei', parseInt(e.target.value) || 0)} className="w-14 bg-transparent border-b border-fantasy-700 text-center text-sm text-gray-300 focus:outline-none focus:border-fantasy-gold" />
              <button onClick={() => modificaAttributo('hpTemporanei', 1)} className="w-7 h-7 rounded bg-fantasy-700 text-gray-300 hover:bg-fantasy-600 transition-colors flex items-center justify-center text-sm">+</button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-fantasy-900 border border-fantasy-700 rounded-lg p-2 flex flex-col relative" style={{ boxShadow: 'inset 0 0 8px rgba(0,0,0,0.5)' }}>
              <div className="grid grid-cols-2 gap-2 items-center">
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-gray-300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">CA</span>
                </div>
                <button onClick={() => modificaAttributo('ca', 1)} className="h-8 rounded bg-fantasy-700 text-fantasy-gold hover:bg-fantasy-600 transition-colors flex items-center justify-center text-lg font-bold">+</button>
                <span className="text-2xl font-bold text-white font-fantasy leading-tight">{ca}</span>
                <button onClick={() => modificaAttributo('ca', -1)} className="h-8 rounded bg-fantasy-700 text-fantasy-gold hover:bg-fantasy-600 transition-colors flex items-center justify-center text-lg font-bold">−</button>
              </div>
            </div>

            <div className="bg-fantasy-900 border border-fantasy-700 rounded-lg p-2 flex flex-col relative" style={{ boxShadow: 'inset 0 0 8px rgba(0,0,0,0.5)' }}>
              <div className="grid grid-cols-2 gap-2 items-center">
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-gray-300" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">Iniz.</span>
                </div>
                <button onClick={() => modificaAttributo('iniziativa', 1)} className="h-8 rounded bg-fantasy-700 text-fantasy-gold hover:bg-fantasy-600 transition-colors flex items-center justify-center text-lg font-bold">+</button>
                <span className="text-2xl font-bold text-white font-fantasy leading-tight">{iniziativa >= 0 ? `+${iniziativa}` : iniziativa}</span>
                <button onClick={() => modificaAttributo('iniziativa', -1)} className="h-8 rounded bg-fantasy-700 text-fantasy-gold hover:bg-fantasy-600 transition-colors flex items-center justify-center text-lg font-bold">−</button>
              </div>
            </div>

            <div className="bg-fantasy-900 border border-fantasy-700 rounded-lg p-2 flex flex-col relative" style={{ boxShadow: 'inset 0 0 8px rgba(0,0,0,0.5)' }}>
              <div className="grid grid-cols-2 gap-2 items-center">
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-gray-300" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/></svg>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">Mov</span>
                </div>
                <button onClick={() => modificaAttributo('velocita', 1)} className="h-8 rounded bg-fantasy-700 text-fantasy-gold hover:bg-fantasy-600 transition-colors flex items-center justify-center text-lg font-bold">+</button>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl font-bold text-white font-fantasy leading-tight">{velocita}</span>
                  <span className="text-[10px] text-gray-500">mt</span>
                </div>
                <button onClick={() => modificaAttributo('velocita', -1)} className="h-8 rounded bg-fantasy-700 text-fantasy-gold hover:bg-fantasy-600 transition-colors flex items-center justify-center text-lg font-bold">−</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}