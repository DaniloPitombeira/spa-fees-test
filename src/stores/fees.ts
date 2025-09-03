import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Fee, FeeFilters, FeesResponse } from '@/types/fee'
import { feesApiService } from '@/services/feesApi'

export const useFeesStore = defineStore('fees', () => {
  // State
  const fees = ref<Fee[]>([])
  const currentFee = ref<Fee | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const filters = ref<FeeFilters>({})
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0
  })

  // Getters
  const filteredFees = computed(() => fees.value)
  const hasNextPage = computed(() => 
    pagination.value.page * pagination.value.limit < pagination.value.total
  )
  const hasPrevPage = computed(() => pagination.value.page > 1)

  // Actions
  async function fetchFees(newFilters?: FeeFilters, page = 1) {
    loading.value = true
    error.value = null
    
    try {
      if (newFilters) {
        filters.value = { ...newFilters }
        pagination.value.page = 1 // Reset to first page when filtering
      } else {
        pagination.value.page = page
      }

      const response: FeesResponse = await feesApiService.getFees(
        filters.value,
        pagination.value.page,
        pagination.value.limit
      )
      
      fees.value = response.data
      pagination.value.total = response.total
      pagination.value.page = response.page
      pagination.value.limit = response.limit
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error fetching fees:', err)
    } finally {
      loading.value = false
    }
  }

  async function fetchFeeById(id: string) {
    loading.value = true
    error.value = null
    
    try {
      currentFee.value = await feesApiService.getFeeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error fetching fee:', err)
    } finally {
      loading.value = false
    }
  }

  function updateFilters(newFilters: FeeFilters) {
    filters.value = { ...filters.value, ...newFilters }
    fetchFees(filters.value)
  }

  function clearFilters() {
    filters.value = {}
    fetchFees()
  }

  function nextPage() {
    if (hasNextPage.value) {
      fetchFees(filters.value, pagination.value.page + 1)
    }
  }

  function prevPage() {
    if (hasPrevPage.value) {
      fetchFees(filters.value, pagination.value.page - 1)
    }
  }

  function goToPage(page: number) {
    if (page >= 1 && page <= Math.ceil(pagination.value.total / pagination.value.limit)) {
      fetchFees(filters.value, page)
    }
  }

  return {
    // State
    fees,
    currentFee,
    loading,
    error,
    filters,
    pagination,
    // Getters
    filteredFees,
    hasNextPage,
    hasPrevPage,
    // Actions
    fetchFees,
    fetchFeeById,
    updateFilters,
    clearFilters,
    nextPage,
    prevPage,
    goToPage
  }
})