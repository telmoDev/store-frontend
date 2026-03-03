import { defineStore } from 'pinia';
import { api } from '@/services/api';

export const useProductStore = defineStore('products', {
    state: () => ({
        products: [],
        loading: false,
        error: null,
        meta: {}, // Pagination info if provided by API
        filters: {
            search: '',
            sort: '',
            page: 1,
        },
    }),
    actions: {
        async fetchProducts() {
            this.loading = true;
            try {
                const response = await api.getProductos(this.filters);
                this.products = response.data || response;
                this.meta = response.meta || {};
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },
        setSearch(search) {
            this.filters.search = search;
            this.filters.page = 1;
            this.fetchProducts();
        },
        setSort(sort) {
            this.filters.sort = sort;
            this.filters.page = 1;
            this.fetchProducts();
        },
        setPage(page) {
            this.filters.page = page;
            this.fetchProducts();
        },
    },
});
