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

  const handleSave = () => setIsEditing(false);
  const handleCancel = () => setIsEditing(false);

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

  // --- MODALITÀ MODIFICA ---
  if (isEditing) {
    return (
      <div className="fantasy-card mb-4 relative overflow-hidden">
        {/* Cornici decorative angoli */}
        <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-fantasy-gold opacity-60"></div>
        <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-fantasy-gold opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-fantasy-gold opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-fantasy-gold opacity-60"></div>

        <div className="p-3 sm:p-4">
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

            <AutocompleteSelect label="Razza" options={razze} value={personaggio.identita.razzaSlug} onSelect={(opt) => handleSelect('razza', opt)} />
            <AutocompleteSelect label="Classe" options={classi} value={personaggio.identita.classeSlug} onSelect={(opt) => handleSelect('classe', opt)} />
            
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Livello</label>
              <input
                type="number" min="1" max="20"
                value={personaggio.identita.livello}
                onChange={(e) => aggiornaPersonaggio(personaggioId, { identita: { ...personaggio.identita, livello: parseInt(e.target.value) || 1 } })}
                className="w-full fantasy-input"
              />
            </div>

            <AutocompleteSelect label="Background" options={backgrounds} value={personaggio.identita.backgroundSlug} onSelect={(opt) => handleSelect('background', opt)} />
          </div>
        </div>
      </div>
    );
  }

  // --- MODALITÀ VISUALIZZAZIONE ---
  return (
    <div className="fantasy-card mb-4 relative overflow-hidden">
      {/* Cornici decorative angoli */}
      <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-fantasy-gold opacity-60"></div>
      <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-fantasy-gold opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-fantasy-gold opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-fantasy-gold opacity-60"></div>

      {/* Pulsanti Azione */}
      <div className="absolute top-1 right-1 sm:top-2 sm:right-2 flex gap-1 sm:gap-2 z-20">
        <button 
          onClick={() => setIsEditing(true)} 
          className="text-gray-500 hover:text-fantasy-gold p-1 sm:p-1.5 rounded-full hover:bg-fantasy-900 transition-colors" 
          title="Modifica"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          className="text-gray-500 hover:text-fantasy-danger p-1 sm:p-1.5 rounded-full hover:bg-fantasy-900 transition-colors" 
          title="Elimina"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* === CONTENUTO PRINCIPALE: 2 COLONNE === */}
      <div className="flex items-center p-3 sm:p-4 gap-2 sm:gap-4">
        
        {/* COLONNA 1: Avatar + Stella Livello */}
        <div className="relative flex-shrink-0">
          <div className="absolute -inset-0.5 sm:-inset-1 rounded-full bg-gradient-to-br from-fantasy-gold via-yellow-600 to-fantasy-gold opacity-80"></div>
          <div className="absolute -inset-0.25 sm:-inset-0.5 rounded-full bg-fantasy-900"></div>
          
          <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-fantasy-800 flex items-center justify-center overflow-hidden border-2 border-fantasy-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-fantasy-gold opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          {/* Stella Livello */}
          <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center drop-shadow-lg z-10">
            <svg viewBox="0 0 24 24" className="w-full h-full text-fantasy-gold" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="absolute text-fantasy-900 font-bold text-[10px] sm:text-xs md:text-sm font-fantasy mt-0.5">
              {personaggio.identita.livello || 1}
            </span>
          </div>
        </div>

        {/* COLONNA 2: Info Personaggio */}
        <div className="flex-1 min-w-0 flex flex-col justify-center pr-10 sm:pr-12">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-fantasy text-fantasy-gold truncate drop-shadow-lg leading-tight"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            {personaggio.nome || 'Senza Nome'}
          </h1>
          <p className="font-fantasy text-yellow-600 text-xs sm:text-base md:text-lg mt-0.5 sm:mt-1 truncate">
            {personaggio.identita.razza || 'Razza ?'} • {personaggio.identita.classe || 'Classe ?'}{personaggio.identita.background ? ` • ${personaggio.identita.background}` : ''}
          </p>
          <p className="font-fantasy text-gray-500 text-[10px] sm:text-xs mt-1 hidden sm:block">
            Livello {personaggio.identita.livello || 1}
          </p>
        </div>
      </div>
    </div>
  );
}