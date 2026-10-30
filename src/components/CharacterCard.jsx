import { useNavigate } from 'react-router-dom';

export default function CharacterCard({ personaggio, onElimina }) {
  const navigate = useNavigate();
  const { nome, identita, attributi } = personaggio;

  const hpPercent = attributi.hpMax > 0 
    ? Math.min(100, Math.max(0, (attributi.hpAttuali / attributi.hpMax) * 100)) 
    : 0;
  
  const barColor = hpPercent < 25 ? 'bg-red-600' : 'bg-fantasy-gold';

  return (
    <div
      onClick={() => navigate(`/personaggio/${personaggio.id}`)}
      className="fantasy-card cursor-pointer hover:border-fantasy-gold transition-all duration-300 group relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a1410 0%, #0f0f13 50%, #1a1410 100%)',
        border: '2px solid #8a6d1c',
        boxShadow: '0 0 15px rgba(212, 175, 55, 0.15), inset 0 0 20px rgba(0,0,0,0.5)'
      }}
    >
      {/* Cornici decorative angoli */}
      <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-fantasy-gold opacity-60"></div>
      <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-fantasy-gold opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-fantasy-gold opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-fantasy-gold opacity-60"></div>

      {/* Bottone Elimina */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onElimina(e, personaggio.id);
        }}
        className="absolute top-1 right-1 sm:top-2 sm:right-2 text-gray-600 hover:text-fantasy-danger p-1 sm:p-1.5 rounded-full hover:bg-fantasy-900 transition-colors z-30 opacity-60 group-hover:opacity-100"
        aria-label="Elimina personaggio"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* === CONTENUTO PRINCIPALE === */}
      <div className="flex items-center p-2 sm:p-4 gap-2 sm:gap-4">
        
        {/* 1. Immagine Personaggio */}
        <div className="relative flex-shrink-0">
          <div className="absolute -inset-0.5 sm:-inset-1 rounded-full bg-gradient-to-br from-fantasy-gold via-yellow-600 to-fantasy-gold opacity-80"></div>
          <div className="absolute -inset-0.25 sm:-inset-0.5 rounded-full bg-fantasy-900"></div>
          
          {/* Avatar: più piccolo su mobile, grande su desktop */}
          <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-fantasy-800 flex items-center justify-center overflow-hidden border-2 border-fantasy-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-fantasy-gold opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          {/* Stella Livello: più piccola su mobile */}
          <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center drop-shadow-lg z-10">
            <svg viewBox="0 0 24 24" className="w-full h-full text-fantasy-gold" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="absolute text-fantasy-900 font-bold text-[10px] sm:text-xs md:text-sm font-fantasy mt-0.5">
              {identita.livello || 1}
            </span>
          </div>
        </div>

        {/* 2. Area Centrale: Testo + Statistiche */}
        <div className="flex-1 flex justify-between items-center min-w-0 pl-1 sm:pl-2">
          
          {/* Colonna Testo */}
          <div className="flex flex-col justify-center min-w-0 pr-2 sm:pr-4 flex-1">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-fantasy text-fantasy-gold truncate drop-shadow-lg"
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              {nome || 'Senza Nome'}
            </h2>
            <p className="font-fantasy text-yellow-600 text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1 truncate">
              {identita.razza || 'Razza ?'} • {identita.classe || 'Classe ?'}
            </p>
          </div>

          {/* Colonna Statistiche (Destra) - più compatta su mobile */}
          <div className="flex flex-col gap-1 sm:gap-2 flex-shrink-0 w-24 sm:w-40 md:w-52">
            
            {/* RIGA 1: HP */}
            <div className="bg-fantasy-900 border border-fantasy-700 rounded p-1 sm:p-2 flex items-center gap-1 sm:gap-2 relative overflow-hidden"
                 style={{ boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)' }}>
              <svg className="w-3 h-3 sm:w-5 sm:h-5 flex-shrink-0 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between">
                  <span className="text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-wider">HP</span>
                  <span className="text-[8px] sm:text-[10px] text-gray-500">{attributi.hpMax}</span>
                </div>
                <div className="text-xs sm:text-base font-bold text-white leading-tight">
                  {attributi.hpAttuali}
                </div>
                <div className="mt-0.5 sm:mt-1 h-1 sm:h-1.5 bg-fantasy-800 rounded-full overflow-hidden">
                  <div className={`h-full ${barColor} transition-all duration-500`} style={{ width: `${hpPercent}%` }}></div>
                </div>
              </div>
            </div>

            {/* RIGA 2: CA e Iniziativa */}
            <div className="grid grid-cols-2 gap-1 sm:gap-2">
              {/* CA Box */}
              <div className="bg-fantasy-900 border border-fantasy-700 rounded p-1 sm:p-2 flex items-center gap-1 sm:gap-2"
                   style={{ boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)' }}>
                <svg className="w-3 h-3 sm:w-5 sm:h-5 flex-shrink-0 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-wider">CA</div>
                  <div className="text-xs sm:text-base font-bold text-white leading-tight">{attributi.ca}</div>
                </div>
              </div>

              {/* Iniziativa Box */}
              <div className="bg-fantasy-900 border border-fantasy-700 rounded p-1 sm:p-2 flex items-center gap-1 sm:gap-2"
                   style={{ boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)' }}>
                <svg className="w-3 h-3 sm:w-5 sm:h-5 flex-shrink-0 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.92 19.53l-1.41 1.41-1.41-1.41 1.41-1.41 1.41 1.41zm10.16-10.16l1.41-1.41 1.41 1.41-1.41 1.41-1.41-1.41zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  <path d="M7.05 16.95l9.9-9.9 1.41 1.41-9.9 9.9-1.41-1.41z"/>
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-wider">Init</div>
                  <div className="text-xs sm:text-base font-bold text-white leading-tight">
                    {attributi.iniziativa >= 0 ? `+${attributi.iniziativa}` : attributi.iniziativa}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}