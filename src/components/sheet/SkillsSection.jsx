import { useState } from 'react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { calcolaModificatore, calcolaPunteggioTotale, calcolaBonusSkill, SKILL_ABILITY_MAP } from '../../utils/calculations';

const SKILL_LABELS = {
  acrobazia: 'Acrobazia', addestrareAnimali: 'Addestrare Animali', arcanismo: 'Arcanismo',
  atletica: 'Atletica', furtivita: 'Furtività', inganno: 'Inganno', indagine: 'Indagine',
  intimidazione: 'Intimidazione', intuizione: 'Intuizione', intrattenere: 'Intrattenere',
  storia: 'Storia', medicina: 'Medicina', natura: 'Natura', percezione: 'Percezione',
  persuasione: 'Persuasione', rapiditaDiMano: 'Rapidità di Mano', religione: 'Religione', sopravvivenza: 'Sopravvivenza'
};

const COMPETENZA_ICONS = { 0: '—', 1: '✓', 2: '½', 3: '★' };

export default function SkillsSection({ personaggioId }) {
  const aggiornaPersonaggio = useCharacterStore((state) => state.aggiornaPersonaggio);
  const personaggio = useCharacterStore((state) => state.personaggi.find(p => p.id === personaggioId));
  
  // Stato per collassare la sezione
  const [isOpen, setIsOpen] = useState(true);

  if (!personaggio) return null;

  const cicloCompetenza = (skill) => {
    const attuale = personaggio.skill[skill];
    const prossimo = (attuale + 1) % 4;
    aggiornaPersonaggio(personaggioId, { skill: { ...personaggio.skill, [skill]: prossimo } });
  };

  return (
    <div className="fantasy-card mb-4">
      {/* Header Collassabile */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center border-b border-fantasy-700 pb-2 mb-2 focus:outline-none"
      >
        <h2 className="text-lg font-fantasy text-fantasy-gold">Competenze</h2>
        <span className={`text-fantasy-gold transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      
      {/* Lista Competenze (visibile solo se isOpen) */}
      {isOpen && (
        <div className="space-y-1">
          {Object.entries(SKILL_LABELS).map(([skillKey, label]) => {
            const ability = SKILL_ABILITY_MAP[skillKey];
            const abilityData = personaggio.caratteristiche[ability];
            const abilityMod = calcolaModificatore(calcolaPunteggioTotale(abilityData));
            const livelloCompetenza = personaggio.skill[skillKey];
            const bonusTotale = calcolaBonusSkill(livelloCompetenza, abilityMod, personaggio.identita.livello);

            return (
              <div 
                key={skillKey}
                onClick={() => cicloCompetenza(skillKey)}
                className="flex items-center justify-between p-2 bg-fantasy-900 rounded border border-fantasy-700 hover:border-fantasy-gold cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-6 h-6 rounded border flex items-center justify-center text-xs font-bold transition-colors ${
                    livelloCompetenza > 0 ? 'bg-fantasy-gold border-fantasy-gold text-fantasy-900' : 'border-fantasy-700 text-gray-500 group-hover:border-fantasy-gold'
                  }`}>
                    {COMPETENZA_ICONS[livelloCompetenza]}
                  </div>
                  <div>
                    <span className="text-gray-200 text-sm">{label}</span>
                    <span className="text-gray-600 text-xs ml-2">({ability})</span>
                  </div>
                </div>
                <span className={`font-bold text-sm ${bonusTotale >= 0 ? 'text-white' : 'text-red-400'}`}>
                  {bonusTotale >= 0 ? `+${bonusTotale}` : bonusTotale}
                </span>
              </div>
            );
          })}
          
          <div className="mt-2 text-[10px] text-gray-600 text-center">
            Tocca una skill per cambiare: Nessuna (—) → Competenza (✓) → Metà (½) → Maestria (★)
          </div>
        </div>
      )}
    </div>
  );
}