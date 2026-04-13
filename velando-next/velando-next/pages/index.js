import { useState, useMemo, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import Filters from '../components/Filters'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import productsData from '../public/products.json'

const PER_PAGE = 24

function formatPrice(p) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(p)
}

// Precompute brands & aktivitaeten
const ALL_BRANDS = [...new Set(productsData.map(p => p.brand).filter(Boolean))].sort()
const ALL_AKTIVITAETEN = (() => {
  const s = new Set()
  productsData.forEach(p => {
    if (p.aktivitaet) p.aktivitaet.split(',').forEach(a => { const t = a.trim(); if (t) s.add(t) })
  })
  return [...s].sort()
})()

export default function Home() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    brands: [],
    aktivitaeten: [],
    minPrice: 0,
    maxPrice: 8000
  })
  const [sort, setSort] = useState('default')
  const [page, setPage] = useState(1)

  // Handle query params
  useEffect(() => {
    if (router.query.akt) {
      setFilters(f => ({ ...f, aktivitaeten: [router.query.akt] }))
    }
  }, [router.query.akt])

  const filtered = useMemo(() => {
    let list = productsData.filter(p => {
      if (search) {
        const q = search.toLowerCase()
        if (!p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q)) return false
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
  }, [search, filters, sort])

  useEffect(() => { setPage(1) }, [search, filters, sort])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  function handleFiltersChange(f) {
    setFilters(f)
    setPage(1)
  }

  function gotoPage(p) {
    setPage(p)
    window.scrollTo({ top: 280, behavior: 'smooth' })
  }

  return (
    <>
      <Head>
        <title>Velando — Premium Outdoor & Radsport</title>
        <meta name="description" content="Premium Fahrräder, GPS-Geräte und Outdoor-Ausrüstung. Bis zu 30% Rabatt, kostenloser Versand." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header onSearch={setSearch} searchValue={search} />

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1a56db 100%)',
        padding: '64px 24px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(59,130,246,0.2)',
            border: '1px solid rgba(59,130,246,0.5)',
            color: '#93c5fd',
            padding: '5px 16px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '1.2px',
            textTransform: 'uppercase',
            marginBottom: 20
          }}>
            ⚡ Bis zu 30% Rabatt
          </div>
          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 900,
            color: '#f8fafc',
            lineHeight: 1.1,
            marginBottom: 16,
            letterSpacing: '-1px'
          }}>
            Premium Sport &<br />
            <span style={{ color: '#60a5fa' }}>Outdoor Ausrüstung</span>
          </h1>
          <p style={{ color: 'rgba(248,250,252,0.7)', fontSize: 17, marginBottom: 36, lineHeight: 1.6 }}>
            Top-Marken zu unschlagbaren Preisen — mit kostenlosem Versand nach Deutschland.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48 }}>
            {[
              { num: `${filtered.length}`, label: 'Produkte' },
              { num: '30%', label: 'Ersparnis' },
              { num: '🚚', label: 'Kostenloser Versand' }
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: '#60a5fa', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: 12, color: 'rgba(248,250,252,0.55)', textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="container" style={{ padding: '40px 24px' }}>
        <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: 80, flexShrink: 0 }}>
            <Filters
              brands={ALL_BRANDS}
              aktivitaeten={ALL_AKTIVITAETEN}
              filters={filters}
              onChange={handleFiltersChange}
            />
          </div>

          {/* Catalog */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Toolbar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24
            }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>Alle Produkte</h2>
                <span style={{ fontSize: 13, color: '#64748b' }}>{filtered.length} Produkte gefunden</span>
              </div>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                style={{
                  padding: '9px 14px',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: 9,
                  fontSize: 13,
                  color: '#334155',
                  outline: 'none',
                  background: '#fff',
                  cursor: 'pointer'
                }}
              >
                <option value="default">Sortierung</option>
                <option value="price-asc">Preis aufsteigend</option>
                <option value="price-desc">Preis absteigend</option>
                <option value="discount">Größter Rabatt</option>
                <option value="name-asc">Name A–Z</option>
              </select>
            </div>

            {/* Grid */}
            {paginated.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                <h3 style={{ fontSize: 20, color: '#334155', marginBottom: 8 }}>Keine Produkte gefunden</h3>
                <p>Versuche andere Filter oder Suchbegriffe</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 18
              }}>
                {paginated.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 6,
                marginTop: 40
              }}>
                <PageBtn disabled={page === 1} onClick={() => gotoPage(page - 1)}>‹</PageBtn>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                  .map((p, i, arr) => (
                    <>
                      {i > 0 && arr[i-1] !== p - 1 && (
                        <span key={`dots-${p}`} style={{ padding: '0 4px', color: '#94a3b8', lineHeight: '40px' }}>…</span>
                      )}
                      <PageBtn key={p} active={p === page} onClick={() => gotoPage(p)}>{p}</PageBtn>
                    </>
                  ))
                }
                <PageBtn disabled={page === totalPages} onClick={() => gotoPage(page + 1)}>›</PageBtn>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

function PageBtn({ children, active, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 40, height: 40,
        border: active ? '2px solid #1a56db' : '1.5px solid #e2e8f0',
        borderRadius: 8,
        background: active ? '#1a56db' : '#fff',
        color: active ? '#fff' : '#334155',
        fontSize: 14,
        fontWeight: active ? 700 : 400,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'all 0.15s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {children}
    </button>
  )
}
