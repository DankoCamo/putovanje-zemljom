'use client'
import { useState } from 'react'
import { Lang } from '@/lib/types'
import { TOP10_LISTS, T10_GROUPS, T10List, T10Entry } from '@/data/top10'
import { flagUrl } from '@/lib/utils'

interface Props { lang: Lang }

const MEDALS = ['🥇', '🥈', '🥉']
const EUR_RATE = 0.93

function fmtDots(n: number): string {
  return n.toLocaleString('hr-HR')
}

function eurDisplay(entry: T10Entry, listId: string): string {
  if (entry.rawUsd == null) return entry.value
  const eur = Math.round(entry.rawUsd * EUR_RATE)
  if (listId === 'gdp') return `${fmtDots(eur)} mlrd €`
  if (listId === 'gdp_capita') return `${fmtDots(Math.round(eur / 1000) * 1000)} €`
  return `${fmtDots(eur)} €`
}

export default function Top10View({ lang }: Props) {
  const [activeId, setActiveId] = useState(TOP10_LISTS[0].id)
  const [currency, setCurrency] = useState<'usd' | 'eur'>('usd')
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set([TOP10_LISTS[0].group])
  )

  const list = TOP10_LISTS.find(l => l.id === activeId) as T10List

  function toggleGroup(groupId: string) {
    setOpenGroups(prev => {
      const next = new Set(prev)
      if (next.has(groupId)) next.delete(groupId)
      else next.add(groupId)
      return next
    })
  }

  function selectCategory(listId: string) {
    const found = TOP10_LISTS.find(l => l.id === listId)
    if (!found) return
    setActiveId(listId)
    setOpenGroups(prev => {
      if (prev.has(found.group)) return prev
      const next = new Set(prev)
      next.add(found.group)
      return next
    })
  }

  function displayValue(entry: T10Entry): string {
    if (currency === 'eur' && list.currencyToggle && entry.rawUsd != null) return eurDisplay(entry, list.id)
    return entry.value
  }

  return (
    <div className="top10-view">
      {/* Desktop accordion sidebar */}
      <div className="top10-sidebar">
        {T10_GROUPS.map(group => {
          const items = TOP10_LISTS.filter(l => l.group === group.id)
          if (!items.length) return null
          const isOpen = openGroups.has(group.id)
          const hasActive = items.some(l => l.id === activeId)
          return (
            <div key={group.id} className="top10-group">
              <button
                className={'top10-group-header' + (hasActive ? ' has-active' : '')}
                onClick={() => toggleGroup(group.id)}
              >
                <span className="top10-group-icon">{group.icon}</span>
                <span className="top10-group-title">{group.title[lang]}</span>
                <span className={'top10-chevron' + (isOpen ? ' open' : '')}>▾</span>
              </button>
              {isOpen && items.map(l => (
                <button
                  key={l.id}
                  className={'top10-cat-btn' + (l.id === activeId ? ' active' : '')}
                  onClick={() => selectCategory(l.id)}
                >
                  <span className="top10-cat-icon">{l.icon}</span>
                  <span className="top10-cat-label">{l.title[lang]}</span>
                </button>
              ))}
            </div>
          )
        })}
      </div>

      <div className="top10-main">
        {/* Mobile dropdown — hidden on desktop via CSS */}
        <select
          className="top10-mobile-select"
          value={activeId}
          onChange={e => selectCategory(e.target.value)}
        >
          {T10_GROUPS.map(group => {
            const items = TOP10_LISTS.filter(l => l.group === group.id)
            if (!items.length) return null
            return (
              <optgroup key={group.id} label={`${group.icon} ${group.title[lang]}`}>
                {items.map(l => (
                  <option key={l.id} value={l.id}>{l.icon} {l.title[lang]}</option>
                ))}
              </optgroup>
            )
          })}
        </select>

        <div className="top10-header">
          <span className="top10-title-icon">{list.icon}</span>
          <h2>{list.title[lang]}</h2>
          {list.currencyToggle && (
            <div className="top10-currency-toggle">
              <button className={currency === 'usd' ? 'active' : ''} onClick={() => setCurrency('usd')}>$ USD</button>
              <button className={currency === 'eur' ? 'active' : ''} onClick={() => setCurrency('eur')}>€ EUR</button>
            </div>
          )}
        </div>

        <ol className="top10-list">
          {list.entries.map((entry, i) => (
            <li key={i} className={'top10-item' + (i < 3 ? ' top10-podium' : '')}>
              <span className="top10-rank">{i < 3 ? MEDALS[i] : `${i + 1}.`}</span>
              {entry.iso && (
                <img className="top10-flag" src={flagUrl(entry.iso)} alt="" loading="lazy" />
              )}
              <div className="top10-info">
                <span className="top10-name">{entry.name[lang]}</span>
                {entry.extra && <span className="top10-extra">{entry.extra[lang]}</span>}
              </div>
              <span className="top10-value">{displayValue(entry)}</span>
            </li>
          ))}
        </ol>

        <p className="top10-note">
          {lang === 'hr' && '* Podaci prema procjenama s kraja 2025. BDP nominalni (MMF 2025). Tečaj EUR/USD ≈ 0,93. Migracije: UNHCR. Mir: Vision of Humanity GPI. Ostalo: UN, Svjetska banka, Wikipedia.'}
          {lang === 'en' && '* Data based on end-2025 estimates. Nominal GDP (IMF 2025). EUR/USD ≈ 0.93. Refugees: UNHCR. Peace: Vision of Humanity GPI. Other: UN, World Bank, Wikipedia.'}
          {lang === 'de' && '* Daten: Schätzungen Ende 2025. Nominales BIP (IWF 2025). EUR/USD ≈ 0,93. Flüchtlinge: UNHCR. Frieden: Vision of Humanity GPI. Sonstige: UN, Weltbank, Wikipedia.'}
        </p>
      </div>
    </div>
  )
}
