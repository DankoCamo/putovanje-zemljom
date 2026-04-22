'use client'
import { Country, Lang, I18nT, City } from '@/lib/types'
import { CONTINENTS } from '@/data/continents'
import { CITIES } from '@/data/cities'
import { flagUrl, flagUrlSmall, fmtPop, fmtArea, formatCurrency } from '@/lib/utils'

interface Props {
  country: Country | null
  open: boolean
  onClose: () => void
  onSelectIso: (iso: string) => void
  t: I18nT
  lang: Lang
  countries: Country[]
}

export default function CountryPanel({ country, open, onClose, onSelectIso, t, lang, countries }: Props) {
  if (!country) return <div className="country-panel" />

  const neighbors = (country.neighbors || [])
    .map(iso => countries.find(c => c.iso === iso))
    .filter(Boolean) as Country[]

  const continentLabel = t.continents[country.continent] || country.continent
  const contMeta = CONTINENTS.find(x => x.id === country.continent)

  const cityData: City[] | undefined = CITIES[country.iso]
  const capitalCityEntry = cityData?.find(c => c.capital)
  const topCities = cityData ? [...cityData].sort((a, b) => b.pop - a.pop).slice(0, 3) : []

  const tagLabels: Record<string, string> = {
    landlocked: t.facts.landlocked,
    doubleLandlocked: t.facts.doubleLandlocked,
    island: t.facts.island,
    archipelago: t.facts.archipelago,
    smallest: t.facts.smallest,
    largest: t.facts.largest,
  }
  const factText = (country.fact?.[lang] ?? '').toLowerCase()
  const tagOverlaps: Record<string, RegExp> = {
    landlocked: /\bbez izlaza? na more|nema izlaz|landlocked|binnenstaat|binnenland/,
    doubleLandlocked: /dvostruko zaključan|doubly landlocked|doppelt binnenländ/,
    island: /\botoč(na|ni|ka)|island nation|inselstaat/,
    archipelago: /arhipelag|archipelago|archipel/,
    smallest: /najmanja država|smallest country|kleinstes land/,
    largest: /najveća država|largest country|größtes land/,
  }
  const visibleTags = (country.tags || []).filter(tag => {
    if (!tagLabels[tag]) return false
    const rx = tagOverlaps[tag]
    if (rx && rx.test(factText)) return false
    return true
  })

  return (
    <aside className={'country-panel' + (open ? ' open' : '')}>
      <div className="cp-header">
        <img className="cp-flag" src={flagUrl(country.iso)} alt="" onError={(e) => (e.currentTarget.style.opacity = '0.2')} />
        <div className="cp-title">
          <h2>{country.name[lang]}</h2>
          <div className="cp-continent">{contMeta?.emoji} {continentLabel}</div>
        </div>
        <button className="cp-close" onClick={onClose} aria-label="close">×</button>
      </div>

      <div className="cp-body">
        <div className="cp-grid">
          <div className="cp-tile wide">
            <div className="cp-tile-label">{t.fields.capital}</div>
            <div className="cp-tile-value">
              📍 {country.capital[lang]}
              {capitalCityEntry && (
                <span style={{ fontSize: '0.8rem', color: 'var(--muted)', marginLeft: 8, fontWeight: 500 }}>
                  {fmtPop(capitalCityEntry.pop)}
                  {capitalCityEntry.metro && capitalCityEntry.metro !== capitalCityEntry.pop && (
                    <span style={{ opacity: 0.65 }}> ({fmtPop(capitalCityEntry.metro)} {t.fields.metro})</span>
                  )}
                </span>
              )}
            </div>
          </div>
          <div className="cp-tile">
            <div className="cp-tile-label">{t.fields.population}</div>
            <div className="cp-tile-value">{fmtPop(country.population)}</div>
          </div>
          <div className="cp-tile">
            <div className="cp-tile-label">{t.fields.area}</div>
            <div className="cp-tile-value">{fmtArea(country.area)} {t.fields.km2}</div>
          </div>
          <div className="cp-tile">
            <div className="cp-tile-label">{t.fields.currency}</div>
            <div className="cp-tile-value" style={{ fontSize: country.currency?.length > 3 ? '0.92rem' : '1rem' }}>
              {country.currency ? formatCurrency(country.currency, lang) : '—'}
            </div>
          </div>
          <div className="cp-tile">
            <div className="cp-tile-label">{t.fields.languages}</div>
            <div className="cp-tile-value" style={{ fontSize: '0.92rem' }}>
              {(country.languages || []).join(', ') || '—'}
            </div>
          </div>
        </div>

        {country.fact && (
          <div className="cp-fact">
            <div className="cp-fact-title">💡 {t.fields.factTitle}</div>
            <div style={{ fontSize: '0.95rem', lineHeight: 1.45 }}>{country.fact[lang]}</div>
          </div>
        )}

        {visibleTags.length > 0 && (
          <div className="cp-tags">
            {visibleTags.map(tag => (
              <span key={tag} className="cp-tag">
                {tag === 'landlocked' && '🏔️ '}
                {tag === 'doubleLandlocked' && '🔒 '}
                {tag === 'island' && '🏝️ '}
                {tag === 'archipelago' && '🌊 '}
                {tag === 'smallest' && '🔬 '}
                {tagLabels[tag]}
              </span>
            ))}
          </div>
        )}

        {topCities.length > 0 && (
          <div className="cp-cities">
            <div className="cp-cities-title">🏙️ {t.fields.topCities}</div>
            <div className="cp-cities-list">
              {topCities.map((c, i) => (
                <div key={i} className={'cp-city' + (c.capital ? ' is-capital' : '')}>
                  <div className="cp-city-rank">{c.capital ? '★' : i + 1}</div>
                  <div className="cp-city-info">
                    <div className="cp-city-name">{c.name[lang]}</div>
                    <div className="cp-city-pop">
                      <span>{fmtPop(c.pop)} <span style={{ opacity: 0.55 }}>· {t.fields.cityOnly}</span></span>
                      {c.metro && c.metro !== c.pop && (
                        <span style={{ opacity: 0.7 }}> · {fmtPop(c.metro)} {t.fields.metro}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="cp-neighbors">
          <div className="cp-neighbors-title">🤝 {t.fields.neighbors}</div>
          {neighbors.length === 0 ? (
            <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{t.fields.noNeighbors}</div>
          ) : (
            <div className="cp-neighbor-list">
              {neighbors.map(n => (
                <button key={n.iso} className="cp-neighbor" onClick={() => onSelectIso(n.iso)}>
                  <img src={flagUrlSmall(n.iso)} alt="" />
                  <span>{n.name[lang]}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
