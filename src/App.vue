<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <header class="app-header">
      <div class="header-content">
        <div class="logo-section">
          <h1>SPA Fees</h1>
          <p>Fee Management System</p>
        </div>
        
        <nav class="main-nav">
          <RouterLink to="/" class="nav-link">Home</RouterLink>
          <RouterLink to="/fees" class="nav-link">Fees</RouterLink>
          <RouterLink to="/about" class="nav-link">About</RouterLink>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: #2c3e50;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 70px;
}

.logo-section h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: #3498db;
}

.logo-section p {
  margin: 0;
  font-size: 0.9rem;
  color: #bdc3c7;
}

.main-nav {
  display: flex;
  gap: 24px;
}

.nav-link {
  color: #ecf0f1;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.2s;
}

.nav-link:hover {
  background: #34495e;
  color: #3498db;
}

.nav-link.router-link-active {
  background: #3498db;
  color: white;
}

.main-content {
  flex: 1;
  background: #f8f9fa;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    padding: 16px;
    gap: 16px;
    min-height: auto;
  }
  
  .logo-section {
    text-align: center;
  }
  
  .main-nav {
    gap: 12px;
  }
  
  .nav-link {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
}
</style>
