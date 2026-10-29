import { useState, useRef, useEffect } from 'react';

export default function AutocompleteSelect({ label, options, value, onSelect }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Sincronizza il campo di testo
  useEffect(() => {
    if (value && options.length > 0) {
      const selected = options.find(opt => opt.value === value);
      if (selected) setQuery(selected.label);
    } else if (!value) {
      setQuery('');
    }
  }, [value, options]);

  // Chiude il dropdown se si clicca/tocca fuori
  useEffect(() => {
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
  }, []);

  // Filtraggio inline
  const filteredOptions = query.length > 0
    ? options.filter(opt => opt.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  const handleSelect = (option) => {
    setQuery(option.label);
    setIsOpen(false);
    onSelect(option);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  // Quando il campo riceve il focus, scrolla la pagina per portarlo in vista
  const handleFocus = () => {
    setIsOpen(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 100); // Piccolo delay per aspettare l'apertura della tastiera
  };

  // Previene la perdita di focus su mobile
  const handleOptionTouchStart = (e, option) => {
    e.preventDefault();
    handleSelect(option);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">{label}</label>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder={options.length === 0 ? "Caricamento..." : `Cerca ${label.toLowerCase()}...`}
        disabled={options.length === 0}
        className="w-full fantasy-input cursor-pointer disabled:opacity-50"
        autoComplete="off"
      />
      
      {isOpen && filteredOptions.length > 0 && (
        <ul 
          ref={listRef}
          className="absolute z-50 w-full mt-1 bg-fantasy-800 border border-fantasy-700 rounded-lg shadow-xl max-h-60 overflow-y-auto"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain'
          }}
        >
          {filteredOptions.map((option) => (
            <li
              key={option.key || option.value}
              onClick={() => handleSelect(option)}
              onTouchStart={(e) => handleOptionTouchStart(e, option)}
              className="px-4 py-3 cursor-pointer hover:bg-fantasy-700 active:bg-fantasy-600 transition-colors select-none text-gray-200"
              style={{ 
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation'
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}