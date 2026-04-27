'use client'
import dynamic from 'next/dynamic'
import { Country } from '@/lib/types'
import type { Era } from '@/context/AppContext'

const GlobeDynamic = dynamic(() => import('./Globe'), { ssr: false })

interface Props {
  countries: Country[]
  onSelectCountry: (c: Country) => void
  onSelectHistorical: (iso: string) => void
  theme: 'light' | 'dark'
  rotationSpeed: number
  showCapitals: boolean
  showBorders: boolean
  focusIso: string | null
  lang: 'hr' | 'en' | 'de'
  era: Era
}

export default function GlobeWrapper(props: Props) {
  return <GlobeDynamic {...props} />
}
