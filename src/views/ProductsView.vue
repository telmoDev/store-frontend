<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';
import { useCartStore } from '@/stores/cartStore';

const productStore = useProductStore();
const cartStore = useCartStore();

const handleSearch = (e) => {
    productStore.setSearch(e.target.value);
};

const handleSort = (e) => {
    productStore.setSort(e.target.value);
};

const addToCart = (product) => {
    cartStore.addItem(product);
};

onMounted(() => {
    productStore.fetchProducts();
});
</script>

<template>
    <div class="products-view">
        <div class="view-header">
            <h1 class="gradient-text">Nuestros Productos</h1>
            <div class="filters-bar glass-card">
                <div class="search-box">
                    <input 
                        type="text" 
                        placeholder="Buscar productos..." 
                        @input="handleSearch"
                        :value="productStore.filters.search"
                    >
                </div>
                <div class="sort-box">
                    <select @change="handleSort" :value="productStore.filters.sort">
                        <option value="">Ordenar por</option>
                        <option value="price_asc">Precio: Bajo a Alto</option>
                        <option value="price_desc">Precio: Alto a Bajo</option>
                        <option value="name_asc">Nombre: A-Z</option>
                    </select>
                </div>
            </div>
        </div>

        <div v-if="productStore.loading" class="loading-state">
            <div class="spinner"></div>
            <p>Cargando productos...</p>
        </div>

        <div v-else-if="productStore.error" class="error-state glass-card">
            <p>{{ productStore.error }}</p>
            <button @click="productStore.fetchProducts" class="btn-primary">Reintentar</button>
        </div>

        <div v-else class="products-container">
            <div v-if="productStore.products.length === 0" class="empty-state">
                <p>No se encontraron productos.</p>
            </div>
            
            <div class="products-grid">
                <div 
                    v-for="product in productStore.products" 
                    :key="product.id" 
                    class="product-card glass-card"
                >
                    <div class="product-badge" v-if="product.stock < 5 && product.stock > 0">
                        Últimas unidades
                    </div>
                    <div class="product-badge out" v-else-if="product.stock <= 0">
                        Sin stock
                    </div>

                    <div class="product-info">
                        <span class="product-sku">{{ product.sku }}</span>
                        <h3 class="product-name">{{ product.name }}</h3>
                        
                        <div class="product-meta">
                            <div class="product-price">
                                <span class="currency">$</span>
                                <span class="amount">{{ Math.floor(product.price) }}</span>
                                <span class="cents">.{{ (product.price % 1).toFixed(2).split('.')[1] }}</span>
                            </div>
                            <div class="stock-indicator">
                                <span class="dot" :class="{ 'low': product.stock < 10 }"></span>
                                {{ product.stock }} disponibles
                            </div>
                        </div>

                        <button 
                            @click="addToCart(product)" 
                            class="btn-primary buy-btn"
                            :disabled="product.stock <= 0"
                        >
                            {{ product.stock > 0 ? 'Añadir al carrito' : 'Agotado' }}
                            <span v-if="product.stock > 0">→</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Basic Pagination Mockup (depends on API meta) -->
            <div v-if="productStore.meta.last_page > 1" class="pagination">
                <button 
                    v-for="p in productStore.meta.last_page" 
                    :key="p"
                    @click="productStore.setPage(p)"
                    :class="{ 'active': productStore.filters.page === p }"
                >
                    {{ p }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.products-view {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.view-header {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.filters-bar {
    display: flex;
    gap: 1rem;
    padding: 1rem 1.5rem;
    align-items: center;
    flex-wrap: wrap;
}

.search-box {
    flex: 1;
    min-width: 250px;
}

.search-box input {
    width: 85%;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
}

.product-card {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.product-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(245, 158, 11, 0.2);
    color: #f59e0b;
    padding: 0.25rem 0.75rem;
    border-radius: 2rem;
    font-size: 0.75rem;
    font-weight: 700;
    border: 1px solid rgba(245, 158, 11, 0.3);
}

.product-badge.out {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
    border-color: rgba(239, 68, 68, 0.3);
}

.product-sku {
    font-size: 0.8rem;
    color: var(--text-muted);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.product-name {
    margin: 0.75rem 0 1.5rem;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.2;
}

.product-meta {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 2rem;
}

.product-price {
    display: flex;
    align-items: flex-start;
}

.product-price .currency {
    font-size: 1rem;
    font-weight: 600;
    margin-top: 0.25rem;
    color: var(--primary);
}

.product-price .amount {
    font-size: 2.25rem;
    font-weight: 800;
    line-height: 1;
}

.product-price .cents {
    font-size: 1rem;
    font-weight: 600;
    margin-top: 0.25rem;
}

.stock-indicator {
    font-size: 0.85rem;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.dot {
    width: 8px;
    height: 8px;
    background: var(--accent);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--accent);
}

.dot.low {
    background: #f59e0b;
    box-shadow: 0 0 10px #f59e0b;
}

.buy-btn {
    width: 100%;
    font-size: 0.9rem;
}

.loading-state, .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem;
    gap: 1rem;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255,255,255,0.1);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 2rem;
}

.pagination button {
    padding: 0.5rem 1rem;
    background: var(--card-bg);
    border: 1px solid var(--glass-border);
    color: white;
}

.pagination button.active {
    background: var(--primary);
    border-color: var(--primary);
}
</style>
