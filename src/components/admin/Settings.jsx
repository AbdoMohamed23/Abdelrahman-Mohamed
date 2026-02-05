import { useEffect, useMemo, useState } from 'react'
import AdminLayout from './AdminLayout'
import { settingService } from '../../services'
import { useTranslation } from 'react-i18next'
import { FiSave } from 'react-icons/fi'

const Settings = () => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const defaultHero = useMemo(() => ({
        title_ar: t('hero_title'),
        title_en: t('hero_title'),
        role1_ar: t('hero_role1'),
        role1_en: t('hero_role1'),
        role2_ar: t('hero_role2'),
        role2_en: t('hero_role2'),
        description_ar: t('hero_description'),
        description_en: t('hero_description'),
        cv_url: '',
        image: ''
    }), [t])

    const defaultContact = useMemo(() => ({
        whatsapp_url: 'https://wa.me/message/UY6ZK2UKESRFB1',
        email: 'abdomohamed0139@gmail.com',
        linkedin_url: 'https://www.linkedin.com/in/abdelrahman-mohamed-09490136b',
        instagram_url: 'https://www.instagram.com/abdo.dev23',
        facebook_url: 'https://www.facebook.com/abdo.dev23',
        github_url: 'https://github.com/abdomohamed23'
    }), [])

    const defaultAboutCards = useMemo(() => ([
        { id: 1, label_ar: t('about_label_1'), label_en: t('about_label_1'), description_ar: t('about_description_1'), description_en: t('about_description_1') },
        { id: 2, label_ar: t('about_label_2'), label_en: t('about_label_2'), description_ar: t('about_description_2'), description_en: t('about_description_2') },
        { id: 3, label_ar: t('about_label_3'), label_en: t('about_label_3'), description_ar: t('about_description_3'), description_en: t('about_description_3') },
        { id: 4, label_ar: t('about_label_4'), label_en: t('about_label_4'), description_ar: t('about_description_4'), description_en: t('about_description_4') }
    ]), [t])

    const [hero, setHero] = useState(defaultHero)
    const [contact, setContact] = useState(defaultContact)
    const [aboutCards, setAboutCards] = useState(defaultAboutCards)

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const data = await settingService.getAll()

                const heroGroup = data?.hero || []
                const heroSetting = heroGroup.find((item) => item.key === 'hero')
                const parsedHero = heroSetting?.value
                    ? (typeof heroSetting.value === 'string' ? JSON.parse(heroSetting.value) : heroSetting.value)
                    : null

                const contactGroup = data?.contact || []
                const contactSetting = contactGroup.find((item) => item.key === 'contact')
                const parsedContact = contactSetting?.value
                    ? (typeof contactSetting.value === 'string' ? JSON.parse(contactSetting.value) : contactSetting.value)
                    : null

                const aboutGroup = data?.about || []
                const aboutSetting = aboutGroup.find((item) => item.key === 'about_cards')
                const parsedAbout = aboutSetting?.value
                    ? (typeof aboutSetting.value === 'string' ? JSON.parse(aboutSetting.value) : aboutSetting.value)
                    : null

                setHero(parsedHero ? { ...defaultHero, ...parsedHero } : defaultHero)
                setContact(parsedContact ? { ...defaultContact, ...parsedContact } : defaultContact)
                setAboutCards(Array.isArray(parsedAbout) ? parsedAbout : defaultAboutCards)
            } catch (error) {
                console.error('Error loading settings:', error)
                setHero(defaultHero)
                setContact(defaultContact)
                setAboutCards(defaultAboutCards)
            } finally {
                setLoading(false)
            }
        }

        loadSettings()
    }, [defaultHero, defaultContact, defaultAboutCards])

    const handleSave = async (e) => {
        e.preventDefault()
        setSaving(true)

        try {
            await settingService.update([
                { key: 'hero', value: JSON.stringify(hero), type: 'json', group: 'hero' },
                { key: 'contact', value: JSON.stringify(contact), type: 'json', group: 'contact' },
                { key: 'about_cards', value: JSON.stringify(aboutCards), type: 'json', group: 'about' }
            ])

            alert('تم الحفظ بنجاح')
        } catch (error) {
            console.error('Error saving settings:', error)
            alert('فشل الحفظ')
        } finally {
            setSaving(false)
        }
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
            <form onSubmit={handleSave} className="space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">الإعدادات العامة</h1>
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
                    >
                        <FiSave size={18} /> {saving ? 'جاري الحفظ...' : 'حفظ'}
                    </button>
                </div>

                {/* Hero Settings */}
                <div className="bg-gray-800 rounded-xl p-6 border border-purple-500/20 space-y-4">
                    <h2 className="text-xl font-bold text-white">بيانات الهيرو</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                            placeholder="العنوان (عربي)"
                            value={hero.title_ar}
                            onChange={(e) => setHero({ ...hero, title_ar: e.target.value })}
                        />
                        <input
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                            placeholder="Title (English)"
                            value={hero.title_en}
                            onChange={(e) => setHero({ ...hero, title_en: e.target.value })}
                        />
                        <input
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                            placeholder="الدور الأول (عربي)"
                            value={hero.role1_ar}
                            onChange={(e) => setHero({ ...hero, role1_ar: e.target.value })}
                        />
                        <input
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                            placeholder="Role 1 (English)"
                            value={hero.role1_en}
                            onChange={(e) => setHero({ ...hero, role1_en: e.target.value })}
                        />
                        <input
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                            placeholder="الدور الثاني (عربي)"
                            value={hero.role2_ar}
                            onChange={(e) => setHero({ ...hero, role2_ar: e.target.value })}
                        />
                        <input
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                            placeholder="Role 2 (English)"
                            value={hero.role2_en}
                            onChange={(e) => setHero({ ...hero, role2_en: e.target.value })}
                        />
                    </div>
                    <textarea
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        rows="3"
                        placeholder="الوصف (عربي)"
                        value={hero.description_ar}
                        onChange={(e) => setHero({ ...hero, description_ar: e.target.value })}
                    />
                    <textarea
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        rows="3"
                        placeholder="Description (English)"
                        value={hero.description_en}
                        onChange={(e) => setHero({ ...hero, description_en: e.target.value })}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                            placeholder="رابط السيرة الذاتية"
                            value={hero.cv_url}
                            onChange={(e) => setHero({ ...hero, cv_url: e.target.value })}
                        />
                        <input
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                            placeholder="رابط صورة الهيرو (اختياري)"
                            value={hero.image}
                            onChange={(e) => setHero({ ...hero, image: e.target.value })}
                        />
                    </div>
                </div>

                {/* Contact Settings */}
                <div className="bg-gray-800 rounded-xl p-6 border border-purple-500/20 space-y-4">
                    <h2 className="text-xl font-bold text-white">روابط التواصل</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" placeholder="WhatsApp" value={contact.whatsapp_url} onChange={(e) => setContact({ ...contact, whatsapp_url: e.target.value })} />
                        <input className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" placeholder="Email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
                        <input className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" placeholder="LinkedIn" value={contact.linkedin_url} onChange={(e) => setContact({ ...contact, linkedin_url: e.target.value })} />
                        <input className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" placeholder="Instagram" value={contact.instagram_url} onChange={(e) => setContact({ ...contact, instagram_url: e.target.value })} />
                        <input className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" placeholder="Facebook" value={contact.facebook_url} onChange={(e) => setContact({ ...contact, facebook_url: e.target.value })} />
                        <input className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" placeholder="GitHub" value={contact.github_url} onChange={(e) => setContact({ ...contact, github_url: e.target.value })} />
                    </div>
                </div>

                {/* About Cards Settings */}
                <div className="bg-gray-800 rounded-xl p-6 border border-purple-500/20 space-y-6">
                    <h2 className="text-xl font-bold text-white">بطاقات النبذة</h2>
                    {aboutCards.map((card, index) => (
                        <div key={card.id || index} className="space-y-3 border border-gray-700 rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    placeholder="عنوان البطاقة (عربي)"
                                    value={card.label_ar || ''}
                                    onChange={(e) => {
                                        const updated = [...aboutCards]
                                        updated[index] = { ...updated[index], label_ar: e.target.value }
                                        setAboutCards(updated)
                                    }}
                                />
                                <input
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                    placeholder="Title (English)"
                                    value={card.label_en || ''}
                                    onChange={(e) => {
                                        const updated = [...aboutCards]
                                        updated[index] = { ...updated[index], label_en: e.target.value }
                                        setAboutCards(updated)
                                    }}
                                />
                            </div>
                            <textarea
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                rows="3"
                                placeholder="الوصف (عربي)"
                                value={card.description_ar || ''}
                                onChange={(e) => {
                                    const updated = [...aboutCards]
                                    updated[index] = { ...updated[index], description_ar: e.target.value }
                                    setAboutCards(updated)
                                }}
                            />
                            <textarea
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                                rows="3"
                                placeholder="Description (English)"
                                value={card.description_en || ''}
                                onChange={(e) => {
                                    const updated = [...aboutCards]
                                    updated[index] = { ...updated[index], description_en: e.target.value }
                                    setAboutCards(updated)
                                }}
                            />
                        </div>
                    ))}
                </div>
            </form>
        </AdminLayout>
    )
}

export default Settings
