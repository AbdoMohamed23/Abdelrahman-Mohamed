import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'
import { skillService } from '../../services'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'

const Skills = () => {
    const [skills, setSkills] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingSkill, setEditingSkill] = useState(null)
    const [formData, setFormData] = useState({
        name_en: '',
        name_ar: '',
        category: 'frontend',
        icon: '',
        level: 50,
        order: 0,
        is_active: true
    })

    useEffect(() => {
        loadSkills()
    }, [])

    const loadSkills = async () => {
        try {
            const data = await skillService.getAll()
            setSkills(data)
        } catch (error) {
            console.error('Error loading skills:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editingSkill) {
                await skillService.update(editingSkill.id, formData)
            } else {
                await skillService.create(formData)
            }
            loadSkills()
            setShowModal(false)
            resetForm()
        } catch (error) {
            console.error('Error saving skill:', error)
            alert('فشل حفظ المهارة')
        }
    }

    const handleDelete = async (id) => {
        if (confirm('هل أنت متأكد من حذف هذه المهارة؟')) {
            try {
                await skillService.delete(id)
                loadSkills()
            } catch (error) {
                console.error('Error deleting skill:', error)
            }
        }
    }

    const handleEdit = (skill) => {
        setEditingSkill(skill)
        setFormData({
            name_en: skill.name_en,
            name_ar: skill.name_ar,
            category: skill.category,
            icon: skill.icon || '',
            level: skill.level,
            order: skill.order,
            is_active: skill.is_active
        })
        setShowModal(true)
    }

    const resetForm = () => {
        setEditingSkill(null)
        setFormData({
            name_en: '',
            name_ar: '',
            category: 'frontend',
            icon: '',
            level: 50,
            order: 0,
            is_active: true
        })
    }

    const categories = {
        frontend: 'Front-End',
        backend: 'Back-End',
        tools: 'الأدوات',
        design: 'التصميم',
        other: 'أخرى'
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">إدارة المهارات</h1>
                    <button
                        onClick={() => {
                            resetForm()
                            setShowModal(true)
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                    >
                        <FiPlus /> إضافة مهارة
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-white">جاري التحميل...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {skills.map((skill) => (
                            <div
                                key={skill.id}
                                className="bg-gray-800 rounded-xl p-4 border border-purple-500/20"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-semibold text-white">{skill.name_ar}</h3>
                                    <span className="text-xs px-2 py-1 bg-purple-600 rounded text-white">
                                        {categories[skill.category]}
                                    </span>
                                </div>
                                <div className="mb-3">
                                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                                        <span>المستوى</span>
                                        <span>{skill.level}%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-purple-600 h-2 rounded-full transition-all"
                                            style={{ width: `${skill.level}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(skill)}
                                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                                    >
                                        <FiEdit2 size={14} /> تعديل
                                    </button>
                                    <button
                                        onClick={() => handleDelete(skill.id)}
                                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                                    >
                                        <FiTrash2 size={14} /> حذف
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-xl w-full max-w-lg">
                        <div className="p-6 border-b border-purple-500/20">
                            <h2 className="text-2xl font-bold text-white">
                                {editingSkill ? 'تعديل المهارة' : 'إضافة مهارة جديدة'}
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        الاسم (عربي)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name_ar}
                                        onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        الاسم (English)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name_en}
                                        onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    الفئة
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                >
                                    {Object.entries(categories).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    المستوى (0-100)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={formData.level}
                                    onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    الترتيب
                                </label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
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

export default Skills
