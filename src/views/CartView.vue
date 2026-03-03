<script setup>
import { RouterLink } from 'vue-router';
import { useCartStore } from '@/stores/cartStore';

const cartStore = useCartStore();

const removeItem = (id) => {
    cartStore.removeItem(id);
};

const updateQuantity = (id, quantity) => {
    cartStore.updateQuantity(id, quantity);
};
</script>

<template>
    <div class="cart-view">
        <h1 class="gradient-text">Tu Carrito</h1>

        <div v-if="cartStore.items.length === 0" class="empty-cart glass-card">
            <p>Tu carrito está vacío.</p>
            <RouterLink to="/" class="btn-primary">Ir a la tienda</RouterLink>
        </div>

        <div v-else class="cart-content">
            <div class="cart-items glass-card">
                <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
                    <div class="item-info">
                        <h3>{{ item.name }}</h3>
                        <p class="item-price">${{ item.price }}</p>
                    </div>
                    <div class="item-actions">
                        <div class="quantity-controls">
                            <button @click="updateQuantity(item.id, item.quantity - 1)">-</button>
                            <span>{{ item.quantity }}</span>
                            <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
                        </div>
                        <button @click="removeItem(item.id)" class="btn-remove">Eliminar</button>
                    </div>
                </div>
            </div>

            <div class="cart-summary glass-card">
                <h2>Resumen</h2>
                <div class="summary-row">
                    <span>Productos ({{ cartStore.itemsCount }})</span>
                    <span>${{ cartStore.totalAmount.toFixed(2) }}</span>
                </div>
                <div class="summary-row total">
                    <span>Total</span>
                    <span>${{ cartStore.totalAmount.toFixed(2) }}</span>
                </div>
                <RouterLink to="/checkout" class="btn-primary checkout-btn">
                    Proceder al Pago
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cart-view {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 4rem;
}

.cart-content {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 2rem;
}

.cart-items {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--glass-border);
}

.cart-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.item-info h3 {
    margin: 0;
}

.item-price {
    color: var(--accent);
    font-weight: 600;
}

.item-actions {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: rgba(255,255,255,0.05);
    border-radius: 0.5rem;
    padding: 0.25rem;
}

.quantity-controls button {
    padding: 0.25rem 0.75rem;
    background: transparent;
    color: white;
}

.btn-remove {
    background: transparent;
    color: #ef4444;
    font-size: 0.875rem;
    padding: 0.5rem;
}

.cart-summary {
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    color: var(--text-muted);
}

.summary-row.total {
    color: var(--text-main);
    font-size: 1.25rem;
    font-weight: 700;
    border-top: 1px solid var(--glass-border);
    padding-top: 1rem;
}

.checkout-btn {
    text-align: center;
}

@media (max-width: 1024px) {
    .cart-content {
        grid-template-columns: 1fr;
    }
}
</style>
