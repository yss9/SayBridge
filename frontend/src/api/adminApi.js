import apiClient from './index';

const adminApi = {
    getUsers: () => apiClient.get('/admin/users'),

    getUserById: (userId) => apiClient.get(`/admin/users/${userId}`),

    updateUserRole: (userId, role) =>
        apiClient.put(`/admin/users/${userId}/role`, { role }),

    deleteUser: (userId) => apiClient.delete(`/admin/users/${userId}`),
};

export default adminApi;
