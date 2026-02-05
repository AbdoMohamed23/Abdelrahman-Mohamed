import AdminLayout from './AdminLayout'
import { FiFolder, FiTool, FiMail, FiActivity } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { projectService, skillService, contactService } from '../../services'

const Dashboard = () => {
    const [stats, setStats] = useState({
        projects: 0,
        skills: 0,
        contacts: 0,
        unreadContacts: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadStats()
    }, [])

    const loadStats = async () => {
        try {
            const [projects, skills, contacts] = await Promise.all([
                projectService.getAll(),
                skillService.getAll(),
                contactService.getAll()
            ])

            setStats({
                projects: projects.length,
                skills: skills.length,
                contacts: contacts.length,
                unreadContacts: contacts.filter(c => !c.is_read).length
            })
        } catch (error) {
            console.error('Error loading stats:', error)
        } finally {
            setLoading(false)
        }
    }

    const statCards = [
        {
            title: 'المشاريع',
            value: stats.projects,
            icon: FiFolder,
            color: 'from-blue-600 to-blue-400',
            link: '/admin/projects'
        },
        {
            title: 'المهارات',
            value: stats.skills,
            icon: FiTool,
            color: 'from-purple-600 to-purple-400',
            link: '/admin/skills'
        },
        {
            title: 'الرسائل',
            value: stats.contacts,
            icon: FiMail,
            color: 'from-green-600 to-green-400',
            link: '/admin/contacts'
        },
        {
            title: 'رسائل غير مقروءة',
            value: stats.unreadContacts,
            icon: FiActivity,
            color: 'from-red-600 to-red-400',
            link: '/admin/contacts'
        }
    ]

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">لوحة التحكم</h1>
                    <p className="text-gray-400">مرحباً بك في لوحة التحكم الخاصة بك</p>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="text-white text-xl">جاري التحميل...</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statCards.map((card, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color}`}>
                                        <card.icon size={24} className="text-white" />
                                    </div>
                                    <div className="text-3xl font-bold text-white">{card.value}</div>
                                </div>
                                <h3 className="text-gray-300 text-lg">{card.title}</h3>
                            </div>
                        ))}
                    </div>
                )}

                <div className="bg-gray-800 rounded-xl p-6 border border-purple-500/20">
                    <h2 className="text-xl font-bold text-white mb-4">إجراءات سريعة</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <a
                            href="/admin/projects"
                            className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition text-center"
                        >
                            <FiFolder size={32} className="text-blue-400 mx-auto mb-2" />
                            <div className="text-white font-medium">إضافة مشروع</div>
                        </a>
                        <a
                            href="/admin/skills"
                            className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition text-center"
                        >
                            <FiTool size={32} className="text-purple-400 mx-auto mb-2" />
                            <div className="text-white font-medium">إضافة مهارة</div>
                        </a>
                        <a
                            href="/admin/contacts"
                            className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition text-center"
                        >
                            <FiMail size={32} className="text-green-400 mx-auto mb-2" />
                            <div className="text-white font-medium">عرض الرسائل</div>
                        </a>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Dashboard
