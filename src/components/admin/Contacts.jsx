import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'
import { contactService } from '../../services'
import { FiMail, FiTrash2, FiClock, FiCheck } from 'react-icons/fi'

const Contacts = () => {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedContact, setSelectedContact] = useState(null)

    useEffect(() => {
        loadContacts()
    }, [])

    const loadContacts = async () => {
        try {
            const data = await contactService.getAll()
            setContacts(data)
        } catch (error) {
            console.error('Error loading contacts:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleMarkAsRead = async (id) => {
        try {
            await contactService.markAsRead(id)
            loadContacts()
        } catch (error) {
            console.error('Error marking as read:', error)
        }
    }

    const handleDelete = async (id) => {
        if (confirm('هل أنت متأكد من حذف هذه الرسالة؟')) {
            try {
                await contactService.delete(id)
                setSelectedContact(null)
                loadContacts()
            } catch (error) {
                console.error('Error deleting contact:', error)
            }
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">الرسائل</h1>
                    <div className="text-gray-400">
                        {contacts.filter(c => !c.is_read).length} رسالة غير مقروءة
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-white">جاري التحميل...</div>
                ) : contacts.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                        <FiMail size={64} className="mx-auto mb-4 opacity-50" />
                        <p>لا توجد رسائل حتى الآن</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* List */}
                        <div className="space-y-3">
                            {contacts.map((contact) => (
                                <div
                                    key={contact.id}
                                    onClick={() => {
                                        setSelectedContact(contact)
                                        if (!contact.is_read) {
                                            handleMarkAsRead(contact.id)
                                        }
                                    }}
                                    className={`p-4 rounded-xl border cursor-pointer transition ${contact.is_read
                                            ? 'bg-gray-800 border-gray-700 hover:border-purple-500/40'
                                            : 'bg-gray-800/50 border-purple-500/40 hover:border-purple-500'
                                        } ${selectedContact?.id === contact.id ? 'ring-2 ring-purple-500' : ''}`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-white">{contact.name}</h3>
                                                {!contact.is_read && (
                                                    <span className="w-2 h-2 bg-purple-500 rounded-full" />
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-400">{contact.email}</p>
                                        </div>
                                        {contact.is_read ? (
                                            <FiCheck className="text-green-400" />
                                        ) : (
                                            <FiClock className="text-purple-400" />
                                        )}
                                    </div>
                                    {contact.subject && (
                                        <p className="text-sm text-gray-300 mb-1">{contact.subject}</p>
                                    )}
                                    <p className="text-sm text-gray-500 line-clamp-2">{contact.message}</p>
                                    <p className="text-xs text-gray-600 mt-2">{formatDate(contact.created_at)}</p>
                                </div>
                            ))}
                        </div>

                        {/* Details */}
                        <div className="sticky top-6">
                            {selectedContact ? (
                                <div className="bg-gray-800 rounded-xl border border-purple-500/20 overflow-hidden">
                                    <div className="p-6 border-b border-purple-500/20">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h2 className="text-2xl font-bold text-white mb-1">
                                                    {selectedContact.name}
                                                </h2>
                                                <a
                                                    href={`mailto:${selectedContact.email}`}
                                                    className="text-purple-400 hover:text-purple-300"
                                                >
                                                    {selectedContact.email}
                                                </a>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(selectedContact.id)}
                                                className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition"
                                            >
                                                <FiTrash2 size={20} />
                                            </button>
                                        </div>
                                        {selectedContact.subject && (
                                            <div className="mb-2">
                                                <span className="text-sm text-gray-400">الموضوع: </span>
                                                <span className="text-white">{selectedContact.subject}</span>
                                            </div>
                                        )}
                                        <p className="text-sm text-gray-400">
                                            {formatDate(selectedContact.created_at)}
                                        </p>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-sm font-medium text-gray-400 mb-2">الرسالة:</h3>
                                        <p className="text-white whitespace-pre-wrap">{selectedContact.message}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-gray-800 rounded-xl border border-purple-500/20 p-12 text-center">
                                    <FiMail size={64} className="mx-auto mb-4 text-gray-600" />
                                    <p className="text-gray-400">اختر رسالة لعرض التفاصيل</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}

export default Contacts
