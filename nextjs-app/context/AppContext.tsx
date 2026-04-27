'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Country, TweakState, Lang } from '@/lib/types'

type View = 'globe' | 'atlas' | 'compare' | 'quiz' | 'top10'

export type Era = 'current' | '1960'

interface AppContextValue {
  view: View
  setView: (v: View) => void
  selected: Country | null
  panelOpen: boolean
  focusIso: string | null
  openCountry: (c: Country) => void
  closePanel: () => void
  pickIso: (iso: string) => void
  tweakState: TweakState
  setTweakState: React.Dispatch<React.SetStateAction<TweakState>>
  showTweaks: boolean
  setShowTweaks: (v: boolean) => void
  introSeen: boolean
  dismissIntro: () => void
  lang: Lang
  era: Era
  setEra: (e: Era) => void
}

const DEFAULTS: TweakState = {
  theme: 'light',
  rotationSpeed: 0.0015,
  showCapitals: true,
  showBorders: true,
  continentColors: true,
  fontSize: 16,
  language: 'hr',
}

const AppContext = createContext<AppContextValue>(null!)

export function AppProvider({ children, countries }: { children: ReactNode; countries: Country[] }) {
  const [view, setViewState] = useState<View>('globe')
  const [selected, setSelected] = useState<Country | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const [focusIso, setFocusIso] = useState<string | null>(null)
  const [tweakState, setTweakState] = useState<TweakState>(DEFAULTS)
  const [showTweaks, setShowTweaks] = useState(false)
  const [introSeen, setIntroSeen] = useState(false)
  const [era, setEra] = useState<Era>('current')

  const lang = tweakState.language

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('earth-view') as View | null
      if (saved) setViewState(saved)
      setIntroSeen(localStorage.getItem('intro-seen') === '1')
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('earth-view', view)
    }
  }, [view])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tweakState.theme)
    document.documentElement.style.setProperty('--font-base', tweakState.fontSize + 'px')
  }, [tweakState.theme, tweakState.fontSize])

  function setView(v: View) {
    setViewState(v)
    if (v !== 'globe') setPanelOpen(false)
  }

  function openCountry(c: Country) {
    setSelected(c)
    setPanelOpen(true)
    setFocusIso(c.iso)
    if (view !== 'globe' && view !== 'atlas') setViewState('globe')
  }

  function closePanel() { setPanelOpen(false) }

  function pickIso(iso: string) {
    const c = countries.find(x => x.iso === iso)
    if (c) openCountry(c)
  }

  function dismissIntro() {
    setIntroSeen(true)
    localStorage.setItem('intro-seen', '1')
  }

  return (
    <AppContext.Provider value={{
      view, setView,
      selected, panelOpen, focusIso,
      openCountry, closePanel, pickIso,
      tweakState, setTweakState,
      showTweaks, setShowTweaks,
      introSeen, dismissIntro,
      lang,
      era, setEra,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() { return useContext(AppContext) }
