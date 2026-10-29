import { useNavigate } from 'react-router-dom';
import { useCharacterStore } from '../store/useCharacterStore';
import CharacterCard from '../components/CharacterCard';

export default function HomePage() {
  const { personaggi, aggiungiPersonaggio, eliminaPersonaggio } = useCharacterStore();
  const navigate = useNavigate();

  const handleCreaNuovo = () => {
    // Crea un personaggio base e naviga direttamente alla sua scheda
    aggiungiPersonaggio('Nuovo Eroe');
    const nuovoId = useCharacterStore.getState().personaggioAttivoId;
    navigate(`/personaggio/${nuovoId}`);
  };

  const handleElimina = (e, id) => {
    e.stopPropagation(); // Evita di navigare alla scheda quando si clicca elimina
    if (window.confirm('Sei sicuro di voler eliminare questo personaggio?')) {
      eliminaPersonaggio(id);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <header className="text-center mb-8 mt-4">
        <h1 className="text-4xl font-fantasy text-fantasy-gold mb-2">D&D Companion</h1>
        <p className="text-gray-400 text-sm">I tuoi eroi, sempre a portata di mano</p>
      </header>

      {personaggi.length === 0 ? (
        <div className="fantasy-card text-center py-12">
          <p className="text-gray-400 mb-6">Non hai ancora nessun personaggio nel tuo grimorio.</p>
          <button onClick={handleCreaNuovo} className="fantasy-btn text-lg">
            Crea il tuo primo Eroe
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {personaggi.map((personaggio) => (
            <CharacterCard 
              key={personaggio.id} 
              personaggio={personaggio} 
              onElimina={handleElimina} 
            />
          ))}
          
          <button 
            onClick={handleCreaNuovo} 
            className="w-full fantasy-btn mt-6 py-3 text-lg border-2 border-dashed border-fantasy-700 bg-transparent text-fantasy-gold hover:bg-fantasy-800"
          >
            + Aggiungi Nuovo Personaggio
          </button>
        </div>
      )}
    </div>
  );
}