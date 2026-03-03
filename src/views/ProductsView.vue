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
                    <div class="product-info">
                        <div class="product-sku">{{ product.sku }}</div>
                        <h3 class="product-name">{{ product.name }}</h3>
                        <div class="product-stock" :class="{ 'low-stock': product.stock < 10 }">
                            Stock: {{ product.stock }}
                        </div>
                        <div class="product-footer">
                            <span class="product-price">${{ product.price }}</span>
                            <button 
                                @click="addToCart(product)" 
                                class="btn-primary"
                                :disabled="product.stock <= 0"
                            >
                                {{ product.stock > 0 ? 'Añadir' : 'Agotado' }}
                            </button>
                        </div>
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
    width: 100%;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
}

.product-card {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.product-sku {
    font-size: 0.75rem;
    color: var(--text-muted);
    font-weight: 600;
}

.product-name {
    margin: 0.5rem 0;
    font-size: 1.25rem;
}

.product-stock {
    font-size: 0.875rem;
    color: var(--accent);
    margin-bottom: 1.5rem;
}

.product-stock.low-stock {
    color: #f59e0b;
}

.product-footer {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.product-price {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-main);
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
