import { CurrencyNames, Lang } from './types'
import { CUR_NAMES } from '@/data/currencies'

export function flagUrl(iso: string): string {
  if (!iso || iso === 'AQ')
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 60 40"><rect width="60" height="40" fill="%23e8e8e8"/><text x="30" y="25" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23999">🏳</text></svg>`
  return `https://flagcdn.com/w160/${iso.toLowerCase()}.png`
}

export function flagUrlSmall(iso: string): string {
  if (!iso) return ''
  return `https://flagcdn.com/w40/${iso.toLowerCase()}.png`
}

export function fmtPop(n: number): string {
  if (n >= 1e9) return (n / 1e9).toFixed(2) + ' mlrd'
  if (n >= 1e6) return (n / 1e6).toFixed(1) + ' mil'
  if (n >= 1e3) return (n / 1e3).toFixed(0) + ' tis'
  return String(n)
}

export function fmtArea(n: number): string {
  if (n >= 1e6) return (n / 1e6).toFixed(2) + ' mil'
  if (n >= 1e3) return (n / 1e3).toFixed(0) + ' tis'
  return String(n)
}

export function formatCurrency(code: string, lang: Lang): string {
  const name = (CUR_NAMES as CurrencyNames)[lang]?.[code]
  if (!name) return code
  return `${code} — ${name}`
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
