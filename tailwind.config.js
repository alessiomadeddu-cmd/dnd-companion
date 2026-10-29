/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fantasy: {
          900: '#0f0f13', // Sfondo principale molto scuro
          800: '#1a1a24', // Sfondo card e sezioni
          700: '#2a2a3c', // Bordi e separatori
          gold: '#d4af37', // Accenti dorati
          goldHover: '#b5952f',
          danger: '#8b0000', // Rosso scuro per HP/danni
          success: '#2e7d32', // Verde per successi/HP
        }
      },
      fontFamily: {
        fantasy: ['Cinzel', 'serif'], // Font tematico per i titoli
        body: ['Inter', 'sans-serif'], // Font leggibile per i testi
      }
    },
  },
  plugins: [],
}