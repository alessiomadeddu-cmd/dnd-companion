import { useState } from 'react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { calcolaPunteggioTotale, calcolaModificatore, calcolaBonusTiroSalvezza } from '../../utils/calculations';

const CARATTERISTICHE = [
  { key: 'FOR', nome: 'Forza' },
  { key: 'DES', nome: 'Destrezza' },
  { key: 'COS', nome: 'Costituzione' },
  { key: 'INT', nome: 'Intelligenza' },
  { key: 'SAG', nome: 'Saggezza' },
  { key: 'CAR', nome: 'Carisma' }
];

export default function AbilitiesSection({ personaggioId }) {
  const aggiornaPersonaggio = useCharacterStore((state) => state.aggiornaPersonaggio);
  const personaggio = useCharacterStore((state) => state.personaggi.find(p => p.id === personaggioId));
  const [isOpen, setIsOpen] = useState(true);

  if (!personaggio) return null;

  const aggiornaBase = (caratteristica, delta) => {
    const data = personaggio.caratteristiche[caratteristica];
    const nuovoBase = Math.max(1, Math.min(30, (data.punteggioBase || 10) + delta));
    aggiornaPersonaggio(personaggioId, {
      caratteristiche: {
        ...personaggio.caratteristiche,
        [caratteristica]: { ...data, punteggioBase: nuovoBase }
      }
    });
  };

  const aggiornaBonus = (caratteristica, campo, delta) => {
    const data = personaggio.caratteristiche[caratteristica];
    const nuovoValore = (data[campo] || 0) + delta;
    aggiornaPersonaggio(personaggioId, {
      caratteristiche: {
        ...personaggio.caratteristiche,
        [caratteristica]: { ...data, [campo]: nuovoValore }
      }
    });
  };

  const aggiornaBonusInput = (caratteristica, campo, valore) => {
    const data = personaggio.caratteristiche[caratteristica];
    aggiornaPersonaggio(personaggioId, {
      caratteristiche: {
        ...personaggio.caratteristiche,
        [caratteristica]: { ...data, [campo]: valore }
      }
    });
  };

  const toggleCompetenza = (caratteristica, tipo) => {
    const char = personaggio.caratteristiche[caratteristica];
    aggiornaPersonaggio(personaggioId, {
      caratteristiche: {
        ...personaggio.caratteristiche,
        [caratteristica]: { ...char, [tipo]: !char[tipo] }
      }
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
        <h2 className="text-lg font-fantasy text-fantasy-gold">Caratteristiche</h2>
        <span className={`text-fantasy-gold transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {CARATTERISTICHE.map(({ key, nome }) => {
            const data = personaggio.caratteristiche[key];
            const punteggioTotale = calcolaPunteggioTotale(data);
            const modificatore = calcolaModificatore(punteggioTotale);
            const bonusTS = calcolaBonusTiroSalvezza(data, personaggio.identita.livello);
            const base = data.punteggioBase || 10;
            const razziale = data.bonusRazziale || 0;
            const magico = data.bonusMagico || 0;

            return (
              <div key={key} className="bg-fantasy-900 border border-fantasy-700 rounded-lg p-3 relative"
                   style={{ boxShadow: 'inset 0 0 8px rgba(0,0,0,0.5)' }}>
                
                <div className="text-center mb-2">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{key}</h3>
                  <p className="text-[10px] text-gray-500">{nome}</p>
                </div>

                <div className="text-center mb-1">
                  <span className="text-4xl font-bold text-white font-fantasy leading-tight">
                    {punteggioTotale}
                  </span>
                </div>

                <div className={`text-center text-xl font-bold font-fantasy mb-3 ${modificatore >= 0 ? 'text-fantasy-gold' : 'text-red-500'}`}>
                  {modificatore >= 0 ? `+${modificatore}` : modificatore}
                </div>

                <div className="space-y-2 border-t border-fantasy-700 pt-2">
                  
                  {/* BASE - Con riquadro uniforme */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider w-12">Base</span>
                    <div className="flex items-center gap-1 flex-1 justify-end">
                      <button onClick={() => aggiornaBase(key, -1)} className="w-6 h-6 rounded bg-fantasy-700 text-fantasy-gold hover:bg-fantasy-600 transition-colors flex items-center justify-center text-xs font-bold">−</button>
                      <input
                        type="number"
                        value={base}
                        onChange={(e) => aggiornaBonusInput(key, 'punteggioBase', parseInt(e.target.value) || 10)}
                        className="w-10 bg-fantasy-800 border border-fantasy-gold/50 rounded text-center text-white focus:border-fantasy-gold focus:outline-none text-sm font-bold"
                      />
                      <button onClick={() => aggiornaBase(key, 1)} className="w-6 h-6 rounded bg-fantasy-700 text-fantasy-gold hover:bg-fantasy-600 transition-colors flex items-center justify-center text-xs font-bold">+</button>
                    </div>
                  </div>

                  {/* RAZZIALE - Senza stella, con riquadro */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-fantasy-gold uppercase tracking-wider w-12">Razz.</span>
                    <div className="flex items-center gap-1 flex-1 justify-end">
                      <button onClick={() => aggiornaBonus(key, 'bonusRazziale', -1)} className="w-6 h-6 rounded bg-fantasy-700 text-fantasy-gold hover:bg-fantasy-600 transition-colors flex items-center justify-center text-xs font-bold">−</button>
                      <input
                        type="number"
                        value={razziale}
                        onChange={(e) => aggiornaBonusInput(key, 'bonusRazziale', parseInt(e.target.value) || 0)}
                        className="w-10 bg-fantasy-800 border border-fantasy-gold/50 rounded text-center text-fantasy-gold focus:border-fantasy-gold focus:outline-none text-sm font-bold"
                        title="Bonus di Razza (modificabile per razze a scelta)"
                      />
                      <button onClick={() => aggiornaBonus(key, 'bonusRazziale', 1)} className="w-6 h-6 rounded bg-fantasy-700 text-fantasy-gold hover:bg-fantasy-600 transition-colors flex items-center justify-center text-xs font-bold">+</button>
                    </div>
                  </div>

                  {/* MAGICO - Con riquadro uniforme */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider w-12">Mag.</span>
                    <div className="flex items-center gap-1 flex-1 justify-end">
                      <button onClick={() => aggiornaBonus(key, 'bonusMagico', -1)} className="w-6 h-6 rounded bg-fantasy-700 text-fantasy-gold hover:bg-fantasy-600 transition-colors flex items-center justify-center text-xs font-bold">−</button>
                      <input
                        type="number"
                        value={magico}
                        onChange={(e) => aggiornaBonusInput(key, 'bonusMagico', parseInt(e.target.value) || 0)}
                        className={`w-10 bg-fantasy-800 border border-fantasy-gold/50 rounded text-center focus:border-fantasy-gold focus:outline-none text-sm font-bold ${magico > 0 ? 'text-fantasy-gold' : magico < 0 ? 'text-red-500' : 'text-white'}`}
                      />
                      <button onClick={() => aggiornaBonus(key, 'bonusMagico', 1)} className="w-6 h-6 rounded bg-fantasy-700 text-fantasy-gold hover:bg-fantasy-600 transition-colors flex items-center justify-center text-xs font-bold">+</button>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-fantasy-700 flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                    TS: <span className={`text-sm font-bold ml-1 ${bonusTS >= 0 ? 'text-white' : 'text-red-500'}`}>
                      {bonusTS >= 0 ? `+${bonusTS}` : bonusTS}
                    </span>
                  </span>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => toggleCompetenza(key, 'competenzaTS')} 
                      className={`w-5 h-5 rounded border flex items-center justify-center text-[10px] transition-colors ${data.competenzaTS ? 'bg-fantasy-gold border-fantasy-gold text-fantasy-900' : 'border-fantasy-700 text-gray-500 hover:border-fantasy-gold'}`} 
                      title="Competenza"
                    >✓</button>
                    <button 
                      onClick={() => toggleCompetenza(key, 'maestriaTS')} 
                      className={`w-5 h-5 rounded border flex items-center justify-center text-[10px] transition-colors ${data.maestriaTS ? 'bg-fantasy-gold border-fantasy-gold text-fantasy-900' : 'border-fantasy-700 text-gray-500 hover:border-fantasy-gold'}`} 
                      title="Maestria"
                    >★</button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}