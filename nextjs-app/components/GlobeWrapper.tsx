'use client'
import dynamic from 'next/dynamic'
import { Country } from '@/lib/types'

const GlobeDynamic = dynamic(() => import('./Globe'), { ssr: false })

interface Props {
  countries: Country[]
  onSelectCountry: (c: Country) => void
  theme: 'light' | 'dark'
  rotationSpeed: number
  showCapitals: boolean
  showBorders: boolean
  focusIso: string | null
  lang: 'hr' | 'en' | 'de'
}

export default function GlobeWrapper(props: Props) {
  return <GlobeDynamic {...props} />
}
