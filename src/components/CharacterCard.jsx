import { useNavigate } from 'react-router-dom';

export default function CharacterCard({ personaggio, onElimina }) {
  const navigate = useNavigate();
  const { nome, identita, attributi } = personaggio;

  return (
    <div 
      onClick={() => navigate(`/personaggio/${personaggio.id}`)}
      className="fantasy-card flex justify-between items-center cursor-pointer hover:border-fantasy-gold transition-colors group"
    >
      <div className="flex-1">
        <h2 className="text-xl font-fantasy text-fantasy-gold group-hover:text-white transition-colors">
          {nome}
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          {identita.livello}° Livello {identita.razza} {identita.classe}
        </p>
        <p className="text-gray-500 text-xs mt-1">
          HP: {attributi.hpAttuali}/{attributi.hpMax} • CA: {attributi.ca}
        </p>
      </div>
      
      <button 
        onClick={(e) => onElimina(e, personaggio.id)}
        className="text-fantasy-danger hover:text-red-400 p-2 rounded-full hover:bg-fantasy-900 transition-colors"
        aria-label="Elimina personaggio"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}