'use client'
import { useMemo, useState } from 'react'
import { AppProvider, useApp } from '@/context/AppContext'
import type { Era } from '@/context/AppContext'
import { Country } from '@/lib/types'
import { I18N } from '@/data/i18n'
import { HISTORICAL_COUNTRIES_1960 } from '@/data/countries-1960'
import TopBar from './TopBar'
import TweaksPanel from './TweaksPanel'
import CountryPanel from './CountryPanel'
import AtlasView from './AtlasView'
import CompareView from './CompareView'
import QuizView from './QuizView'
import GlobeWrapper from './GlobeWrapper'
import Top10View from './Top10View'

const ALL_COUNTRIES_COMBINED = (countries: Country[]) => [...countries, ...HISTORICAL_COUNTRIES_1960]
const TIMELINE_ERAS: Era[] = ['1938', '1945', '1960', '1994', '2010', 'current']

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
    mapTheme, setMapTheme,
    atlasSearch, setAtlasSearch,
  } = useApp()
  const [searchOpen, setSearchOpen] = useState(false)

  const t = I18N[lang]
  const searchResults = useMemo(() => {
    const query = atlasSearch.trim().toLocaleLowerCase()
    if (!query) return []
    return countries.filter(country => [
      country.name.hr, country.name.en, country.name.de,
      country.capital.hr, country.capital.en, country.capital.de,
    ].some(value => value.toLocaleLowerCase().includes(query))).slice(0, 6)
  }, [atlasSearch, countries])

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

  function chooseEra(index: number) {
    setEra(TIMELINE_ERAS[index])
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
              mapTheme={mapTheme}
              focusIso={focusIso}
              lang={lang}
              era={era}
            />

            <div className="globe-tools">
              <div className="globe-search">
                <input
                  type="search"
                  aria-label={t.search}
                  placeholder={t.search}
                  value={atlasSearch}
                  onFocus={() => setSearchOpen(true)}
                  onChange={event => { setAtlasSearch(event.target.value); setSearchOpen(true) }}
                  onKeyDown={event => {
                    if (event.key === 'Enter' && searchResults[0]) {
                      openCountry(searchResults[0])
                      setSearchOpen(false)
                    }
                    if (event.key === 'Escape') setSearchOpen(false)
                  }}
                />
                {searchOpen && searchResults.length > 0 && (
                  <div className="globe-search-results">
                    {searchResults.map(country => (
                      <button key={country.iso} onClick={() => {
                        openCountry(country)
                        setSearchOpen(false)
                      }}>
                        <span>{country.name[lang]}</span>
                        <small>{country.capital[lang]}</small>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="map-controls">
                <label className="timeline-label" htmlFor="history-year">
                  {t.map.history} <strong>{era === 'current' ? t.map.current : era}</strong>
                </label>
                <input
                  id="history-year"
                  className="timeline-slider"
                  type="range"
                  min="0"
                  max={TIMELINE_ERAS.length - 1}
                  step="1"
                  value={TIMELINE_ERAS.indexOf(era)}
                  aria-label={t.map.history}
                  onChange={event => chooseEra(Number(event.target.value))}
                />
                <div className="timeline-years" aria-hidden="true">
                  {TIMELINE_ERAS.map(year => <span key={year}>{year === 'current' ? t.map.current : year}</span>)}
                </div>
                <label className="map-theme-control">
                  <span>{t.map.thematic}</span>
                  <select
                    value={mapTheme}
                    disabled={era !== 'current'}
                    onChange={event => setMapTheme(event.target.value as 'none' | 'population' | 'area')}
                  >
                    <option value="none">{t.map.none}</option>
                    <option value="population">{t.map.population}</option>
                    <option value="area">{t.map.area}</option>
                  </select>
                </label>
                {era !== 'current' && <small className="theme-unavailable">{t.map.currentOnly}</small>}
                {mapTheme !== 'none' && era === 'current' && (
                  <div className="theme-legend" aria-label={`${t.map.thematic}: ${t.map[mapTheme]}`}>
                    <span>{t.map.low}</span>
                    <div className="theme-legend-scale" />
                    <span>{t.map.high}</span>
                  </div>
                )}
                {era !== 'current' && (
                  <div className="historical-attribution">
                    <a className="historical-source" href="https://github.com/aourednik/historical-basemaps" target="_blank" rel="noreferrer">
                      {t.map.historicalSource}
                    </a>
                    <a className="historical-license" href="/historical-data-license.txt" target="_blank" rel="noreferrer">
                      {t.map.historicalLicense}
                    </a>
                  </div>
                )}
              </div>
            </div>

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
            query={atlasSearch}
            onQueryChange={setAtlasSearch}
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
