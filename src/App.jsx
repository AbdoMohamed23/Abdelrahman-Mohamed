import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import CV from './components/CV'
import Login from './components/admin/Login'
import Dashboard from './components/admin/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'

function App() {
  useTranslation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // محاكاة تحميل الموقع
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // ✅ لا نغير direction هنا، سيتم تطبيقه محلياً في كل صفحة

  useEffect(() => {
    // ✅ منع النسخ والـ right click على الموقع كله
    const handleCopy = (e) => {
      e.preventDefault()
      return false
    }

    const handleContextMenu = (e) => {
      e.preventDefault()
      return false
    }

    const handleSelectStart = (e) => {
      e.preventDefault()
      return false
    }

    const handleMouseDown = (e) => {
      if (e.button === 2) { // Right click
        e.preventDefault()
        return false
      }
    }

    const handleKeyDown = (e) => {
      // منع Ctrl+C, Ctrl+A, Ctrl+X, Ctrl+V
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'c' || e.key === 'C' || e.key === 'a' || e.key === 'A' ||
          e.key === 'x' || e.key === 'X' || e.key === 'v' || e.key === 'V') {
          e.preventDefault()
          return false
        }
      }
    }

    // تطبيق CSS
    document.body.style.userSelect = 'none'
    document.body.style.WebkitUserSelect = 'none'
    document.body.style.msUserSelect = 'none'

    document.addEventListener('copy', handleCopy)
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('selectstart', handleSelectStart)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('copy', handleCopy)
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('selectstart', handleSelectStart)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.userSelect = 'auto'
    }
  }, [])

  return (
    <ThemeProvider>
      <AuthProvider>
        {isLoading && (
          <div className='fixed inset-0 bg-gradient-to-br from-white via-off-white to-white dark:from-dark_ dark:via-dark_ dark:to-dark_ flex items-center justify-center z-50 overflow-hidden'>
            {/* Animated Background Elements */}
            <div className='absolute inset-0 overflow-hidden'>
              <div className='absolute top-20 left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse'></div>
              <div className='absolute bottom-20 right-10 w-52 h-52 bg-cyan-400/5 rounded-full blur-3xl animate-pulse delay-1000'></div>
            </div>

            <div className='relative flex flex-col items-center gap-8'>
              {/* Logo/Icon with Animation */}
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-primary to-cyan-400 rounded-full blur-xl opacity-50 animate-pulse'></div>
                <div className='relative w-24 h-24 bg-gradient-to-br from-primary to-cyan-400 rounded-full flex items-center justify-center shadow-2xl shadow-primary/50'>
                  <span className='text-white text-4xl font-bold'>D</span>
                </div>
              </div>

              {/* Loading Text */}
              <div className='text-center space-y-3'>
                <h2 className='text-3xl font-bold text-primary dark:text-white animate-pulse'>D. A. M</h2>
                <p className='text-gray-600 dark:text-gray-400 text-sm font-medium'>Loading...</p>
              </div>

              {/* Advanced Spinner */}
              <div className='relative w-16 h-16 mt-4'>
                {/* Outer rotating ring */}
                <div className='absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary animate-spin' style={{ animationDuration: '2s' }}></div>
                {/* Middle rotating ring */}
                <div className='absolute inset-2 rounded-full border-2 border-transparent border-b-cyan-400 border-l-cyan-400 animate-spin' style={{ animationDuration: '3s', animationDirection: 'reverse' }}></div>
                {/* Inner dot */}
                <div className='absolute inset-4 rounded-full bg-gradient-to-r from-primary to-cyan-400 animate-pulse'></div>
              </div>

              {/* Loading Progress Bar */}
              <div className='w-64 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden'>
                <div className='h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full animate-pulse' style={{ width: '70%', animation: 'slideProgress 2s ease-in-out infinite' }}></div>
              </div>

              {/* Loading Dots */}
              <div className='flex gap-3 mt-4'>
                <div className='w-3 h-3 bg-primary rounded-full animate-bounce' style={{ animationDelay: '0s' }}></div>
                <div className='w-3 h-3 bg-primary rounded-full animate-bounce' style={{ animationDelay: '0.2s' }}></div>
                <div className='w-3 h-3 bg-primary rounded-full animate-bounce' style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cv" element={<CV />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App