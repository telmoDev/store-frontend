<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useOrderStore } from '@/stores/orderStore';

const orderStore = useOrderStore();
const filters = ref({
    desde: '',
    hasta: '',
    minTotal: '',
});

const handleFilter = () => {
    orderStore.fetchOrders(filters.value);
};

onMounted(() => {
    orderStore.fetchOrders();
});

const getStatusClass = (status) => {
    return {
        'status-pending': status === 'pending',
        'status-completed': status === 'completed',
        'status-cancelled': status === 'cancelled',
    };
};
</script>

<template>
    <div class="orders-view">
        <h1 class="gradient-text">Mis Pedidos</h1>

        <div class="filters-bar glass-card">
            <div class="filter-group">
                <label>Desde</label>
                <input type="date" v-model="filters.desde" @change="handleFilter">
            </div>
            <div class="filter-group">
                <label>Hasta</label>
                <input type="date" v-model="filters.hasta" @change="handleFilter">
            </div>
            <div class="filter-group">
                <label>Total Min.</label>
                <input type="number" v-model="filters.minTotal" placeholder="0.00" @input="handleFilter">
            </div>
        </div>

        <div v-if="orderStore.loading" class="loading-state">
            <div class="spinner"></div>
            <p>Cargando historial...</p>
        </div>

        <div v-else-if="orderStore.error" class="error-state glass-card">
            <p class="error-msg">{{ orderStore.error }}</p>
            <button @click="orderStore.fetchOrders()" class="btn-primary">Reintentar</button>
        </div>

        <div v-else-if="orderStore.orders.length === 0" class="empty-orders glass-card">
            <p>No tienes pedidos registrados.</p>
            <RouterLink to="/" class="btn-primary">Empezar a comprar</RouterLink>
        </div>

        <div v-else class="orders-list">
            <div v-for="order in orderStore.orders" :key="order.id" class="order-card glass-card">
                <div class="order-header">
                    <div class="order-id">Pedido #{{ order.id }}</div>
                    <div class="order-status" :class="getStatusClass(order.status)">
                        {{ order.status === 'pending' ? 'Pendiente' : order.status === 'completed' ? 'Completado' : 'Cancelado' }}
                    </div>
                </div>
                <div class="order-body">
                    <div class="order-info">
                        <p><strong>Fecha:</strong> {{ new Date(order.created_at).toLocaleDateString() }}</p>
                        <p><strong>Total:</strong> ${{ order.total_amount || (order.products?.reduce((sum, p) => sum + (p.price * p.quantity), 0) || 0).toFixed(2) }}</p>
                    </div>
                    <RouterLink :to="`/orders/${order.id}`" class="btn-secondary">
                        Ver Detalles
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.orders-view {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.filters-bar {
    display: flex;
    gap: 2rem;
    padding: 1.5rem;
    flex-wrap: wrap;
}

.filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.filter-group label {
    font-size: 0.75rem;
    color: var(--text-muted);
}

.orders-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
    gap: 2.5rem;
}

.order-card {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--glass-border);
    padding-bottom: 1.25rem;
}

.order-id {
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--text-main);
}

.order-status {
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    padding: 0.4rem 1rem;
    border-radius: 999px;
    letter-spacing: 0.05em;
}

.status-pending { background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.2); }
.status-completed { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2); }
.status-cancelled { background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); }

.order-body {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.order-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.order-info p {
    margin: 0;
    font-size: 0.95rem;
    color: var(--text-muted);
}

.order-info strong {
    color: var(--text-main);
}

.btn-secondary {
    background: rgba(255,255,255,0.05);
    color: white;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    border-radius: 0.5rem;
    text-decoration: none;
    border: 1px solid var(--glass-border);
}

.error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 3rem;
    border: 1px solid #ef4444;
}

.error-msg {
    color: #ef4444;
    font-weight: 500;
}

@media (max-width: 640px) {
    .orders-list {
        grid-template-columns: 1fr;
    }
}
</style>
