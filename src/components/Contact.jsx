import { useTranslation } from 'react-i18next'
import { useState } from 'react'

const Contact = () => {
  const { t, i18n } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const contactSettings = {
    whatsapp_url: 'https://wa.me/message/UY6ZK2UKESRFB1',
    email: 'abdomohamed0139@gmail.com',
    linkedin_url: 'https://www.linkedin.com/in/abdelrahman-mohamed-09490136b',
    instagram_url: 'https://www.instagram.com/e.abdulrahman_mohamed',
    facebook_url: 'https://www.facebook.com/share/17pvKtKJKr/',
    github_url: 'https://github.com/abdomohamed23'
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formData
        }).toString()
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => {
          setSubmitted(false)
        }, 4000)
      }
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  const handleCopy = (e) => e.preventDefault()
  const handleContextMenu = (e) => e.preventDefault()

  return (
    <main className='text-black dark:text-white max-w-[1200px] mx-auto my-20 px-5' id='contact'>
      {/* Header Section */}
      <div className='text-center mb-16'>
        <h2 className='text-5xl md:text-6xl font-bold mb-4 text-primary dark:text-primary/90'>{t("text_contact")}</h2>
        <div className='flex justify-center mb-8 pt-2'>
          <div className='w-20 h-1 bg-gradient-to-r from-primary via-primary to-transparent rounded-full'></div>
        </div>
      </div>

      {/* Contact Content */}
      <div className='max-w-[800px] mx-auto'>

        {/* Contact Links */}
        <div className='mt-6 bg-white dark:bg-contact/50 border border-gray-300 dark:border-gray-800 rounded-xl'>
          <div className='p-10'>

            <div>
              <h1 className='mb-2 text-primary text-2xl'>{t("text_name")}</h1>
              <div className='grid grid-cols-1 gap-x-5 gap-y-4'>
                <div>
                  <div className='mt-2.5 flex justify-center'>
                    <a href={contactSettings?.whatsapp_url} target='_blank' rel='noopener noreferrer'
                      className='relative group hover:text-primary transition-transform duration-300 w-full px-4 py-4 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:border-pink-600' >
                      <span className='relative'>{t("text_contact_whatsapp")}</span>
                      <span className='absolute inset-0 w-0 bg-gray-400/20 dark:bg-black/20 transition-all duration-300 ease-out group-hover:w-full'></span>
                    </a>
                  </div>
                </div>

                <div>
                  <div className='mt-2.5 flex justify-center'>
                    <a href={`mailto:${contactSettings?.email || ''}?subject=Contact&body=Hello`} rel='noopener noreferrer'
                      className='relative group hover:text-primary transition-transform duration-300 w-full px-4 py-4 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:border-pink-600' >
                      <span className='relative'>{t("text_contact_email")}</span>
                      <span className='absolute inset-0 w-0 bg-gray-400/20 dark:bg-black/20 transition-all duration-300 ease-out group-hover:w-full'></span>
                    </a>
                  </div>
                </div>

                <div>
                  <div className='mt-2.5 flex justify-center'>
                    <a href={contactSettings?.linkedin_url} target='_blank' rel='noopener noreferrer'
                      className='relative group hover:text-primary transition-transform duration-300 w-full px-4 py-4 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:border-pink-600' >
                      <span className='relative'>{t("text_contact_linked")}</span>
                      <span className='absolute inset-0 w-0 bg-gray-400/20 dark:bg-black/20 transition-all duration-300 ease-out group-hover:w-full'></span>
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Social Icons */}
            <div className='mt-8 pt-8 border-t border-gray-300 dark:border-gray-700'>
              <p className='text-center text-gray-600 dark:text-gray-400 mb-4 font-medium'>{t("follow_me")}</p>
              <div className='flex justify-center gap-6'>
                <a href={contactSettings?.instagram_url} target='_blank' rel='noopener noreferrer'
                  className='group relative p-3 rounded-full border-2 border-primary/30 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/30'>
                  <i className='fab fa-instagram text-primary text-xl group-hover:scale-125 transition-all duration-300'></i>
                </a>
                <a href={contactSettings?.facebook_url} target='_blank' rel='noopener noreferrer'
                  className='group relative p-3 rounded-full border-2 border-primary/30 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/30'>
                  <i className='fab fa-facebook text-primary text-xl group-hover:scale-125 transition-all duration-300'></i>
                </a>
                <a href={contactSettings?.github_url} target='_blank' rel='noopener noreferrer'
                  className='group relative p-3 rounded-full border-2 border-primary/30 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/30'>
                  <i className='fab fa-github text-primary text-xl group-hover:scale-125 transition-all duration-300'></i>
                </a>
                <a href={`mailto:${contactSettings?.email || ''}`}
                  className='group relative p-3 rounded-full border-2 border-primary/30 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/30'>
                  <i className='fas fa-envelope text-primary text-xl group-hover:scale-125 transition-all duration-300'></i>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Contact Form */}
        <div className='mt-10 bg-white dark:bg-contact/50 border border-gray-300 dark:border-gray-800 rounded-xl shadow-lg'>
          <div className='p-10'>
            <h2 className='mb-6 text-primary text-2xl font-bold'>
              {i18n.language === 'ar' ? 'إرسال رسالة' : 'Send Message'}
            </h2>

            {submitted && (
              <div className='mb-4 p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 rounded-lg'>
                <p className='text-green-800 dark:text-green-300 text-center'>
                  ✅ {i18n.language === 'ar' ? 'تم إرسال الرسالة بنجاح!' : 'Message sent successfully!'}
                </p>
              </div>
            )}



            <form
              name='contact'
              method='POST'
              data-netlify='true'
              data-netlify-honeypot='bot-field'
              onSubmit={handleSubmit}
              onCopy={handleCopy}
              onContextMenu={handleContextMenu}
              className='space-y-4'
            >
              <input type='hidden' name='form-name' value='contact' />
              <input type='hidden' name='bot-field' />
              {/* Name */}
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  {i18n.language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-3 bg-gray-50 dark:bg-contact/80 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary dark:focus:border-primary/80 text-black dark:text-white transition-all duration-300 hover:border-primary/50 dark:hover:border-primary/50 user-select-none'
                  placeholder={i18n.language === 'ar' ? 'اسمك الكامل' : 'Your name'}
                />
              </div>

              {/* Email */}
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  {i18n.language === 'ar' ? 'عنوان البريد الإلكتروني' : 'Email Address'}
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-3 bg-gray-50 dark:bg-contact/80 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary dark:focus:border-primary/80 text-black dark:text-white transition-all duration-300 hover:border-primary/50 dark:hover:border-primary/50 user-select-none'
                  placeholder={i18n.language === 'ar' ? 'your.email@example.com' : 'your.email@example.com'}
                />
              </div>

              {/* Subject */}
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  {i18n.language === 'ar' ? 'الموضوع' : 'Subject'}
                </label>
                <input
                  type='text'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-3 bg-gray-50 dark:bg-contact/80 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary dark:focus:border-primary/80 text-black dark:text-white transition-all duration-300 hover:border-primary/50 dark:hover:border-primary/50 user-select-none'
                  placeholder={i18n.language === 'ar' ? 'موضوع الرسالة' : 'What is this about?'}
                />
              </div>

              {/* Message */}
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  {i18n.language === 'ar' ? 'الرسالة' : 'Message'}
                </label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows='5'
                  className='w-full px-4 py-3 bg-gray-50 dark:bg-contact/80 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary dark:focus:border-primary/80 text-black dark:text-white transition-all duration-300 hover:border-primary/50 dark:hover:border-primary/50 resize-none user-select-none'
                  placeholder={i18n.language === 'ar' ? 'رسالتك هنا...' : 'Your message here...'}
                />
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                className='group relative w-full mt-6 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-primary/50 flex items-center justify-center gap-2 overflow-hidden'
              >
                <span className='relative z-10'>
                  {i18n.language === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
                </span>
                <span className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -left-full group-hover:left-full transition-all duration-500'></span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </main>
  )
}

export default Contact