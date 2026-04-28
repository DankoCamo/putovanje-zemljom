# Putovanje Zemljom — CLAUDE.md

Next.js 14 / TypeScript interactive globe app. Three.js globe, TopoJSON borders, country facts in hr/en/de.

## Stack
- `nextjs-app/` — Next.js app (App Router, TypeScript)
- `nextjs-app/data/` — static data: countries, facts, cities, currencies, i18n
- `nextjs-app/components/Globe.tsx` — Three.js globe (complex, read carefully before editing)
- `nextjs-app/public/` — static assets incl. TopoJSON border files

---

## Pravilnik za pisanje činjenica (country-facts.ts) i sve prijevode

Svaki put kad pišeš ili mijenjaš činjenice ili prijevode, MORAŠ slijediti ovaj pravilnik.
Nikad ne zanemaruj nijedan od ovih pravila.

### Točnost podataka (sva tri jezika)
- **Provjeri superlative** prije nego ih napišeš: "najveći", "najmnogoljudniji", "najdulja" itd.
  - Nigerija (~220 M), a ne Egipat, je najmnogoljudnija zemlja Afrike
  - Rusija, a ne SSSR, je danas najveća zemlja po površini
  - Nil (6.650 km) je najdulja rijeka, Amazon po volumenu vode
- Koristi okvirne brojeve za populaciju (podaci zastarijevaju); piši "~" ili "oko" za procjene
- Nikad ne pišeš "jedina", "prva", "najveća" bez provjere je li tvrdnja točna

### Hrvatski (HR) — gramatika i pravopis

**Padeži — najčešće greške:**
- Lokativ (u/na + gdje?): "u Sahari" ✓, "u Africi" ✓, "na Zemlji" ✓ — NIKAD "u Sahara", "u Afrika"
- Genitiv pridjeva uz imenicu muškog roda: "svjetskog bakra" ✓, "najvećeg grafa" ✓ — NIKAD "svjetske bakra"
- Pridjevi se slažu s rodom imenice: "riječna delta" (ž.r.) ✓, "unutarnja delta" ✓ — NIKAD "riječni delta"

**Kroatizacija stranih riječi:**
- Vlastita imena: "Ruandski" ✓ (ne "Rwandski"), "Kongoanac" ✓ (ne "Congoanac")
- Ne miješaj jezike unutar rečenice: "Singapurom Afrike" ✓ (ne "Afrikas Singapore")
- Prevedene sintagme: "promatranje gorila" ✓ (ne "gorilu trekking"), "slijetanje na Mjesec" ✓

**Stil i leksik:**
- Prefer domaće glagole: "proizveo" ✓ (ne "producirao"), "postigao" ✓ (ne "achievao")
- Naglasak/dijakritici: "većinu" ✓ (ne "večinu"), "Gigantska" ✓ (ne "Giganstka")
- Prirodne konstrukcije: "vremenski bila bliže slijetanju" ✓ (ne "živjela bliže u vremenu slijetanju")
- Imenice ženskog roda: "delta" je ženskog roda u hr → "najveća unutarnja riječna delta"

### Engleski (EN) — grammar and spelling
- Consistent use of Oxford comma in lists
- Do not mix EN/DE/HR words within a sentence
- Capitalise proper nouns, country adjectives (Rwandan, Zambian, etc.)
- Spell out centuries: "20th century" ✓ (not "20. st." — that is HR notation)
- Numbers: use commas as thousands separator in EN ("1,000"), periods in DE/HR ("1.000")
- Verify country adjectives: "Rwandan" ✓, "Zambian" ✓, "Botswanan" ✓

### Njemački (DE) — Grammatik und Rechtschreibung
- **Alle Substantive** werden großgeschrieben: "das Delta" ✓, "der Kupfergürtel" ✓
- Komposita zusammenschreiben oder mit Bindestrich: "Binnenfluss-Delta" ✓, "Kupfergürtel" ✓ (nicht "Kupfer Gürtel")
- Genitiv: "Afrikas bevölkerungsreichstes Land" ✓, "der Welt größtes Delta" → "das weltgrößte Delta" ✓
- Anführungszeichen: „..." (nicht "...") — tiefes 99 oben 66 Muster
- Adjektivdeklination prüfen: "das größte" (Neutrum) ✓, "der größte" (Maskulinum) ✓
- Länderadjektive: "ruandisch" ✓ (nicht "rwandisch"), "sambisch" ✓ (nicht "zambisch")

### Zabranjeni obrasci (nikad ne koristiti)
| Pogrešno | Ispravno | Jezik |
|----------|----------|-------|
| u Sahara | u Sahari | HR |
| svjetske bakra | svjetskog bakra | HR |
| riječni delta | riječna delta | HR |
| Rwandski | Ruandski | HR |
| Afrikas Singapore | Singapurom Afrike | HR |
| gorilu trekking | promatranje gorila | HR |
| producirao | proizveo | HR |
| večinu | većinu | HR |
| Giganst- | Gigantsk- | HR |
| rwandisch | ruandisch | DE |
| zambisch | sambisch | DE |
| "..." | „..." | DE |

---

## Git
- Commit i push odmah nakon svake promjene — ne čekaj da korisnik pita
- Commit poruke na engleskom, opisne
