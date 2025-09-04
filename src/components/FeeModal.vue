<template>
  <Teleport to="body">
    <div v-if="isVisible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Fee Details</h2>
          <button @click="closeModal" class="close-btn" aria-label="Close modal">
            ×
          </button>
        </div>
        
        <div v-if="loading" class="modal-loading">
          <div class="spinner"></div>
          <p>Loading fee details...</p>
        </div>
        
        <div v-else-if="error" class="modal-error">
          <p>Error: {{ error }}</p>
        </div>
        
        <div v-else-if="fee" class="fee-details">
          <div class="detail-grid">
            <div class="detail-item">
              <label>ID</label>
              <span class="fee-id">{{ fee.id }}</span>
            </div>
            
            <div class="detail-item">
              <label>Product</label>
              <span>{{ fee.product }}</span>
            </div>
            
            <div class="detail-item">
              <label>Payment Type</label>
              <span>{{ fee.payment_type }}</span>
            </div>
            
            <div class="detail-item">
              <label>Type</label>
              <span class="type-badge" :class="`type-${fee.type.toLowerCase()}`">
                {{ fee.type }}
              </span>
            </div>
            
            <div class="detail-item">
              <label>Sub Type</label>
              <span>{{ fee.sub_type }}</span>
            </div>
            
            <div class="detail-item">
              <label>Priority</label>
              <span class="priority">{{ fee.priority }}</span>
            </div>
            
            <div class="detail-item">
              <label>Value</label>
              <span class="amount">{{ formatValue(fee.value) }}</span>
            </div>
            
            <div class="detail-item">
              <label>Value Type</label>
              <span class="value-type-badge" :class="`value-type-${fee.value_type.toLowerCase()}`">
                {{ fee.value_type }}
              </span>
            </div>
            
            <div class="detail-item">
              <label>Min Value</label>
              <span>{{ formatValue(fee.min_value) }}</span>
            </div>
            
            <div class="detail-item">
              <label>Cluster</label>
              <span>{{ fee.cluster }}</span>
            </div>
            
            <div class="detail-item">
              <label>Status</label>
              <span class="status-badge" :class="fee.active ? 'status-active' : 'status-inactive'">
                {{ fee.active ? 'Active' : 'Inactive' }}
              </span>
            </div>
            
            <div class="detail-item full-width">
              <label>Effective Period</label>
              <div class="date-range">
                <span>{{ formatDate(fee.effective_interval.start_date) }}</span>
                <span class="to">to</span>
                <span>{{ formatDate(fee.effective_interval.end_date) }}</span>
                <span class="approval-status" :class="fee.effective_interval.approved ? 'approved' : 'pending'">
                  {{ fee.effective_interval.approved ? 'Approved' : 'Pending Approval' }}
                </span>
              </div>
            </div>
            
            <div class="detail-item full-width">
              <label>Fee Range</label>
              <div class="fee-range">
                <span>Min: {{ formatValue(fee.fee_range.min) }}</span>
                <span>Max: {{ formatValue(fee.fee_range.max) }}</span>
              </div>
            </div>
            
            <div class="detail-item full-width" v-if="fee.bin_list.length > 0">
              <label>BIN List</label>
              <div class="bin-list">
                <span v-for="bin in fee.bin_list" :key="bin" class="bin-item">{{ bin }}</span>
              </div>
            </div>
            
            <div class="detail-item full-width" v-if="fee.variations.length > 0">
              <label>Variations</label>
              <div class="variations">
                <div v-for="variation in fee.variations" :key="variation.name" class="variation-item">
                  <span class="variation-name">{{ variation.name }}</span>
                  <span class="variation-value">{{ formatValue(variation.value) }}</span>
                </div>
              </div>
            </div>
            
            <div class="detail-item full-width">
              <label>Balancing Data</label>
              <div class="balancing-data">
                <div class="balancing-item">
                  <span class="balancing-label">Convenience Value:</span>
                  <span>{{ formatValue(fee.balancing_data.convenience_value) }}</span>
                </div>
                <div class="balancing-item">
                  <span class="balancing-label">Progressive Discount:</span>
                  <span>{{ formatValue(fee.balancing_data.progressive_discount_value) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="closeModal" class="close-modal-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import type { Fee } from '@/types/fee'

// Props
interface Props {
  isVisible: boolean
  fee: Fee | null
  loading: boolean
  error: string | null
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  close: []
}>()

// Methods
const closeModal = () => {
  emit('close')
}

const formatValue = (value: string): string => {
  return parseFloat(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  })
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Handle escape key
watch(
  () => props.isVisible,
  (isVisible) => {
    if (isVisible) {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          closeModal()
        }
      }
      document.addEventListener('keydown', handleEscape)
      
      // Cleanup on close
      return () => {
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }
)
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 24px;
}

.modal-header h2 {
  margin: 0;
  color: #1e293b;
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #64748b;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s;
}

.close-btn:hover {
  background: #f1f5f9;
  color: #1e293b;
}

.modal-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 24px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #1e40af;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.modal-error {
  padding: 24px;
  text-align: center;
  color: #dc2626;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  margin: 0 24px 24px;
}

.fee-details {
  padding: 0 24px 24px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

.detail-item label {
  font-weight: 600;
  color: #64748b;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-item span {
  color: #1e293b;
  font-size: 1rem;
  padding: 8px 0;
}

.fee-id {
  font-family: monospace;
  font-weight: 600;
  color: #1e40af;
  font-size: 1.1rem;
}

.type-badge {
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  width: fit-content;
}

.type-transaction {
  background: #dcfce7;
  color: #166534;
}

.type-service {
  background: #dbeafe;
  color: #1e40af;
}

.type-processing {
  background: #fef3c7;
  color: #92400e;
}

.type-installment {
  background: #fce7f3;
  color: #be185d;
}

.value-type-badge {
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  width: fit-content;
}

.value-type-percentage {
  background: #f1f5f9;
  color: #475569;
}

.value-type-fixed {
  background: #e0f2fe;
  color: #0369a1;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  width: fit-content;
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
  font-size: 1.2rem;
  color: #059669;
}

.priority {
  font-weight: 600;
  font-size: 1.1rem;
  color: #ea580c;
}

.date-range {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.date-range .to {
  color: #64748b;
  font-style: italic;
}

.approval-status {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.approval-status.approved {
  background: #dcfce7;
  color: #166534;
}

.approval-status.pending {
  background: #fef3c7;
  color: #92400e;
}

.fee-range {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.fee-range span {
  padding: 8px 12px;
  background: #f1f5f9;
  border-radius: 6px;
  font-weight: 600;
}

.bin-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.bin-item {
  padding: 6px 12px;
  background: #f1f5f9;
  border-radius: 16px;
  font-family: monospace;
  font-size: 0.9rem;
  font-weight: 600;
}

.variations {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.variation-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f8fafc;
  border-radius: 6px;
  border-left: 4px solid #1e40af;
}

.variation-name {
  font-weight: 600;
  color: #1e293b;
}

.variation-value {
  font-weight: 600;
  color: #059669;
}

.balancing-data {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.balancing-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f8fafc;
  border-radius: 6px;
}

.balancing-label {
  font-weight: 600;
  color: #1e293b;
}

.modal-footer {
  padding: 24px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
}

.close-modal-btn {
  background: #64748b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.close-modal-btn:hover {
  background: #475569;
}

@media (max-width: 768px) {
  .modal-content {
    margin: 10px;
    max-height: calc(100vh - 20px);
  }
  
  .detail-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .modal-header {
    padding: 16px;
    margin-bottom: 16px;
  }
  
  .fee-details {
    padding: 0 16px 16px;
  }
  
  .modal-footer {
    padding: 16px;
  }
}
</style>