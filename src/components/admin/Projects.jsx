import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'
import { projectService } from '../../services'
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi'

const Projects = () => {
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
                    <h1 className="text-3xl font-bold text-white">إدارة المشاريع</h1>
                    <button
                        onClick={() => {
                            resetForm()
                            setShowModal(true)
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                    >
                        <FiPlus /> إضافة مشروع
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-white">جاري التحميل...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-gray-800 rounded-xl overflow-hidden border border-purple-500/20"
                            >
                                {project.image && (
                                    <img
                                        src={`http://localhost:8000/storage/${project.image}`}
                                        alt={project.title_en}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-lg font-semibold text-white">{project.title_ar}</h3>
                                        <div className="flex items-center gap-1">
                                            {project.is_active ? (
                                                <FiEye className="text-green-400" />
                                            ) : (
                                                <FiEyeOff className="text-gray-400" />
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                        {project.description_ar}
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(project)}
                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                                        >
                                            <FiEdit2 size={16} /> تعديل
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
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
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-purple-500/20">
                            <h2 className="text-2xl font-bold text-white">
                                {editingProject ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        العنوان (عربي)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title_ar}
                                        onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        العنوان (English)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title_en}
                                        onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    الوصف (عربي)
                                </label>
                                <textarea
                                    value={formData.description_ar}
                                    onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    rows="3"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    الوصف (English)
                                </label>
                                <textarea
                                    value={formData.description_en}
                                    onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    rows="3"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        رابط العرض التوضيحي
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.demo_url}
                                        onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        رابط GitHub
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.github_url}
                                        onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    الصورة
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 text-gray-300">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_active}
                                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                        className="w-4 h-4"
                                    />
                                    نشط
                                </label>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                                >
                                    حفظ
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false)
                                        resetForm()
                                    }}
                                    className="flex-1 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
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

export default Projects
