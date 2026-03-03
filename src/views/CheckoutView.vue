<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cartStore';
import { useOrderStore } from '@/stores/orderStore';

const cartStore = useCartStore();
const orderStore = useOrderStore();
const router = useRouter();

const form = ref({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    customer_address: '',
});

const isSubmitting = ref(false);
const error = ref(null);

const handleSubmit = async () => {
    isSubmitting.ref = true;
    error.value = null;

    try {
        const orderData = {
            ...form.value,
            total_amount: cartStore.totalAmount,
            products: cartStore.items.map(item => ({
                product_id: item.id,
                quantity: item.quantity,
                price: item.price,
            })),
        };

        const result = await orderStore.createOrder(orderData);
        cartStore.clearCart();
        router.push(`/orders/${result.id}`);
    } catch (err) {
        error.value = err.message || 'Error al procesar el pedido';
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<template>
    <div class="checkout-view">
        <h1 class="gradient-text">Finalizar Pedido</h1>

        <div v-if="cartStore.items.length === 0" class="empty-checkout">
            <p>No hay productos para procesar.</p>
            <button @click="router.push('/')" class="btn-primary">Volver a la tienda</button>
        </div>

        <div v-else class="checkout-grid">
            <div class="checkout-form glass-card">
                <h2>Información de Envío</h2>
                <form @submit.prevent="handleSubmit">
                    <div class="form-group">
                        <label>Nombre Completo</label>
                        <input v-model="form.customer_name" required type="text" placeholder="Ej: Juan Pérez">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input v-model="form.customer_email" required type="email" placeholder="juan@example.com">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Teléfono</label>
                            <input v-model="form.customer_phone" required type="tel" placeholder="+56 9 ...">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Dirección</label>
                        <input v-model="form.customer_address" required type="text" placeholder="Calle, Número, Ciudad">
                    </div>

                    <div v-if="error" class="error-msg">{{ error }}</div>

                    <button type="submit" class="btn-primary submit-btn" :disabled="isSubmitting">
                        {{ isSubmitting ? 'Procesando...' : 'Confirmar Pedido' }}
                    </button>
                </form>
            </div>

            <div class="checkout-summary glass-card">
                <h2>Tu Pedido</h2>
                <div class="checkout-items">
                    <div v-for="item in cartStore.items" :key="item.id" class="checkout-item">
                        <span>{{ item.quantity }}x {{ item.name }}</span>
                        <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
                    </div>
                </div>
                <div class="summary-total">
                    <span>Total a pagar</span>
                    <span class="price">${{ cartStore.totalAmount.toFixed(2) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.checkout-view {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.checkout-grid {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 2rem;
}

.checkout-form form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-group label {
    font-size: 0.875rem;
    color: var(--text-muted);
}

.submit-btn {
    margin-top: 1rem;
    padding: 1rem;
}

.checkout-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1.5rem 0;
    border-bottom: 1px solid var(--glass-border);
    padding-bottom: 1.5rem;
}

.checkout-item {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    color: var(--text-muted);
}

.summary-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
}

.summary-total .price {
    font-size: 1.5rem;
    color: var(--primary);
}

.error-msg {
    color: #ef4444;
    font-size: 0.875rem;
}

@media (max-width: 1024px) {
    .checkout-grid {
        grid-template-columns: 1fr;
    }
}
</style>
