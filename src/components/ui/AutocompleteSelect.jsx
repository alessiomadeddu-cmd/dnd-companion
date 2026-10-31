import { useState, useEffect } from 'react';

export default function AutocompleteSelect({ label, options, value, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Rileva se è mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => opt.value === value);

  // === MODALE MOBILE (bottom sheet full screen) ===
  if (isMobile && isOpen) {
    return (
      <>
        {/* Overlay scuro */}
        <div 
          className="fixed inset-0 bg-black/70 z-40"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Modal bottom sheet */}
        <div className="fixed inset-x-0 bottom-0 z-50 bg-fantasy-900 border-t-2 border-fantasy-gold rounded-t-2xl max-h-[80vh] flex flex-col">
          {/* Header del modal */}
          <div className="flex items-center justify-between p-4 border-b border-fantasy-700">
            <h3 className="text-lg font-fantasy text-fantasy-gold">{label}</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-fantasy-gold p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Lista scrollabile nativamente */}
          <div className="flex-1 overflow-y-auto p-2" style={{ WebkitOverflowScrolling: 'touch' }}>
            {options.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Caricamento...</p>
            ) : (
              options.map((option) => (
                <button
                  key={option.key || option.value}
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors mb-1 ${
                    option.value === value 
                      ? 'bg-fantasy-gold/20 text-fantasy-gold border border-fantasy-gold' 
                      : 'text-gray-200 hover:bg-fantasy-800 active:bg-fantasy-700'
                  }`}
                >
                  {option.label}
                </button>
              ))
            )}
          </div>
        </div>
      </>
    );
  }

  // === DESKTOP: Dropdown classico ===
  return (
    <div className="relative w-full">
      <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">{label}</label>
      
      {/* Trigger: mostra il valore selezionato */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full fantasy-input text-left cursor-pointer"
      >
        {selectedOption ? selectedOption.label : `Seleziona ${label.toLowerCase()}...`}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <ul 
          className="absolute z-50 w-full mt-1 bg-fantasy-800 border border-fantasy-700 rounded-lg shadow-xl max-h-60 overflow-y-auto"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain'
          }}
        >
          {options.length === 0 ? (
            <li className="px-4 py-3 text-gray-500">Caricamento...</li>
          ) : (
            options.map((option) => (
              <li
                key={option.key || option.value}
                onClick={() => handleSelect(option)}
                className={`px-4 py-3 cursor-pointer transition-colors select-none ${
                  option.value === value 
                    ? 'bg-fantasy-gold/20 text-fantasy-gold' 
                    : 'text-gray-200 hover:bg-fantasy-700 active:bg-fantasy-600'
                }`}
              >
                {option.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}