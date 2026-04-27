export type Lang = 'hr' | 'en' | 'de'

export type MultiLang = { hr: string; en: string; de: string }

export interface Country {
  iso: string
  name: MultiLang
  capital: MultiLang
  population: number
  area: number
  languages: string[]
  currency: string
  continent: ContinentId
  lat: number
  lng: number
  capitalLat?: number
  capitalLng?: number
  neighbors: string[]
  tags: string[]
  fact: MultiLang
  dissolved?: MultiLang
}

export type ContinentId =
  | 'Europe'
  | 'Asia'
  | 'Africa'
  | 'NorthAmerica'
  | 'SouthAmerica'
  | 'Oceania'
  | 'Antarctica'

export interface ContinentMeta {
  id: ContinentId
  colorLight: string
  colorDark: string
  emoji: string
}

export interface City {
  name: MultiLang
  pop: number
  metro?: number
  capital?: boolean
}

export type CitiesMap = Record<string, City[]>

export type CapsMap = Record<string, [number, number]>

export type CurrencyNames = Record<Lang, Record<string, string>>

export interface TweakState {
  theme: 'light' | 'dark'
  rotationSpeed: number
  showCapitals: boolean
  showBorders: boolean
  continentColors: boolean
  fontSize: number
  language: Lang
}

export interface I18nQuiz {
  title: string
  subtitle: string
  modes: Record<string, string>
  levels: Record<string, string>
  start: string
  next: string
  restart: string
  correct: string
  wrong: string
  score: string
  time: string
  finalScore: string
  question: string
  of: string
  seconds: string
  capitalPrompt: string
  flagPrompt: string
  shapePrompt: string
  continentPrompt: string
  timedPrompt: string
}

export interface I18nT {
  appTitle: string
  appSubtitle: string
  nav: Record<string, string>
  search: string
  allContinents: string
  continents: Record<string, string>
  fields: Record<string, string>
  compare: Record<string, string>
  quiz: I18nQuiz
  tweaks: Record<string, string>
  intro: Record<string, string>
  facts: Record<string, string>
}

export type I18nMap = Record<Lang, I18nT>
