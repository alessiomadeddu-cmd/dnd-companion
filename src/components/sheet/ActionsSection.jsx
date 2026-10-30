import { useState } from 'react';
import { useCharacterStore } from '../../store/useCharacterStore';

export default function ActionsSection({ personaggioId }) {
  const aggiornaPersonaggio = useCharacterStore((state) => state.aggiornaPersonaggio);
  const personaggio = useCharacterStore((state) => state.personaggi.find(p => p.id === personaggioId));
  
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newAction, setNewAction] = useState({
    nomeArma: '',
    bonusAttacco: 0,
    danno: '',
    tipoDanno: 'Tagliente',
    gittata: '',
    proprieta: ''
  });

  if (!personaggio) return null;

  const aggiungiAzione = () => {
    if (!newAction.nomeArma.trim()) return;
    
    const nuovaAzione = {
      ...newAction,
      id: Date.now().toString()
    };
    
    aggiornaPersonaggio(personaggioId, {
      azioni: [...(personaggio.azioni || []), nuovaAzione]
    });
    
    setNewAction({
      nomeArma: '',
      bonusAttacco: 0,
      danno: '',
      tipoDanno: 'Tagliente',
      gittata: '',
      proprieta: ''
    });
    setShowForm(false);
  };

  const rimuoviAzione = (id) => {
    aggiornaPersonaggio(personaggioId, {
      azioni: personaggio.azioni.filter(a => a.id !== id)
    });
  };

  return (
    <div className="fantasy-card mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center border-b border-fantasy-700 pb-2 mb-2 focus:outline-none"
      >
        <h2 className="text-lg font-fantasy text-fantasy-gold">Azioni e Attacchi</h2>
        <span className={`text-fantasy-gold transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      
      {isOpen && (
        <div className="space-y-3">
          {(!personaggio.azioni || personaggio.azioni.length === 0) && !showForm && (
            <p className="text-gray-500 text-sm text-center py-4">Nessuna azione configurata</p>
          )}
          
          {personaggio.azioni && personaggio.azioni.map((azione) => (
            <div key={azione.id} className="bg-fantasy-900 p-3 rounded border border-fantasy-700 flex justify-between items-start">
              <div className="flex-1">
                <h4 className="text-fantasy-gold font-bold">{azione.nomeArma}</h4>
                <p className="text-xs text-gray-400 mt-1">
                  +{azione.bonusAttacco} al tiro • {azione.danno} {azione.tipoDanno}
                  {azione.gittata && ` • Gittata: ${azione.gittata}`}
                </p>
              </div>
              <button 
                onClick={() => rimuoviAzione(azione.id)}
                className="text-fantasy-danger hover:text-red-400 p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          
          {showForm && (
            <div className="bg-fantasy-900 p-4 rounded border border-fantasy-gold space-y-3">
              <input
                type="text"
                placeholder="Nome arma/azione"
                value={newAction.nomeArma}
                onChange={(e) => setNewAction({...newAction, nomeArma: e.target.value})}
                className="w-full fantasy-input"
              />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-400">Bonus attacco</label>
                  <input
                    type="number"
                    value={newAction.bonusAttacco}
                    onChange={(e) => setNewAction({...newAction, bonusAttacco: parseInt(e.target.value) || 0})}
                    className="w-full fantasy-input"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Tipo danno</label>
                  <select
                    value={newAction.tipoDanno}
                    onChange={(e) => setNewAction({...newAction, tipoDanno: e.target.value})}
                    className="w-full fantasy-input"
                  >
                    <option>Tagliente</option>
                    <option>Contundente</option>
                    <option>Piercing</option>
                    <option>Fuoco</option>
                    <option>Freddo</option>
                    <option>Fulmine</option>
                    <option>Acido</option>
                    <option>Veleno</option>
                    <option>Psichico</option>
                    <option>Radiante</option>
                    <option>Necrotico</option>
                  </select>
                </div>
              </div>
              <input
                type="text"
                placeholder="Danno (es. 1d8)"
                value={newAction.danno}
                onChange={(e) => setNewAction({...newAction, danno: e.target.value})}
                className="w-full fantasy-input"
              />
              <input
                type="text"
                placeholder="Gittata (es. 5ft, 30/120ft)"
                value={newAction.gittata}
                onChange={(e) => setNewAction({...newAction, gittata: e.target.value})}
                className="w-full fantasy-input"
              />
              <div className="flex gap-2">
                <button onClick={aggiungiAzione} className="fantasy-btn flex-1">Aggiungi</button>
                <button onClick={() => setShowForm(false)} className="bg-fantasy-700 text-gray-200 px-4 py-2 rounded hover:bg-fantasy-600">Annulla</button>
              </div>
            </div>
          )}
          
          {!showForm && (
            <button 
              onClick={() => setShowForm(true)}
              className="w-full border-2 border-dashed border-fantasy-700 text-fantasy-gold py-2 rounded hover:border-fantasy-gold transition-colors"
            >
              + Aggiungi Azione
            </button>
          )}
        </div>
      )}
    </div>
  );
}