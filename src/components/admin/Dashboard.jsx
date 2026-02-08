import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'
import { projectService } from '../../services'
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi'

const Dashboard = () => {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingProject, setEditingProject] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deletingProject, setDeletingProject] = useState(null)
    const [showPreviewModal, setShowPreviewModal] = useState(false)
    const [previewProject, setPreviewProject] = useState(null)
    const [formData, setFormData] = useState({
        title_en: '',
        title_ar: '',
        description_en: '',
        description_ar: '',
        demo_url: '',
        github_url: '',
        image: null,
        order: 0,
        is_active: true
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
                if (key === 'image' && formData[key]) {
                    formDataToSend.append(key, formData[key])
                    console.log('Image file:', formData[key])
                } else if (formData[key] !== null && key !== 'image') {
                    formDataToSend.append(key, formData[key])
                }
            })

            console.log('FormData entries:', Array.from(formDataToSend.entries()))

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
            alert('حدث خطأ: ' + (error.response?.data?.message || error.message))
        }
    }

    const handleDelete = async (id) => {
        try {
            await projectService.delete(id)
            loadProjects()
        } catch (error) {
            console.error('Error deleting project:', error)
        }
    }

    const openDeleteModal = (project) => {
        setDeletingProject(project)
        setShowDeleteModal(true)
    }

    const closeDeleteModal = () => {
        setShowDeleteModal(false)
        setDeletingProject(null)
    }

    const confirmDelete = async () => {
        if (!deletingProject) return
        await handleDelete(deletingProject.id)
        closeDeleteModal()
    }

    const openPreviewModal = (project) => {
        if (!project?.demo_url) return
        setPreviewProject(project)
        setShowPreviewModal(true)
    }

    const closePreviewModal = () => {
        setShowPreviewModal(false)
        setPreviewProject(null)
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
            image: null,
            order: project.order,
            is_active: project.is_active
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
            image: null,
            order: 0,
            is_active: true
        })
    }

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-yellow-500">المشاريع</h1>
                    <button
                        onClick={() => {
                            resetForm()
                            setShowModal(true)
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 border border-yellow-600/30 rounded-lg transition-colors text-sm"
                    >
                        <FiPlus size={18} /> مشروع جديد
                    </button>
                </div>

                {/* Projects List */}
                {loading ? (
                    <div className="text-center py-20 text-gray-400">جاري التحميل...</div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">لا توجد مشاريع</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-gray-900 rounded-lg overflow-hidden border border-yellow-600/20 hover:border-yellow-600/40 transition-colors"
                            >
                                {project.image && (
                                    <img
                                        src={`http://localhost:8000/storage/${project.image}`}
                                        alt={project.title_en}
                                        className="w-full h-40 object-cover"
                                    />
                                )}
                                <div className="p-4 space-y-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="text-white font-medium text-sm">{project.title_ar}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${project.is_active ? 'text-yellow-300 border-yellow-600/30 bg-yellow-600/10' : 'text-gray-400 border-gray-700 bg-gray-800'}`}>
                                                {project.is_active ? 'نشط' : 'غير نشط'}
                                            </span>
                                            {project.demo_url ? (
                                                <button
                                                    type="button"
                                                    onClick={() => openPreviewModal(project)}
                                                    className="text-yellow-400 hover:text-yellow-300"
                                                    title="معاينة"
                                                >
                                                    <FiEye size={16} />
                                                </button>
                                            ) : (
                                                <FiEyeOff className="text-gray-600" size={16} />
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-xs line-clamp-2">
                                        {project.description_ar}
                                    </p>
                                    <div className="flex gap-2 pt-2">
                                        <button
                                            onClick={() => handleEdit(project)}
                                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-300 border border-yellow-600/30 rounded text-xs transition-colors"
                                        >
                                            <FiEdit2 size={14} /> تعديل
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(project)}
                                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs transition-colors"
                                        >
                                            <FiTrash2 size={14} /> حذف
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
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-yellow-600/20 shadow-2xl">
                        <div className="p-4 border-b border-yellow-600/20 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-yellow-400">
                                {editingProject ? 'تعديل المشروع' : 'مشروع جديد'}
                            </h2>
                            <span className="text-xs text-gray-400">لوحة التحكم</span>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-gray-300 text-xs font-medium mb-1.5">
                                        العنوان (عربي)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title_ar}
                                        onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-yellow-500 focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-xs font-medium mb-1.5">
                                        العنوان (English)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title_en}
                                        onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-yellow-500 focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-xs font-medium mb-1.5">
                                    الوصف (عربي)
                                </label>
                                <textarea
                                    value={formData.description_ar}
                                    onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-yellow-500 focus:outline-none"
                                    rows="2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-xs font-medium mb-1.5">
                                    الوصف (English)
                                </label>
                                <textarea
                                    value={formData.description_en}
                                    onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-yellow-500 focus:outline-none"
                                    rows="2"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-gray-300 text-xs font-medium mb-1.5">
                                        رابط Demo
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.demo_url}
                                        onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-yellow-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-xs font-medium mb-1.5">
                                        رابط GitHub
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.github_url}
                                        onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-yellow-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-xs font-medium mb-1.5">
                                    الصورة
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-gray-700 file:text-white hover:file:bg-gray-600"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={formData.is_active}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    className="w-4 h-4 rounded bg-gray-700 border-gray-600"
                                />
                                <label htmlFor="is_active" className="text-gray-300 text-sm cursor-pointer">
                                    نشط
                                </label>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    className="flex-1 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-300 border border-yellow-600/30 rounded text-sm font-medium transition-colors"
                                >
                                    حفظ
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false)
                                        resetForm()
                                    }}
                                    className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded text-sm font-medium transition-colors"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-lg w-full max-w-md border border-yellow-600/20">
                        <div className="p-4 border-b border-yellow-600/20">
                            <h2 className="text-base font-bold text-yellow-400">تأكيد الحذف</h2>
                        </div>
                        <div className="p-4">
                            <p className="text-sm text-gray-300">
                                هل تريد حذف المشروع
                                <span className="text-yellow-300"> {deletingProject?.title_ar}</span> ؟
                            </p>
                        </div>
                        <div className="p-4 pt-0 flex gap-3">
                            <button
                                onClick={confirmDelete}
                                className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition-colors"
                            >
                                حذف
                            </button>
                            <button
                                onClick={closeDeleteModal}
                                className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded text-sm font-medium transition-colors"
                            >
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showPreviewModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-xl w-full max-w-3xl border border-yellow-600/20 shadow-2xl overflow-hidden">
                        <div className="p-4 border-b border-yellow-600/20 flex items-center justify-between">
                            <h2 className="text-base font-bold text-yellow-400">معاينة المشروع</h2>
                            <button
                                onClick={closePreviewModal}
                                className="text-gray-300 hover:text-white text-sm"
                            >
                                إغلاق
                            </button>
                        </div>
                        <div className="p-6">
                            {previewProject ? (
                                <div className="max-w-[520px] mx-auto">
                                    <div className="group relative overflow-hidden rounded-2xl border border-primary/30 hover:border-primary/60 transition-all duration-500 bg-gray-50 dark:bg-contact/40">
                                        <div className="relative w-full overflow-hidden bg-black/5">
                                            {previewProject.image ? (
                                                <img
                                                    src={`http://localhost:8000/storage/${previewProject.image}`}
                                                    alt={previewProject.title_ar}
                                                    className="w-full h-auto object-contain"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-full h-48 bg-gray-800 flex items-center justify-center text-gray-400 text-sm">
                                                    لا توجد صورة
                                                </div>
                                            )}
                                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0"></div>
                                        </div>
                                        <div className="p-6 flex flex-col gap-3">
                                            <h3 className="text-xl font-bold text-primary dark:text-primary/90">
                                                {previewProject.title_ar}
                                            </h3>
                                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                                {previewProject.description_ar}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6 text-center text-gray-400">لا توجد بيانات للعرض</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    )
}

export default Dashboard
