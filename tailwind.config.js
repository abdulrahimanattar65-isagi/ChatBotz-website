/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--foreground) / <alpha-value>)',
        canvas: 'rgb(var(--background) / <alpha-value>)',
        surface: Object.fromEntries([950, 900, 800, 700].map((shade) => [shade, `rgb(var(--surface-${shade}) / <alpha-value>)`])),
        neutral: Object.fromEntries([100, 300, 400, 500].map((shade) => [shade, `rgb(var(--neutral-${shade}) / <alpha-value>)`])),
      },
      fontFamily: {
        display: ['Arial', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Arial', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(rgb(var(--surface-700)), rgb(var(--surface-700)))',
      },
      boxShadow: { glow: '0 8px 24px -12px rgba(0,0,0,0.35)' },
    },
  },
  plugins: [],
}
