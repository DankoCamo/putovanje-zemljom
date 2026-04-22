'use client'
import { useApp } from '@/context/AppContext'
import { I18N } from '@/data/i18n'

export default function TweaksPanel() {
  const { tweakState, setTweakState, setShowTweaks, lang } = useApp()
  const t = I18N[lang]

  function upd<K extends keyof typeof tweakState>(k: K, v: typeof tweakState[K]) {
    setTweakState(s => ({ ...s, [k]: v }))
  }

  const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="tweak-row"><label>{label}</label>{children}</div>
  )

  const SwitchBtn = ({ on, onClick }: { on: boolean; onClick: () => void }) => (
    <button className={'switch' + (on ? ' on' : '')} onClick={onClick} />
  )

  return (
    <div className="tweaks-panel">
      <h3>⚙️ {t.tweaks.title}
        <button onClick={() => setShowTweaks(false)}>×</button>
      </h3>
      <Row label={t.tweaks.language}>
        <select
          value={tweakState.language}
          onChange={e => upd('language', e.target.value as 'hr' | 'en' | 'de')}
          style={{ padding: '4px 8px', border: '1px solid var(--border)', borderRadius: 8, background: 'var(--bg-2)', color: 'var(--ink)' }}
        >
          <option value="hr">HR</option>
          <option value="en">EN</option>
          <option value="de">DE</option>
        </select>
      </Row>
      <Row label={t.tweaks.theme}>
        <SwitchBtn on={tweakState.theme === 'dark'} onClick={() => upd('theme', tweakState.theme === 'dark' ? 'light' : 'dark')} />
      </Row>
      <Row label={t.tweaks.rotation}>
        <input className="slider" type="range" min="0" max="0.006" step="0.0005"
          value={tweakState.rotationSpeed}
          onChange={e => upd('rotationSpeed', parseFloat(e.target.value))} />
      </Row>
      <Row label={t.tweaks.capitalsVisible}>
        <SwitchBtn on={tweakState.showCapitals} onClick={() => upd('showCapitals', !tweakState.showCapitals)} />
      </Row>
      <Row label={t.tweaks.bordersVisible}>
        <SwitchBtn on={tweakState.showBorders} onClick={() => upd('showBorders', !tweakState.showBorders)} />
      </Row>
      <Row label={t.tweaks.continentColors}>
        <SwitchBtn on={tweakState.continentColors} onClick={() => upd('continentColors', !tweakState.continentColors)} />
      </Row>
      <Row label={t.tweaks.fontSize}>
        <input className="slider" type="range" min="14" max="20" step="1"
          value={tweakState.fontSize}
          onChange={e => upd('fontSize', parseInt(e.target.value))} />
      </Row>
    </div>
  )
}
