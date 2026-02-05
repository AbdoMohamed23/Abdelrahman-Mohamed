import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'
import { projectService } from '../../services'
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi'

const Dashboard = () => {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingProject, setEditingProject] = useState(null)
    const [formData, setFormData] = useState({
        title_en: '',
        title_ar: '',
        description_en: '',
        description_ar: '',
        demo_url: '',
        github_url: '',
        technologies: [],
        order: 0,
        is_active: true,
        image: null
    })

    useEffect(() => {
        loadProjects()
    }, [])

    const loadProjects = async () => {
        try {
            const data = await projectService.getAll()
            setProjects(data)
        } catch (error) {
            console.error('Error loading projects:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formDataToSend = new FormData()
            Object.keys(formData).forEach(key => {
                if (key === 'technologies') {
                    formDataToSend.append(key, JSON.stringify(formData[key]))
                } else if (key === 'image' && formData[key]) {
                    formDataToSend.append(key, formData[key])
                } else if (formData[key] !== null) {
                    formDataToSend.append(key, formData[key])
                }
            })

            if (editingProject) {
                await projectService.update(editingProject.id, formDataToSend)
            } else {
                await projectService.create(formDataToSend)
            }

            loadProjects()
            setShowModal(false)
            resetForm()
        } catch (error) {
            console.error('Error saving project:', error)
            alert('فشل حفظ المشروع')
        }
    }

    const handleDelete = async (id) => {
        if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
            try {
                await projectService.delete(id)
                loadProjects()
            } catch (error) {
                console.error('Error deleting project:', error)
                alert('فشل حذف المشروع')
            }
        }
    }

    const handleEdit = (project) => {
        setEditingProject(project)
        setFormData({
            title_en: project.title_en,
            title_ar: project.title_ar,
            description_en: project.description_en,
            description_ar: project.description_ar,
            demo_url: project.demo_url || '',
            github_url: project.github_url || '',
            technologies: project.technologies || [],
            order: project.order,
            is_active: project.is_active,
            image: null
        })
        setShowModal(true)
    }

    const resetForm = () => {
        setEditingProject(null)
        setFormData({
            title_en: '',
            title_ar: '',
            description_en: '',
            description_ar: '',
            demo_url: '',
            github_url: '',
            technologies: [],
            order: 0,
            is_active: true,
            image: null
        })
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة المشاريع</h1>
                    <button
                        onClick={() => {
                            resetForm()
                            setShowModal(true)
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/30"
                    >
                        <FiPlus /> إضافة مشروع
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-gray-900 dark:text-white">جاري التحميل...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white dark:bg-dark_bg rounded-2xl overflow-hidden border border-gray-200 dark:border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                {project.image && (
                                    <img
                                        src={`http://localhost:8000/storage/${project.image}`}
                                        alt={project.title_en}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.title_ar}</h3>
                                        <div className="flex items-center gap-1">
                                            {project.is_active ? (
                                                <FiEye className="text-green-500" />
                                            ) : (
                                                <FiEyeOff className="text-gray-400" />
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                        {project.description_ar}
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(project)}
                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 text-sm font-medium"
                                        >
                                            <FiEdit2 size={16} /> تعديل
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 text-sm font-medium"
                                        >
                                            <FiTrash2 size={16} /> حذف
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-dark_bg rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6 border-b border-gray-200 dark:border-primary/20">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {editingProject ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                        العنوان (عربي)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title_ar}
                                        onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-dark_ border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                        العنوان (English)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title_en}
                                        onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-dark_ border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                    الوصف (عربي)
                                </label>
                                <textarea
                                    value={formData.description_ar}
                                    onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-dark_ border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    rows="3"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                    الوصف (English)
                                </label>
                                <textarea
                                    value={formData.description_en}
                                    onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-dark_ border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    rows="3"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                        رابط العرض التوضيحي
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.demo_url}
                                        onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-dark_ border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                        رابط GitHub
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.github_url}
                                        onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-dark_ border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                    الصورة
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-dark_ border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 transition-all"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_active}
                                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                        className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary/20"
                                    />
                                    <span className="font-medium">نشط</span>
                                </label>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-300 font-medium shadow-lg shadow-primary/30"
                                >
                                    حفظ
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false)
                                        resetForm()
                                    }}
                                    className="flex-1 py-3 bg-gray-200 dark:bg-dark_ text-gray-900 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 font-medium"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    )
}

export default Dashboard
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
