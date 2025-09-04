<template>
  <div class="fees-list">
    <div class="list-header">
      <h2>Fees List</h2>
      <div class="results-info">
        <span v-if="!loading">
          Showing {{ startIndex }} - {{ endIndex }} of {{ total }} fees
        </span>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading fees...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error">
      <p>Error: {{ error }}</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="fees.length === 0" class="empty-state">
      <p>No fees found matching your criteria.</p>
    </div>

    <!-- Fees Table -->
    <div v-else class="table-container">
      <table class="fees-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Payment Type</th>
            <th>Type</th>
            <th>Sub Type</th>
            <th>Value</th>
            <th>Value Type</th>
            <th>Cluster</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fee in fees" :key="fee.id" class="fee-row">
            <td class="fee-id">{{ fee.id }}</td>
            <td>{{ fee.product }}</td>
            <td>{{ fee.payment_type }}</td>
            <td>
              <span class="type-badge" :class="`type-${fee.type.toLowerCase()}`">
                {{ fee.type }}
              </span>
            </td>
            <td>{{ fee.sub_type }}</td>
            <td class="amount">{{ formatValue(fee.value) }}</td>
            <td class="value-type">
              <span class="value-type-badge" :class="`value-type-${fee.value_type.toLowerCase()}`">
                {{ fee.value_type }}
              </span>
            </td>
            <td>{{ fee.cluster }}</td>
            <td>
              <span class="status-badge" :class="fee.active ? 'status-active' : 'status-inactive'">
                {{ fee.active ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td>
              <button @click="$emit('viewFee', fee)" class="view-btn">
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="!loading && fees.length > 0" class="pagination">
      <button 
        @click="$emit('prevPage')" 
        :disabled="!hasPrevPage" 
        class="page-btn"
      >
        Previous
      </button>
      
      <div class="page-info">
        <span>Page {{ currentPage }}</span>
        <span class="page-input">
          of {{ totalPages }}
        </span>
      </div>
      
      <button 
        @click="$emit('nextPage')" 
        :disabled="!hasNextPage" 
        class="page-btn"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Fee } from '@/types/fee'

// Props
interface Props {
  fees: Fee[]
  loading: boolean
  error: string | null
  currentPage: number
  total: number
  limit: number
  hasPrevPage: boolean
  hasNextPage: boolean
}

const props = defineProps<Props>()

// Emits
defineEmits<{
  viewFee: [fee: Fee]
  nextPage: []
  prevPage: []
}>()

// Computed properties
const totalPages = computed(() => Math.ceil(props.total / props.limit))
const startIndex = computed(() => (props.currentPage - 1) * props.limit + 1)
const endIndex = computed(() => Math.min(props.currentPage * props.limit, props.total))

// Helper functions
const formatValue = (value: string): string => {
  return parseFloat(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  })
}
</script>

<style scoped>
.fees-list {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  width: 100%;
  border: 1px solid #e2e8f0;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.list-header h2 {
  margin: 0;
  color: #1e293b;
  font-size: 1.5rem;
}

.results-info {
  color: #64748b;
  font-size: 0.9rem;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #000000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  padding: 24px;
  text-align: center;
  color: #dc2626;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
}

.empty-state {
  padding: 48px;
  text-align: center;
  color: #64748b;
}

.table-container {
  overflow-x: auto;
  margin-bottom: 24px;
}

.fees-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1000px;
  table-layout: auto;
}

.fees-table th,
.fees-table td {
  padding: 12px 8px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

@media (min-width: 1200px) {
  .fees-table th,
  .fees-table td {
    padding: 16px 12px;
  }
}

.fees-table th {
  background: #f1f5f9;
  font-weight: 600;
  color: #374151;
  position: sticky;
  top: 0;
}

.fee-row:hover {
  background: #f8fafc;
}

.fee-id {
  font-family: monospace;
  font-weight: 600;
  color: #000000;
}

.type-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.type-transaction {
  background: #dcfce7;
  color: #166534;
}

.type-service {
  background: #f0f0f0;
  color: #000000;
}

.type-processing {
  background: #dcfce7;
  color: #166534;
}

.type-installment {
  background: #fce7f3;
  color: #be185d;
}

.value-type-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.value-type-percentage {
  background: #f1f5f9;
  color: #475569;
}

.value-type-fixed {
  background: #f0f0f0;
  color: #000000;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-active {
  background: #dcfce7;
  color: #166534;
}

.status-inactive {
  background: #fee2e2;
  color: #dc2626;
}

.amount {
  font-weight: 600;
  text-align: right;
}

.value-type {
  font-weight: 600;
  color: #7f8c8d;
}

.view-btn {
  background: #000000;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background-color 0.2s;
}

.view-btn:hover {
  background: #333333;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

.page-btn {
  background: #000000;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.page-btn:hover:not(:disabled) {
  background: #333333;
}

.page-btn:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.page-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #2c3e50;
  font-weight: 600;
}

@media (max-width: 768px) {
  .list-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .pagination {
    flex-direction: column;
    gap: 16px;
  }
}
</style>