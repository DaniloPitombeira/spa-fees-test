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

      <!-- Consumer Filter -->
      <div class="filter-group">
        <label for="consumer">Consumer</label>
        <input
          id="consumer"
          v-model="localFilters.consumer"
          type="text"
          placeholder="Filter by consumer..."
          @input="debouncedUpdate"
        />
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
  return Object.values(localFilters.value).some(value => value && value.length > 0)
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
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.filters-header h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
}

.clear-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.clear-btn:hover:not(:disabled) {
  background: #c0392b;
}

.clear-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #2c3e50;
  font-size: 0.9rem;
}

.filter-group input {
  padding: 12px;
  border: 2px solid #ecf0f1;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.filter-group input:focus {
  outline: none;
  border-color: #3498db;
}

.filter-group input::placeholder {
  color: #95a5a6;
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