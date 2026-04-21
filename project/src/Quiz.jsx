// Quiz component — 5 modes: capital, flag, shape, continent, timed
const { useState: useState3, useEffect: useEffect3, useRef: useRef3 } = React;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sampleByLevel(countries, level) {
  // Easy: large/well-known; Medium: all major; Hard: all
  if (level === 'easy') {
    return countries.filter(c => c.population > 15e6 || c.tags?.includes('largest') || ['Europe','NorthAmerica'].includes(c.continent) && c.population > 5e6);
  }
  if (level === 'medium') {
    return countries.filter(c => c.continent !== 'Antarctica' && c.population > 500000);
  }
  return countries.filter(c => c.continent !== 'Antarctica');
}

// Real country shape silhouette drawn from loaded GeoJSON
function CountryShape({ country }) {
  const geom = window.COUNTRY_GEO && window.COUNTRY_GEO[country.iso];
  const contMeta = window.CONTINENTS.find(c => c.id === country.continent);
  const fill = contMeta?.colorLight || '#888';
  const stroke = '#1a1f36';

  if (!geom) {
    // Fallback while geo data still loading
    return (
      <svg className="quiz-shape-svg" viewBox="0 0 280 200">
        <rect x="90" y="70" width="100" height="60" rx="10" fill="#ddd" stroke={stroke} strokeWidth="2"/>
        <text x="140" y="108" textAnchor="middle" fontSize="12" fill="#666">...</text>
      </svg>
    );
  }

  // Collect rings as [ [ [lng,lat],... ], ... ]
  const rings = [];
  if (geom.type === 'Polygon') geom.coordinates.forEach(r => rings.push(r));
  else if (geom.type === 'MultiPolygon') geom.coordinates.forEach(poly => poly.forEach(r => rings.push(r)));
  if (!rings.length) return null;

  // Compute bbox in lng/lat
  let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;
  rings.forEach(r => r.forEach(([lng, lat]) => {
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }));

  // Handle countries crossing the antimeridian (e.g. RU, US-AK, FJ, NZ) — if lng span > 180, shift negatives by 360
  if (maxLng - minLng > 180) {
    minLng = Infinity; maxLng = -Infinity;
    rings.forEach(r => r.forEach(pt => {
      if (pt[0] < 0) pt[0] += 360;
      if (pt[0] < minLng) minLng = pt[0];
      if (pt[0] > maxLng) maxLng = pt[0];
    }));
  }

  const W = 280, H = 200, pad = 14;
  const latCenter = (minLat + maxLat) / 2;
  const kx = Math.cos(latCenter * Math.PI / 180); // equirectangular aspect correction
  const geoW = (maxLng - minLng) * kx;
  const geoH = (maxLat - minLat);
  const scale = Math.min((W - pad * 2) / geoW, (H - pad * 2) / geoH);
  const offsetX = (W - geoW * scale) / 2;
  const offsetY = (H - geoH * scale) / 2;

  const project = ([lng, lat]) => {
    const x = (lng - minLng) * kx * scale + offsetX;
    const y = (maxLat - lat) * scale + offsetY;
    return [x, y];
  };

  const paths = rings.map(ring => {
    if (ring.length < 3) return '';
    return ring.map((pt, i) => {
      const [x, y] = project(pt);
      return (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
    }).join('') + 'Z';
  }).join(' ');

  return (
    <svg className="quiz-shape-svg" viewBox={`0 0 ${W} ${H}`}>
      <path d={paths} fill={fill} stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" fillRule="evenodd" />
    </svg>
  );
}

function Quiz({ countries, t, lang }) {
  const [mode, setMode] = useState3(null);
  const [level, setLevel] = useState3('easy');
  const [questions, setQuestions] = useState3([]);
  const [idx, setIdx] = useState3(0);
  const [score, setScore] = useState3(0);
  const [answered, setAnswered] = useState3(null);
  const [feedback, setFeedback] = useState3('');
  const [timeLeft, setTimeLeft] = useState3(60);
  const [running, setRunning] = useState3(false);
  const timerRef = useRef3(null);

  const TOTAL = 10;

  function startQuiz() {
    let pool = sampleByLevel(countries, level);
    // For shape mode, only use countries that have geo shape data loaded
    if (mode === 'shape') {
      pool = pool.filter(c => window.COUNTRY_GEO && window.COUNTRY_GEO[c.iso]);
    }
    let qs;
    if (mode === 'timed') {
      qs = shuffle(pool); // unlimited
      setTimeLeft(60);
    } else {
      qs = shuffle(pool).slice(0, TOTAL);
    }
    // Build question data
    const built = qs.map(target => {
      let options = [target];
      const otherPool = shuffle(pool.filter(c => c.iso !== target.iso));
      if (mode === 'continent') {
        const wrongCont = window.CONTINENTS.filter(x => x.id !== target.continent && x.id !== 'Antarctica').slice(0,3);
        return { target, type: mode, options: shuffle([target.continent, ...wrongCont.map(w=>w.id)]) };
      }
      // For capital/flag/shape: 4 country options
      options = shuffle([target, ...otherPool.slice(0,3)]);
      return { target, type: mode, options };
    });
    setQuestions(built);
    setIdx(0);
    setScore(0);
    setAnswered(null);
    setFeedback('');
    setRunning(true);
  }

  // Timer for timed mode
  useEffect3(() => {
    if (running && mode === 'timed') {
      timerRef.current = setInterval(() => {
        setTimeLeft(tl => {
          if (tl <= 1) {
            clearInterval(timerRef.current);
            setRunning(false);
            return 0;
          }
          return tl - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [running, mode]);

  function pickAnswer(opt) {
    if (answered !== null) return;
    const q = questions[idx];
    let correct = false;
    if (q.type === 'continent') correct = opt === q.target.continent;
    else correct = opt.iso === q.target.iso;

    setAnswered(opt);
    if (correct) {
      setScore(s => s + 1);
      setFeedback(t.quiz.correct);
    } else {
      setFeedback(t.quiz.wrong);
    }

    if (mode === 'timed') {
      // advance quickly
      setTimeout(() => {
        setAnswered(null);
        setFeedback('');
        setIdx(i => i + 1);
      }, correct ? 400 : 700);
    } else {
      setTimeout(() => {
        if (idx + 1 >= TOTAL) {
          setRunning(false);
        } else {
          setAnswered(null);
          setFeedback('');
          setIdx(i => i + 1);
        }
      }, 1100);
    }
  }

  function restart() {
    setMode(null);
    setRunning(false);
    setQuestions([]);
    setIdx(0);
    setScore(0);
    setAnswered(null);
    setTimeLeft(60);
    if (timerRef.current) clearInterval(timerRef.current);
  }

  // Menu
  if (!mode) {
    const modes = [
      { id: 'capital', emoji: '📍' },
      { id: 'flag', emoji: '🏳️' },
      { id: 'shape', emoji: '🗺️' },
      { id: 'continent', emoji: '🌎' },
      { id: 'timed', emoji: '⏱️' }
    ];
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
    );
  }

  // Level & start
  if (!running && questions.length === 0) {
    return (
      <div className="quiz-view">
        <div className="quiz-wrap quiz-menu">
          <h2>{t.quiz.modes[mode]}</h2>
          <div className="quiz-level-row">
            {['easy','medium','hard'].map(lv => (
              <button key={lv} className={level === lv ? 'active' : ''} onClick={() => setLevel(lv)}>
                {t.quiz.levels[lv]}
              </button>
            ))}
          </div>
          <button className="btn-primary" onClick={startQuiz}>▶ {t.quiz.start}</button>
          <button style={{display:'block', margin:'16px auto', background:'transparent', border:'none', color:'var(--muted)', fontSize:'0.9rem'}} onClick={restart}>← {t.quiz.title}</button>
        </div>
      </div>
    );
  }

  // Final screen
  if (!running && questions.length > 0) {
    const total = mode === 'timed' ? idx : TOTAL;
    const pct = total > 0 ? score / total : 0;
    const emoji = pct >= 0.9 ? '🏆' : pct >= 0.7 ? '🌟' : pct >= 0.5 ? '👍' : '💪';
    return (
      <div className="quiz-view">
        <div className="quiz-wrap">
          <div className="quiz-play">
            <div className="quiz-final">
              <div className="quiz-final-emoji">{emoji}</div>
              <div className="quiz-final-label">{t.quiz.finalScore}</div>
              <div className="quiz-final-score">{score}{mode !== 'timed' && `/${TOTAL}`}</div>
              <button className="btn-primary" style={{marginTop: 24}} onClick={() => { setQuestions([]); setRunning(false); }}>
                {t.quiz.restart}
              </button>
              <button style={{display:'block', margin:'16px auto 0', background:'transparent', border:'none', color:'var(--muted)', fontSize:'0.9rem'}} onClick={restart}>
                ← {t.quiz.title}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Playing
  const q = questions[idx];
  if (!q) return <div className="quiz-view"><div className="quiz-wrap"><div className="quiz-play">…</div></div></div>;
  const target = q.target;
  const progress = mode === 'timed'
    ? ((60 - timeLeft) / 60) * 100
    : ((idx) / TOTAL) * 100;

  return (
    <div className="quiz-view">
      <div className="quiz-wrap">
        <div className="quiz-play">
          <div className="quiz-status">
            <span>
              {mode === 'timed' ? (
                <span className="quiz-timer">⏱️ {timeLeft}{t.quiz.seconds}</span>
              ) : (
                <>{t.quiz.question} {idx + 1} {t.quiz.of} {TOTAL}</>
              )}
            </span>
            <span className="score">⭐ {score}</span>
          </div>
          <div className="quiz-progress"><div className="quiz-progress-fill" style={{width: progress + '%'}}/></div>

          <div className="quiz-question">
            {q.type === 'capital' && (
              <>
                <div className="quiz-prompt">{t.quiz.capitalPrompt}</div>
                <div className="quiz-target">{target.name[lang]}?</div>
              </>
            )}
            {q.type === 'flag' && (
              <>
                <div className="quiz-prompt">{t.quiz.flagPrompt}</div>
                <img className="quiz-flag-big" src={flagUrl(target.iso)} alt="?" />
              </>
            )}
            {q.type === 'shape' && (
              <>
                <div className="quiz-prompt">{t.quiz.shapePrompt}</div>
                <CountryShape country={target} />
              </>
            )}
            {q.type === 'continent' && (
              <>
                <div className="quiz-prompt">{t.quiz.continentPrompt}</div>
                <div className="quiz-target">{target.name[lang]}?</div>
              </>
            )}
          </div>

          <div className="quiz-options">
            {q.type === 'capital' && q.options.map(opt => {
              const isCorrect = opt.iso === target.iso;
              const isAnswered = answered && answered.iso === opt.iso;
              const cls = answered ? (isCorrect ? 'correct' : (isAnswered ? 'wrong' : '')) : '';
              return <button key={opt.iso} className={"quiz-option " + cls} onClick={() => pickAnswer(opt)} disabled={!!answered}>
                {opt.capital[lang]}
              </button>;
            })}
            {(q.type === 'flag' || q.type === 'shape') && q.options.map(opt => {
              const isCorrect = opt.iso === target.iso;
              const isAnswered = answered && answered.iso === opt.iso;
              const cls = answered ? (isCorrect ? 'correct' : (isAnswered ? 'wrong' : '')) : '';
              return <button key={opt.iso} className={"quiz-option " + cls} onClick={() => pickAnswer(opt)} disabled={!!answered}>
                {opt.name[lang]}
              </button>;
            })}
            {q.type === 'continent' && q.options.map(opt => {
              const isCorrect = opt === target.continent;
              const isAnswered = answered === opt;
              const cls = answered ? (isCorrect ? 'correct' : (isAnswered ? 'wrong' : '')) : '';
              const meta = window.CONTINENTS.find(c => c.id === opt);
              return <button key={opt} className={"quiz-option " + cls} onClick={() => pickAnswer(opt)} disabled={!!answered}>
                {meta?.emoji} {t.continents[opt]}
              </button>;
            })}
          </div>
          <div className={"quiz-feedback " + (feedback === t.quiz.correct ? 'correct' : feedback === t.quiz.wrong ? 'wrong' : '')}>
            {feedback}
          </div>
        </div>
      </div>
    </div>
  );
}

window.Quiz = Quiz;
