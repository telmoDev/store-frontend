<script setup>
import { onMounted } from 'vue';
import { useOrderStore } from '@/stores/orderStore';

const props = defineProps({
    id: {
        type: [String, Number],
        required: true
    }
});

const orderStore = useOrderStore();

onMounted(() => {
    orderStore.fetchOrder(props.id);
});
</script>

<template>
    <div class="order-detail-view">
        <div v-if="orderStore.loading" class="loading-state">
            <div class="spinner"></div>
            <p>Cargando detalles...</p>
        </div>

        <div v-else-if="orderStore.currentOrder" class="detail-container">
            <div class="detail-header">
                <h1 class="gradient-text">Pedido #{{ orderStore.currentOrder.id }}</h1>
                <div class="order-date">{{ new Date(orderStore.currentOrder.created_at).toLocaleDateString() }}</div>
            </div>

            <div class="detail-grid">
                <div class="customer-info glass-card">
                    <h2>Datos del Cliente</h2>
                    <div class="info-row">
                        <strong>Nombre:</strong> {{ orderStore.currentOrder.customer_name }}
                    </div>
                    <div class="info-row">
                        <strong>Email:</strong> {{ orderStore.currentOrder.customer_email }}
                    </div>
                    <div class="info-row">
                        <strong>Teléfono:</strong> {{ orderStore.currentOrder.customer_phone }}
                    </div>
                    <div class="info-row">
                        <strong>Dirección:</strong> {{ orderStore.currentOrder.customer_address }}
                    </div>
                </div>

                <div class="order-items glass-card">
                    <h2>Productos</h2>
                    <div class="items-list">
                        <div v-for="item in orderStore.currentOrder.products" :key="item.id" class="detail-item">
                            <div class="item-main">
                                <span class="item-qty">{{ item.quantity }}x</span>
                                <span class="item-name">{{ item.product?.name || 'Producto' }}</span>
                            </div>
                            <span class="item-price">${{ (item.price * item.quantity).toFixed(2) }}</span>
                        </div>
                    </div>
                    <div class="detail-total">
                        <span>Total del Pedido</span>
                        <span class="total-price">${{ orderStore.currentOrder.total_amount || (orderStore.currentOrder.products?.reduce((sum, p) => sum + (p.price * p.quantity), 0) || 0).toFixed(2) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.order-detail-view {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.order-date {
    color: var(--text-muted);
}

.detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
}

.customer-info h2, .order-items h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
}

.info-row {
    font-size: 1rem;
    margin-bottom: 1.25rem;
    display: flex;
    gap: 1rem;
}

.info-row strong {
    color: var(--text-muted);
    width: 120px;
}

.items-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2.5rem;
}

.detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.item-qty {
    color: var(--primary);
    font-weight: 800;
    margin-right: 0.75rem;
}

.item-name {
    font-weight: 600;
}

.detail-total {
    margin-top: auto;
    border-top: 1px solid var(--glass-border);
    padding-top: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.detail-total span:first-child {
    font-weight: 600;
    color: var(--text-muted);
}

.total-price {
    font-size: 2.25rem;
    font-weight: 800;
    color: var(--text-main);
}

@media (max-width: 1024px) {
    .detail-grid {
        grid-template-columns: 1fr;
    }
}
</style>
