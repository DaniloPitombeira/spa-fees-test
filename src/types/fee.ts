// Types for Fee data
export interface Fee {
  id: string
  product: string
  type: string
  cluster: string
  consumer: string
  amount: number
  currency: string
  createdAt: string
  updatedAt: string
}

export interface FeesResponse {
  data: Fee[]
  total: number
  page: number
  limit: number
}

export interface FeeFilters {
  product?: string
  type?: string
  cluster?: string
  consumer?: string
  id?: string
  search?: string
}