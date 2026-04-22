import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-fredoka)', 'var(--font-nunito)', 'system-ui', 'sans-serif'],
        text: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: 'var(--bg)',
        'bg-2': 'var(--bg-2)',
        panel: 'var(--panel)',
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        accent: 'var(--accent)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'var(--radius-sm)',
      },
      boxShadow: {
        DEFAULT: 'var(--shadow)',
        lg: 'var(--shadow-lg)',
      },
    },
  },
  plugins: [],
}
export default config
