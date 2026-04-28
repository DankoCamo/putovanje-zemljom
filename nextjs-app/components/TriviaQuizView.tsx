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

function buildQuestions(countries: Country[], level: Level, lang: Lang): TriviaQ[] {
  const pool = getPool(countries, level)
  const withFacts = shuffle(pool.filter(c => COUNTRY_FACTS[c.iso]?.length))
  const picked = withFacts.slice(0, TOTAL)
  return picked.map(country => {
    const facts = COUNTRY_FACTS[country.iso]
    const fact = facts[Math.floor(Math.random() * facts.length)][lang]
    const others = shuffle(pool.filter(c => c.iso !== country.iso)).slice(0, 3)
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
