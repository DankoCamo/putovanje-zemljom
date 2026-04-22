'use client'
import { useState, useEffect, useRef } from 'react'
import { Country, Lang, I18nT } from '@/lib/types'
import { CONTINENTS } from '@/data/continents'
import { flagUrl, shuffle } from '@/lib/utils'
import CountryShape from './CountryShape'

interface Props {
  countries: Country[]
  t: I18nT
  lang: Lang
}

type QuizMode = 'capital' | 'flag' | 'shape' | 'continent' | 'timed'
type Level = 'easy' | 'medium' | 'hard'

interface Question {
  target: Country
  type: QuizMode
  options: Country[] | string[]
}

const TOTAL = 10

function sampleByLevel(countries: Country[], level: Level): Country[] {
  if (level === 'easy') {
    return countries.filter(c =>
      c.population > 15e6 ||
      c.tags?.includes('largest') ||
      (['Europe', 'NorthAmerica'].includes(c.continent) && c.population > 5e6)
    )
  }
  if (level === 'medium') {
    return countries.filter(c => c.continent !== 'Antarctica' && c.population > 500000)
  }
  return countries.filter(c => c.continent !== 'Antarctica')
}

export default function QuizView({ countries, t, lang }: Props) {
  const [mode, setMode] = useState<QuizMode | null>(null)
  const [level, setLevel] = useState<Level>('easy')
  const [questions, setQuestions] = useState<Question[]>([])
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState<Country | string | null>(null)
  const [feedback, setFeedback] = useState('')
  const [timeLeft, setTimeLeft] = useState(60)
  const [running, setRunning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function startQuiz() {
    if (!mode) return
    let pool = sampleByLevel(countries, level)
    if (mode === 'shape') {
      pool = pool.filter(c => window.COUNTRY_GEO?.[c.iso])
    }
    let qs: Country[]
    if (mode === 'timed') {
      qs = shuffle(pool)
      setTimeLeft(60)
    } else {
      qs = shuffle(pool).slice(0, TOTAL)
    }
    const built: Question[] = qs.map(target => {
      if (mode === 'continent') {
        const wrongCont = CONTINENTS
          .filter(x => x.id !== target.continent && x.id !== 'Antarctica')
          .slice(0, 3)
          .map(x => x.id)
        return { target, type: mode, options: shuffle([target.continent, ...wrongCont]) }
      }
      const otherPool = shuffle(pool.filter(c => c.iso !== target.iso))
      return { target, type: mode, options: shuffle([target, ...otherPool.slice(0, 3)]) }
    })
    setQuestions(built)
    setIdx(0); setScore(0); setAnswered(null); setFeedback(''); setRunning(true)
  }

  useEffect(() => {
    if (running && mode === 'timed') {
      timerRef.current = setInterval(() => {
        setTimeLeft(tl => {
          if (tl <= 1) {
            clearInterval(timerRef.current!)
            setRunning(false)
            return 0
          }
          return tl - 1
        })
      }, 1000)
      return () => clearInterval(timerRef.current!)
    }
  }, [running, mode])

  function pickAnswer(opt: Country | string) {
    if (answered !== null) return
    const q = questions[idx]
    const correct = q.type === 'continent'
      ? opt === q.target.continent
      : (opt as Country).iso === q.target.iso

    setAnswered(opt)
    setFeedback(correct ? t.quiz.correct : t.quiz.wrong)
    if (correct) setScore(s => s + 1)

    const delay = mode === 'timed' ? (correct ? 400 : 700) : 1100
    setTimeout(() => {
      if (mode === 'timed') {
        setAnswered(null); setFeedback(''); setIdx(i => i + 1)
      } else if (idx + 1 >= TOTAL) {
        setRunning(false)
      } else {
        setAnswered(null); setFeedback(''); setIdx(i => i + 1)
      }
    }, delay)
  }

  function restart() {
    setMode(null); setRunning(false); setQuestions([]); setIdx(0)
    setScore(0); setAnswered(null); setTimeLeft(60)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  // Menu — pick mode
  if (!mode) {
    const modes: { id: QuizMode; emoji: string }[] = [
      { id: 'capital', emoji: '📍' },
      { id: 'flag', emoji: '🏳️' },
      { id: 'shape', emoji: '🗺️' },
      { id: 'continent', emoji: '🌎' },
      { id: 'timed', emoji: '⏱️' },
    ]
    return (
      <div className="quiz-view">
        <div className="quiz-wrap quiz-menu">
          <h2>🎮 {t.quiz.title}</h2>
          <div className="sub">{t.quiz.subtitle}</div>
          <div className="quiz-mode-grid">
            {modes.map(m => (
              <button key={m.id} className="quiz-mode-card" onClick={() => setMode(m.id)}>
                <div className="quiz-mode-emoji">{m.emoji}</div>
                <div className="quiz-mode-name">{t.quiz.modes[m.id]}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Level + start screen
  if (!running && questions.length === 0) {
    return (
      <div className="quiz-view">
        <div className="quiz-wrap quiz-menu">
          <h2>{t.quiz.modes[mode]}</h2>
          <div className="quiz-level-row">
            {(['easy', 'medium', 'hard'] as Level[]).map(lv => (
              <button key={lv} className={level === lv ? 'active' : ''} onClick={() => setLevel(lv)}>
                {t.quiz.levels[lv]}
              </button>
            ))}
          </div>
          <button className="btn-primary" onClick={startQuiz}>▶ {t.quiz.start}</button>
          <button
            style={{ display: 'block', margin: '16px auto', background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: '0.9rem' }}
            onClick={restart}
          >← {t.quiz.title}</button>
        </div>
      </div>
    )
  }

  // Final screen
  if (!running && questions.length > 0) {
    const total = mode === 'timed' ? idx : TOTAL
    const pct = total > 0 ? score / total : 0
    const emoji = pct >= 0.9 ? '🏆' : pct >= 0.7 ? '🌟' : pct >= 0.5 ? '👍' : '💪'
    return (
      <div className="quiz-view">
        <div className="quiz-wrap">
          <div className="quiz-play">
            <div className="quiz-final">
              <div className="quiz-final-emoji">{emoji}</div>
              <div className="quiz-final-label">{t.quiz.finalScore}</div>
              <div className="quiz-final-score">{score}{mode !== 'timed' && `/${TOTAL}`}</div>
              <button className="btn-primary" style={{ marginTop: 24 }}
                onClick={() => { setQuestions([]); setRunning(false) }}>
                {t.quiz.restart}
              </button>
              <button
                style={{ display: 'block', margin: '16px auto 0', background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: '0.9rem' }}
                onClick={restart}
              >← {t.quiz.title}</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Playing
  const q = questions[idx]
  if (!q) return <div className="quiz-view"><div className="quiz-wrap"><div className="quiz-play">…</div></div></div>
  const target = q.target
  const progress = mode === 'timed'
    ? ((60 - timeLeft) / 60) * 100
    : (idx / TOTAL) * 100

  return (
    <div className="quiz-view">
      <div className="quiz-wrap">
        <div className="quiz-play">
          <div className="quiz-status">
            <span>
              {mode === 'timed'
                ? <span className="quiz-timer">⏱️ {timeLeft}{t.quiz.seconds}</span>
                : <>{t.quiz.question} {idx + 1} {t.quiz.of} {TOTAL}</>
              }
            </span>
            <span className="score">⭐ {score}</span>
          </div>
          <div className="quiz-progress">
            <div className="quiz-progress-fill" style={{ width: progress + '%' }} />
          </div>

          <div className="quiz-question">
            {q.type === 'capital' && (
              <><div className="quiz-prompt">{t.quiz.capitalPrompt}</div>
                <div className="quiz-target">{target.name[lang]}?</div></>
            )}
            {q.type === 'flag' && (
              <><div className="quiz-prompt">{t.quiz.flagPrompt}</div>
                <img className="quiz-flag-big" src={flagUrl(target.iso)} alt="?" /></>
            )}
            {q.type === 'shape' && (
              <><div className="quiz-prompt">{t.quiz.shapePrompt}</div>
                <CountryShape country={target} /></>
            )}
            {q.type === 'continent' && (
              <><div className="quiz-prompt">{t.quiz.continentPrompt}</div>
                <div className="quiz-target">{target.name[lang]}?</div></>
            )}
            {q.type === 'timed' && (
              <><div className="quiz-prompt">{t.quiz.capitalPrompt}</div>
                <div className="quiz-target">{target.name[lang]}?</div></>
            )}
          </div>

          <div className="quiz-options">
            {(q.type === 'capital' || q.type === 'timed') && (q.options as Country[]).map(opt => {
              const isCorrect = opt.iso === target.iso
              const isAnswered = answered && (answered as Country).iso === opt.iso
              const cls = answered ? (isCorrect ? 'correct' : (isAnswered ? 'wrong' : '')) : ''
              return (
                <button key={opt.iso} className={'quiz-option ' + cls}
                  onClick={() => pickAnswer(opt)} disabled={!!answered}>
                  {opt.capital[lang]}
                </button>
              )
            })}
            {(q.type === 'flag' || q.type === 'shape') && (q.options as Country[]).map(opt => {
              const isCorrect = opt.iso === target.iso
              const isAnswered = answered && (answered as Country).iso === opt.iso
              const cls = answered ? (isCorrect ? 'correct' : (isAnswered ? 'wrong' : '')) : ''
              return (
                <button key={opt.iso} className={'quiz-option ' + cls}
                  onClick={() => pickAnswer(opt)} disabled={!!answered}>
                  {opt.name[lang]}
                </button>
              )
            })}
            {q.type === 'continent' && (q.options as string[]).map(opt => {
              const isCorrect = opt === target.continent
              const isAnswered = answered === opt
              const cls = answered ? (isCorrect ? 'correct' : (isAnswered ? 'wrong' : '')) : ''
              const meta = CONTINENTS.find(c => c.id === opt)
              return (
                <button key={opt} className={'quiz-option ' + cls}
                  onClick={() => pickAnswer(opt)} disabled={!!answered}>
                  {meta?.emoji} {t.continents[opt]}
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
