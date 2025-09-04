<template>
  <div class="fees-view">
    <div class="page-header">
      <h1>Fees Management</h1>
      <p class="page-description">
        Buscador por Id ou outras função de taxas em Billing
      </p>
    </div>

    <!-- Filters Component -->
    <FeeFiltersComponent
      :filters="feesStore.filters"
      @update-filters="handleUpdateFilters"
      @clear-filters="handleClearFilters"
    />

    <!-- Fees List Component -->
    <FeesList
      :fees="feesStore.fees"
      :loading="feesStore.loading"
      :error="feesStore.error"
      :current-page="feesStore.pagination.page"
      :total="feesStore.pagination.total"
      :limit="feesStore.pagination.limit"
      :has-prev-page="feesStore.hasPrevPage"
      :has-next-page="feesStore.hasNextPage"
      @view-fee="handleViewFee"
      @next-page="feesStore.nextPage"
      @prev-page="feesStore.prevPage"
    />

    <!-- Fee Details Modal -->
    <FeeModal
      :is-visible="showModal"
      :fee="selectedFee"
      :loading="modalLoading"
      :error="modalError"
      @close="handleCloseModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFeesStore } from '@/stores/fees'
import type { Fee, FeeFilters } from '@/types/fee'
import FeeFiltersComponent from '@/components/FeeFilters.vue'
import FeesList from '@/components/FeesList.vue'
import FeeModal from '@/components/FeeModal.vue'

// Store
const feesStore = useFeesStore()

// Modal state
const showModal = ref(false)
const selectedFee = ref<Fee | null>(null)
const modalLoading = ref(false)
const modalError = ref<string | null>(null)

// Event handlers
const handleUpdateFilters = (filters: FeeFilters) => {
  feesStore.updateFilters(filters)
}

const handleClearFilters = () => {
  feesStore.clearFilters()
}

const handleViewFee = async (fee: Fee) => {
  selectedFee.value = fee
  showModal.value = true
  modalLoading.value = true
  modalError.value = null

  try {
    // Fetch detailed fee information
    await feesStore.fetchFeeById(fee.id)
    selectedFee.value = feesStore.currentFee
  } catch (error) {
    modalError.value = error instanceof Error ? error.message : 'Failed to load fee details'
  } finally {
    modalLoading.value = false
  }
}

const handleCloseModal = () => {
  showModal.value = false
  selectedFee.value = null
  modalError.value = null
}

// Initialize
onMounted(() => {
  feesStore.fetchFees()
})
</script>

<style scoped>
.fees-view {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 24px;
  width: 100%;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
  padding: 24px 0;
}

.page-header h1 {
  margin: 0 0 12px 0;
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 700;
}

.page-description {
  margin: 0;
  color: #7f8c8d;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .fees-view {
    padding: 16px;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .page-description {
    font-size: 1rem;
  }
}
</style>