interface Metrics {
  state: string
  district: number
  enrolledHouseholds: number
  percentHouseholds: number
  funding: number
}

interface Legislator {
  id: LegislatorId
  name: LegislatorName
  bio: LegislatorBio
  terms: LegislatorTerm[]
  family?: LegislatorFamily[]
  metrics?: Metrics
}

interface LegislatorId {
  bioguide: string
  thomas: string
  lis: string
  govtrack: number
  opensecrets: string
  votesmart: number
  fec: string[]
  cspan: number
  wikipedia: string
  house_history: number
  ballotpedia: string
  maplight: number
  icpsr: number
  wikidata: string
  google_entity_id: string
}

interface LegislatorName {
  first: string
  last: string
  official_full: string
}

interface LegislatorBio {
  birthday: string
  gender: string
}

interface LegislatorTerm {
  type: string
  start: string
  end: string
  state: string
  class?: number
  district?: number
  party: string
  state_rank?: string
  url?: string
  rss_url?: string
  contact_form?: string
  address?: string
  office?: string
  phone?: string
}

interface LegislatorFamily {
  name: string
  relation: string
}

export type { Legislator, Metrics }
