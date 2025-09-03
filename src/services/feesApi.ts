import type { Fee, FeesResponse, FeeFilters } from '@/types/fee'

const API_BASE_URL = import.meta.env.VITE_MS_FEES_HOST || 'http://localhost:3000'
const API_VERSION = import.meta.env.VITE_MS_FEES_API_VERSION || 'v1'

class FeesApiService {
  private baseUrl = `${API_BASE_URL}/api/${API_VERSION}`

  /**
   * Fetch fees with optional filters
   */
  async getFees(filters?: FeeFilters, page = 1, limit = 20): Promise<FeesResponse> {
    try {
      const params = new URLSearchParams()
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            params.append(key, value)
          }
        })
      }
      
      params.append('page', page.toString())
      params.append('limit', limit.toString())

      const response = await fetch(`${this.baseUrl}/fees?${params}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching fees:', error)
      // Return mock data for development when API is not available
      return this.getMockFees(filters, page, limit)
    }
  }

  /**
   * Get a specific fee by ID
   */
  async getFeeById(id: string): Promise<Fee> {
    try {
      const response = await fetch(`${this.baseUrl}/fees/${id}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching fee:', error)
      // Return mock data for development
      return this.getMockFeeById(id)
    }
  }

  /**
   * Mock data for development when API is not available
   */
  private getMockFees(filters?: FeeFilters, page = 1, limit = 20): FeesResponse {
    const mockFees: Fee[] = [
      {
        id: '1',
        product: 'Product A',
        type: 'Transaction',
        cluster: 'Cluster 1',
        consumer: 'Consumer X',
        amount: 10.50,
        currency: 'USD',
        createdAt: '2024-01-01T10:00:00Z',
        updatedAt: '2024-01-01T10:00:00Z'
      },
      {
        id: '2',
        product: 'Product B',
        type: 'Service',
        cluster: 'Cluster 2',
        consumer: 'Consumer Y',
        amount: 25.00,
        currency: 'USD',
        createdAt: '2024-01-02T11:00:00Z',
        updatedAt: '2024-01-02T11:00:00Z'
      },
      {
        id: '3',
        product: 'Product A',
        type: 'Processing',
        cluster: 'Cluster 1',
        consumer: 'Consumer Z',
        amount: 5.75,
        currency: 'EUR',
        createdAt: '2024-01-03T12:00:00Z',
        updatedAt: '2024-01-03T12:00:00Z'
      },
      {
        id: '4',
        product: 'Product C',
        type: 'Transaction',
        cluster: 'Cluster 3',
        consumer: 'Consumer X',
        amount: 15.25,
        currency: 'USD',
        createdAt: '2024-01-04T13:00:00Z',
        updatedAt: '2024-01-04T13:00:00Z'
      },
      {
        id: '5',
        product: 'Product B',
        type: 'Service',
        cluster: 'Cluster 2',
        consumer: 'Consumer W',
        amount: 30.00,
        currency: 'GBP',
        createdAt: '2024-01-05T14:00:00Z',
        updatedAt: '2024-01-05T14:00:00Z'
      }
    ]

    // Apply filters
    let filteredFees = mockFees
    if (filters) {
      filteredFees = mockFees.filter(fee => {
        return (
          (!filters.id || fee.id.includes(filters.id)) &&
          (!filters.product || fee.product.toLowerCase().includes(filters.product.toLowerCase())) &&
          (!filters.type || fee.type.toLowerCase().includes(filters.type.toLowerCase())) &&
          (!filters.cluster || fee.cluster.toLowerCase().includes(filters.cluster.toLowerCase())) &&
          (!filters.consumer || fee.consumer.toLowerCase().includes(filters.consumer.toLowerCase())) &&
          (!filters.search || 
            fee.product.toLowerCase().includes(filters.search.toLowerCase()) ||
            fee.type.toLowerCase().includes(filters.search.toLowerCase()) ||
            fee.cluster.toLowerCase().includes(filters.search.toLowerCase()) ||
            fee.consumer.toLowerCase().includes(filters.search.toLowerCase()) ||
            fee.id.includes(filters.search)
          )
        )
      })
    }

    // Simulate pagination
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedFees = filteredFees.slice(start, end)

    return {
      data: paginatedFees,
      total: filteredFees.length,
      page,
      limit
    }
  }

  private getMockFeeById(id: string): Fee {
    return {
      id,
      product: 'Product A',
      type: 'Transaction',
      cluster: 'Cluster 1',
      consumer: 'Consumer X',
      amount: 10.50,
      currency: 'USD',
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-01-01T10:00:00Z'
    }
  }
}

export const feesApiService = new FeesApiService()