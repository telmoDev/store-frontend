<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCartStore } from './stores/cartStore'

const cartStore = useCartStore()
</script>

<template>
  <header>
    <RouterLink to="/" class="logo-text">
      <span class="gradient-text">VUE</span>STORE
    </RouterLink>

    <nav class="nav-links">
      <RouterLink to="/">Productos</RouterLink>
      <RouterLink to="/orders">Mis Pedidos</RouterLink>
      <RouterLink to="/about">Nosotros</RouterLink>
    </nav>

    <div class="header-actions">
      <RouterLink to="/cart" class="cart-link">
        <span class="cart-icon">🛒</span>
        <span v-if="cartStore.itemsCount > 0" class="cart-badge">{{ cartStore.itemsCount }}</span>
      </RouterLink>
    </div>
  </header>

  <main class="page-container">
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </main>
</template>

<style>
.logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -1px;
  text-decoration: none;
  color: var(--text-main);
}

.gradient-text {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-container {
  margin-top: 2rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.header-actions {
  display: flex;
  align-items: center;
}

.cart-link {
  text-decoration: none;
  position: relative;
  padding: 0.5rem;
}

.cart-icon {
  font-size: 1.5rem;
}
</style>
