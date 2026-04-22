import AppShell from '@/components/AppShell'
import { COUNTRIES } from '@/data/countries'

export default function Home() {
  return <AppShell countries={COUNTRIES} />
}
