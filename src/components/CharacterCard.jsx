// ... (tutto il codice precedente resta uguale fino alla RIGA 3) ...

          {/* RIGA 3: HP + CA + Init sulla stessa riga */}
          <div className="flex gap-1 sm:gap-2 mt-auto">
            
            {/* HP Box - ESPANSO (flex-[4] = ~66% dello spazio) */}
            <div className="flex-[4] bg-fantasy-900 border border-fantasy-700 rounded p-1 sm:p-1.5 flex items-center gap-1 relative overflow-hidden"
                 style={{ boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)' }}>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between">
                  <span className="text-[8px] sm:text-[9px] text-gray-400 leading-none">HP</span>
                  <span className="text-[8px] sm:text-[9px] text-gray-500">{attributi.hpMax}</span>
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-white leading-tight truncate">
                  {attributi.hpAttuali}
                </div>
                <div className="mt-0.5 h-1 bg-fantasy-800 rounded-full overflow-hidden">
                  <div className={`h-full ${barColor}`} style={{ width: `${hpPercent}%` }}></div>
                </div>
              </div>
            </div>

            {/* CA Box - RIDOTTO (flex-1 = ~17% dello spazio) */}
            <div className="flex-1 bg-fantasy-900 border border-fantasy-700 rounded p-1 sm:p-1.5 flex items-center gap-1"
                 style={{ boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)' }}>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
              <div className="flex-1 min-w-0">
                <div className="text-[8px] sm:text-[9px] text-gray-400 leading-none">CA</div>
                <div className="text-[10px] sm:text-xs font-bold text-white leading-tight">{attributi.ca}</div>
              </div>
            </div>

            {/* Iniziativa Box - RIDOTTO (flex-1 = ~17% dello spazio) */}
            <div className="flex-1 bg-fantasy-900 border border-fantasy-700 rounded p-1 sm:p-1.5 flex items-center gap-1"
                 style={{ boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)' }}>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.92 19.53l-1.41 1.41-1.41-1.41 1.41-1.41 1.41 1.41zm10.16-10.16l1.41-1.41 1.41 1.41-1.41 1.41-1.41-1.41zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                <path d="M7.05 16.95l9.9-9.9 1.41 1.41-9.9 9.9-1.41-1.41z"/>
              </svg>
              <div className="flex-1 min-w-0">
                <div className="text-[8px] sm:text-[9px] text-gray-400 leading-none">Init</div>
                <div className="text-[10px] sm:text-xs font-bold text-white leading-tight">
                  {attributi.iniziativa >= 0 ? `+${attributi.iniziativa}` : attributi.iniziativa}
                </div>
              </div>
            </div>

          </div>