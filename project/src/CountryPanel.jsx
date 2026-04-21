// CountryPanel, Atlas, Compare components
const { useState: useState2, useMemo } = React;

function flagUrl(iso) {
  if (!iso || iso === 'AQ') return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 60 40"><rect width="60" height="40" fill="%23e8e8e8"/><text x="30" y="25" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23999">🏳</text></svg>';
  return `https://flagcdn.com/w160/${iso.toLowerCase()}.png`;
}
function flagUrlSmall(iso) {
  if (!iso) return '';
  return `https://flagcdn.com/w40/${iso.toLowerCase()}.png`;
}
function fmtPop(n) {
  if (n >= 1e9) return (n/1e9).toFixed(2) + ' mlrd';
  if (n >= 1e6) return (n/1e6).toFixed(1) + ' mil';
  if (n >= 1e3) return (n/1e3).toFixed(0) + ' tis';
  return String(n);
}
function fmtArea(n) {
  if (n >= 1e6) return (n/1e6).toFixed(2) + ' mil';
  if (n >= 1e3) return (n/1e3).toFixed(0) + ' tis';
  return String(n);
}

function CountryPanel({ country, open, onClose, onSelectIso, t, lang, countries }) {
  if (!country) return <div className="country-panel" />;
  const neighbors = (country.neighbors || []).map(iso => countries.find(c => c.iso === iso)).filter(Boolean);
  const continentLabel = t.continents[country.continent] || country.continent;
  const contMeta = window.CONTINENTS.find(x => x.id === country.continent);

  // Cities data: capital entry for header pop, top 3 by pop for the list
  const cityData = window.CITIES && window.CITIES[country.iso];
  const capitalCityEntry = cityData && cityData.find(c => c.capital);
  const topCities = cityData ? [...cityData].sort((a, b) => b.pop - a.pop).slice(0, 3) : [];

  const tagLabels = {
    landlocked: t.facts.landlocked,
    doubleLandlocked: t.facts.doubleLandlocked,
    island: t.facts.island,
    archipelago: t.facts.archipelago,
    smallest: t.facts.smallest,
    largest: t.facts.largest
  };
  // Suppress tag chips that obviously duplicate concepts in the fact text
  const factText = (country.fact && country.fact[lang]) ? country.fact[lang].toLowerCase() : '';
  const tagOverlaps = {
    landlocked: /\bbez izlaza? na more|nema izlaz|landlocked|binnenstaat|binnenland|nijedna granica s mor/,
    doubleLandlocked: /dvostruko zaključan|doubly landlocked|doppelt binnenländ/,
    island: /\botoč(na|ni|ka)|island nation|inselstaat|inselnation/,
    archipelago: /arhipelag|archipelago|archipel/,
    smallest: /najmanja država|smallest country|kleinstes land/,
    largest: /najveća država|largest country|größtes land/
  };
  const visibleTags = (country.tags || []).filter(tag => {
    if (!tagLabels[tag]) return false;
    const rx = tagOverlaps[tag];
    if (rx && rx.test(factText)) return false;
    return true;
  });

  return (
    <aside className={"country-panel" + (open ? " open" : "")}>
      <div className="cp-header">
        <img className="cp-flag" src={flagUrl(country.iso)} alt="" onError={(e)=>e.target.style.opacity=0.2}/>
        <div className="cp-title">
          <h2>{country.name[lang]}</h2>
          <div className="cp-continent">{contMeta?.emoji} {continentLabel}</div>
        </div>
        <button className="cp-close" onClick={onClose} aria-label="close">×</button>
      </div>
      <div className="cp-body">
        <div className="cp-grid">
          <div className="cp-tile wide">
            <div className="cp-tile-label">{t.fields.capital}</div>
            <div className="cp-tile-value">
              📍 {country.capital[lang]}
              {capitalCityEntry && (
                <span style={{fontSize:'0.8rem', color:'var(--muted)', marginLeft:8, fontWeight:500}}>
                  {fmtPop(capitalCityEntry.pop)}
                  {capitalCityEntry.metro && capitalCityEntry.metro !== capitalCityEntry.pop && (
                    <span style={{opacity:0.65}}> ({fmtPop(capitalCityEntry.metro)} {t.fields.metro})</span>
                  )}
                </span>
              )}
            </div>
          </div>
          <div className="cp-tile">
            <div className="cp-tile-label">{t.fields.population}</div>
            <div className="cp-tile-value">{fmtPop(country.population)}</div>
          </div>
          <div className="cp-tile">
            <div className="cp-tile-label">{t.fields.area}</div>
            <div className="cp-tile-value">{fmtArea(country.area)} {t.fields.km2}</div>
          </div>
          <div className="cp-tile">
            <div className="cp-tile-label">{t.fields.currency}</div>
            <div className="cp-tile-value" style={{fontSize: country.currency && country.currency.length > 3 ? '0.92rem' : '1rem'}}>
              {country.currency ? (window.formatCurrency ? window.formatCurrency(country.currency, lang) : country.currency) : '—'}
            </div>
          </div>
          <div className="cp-tile">
            <div className="cp-tile-label">{t.fields.languages}</div>
            <div className="cp-tile-value" style={{fontSize: '0.92rem'}}>
              {(country.languages || []).join(', ') || '—'}
            </div>
          </div>
        </div>

        {country.fact && (
          <div className="cp-fact">
            <div className="cp-fact-title">💡 {t.fields.factTitle}</div>
            <div style={{fontSize: '0.95rem', lineHeight: 1.45}}>{country.fact[lang]}</div>
          </div>
        )}

        {visibleTags.length > 0 && (
          <div className="cp-tags">
            {visibleTags.map(tag => (
              <span key={tag} className="cp-tag">
                {tag === 'landlocked' && '🏔️ '}
                {tag === 'doubleLandlocked' && '🔒 '}
                {tag === 'island' && '🏝️ '}
                {tag === 'archipelago' && '🌊 '}
                {tag === 'smallest' && '🔬 '}
                {tagLabels[tag]}
              </span>
            ))}
          </div>
        )}

        {topCities.length > 0 && (
          <div className="cp-cities">
            <div className="cp-cities-title">🏙️ {t.fields.topCities}</div>
            <div className="cp-cities-list">
              {topCities.map((c, i) => (
                <div key={i} className={"cp-city" + (c.capital ? " is-capital" : "")}>
                  <div className="cp-city-rank">{c.capital ? '★' : i + 1}</div>
                  <div className="cp-city-info">
                    <div className="cp-city-name">{c.name[lang]}</div>
                    <div className="cp-city-pop">
                      <span>{fmtPop(c.pop)} <span style={{opacity:0.55}}>· {t.fields.cityOnly}</span></span>
                      {c.metro && c.metro !== c.pop && (
                        <span style={{opacity:0.7}}> · {fmtPop(c.metro)} {t.fields.metro}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="cp-neighbors">
          <div className="cp-neighbors-title">🤝 {t.fields.neighbors}</div>
          {neighbors.length === 0 ? (
            <div style={{color:'var(--muted)', fontSize:'0.9rem'}}>{t.fields.noNeighbors}</div>
          ) : (
            <div className="cp-neighbor-list">
              {neighbors.map(n => (
                <button key={n.iso} className="cp-neighbor" onClick={() => onSelectIso(n.iso)}>
                  <img src={flagUrlSmall(n.iso)} alt="" />
                  <span>{n.name[lang]}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

function Atlas({ countries, t, lang, onSelectCountry }) {
  const [q, setQ] = useState2('');
  const [cont, setCont] = useState2('all');

  const filtered = useMemo(() => {
    const qn = q.trim().toLowerCase();
    return countries.filter(c => {
      if (cont !== 'all' && c.continent !== cont) return false;
      if (qn) {
        const names = [c.name.hr, c.name.en, c.name.de, c.capital.hr, c.capital.en, c.capital.de].join(' ').toLowerCase();
        if (!names.includes(qn)) return false;
      }
      return true;
    }).sort((a, b) => a.name[lang].localeCompare(b.name[lang]));
  }, [q, cont, countries, lang]);

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
        <button className={"chip" + (cont === 'all' ? ' active' : '')} onClick={() => setCont('all')}>
          🌍 {t.allContinents}
        </button>
        {window.CONTINENTS.map(c => (
          <button key={c.id} className={"chip" + (cont === c.id ? ' active' : '')} onClick={() => setCont(c.id)}>
            {c.emoji} {t.continents[c.id]}
          </button>
        ))}
      </div>
      <div className="country-grid">
        {filtered.map(c => (
          <button key={c.iso} className="country-card" onClick={() => onSelectCountry(c)}>
            <img src={flagUrl(c.iso)} alt="" loading="lazy" />
            <div className="country-card-name">{c.name[lang]}</div>
            <div className="country-card-capital">{c.capital[lang]}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Compare({ countries, t, lang }) {
  const [a, setA] = useState2(null);
  const [b, setB] = useState2(null);

  const sorted = useMemo(() => [...countries].sort((x, y) => x.name[lang].localeCompare(y.name[lang])), [countries, lang]);

  function Stat({ label, valA, valB, compare, suffix }) {
    let winA = null, winB = null;
    if (typeof valA === 'number' && typeof valB === 'number') {
      if (valA > valB) winA = true; else if (valB > valA) winB = true;
    }
    return (
      <>
        <div className={"compare-stat" + (winA ? " winner" : "")}>
          <span className="label">{label}</span>
          <span className="val">{typeof valA === 'number' ? (compare ? compare(valA) : valA) + (suffix||'') : valA}</span>
        </div>
      </>
    );
  }

  function renderSide(country, onChange, otherCountry) {
    if (!country) {
      return (
        <div className="compare-slot">
          <select className="compare-picker" defaultValue="" onChange={e => onChange(countries.find(c => c.iso === e.target.value))}>
            <option value="" disabled>— {t.compare.pickA} —</option>
            {sorted.map(c => <option key={c.iso} value={c.iso}>{c.name[lang]}</option>)}
          </select>
        </div>
      );
    }
    const isBigger = otherCountry ? {
      pop: country.population > otherCountry.population,
      area: country.area > otherCountry.area
    } : {};
    return (
      <div className="compare-slot filled">
        <select className="compare-picker" value={country.iso} onChange={e => onChange(countries.find(c => c.iso === e.target.value))}>
          {sorted.map(c => <option key={c.iso} value={c.iso}>{c.name[lang]}</option>)}
        </select>
        <div className="compare-card">
          <img className="flag" src={flagUrl(country.iso)} alt="" />
          <h3>{country.name[lang]}</h3>
          <div className={"compare-stat" + (isBigger.pop ? " winner" : "")}>
            <span className="label">{t.fields.capital}</span>
            <span className="val">{country.capital[lang]}</span>
          </div>
          <div className={"compare-stat" + (isBigger.pop ? " winner" : "")}>
            <span className="label">{t.fields.population}</span>
            <span className="val">{fmtPop(country.population)}</span>
          </div>
          <div className={"compare-stat" + (isBigger.area ? " winner" : "")}>
            <span className="label">{t.fields.area}</span>
            <span className="val">{fmtArea(country.area)} {t.fields.km2}</span>
          </div>
          <div className="compare-stat">
            <span className="label">{t.fields.continent}</span>
            <span className="val">{t.continents[country.continent]}</span>
          </div>
          <div className="compare-stat">
            <span className="label">{t.fields.currency}</span>
            <span className="val">{country.currency ? (window.formatCurrency ? window.formatCurrency(country.currency, lang) : country.currency) : '—'}</span>
          </div>
          <div className="compare-stat">
            <span className="label">{t.fields.languages}</span>
            <span className="val" style={{fontSize:'0.88rem', textAlign:'right'}}>{(country.languages||[]).slice(0,2).join(', ')}</span>
          </div>
          <div className="compare-stat">
            <span className="label">{t.fields.neighbors}</span>
            <span className="val">{(country.neighbors || []).length}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="compare-view">
      <h2 className="compare-title">⚖️ {t.compare.title}</h2>
      <div className="compare-grid">
        {renderSide(a, setA, b)}
        {renderSide(b, setB, a)}
      </div>
    </div>
  );
}

Object.assign(window, { CountryPanel, Atlas, Compare, flagUrl, flagUrlSmall, fmtPop, fmtArea });
