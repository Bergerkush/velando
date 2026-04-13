import { useState } from 'react'

export default function Filters({ brands, aktivitaeten, filters, onChange }) {
  const [brandsOpen, setBrandsOpen] = useState(true)
  const [aktOpen, setAktOpen] = useState(true)

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

  const hasActive = filters.brands.length > 0 || filters.aktivitaeten.length > 0 ||
    filters.minPrice > 0 || filters.maxPrice < 8000

  return (
    <aside style={{ width: 260, flexShrink: 0 }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Filter</h3>
        {hasActive && (
          <button
            onClick={() => onChange({ brands: [], aktivitaeten: [], minPrice: 0, maxPrice: 8000 })}
            style={{
              background: 'none',
              border: 'none',
              color: '#1a56db',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Zurücksetzen
          </button>
        )}
      </div>

      {/* Price */}
      <FilterSection title="Preis (€)">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="number"
            value={filters.minPrice}
            onChange={e => onChange({ ...filters, minPrice: +e.target.value })}
            placeholder="Min"
            style={inputStyle}
          />
          <span style={{ color: '#94a3b8' }}>–</span>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={e => onChange({ ...filters, maxPrice: +e.target.value })}
            placeholder="Max"
            style={inputStyle}
          />
        </div>
      </FilterSection>

      {/* Aktivität */}
      <FilterSection
        title="Aktivität"
        open={aktOpen}
        onToggle={() => setAktOpen(v => !v)}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {aktivitaeten.map(akt => (
            <label key={akt} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '6px 8px',
              borderRadius: 7,
              cursor: 'pointer',
              background: filters.aktivitaeten.includes(akt) ? '#eff6ff' : 'transparent',
              transition: 'background 0.15s'
            }}>
              <input
                type="checkbox"
                checked={filters.aktivitaeten.includes(akt)}
                onChange={() => toggleAkt(akt)}
                style={{ accentColor: '#1a56db', width: 15, height: 15, cursor: 'pointer' }}
              />
              <span style={{
                fontSize: 13.5,
                color: filters.aktivitaeten.includes(akt) ? '#1a56db' : '#334155',
                fontWeight: filters.aktivitaeten.includes(akt) ? 600 : 400
              }}>
                {akt}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Brands */}
      <FilterSection
        title="Marke"
        open={brandsOpen}
        onToggle={() => setBrandsOpen(v => !v)}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxHeight: 280,
          overflowY: 'auto'
        }}>
          {brands.map(brand => (
            <label key={brand} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '6px 8px',
              borderRadius: 7,
              cursor: 'pointer',
              background: filters.brands.includes(brand) ? '#eff6ff' : 'transparent',
              transition: 'background 0.15s'
            }}>
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                style={{ accentColor: '#1a56db', width: 15, height: 15, cursor: 'pointer' }}
              />
              <span style={{
                fontSize: 13.5,
                color: filters.brands.includes(brand) ? '#1a56db' : '#334155',
                fontWeight: filters.brands.includes(brand) ? 600 : 400
              }}>
                {brand}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </aside>
  )
}

function FilterSection({ title, children, open = true, onToggle }) {
  return (
    <div style={{
      borderTop: '1px solid #e2e8f0',
      paddingTop: 16,
      marginBottom: 16
    }}>
      <div
        onClick={onToggle}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
          cursor: onToggle ? 'pointer' : 'default'
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: '#64748b' }}>
          {title}
        </span>
        {onToggle && (
          <span style={{ color: '#94a3b8', fontSize: 12 }}>{open ? '▲' : '▼'}</span>
        )}
      </div>
      {open && children}
    </div>
  )
}

const inputStyle = {
  flex: 1,
  padding: '8px 10px',
  border: '1.5px solid #e2e8f0',
  borderRadius: 8,
  fontSize: 13,
  outline: 'none',
  color: '#0f172a',
  background: '#f8fafc'
}
