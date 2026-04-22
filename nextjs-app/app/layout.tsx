import type { Metadata } from 'next'
import { Fredoka, Nunito } from 'next/font/google'
import './globals.css'

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Putovanje Zemljom — Interaktivni globus',
  description: 'Otkrij svijet — države, glavni gradovi, zastave i kvizovi',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hr">
      <body className={`${fredoka.variable} ${nunito.variable}`}>
        {children}
      </body>
    </html>
  )
}
