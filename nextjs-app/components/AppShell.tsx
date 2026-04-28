'use client'
import { AppProvider, useApp } from '@/context/AppContext'
import { Country } from '@/lib/types'
import { I18N } from '@/data/i18n'
import { HISTORICAL_COUNTRIES_1960 } from '@/data/countries-1960'
import TopBar from './TopBar'
import TweaksPanel from './TweaksPanel'
import CountryPanel from './CountryPanel'
import AtlasView from './AtlasView'
import CompareView from './CompareView'
import QuizView from './QuizView'
import TriviaQuizView from './TriviaQuizView'
import GlobeWrapper from './GlobeWrapper'
import Top10View from './Top10View'

const ALL_COUNTRIES_COMBINED = (countries: Country[]) => [...countries, ...HISTORICAL_COUNTRIES_1960]

function Shell({ countries }: { countries: Country[] }) {
  const {
    view, setView,
    selected, panelOpen, focusIso,
    openCountry, closePanel,
    tweakState,
    showTweaks,
    introSeen, dismissIntro,
    lang,
    era, setEra,
  } = useApp()

  const t = I18N[lang]

  function handleSelectHistorical(iso: string) {
    const hc = HISTORICAL_COUNTRIES_1960.find(h => h.iso === iso)
    if (hc) openCountry(hc)
  }

  function handlePickIso(iso: string) {
    const current = countries.find(c => c.iso === iso)
    if (current) { openCountry(current); return }
    const historical = HISTORICAL_COUNTRIES_1960.find(h => h.iso === iso)
    if (historical) openCountry(historical)
  }

  function handleEraToggle() {
    const next = era === 'current' ? '1960' : 'current'
    setEra(next)
    closePanel()
  }

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
              onSelectHistorical={handleSelectHistorical}
              theme={tweakState.theme}
              rotationSpeed={tweakState.rotationSpeed}
              showCapitals={tweakState.showCapitals}
              showBorders={tweakState.showBorders}
              focusIso={focusIso}
              lang={lang}
              era={era}
            />

            <button
              className={'era-toggle' + (era === '1960' ? ' era-active' : '')}
              onClick={handleEraToggle}
              title={era === '1960' ? 'Prikaži današnje granice' : 'Prikaži granice Hladnog rata (1960)'}
            >
              {era === '1960' ? '🌍 Danas' : '🕰️ Hladni rat 1960.'}
            </button>

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
            onSelectIso={handlePickIso}
            t={t}
            lang={lang}
            countries={ALL_COUNTRIES_COMBINED(countries)}
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
        {view === 'trivia' && (
          <TriviaQuizView countries={countries} t={t} lang={lang} />
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
