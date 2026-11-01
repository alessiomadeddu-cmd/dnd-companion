import { useState, useRef, useEffect } from 'react';

export default function AutocompleteSelect({ label, options, value, onSelect, disabled = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Blocca lo scroll del body quando la modal è aperta
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Chiude il modal se si clicca/tocca fuori
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option) => {
    setIsOpen(false);
    onSelect(option);
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative w-full" ref={containerRef}>
      <label className={`block text-xs uppercase tracking-wider mb-1 ${disabled ? 'text-gray-600' : 'text-gray-400'}`}>
        {label}
      </label>
      
      {/* Bottone trigger */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(true)}
        disabled={disabled || options.length === 0}
        className={`w-full text-left px-4 py-2 border rounded-lg transition-colors ${
          disabled 
            ? 'bg-fantasy-900 border-fantasy-800 text-gray-600 cursor-not-allowed' 
            : options.length === 0
              ? 'bg-fantasy-800 border-fantasy-700 text-gray-500 cursor-wait'
              : 'bg-fantasy-800 border-fantasy-700 text-white hover:border-fantasy-gold focus:border-fantasy-gold focus:outline-none'
        }`}
      >
        {selectedOption 
          ? selectedOption.label 
          : disabled 
            ? `Disponibile dal livello richiesto` 
            : options.length === 0 
              ? 'Caricamento...' 
              : `Seleziona ${label.toLowerCase()}...`}
      </button>

      {/* MODAL */}
      {isOpen && !disabled && (
        <>
          {/* Overlay scuro */}
          <div 
            className="fixed inset-0 bg-black/70 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal content */}
          <div 
            className="fixed inset-x-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-fantasy-900 border-2 border-fantasy-gold rounded-xl max-h-[70vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-fantasy-700 flex-shrink-0">
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
            
            {/* Lista scrollabile */}
            <div 
              className="flex-1 overflow-y-auto p-2"
              style={{ maxHeight: 'calc(70vh - 80px)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {options.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Nessuna opzione disponibile</p>
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
      )}
    </div>
  );
}