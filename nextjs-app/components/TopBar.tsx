'use client'
import { useApp } from '@/context/AppContext'
import { I18N } from '@/data/i18n'

export default function TopBar() {
  const { view, setView, tweakState, setTweakState, setShowTweaks, showTweaks, lang } = useApp()
  const t = I18N[lang]

  return (
    <header className="topbar">
      <div className="logo">
        <span className="logo-mark">🌍</span>
        <span>{t.appTitle}</span>
      </div>
      <nav className="nav">
        {(['globe', 'atlas', 'compare', 'quiz'] as const).map(v => (
          <button
            key={v}
            className={view === v ? 'active' : ''}
            onClick={() => setView(v)}
          >
            {t.nav[v]}
          </button>
        ))}
      </nav>
      <div className="topbar-right">
        <div className="lang-switch">
          {(['hr', 'en', 'de'] as const).map(l => (
            <button
              key={l}
              className={lang === l ? 'active' : ''}
              onClick={() => setTweakState(s => ({ ...s, language: l }))}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <button
          className="icon-btn"
          title={t.tweaks.theme}
          onClick={() => setTweakState(s => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' }))}
        >
          {tweakState.theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button
          className="icon-btn"
          title={t.tweaks.title}
          onClick={() => setShowTweaks(!showTweaks)}
        >
          ⚙️
        </button>
      </div>
    </header>
  )
}
