import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'
import { aboutService } from '../../services'
import { FiSave } from 'react-icons/fi'

const AboutSettings = () => {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        bio_en: '',
        bio_ar: '',
        name_en: '',
        name_ar: '',
        title_en: '',
        title_ar: '',
        email: '',
        phone: '',
        location_en: '',
        location_ar: '',
        cv_url: '',
        avatar: null,
        social_links: {
            github: '',
            linkedin: '',
            twitter: '',
            facebook: '',
            instagram: ''
        }
    })

    useEffect(() => {
        loadAbout()
    }, [])

    const loadAbout = async () => {
        try {
            const data = await aboutService.get()
            if (data) {
                setFormData({
                    bio_en: data.bio_en || '',
                    bio_ar: data.bio_ar || '',
                    name_en: data.name_en || '',
                    name_ar: data.name_ar || '',
                    title_en: data.title_en || '',
                    title_ar: data.title_ar || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    location_en: data.location_en || '',
                    location_ar: data.location_ar || '',
                    cv_url: data.cv_url || '',
                    avatar: null,
                    social_links: data.social_links || {
                        github: '',
                        linkedin: '',
                        twitter: '',
                        facebook: '',
                        instagram: ''
                    }
                })
            }
        } catch (error) {
            console.error('Error loading about:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        try {
            const formDataToSend = new FormData()
            Object.keys(formData).forEach(key => {
                if (key === 'social_links') {
                    formDataToSend.append(key, JSON.stringify(formData[key]))
                } else if (key === 'avatar' && formData[key]) {
                    formDataToSend.append(key, formData[key])
                } else if (formData[key] !== null && formData[key] !== '') {
                    formDataToSend.append(key, formData[key])
                }
            })

            await aboutService.update(formDataToSend)
            alert('تم الحفظ بنجاح!')
        } catch (error) {
            console.error('Error saving about:', error)
            alert('فشل الحفظ')
        } finally {
            setSaving(false)
        }
    }

    const handleSocialLinkChange = (platform, value) => {
        setFormData({
            ...formData,
            social_links: {
                ...formData.social_links,
                [platform]: value
            }
        })
    }

    if (loading) {
        return (
            <AdminLayout>
                <div className="text-center py-12 text-white">جاري التحميل...</div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">إعدادات عن</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Info */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-purple-500/20">
                        <h2 className="text-xl font-bold text-white mb-4">المعلومات الشخصية</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    الاسم (عربي)
                                </label>
                                <input
                                    type="text"
                                    value={formData.name_ar}
                                    onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
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
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    المسمى الوظيفي (عربي)
                                </label>
                                <input
                                    type="text"
                                    value={formData.title_ar}
                                    onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    المسمى الوظيفي (English)
                                </label>
                                <input
                                    type="text"
                                    value={formData.title_en}
                                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-purple-500/20">
                        <h2 className="text-xl font-bold text-white mb-4">السيرة الذاتية</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    النبذة (عربي)
                                </label>
                                <textarea
                                    value={formData.bio_ar}
                                    onChange={(e) => setFormData({ ...formData, bio_ar: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    rows="4"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    النبذة (English)
                                </label>
                                <textarea
                                    value={formData.bio_en}
                                    onChange={(e) => setFormData({ ...formData, bio_en: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    rows="4"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-purple-500/20">
                        <h2 className="text-xl font-bold text-white mb-4">معلومات التواصل</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    البريد الإلكتروني
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    الهاتف
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    الموقع (عربي)
                                </label>
                                <input
                                    type="text"
                                    value={formData.location_ar}
                                    onChange={(e) => setFormData({ ...formData, location_ar: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    الموقع (English)
                                </label>
                                <input
                                    type="text"
                                    value={formData.location_en}
                                    onChange={(e) => setFormData({ ...formData, location_en: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-purple-500/20">
                        <h2 className="text-xl font-bold text-white mb-4">روابط التواصل الاجتماعي</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    GitHub
                                </label>
                                <input
                                    type="url"
                                    value={formData.social_links.github}
                                    onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    placeholder="https://github.com/username"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    LinkedIn
                                </label>
                                <input
                                    type="url"
                                    value={formData.social_links.linkedin}
                                    onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    placeholder="https://linkedin.com/in/username"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Twitter
                                </label>
                                <input
                                    type="url"
                                    value={formData.social_links.twitter}
                                    onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    placeholder="https://twitter.com/username"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Facebook
                                </label>
                                <input
                                    type="url"
                                    value={formData.social_links.facebook}
                                    onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    placeholder="https://facebook.com/username"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Files */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-purple-500/20">
                        <h2 className="text-xl font-bold text-white mb-4">الملفات</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    الصورة الشخصية
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    رابط السيرة الذاتية (CV)
                                </label>
                                <input
                                    type="url"
                                    value={formData.cv_url}
                                    onChange={(e) => setFormData({ ...formData, cv_url: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    placeholder="https://example.com/cv.pdf"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50"
                    >
                        <FiSave size={20} />
                        {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                    </button>
                </form>
            </div>
        </AdminLayout>
    )
}

export default AboutSettings
