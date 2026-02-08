import { Link, useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../../context/AuthContext'
import { FiGrid, FiLogOut } from 'react-icons/fi'

const AdminLayout = ({ children }) => {
    const { user, logout } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const menuItems = [
        { path: '/admin/dashboard', icon: FiGrid, label: 'المشاريع' }
    ]

    const handleLogout = async () => {
        await logout()
        navigate('/admin/login')
    }

    return (
        <div dir="rtl" className="min-h-screen bg-gray-900">
            {/* Top Bar */}
            <header className="sticky top-0 z-40 bg-gray-950/95 border-b border-yellow-600/30 backdrop-blur">
                <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-lg sm:text-xl font-semibold text-yellow-500">لوحة التحكم</h1>
                        <span className="hidden sm:inline text-sm text-gray-400">{user?.name}</span>
                    </div>
                    <nav className="flex items-center gap-2 sm:gap-3">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition ${location.pathname === item.path
                                    ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30'
                                    : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-800'
                                    }`}
                            >
                                <item.icon size={16} />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-gray-800 rounded-md text-sm transition"
                        >
                            <FiLogOut size={16} />
                            <span>خروج</span>
                        </button>
                    </nav>
                </div>
            </header>

            {/* Main content */}
            <main className="min-h-screen">
                <div className="p-4 sm:p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default AdminLayout
