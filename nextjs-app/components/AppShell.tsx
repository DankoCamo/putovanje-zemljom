'use client'
import { AppProvider, useApp } from '@/context/AppContext'
import { Country } from '@/lib/types'
import { I18N } from '@/data/i18n'
import TopBar from './TopBar'
import TweaksPanel from './TweaksPanel'
import CountryPanel from './CountryPanel'
import AtlasView from './AtlasView'
import CompareView from './CompareView'
import QuizView from './QuizView'
import GlobeWrapper from './GlobeWrapper'
import Top10View from './Top10View'

function Shell({ countries }: { countries: Country[] }) {
  const {
    view, setView,
    selected, panelOpen, focusIso,
    openCountry, closePanel, pickIso,
    tweakState,
    showTweaks,
    introSeen, dismissIntro,
    lang,
  } = useApp()

  const t = I18N[lang]

  return (
    <div className="app-shell">
      <TopBar />

      <div className="main-area">
        {/* Globe view — always mounted so Three.js stays alive */}
        <div className="globe-view" style={{ display: view === 'globe' ? 'flex' : 'none' }}>
          <div className="globe-canvas-wrap">
            <GlobeWrapper
              countries={countries}
              onSelectCountry={openCountry}
              theme={tweakState.theme}
              rotationSpeed={tweakState.rotationSpeed}
              showCapitals={tweakState.showCapitals}
              showBorders={tweakState.showBorders}
              focusIso={focusIso}
              lang={lang}
            />

            {!introSeen && (
              <div className="intro-overlay" onClick={dismissIntro}>
                <div className="intro-card">
                  <h1>🌍 {t.appTitle}</h1>
                  <p>{t.intro.lineOne}<br />{t.intro.lineTwo}</p>
                  <button className="btn-primary" onClick={e => { e.stopPropagation(); dismissIntro() }}>
                    {t.intro.cta}
                  </button>
                </div>
              </div>
            )}

            {introSeen && !panelOpen && (
              <div className="globe-hint">
                ✨ {t.intro.lineOne.toLowerCase()} — {t.intro.lineTwo.toLowerCase()}
              </div>
            )}
          </div>

          <CountryPanel
            country={selected}
            open={panelOpen}
            onClose={closePanel}
            onSelectIso={pickIso}
            t={t}
            lang={lang}
            countries={countries}
          />
        </div>

        {view === 'atlas' && (
          <AtlasView
            countries={countries}
            t={t}
            lang={lang}
            onSelectCountry={c => {
              openCountry(c)
              setView('globe')
            }}
          />
        )}
        {view === 'compare' && (
          <CompareView countries={countries} t={t} lang={lang} />
        )}
        {view === 'quiz' && (
          <QuizView countries={countries} t={t} lang={lang} />
        )}
        {view === 'top10' && (
          <Top10View lang={lang} />
        )}
      </div>

      {showTweaks && <TweaksPanel />}
    </div>
  )
}

export default function AppShell({ countries }: { countries: Country[] }) {
  return (
    <AppProvider countries={countries}>
      <Shell countries={countries} />
    </AppProvider>
  )
}
