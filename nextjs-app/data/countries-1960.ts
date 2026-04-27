import type { MultiLang } from '@/lib/types'

// Maps NAME field from the 1960 TopoJSON to a 2-letter code
export const NAME_TO_ISO_1960: Record<string, string> = {
  'Afghanistan': 'AF', 'Albania': 'AL', 'Algeria': 'DZ', 'American Samoa': 'AS',
  'Andorra': 'AD', 'Angola': 'AO', 'Antarctica': 'AQ', 'Argentina': 'AR',
  'Australia': 'AU', 'Austria': 'AT', 'Bahamas': 'BS', 'Belgium': 'BE',
  'Belize': 'BZ', 'Benin': 'BJ', 'Bhutan': 'BT', 'Bolivia': 'BO',
  'Botswana': 'BW', 'Brazil': 'BR', 'Brunei': 'BN', 'Bulgaria': 'BG',
  'Burkina Faso': 'BF', 'Burma': 'MM', 'Burundi': 'BI', 'Cambodia': 'KH',
  'Cameroon': 'CM', 'Canada': 'CA', 'Central African Republic': 'CF',
  'Chad': 'TD', 'Chile': 'CL', 'China': 'CN', 'Colombia': 'CO',
  'Congo': 'CG', 'Costa Rica': 'CR', 'Cuba': 'CU', 'Cyprus': 'CY',
  'Czechoslovakia': 'CS', 'Denmark': 'DK', 'Djibouti': 'DJ',
  'Dominican Republic': 'DO', 'East Germany': 'DD', 'Ecuador': 'EC',
  'Egypt': 'EG', 'El Salvador': 'SV', 'Equatorial Guinea': 'GQ',
  'Eritrea': 'ER', 'Ethiopia': 'ET', 'Fiji': 'FJ', 'Finland': 'FI',
  'France': 'FR', 'French Guiana': 'GF', 'Gabon': 'GA', 'Gambia, The': 'GM',
  'Ghana': 'GH', 'Greece': 'GR', 'Greenland': 'GL', 'Guatemala': 'GT',
  'Guinea': 'GN', 'Guinea-Bissau': 'GW', 'Guyana': 'GY', 'Haiti': 'HT',
  'Honduras': 'HN', 'Hong Kong': 'HK', 'Hungary': 'HU', 'Iceland': 'IS',
  'India': 'IN', 'Indonesia': 'ID', 'Iran': 'IR', 'Iraq': 'IQ',
  'Ireland': 'IE', 'Israel': 'IL', 'Italy': 'IT', 'Ivory Coast': 'CI',
  'Jamaica': 'JM', 'Japan': 'JP', 'Jordan': 'JO', 'Kenya': 'KE',
  "Korea, Democratic People's Republic of": 'KP', 'Korea, Republic of': 'KR',
  'Kuwait': 'KW', 'Laos': 'LA', 'Lebanon': 'LB', 'Lesotho': 'LS',
  'Liberia': 'LR', 'Libya': 'LY', 'Luxembourg': 'LU', 'Madagascar': 'MG',
  'Malawi': 'MW', 'Malaysia': 'MY', 'Mali': 'ML', 'Mauritania': 'MR',
  'Mexico': 'MX', 'Mongolia': 'MN', 'Morocco': 'MA', 'Mozambique': 'MZ',
  'Namibia': 'NA', 'Nepal': 'NP', 'Netherlands': 'NL', 'New Zealand': 'NZ',
  'Nicaragua': 'NI', 'Niger': 'NE', 'Nigeria': 'NG', 'Niue': 'NU',
  'Norway': 'NO', 'Oman': 'OM', 'Pakistan': 'PK', 'Panama': 'PA',
  'Papua New Guinea': 'PG', 'Paraguay': 'PY', 'Peru': 'PE',
  'Philippines': 'PH', 'Poland': 'PL', 'Portugal': 'PT', 'Puerto Rico': 'PR',
  'Qatar': 'QA', 'Rapa Nui': 'CL', 'Romania': 'RO', 'Rwanda': 'RW',
  'Samoa': 'WS', 'Saudi Arabia': 'SA', 'Senegal': 'SN', 'Sierra Leone': 'SL',
  'Somalia': 'SO', 'South Africa': 'ZA', 'Spain': 'ES', 'Sri Lanka': 'LK',
  'Sudan': 'SD', 'Suriname': 'SR', 'Swaziland': 'SZ', 'Sweden': 'SE',
  'Switzerland': 'CH', 'Syria': 'SY', 'Taiwan': 'TW',
  'Tanzania, United Republic of': 'TZ', 'Thailand': 'TH', 'Tibet': 'TB',
  'Togo': 'TG', 'Tonga': 'TO', 'Trinidad': 'TT', 'Tunisia': 'TN',
  'Turkey': 'TR', 'Turks and Caicos Islands': 'TC', 'USSR': 'SU',
  'Uganda': 'UG', 'United Arab Emirates': 'AE', 'United Kingdom': 'GB',
  'United States': 'US', 'Uruguay': 'UY', 'Venezuela': 'VE',
  'Vietnam': 'VN', 'Wallis and Futuna Islands': 'WF', 'West Germany': 'DE',
  'Western Sahara': 'EH', 'Yemen': 'YE', 'Yugoslavia': 'YU',
  'Zaire': 'CD', 'Zambia': 'ZM', 'Zimbabwe': 'ZW',
}

export interface HistoricalCountry {
  iso: string
  name: MultiLang
  capital: MultiLang
  population: number
  area: number
  dissolved?: MultiLang
}

// Countries that existed in 1960 but don't exist today
export const HISTORICAL_COUNTRIES_1960: HistoricalCountry[] = [
  {
    iso: 'SU',
    name: { hr: 'Savez Sovjetskih Socijalističkih Republika (SSSR)', en: 'Soviet Union (USSR)', de: 'Sowjetunion (UdSSR)' },
    capital: { hr: 'Moskva', en: 'Moscow', de: 'Moskau' },
    population: 214_300_000,
    area: 22_402_200,
    dissolved: { hr: 'Raspao se 1991.', en: 'Dissolved in 1991.', de: 'Aufgelöst 1991.' },
  },
  {
    iso: 'YU',
    name: { hr: 'Socijalistička Federativna Republika Jugoslavija', en: 'Socialist Federal Republic of Yugoslavia', de: 'Sozialistische Föderative Republik Jugoslawien' },
    capital: { hr: 'Beograd', en: 'Belgrade', de: 'Belgrad' },
    population: 18_400_000,
    area: 255_804,
    dissolved: { hr: 'Raspala se 1991.–1992.', en: 'Dissolved 1991–1992.', de: 'Aufgelöst 1991–1992.' },
  },
  {
    iso: 'CS',
    name: { hr: 'Čehoslovačka', en: 'Czechoslovakia', de: 'Tschechoslowakei' },
    capital: { hr: 'Prag', en: 'Prague', de: 'Prag' },
    population: 13_700_000,
    area: 127_900,
    dissolved: { hr: 'Mirno se podijelila 1993.', en: 'Peacefully split in 1993.', de: 'Friedlich geteilt 1993.' },
  },
  {
    iso: 'DD',
    name: { hr: 'Njemačka Demokratska Republika (DDR)', en: 'German Democratic Republic (GDR)', de: 'Deutsche Demokratische Republik (DDR)' },
    capital: { hr: 'Istočni Berlin', en: 'East Berlin', de: 'Ostberlin' },
    population: 17_188_000,
    area: 108_333,
    dissolved: { hr: 'Ujedinila se sa ZNj 1990.', en: 'Reunified with West Germany in 1990.', de: 'Wiedervereinigung mit Westdeutschland 1990.' },
  },
  {
    iso: 'TB',
    name: { hr: 'Tibet', en: 'Tibet', de: 'Tibet' },
    capital: { hr: 'Lhasa', en: 'Lhasa', de: 'Lhasa' },
    population: 1_270_000,
    area: 1_228_400,
    dissolved: { hr: 'Anektiran od Kine 1950.–1951.', en: 'Annexed by China 1950–1951.', de: 'Von China annektiert 1950–1951.' },
  },
]
