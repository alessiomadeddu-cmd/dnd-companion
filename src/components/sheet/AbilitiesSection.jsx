import { useState } from 'react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { calcolaPunteggioTotale, calcolaModificatore, calcolaBonusTiroSalvezza } from '../../utils/calculations';

const CARATTERISTICHE = ['FOR', 'DES', 'COS', 'INT', 'SAG', 'CAR'];

export default function AbilitiesSection({ personaggioId }) {
  const aggiornaPersonaggio = useCharacterStore((state) => state.aggiornaPersonaggio);
  const personaggio = useCharacterStore((state) => state.personaggi.find(p => p.id === personaggioId));
  
  const [espansi, setEspansi] = useState({});

  if (!personaggio) return null;

  const toggleEspandi = (char) => {
    setEspansi(prev => ({ ...prev, [char]: !prev[char] }));
  };

  const aggiornaPunteggioBase = (caratteristica, nuovoTotale) => {
    const data = personaggio.caratteristiche[caratteristica];
    // Calcola il base necessario per raggiungere il nuovo totale desiderato
    const bonusTotali = (data.bonusRazziale || 0) + (data.bonusMagico || 0);
    const nuovoBase = nuovoTotale - bonusTotali;
    
    aggiornaPersonaggio(personaggioId, {
      caratteristiche: {
        ...personaggio.caratteristiche,
        [caratteristica]: { ...data, punteggioBase: nuovoBase }
      }
    });
  };

  const aggiornaBonus = (caratteristica, campo, valore) => {
    aggiornaPersonaggio(personaggioId, {
      caratteristiche: {
        ...personaggio.caratteristiche,
        [caratteristica]: { ...personaggio.caratteristiche[caratteristica], [campo]: valore }
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
    <div className="fantasy-card mb-4">
      <h2 className="text-lg font-fantasy text-fantasy-gold mb-4 border-b border-fantasy-700 pb-2">
        Caratteristiche
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {CARATTERISTICHE.map((char) => {
          const data = personaggio.caratteristiche[char];
          const punteggioTotale = calcolaPunteggioTotale(data);
          const modificatore = calcolaModificatore(punteggioTotale);
          const bonusTS = calcolaBonusTiroSalvezza(data, personaggio.identita.livello);
          const isEspanso = espansi[char];

          return (
            <div key={char} className="bg-fantasy-900 p-4 rounded-lg border border-fantasy-700 flex flex-col items-center relative">
              
              {/* Nome Caratteristica */}
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{char}</h3>

              {/* Punteggio Totale (Grande e Modificabile) */}
              <input
                type="number"
                value={punteggioTotale}
                onChange={(e) => aggiornaPunteggioBase(char, parseInt(e.target.value) || 10)}
                className="w-full text-center bg-transparent text-5xl font-bold text-white focus:outline-none border-b-2 border-fantasy-700 focus:border-fantasy-gold transition-colors py-1"
              />

              {/* Modificatore (Sotto) */}
              <div className={`text-xl font-bold mt-2 ${modificatore >= 0 ? 'text-fantasy-gold' : 'text-red-500'}`}>
                {modificatore >= 0 ? `+${modificatore}` : modificatore}
              </div>

              {/* Toggle Dettagli */}
              <button 
                onClick={() => toggleEspandi(char)}
                className="mt-3 text-[10px] text-gray-500 hover:text-fantasy-gold flex items-center gap-1 uppercase tracking-wider"
              >
                {isEspanso ? 'Nascondi' : 'Dettagli'}
                <span className={`transform transition-transform ${isEspanso ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {/* Pannello Dettagli (Base/Razziale/Magico) */}
              {isEspanso && (
                <div className="mt-3 w-full space-y-2 text-xs animate-fadeIn border-t border-fantasy-800 pt-2">
                  <div className="flex justify-between items-center">
                    <label className="text-gray-500">Base</label>
                    <input type="number" value={data.punteggioBase} onChange={(e) => aggiornaBonus(char, 'punteggioBase', parseInt(e.target.value) || 10)} className="w-10 bg-fantasy-800 border border-fantasy-700 rounded text-center text-white focus:border-fantasy-gold focus:outline-none" />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-gray-500">Razziale</label>
                    <input type="number" value={data.bonusRazziale} onChange={(e) => aggiornaBonus(char, 'bonusRazziale', parseInt(e.target.value) || 0)} className="w-10 bg-fantasy-800 border border-fantasy-700 rounded text-center text-white focus:border-fantasy-gold focus:outline-none" />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-gray-500">Magico</label>
                    <input type="number" value={data.bonusMagico} onChange={(e) => aggiornaBonus(char, 'bonusMagico', parseInt(e.target.value) || 0)} className="w-10 bg-fantasy-800 border border-fantasy-700 rounded text-center text-white focus:border-fantasy-gold focus:outline-none" />
                  </div>
                </div>
              )}

              {/* Tiro Salvezza */}
              <div className="mt-3 pt-2 border-t border-fantasy-700 w-full flex justify-between items-center">
                <span className="text-xs text-gray-400">TS: <span className="text-white font-bold ml-1">{bonusTS >= 0 ? `+${bonusTS}` : bonusTS}</span></span>
                <div className="flex gap-1">
                  <button onClick={() => toggleCompetenza(char, 'competenzaTS')} className={`w-5 h-5 rounded border flex items-center justify-center text-[10px] ${data.competenzaTS ? 'bg-fantasy-gold border-fantasy-gold text-fantasy-900' : 'border-fantasy-700 text-gray-500'}`} title="Competente">✓</button>
                  <button onClick={() => toggleCompetenza(char, 'maestriaTS')} className={`w-5 h-5 rounded border flex items-center justify-center text-[10px] ${data.maestriaTS ? 'bg-fantasy-gold border-fantasy-gold text-fantasy-900' : 'border-fantasy-700 text-gray-500'}`} title="Maestria">★</button>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}