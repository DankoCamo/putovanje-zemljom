'use client'
import { useState } from 'react'
import { Lang } from '@/lib/types'
import { TOP10_LISTS, T10List } from '@/data/top10'
import { flagUrl } from '@/lib/utils'

interface Props {
  lang: Lang
}

const MEDALS = ['🥇', '🥈', '🥉']

export default function Top10View({ lang }: Props) {
  const [activeId, setActiveId] = useState(TOP10_LISTS[0].id)
  const list = TOP10_LISTS.find(l => l.id === activeId) as T10List

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
              <span className="top10-value">{entry.value}</span>
            </li>
          ))}
        </ol>

        <p className="top10-note">
          {lang === 'hr' && '* Podaci prema procjenama s kraja 2025. godine. Izvori: UN, Svjetska banka, Wikipedia.'}
          {lang === 'en' && '* Data based on end-2025 estimates. Sources: UN, World Bank, Wikipedia.'}
          {lang === 'de' && '* Daten basieren auf Schätzungen Ende 2025. Quellen: UN, Weltbank, Wikipedia.'}
        </p>
      </div>
    </div>
  )
}
