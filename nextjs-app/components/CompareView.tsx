'use client'
import { useState, useMemo } from 'react'
import { Country, Lang, I18nT } from '@/lib/types'
import { flagUrl, fmtPop, fmtArea, formatCurrency } from '@/lib/utils'

interface Props {
  countries: Country[]
  t: I18nT
  lang: Lang
}

export default function CompareView({ countries, t, lang }: Props) {
  const [a, setA] = useState<Country | null>(null)
  const [b, setB] = useState<Country | null>(null)

  const sorted = useMemo(() =>
    [...countries].sort((x, y) => x.name[lang].localeCompare(y.name[lang])),
    [countries, lang]
  )

  function renderSide(country: Country | null, onChange: (c: Country | null) => void, other: Country | null) {
    if (!country) {
      return (
        <div className="compare-slot">
          <select className="compare-picker" defaultValue="" onChange={e => onChange(countries.find(c => c.iso === e.target.value) ?? null)}>
            <option value="" disabled>— {t.compare.pickA} —</option>
            {sorted.map(c => <option key={c.iso} value={c.iso}>{c.name[lang]}</option>)}
          </select>
        </div>
      )
    }

    const isBigger = other ? {
      pop: country.population > other.population,
      area: country.area > other.area,
    } : { pop: false, area: false }

    return (
      <div className="compare-slot filled">
        <select
          className="compare-picker"
          value={country.iso}
          onChange={e => onChange(countries.find(c => c.iso === e.target.value) ?? null)}
        >
          {sorted.map(c => <option key={c.iso} value={c.iso}>{c.name[lang]}</option>)}
        </select>
        <div className="compare-card">
          <img className="flag" src={flagUrl(country.iso)} alt="" />
          <h3>{country.name[lang]}</h3>
          <div className="compare-stat">
            <span className="label">{t.fields.capital}</span>
            <span className="val">{country.capital[lang]}</span>
          </div>
          <div className={'compare-stat' + (isBigger.pop ? ' winner' : '')}>
            <span className="label">{t.fields.population}</span>
            <span className="val">{fmtPop(country.population)}</span>
          </div>
          <div className={'compare-stat' + (isBigger.area ? ' winner' : '')}>
            <span className="label">{t.fields.area}</span>
            <span className="val">{fmtArea(country.area)} {t.fields.km2}</span>
          </div>
          <div className="compare-stat">
            <span className="label">{t.fields.continent}</span>
            <span className="val">{t.continents[country.continent]}</span>
          </div>
          <div className="compare-stat">
            <span className="label">{t.fields.currency}</span>
            <span className="val">{country.currency ? formatCurrency(country.currency, lang) : '—'}</span>
          </div>
          <div className="compare-stat">
            <span className="label">{t.fields.languages}</span>
            <span className="val" style={{ fontSize: '0.88rem', textAlign: 'right' }}>
              {(country.languages || []).slice(0, 2).join(', ')}
            </span>
          </div>
          <div className="compare-stat">
            <span className="label">{t.fields.neighbors}</span>
            <span className="val">{(country.neighbors || []).length}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="compare-view">
      <h2 className="compare-title">⚖️ {t.compare.title}</h2>
      <div className="compare-grid">
        {renderSide(a, setA, b)}
        {renderSide(b, setB, a)}
      </div>
    </div>
  )
}
