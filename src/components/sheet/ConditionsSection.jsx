import { useState } from 'react';
import { useCharacterStore } from '../../store/useCharacterStore';

const CONDIZIONI_LABELS = {
  accecato: 'Accecato',
  affascinato: 'Affascinato',
  avvelenato: 'Avvelenato',
  deafened: 'Assordato',
  esautorato: 'Esautorato',
  invisibile: 'Invisibile',
  inabile: 'Inabile',
  paralizzato: 'Paralizzato',
  pietrificato: 'Pietrificato',
  prono: 'Prono',
  stordito: 'Stordito',
  trattenuto: 'Trattenuto'
};

export default function ConditionsSection({ personaggioId }) {
  const aggiornaPersonaggio = useCharacterStore((state) => state.aggiornaPersonaggio);
  const personaggio = useCharacterStore((state) => state.personaggi.find(p => p.id === personaggioId));
  
  const [isOpen, setIsOpen] = useState(false);

  if (!personaggio) return null;

  const toggleCondizione = (condizione) => {
    aggiornaPersonaggio(personaggioId, {
      condizioni: {
        ...personaggio.condizioni,
        [condizione]: !personaggio.condizioni[condizione]
      }
    });
  };

  const condizioniAttive = Object.values(personaggio.condizioni).filter(v => v).length;

  return (
    <div className="fantasy-card mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center border-b border-fantasy-700 pb-2 mb-2 focus:outline-none"
      >
        <h2 className="text-lg font-fantasy text-fantasy-gold flex items-center gap-2">
          Condizioni
          {condizioniAttive > 0 && (
            <span className="bg-fantasy-danger text-white text-xs px-2 py-0.5 rounded-full">
              {condizioniAttive}
            </span>
          )}
        </h2>
        <span className={`text-fantasy-gold transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      
      {isOpen && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(CONDIZIONI_LABELS).map(([key, label]) => {
            const isActive = personaggio.condizioni[key];
            return (
              <button
                key={key}
                onClick={() => toggleCondizione(key)}
                className={`p-3 rounded border text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-fantasy-danger border-fantasy-danger text-white' 
                    : 'bg-fantasy-900 border-fantasy-700 text-gray-400 hover:border-fantasy-gold'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}