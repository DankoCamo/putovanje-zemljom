// Main App component + Tweaks
const { useState: uS, useEffect: uE, useMemo: uM } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "rotationSpeed": 0.0015,
  "showCapitals": true,
  "showBorders": true,
  "continentColors": true,
  "fontSize": 16,
  "language": "hr"
}/*EDITMODE-END*/;

function Tweaks({ state, setState, onClose, t }) {
  function upd(k, v) {
    setState(s => ({ ...s, [k]: v }));
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*'); } catch(e) {}
  }
  const Row = ({ label, children }) => (
    <div className="tweak-row"><label>{label}</label>{children}</div>
  );
  const Switch = ({ on, onClick }) => (
    <button className={"switch" + (on ? " on" : "")} onClick={onClick} />
  );

  return (
    <div className="tweaks-panel">
      <h3>⚙️ {t.tweaks.title}<button onClick={onClose}>×</button></h3>
      <Row label={t.tweaks.language}>
        <select value={state.language} onChange={e => upd('language', e.target.value)}
          style={{padding:'4px 8px', border:'1px solid var(--border)', borderRadius:8, background:'var(--bg-2)', color:'var(--ink)'}}>
          <option value="hr">HR</option><option value="en">EN</option><option value="de">DE</option>
        </select>
      </Row>
      <Row label={t.tweaks.theme}>
        <Switch on={state.theme === 'dark'} onClick={() => upd('theme', state.theme === 'dark' ? 'light' : 'dark')} />
      </Row>
      <Row label={t.tweaks.rotation}>
        <input className="slider" type="range" min="0" max="0.006" step="0.0005"
          value={state.rotationSpeed} onChange={e => upd('rotationSpeed', parseFloat(e.target.value))} />
      </Row>
      <Row label={t.tweaks.capitalsVisible}>
        <Switch on={state.showCapitals} onClick={() => upd('showCapitals', !state.showCapitals)} />
      </Row>
      <Row label={t.tweaks.bordersVisible}>
        <Switch on={state.showBorders} onClick={() => upd('showBorders', !state.showBorders)} />
      </Row>
      <Row label={t.tweaks.continentColors}>
        <Switch on={state.continentColors} onClick={() => upd('continentColors', !state.continentColors)} />
      </Row>
      <Row label={t.tweaks.fontSize}>
        <input className="slider" type="range" min="14" max="20" step="1"
          value={state.fontSize} onChange={e => upd('fontSize', parseInt(e.target.value))} />
      </Row>
    </div>
  );
}

function App() {
  const [view, setView] = uS('globe');
  const [selected, setSelected] = uS(null);
  const [panelOpen, setPanelOpen] = uS(false);
  const [focusIso, setFocusIso] = uS(null);
  const [tweakState, setTweakState] = uS(TWEAK_DEFAULTS);
  const [showTweaks, setShowTweaks] = uS(false);
  const [introSeen, setIntroSeen] = uS(() => localStorage.getItem('intro-seen') === '1');

  const lang = tweakState.language;
  const t = window.I18N[lang] || window.I18N.hr;
  const countries = window.COUNTRIES;

  // Apply theme + font size
  uE(() => {
    document.documentElement.setAttribute('data-theme', tweakState.theme);
    document.documentElement.style.setProperty('--font-base', tweakState.fontSize + 'px');
  }, [tweakState.theme, tweakState.fontSize]);

  // Persist view
  uE(() => {
    const saved = localStorage.getItem('earth-view');
    if (saved) setView(saved);
  }, []);
  uE(() => { localStorage.setItem('earth-view', view); }, [view]);

  // Edit-mode integration
  uE(() => {
    function onMsg(e) {
      if (e.data?.type === '__activate_edit_mode') setShowTweaks(true);
      if (e.data?.type === '__deactivate_edit_mode') setShowTweaks(false);
    }
    window.addEventListener('message', onMsg);
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch(e) {}
    return () => window.removeEventListener('message', onMsg);
  }, []);

  function openCountry(c) {
    setSelected(c);
    setPanelOpen(true);
    setFocusIso(c.iso);
    if (view !== 'globe' && view !== 'atlas') setView('globe');
  }
  function pickIso(iso) {
    const c = countries.find(x => x.iso === iso);
    if (c) openCountry(c);
  }

  function dismissIntro() { setIntroSeen(true); localStorage.setItem('intro-seen', '1'); }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="logo">
          <span className="logo-mark">🌍</span>
          <span>{t.appTitle}</span>
        </div>
        <nav className="nav">
          {['globe','atlas','compare','quiz'].map(v => (
            <button key={v} className={view === v ? 'active' : ''} onClick={() => { setView(v); if (v !== 'globe') setPanelOpen(false); }}>
              {t.nav[v]}
            </button>
          ))}
        </nav>
        <div className="topbar-right">
          <div className="lang-switch">
            {['hr','en','de'].map(l => (
              <button key={l} className={lang === l ? 'active' : ''} onClick={() => setTweakState(s => ({...s, language: l}))}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="icon-btn" title={t.tweaks.theme}
            onClick={() => setTweakState(s => ({...s, theme: s.theme === 'dark' ? 'light' : 'dark'}))}>
            {tweakState.theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button className="icon-btn" title={t.tweaks.title} onClick={() => setShowTweaks(s => !s)}>⚙️</button>
        </div>
      </header>

      <div className="main-area">
        <div className="globe-view" style={{ display: view === 'globe' ? 'flex' : 'none' }}>
            <div className="globe-canvas-wrap">
              <window.Globe
                countries={countries}
                onSelectCountry={openCountry}
                theme={tweakState.theme}
                rotationSpeed={tweakState.rotationSpeed}
                showCapitals={tweakState.showCapitals}
                showBorders={tweakState.showBorders}
                continentColors={tweakState.continentColors}
                selectedIso={selected?.iso}
                focusIso={focusIso}
              />
              {!introSeen && (
                <div className="intro-overlay" onClick={dismissIntro}>
                  <div className="intro-card">
                    <h1>🌍 {t.appTitle}</h1>
                    <p>{t.intro.lineOne}<br/>{t.intro.lineTwo}</p>
                    <button className="btn-primary" onClick={dismissIntro}>{t.intro.cta}</button>
                  </div>
                </div>
              )}
              {introSeen && !panelOpen && (
                <div className="globe-hint">✨ {t.intro.lineOne.toLowerCase()} — {t.intro.lineTwo.toLowerCase()}</div>
              )}
            </div>
            <window.CountryPanel
              country={selected}
              open={panelOpen}
              onClose={() => setPanelOpen(false)}
              onSelectIso={pickIso}
              t={t} lang={lang} countries={countries}
            />
          </div>
        {view === 'atlas' && (
          <window.Atlas countries={countries} t={t} lang={lang} onSelectCountry={(c) => { setSelected(c); setPanelOpen(true); setFocusIso(c.iso); setView('globe'); }} />
        )}
        {view === 'compare' && (
          <window.Compare countries={countries} t={t} lang={lang} />
        )}
        {view === 'quiz' && (
          <window.Quiz countries={countries} t={t} lang={lang} />
        )}
      </div>

      {showTweaks && (
        <Tweaks state={tweakState} setState={setTweakState} onClose={() => setShowTweaks(false)} t={t} />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
