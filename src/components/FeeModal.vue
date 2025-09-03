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
              <label>Type</label>
              <span class="type-badge" :class="`type-${fee.type.toLowerCase()}`">
                {{ fee.type }}
              </span>
            </div>
            
            <div class="detail-item">
              <label>Cluster</label>
              <span>{{ fee.cluster }}</span>
            </div>
            
            <div class="detail-item">
              <label>Consumer</label>
              <span>{{ fee.consumer }}</span>
            </div>
            
            <div class="detail-item">
              <label>Amount</label>
              <span class="amount">{{ formatAmount(fee.amount) }}</span>
            </div>
            
            <div class="detail-item">
              <label>Currency</label>
              <span class="currency">{{ fee.currency }}</span>
            </div>
            
            <div class="detail-item">
              <label>Created At</label>
              <span>{{ formatDate(fee.createdAt) }}</span>
            </div>
            
            <div class="detail-item">
              <label>Updated At</label>
              <span>{{ formatDate(fee.updatedAt) }}</span>
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

const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
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
  border-bottom: 1px solid #ecf0f1;
  margin-bottom: 24px;
}

.modal-header h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #95a5a6;
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
  background: #ecf0f1;
  color: #2c3e50;
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
  border: 4px solid #ecf0f1;
  border-top: 4px solid #3498db;
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
  color: #e74c3c;
  background: #fdf2f2;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
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

.detail-item label {
  font-weight: 600;
  color: #7f8c8d;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-item span {
  color: #2c3e50;
  font-size: 1rem;
  padding: 8px 0;
}

.fee-id {
  font-family: monospace;
  font-weight: 600;
  color: #3498db;
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
  background: #d4edda;
  color: #155724;
}

.type-service {
  background: #d1ecf1;
  color: #0c5460;
}

.type-processing {
  background: #fff3cd;
  color: #856404;
}

.amount {
  font-weight: 600;
  font-size: 1.2rem;
  color: #27ae60;
}

.currency {
  font-weight: 600;
  color: #7f8c8d;
}

.modal-footer {
  padding: 24px;
  border-top: 1px solid #ecf0f1;
  display: flex;
  justify-content: flex-end;
}

.close-modal-btn {
  background: #95a5a6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.close-modal-btn:hover {
  background: #7f8c8d;
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