import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCharacterStore } from '../../store/useCharacterStore';
import AutocompleteSelect from '../ui/AutocompleteSelect';
import { getRazze, getClassi, getBackgrounds } from '../../services/open5eApi';

export default function HeaderSection({ personaggioId }) {
  const navigate = useNavigate();
  const { personaggi, aggiornaPersonaggio, eliminaPersonaggio } = useCharacterStore();
  const personaggio = personaggi.find(p => p.id === personaggioId);

  const [isEditing, setIsEditing] = useState(false);
  const [razze, setRazze] = useState([]);
  const [classi, setClassi] = useState([]);
  const [backgrounds, setBackgrounds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [razzeData, classiData, bgData] = await Promise.all([
        getRazze(), getClassi(), getBackgrounds()
      ]);
      setRazze(razzeData);
      setClassi(classiData);
      setBackgrounds(bgData);
    };
    fetchData();
  }, []);

  if (!personaggio) return null;

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSelect = (campo, opzioneSelezionata) => {
    aggiornaPersonaggio(personaggioId, {
      identita: {
        ...personaggio.identita,
        [campo]: opzioneSelezionata.label,
        [`${campo}Slug`]: opzioneSelezionata.value,
        [`${campo}ApiUrl`]: opzioneSelezionata.api_url
      }
    });
  };

  // --- MODALITÀ VISUALIZZAZIONE (Default) ---
  if (!isEditing) {
    return (
      <div className="fantasy-card mb-4 relative">
        <div className="absolute top-2 right-2 flex gap-2">
          <button 
            onClick={() => setIsEditing(true)}
            className="p-2 text-fantasy-gold hover:bg-fantasy-700 rounded-full transition-colors"
            title="Modifica"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button 
            onClick={() => {
              if (window.confirm('Eliminare questo personaggio?')) {
                eliminaPersonaggio(personaggioId);
                navigate('/');
              }
            }}
            className="p-2 text-fantasy-danger hover:bg-fantasy-700 rounded-full transition-colors"
            title="Elimina"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        <h1 className="text-3xl font-fantasy text-fantasy-gold mb-2 pr-16">{personaggio.nome || 'Senza Nome'}</h1>
        <div className="flex flex-wrap gap-2 text-sm text-gray-300">
          <span className="bg-fantasy-900 px-2 py-1 rounded border border-fantasy-700">
            Livello {personaggio.identita.livello || 1}
          </span>
          <span className="bg-fantasy-900 px-2 py-1 rounded border border-fantasy-700">
            {personaggio.identita.razza || 'Razza non definita'}
          </span>
          <span className="bg-fantasy-900 px-2 py-1 rounded border border-fantasy-700">
            {personaggio.identita.classe || 'Classe non definita'}
          </span>
          {personaggio.identita.background && (
            <span className="bg-fantasy-900 px-2 py-1 rounded border border-fantasy-700">
              {personaggio.identita.background}
            </span>
          )}
        </div>
      </div>
    );
  }

  // --- MODALITÀ MODIFICA ---
  return (
    <div className="fantasy-card mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-fantasy text-fantasy-gold">Modifica Identità</h2>
        <div className="flex gap-2">
          <button onClick={handleSave} className="fantasy-btn px-3 py-1 text-sm flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Salva
          </button>
          <button onClick={handleCancel} className="bg-fantasy-700 text-gray-200 px-3 py-1 rounded hover:bg-fantasy-600 transition-colors text-sm flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Annulla
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Nome Personaggio</label>
          <input
            type="text"
            value={personaggio.nome}
            onChange={(e) => aggiornaPersonaggio(personaggioId, { nome: e.target.value })}
            className="w-full bg-transparent border-b border-fantasy-700 text-xl font-fantasy text-fantasy-gold focus:outline-none focus:border-fantasy-gold pb-1"
          />
        </div>

        <AutocompleteSelect 
          label="Razza" 
          options={razze} 
          value={personaggio.identita.razzaSlug} 
          onSelect={(opt) => handleSelect('razza', opt)} 
        />

        <AutocompleteSelect 
          label="Classe" 
          options={classi} 
          value={personaggio.identita.classeSlug} 
          onSelect={(opt) => handleSelect('classe', opt)} 
        />

        <div>
          <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Livello</label>
          <input
            type="number"
            min="1" max="20"
            value={personaggio.identita.livello}
            onChange={(e) => aggiornaPersonaggio(personaggioId, { 
              identita: { ...personaggio.identita, livello: parseInt(e.target.value) || 1 } 
            })}
            className="w-full fantasy-input"
          />
        </div>

        <AutocompleteSelect 
          label="Background" 
          options={backgrounds} 
          value={personaggio.identita.backgroundSlug} 
          onSelect={(opt) => handleSelect('background', opt)} 
        />
      </div>
    </div>
  );
}