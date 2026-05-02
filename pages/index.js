import { useState, useMemo, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Bike, Zap, Mountain, Watch, Tent, Footprints, Dumbbell, Waves, HomeIcon
} from 'lucide-react'
import {
  Truck, RotateCcw, ShieldCheck, Star, ChevronRight, Flame, ArrowRight
} from 'lucide-react'
import Header from '../components/Header'
import Filters from '../components/Filters'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import { useCart } from '../lib/cart'
import ReviewsSection from '../components/ReviewsSection'


const FEATURED_PRODUCTS = [
  { id: 371, name: 'Ghost ASKET EQ Gravel Bike 2026', brand: 'Ghost Bikes', price: 1599.0, new_price: 783.51, img: 'https://res.cloudinary.com/digemtlxu/image/upload/v1776079378/48ak1041-ghost-asket-eq-2026-olive-drab-midnight-black_2.jpg' },
  { id: 381, name: 'Trek CHECKPOINT ALR 5 Gravel Bike 2026', brand: 'Trek Bikes', price: 1749.0, new_price: 857.01, img: 'https://res.cloudinary.com/digemtlxu/image/upload/v1776103255/checkpointalr5-26-35074-A-Primary.jpg' },
  { id: 547, name: 'CUBE STEREO HYBRID ONE22 Pro 600 E-MTB', brand: 'CUBE Bikes', price: 3499.0, new_price: 1714.51, img: 'https://res.cloudinary.com/digemtlxu/image/upload/v1776080119/101140-1-1958579_l.jpg' },
  { id: 307, name: 'Big Agnes Copper Spur UL3 Bikepacking Zelt', brand: 'Big Agnes', price: 780.0, new_price: 599.99, img: 'https://res.cloudinary.com/digemtlxu/image/upload/v1776102520/big-agnes-copper-spur-ul3-bikepacking-tent-2024-1.jpg' },
  { id: 321, name: 'MSR Remote 3 Personen-Bergsteigerzelt', brand: 'MSR', price: 849.99, new_price: 654.99, img: 'https://res.cloudinary.com/digemtlxu/image/upload/v1776102496/msr-remote-3-13114-1.jpg' },
  { id: 380, name: 'Garmin Tacx NEO 3M Direct Drive Heimtrainer', brand: 'Garmin', price: 1699.99, new_price: 1309.99, img: 'https://res.cloudinary.com/digemtlxu/image/upload/v1776102321/garmin-tacx-neo-3m-heimtrainer-t2875-1.jpg' },
]

const PER_PAGE = 24
const TOTAL_CHUNKS = 8

const CATEGORIES = [
  { label: 'Fahrräder', akt: 'Radfahren', Icon: Bike },
  { label: 'E-Bikes', akt: 'E-Bike', Icon: Zap },
  { label: 'Gravel Bikes', akt: 'Gravel Bike', Icon: Mountain },
  { label: 'GPS & Uhren', akt: 'Laufen', Icon: Watch },
  { label: 'Zelte', akt: 'Zelte', Icon: Tent },
  { label: 'Outdoor', akt: 'Outdoor', Icon: HomeIcon },
  { label: 'Wandern', akt: 'Wandern', Icon: Footprints },
  { label: 'Fitness', akt: 'Fitness', Icon: Dumbbell },
  { label: 'Triathlon', akt: 'Triathlon', Icon: Waves },
]

const TOP_BRANDS = [
  'CUBE Bikes', 'Garmin', 'Suunto', 'Cannondale Bikes',
  'Trek Bikes', 'SCOTT Bikes', 'Polar', 'Osprey'
]

const TRUST_ITEMS = [
  { Icon: Truck, title: 'Kostenloser Versand', desc: 'Innerhalb Deutschlands' },
  { Icon: RotateCcw, title: '30 Tage Rückgabe', desc: 'Einfach & unkompliziert' },
  { Icon: ShieldCheck, title: 'Sichere Zahlung', desc: 'SSL verschlüsselt' },
  { Icon: Star, title: 'Geprüfte Qualität', desc: 'Top Marken garantiert' },
]

function formatPrice(p) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(p)
}

export default function Home() {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)
  const [filters, setFilters] = useState({ brands: [], aktivitaeten: [], minPrice: 0, maxPrice: 8000 })
  const [sort, setSort] = useState('default')
  const [page, setPage] = useState(1)
  const [showCatalog, setShowCatalog] = useState(false)

  useEffect(() => {
    Promise.all(
      Array.from({ length: TOTAL_CHUNKS }, (_, i) =>
        fetch(`/products/${i}.json`).then(r => r.json())
      )
    ).then(chunks => {
      setProducts(chunks.flat())
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (router.query.akt) {
      setActiveCategory(router.query.akt)
      setFilters(f => ({ ...f, aktivitaeten: [router.query.akt] }))
      setShowCatalog(true)
    }
  }, [router.query.akt])

  const ALL_BRANDS = useMemo(() => [...new Set(products.map(p => p.brand).filter(Boolean))].sort(), [products])
  const ALL_AKTIVITAETEN = useMemo(() => {
    const s = new Set()
    products.forEach(p => { if (p.aktivitaet) p.aktivitaet.split(',').forEach(a => { const t = a.trim(); if (t) s.add(t) }) })
    return [...s].sort()
  }, [products])

  const dealsOfDay = FEATURED_PRODUCTS

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      if (search) {
        const q = search.toLowerCase()
        if (!p.name.toLowerCase().includes(q) && !(p.brand || '').toLowerCase().includes(q)) return false
      }
      if (p.new_price < filters.minPrice || p.new_price > filters.maxPrice) return false
      if (filters.aktivitaeten.length > 0) {
        const pAkts = p.aktivitaet ? p.aktivitaet.split(',').map(a => a.trim()) : []
        if (!filters.aktivitaeten.some(a => pAkts.includes(a))) return false
      }
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false
      return true
    })
    if (sort === 'price-asc') list.sort((a, b) => a.new_price - b.new_price)
    else if (sort === 'price-desc') list.sort((a, b) => b.new_price - a.new_price)
    else if (sort === 'discount') list.sort((a, b) => (b.price - b.new_price) - (a.price - a.new_price))
    else if (sort === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [search, filters, sort, products])

  useEffect(() => { setPage(1) }, [search, filters, sort])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  function selectCategory(akt) {
    setActiveCategory(akt)
    setFilters(f => ({ ...f, aktivitaeten: [akt] }))
    setShowCatalog(true)
    setPage(1)
    setTimeout(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  function resetToHome() {
    setActiveCategory(null)
    setFilters({ brands: [], aktivitaeten: [], minPrice: 0, maxPrice: 8000 })
    setSearch('')
    setSort('default')
    setShowCatalog(false)
    setPage(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function gotoPage(p) {
    setPage(p)
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Head>
        <title>Velando — Premium Outdoor & Radsport</title>
        <meta name="description" content="Premium Fahrräder, GPS-Geräte und Outdoor-Ausrüstung. Bis zu 51% Rabatt, kostenloser Versand nach Deutschland." />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <style>{`
        @media (max-width: 768px) {
          .categories-grid { grid-template-columns: repeat(5, 1fr) !important; gap: 8px !important; }
          .trust-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 8px !important; }
          .catalog-layout { flex-direction: column !important; }
          .filters-sidebar { display: none !important; }
          .products-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .reviews-grid { grid-template-columns: 1fr !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-stats { display: none !important; }
          .top-brands { flex-wrap: wrap; }
          .deals-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .announcement-timer { display: none !important; }
          .catalog-banner-grid { grid-template-columns: 1fr !important; }
          .catalog-banner-stats { display: none !important; }
        }
        @media (max-width: 480px) {
          .categories-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .products-grid { grid-template-columns: 1fr 1fr !important; }
          .deals-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
      <AnnouncementBar />
      <Header onSearch={v => { setSearch(v); setShowCatalog(true) }} searchValue={search} />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1a56db 100%)', padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(96,165,250,0.1) 0%, transparent 60%)' }} />
        <div className="container" className='hero-grid' style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.5)', color: '#93c5fd', padding: '5px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 24 }}>
              <Zap size={12} /> Bis zu 51% Rabatt
            </div>
            <h1 style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 900, color: '#f8fafc', lineHeight: 1.1, marginBottom: 20, letterSpacing: '-1px' }}>
              Premium Sport &<br /><span style={{ color: '#60a5fa' }}>Outdoor Ausrüstung</span>
            </h1>
            <p style={{ color: 'rgba(248,250,252,0.7)', fontSize: 17, marginBottom: 36, lineHeight: 1.6 }}>
              Top-Marken wie CUBE, Garmin & Suunto zu unschlagbaren Preisen — mit kostenlosem Versand nach Deutschland.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => { setShowCatalog(true); setTimeout(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }), 100) }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: '#1a56db', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                Jetzt shoppen <ArrowRight size={16} />
              </button>
              <button onClick={() => selectCategory('E-Bike')}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: 'rgba(255,255,255,0.1)', color: '#f8fafc', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                <Zap size={16} /> E-Bikes ansehen
              </button>
            </div>
          </div>
          <div className='hero-stats' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { num: '735+', label: 'Produkte', Icon: Bike },
              { num: '46', label: 'Top Marken', Icon: Star },
              { num: '51%', label: 'Max. Rabatt', Icon: Flame },
              { num: '0€', label: 'Versandkosten', Icon: Truck },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: '20px 24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <s.Icon size={24} color="#60a5fa" style={{ marginBottom: 8 }} />
                <div style={{ fontSize: 28, fontWeight: 900, color: '#60a5fa', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: 13, color: 'rgba(248,250,252,0.6)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section style={{ background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container" className='trust-grid' style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {TRUST_ITEMS.map(({ Icon, title, desc }) => (
            <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0' }}>
              <div style={{ width: 40, height: 40, background: '#eff6ff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={20} color="#1a56db" />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{title}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ background: '#f8fafc', padding: '48px 24px' }}>
        <div className="container">
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', marginBottom: 24 }}>Kategorien</h2>
          <div className='categories-grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 12 }}>
            {CATEGORIES.map(({ label, akt, Icon }) => (
              <button key={akt} onClick={() => selectCategory(akt)} style={{
                background: activeCategory === akt ? '#1a56db' : '#fff',
                color: activeCategory === akt ? '#fff' : '#0f172a',
                border: `1.5px solid ${activeCategory === akt ? '#1a56db' : '#e2e8f0'}`,
                borderRadius: 12, padding: '16px 8px', cursor: 'pointer', transition: 'all 0.2s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                boxShadow: activeCategory === akt ? '0 4px 16px rgba(26,86,219,0.25)' : 'none'
              }}>
                <Icon size={26} color={activeCategory === akt ? '#fff' : '#1a56db'} />
                <span style={{ fontSize: 11, fontWeight: 600, textAlign: 'center', lineHeight: 1.2 }}>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TOP BRANDS */}
      <section style={{ background: '#fff', padding: '48px 24px', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Top Marken</h2>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>Geprüfte Qualität von führenden Herstellern</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {TOP_BRANDS.map(brand => (
              <button key={brand}
                onClick={() => { setFilters(f => ({ ...f, brands: [brand] })); setShowCatalog(true); setTimeout(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }), 100) }}
                style={{ padding: '10px 20px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 24, fontSize: 14, fontWeight: 700, color: '#334155', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#1a56db'; e.currentTarget.style.color = '#1a56db'; e.currentTarget.style.background = '#eff6ff' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#334155'; e.currentTarget.style.background = '#f8fafc' }}
              >
                {brand.replace(' Bikes', '')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <ReviewsSection />

      {/* DEALS */}
      {!showCatalog && dealsOfDay.length > 0 && (
        <section style={{ background: '#f8fafc', padding: '48px 24px', borderTop: '1px solid #e2e8f0' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <Flame size={22} color="#ef4444" />
                  <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a' }}>Angebote des Tages</h2>
                </div>
                <p style={{ color: '#64748b', fontSize: 14 }}>Die größten Rabatte — nur für kurze Zeit</p>
              </div>
              <button onClick={() => { setSort('discount'); setShowCatalog(true); setTimeout(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }), 100) }}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', background: 'none', border: '1.5px solid #1a56db', borderRadius: 9, color: '#1a56db', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Alle Angebote <ChevronRight size={14} />
              </button>
            </div>
            <div className='deals-grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {dealsOfDay.map(p => <DealCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* CATALOG */}
      <section id="catalog" style={{ background: '#f8fafc', padding: '48px 24px', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          {!showCatalog && (
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>Alle Produkte</h2>
              <p style={{ color: '#64748b', fontSize: 14 }}>Entdecke unser gesamtes Sortiment</p>
            </div>
          )}
          <div className='catalog-layout' style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
            <div className='filters-sidebar' style={{ position: 'sticky', top: 80, flexShrink: 0 }}>
              <Filters brands={ALL_BRANDS} aktivitaeten={ALL_AKTIVITAETEN} filters={filters}
                onChange={f => { setFilters(f); setPage(1); setShowCatalog(true) }} />
              {(filters.brands.length > 0 || filters.aktivitaeten.length > 0 || activeCategory) && (
                <button onClick={resetToHome} style={{ width: '100%', marginTop: 12, padding: '10px', background: 'none', border: '1.5px solid #e2e8f0', borderRadius: 8, color: '#64748b', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <RotateCcw size={13} /> Zur Startseite
                </button>
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{activeCategory || 'Alle Produkte'}</h3>
                  <span style={{ fontSize: 13, color: '#64748b' }}>{loading ? 'Wird geladen...' : `${filtered.length} Produkte gefunden`}</span>
                </div>
                <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '9px 14px', border: '1.5px solid #e2e8f0', borderRadius: 9, fontSize: 13, color: '#334155', outline: 'none', background: '#fff', cursor: 'pointer' }}>
                  <option value="default">Sortierung</option>
                  <option value="price-asc">Preis aufsteigend</option>
                  <option value="price-desc">Preis absteigend</option>
                  <option value="discount">Größter Rabatt</option>
                  <option value="name-asc">Name A–Z</option>
                </select>
              </div>

              {loading ? (
                <div className='products-grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 18 }}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                      <div style={{ aspectRatio: '1', background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
                      <div style={{ padding: 16 }}>
                        <div style={{ height: 12, background: '#f1f5f9', borderRadius: 6, marginBottom: 8, width: '60%' }} />
                        <div style={{ height: 16, background: '#f1f5f9', borderRadius: 6, marginBottom: 8 }} />
                        <div style={{ height: 36, background: '#f1f5f9', borderRadius: 9, marginTop: 16 }} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : paginated.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8' }}>
                  <Mountain size={48} color="#e2e8f0" style={{ margin: '0 auto 12px' }} />
                  <h3 style={{ fontSize: 20, color: '#334155', marginBottom: 8 }}>Keine Produkte gefunden</h3>
                  <p>Versuche andere Filter</p>
                </div>
              ) : (
                <div className='products-grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 18 }}>
                  {paginated.map((p, i) => (
                    <>
                      <ProductCard key={p.id} product={p} />
                      {i === 7 && <CatalogBanner key="banner" onCategory={akt => { setFilters(f => ({ ...f, aktivitaeten: [akt] })); setPage(1); setShowCatalog(true) }} />}
                    </>
                  ))}
                </div>
              )}

              {!loading && totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 40 }}>
                  <PageBtn disabled={page === 1} onClick={() => gotoPage(page - 1)}>‹</PageBtn>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                    .map((p, i, arr) => (
                      <span key={p} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        {i > 0 && arr[i - 1] !== p - 1 && <span style={{ padding: '0 4px', color: '#94a3b8' }}>…</span>}
                        <PageBtn active={p === page} onClick={() => gotoPage(p)}>{p}</PageBtn>
                      </span>
                    ))}
                  <PageBtn disabled={page === totalPages} onClick={() => gotoPage(page + 1)}>›</PageBtn>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`@keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }`}</style>
      <Footer />
    </>
  )
}

function DealCard({ product }) {
  const { addItem } = useCart()
  const discount = product.price > 0 ? Math.round((1 - product.new_price / product.price) * 100) : 0
  const fallback = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='300' height='300' fill='%23eff6ff'/><text x='150' y='165' text-anchor='middle' font-size='48' font-weight='700' fill='%231a56db' font-family='sans-serif'>${(product.brand||'V').slice(0,2).toUpperCase()}</text></svg>`
  return (
    <Link href={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
      <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid #e2e8f0', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(26,86,219,0.12)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
        <div style={{ position: 'relative', aspectRatio: '1', background: '#f8fafc' }}>
          <img src={product.img || fallback} alt={product.name} onError={e => e.target.src = fallback}
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 12 }} />
          {discount > 0 && (
            <span style={{ position: 'absolute', top: 10, left: 10, background: '#ef4444', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 8px', borderRadius: 6 }}>
              -{discount}%
            </span>
          )}
        </div>
        <div style={{ padding: '12px 14px' }}>
          {product.brand && <div style={{ fontSize: 11, fontWeight: 700, color: '#1a56db', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>{product.brand}</div>}
          <div style={{ fontSize: 13, fontWeight: 500, color: '#0f172a', lineHeight: 1.3, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>{formatPrice(product.new_price)}</span>
            {product.price > product.new_price && <span style={{ fontSize: 12, color: '#94a3b8', textDecoration: 'line-through' }}>{formatPrice(product.price)}</span>}
          </div>
          <button onClick={e => { e.preventDefault(); addItem(product) }}
            style={{ width: '100%', padding: '9px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            In den Warenkorb
          </button>
        </div>
      </div>
    </Link>
  )
}

function PageBtn({ children, active, disabled, onClick }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width: 40, height: 40, border: active ? '2px solid #1a56db' : '1.5px solid #e2e8f0', borderRadius: 8, background: active ? '#1a56db' : '#fff', color: active ? '#fff' : '#334155', fontSize: 14, fontWeight: active ? 700 : 400, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </button>
  )
}

export async function getServerSideProps() {
  return { props: {} }
}


function AnnouncementBar() {
  const [visible, setVisible] = useState(true)
  const [time, setTime] = useState({ d: 2, h: 14, m: 37, s: 22 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(t => {
        let { d, h, m, s } = t
        s--
        if (s < 0) { s = 59; m-- }
        if (m < 0) { m = 59; h-- }
        if (h < 0) { h = 23; d-- }
        if (d < 0) return t
        return { d, h, m, s }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!visible) return null

  const pad = n => String(n).padStart(2, '0')

  return (
    <div style={{ background: '#0f172a', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
      <div className='announcement-timer' style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ background: '#1a56db', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 4, letterSpacing: '0.8px' }}>FRÜHJAHR SALE</span>
        <span style={{ color: '#f8fafc', fontSize: 13 }}>Bis zu <strong style={{ color: '#60a5fa' }}>51% Rabatt</strong> auf alle Fahrräder</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: 'rgba(248,250,252,0.5)', fontSize: 12 }}>Endet in</span>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {[pad(time.d)+'T', pad(time.h)+'H', pad(time.m)+'M', pad(time.s)+'S'].map((v, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ background: '#1e293b', borderRadius: 4, padding: '3px 7px', color: '#60a5fa', fontSize: 13, fontWeight: 700 }}>{v}</span>
              {i < 3 && <span style={{ color: '#475569', fontSize: 13 }}>:</span>}
            </span>
          ))}
        </div>
        <button
          onClick={() => setVisible(false)}
          style={{ background: 'none', border: 'none', color: 'rgba(248,250,252,0.4)', fontSize: 18, cursor: 'pointer', lineHeight: 1, marginLeft: 8 }}
        >✕</button>
      </div>
    </div>
  )
}

function CatalogBanner({ onCategory }) {
  return (
    <div className='catalog-banner-grid' style={{ gridColumn: '1 / -1', background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1a56db 100%)', borderRadius: 16, padding: '28px 32px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center', margin: '8px 0' }}>
      <div>
        <div style={{ display: 'inline-block', background: 'rgba(96,165,250,0.2)', border: '1px solid rgba(96,165,250,0.4)', color: '#93c5fd', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, marginBottom: 10, letterSpacing: '1px' }}>
          BIKEPACKING SEASON 2026
        </div>
        <h3 style={{ color: '#f8fafc', fontSize: 20, fontWeight: 800, margin: '0 0 6px', lineHeight: 1.2 }}>Bereit für das nächste Abenteuer?</h3>
        <p style={{ color: 'rgba(248,250,252,0.6)', fontSize: 13, margin: '0 0 16px' }}>Zelte, Schlafsäcke & GPS — alles für deine Tour in den Bergen</p>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onCategory('Zelte')} style={{ background: '#1a56db', color: '#fff', fontSize: 13, fontWeight: 700, padding: '9px 18px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
            Zelte entdecken →
          </button>
          <button onClick={() => onCategory('E-Bike')} style={{ background: 'rgba(255,255,255,0.08)', color: '#f8fafc', fontSize: 13, padding: '9px 18px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer' }}>
            E-Bikes ansehen
          </button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[['735+','Produkte'],['51%','Max. Rabatt'],['0€','Versand'],['4.9★','Bewertung']].map(([num, label]) => (
          <div key={label} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: '14px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#60a5fa' }}>{num}</div>
            <div style={{ fontSize: 11, color: 'rgba(248,250,252,0.5)', marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
