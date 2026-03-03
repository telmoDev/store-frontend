const API_URL = import.meta.env.VITE_API_BASE_URL || '/api';

async function request(endpoint, options = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        ...options,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error en la petición');
    }

    if (response.status === 204) return null;
    return response.json();
}

export const api = {
    // Productos
    getProductos: (params = {}) => {
        const searchParams = new URLSearchParams(params);
        return request(`/productos?${searchParams.toString()}`);
    },
    getProducto: (id) => request(`/productos/${id}`),
    createProducto: (data) => request('/productos', { method: 'POST', body: JSON.stringify(data) }),
    updateProducto: (id, data) => request(`/productos/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteProducto: (id) => request(`/productos/${id}`, { method: 'DELETE' }),

    // Pedidos
    getPedidos: (params = {}) => {
        const cleanParams = Object.fromEntries(
            Object.entries(params).filter(([_, v]) => v !== null && v !== undefined && v !== '')
        );
        const searchParams = new URLSearchParams(cleanParams);
        const query = searchParams.toString();
        return request(`/pedidos${query ? `?${query}` : ''}`);
    },
    getPedido: (id) => request(`/pedidos/${id}`),
    createPedido: (data) => request('/pedidos', { method: 'POST', body: JSON.stringify(data) }),
};
