import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { authService } from '../services'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const currentUser = authService.getCurrentUser()
        setUser(currentUser)
        setLoading(false)
    }, [])

    const login = async (email, password) => {
        const data = await authService.login(email, password)
        setUser(data.user)
        return data
    }

    const register = async (name, email, password, password_confirmation) => {
        const data = await authService.register(name, email, password, password_confirmation)
        setUser(data.user)
        return data
    }

    const logout = async () => {
        await authService.logout()
        setUser(null)
    }

    const value = {
        user,
        login,
        register,
        logout,
        isAuthenticated: authService.isAuthenticated(),
        loading
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}
