import { useState, useEffect } from 'react'

export default function Filters({ brands, aktivitaeten, filters, onChange }) {
  const [brandsOpen, setBrandsOpen] = useState(true)
  const [aktOpen, setAktOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Блокируем скролл когда открыта панель
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  function toggleBrand(brand) {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand]
    onChange({ ...filters, brands: next })
  }

  function toggleAkt(akt) {
    const next = filters.aktivitaeten.includes(akt)
      ? filters.aktivitaeten.filter(a => a !== akt)
      : [...filters.aktivitaeten, akt]
    onChange({ ...filters, aktivitaeten: next })
  }

  function reset() {
    onChange({ brands: [], aktivitaeten: [], minPrice: 0, maxPrice: 8000 })
  }

  const activeCount = filters.brands.length + filters.aktivitaeten.length +
    (filters.minPrice > 0 ? 1 : 0) + (filters.maxPrice < 8000 ? 1 : 0)

  const filtersContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Filter</h3>
        {activeCount > 0 && (
          <button onClick={reset} style={{ background: 'none', border: 'none', color: '#1a56db', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Zurücksetzen ({activeCount})
          </button>
        )}
      </div>

      {/* Active filters chips */}
      {activeCount > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {filters.aktivitaeten.map(a => (
            <span key={a} onClick={() => toggleAkt(a)} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#eff6ff', color: '#1a56db', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              {a} ✕
            </span>
          ))}
          {filters.brands.map(b => (
            <span key={b} onClick={() => toggleBrand(b)} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#eff6ff', color: '#1a56db', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              {b.replace(' Bikes', '')} ✕
            </span>
          ))}
        </div>
      )}

      {/* Price */}
      <FilterSection title="Preis (€)">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="number" value={filters.minPrice} onChange={e => onChange({ ...filters, minPrice: +e.target.value })} placeholder="Min" style={inputStyle} />
          <span style={{ color: '#94a3b8' }}>–</span>
          <input type="number" value={filters.maxPrice} onChange={e => onChange({ ...filters, maxPrice: +e.target.value })} placeholder="Max" style={inputStyle} />
        </div>
      </FilterSection>

      {/* Aktivität */}
      <FilterSection title="Aktivität" open={aktOpen} onToggle={() => setAktOpen(v => !v)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {aktivitaeten.map(akt => (
            <label key={akt} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 8px', borderRadius: 7, cursor: 'pointer', background: filters.aktivitaeten.includes(akt) ? '#eff6ff' : 'transparent' }}>
              <input type="checkbox" checked={filters.aktivitaeten.includes(akt)} onChange={() => toggleAkt(akt)} style={{ accentColor: '#1a56db', width: 15, height: 15, cursor: 'pointer' }} />
              <span style={{ fontSize: 14, color: filters.aktivitaeten.includes(akt) ? '#1a56db' : '#334155', fontWeight: filters.aktivitaeten.includes(akt) ? 600 : 400 }}>{akt}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Brands */}
      <FilterSection title="Marke" open={brandsOpen} onToggle={() => setBrandsOpen(v => !v)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: isMobile ? 200 : 280, overflowY: 'auto' }}>
          {brands.map(brand => (
            <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 8px', borderRadius: 7, cursor: 'pointer', background: filters.brands.includes(brand) ? '#eff6ff' : 'transparent' }}>
              <input type="checkbox" checked={filters.brands.includes(brand)} onChange={() => toggleBrand(brand)} style={{ accentColor: '#1a56db', width: 15, height: 15, cursor: 'pointer' }} />
              <span style={{ fontSize: 14, color: filters.brands.includes(brand) ? '#1a56db' : '#334155', fontWeight: filters.brands.includes(brand) ? 600 : 400 }}>{brand}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  )

  if (isMobile) {
    return (
      <>
        {/* Кнопка фильтра внизу экрана */}
        <button
          onClick={() => setMobileOpen(true)}
          style={{
            position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
            zIndex: 150, display: 'flex', alignItems: 'center', gap: 8,
            background: '#0f172a', color: '#fff', border: 'none',
            padding: '13px 28px', borderRadius: 30, fontSize: 15, fontWeight: 700,
            cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            whiteSpace: 'nowrap'
          }}
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
          </svg>
          Filter
          {activeCount > 0 && (
            <span style={{ background: '#1a56db', color: '#fff', borderRadius: '50%', width: 22, height: 22, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {activeCount}
            </span>
          )}
        </button>

        {/* Overlay */}
        {mobileOpen && (
          <div onClick={() => setMobileOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, backdropFilter: 'blur(2px)' }} />
        )}

        {/* Панель снизу */}
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 201,
          background: '#fff', borderRadius: '20px 20px 0 0',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.15)',
          transform: mobileOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          maxHeight: '85vh', display: 'flex', flexDirection: 'column'
        }}>
          {/* Handle */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
            <div style={{ width: 40, height: 4, background: '#e2e8f0', borderRadius: 2 }} />
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px 20px 20px' }}>
            {filtersContent}
          </div>

          {/* Apply button */}
          <div style={{ padding: '12px 20px 28px', borderTop: '1px solid #e2e8f0', background: '#fff' }}>
            <button
              onClick={() => setMobileOpen(false)}
              style={{ width: '100%', padding: '14px', background: '#1a56db', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
            >
              Ergebnisse anzeigen →
            </button>
          </div>
        </div>
      </>
    )
  }

  // Desktop
  return (
    <aside style={{ width: 260, flexShrink: 0 }}>
      {filtersContent}
    </aside>
  )
}

function FilterSection({ title, children, open = true, onToggle }) {
  return (
    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 16, marginBottom: 16 }}>
      <div onClick={onToggle} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, cursor: onToggle ? 'pointer' : 'default' }}>
        <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: '#64748b' }}>{title}</span>
        {onToggle && <span style={{ color: '#94a3b8', fontSize: 12 }}>{open ? '▲' : '▼'}</span>}
      </div>
      {open && children}
    </div>
  )
}

const inputStyle = {
  flex: 1, padding: '8px 10px', border: '1.5px solid #e2e8f0',
  borderRadius: 8, fontSize: 13, outline: 'none', color: '#0f172a', background: '#f8fafc'
}
