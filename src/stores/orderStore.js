import { defineStore } from 'pinia';
import { api } from '@/services/api';

export const useOrderStore = defineStore('orders', {
    state: () => ({
        orders: [],
        currentOrder: null,
        loading: false,
        error: null,
    }),
    actions: {
        async fetchOrders(params = {}) {
            this.loading = true;
            try {
                const response = await api.getPedidos(params);
                this.orders = response.data || response;
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },
        async fetchOrder(id) {
            this.loading = true;
            try {
                const response = await api.getPedido(id);
                this.currentOrder = response.data || response;
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },
        async createOrder(orderData) {
            this.loading = true;
            try {
                const newOrder = await api.createPedido(orderData);
                this.orders.unshift(newOrder);
                return newOrder;
            } catch (err) {
                this.error = err.message;
                throw err;
            } finally {
                this.loading = false;
            }
        },
    },
});
