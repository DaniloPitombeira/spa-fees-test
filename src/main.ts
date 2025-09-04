import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { feesApiService } from '@/services/feesApi'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Expose API service for testing in development
if (import.meta.env.DEV) {
  // @ts-expect-error - Exposing for development testing
  window.feesApiService = feesApiService
  
  // Add convenience method for QA integration testing
  // @ts-expect-error - Exposing for development testing
  window.testQaIntegration = async () => {
    console.log('🧪 Testing QA environment integration...')
    const result = await feesApiService.testQaIntegration()
    console.log(result.success ? '✅' : '❌', result.message)
    if (result.data) {
      console.log('📊 Response data:', result.data)
    }
    return result
  }
  
  console.log('🚀 Development mode: feesApiService and testQaIntegration() available in console')
}
