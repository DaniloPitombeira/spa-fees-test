import type { Fee, FeesResponse, FeeFilters } from '@/types/fee'

const API_BASE_URL = import.meta.env.VITE_MS_FEES_HOST || 'http://localhost:3000'
const API_VERSION = import.meta.env.VITE_MS_FEES_API_VERSION || 'v1'
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true'

class FeesApiService {
  private baseUrl = `${API_BASE_URL}/api/${API_VERSION}`
  private isApiAvailable = true

  /**
   * Reset API availability status - useful for retrying after connection issues
   */
  resetApiStatus() {
    this.isApiAvailable = true
  }

  /**
   * Check if the API is currently marked as available
   */
  getApiStatus() {
    return {
      isAvailable: this.isApiAvailable,
      baseUrl: this.baseUrl,
      useMockData: USE_MOCK_DATA
    }
  }

  /**
   * Fetch fees with optional filters
   */
  async getFees(filters?: FeeFilters, page = 1, limit = 20): Promise<FeesResponse> {
    // Use mock data directly if configured
    if (USE_MOCK_DATA) {
      return this.getMockFees(filters, page, limit)
    }

    // If API was previously unavailable, use mock data to avoid repeated failed requests
    if (!this.isApiAvailable) {
      return this.getMockFees(filters, page, limit)
    }

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

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

      const response = await fetch(`${this.baseUrl}/fees?${params}`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      // If we get here, the API is working
      this.isApiAvailable = true
      return data
    } catch (error) {
      // Mark API as unavailable for subsequent requests
      this.isApiAvailable = false
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.warn('⚠️ MS-Fees API request timed out. Using mock data instead.')
        } else if (error.message.includes('Failed to fetch')) {
          console.warn('⚠️ MS-Fees API not available. Using mock data instead. Check if the service is running at:', this.baseUrl)
        } else {
          console.warn('⚠️ MS-Fees API error:', error.message, '. Using mock data instead.')
        }
      }
      
      // Return mock data for development when API is not available
      return this.getMockFees(filters, page, limit)
    }
  }

  /**
   * Get a specific fee by ID
   */
  async getFeeById(id: string): Promise<Fee> {
    // Use mock data directly if configured
    if (USE_MOCK_DATA) {
      return this.getMockFeeById(id)
    }

    // If API was previously unavailable, use mock data
    if (!this.isApiAvailable) {
      return this.getMockFeeById(id)
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

      const response = await fetch(`${this.baseUrl}/fees/${id}`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      // If we get here, the API is working
      this.isApiAvailable = true
      return data
    } catch (error) {
      // Mark API as unavailable for subsequent requests
      this.isApiAvailable = false
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.warn('⚠️ MS-Fees API request timed out. Using mock data instead.')
        } else if (error.message.includes('Failed to fetch')) {
          console.warn('⚠️ MS-Fees API not available. Using mock data instead. Check if the service is running at:', this.baseUrl)
        } else {
          console.warn('⚠️ MS-Fees API error:', error.message, '. Using mock data instead.')
        }
      }
      
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
        id: '677ece2d5ce0a1204c0d6e60',
        product: 'P2PP2P',
        payment_type: 'CREDIT_CARD',
        type: 'INSTALLMENT',
        sub_type: 'DEFAULT',
        priority: 1,
        value: '4.4900',
        value_type: 'PERCENTAGE',
        min_value: '0.0000',
        effective_interval: {
          start_date: '2025-03-03 00:00:00',
          end_date: '2025-04-04 23:59:59',
          approved: true
        },
        cluster: 'CLUSTER_XPTO',
        bin_list: ['123456'],
        variations: [
          {
            name: 'CONSUMER_ONBOARDING',
            value: '0.5000'
          }
        ],
        balancing_data: {
          convenience_value: '0.0000',
          progressive_discount_value: '0.0000'
        },
        active: true,
        fee_range: {
          min: '1.0000',
          max: '9.0000'
        }
      },
      {
        id: '677ece2d5ce0a1204c0d6e61',
        product: 'PIX',
        payment_type: 'PIX',
        type: 'TRANSACTION',
        sub_type: 'STANDARD',
        priority: 2,
        value: '2.5000',
        value_type: 'FIXED',
        min_value: '1.0000',
        effective_interval: {
          start_date: '2025-01-01 00:00:00',
          end_date: '2025-12-31 23:59:59',
          approved: true
        },
        cluster: 'CLUSTER_PIX',
        bin_list: ['654321'],
        variations: [
          {
            name: 'PREMIUM_USER',
            value: '1.0000'
          }
        ],
        balancing_data: {
          convenience_value: '0.1000',
          progressive_discount_value: '0.0500'
        },
        active: true,
        fee_range: {
          min: '0.5000',
          max: '5.0000'
        }
      },
      {
        id: '677ece2d5ce0a1204c0d6e62',
        product: 'DEBIT_CARD',
        payment_type: 'DEBIT_CARD',
        type: 'PROCESSING',
        sub_type: 'EXPRESS',
        priority: 3,
        value: '1.2500',
        value_type: 'PERCENTAGE',
        min_value: '0.5000',
        effective_interval: {
          start_date: '2025-02-01 00:00:00',
          end_date: '2025-06-30 23:59:59',
          approved: false
        },
        cluster: 'CLUSTER_DEBIT',
        bin_list: ['789012', '345678'],
        variations: [
          {
            name: 'BUSINESS_ACCOUNT',
            value: '0.7500'
          },
          {
            name: 'VIP_CLIENT',
            value: '0.2500'
          }
        ],
        balancing_data: {
          convenience_value: '0.0500',
          progressive_discount_value: '0.1000'
        },
        active: true,
        fee_range: {
          min: '0.2500',
          max: '3.0000'
        }
      },
      {
        id: '677ece2d5ce0a1204c0d6e63',
        product: 'TED',
        payment_type: 'BANK_TRANSFER',
        type: 'SERVICE',
        sub_type: 'PREMIUM',
        priority: 1,
        value: '15.0000',
        value_type: 'FIXED',
        min_value: '10.0000',
        effective_interval: {
          start_date: '2025-01-15 00:00:00',
          end_date: '2025-07-15 23:59:59',
          approved: true
        },
        cluster: 'CLUSTER_BANK',
        bin_list: ['901234'],
        variations: [],
        balancing_data: {
          convenience_value: '2.0000',
          progressive_discount_value: '1.0000'
        },
        active: true,
        fee_range: {
          min: '10.0000',
          max: '25.0000'
        }
      },
      {
        id: '677ece2d5ce0a1204c0d6e64',
        product: 'BOLETO',
        payment_type: 'BOLETO',
        type: 'TRANSACTION',
        sub_type: 'STANDARD',
        priority: 2,
        value: '3.9900',
        value_type: 'FIXED',
        min_value: '2.0000',
        effective_interval: {
          start_date: '2025-01-01 00:00:00',
          end_date: '2025-12-31 23:59:59',
          approved: true
        },
        cluster: 'CLUSTER_BOLETO',
        bin_list: ['567890'],
        variations: [
          {
            name: 'BULK_DISCOUNT',
            value: '3.0000'
          }
        ],
        balancing_data: {
          convenience_value: '0.5000',
          progressive_discount_value: '0.2500'
        },
        active: false,
        fee_range: {
          min: '2.0000',
          max: '8.0000'
        }
      }
    ]

    // Apply filters
    let filteredFees = mockFees
    if (filters) {
      filteredFees = mockFees.filter(fee => {
        return (
          (!filters.id || fee.id.includes(filters.id)) &&
          (!filters.product || fee.product.toLowerCase().includes(filters.product.toLowerCase())) &&
          (!filters.payment_type || fee.payment_type.toLowerCase().includes(filters.payment_type.toLowerCase())) &&
          (!filters.type || fee.type.toLowerCase().includes(filters.type.toLowerCase())) &&
          (!filters.sub_type || fee.sub_type.toLowerCase().includes(filters.sub_type.toLowerCase())) &&
          (!filters.cluster || fee.cluster.toLowerCase().includes(filters.cluster.toLowerCase())) &&
          (filters.active === undefined || fee.active === filters.active) &&
          (!filters.search || 
            fee.product.toLowerCase().includes(filters.search.toLowerCase()) ||
            fee.payment_type.toLowerCase().includes(filters.search.toLowerCase()) ||
            fee.type.toLowerCase().includes(filters.search.toLowerCase()) ||
            fee.sub_type.toLowerCase().includes(filters.search.toLowerCase()) ||
            fee.cluster.toLowerCase().includes(filters.search.toLowerCase()) ||
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
      product: 'P2PP2P',
      payment_type: 'CREDIT_CARD',
      type: 'INSTALLMENT',
      sub_type: 'DEFAULT',
      priority: 1,
      value: '4.4900',
      value_type: 'PERCENTAGE',
      min_value: '0.0000',
      effective_interval: {
        start_date: '2025-03-03 00:00:00',
        end_date: '2025-04-04 23:59:59',
        approved: true
      },
      cluster: 'CLUSTER_XPTO',
      bin_list: ['123456'],
      variations: [
        {
          name: 'CONSUMER_ONBOARDING',
          value: '0.5000'
        }
      ],
      balancing_data: {
        convenience_value: '0.0000',
        progressive_discount_value: '0.0000'
      },
      active: true,
      fee_range: {
        min: '1.0000',
        max: '9.0000'
      }
    }
  }
}

export const feesApiService = new FeesApiService()