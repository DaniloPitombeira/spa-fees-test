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
  background: linear-gradient(135deg, #1e3a8a, #1e40af);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.header-content {
  width: 100%;
  margin: 0;
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
  color: #fbbf24;
}

.logo-section p {
  margin: 0;
  font-size: 0.9rem;
  color: #e5e7eb;
}

.main-nav {
  display: flex;
  gap: 24px;
}

.nav-link {
  color: #f3f4f6;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fbbf24;
}

.nav-link.router-link-active {
  background: #fbbf24;
  color: #1e3a8a;
}

.main-content {
  flex: 1;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
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
