// Types for Fee data based on OpenAPI specification
export interface EffectiveInterval {
  start_date: string
  end_date: string
  approved: boolean
}

export interface Variation {
  name: string
  value: string
}

export interface BalancingData {
  convenience_value: string
  progressive_discount_value: string
}

export interface FeeRange {
  min: string
  max: string
}

export interface Fee {
  id: string
  product: string
  payment_type: string
  type: string
  sub_type: string
  priority: number
  value: string
  value_type: string
  min_value: string
  effective_interval: EffectiveInterval
  cluster: string
  bin_list: string[]
  variations: Variation[]
  balancing_data: BalancingData
  active: boolean
  fee_range: FeeRange
}

export interface FeesResponse {
  data: Fee[]
  total: number
  page: number
  limit: number
}

export interface FeeFilters {
  product?: string
  payment_type?: string
  type?: string
  sub_type?: string
  cluster?: string
  id?: string
  search?: string
  active?: boolean
}