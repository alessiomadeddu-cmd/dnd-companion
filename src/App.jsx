import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CharacterSheet from './pages/CharacterSheet';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-fantasy-900 text-gray-200 font-body">
        <Routes>
          {/* Rotta per la Home (Lista personaggi) */}
          <Route path="/" element={<HomePage />} />
          
          {/* Rotta per la Scheda Personaggio (per ora vuota) */}
          <Route path="/personaggio/:id" element={<CharacterSheet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;