'use client'
import { useEffect, useState } from 'react'
import { Country } from '@/lib/types'
import { CONTINENTS } from '@/data/continents'

interface GeoGeometry {
  type: 'Polygon' | 'MultiPolygon'
  coordinates: number[][][][] | number[][][]
}

interface Props {
  country: Country
}

export default function CountryShape({ country }: Props) {
  const [geom, setGeom] = useState<GeoGeometry | null>(null)

  useEffect(() => {
    function trySet() {
      const g = window.COUNTRY_GEO?.[country.iso]
      if (g) setGeom(g as GeoGeometry)
    }
    trySet()
    if (!window.GEO_READY) {
      window.addEventListener('geo-ready', trySet, { once: true })
      return () => window.removeEventListener('geo-ready', trySet)
    }
  }, [country.iso])

  const contMeta = CONTINENTS.find(c => c.id === country.continent)
  const fill = contMeta?.colorLight || '#888'
  const stroke = '#1a1f36'

  if (!geom) {
    return (
      <svg className="quiz-shape-svg" viewBox="0 0 280 200">
        <rect x="90" y="70" width="100" height="60" rx="10" fill="#ddd" stroke={stroke} strokeWidth="2" />
        <text x="140" y="108" textAnchor="middle" fontSize="12" fill="#666">...</text>
      </svg>
    )
  }

  const rings: number[][][] = []
  if (geom.type === 'Polygon') {
    (geom.coordinates as number[][][]).forEach(r => rings.push(r))
  } else if (geom.type === 'MultiPolygon') {
    (geom.coordinates as number[][][][]).forEach(poly => poly.forEach(r => rings.push(r)))
  }
  if (!rings.length) return null

  let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity
  rings.forEach(r => r.forEach(([lng, lat]) => {
    if (lng < minLng) minLng = lng
    if (lng > maxLng) maxLng = lng
    if (lat < minLat) minLat = lat
    if (lat > maxLat) maxLat = lat
  }))

  // Handle antimeridian crossing (Russia, US-AK, Fiji, NZ)
  if (maxLng - minLng > 180) {
    minLng = Infinity; maxLng = -Infinity
    rings.forEach(r => r.forEach(pt => {
      if (pt[0] < 0) pt[0] += 360
      if (pt[0] < minLng) minLng = pt[0]
      if (pt[0] > maxLng) maxLng = pt[0]
    }))
  }

  const W = 280, H = 200, pad = 14
  const latCenter = (minLat + maxLat) / 2
  const kx = Math.cos(latCenter * Math.PI / 180)
  const geoW = (maxLng - minLng) * kx
  const geoH = maxLat - minLat
  const scale = Math.min((W - pad * 2) / geoW, (H - pad * 2) / geoH)
  const offsetX = (W - geoW * scale) / 2
  const offsetY = (H - geoH * scale) / 2

  function project([lng, lat]: number[]): [number, number] {
    return [
      (lng - minLng) * kx * scale + offsetX,
      (maxLat - lat) * scale + offsetY,
    ]
  }

  const paths = rings.map(ring => {
    if (ring.length < 3) return ''
    return ring.map((pt, i) => {
      const [x, y] = project(pt)
      return (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1)
    }).join('') + 'Z'
  }).join(' ')

  return (
    <svg className="quiz-shape-svg" viewBox={`0 0 ${W} ${H}`}>
      <path d={paths} fill={fill} stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" fillRule="evenodd" />
    </svg>
  )
}
