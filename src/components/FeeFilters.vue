<template>
  <div class="fee-filters">
    <div class="filters-header">
      <h2>Search Fees</h2>
      <button @click="clearFilters" class="clear-btn" :disabled="!hasActiveFilters">
        Clear Filters
      </button>
    </div>
    
    <div class="filters-grid">
      <!-- Global Search -->
      <div class="filter-group">
        <label for="search">Global Search</label>
        <input
          id="search"
          v-model="localFilters.search"
          type="text"
          placeholder="Search across all fields..."
          @input="debouncedUpdate"
        />
      </div>

      <!-- ID Filter -->
      <div class="filter-group">
        <label for="id">ID</label>
        <input
          id="id"
          v-model="localFilters.id"
          type="text"
          placeholder="Filter by ID..."
          @input="debouncedUpdate"
        />
      </div>

      <!-- Product Filter -->
      <div class="filter-group">
        <label for="product">Product</label>
        <input
          id="product"
          v-model="localFilters.product"
          type="text"
          placeholder="Filter by product..."
          @input="debouncedUpdate"
        />
      </div>

      <!-- Payment Type Filter -->
      <div class="filter-group">
        <label for="payment_type">Payment Type</label>
        <input
          id="payment_type"
          v-model="localFilters.payment_type"
          type="text"
          placeholder="Filter by payment type..."
          @input="debouncedUpdate"
        />
      </div>

      <!-- Type Filter -->
      <div class="filter-group">
        <label for="type">Type</label>
        <input
          id="type"
          v-model="localFilters.type"
          type="text"
          placeholder="Filter by type..."
          @input="debouncedUpdate"
        />
      </div>

      <!-- Sub Type Filter -->
      <div class="filter-group">
        <label for="sub_type">Sub Type</label>
        <input
          id="sub_type"
          v-model="localFilters.sub_type"
          type="text"
          placeholder="Filter by sub type..."
          @input="debouncedUpdate"
        />
      </div>

      <!-- Cluster Filter -->
      <div class="filter-group">
        <label for="cluster">Cluster</label>
        <input
          id="cluster"
          v-model="localFilters.cluster"
          type="text"
          placeholder="Filter by cluster..."
          @input="debouncedUpdate"
        />
      </div>

      <!-- Active Status Filter -->
      <div class="filter-group">
        <label for="active">Status</label>
        <select
          id="active"
          v-model="localFilters.active"
          @change="debouncedUpdate"
        >
          <option value="">All</option>
          <option :value="true">Active</option>
          <option :value="false">Inactive</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { FeeFilters } from '@/types/fee'

// Props
interface Props {
  filters: FeeFilters
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  updateFilters: [filters: FeeFilters]
  clearFilters: []
}>()

// Local state
const localFilters = ref<FeeFilters>({ ...props.filters })

// Computed
const hasActiveFilters = computed(() => {
  return Object.entries(localFilters.value).some(([key, value]) => {
    if (key === 'active') {
      return value !== undefined && value !== null
    }
    return value && typeof value === 'string' && value.length > 0
  })
})

// Debounced update function
let debounceTimer: number | null = null

const debouncedUpdate = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  
  debounceTimer = setTimeout(() => {
    emit('updateFilters', { ...localFilters.value })
  }, 300)
}

// Clear filters
const clearFilters = () => {
  localFilters.value = {}
  emit('clearFilters')
}

// Watch for external filter changes
watch(
  () => props.filters,
  (newFilters) => {
    localFilters.value = { ...newFilters }
  },
  { deep: true }
)
</script>

<style scoped>
.fee-filters {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
  width: 100%;
  border: 1px solid #e2e8f0;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.filters-header h2 {
  margin: 0;
  color: #1e293b;
  font-size: 1.5rem;
}

.clear-btn {
  background: #dc2626;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.clear-btn:hover:not(:disabled) {
  background: #b91c1c;
}

.clear-btn:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

@media (min-width: 1200px) {
  .filters-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1600px) {
  .filters-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #374151;
  font-size: 0.9rem;
}

.filter-group input,
.filter-group select {
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
  background: white;
}

.filter-group input:focus,
.filter-group select:focus {
  outline: none;
  border-color: #1e40af;
  box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
}

.filter-group input::placeholder {
  color: #9ca3af;
}

@media (max-width: 768px) {
  .filters-grid {
    grid-template-columns: 1fr;
  }
  
  .filters-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
}
</style>