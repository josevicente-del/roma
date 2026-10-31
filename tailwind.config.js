/**
 * Configuración de Tailwind CSS utilizando los Design Tokens (Variables CSS)
 * inspirados en Roma: Crema Travertino (#F7F3EC), Terracota (#B5532F),
 * Marrón Oscuro Cálido (#2B2420) y Secundario Salvia / Dorado Apagado.
 * Máximo dos familias tipográficas autoalojadas: Playfair Display (serif) y DM Sans (sans).
 */

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        roman: {
          bg: 'var(--bg-primary)',
          surface: 'var(--bg-surface)',
          elevated: 'var(--bg-elevated)',
          text: 'var(--text-primary)',
          muted: 'var(--text-secondary)',
          terracotta: 'var(--accent-terracotta)',
          terracottaHover: 'var(--accent-terracotta-hover)',
          sage: 'var(--secondary-sage)',
          gold: 'var(--secondary-gold)',
          border: 'var(--border-subtle)',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(43, 36, 32, 0.06), 0 2px 6px -1px rgba(43, 36, 32, 0.04)',
        elevated: '0 12px 32px -4px rgba(43, 36, 32, 0.12), 0 4px 12px -2px rgba(43, 36, 32, 0.06)',
      }
    },
  },
  plugins: [],
}
