import { Link, useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../../context/AuthContext'
import { FiGrid, FiFolder, FiTool, FiUser, FiMail, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi'
import { useState } from 'react'

const AdminLayout = ({ children }) => {
    const { user, logout } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const menuItems = [
        { path: '/admin/dashboard', icon: FiGrid, label: 'لوحة التحكم' },
        { path: '/admin/projects', icon: FiFolder, label: 'المشاريع' },
        { path: '/admin/skills', icon: FiTool, label: 'المهارات' },
        { path: '/admin/about', icon: FiUser, label: 'عن' },
        { path: '/admin/contacts', icon: FiMail, label: 'الرسائل' },
        { path: '/admin/settings', icon: FiSettings, label: 'الإعدادات' }
    ]

    const handleLogout = async () => {
        await logout()
        navigate('/admin/login')
    }

    return (
        <div dir="rtl" className="min-h-screen bg-gray-900">
            {/* Mobile menu button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-3 bg-gray-800 text-white rounded-lg border border-purple-500/20"
                >
                    {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-gray-800 border-r border-purple-500/20 transform transition-transform duration-300 z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-purple-500/20">
                        <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
                        <p className="text-sm text-gray-400 mt-1">{user?.name}</p>
                    </div>

                    {/* Menu */}
                    <nav className="flex-1 p-4 space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${location.pathname === item.path
                                    ? 'bg-purple-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700'
                                    }`}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-purple-500/20">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-gray-700 rounded-lg transition"
                        >
                            <FiLogOut size={20} />
                            <span>تسجيل الخروج</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main content */}
            <main className="lg:ml-64 min-h-screen">
                <div className="p-6 lg:p-8">
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
