import React, { useEffect, useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Mail, Calendar, Building2, MapPin, Instagram, Twitter, Facebook } from 'lucide-react'

const MAGENTA = '#C71585'
const PURPLE = '#6A5ACD'

const translations = {
  en: {
    metaTitle: "Wedplan – Kuwait’s First AI Wedding Planner",
    metaDescription: "Plan your perfect wedding with AI. Discover vetted vendors, get smart matches by budget, style and location, and book securely — all in one place.",
    nav: { about: 'About', vendors: 'Vendors', faq: 'FAQ', contact: 'Contact' },
    hero: {
      badge: 'Kuwait’s First',
      title: 'Plan your perfect wedding — powered by AI.',
      subtitle:
        'From venues to videographers, our Smart Match AI curates the best options for your style, budget, and city.',
      cta: 'Join the Beta',
    },
    how: {
      title: 'How it works',
      steps: [
        { title: 'Sign up', desc: 'Tell us your date, budget, and style.' },
        { title: 'Explore vendors', desc: 'Browse verified venues and services.' },
        { title: 'Get AI matches', desc: 'Personalized recommendations in minutes.' },
        { title: 'Book & pay securely', desc: 'Lock your date with trusted vendors.' },
      ],
    },
    ai: {
      title: 'Smart Match AI',
      body:
        'Our AI analyzes your preferences, seasonality, and vendor availability to recommend the perfect fit — saving you dozens of hours of searching.',
      points: [
        'Understands your budget, style, and city',
        'Learns from vendor reviews and performance',
        'Adapts to your timeline and priorities',
      ],
    },
    vendors: {
      title: 'Grow your business with Wedplan',
      body: 'Join top venues and wedding pros reaching modern couples across Kuwait.',
      cta: 'Become a Vendor',
    },
    beta: {
      title: 'Join the Beta',
      subtitle: 'Get early access and exclusive perks when we launch.',
      name: 'Full name',
      email: 'Email',
      city: 'City',
      date: 'Wedding date',
      submit: 'Request Invite',
      success: 'Thank you! You are on the list.',
      error: 'Something went wrong. Please try again.',
    },
    about: {
      title: 'About Wedplan',
      body:
        'Built in Kuwait, Wedplan connects couples and trusted vendors with AI — making beautiful weddings simpler, faster, and stress‑free.',
    },
    footer: {
      rights: 'All rights reserved.',
      links: { about: 'About', vendors: 'Vendors', faq: 'FAQ', contact: 'Contact' },
    },
    langToggle: 'العربية',
  },
  ar: {
    metaTitle: 'ودبلان — أول مخطط زفاف بالذكاء الاصطناعي في الكويت',
    metaDescription:
      'خططي ليومك المثالي مع الذكاء الاصطناعي. اكتشفي أفضل المزودين، توصيات ذكية حسب الميزانية والذوق والموقع، وحجزي بأمان في مكان واحد.',
    nav: { about: 'من نحن', vendors: 'المزوّدون', faq: 'الأسئلة الشائعة', contact: 'اتصل بنا' },
    hero: {
      badge: 'الأول في الكويت',
      title: 'خططي لزفافك المثالي — مدعوم بالذكاء الاصطناعي.',
      subtitle:
        'من القاعات إلى المصورين، يقدّم لك Smart Match AI أفضل الخيارات حسب أسلوبك وميزانيتك ومدينتك.',
      cta: 'انضمي للنسخة التجريبية',
    },
    how: {
      title: 'كيف نعمل',
      steps: [
        { title: 'إنشاء حساب', desc: 'أخبرينا بتاريخك وميزانيتك وذوقك.' },
        { title: 'استكشاف المزوّدين', desc: 'تصفّح قاعات وخدمات موثوقة.' },
        { title: 'توصيات ذكية', desc: 'اقتراحات مخصصة خلال دقائق.' },
        { title: 'حجز ودفع آمن', desc: 'ثبّتي التاريخ مع مزوّدين موثوقين.' },
      ],
    },
    ai: {
      title: 'تقنية Smart Match AI',
      body:
        'يحلل ذكاؤنا الاصطناعي تفضيلاتك وموسمية الحجز وتوافر المزوّدين لاقتراح الأنسب — لتوفير الكثير من الوقت والجهد.',
      points: [
        'يفهم ميزانيتك وذوقك ومدينتك',
        'يتعلم من تقييمات وأداء المزوّدين',
        'يتكيّف مع جدولك وأولوياتك',
      ],
    },
    vendors: {
      title: 'نمِّي عملك مع Wedplan',
      body: 'انضم إلى أفضل القاعات ومزوّدي خدمات الزفاف للوصول إلى العرسان في الكويت.',
      cta: 'انضم كمزوِّد',
    },
    beta: {
      title: 'سجّل في النسخة التجريبية',
      subtitle: 'انضمي مبكرًا واحصلي على مزايا خاصة عند الإطلاق.',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      city: 'المدينة',
      date: 'تاريخ الزفاف',
      submit: 'طلب دعوة',
      success: 'شكرًا لك! تم تسجيلك في القائمة.',
      error: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
    },
    about: {
      title: 'عن Wedplan',
      body:
        'تم بناؤه في الكويت ليربط بين العرسان والمزوّدين الموثوقين بالذكاء الاصطناعي — لتصبح تجربة التخطيط أجمل وأسهل.',
    },
    footer: {
      rights: 'جميع الحقوق محفوظة.',
      links: { about: 'من نحن', vendors: 'المزوّدون', faq: 'الأسئلة الشائعة', contact: 'اتصل بنا' },
    },
    langToggle: 'English',
  },
}

function App() {
  const [lang, setLang] = useState('en')
  const t = useMemo(() => translations[lang], [lang])

  useEffect(() => {
    // SEO tags and html attributes
    document.title = t.metaTitle
    const metaDesc = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement('meta')
      m.setAttribute('name', 'description')
      document.head.appendChild(m)
      return m
    })()
    metaDesc.setAttribute('content', t.metaDescription)

    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en'
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [t, lang])

  const [form, setForm] = useState({ name: '', email: '', city: '', wedding_date: '' })
  const [status, setStatus] = useState({ loading: false, ok: false, error: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, ok: false, error: '' })
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/beta-signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          city: form.city,
          wedding_date: form.wedding_date || null,
          language: lang,
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus({ loading: false, ok: true, error: '' })
      setForm({ name: '', email: '', city: '', wedding_date: '' })
    } catch (err) {
      setStatus({ loading: false, ok: false, error: t.beta.error })
    }
  }

  const sectionHeading = (text) => (
    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6" style={{ color: PURPLE }}>
      {text}
    </h2>
  )

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Poppins, Inter, system-ui, sans-serif' }}>
      {/* Top bar */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full" style={{ background: `linear-gradient(135deg, ${MAGENTA}, ${PURPLE})` }} />
            <span className="text-lg sm:text-xl font-bold" style={{ color: MAGENTA }}>Wedplan</span>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex text-sm text-gray-700 gap-6">
              <a href="#about" className="hover:text-gray-900">{t.nav.about}</a>
              <a href="#vendors" className="hover:text-gray-900">{t.nav.vendors}</a>
              <a href="#faq" className="hover:text-gray-900">{t.nav.faq}</a>
              <a href="#contact" className="hover:text-gray-900">{t.nav.contact}</a>
            </nav>
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="px-3 py-1.5 rounded-full border text-sm transition-colors"
              style={{ borderColor: PURPLE, color: PURPLE }}
            >
              {t.langToggle}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute -inset-[40%] opacity-30 blur-3xl"
            style={{
              background: `radial-gradient(60% 60% at 50% 50%, ${PURPLE} 0%, ${MAGENTA} 40%, rgba(255,255,255,0) 70%)`,
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full bg-purple-50" style={{ color: PURPLE }}>
              {t.hero.badge}
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight" style={{ color: '#1f2937' }}>
              {t.hero.title}
            </h1>
            <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="#beta" className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-transform hover:scale-[1.02]" style={{ background: `linear-gradient(135deg, ${MAGENTA}, ${PURPLE})` }}>
                {t.hero.cta}
                <ArrowRight className="w-4 h-4 ms-2" />
              </a>
              <a href="#how" className="inline-flex items-center justify-center px-6 py-3 rounded-full border font-semibold" style={{ borderColor: PURPLE, color: PURPLE }}>
                {t.how.title}
              </a>
            </div>
          </div>
          <div className="h-[360px] sm:h-[460px] lg:h-[520px] rounded-2xl overflow-hidden shadow-xl bg-white/60">
            <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {sectionHeading(t.how.title)}
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
            {t.how.steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-white shadow-sm border border-gray-100"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ background: `linear-gradient(135deg, ${MAGENTA}, ${PURPLE})` }}>
                  <span className="text-white font-bold">{i + 1}</span>
                </div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: '#1f2937' }}>{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Feature */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            {sectionHeading(t.ai.title)}
            <p className="text-gray-600 leading-relaxed mb-6">{t.ai.body}</p>
            <ul className="space-y-3">
              {t.ai.points.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 mt-0.5" style={{ color: MAGENTA }} />
                  <span className="text-gray-700">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop"
              alt="Elegant wedding flowers"
              className="w-full h-[360px] sm:h-[460px] object-cover"
            />
            <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(199,21,133,0.15) 60%, rgba(106,90,205,0.25) 100%)` }} />
          </div>
        </div>
      </section>

      {/* Vendors */}
      <section id="vendors" className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            {sectionHeading(t.vendors.title)}
            <p className="text-gray-600 mb-6">{t.vendors.body}</p>
            <a href="#contact" className="inline-flex items-center px-6 py-3 rounded-full text-white font-semibold shadow-lg" style={{ background: `linear-gradient(135deg, ${MAGENTA}, ${PURPLE})` }}>
              {t.vendors.cta}
              <ArrowRight className="w-4 h-4 ms-2" />
            </a>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[{ icon: Building2, text: 'Venues' }, { icon: Mail, text: 'Photographers' }, { icon: Calendar, text: 'Planners' }, { icon: MapPin, text: 'Decor & more' }].map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center gap-3">
                <item.icon className="w-5 h-5" style={{ color: PURPLE }} />
                <span className="text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beta Sign-up */}
      <section id="beta" className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            {sectionHeading(t.beta.title)}
            <p className="text-gray-600 mb-6">{t.beta.subtitle}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">{t.beta.name}</label>
                <input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200" type="text" placeholder={t.beta.name} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">{t.beta.email}</label>
                <input id="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200" type="email" placeholder="name@email.com" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="city">{t.beta.city}</label>
                  <input id="city" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200" type="text" placeholder={t.beta.city} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="date">{t.beta.date}</label>
                  <input id="date" value={form.wedding_date} onChange={(e) => setForm({ ...form, wedding_date: e.target.value })} className="w-full rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200" type="date" />
                </div>
              </div>
              <button disabled={status.loading} className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-semibold shadow-lg disabled:opacity-60" style={{ background: `linear-gradient(135deg, ${MAGENTA}, ${PURPLE})` }}>
                {status.loading ? '...' : t.beta.submit}
              </button>
              {status.ok && (
                <p className="text-green-600 text-sm">{t.beta.success}</p>
              )}
              {status.error && !status.ok && (
                <p className="text-red-600 text-sm">{status.error}</p>
              )}
            </form>
          </div>
          <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1600&auto=format&fit=crop"
              alt="Wedding rings and flowers"
              className="w-full h-[380px] sm:h-[460px] object-cover"
            />
            <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(199,21,133,0.15) 60%, rgba(106,90,205,0.25) 100%)` }} />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {sectionHeading(t.about.title)}
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
            {t.about.body}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="pt-14 pb-8 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-8 md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full" style={{ background: `linear-gradient(135deg, ${MAGENTA}, ${PURPLE})` }} />
              <span className="text-lg font-bold" style={{ color: MAGENTA }}>Wedplan</span>
            </div>
            <nav className="flex gap-6 text-sm text-gray-700">
              <a href="#about" className="hover:text-gray-900">{t.footer.links.about}</a>
              <a href="#vendors" className="hover:text-gray-900">{t.footer.links.vendors}</a>
              <a href="#faq" className="hover:text-gray-900">{t.footer.links.faq}</a>
              <a href="#contact" className="hover:text-gray-900">{t.footer.links.contact}</a>
            </nav>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-gray-800"><Instagram className="w-5 h-5" /></a>
              <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-gray-800"><Twitter className="w-5 h-5" /></a>
              <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-gray-800"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>
          <p className="mt-6 text-xs text-gray-500">© {new Date().getFullYear()} Wedplan. {t.footer.rights}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
