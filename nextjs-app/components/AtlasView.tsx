'use client'
import { useState, useMemo } from 'react'
import { Country, Lang, I18nT } from '@/lib/types'
import { CONTINENTS } from '@/data/continents'
import { FLAG_DESC } from '@/data/flagDesc'
import { flagUrl } from '@/lib/utils'

interface Props {
  countries: Country[]
  t: I18nT
  lang: Lang
  onSelectCountry: (c: Country) => void
}

export default function AtlasView({ countries, t, lang, onSelectCountry }: Props) {
  const [q, setQ] = useState('')
  const [cont, setCont] = useState('all')

  const filtered = useMemo(() => {
    const qn = q.trim().toLowerCase()
    return countries.filter(c => {
      if (cont !== 'all' && c.continent !== cont) return false
      if (qn) {
        const names = [c.name.hr, c.name.en, c.name.de, c.capital.hr, c.capital.en, c.capital.de].join(' ').toLowerCase()
        if (!names.includes(qn)) return false
      }
      return true
    }).sort((a, b) => a.name[lang].localeCompare(b.name[lang]))
  }, [q, cont, countries, lang])

  return (
    <div className="atlas-view">
      <div className="atlas-controls">
        <input
          className="search-input"
          placeholder={t.search}
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </div>
      <div className="continent-chips">
        <button className={'chip' + (cont === 'all' ? ' active' : '')} onClick={() => setCont('all')}>
          🌍 {t.allContinents}
        </button>
        {CONTINENTS.map(c => (
          <button
            key={c.id}
            className={'chip' + (cont === c.id ? ' active' : '')}
            onClick={() => setCont(c.id)}
          >
            {c.emoji} {t.continents[c.id]}
          </button>
        ))}
      </div>
      <div className="country-grid">
        {filtered.map(c => {
          const desc = FLAG_DESC[c.iso]
          return (
            <button key={c.iso} className="country-card" onClick={() => onSelectCountry(c)}>
              <img src={flagUrl(c.iso)} alt="" loading="lazy" />
              <div className="country-card-name">{c.name[lang]}</div>
              <div className="country-card-capital">{c.capital[lang]}</div>
              {desc && (
                <div className="country-card-desc">{desc[lang]}</div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
