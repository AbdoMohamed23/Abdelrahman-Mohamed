import { createContext, useState, useContext, useEffect } from 'react'

const ThemeContext = createContext()

// الـ Default theme يمكن تغييره هنا
const DEFAULT_THEME = 'light' // 'dark' أو 'light'

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // جرب استرجاع الـ theme من localStorage أولاً
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            return savedTheme
        }
        // أو استخدم الـ DEFAULT_THEME
        return DEFAULT_THEME
    })

    // تطبيق الـ theme على الـ HTML element
    useEffect(() => {
        const htmlElement = document.documentElement
        if (theme === 'dark') {
            htmlElement.classList.add('dark')
            htmlElement.classList.remove('light')
        } else {
            htmlElement.classList.add('light')
            htmlElement.classList.remove('dark')
        }
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider')
    }
    return context
}
