import { useState } from 'react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { calcolaBonusSkill, calcolaBonusCompetenza, SKILL_ABILITY_MAP, calcolaModificatore, calcolaPunteggioTotale } from '../../utils/calculations';

const SKILL_LIST = [
  { key: 'acrobazia', nome: 'Acrobazia' },
  { key: 'addestrareAnimali', nome: 'Addestrare Animali' },
  { key: 'arcanismo', nome: 'Arcanismo' },
  { key: 'atletica', nome: 'Atletica' },
  { key: 'furtivita', nome: 'Furtività' },
  { key: 'inganno', nome: 'Inganno' },
  { key: 'indagine', nome: 'Indagine' },
  { key: 'intimidazione', nome: 'Intimidazione' },
  { key: 'intuizione', nome: 'Intuizione' },
  { key: 'intrattenere', nome: 'Intrattenere' },
  { key: 'storia', nome: 'Storia' },
  { key: 'medicina', nome: 'Medicina' },
  { key: 'natura', nome: 'Natura' },
  { key: 'percezione', nome: 'Percezione' },
  { key: 'persuasione', nome: 'Persuasione' },
  { key: 'rapiditaDiMano', nome: 'Rapidità di Mano' },
  { key: 'religione', nome: 'Religione' },
  { key: 'sopravvivenza', nome: 'Sopravvivenza' }
];

export default function SkillsSection({ personaggioId }) {
  const aggiornaPersonaggio = useCharacterStore((state) => state.aggiornaPersonaggio);
  const personaggio = useCharacterStore((state) => state.personaggi.find(p => p.id === personaggioId));
  const [isOpen, setIsOpen] = useState(true);

  if (!personaggio) return null;

  const livello = personaggio.identita.livello || 1;
  const bonusCompetenza = calcolaBonusCompetenza(livello);

  const setSkillLevel = (skillKey, nuovoLivello) => {
    aggiornaPersonaggio(personaggioId, {
      skill: {
        ...personaggio.skill,
        [skillKey]: nuovoLivello
      }
    });
  };

  const getSkillBonus = (skillKey) => {
    const charKey = SKILL_ABILITY_MAP[skillKey];
    const charData = personaggio.caratteristiche[charKey];
    if (!charData) return 0;
    const punteggioTotale = calcolaPunteggioTotale(charData);
    const mod = calcolaModificatore(punteggioTotale);
    const livelloSkill = personaggio.skill[skillKey] || 0;
    return calcolaBonusSkill(livelloSkill, mod, livello);
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
        <h2 className="text-lg font-fantasy text-fantasy-gold">Abilità</h2>
        <span className={`text-fantasy-gold transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div>
          {/* Info bonus competenza */}
          <div className="text-xs text-gray-500 text-center mb-3">
            Bonus Competenza: <span className="text-fantasy-gold font-bold">+{bonusCompetenza}</span>
          </div>

          {/* Griglia: 1 colonna su mobile, 2 colonne da tablet in su */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {SKILL_LIST.map(({ key, nome }) => {
              const livelloSkill = personaggio.skill[key] || 0;
              const bonus = getSkillBonus(key);
              const charKey = SKILL_ABILITY_MAP[key];

              return (
                <div 
                  key={key} 
                  className={`bg-fantasy-900 border rounded px-3 py-2 flex items-center justify-between gap-2 ${
                    livelloSkill > 0 ? 'border-fantasy-gold' : 'border-fantasy-700'
                  }`}
                  style={{ boxShadow: livelloSkill > 0 ? 'inset 0 0 6px rgba(212, 175, 55, 0.15)' : 'inset 0 0 6px rgba(0,0,0,0.3)' }}
                >
                  {/* Nome + caratteristica */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">{nome}</div>
                    <div className="text-[10px] text-gray-500 uppercase">{charKey}</div>
                  </div>

                  {/* Bonus */}
                  <div className={`text-base font-bold font-fantasy w-10 text-center flex-shrink-0 ${bonus >= 0 ? 'text-fantasy-gold' : 'text-red-500'}`}>
                    {bonus >= 0 ? `+${bonus}` : bonus}
                  </div>

                  {/* Tre pulsanti compatti */}
                  <div className="flex gap-1 flex-shrink-0">
                    {/* ○ Nessuna competenza - grigio neutro */}
                    <button
                      onClick={() => setSkillLevel(key, 0)}
                      className={`w-7 h-7 rounded flex items-center justify-center text-xs transition-colors ${
                        livelloSkill === 0
                          ? 'bg-fantasy-800 text-gray-400 border border-gray-600'
                          : 'bg-fantasy-800 text-gray-600 border border-fantasy-700 hover:border-gray-500'
                      }`}
                      title="Nessuna competenza"
                    >
                      ○
                    </button>
                    {/* ✓ Competente - argento */}
                    <button
                      onClick={() => setSkillLevel(key, 1)}
                      className={`w-7 h-7 rounded flex items-center justify-center text-xs transition-colors ${
                        livelloSkill === 1
                          ? 'bg-gray-300 text-gray-900 border border-gray-300'
                          : 'bg-fantasy-800 text-gray-600 border border-fantasy-700 hover:border-gray-400'
                      }`}
                      title="Competente"
                    >
                      ✓
                    </button>
                    {/* ★ Esperto - dorato */}
                    <button
                      onClick={() => setSkillLevel(key, 3)}
                      className={`w-7 h-7 rounded flex items-center justify-center text-xs transition-colors ${
                        livelloSkill === 3
                          ? 'bg-fantasy-gold text-fantasy-900 border border-fantasy-gold'
                          : 'bg-fantasy-800 text-gray-600 border border-fantasy-700 hover:border-fantasy-gold'
                      }`}
                      title="Esperto (doppia competenza)"
                    >
                      ★
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}