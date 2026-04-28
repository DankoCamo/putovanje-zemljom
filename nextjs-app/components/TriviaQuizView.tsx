'use client'
import { useState } from 'react'
import { Country, Lang, I18nT } from '@/lib/types'
import { COUNTRY_FACTS } from '@/data/country-facts'
import { shuffle } from '@/lib/utils'

interface Props {
  countries: Country[]
  t: I18nT
  lang: Lang
  onBack?: () => void
}

type Level = 'easy' | 'medium' | 'hard'

interface TriviaQ {
  country: Country
  fact: string
  options: Country[]
}

const TOTAL = 10

function getPool(countries: Country[], level: Level): Country[] {
  if (level === 'easy')
    return countries.filter(c =>
      c.population > 15e6 ||
      c.tags?.includes('largest') ||
      (['Europe', 'NorthAmerica'].includes(c.continent) && c.population > 5e6)
    )
  if (level === 'medium')
    return countries.filter(c => c.continent !== 'Antarctica' && c.population > 500000)
  return countries.filter(c => c.continent !== 'Antarctica')
}

// Extra aliases that the country name/capital check won't catch automatically
// (irregular adjective stems, abbreviations, demonyms with different roots)
const EXTRA_STEMS: Record<string, string[]> = {
  // Irregular adjective/demonym roots that differ from the country name
  GB: ['britanij', 'britans', 'britanac'],
  US: ['američ', 'amerik'],
  RS: ['srpsk', 'srbijanc'],
  BA: ['bosansk', 'bošnjac', 'bošnjak'],
  CH: ['švicarsk', 'švicarac', 'ženev', 'davos', 'züric', 'swiss'],
  AU: ['australsk', 'australac'],
  NZ: ['novozeland'],
  FR: ['francusk', 'francuz'],
  DE: ['nijemac', 'autobahn'],
  IT: ['talijanac', 'talijansk'],
  ES: ['španjolsk', 'španjolac'],
  PT: ['portugals'],
  GR: ['grčk', 'greek', 'griechisch'],
  PL: ['poljsk', 'poljak', 'polish'],
  CZ: ['czech', 'češ'],
  CN: ['kinsk', 'kinez'],
  JP: ['japansk', 'japanac'],
  IN: ['indijsk', 'indijac'],
  BR: ['brazilsk', 'brazilac'],
  AR: ['argentinsk', 'argentinac'],
  MX: ['meksičk', 'meksikanac'],
  ZA: ['južnoafrič'],
  EG: ['egipatsk', 'egipćan'],
  NG: ['nigerijsk', 'nigerijac'],
  KE: ['kenijsk', 'kenijac'],
  ET: ['etiopsk', 'etiopljani'],
  MA: ['marokansk', 'marokanac'],
  TH: ['tajsk', 'tajlanđan'],
  VN: ['vijetnamsk', 'vijetnamac'],
  KR: ['korejsk', 'korejac', 'korean'],
  SA: ['saudijsk', 'saudijac'],
  TR: ['tursk', 'turčin', 'turci', 'turks', 'turkish'],
  IR: ['iransk', 'iranac'],
  RU: ['rusima'],
  BE: ['belgij', 'belgian', 'belgisch'],
  NL: ['dutch', 'niederländ', 'nizozemc'],
  DK: ['danish', 'dänisch'],
  LB: ['lebanes', 'libanes'],
  // ISO/common abbreviations used in facts
  PG: ['png'],
  DO: ['"dr ', '"dr '],
  // Compound adjectives and unique identifiers
  KP: ['sjevernokorejsk', 'pjongjang', 'rungrado', 'juche', 'kim il', 'kim jong'],
  CY: ['cipr'],
  CU: ['karib'],
  RO: ['bucure', 'bukar'],
}

function containsHint(factText: string, country: Country, lang: Lang): boolean {
  const text = factText.toLowerCase()

  const terms = [
    country.name.hr, country.name.en, country.name.de,
    country.capital.hr, country.capital.en, country.capital.de,
  ]

  for (const term of terms) {
    const t = term.toLowerCase()
    if (text.includes(t)) return true
    // Stem-1 (name minus last char): catches most declined forms and adjectives
    // "Malta"→"Malt" catches "malteški/Maltu", "Danska"→"Dansk" catches "danski"
    // Min 3 chars to catch short names: "Kuba"→"Kub" catches "Kubi/Kube/Kubu"
    const s1 = t.slice(0, -1)
    if (s1.length >= 3 && text.includes(s1)) return true
    // Stem-3 (name minus last 3 chars): catches deeper morphological changes
    // "Bjelorusija"→"Bjelorus" catches "bjeloruskog/bjeloruski"
    // "Armenija"→"Armen" catches "armenski/Armenaca"
    const s3 = t.slice(0, -3)
    if (s3.length >= 5 && text.includes(s3)) return true
  }

  // Check known irregular adjective/demonym stems
  const extras = EXTRA_STEMS[country.iso] ?? []
  if (extras.some(e => text.includes(e))) return true

  return false
}

function buildQuestions(countries: Country[], level: Level, lang: Lang): TriviaQ[] {
  const pool = getPool(countries, level)

  // Build flat list of valid (country, fact) pairs — exclude any fact that
  // contains the country name or capital city name (in any language).
  const candidates: { country: Country; fact: string }[] = []
  for (const country of pool) {
    const facts = COUNTRY_FACTS[country.iso]
    if (!facts?.length) continue
    for (const f of facts) {
      if (!containsHint(f[lang], country, lang)) {
        candidates.push({ country, fact: f[lang] })
      }
    }
  }

  // One question per country, shuffled
  const seen = new Set<string>()
  const unique = shuffle(candidates).filter(({ country }) => {
    if (seen.has(country.iso)) return false
    seen.add(country.iso)
    return true
  })

  return unique.slice(0, TOTAL).map(({ country, fact }) => {
    // Wrong options come from the same continent so geographic clues in the
    // fact don't trivially narrow it down to the only African/Caribbean/etc. option.
    const sameContinent = pool.filter(c => c.iso !== country.iso && c.continent === country.continent)
    const distractorPool = sameContinent.length >= 3 ? sameContinent : pool.filter(c => c.iso !== country.iso)
    const others = shuffle(distractorPool).slice(0, 3)
    return { country, fact, options: shuffle([country, ...others]) }
  })
}

export default function TriviaQuizView({ countries, t, lang, onBack }: Props) {
  const [level, setLevel] = useState<Level>('easy')
  const [questions, setQuestions] = useState<TriviaQ[]>([])
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState<Country | null>(null)
  const [feedback, setFeedback] = useState('')
  const [running, setRunning] = useState(false)

  function startQuiz() {
    const qs = buildQuestions(countries, level, lang)
    setQuestions(qs)
    setIdx(0); setScore(0); setAnswered(null); setFeedback(''); setRunning(true)
  }

  function restart() {
    if (onBack) { onBack(); return }
    setRunning(false); setQuestions([]); setIdx(0)
    setScore(0); setAnswered(null); setFeedback('')
  }

  function pickAnswer(opt: Country) {
    if (answered) return
    const correct = opt.iso === questions[idx].country.iso
    setAnswered(opt)
    setFeedback(correct ? t.quiz.correct : t.quiz.wrong)
    if (correct) setScore(s => s + 1)
    setTimeout(() => {
      if (idx + 1 >= TOTAL) {
        setRunning(false)
      } else {
        setAnswered(null); setFeedback(''); setIdx(i => i + 1)
      }
    }, 1100)
  }

  // Start screen
  if (!running && questions.length === 0) {
    return (
      <div className="quiz-view">
        <div className="quiz-wrap quiz-menu">
          <h2>💡 {t.trivia.title}</h2>
          <div className="sub">{t.trivia.subtitle}</div>
          <div className="quiz-level-row">
            {(['easy', 'medium', 'hard'] as Level[]).map(lv => (
              <button key={lv} className={level === lv ? 'active' : ''} onClick={() => setLevel(lv)}>
                {t.quiz.levels[lv]}
              </button>
            ))}
          </div>
          <button className="btn-primary" onClick={startQuiz}>▶ {t.quiz.start}</button>
        </div>
      </div>
    )
  }

  // Final screen
  if (!running && questions.length > 0) {
    const pct = score / TOTAL
    const emoji = pct >= 0.9 ? '🏆' : pct >= 0.7 ? '🌟' : pct >= 0.5 ? '👍' : '💪'
    return (
      <div className="quiz-view">
        <div className="quiz-wrap">
          <div className="quiz-play">
            <div className="quiz-final">
              <div className="quiz-final-emoji">{emoji}</div>
              <div className="quiz-final-label">{t.quiz.finalScore}</div>
              <div className="quiz-final-score">{score}/{TOTAL}</div>
              <button className="btn-primary" style={{ marginTop: 24 }}
                onClick={() => { setQuestions([]); setRunning(false) }}>
                {t.quiz.restart}
              </button>
              <button
                style={{ display: 'block', margin: '16px auto 0', background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: '0.9rem' }}
                onClick={restart}
              >← {t.trivia.title}</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Playing
  const q = questions[idx]
  if (!q) return null
  const progress = (idx / TOTAL) * 100

  return (
    <div className="quiz-view">
      <div className="quiz-wrap">
        <div className="quiz-play">
          <div className="quiz-status">
            <span>{t.quiz.question} {idx + 1} {t.quiz.of} {TOTAL}</span>
            <span className="score">⭐ {score}</span>
          </div>
          <div className="quiz-progress">
            <div className="quiz-progress-fill" style={{ width: progress + '%' }} />
          </div>
          <div className="quiz-question">
            <div className="quiz-prompt">{t.trivia.prompt}</div>
            <div className="trivia-fact">„{q.fact}"</div>
          </div>
          <div className="quiz-options">
            {q.options.map(opt => {
              const isCorrect = opt.iso === q.country.iso
              const isAnswered = answered?.iso === opt.iso
              const cls = answered ? (isCorrect ? 'correct' : isAnswered ? 'wrong' : '') : ''
              return (
                <button key={opt.iso} className={'quiz-option ' + cls}
                  onClick={() => pickAnswer(opt)} disabled={!!answered}>
                  {opt.name[lang]}
                </button>
              )
            })}
          </div>
          <div className={'quiz-feedback ' + (feedback === t.quiz.correct ? 'correct' : feedback === t.quiz.wrong ? 'wrong' : '')}>
            {feedback}
          </div>
        </div>
      </div>
    </div>
  )
}
