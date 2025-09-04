<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="home-view">
    <div class="hero-section">
      <div class="hero-content">
        <h1>Welcome to SPA Fees</h1>
        <p class="hero-description">
          A modern Vue.js Single Page Application for managing and visualizing fees.
          Search and filter fees by Product, Type, Cluster, Consumer, and ID with ease.
        </p>
        
        <div class="hero-actions">
          <RouterLink to="/fees" class="cta-button primary">
            View Fees
          </RouterLink>
          <RouterLink to="/about" class="cta-button secondary">
            Learn More
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="features-section">
      <div class="features-container">
        <h2>Key Features</h2>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <h3>Advanced Search</h3>
            <p>Search fees across multiple fields with real-time filtering and instant results.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h3>Data Visualization</h3>
            <p>View fees in a clean, organized table with detailed information and easy navigation.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">⚙️</div>
            <h3>Configurable</h3>
            <p>Environment-based configuration for seamless integration with ms-fees services.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3>Responsive Design</h3>
            <p>Optimized for all devices - desktop, tablet, and mobile with modern UI/UX.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  color: white;
  padding: 80px 24px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 24px 0;
  line-height: 1.2;
}

.hero-description {
  font-size: 1.3rem;
  line-height: 1.6;
  margin: 0 0 40px 0;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  padding: 16px 32px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: inline-block;
}

.cta-button.primary {
  background: #fbbf24;
  color: #1e3a8a;
}

.cta-button.primary:hover {
  background: #f59e0b;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(251, 191, 36, 0.3);
}

.cta-button.secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.cta-button.secondary:hover {
  background: white;
  color: #1e3a8a;
  transform: translateY(-2px);
}

.features-section {
  padding: 80px 24px;
  background: transparent;
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
}

.features-container h2 {
  text-align: center;
  font-size: 2.5rem;
  color: #1e293b;
  margin: 0 0 60px 0;
  font-weight: 700;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
}

.feature-card {
  background: white;
  padding: 32px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.feature-card h3 {
  color: #1e293b;
  font-size: 1.5rem;
  margin: 0 0 16px 0;
  font-weight: 600;
}

.feature-card p {
  color: #64748b;
  line-height: 1.6;
  margin: 0;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 1.1rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-button {
    width: 200px;
  }
  
  .features-container h2 {
    font-size: 2rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .feature-card {
    padding: 24px;
  }
}
</style>
