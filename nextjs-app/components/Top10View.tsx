'use client'
import { useState } from 'react'
import { Lang } from '@/lib/types'
import { TOP10_LISTS, T10List, T10Entry } from '@/data/top10'
import { flagUrl } from '@/lib/utils'

interface Props {
  lang: Lang
}

const MEDALS = ['🥇', '🥈', '🥉']
const EUR_RATE = 0.93  // 1 USD ≈ 0.93 EUR, end-2025 estimate

function fmtDots(n: number): string {
  // Format with dots as thousand separators (Croatian/German style)
  return n.toLocaleString('hr-HR')
}

function eurDisplay(entry: T10Entry, listId: string): string {
  if (entry.rawUsd == null) return entry.value
  const eur = Math.round(entry.rawUsd * EUR_RATE)
  if (listId === 'gdp') {
    return `${fmtDots(eur)} mlrd €`
  }
  if (listId === 'gdp_capita') {
    const rounded = Math.round(eur / 1000) * 1000
    return `${fmtDots(rounded)} €`
  }
  return `${fmtDots(eur)} €`
}

export default function Top10View({ lang }: Props) {
  const [activeId, setActiveId] = useState(TOP10_LISTS[0].id)
  const [currency, setCurrency] = useState<'usd' | 'eur'>('usd')
  const list = TOP10_LISTS.find(l => l.id === activeId) as T10List

  function displayValue(entry: T10Entry): string {
    if (currency === 'eur' && list.currencyToggle && entry.rawUsd != null) {
      return eurDisplay(entry, list.id)
    }
    return entry.value
  }

  return (
    <div className="top10-view">
      <div className="top10-sidebar">
        {TOP10_LISTS.map(l => (
          <button
            key={l.id}
            className={'top10-cat-btn' + (l.id === activeId ? ' active' : '')}
            onClick={() => setActiveId(l.id)}
          >
            <span className="top10-cat-icon">{l.icon}</span>
            <span className="top10-cat-label">{l.title[lang]}</span>
          </button>
        ))}
      </div>

      <div className="top10-main">
        <div className="top10-header">
          <span className="top10-title-icon">{list.icon}</span>
          <h2>{list.title[lang]}</h2>
          {list.currencyToggle && (
            <div className="top10-currency-toggle">
              <button
                className={currency === 'usd' ? 'active' : ''}
                onClick={() => setCurrency('usd')}
              >
                $ USD
              </button>
              <button
                className={currency === 'eur' ? 'active' : ''}
                onClick={() => setCurrency('eur')}
              >
                € EUR
              </button>
            </div>
          )}
        </div>

        <ol className="top10-list">
          {list.entries.map((entry, i) => (
            <li key={i} className={'top10-item' + (i < 3 ? ' top10-podium' : '')}>
              <span className="top10-rank">
                {i < 3 ? MEDALS[i] : `${i + 1}.`}
              </span>
              {entry.iso && (
                <img
                  className="top10-flag"
                  src={flagUrl(entry.iso)}
                  alt=""
                  loading="lazy"
                />
              )}
              <div className="top10-info">
                <span className="top10-name">{entry.name[lang]}</span>
                {entry.extra && (
                  <span className="top10-extra">{entry.extra[lang]}</span>
                )}
              </div>
              <span className="top10-value">{displayValue(entry)}</span>
            </li>
          ))}
        </ol>

        <p className="top10-note">
          {lang === 'hr' && `* Podaci prema procjenama s kraja 2025. godine. BDP nominalni (MMF 2025). Tečaj EUR/USD ≈ 0,93. Izvori: UN, Svjetska banka, Wikipedia.`}
          {lang === 'en' && `* Data based on end-2025 estimates. GDP nominal (IMF 2025). EUR/USD rate ≈ 0.93. Sources: UN, World Bank, Wikipedia.`}
          {lang === 'de' && `* Daten basieren auf Schätzungen Ende 2025. BIP nominal (IWF 2025). EUR/USD-Kurs ≈ 0,93. Quellen: UN, Weltbank, Wikipedia.`}
        </p>
      </div>
    </div>
  )
}
