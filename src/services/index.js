import api from './api'

export const authService = {
    async login(email, password) {
        const response = await api.post('/login', { email, password })
        if (response.data.token) {
            localStorage.setItem('auth_token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
        }
        return response.data
    },

    async register(name, email, password, password_confirmation) {
        const response = await api.post('/register', {
            name,
            email,
            password,
            password_confirmation
        })
        if (response.data.token) {
            localStorage.setItem('auth_token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
        }
        return response.data
    },

    async logout() {
        await api.post('/logout')
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
    },

    getCurrentUser() {
        const user = localStorage.getItem('user')
        return user ? JSON.parse(user) : null
    },

    isAuthenticated() {
        return !!localStorage.getItem('auth_token')
    }
}

export const projectService = {
    async getAll() {
        const response = await api.get('/projects')
        return response.data
    },

    async getOne(id) {
        const response = await api.get(`/projects/${id}`)
        return response.data
    },

    async create(data) {
        const response = await api.post('/admin/projects', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    },

    async update(id, data) {
        // Use POST with _method override for file uploads
        data.append('_method', 'PUT')
        const response = await api.post(`/admin/projects/${id}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    },

    async delete(id) {
        await api.delete(`/admin/projects/${id}`)
    }
}

export const skillService = {
    async getAll() {
        const response = await api.get('/skills')
        return response.data
    },

    async create(data) {
        const response = await api.post('/admin/skills', data)
        return response.data
    },

    async update(id, data) {
        const response = await api.put(`/admin/skills/${id}`, data)
        return response.data
    },

    async delete(id) {
        await api.delete(`/admin/skills/${id}`)
    }
}

export const aboutService = {
    async get() {
        const response = await api.get('/about')
        return response.data
    },

    async update(data) {
        const response = await api.put('/admin/about', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    }
}

export const contactService = {
    async getAll() {
        const response = await api.get('/admin/contacts')
        return response.data
    },

    async markAsRead(id) {
        const response = await api.put(`/admin/contacts/${id}/read`)
        return response.data
    },

    async delete(id) {
        await api.delete(`/admin/contacts/${id}`)
    },

    async send(data) {
        const response = await api.post('/contact', data)
        return response.data
    }
}

export const settingService = {
    async getAll() {
        const response = await api.get('/settings')
        return response.data
    },

    async update(settings) {
        const response = await api.put('/admin/settings', { settings })
        return response.data
    }
}
