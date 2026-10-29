'use client'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Country } from '@/lib/types'
import { CAPS } from '@/data/capitals'
import { NAME_TO_ISO_1960 } from '@/data/countries-1960'
import type { Era, MapTheme } from '@/context/AppContext'

interface TooltipState {
  name: { hr: string; en: string; de: string }
  capital: { hr: string; en: string; de: string }
  x: number
  y: number
}

interface GeoGeometry {
  type: 'Polygon' | 'MultiPolygon'
  coordinates: number[][][][]
}

declare global {
  interface Window {
    COUNTRY_GEO?: Record<string, GeoGeometry>
    COUNTRY_BORDER_LINES?: number[][][]
    GEO_READY?: boolean
    COUNTRY_GEO_1960?: Record<string, GeoGeometry>
    COUNTRY_BORDER_LINES_1960?: number[][][]
    GEO_1960_READY?: boolean
    HISTORICAL_GEO?: Record<string, Record<string, GeoGeometry>>
    HISTORICAL_BORDER_LINES?: Record<string, number[][][]>
  }
}

const NUM_TO_ISO2: Record<string, string> = {
  "004":"AF","008":"AL","010":"AQ","012":"DZ","016":"AS","020":"AD","024":"AO","028":"AG",
  "031":"AZ","032":"AR","036":"AU","040":"AT","044":"BS","048":"BH","050":"BD","051":"AM",
  "052":"BB","056":"BE","060":"BM","064":"BT","068":"BO","070":"BA","072":"BW","076":"BR",
  "084":"BZ","086":"IO","090":"SB","092":"VG","096":"BN","100":"BG","104":"MM","108":"BI",
  "112":"BY","116":"KH","120":"CM","124":"CA","132":"CV","136":"KY","140":"CF","144":"LK",
  "148":"TD","152":"CL","156":"CN","158":"TW","162":"CX","166":"CC","170":"CO","174":"KM",
  "175":"YT","178":"CG","180":"CD","184":"CK","188":"CR","191":"HR","192":"CU","196":"CY",
  "203":"CZ","204":"BJ","208":"DK","212":"DM","214":"DO","218":"EC","222":"SV","226":"GQ",
  "231":"ET","232":"ER","233":"EE","234":"FO","238":"FK","239":"GS","242":"FJ","246":"FI",
  "248":"AX","250":"FR","254":"GF","258":"PF","260":"TF","262":"DJ","266":"GA","268":"GE",
  "270":"GM","275":"PS","276":"DE","288":"GH","292":"GI","296":"KI","300":"GR","304":"GL",
  "308":"GD","312":"GP","316":"GU","320":"GT","324":"GN","328":"GY","332":"HT","334":"HM",
  "336":"VA","340":"HN","344":"HK","348":"HU","352":"IS","356":"IN","360":"ID","364":"IR",
  "368":"IQ","372":"IE","376":"IL","380":"IT","384":"CI","388":"JM","392":"JP","398":"KZ",
  "400":"JO","404":"KE","408":"KP","410":"KR","414":"KW","417":"KG","418":"LA","422":"LB",
  "426":"LS","428":"LV","430":"LR","434":"LY","438":"LI","440":"LT","442":"LU","446":"MO",
  "450":"MG","454":"MW","458":"MY","462":"MV","466":"ML","470":"MT","474":"MQ","478":"MR",
  "480":"MU","484":"MX","492":"MC","496":"MN","498":"MD","499":"ME","500":"MS","504":"MA",
  "508":"MZ","512":"OM","516":"NA","520":"NR","524":"NP","528":"NL","531":"CW","533":"AW",
  "534":"SX","535":"BQ","540":"NC","548":"VU","554":"NZ","558":"NI","562":"NE","566":"NG",
  "570":"NU","574":"NF","578":"NO","580":"MP","581":"UM","583":"FM","584":"MH","585":"PW",
  "586":"PK","591":"PA","598":"PG","600":"PY","604":"PE","608":"PH","612":"PN","616":"PL",
  "620":"PT","624":"GW","626":"TL","630":"PR","634":"QA","638":"RE","642":"RO","643":"RU",
  "646":"RW","652":"BL","654":"SH","659":"KN","660":"AI","662":"LC","663":"MF","666":"PM",
  "670":"VC","674":"SM","678":"ST","682":"SA","686":"SN","688":"RS","690":"SC","694":"SL",
  "702":"SG","703":"SK","704":"VN","705":"SI","706":"SO","710":"ZA","716":"ZW","724":"ES",
  "728":"SS","729":"SD","732":"EH","740":"SR","744":"SJ","748":"SZ","752":"SE","756":"CH",
  "760":"SY","762":"TJ","764":"TH","768":"TG","772":"TK","776":"TO","780":"TT","784":"AE",
  "788":"TN","792":"TR","795":"TM","796":"TC","798":"TV","800":"UG","804":"UA","807":"MK",
  "818":"EG","826":"GB","831":"GG","832":"JE","833":"IM","834":"TZ","840":"US","850":"VI",
  "854":"BF","858":"UY","860":"UZ","862":"VE","876":"WF","882":"WS","887":"YE","894":"ZM"
}

function decodeTopoJSON(topo: any): void {
  const nameToIso2: Record<string, string> = {
    "Kosovo": "XK", "S. Sudan": "SS", "Dem. Rep. Congo": "CD",
    "Central African Rep.": "CF", "Eq. Guinea": "GQ", "Dominican Rep.": "DO",
    "Côte d'Ivoire": "CI", "Ivory Coast": "CI", "Bosnia and Herz.": "BA",
    "North Macedonia": "MK", "Czechia": "CZ", "Eswatini": "SZ"
  }

  const arcs = topo.arcs
  const transform = topo.transform

  function decodeArc(i: number): number[][] {
    const rev = i < 0
    const arc = arcs[rev ? ~i : i].map((p: number[]) => p.slice())
    if (transform) {
      let x = 0, y = 0
      for (let j = 0; j < arc.length; j++) {
        x += arc[j][0]; y += arc[j][1]
        arc[j][0] = x * transform.scale[0] + transform.translate[0]
        arc[j][1] = y * transform.scale[1] + transform.translate[1]
      }
    }
    return rev ? arc.reverse() : arc
  }

  function buildRing(arcIndices: number[]): number[][] {
    const ring: number[][] = []
    arcIndices.forEach((ai: number, idx: number) => {
      const arc = decodeArc(ai)
      if (idx > 0) arc.shift()
      ring.push(...arc)
    })
    return ring
  }

  function buildPoly(arcs2: number[][]): number[][][] {
    return arcs2.map(buildRing)
  }

  const geo: Record<string, GeoGeometry> = {}
  const lines: number[][][] = []

  const o = topo.objects['countries']
  if (!o) return

  o.geometries.forEach((g: any) => {
    let coords: any
    if (g.type === 'Polygon') coords = buildPoly(g.arcs)
    else if (g.type === 'MultiPolygon') coords = g.arcs.map(buildPoly)

    const num = String(g.id).padStart(3, '0')
    let iso2 = NUM_TO_ISO2[num]
    if (!iso2 && g.properties?.name) iso2 = nameToIso2[g.properties.name]
    if (iso2 && coords) {
      geo[iso2] = { type: g.type, coordinates: coords }
    }
  })

  function addRings(geom: GeoGeometry) {
    if (geom.type === 'Polygon') geom.coordinates.forEach((r: any) => lines.push(r))
    else if (geom.type === 'MultiPolygon') geom.coordinates.forEach((poly: any) => poly.forEach((r: any) => lines.push(r)))
  }
  Object.values(geo).forEach(addRings)

  window.COUNTRY_GEO = geo
  window.COUNTRY_BORDER_LINES = lines
  window.GEO_READY = true
  window.dispatchEvent(new Event('geo-ready'))
}

function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

function vec3ToLatLng(v: THREE.Vector3): [number, number] {
  const r = v.length()
  const phi = Math.acos(Math.max(-1, Math.min(1, v.y / r)))
  const theta = Math.atan2(v.z, -v.x)
  const lat = 90 - phi * (180 / Math.PI)
  let lng = theta * (180 / Math.PI) - 180
  if (lng < -180) lng += 360  // atan2 wraps at ±π; shift Eastern Hemisphere back
  return [lat, lng]
}

function pointInRing(lng: number, lat: number, ring: number[][]): boolean {
  let inside = false
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j]
    if (((yi > lat) !== (yj > lat)) && lng < (xj - xi) * (lat - yi) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

function findCountryAtLatLng(lat: number, lng: number, countries: Country[]): Country | null {
  const geo = window.COUNTRY_GEO
  if (!geo) return null
  for (const c of countries) {
    const geom = geo[c.iso]
    if (!geom) continue
    let hit = false
    if (geom.type === 'Polygon') {
      hit = pointInRing(lng, lat, geom.coordinates[0] as unknown as number[][])
    } else {
      hit = (geom.coordinates as unknown as number[][][][][]).some(
        poly => pointInRing(lng, lat, poly[0] as unknown as number[][])
      )
    }
    if (hit) return c
  }
  return null
}

function decodeTopoJSON1960(topo: any): void {
  const arcs = topo.arcs
  const transform = topo.transform
  function decodeArc(i: number): number[][] {
    const rev = i < 0
    const arc = arcs[rev ? ~i : i].map((p: number[]) => p.slice())
    if (transform) {
      let x = 0, y = 0
      for (let j = 0; j < arc.length; j++) {
        x += arc[j][0]; y += arc[j][1]
        arc[j][0] = x * transform.scale[0] + transform.translate[0]
        arc[j][1] = y * transform.scale[1] + transform.translate[1]
      }
    }
    return rev ? arc.reverse() : arc
  }
  function buildRing(arcIndices: number[]): number[][] {
    const ring: number[][] = []
    arcIndices.forEach((ai: number, idx: number) => {
      const arc = decodeArc(ai)
      if (idx > 0) arc.shift()
      ring.push(...arc)
    })
    return ring
  }
  function buildPoly(arcs2: number[][]): number[][][] { return arcs2.map(buildRing) }

  const geo: Record<string, GeoGeometry> = {}
  const lines: number[][][] = []
  const objKey = Object.keys(topo.objects)[0]
  const o = topo.objects[objKey]
  if (!o) return

  o.geometries.forEach((g: any) => {
    const name = g.properties?.NAME
    const iso2 = name ? NAME_TO_ISO_1960[name] : null
    if (!iso2) return
    let coords: any
    if (g.type === 'Polygon') coords = buildPoly(g.arcs)
    else if (g.type === 'MultiPolygon') coords = g.arcs.map(buildPoly)
    if (!coords) return
    if (!geo[iso2]) {
      geo[iso2] = { type: g.type, coordinates: coords }
    } else {
      // Merge duplicate polygons (e.g. US territories, Italy)
      const existing = geo[iso2]
      const existingPolys = existing.type === 'Polygon' ? [existing.coordinates] : existing.coordinates
      const newPolys = g.type === 'Polygon' ? [coords] : coords
      geo[iso2] = { type: 'MultiPolygon', coordinates: [...existingPolys, ...newPolys] as any }
    }
  })

  function addRings(geom: GeoGeometry) {
    if (geom.type === 'Polygon') geom.coordinates.forEach((r: any) => lines.push(r))
    else geom.coordinates.forEach((poly: any) => poly.forEach((r: any) => lines.push(r)))
  }
  Object.values(geo).forEach(addRings)

  window.COUNTRY_GEO_1960 = geo
  window.COUNTRY_BORDER_LINES_1960 = lines
  window.HISTORICAL_GEO = { ...window.HISTORICAL_GEO, '1960': geo }
  window.HISTORICAL_BORDER_LINES = { ...window.HISTORICAL_BORDER_LINES, '1960': lines }
  window.GEO_1960_READY = true
  window.dispatchEvent(new Event('geo-1960-ready'))
}

function getEraGeometry(era: Era): Record<string, GeoGeometry> | undefined {
  if (era === 'current') return window.COUNTRY_GEO
  if (era === '1960') return window.COUNTRY_GEO_1960
  return window.HISTORICAL_GEO?.[era]
}

function getEraBorders(era: Era): number[][][] {
  if (era === 'current') return window.COUNTRY_BORDER_LINES ?? []
  if (era === '1960') return window.COUNTRY_BORDER_LINES_1960 ?? []
  return window.HISTORICAL_BORDER_LINES?.[era] ?? []
}

function geometryRings(geometry: GeoGeometry): number[][][] {
  if (geometry.type === 'Polygon') return geometry.coordinates as unknown as number[][][]
  return (geometry.coordinates as unknown as number[][][][]).flat()
}

function geometryPolygons(geometry: GeoGeometry): number[][][][] {
  if (geometry.type === 'Polygon') return [geometry.coordinates as unknown as number[][][]]
  return geometry.coordinates as unknown as number[][][][]
}

function pointInGeometry(lng: number, lat: number, geometry: GeoGeometry): boolean {
  return geometryPolygons(geometry).some(rings =>
    pointInRing(lng, lat, rings[0]) && !rings.slice(1).some(ring => pointInRing(lng, lat, ring))
  )
}

function findCountryAtLatLngForEra(lat: number, lng: number, countries: Country[], era: Era): { country: Country | null; iso: string } | null {
  const geo = getEraGeometry(era)
  if (!geo) return null
  for (const [iso, geom] of Object.entries(geo)) {
    if (pointInGeometry(lng, lat, geom)) {
      return { country: countries.find(country => country.iso === iso) || null, iso }
    }
  }
  return null
}

function decodeHistoricalGeoJSON(year: Exclude<Era, 'current' | '1960'>, collection: any, countries: Country[]): void {
  const aliases: Record<string, string> = {
    'Congo Free State': 'CD', 'Belgian Congo': 'CD', 'Democratic Republic of the Congo': 'CD',
    'French Equatorial Africa': 'CG', 'French West Africa': 'SN', 'Gold Coast': 'GH',
    'German East Africa': 'TZ', 'Tanganyika': 'TZ', 'Nyasaland': 'MW', 'Northern Rhodesia': 'ZM',
    'Southern Rhodesia': 'ZW', 'Bechuanaland': 'BW', 'Basutoland': 'LS', 'Swaziland': 'SZ',
    'Italian East Africa': 'ET', 'Ethiopian Empire': 'ET', 'Siam': 'TH', 'Persia': 'IR',
    'Transjordan': 'JO', 'Palestine': 'PS', 'British India': 'IN', 'East Pakistan': 'BD',
    'West Pakistan': 'PK', 'Ceylon': 'LK', 'Burma': 'MM', 'Indochina': 'VN',
    'French Indochina': 'VN', 'Dutch East Indies': 'ID', 'Netherlands East Indies': 'ID',
    'Republic of China': 'TW', 'Formosa': 'TW', 'Korea': 'KR', 'North Korea': 'KP',
    'South Korea': 'KR', 'German Reich': 'DE', 'Nazi Germany': 'DE', 'Trucial Oman': 'AE',
    'Rwanda (Belgium)': 'RW', 'Angola (Portugal)': 'AO', 'Mozambique (Portugal)': 'MZ',
    'Madagascar (France)': 'MG', 'Syria (France)': 'SY', 'Algeria (France)': 'DZ',
    'Morocco (France)': 'MA', 'French Cameroons': 'CM', 'Southern Cameroon': 'CM',
    'Eritrea (Italy)': 'ER', 'Ethiopia (Italy)': 'ET', 'French Somaliland': 'DJ',
    'Yemen (UK)': 'YE', 'Italian Somaliland': 'SO', 'British Somaliland': 'SO',
    'Spanish Sahara': 'EH', 'Rio De Oro': 'EH', 'Walbis Bay': 'NA', 'Xinjiang': 'CN',
    'Cochin China': 'VN', 'Tonkin': 'VN', 'Fezzan (Frech Lybia)': 'LY',
    'Guinea-Bissau (Portugal)': 'GW', 'Manchuria': 'CN', 'Byelarus': 'BY',
    'Bosnia and Herzegovina': 'BA', 'Macedonia': 'MK', 'Czech Republic': 'CZ',
    'Korea, Democratic People\'s Republic of': 'KP', 'Turkish Cypriot-administered area': 'CY',
    'Japan (USA)': 'JP', 'Rhodesia': 'ZW', 'Saar Protectorate': 'DE',
  }
  const normalizedNames = new Map<string, string>()
  countries.forEach(country => {
    Object.values(country.name).forEach(name => {
      normalizedNames.set(name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(), country.iso)
    })
  })
  const geo: Record<string, GeoGeometry> = {}
  const lines: number[][][] = []

  for (const feature of collection.features ?? []) {
    const name = feature.properties?.NAME
    const normalizedName = typeof name === 'string'
      ? name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
      : ''
    const iso = (name && (NAME_TO_ISO_1960[name] || aliases[name])) || normalizedNames.get(normalizedName)
    const geometry = feature.geometry
    if (!iso || !geometry || !['Polygon', 'MultiPolygon'].includes(geometry.type)) continue

    const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates
    if (geo[iso]) {
      const existing = geo[iso].type === 'Polygon' ? [geo[iso].coordinates] : geo[iso].coordinates
      geo[iso] = { type: 'MultiPolygon', coordinates: [...existing, ...polygons] as any }
    } else {
      geo[iso] = { type: geometry.type, coordinates: geometry.coordinates }
    }
  }

  Object.values(geo).forEach(geometry => {
    geometryRings(geometry).forEach(ring => lines.push(ring))
  })
  window.HISTORICAL_GEO = { ...window.HISTORICAL_GEO, [year]: geo }
  window.HISTORICAL_BORDER_LINES = { ...window.HISTORICAL_BORDER_LINES, [year]: lines }
}

interface Props {
  countries: Country[]
  onSelectCountry: (c: Country) => void
  onSelectHistorical: (iso: string) => void
  theme: 'light' | 'dark'
  rotationSpeed: number
  showCapitals: boolean
  showBorders: boolean
  mapTheme: MapTheme
  focusIso: string | null
  lang: 'hr' | 'en' | 'de'
  era: Era
}

export default function Globe({ countries, onSelectCountry, onSelectHistorical, theme, rotationSpeed, showCapitals, showBorders, mapTheme, focusIso, lang, era }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef<any>({})
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)

  // Load GeoJSON once
  useEffect(() => {
    if (window.GEO_READY) return
    fetch('/countries-50m.json')
      .then(r => r.json())
      .then(decodeTopoJSON)
      .catch(e => console.error('Failed to load geo data:', e))
  }, [])

  // Main Three.js setup — runs once
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const mountEl = mount

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
    camera.position.set(0, 0, 3.2)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0xffffff, 0.9))
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6)
    dirLight.position.set(5, 3, 5)
    scene.add(dirLight)

    const earthGroup = new THREE.Group()
    scene.add(earthGroup)
    const earthRadius = 1

    const loader = new THREE.TextureLoader()
    loader.crossOrigin = 'anonymous'
    const earthMat = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 6, specular: 0x222233 })
    const earthMesh = new THREE.Mesh(new THREE.SphereGeometry(earthRadius, 96, 96), earthMat)
    earthGroup.add(earthMesh)

    const themeCanvas = document.createElement('canvas')
    themeCanvas.width = 2048
    themeCanvas.height = 1024
    const themeContext = themeCanvas.getContext('2d')!
    const themeTexture = new THREE.CanvasTexture(themeCanvas)
    themeTexture.colorSpace = THREE.SRGBColorSpace
    const themeMaterial = new THREE.MeshBasicMaterial({
      map: themeTexture,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
    const themeMesh = new THREE.Mesh(new THREE.SphereGeometry(earthRadius * 1.003, 96, 96), themeMaterial)
    earthGroup.add(themeMesh)

    const textureUrls = {
      light: 'https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg',
      dark: 'https://unpkg.com/three-globe@2.31.1/example/img/earth-night.jpg',
    }

    function loadTex(dark: boolean) {
      loader.load(dark ? textureUrls.dark : textureUrls.light, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        earthMat.map = tex
        earthMat.needsUpdate = true
      }, undefined, () => {
        const canvas = document.createElement('canvas')
        canvas.width = 1024; canvas.height = 512
        const ctx = canvas.getContext('2d')!
        const g = ctx.createLinearGradient(0, 0, 0, 512)
        g.addColorStop(0, dark ? '#1a3a6b' : '#7ab8e8')
        g.addColorStop(1, dark ? '#1a3a6b' : '#4a98d8')
        ctx.fillStyle = g; ctx.fillRect(0, 0, 1024, 512)
        earthMat.map = new THREE.CanvasTexture(canvas)
        earthMat.needsUpdate = true
      })
    }
    loadTex(stateRef.current.theme === 'dark')

    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `varying vec3 vNormal; void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `varying vec3 vNormal; uniform vec3 glowColor; void main() { float intensity = pow(0.72 - dot(vNormal, vec3(0, 0, 1.0)), 2.5); gl_FragColor = vec4(glowColor, 1.0) * intensity; }`,
      uniforms: { glowColor: { value: new THREE.Color(0x9bd4ff) } },
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })
    const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(earthRadius * 1.08, 64, 64), atmosphereMat)
    earthGroup.add(atmosphere)

    function buildTheme() {
      themeContext.clearRect(0, 0, themeCanvas.width, themeCanvas.height)
      const currentGeo = window.COUNTRY_GEO
      const activeTheme = stateRef.current.mapTheme as MapTheme | undefined
      if (!currentGeo || activeTheme === 'none' || stateRef.current.era !== 'current') {
        themeMesh.visible = false
        themeTexture.needsUpdate = true
        return
      }
      themeMesh.visible = true

      const metric = activeTheme === 'population' ? 'population' : 'area'
      const max = Math.max(...countries.map(country => country[metric]))
      const colors = ['#e7f2ef', '#b9ddd5', '#78bdb2', '#388e88', '#155a63']
      themeContext.globalAlpha = 0.78
      for (const country of countries) {
        const geometry = currentGeo[country.iso]
        if (!geometry) continue
        const value = country[metric]
        const fraction = Math.log(Math.max(value, 1)) / Math.log(Math.max(max, 2))
        const index = Math.min(colors.length - 1, Math.floor(fraction * colors.length))
        const path = new Path2D()
        geometryRings(geometry).forEach(ring => {
          if (ring.length < 3) return
          ring.forEach(([lng, lat], pointIndex) => {
            const x = ((lng + 180) / 360) * themeCanvas.width
            const y = ((90 - lat) / 180) * themeCanvas.height
            if (pointIndex === 0) path.moveTo(x, y)
            else path.lineTo(x, y)
          })
          path.closePath()
        })
        themeContext.fillStyle = colors[index]
        themeContext.fill(path, 'evenodd')
      }
      themeContext.globalAlpha = 1
      themeTexture.needsUpdate = true
    }

    const bordersGroup = new THREE.Group()
    earthGroup.add(bordersGroup)

    function buildBorders() {
      while (bordersGroup.children.length) {
        const c = bordersGroup.children[0] as THREE.Line
        c.geometry?.dispose()
        ;(c.material as THREE.Material)?.dispose()
        bordersGroup.remove(c)
      }
      buildTheme()
      const lines = getEraBorders(stateRef.current.era || 'current')
      if (!lines.length) return
      const isDark = stateRef.current.theme === 'dark'
      const mat = new THREE.LineBasicMaterial({ color: isDark ? 0xffee88 : 0xffffff, transparent: true, opacity: 0.95, depthWrite: false })
      const glowMat = new THREE.LineBasicMaterial({ color: isDark ? 0xffaa33 : 0x1a1f36, transparent: true, opacity: 0.6, depthWrite: false })
      const r1 = earthRadius * 1.004, r2 = earthRadius * 1.006
      lines.forEach(ring => {
        if (!ring || ring.length < 2) return
        const pts1: THREE.Vector3[] = [], pts2: THREE.Vector3[] = []
        for (let i = 0; i < ring.length; i++) {
          const [lng, lat] = ring[i]
          pts1.push(latLngToVec3(lat, lng, r1))
          pts2.push(latLngToVec3(lat, lng, r2))
        }
        bordersGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts1), glowMat))
        bordersGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts2), mat))
      })
    }
    if (window.GEO_READY) buildBorders()
    else window.addEventListener('geo-ready', buildBorders, { once: true })

    // Highlight selected country
    const highlightGroup = new THREE.Group()
    earthGroup.add(highlightGroup)
    const highlightMats: THREE.LineBasicMaterial[] = []

    function buildHighlight(iso: string | null) {
      while (highlightGroup.children.length) {
        const c = highlightGroup.children[0] as THREE.Line
        c.geometry?.dispose()
        ;(c.material as THREE.Material)?.dispose()
        highlightGroup.remove(c)
      }
      highlightMats.length = 0
      const geoSource = getEraGeometry(stateRef.current.era || 'current')
      if (!iso || !geoSource) return
      const geom = geoSource[iso]
      if (!geom) return
      const rings: number[][][] = []
      if (geom.type === 'Polygon') (geom.coordinates as any).forEach((r: any) => rings.push(r))
      else (geom.coordinates as any).forEach((poly: any) => poly.forEach((r: any) => rings.push(r)))
      const r1 = earthRadius * 1.012, r2 = earthRadius * 1.016
      rings.forEach(ring => {
        if (ring.length < 2) return
        const pts1 = ring.map(([lng, lat]: number[]) => latLngToVec3(lat, lng, r1))
        const pts2 = ring.map(([lng, lat]: number[]) => latLngToVec3(lat, lng, r2))
        const mat1 = new THREE.LineBasicMaterial({ color: 0xffdd00, transparent: true, opacity: 1, depthWrite: false })
        const mat2 = new THREE.LineBasicMaterial({ color: 0xff8800, transparent: true, opacity: 0.5, depthWrite: false })
        highlightGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts1), mat1))
        highlightGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts2), mat2))
        highlightMats.push(mat1, mat2)
      })
    }
    if (window.GEO_READY) buildHighlight(stateRef.current.selectedIso || null)
    else window.addEventListener('geo-ready', () => buildHighlight(stateRef.current.selectedIso || null), { once: true })

    const pinsGroup = new THREE.Group()
    earthGroup.add(pinsGroup)
    const pinObjects: Array<{ dot: THREE.Mesh; ring: THREE.Mesh; country: Country; pos: THREE.Vector3 }> = []

    countries.forEach(c => {
      if (c.continent === 'Antarctica') return
      const capCoords = CAPS[c.iso]
      const lat = capCoords ? capCoords[0] : (c.capitalLat ?? c.lat)
      const lng = capCoords ? capCoords[1] : (c.capitalLng ?? c.lng)
      const pos = latLngToVec3(lat, lng, earthRadius * 1.008)
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.005, 10, 10), new THREE.MeshBasicMaterial({ color: 0xff3b7f }))
      dot.position.copy(pos); dot.userData.country = c
      pinsGroup.add(dot)
      const ring = new THREE.Mesh(new THREE.SphereGeometry(0.009, 10, 10), new THREE.MeshBasicMaterial({ color: 0xff3b7f, transparent: true, opacity: 0.35 }))
      ring.position.copy(pos); ring.userData.country = c
      pinsGroup.add(ring)
      pinObjects.push({ dot, ring, country: c, pos })
    })

    let isDragging = false, dragMoved = false
    let prev = { x: 0, y: 0 }
    let autoRotate = true
    let targetRotY = 0, targetRotX = 0
    let curRotY = 0, curRotX = 0

    function onDown(e: MouseEvent | TouchEvent) {
      isDragging = true; dragMoved = false; autoRotate = false
      const p = (e as TouchEvent).touches ? (e as TouchEvent).touches[0] : e as MouseEvent
      prev.x = p.clientX; prev.y = p.clientY
    }
    function onMove(e: MouseEvent | TouchEvent) {
      const p = (e as TouchEvent).touches ? (e as TouchEvent).touches[0] : e as MouseEvent
      if (isDragging) {
        const dx = p.clientX - prev.x, dy = p.clientY - prev.y
        if (Math.abs(dx) + Math.abs(dy) > 8) dragMoved = true
        targetRotY += dx * 0.005
        targetRotX += dy * 0.005
        targetRotX = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, targetRotX))
        prev.x = p.clientX; prev.y = p.clientY
      } else {
        const rect = renderer.domElement.getBoundingClientRect()
        const mx = ((p.clientX - rect.left) / rect.width) * 2 - 1
        const my = -((p.clientY - rect.top) / rect.height) * 2 + 1
        const raycaster = new THREE.Raycaster()
        raycaster.setFromCamera(new THREE.Vector2(mx, my), camera)
        if (stateRef.current.era === 'current') {
          const hits = raycaster.intersectObjects(pinsGroup.children)
          const visHits = hits.filter(h => h.object.visible)
          if (visHits.length && visHits[0].object.userData.country) {
            const c = visHits[0].object.userData.country
            setTooltip({ name: c.name, capital: c.capital, x: p.clientX - rect.left, y: p.clientY - rect.top })
            renderer.domElement.style.cursor = 'pointer'
            return
          }
        }
        setTooltip(null)
        renderer.domElement.style.cursor = stateRef.current.era === 'current' ? 'grab' : 'crosshair'
      }
    }
    function onUp() { isDragging = false }
    function onClick(e: MouseEvent | TouchEvent) {
      if (dragMoved) return
      const rect = renderer.domElement.getBoundingClientRect()
      const p = (e as TouchEvent).changedTouches ? (e as TouchEvent).changedTouches[0] : e as MouseEvent
      const mx = ((p.clientX - rect.left) / rect.width) * 2 - 1
      const my = -((p.clientY - rect.top) / rect.height) * 2 + 1
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(new THREE.Vector2(mx, my), camera)
      const currentEra = stateRef.current.era || 'current'

      // Pins only in current mode
      if (currentEra === 'current') {
        const pinHits = raycaster.intersectObjects(pinsGroup.children).filter(h => h.object.visible)
        if (pinHits.length && pinHits[0].object.userData.country) {
          stateRef.current.onSelectCountry?.(pinHits[0].object.userData.country)
          return
        }
      }

      // Earth surface click → point-in-polygon
      const earthHits = raycaster.intersectObject(earthMesh)
      if (earthHits.length) {
        const worldPt = earthHits[0].point
        const localPt = earthGroup.worldToLocal(worldPt.clone())
        const [lat, lng] = vec3ToLatLng(localPt)
        const result = findCountryAtLatLngForEra(lat, lng, countries, currentEra)
        if (result) {
          if (result.country) stateRef.current.onSelectCountry?.(result.country)
          else stateRef.current.onSelectHistorical?.(result.iso)
        }
      }
    }
    function onWheel(e: WheelEvent) {
      e.preventDefault()
      camera.position.z = Math.max(1.05, Math.min(6, camera.position.z + e.deltaY * 0.002))
    }

    function resize() {
      const w = mountEl.clientWidth || 1, h = mountEl.clientHeight || 1
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(mountEl)

    let rafId: number, pulseTime = 0
    function animate() {
      rafId = requestAnimationFrame(animate)
      pulseTime += 0.04
      if (autoRotate) targetRotY += (stateRef.current.rotationSpeed ?? 0.0015)
      curRotY += (targetRotY - curRotY) * 0.1
      curRotX += (targetRotX - curRotX) * 0.1
      earthGroup.rotation.y = curRotY
      earthGroup.rotation.x = curRotX
      const pulse = 1 + Math.sin(pulseTime) * 0.25
      // Pulse highlight border
      const hPulse = 0.55 + Math.sin(pulseTime * 2.5) * 0.45
      highlightMats.forEach((m, i) => { m.opacity = i % 2 === 0 ? hPulse : hPulse * 0.5 })
      bordersGroup.visible = !!stateRef.current.showBorders
      pinObjects.forEach(po => {
        po.ring.scale.setScalar(pulse)
        const worldPos = new THREE.Vector3()
        po.dot.getWorldPosition(worldPos)
        const camToPoint = worldPos.clone().sub(camera.position).normalize()
        const pointNormal = worldPos.clone().normalize()
        const vis = camToPoint.dot(pointNormal) < -0.05
        const currentEra = stateRef.current.era === 'current'
        po.dot.visible = vis && currentEra && !!stateRef.current.showCapitals
        po.ring.visible = vis && currentEra && !!stateRef.current.showCapitals
      })
      renderer.render(scene, camera)
    }
    animate()

    stateRef.current = {
      ...stateRef.current,
      scene, camera, renderer, earthGroup, pinObjects, earthMat, atmosphereMat, loadTex,
      bordersGroup, buildBorders, buildTheme,
      highlightGroup, buildHighlight,
      onSelectCountry,
      onSelectHistorical,
      focusOn: (iso: string) => {
        const c = countries.find(x => x.iso === iso)
        if (!c) return
        autoRotate = false
        const capCoords = CAPS[iso]
        const lat = capCoords ? capCoords[0] : (c.capitalLat ?? c.lat)
        const lng = capCoords ? capCoords[1] : (c.capitalLng ?? c.lng)
        targetRotY = -(lng * Math.PI / 180) - Math.PI / 2
        targetRotX = lat * Math.PI / 180
      }
    }

    const dom = renderer.domElement
    dom.style.display = 'block'
    dom.style.width = '100%'
    dom.style.height = '100%'
    dom.addEventListener('mousedown', onDown as any)
    dom.addEventListener('mousemove', onMove as any)
    dom.addEventListener('mouseup', onUp)
    dom.addEventListener('mouseleave', onUp)
    dom.addEventListener('click', onClick as any)
    dom.addEventListener('wheel', onWheel, { passive: false })
    dom.addEventListener('touchstart', onDown as any, { passive: true })
    dom.addEventListener('touchmove', onMove as any, { passive: true })
    dom.addEventListener('touchend', (e) => { onUp(); onClick(e) })

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      dom.removeEventListener('mousedown', onDown as any)
      dom.removeEventListener('mousemove', onMove as any)
      dom.removeEventListener('mouseup', onUp)
      dom.removeEventListener('mouseleave', onUp)
      dom.removeEventListener('click', onClick as any)
      dom.removeEventListener('wheel', onWheel)
      if (dom.parentNode) dom.parentNode.removeChild(dom)
      renderer.dispose()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // React to prop changes without re-init
  useEffect(() => { stateRef.current.rotationSpeed = rotationSpeed }, [rotationSpeed])
  useEffect(() => { stateRef.current.showCapitals = showCapitals }, [showCapitals])
  useEffect(() => { stateRef.current.showBorders = showBorders }, [showBorders])
  useEffect(() => {
    stateRef.current.mapTheme = mapTheme
    if (stateRef.current.buildTheme) stateRef.current.buildTheme()
  }, [mapTheme])
  useEffect(() => { stateRef.current.onSelectCountry = onSelectCountry }, [onSelectCountry])
  useEffect(() => { stateRef.current.onSelectHistorical = onSelectHistorical }, [onSelectHistorical])
  useEffect(() => { stateRef.current.lang = lang }, [lang])
  useEffect(() => {
    stateRef.current.era = era
    if (stateRef.current.buildBorders) stateRef.current.buildBorders()
    if (stateRef.current.buildHighlight) stateRef.current.buildHighlight(stateRef.current.selectedIso || null)
    if (era === '1960') {
      if (!window.GEO_1960_READY) {
        fetch('/countries-1960.json')
          .then(r => r.json())
          .then(topo => {
            decodeTopoJSON1960(topo)
            if (stateRef.current.buildBorders) stateRef.current.buildBorders()
            if (stateRef.current.buildHighlight) stateRef.current.buildHighlight(null)
          })
      } else {
        if (stateRef.current.buildBorders) stateRef.current.buildBorders()
        if (stateRef.current.buildHighlight) stateRef.current.buildHighlight(null)
      }
    } else if (era === 'current') {
      if (stateRef.current.buildBorders) stateRef.current.buildBorders()
      if (stateRef.current.buildHighlight) stateRef.current.buildHighlight(stateRef.current.selectedIso || null)
    } else if (window.HISTORICAL_GEO?.[era]) {
      if (stateRef.current.buildBorders) stateRef.current.buildBorders()
      if (stateRef.current.buildHighlight) stateRef.current.buildHighlight(stateRef.current.selectedIso || null)
    } else {
      fetch(`/historical-${era}.geojson`)
        .then(response => {
          if (!response.ok) throw new Error(`Failed to load ${era} map`)
          return response.json()
        })
        .then(collection => {
          decodeHistoricalGeoJSON(era, collection, countries)
          if (stateRef.current.era !== era) return
          if (stateRef.current.buildBorders) stateRef.current.buildBorders()
          if (stateRef.current.buildHighlight) stateRef.current.buildHighlight(stateRef.current.selectedIso || null)
        })
        .catch(error => console.error(`Failed to load historical map for ${era}:`, error))
    }
  }, [era])
  useEffect(() => {
    stateRef.current.theme = theme
    if (stateRef.current.loadTex) stateRef.current.loadTex(theme === 'dark')
    if (stateRef.current.atmosphereMat) {
      stateRef.current.atmosphereMat.uniforms.glowColor.value = new THREE.Color(theme === 'dark' ? 0x6bb6ff : 0x9bd4ff)
    }
    if (stateRef.current.buildBorders) stateRef.current.buildBorders()
  }, [theme])
  useEffect(() => {
    if (focusIso) {
      stateRef.current.selectedIso = focusIso
      if (stateRef.current.focusOn) stateRef.current.focusOn(focusIso)
      if (stateRef.current.buildHighlight) stateRef.current.buildHighlight(focusIso)
      else stateRef.current.pendingHighlight = focusIso
    }
  }, [focusIso])

  return (
    <div ref={mountRef} className="globe-canvas" style={{ position: 'absolute', inset: 0 }}>
      {tooltip && (
        <div className="globe-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          <strong>{tooltip.name[lang]}</strong>
          <span style={{ opacity: 0.75, marginLeft: 8 }}>· {tooltip.capital[lang]}</span>
        </div>
      )}
    </div>
  )
}
