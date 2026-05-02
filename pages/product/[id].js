import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useCart } from '../../lib/cart'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

function formatPrice(p) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(p)
}

export default function ProductPage() {
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [mainImg, setMainImg] = useState('')
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState(null)
  const [sizeError, setSizeError] = useState(false)

  useEffect(() => {
    const id = parseInt(window.location.pathname.split('/').pop())
    const chunkIndex = Math.floor(id / 100)
    fetch(`/products/${chunkIndex}.json`)
      .then(r => r.json())
      .then(chunk => {
        const p = chunk.find(x => x.id === id)
        if (p) {
          setProduct(p)
          setMainImg(p.img || '')
          setRelated(chunk.filter(x => x.id !== id && x.brand === p.brand).slice(0, 6))
        }
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <><Header /><div style={{ textAlign: 'center', padding: '120px 24px', color: '#94a3b8' }}>Wird geladen...</div><Footer /></>
  if (!product) return <><Header /><div style={{ textAlign: 'center', padding: '120px 24px' }}><h2>Produkt nicht gefunden</h2><Link href="/" style={{ color: '#1a56db' }}>← Zurück</Link></div><Footer /></>

  const imgs = product.imgs?.length > 0 ? product.imgs : product.img ? [product.img] : []
  const discount = product.price > 0 ? Math.round((1 - product.new_price / product.price) * 100) : 0
  const savings = product.price - product.new_price
  const fallback = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='500' height='500'><rect width='500' height='500' fill='%23eff6ff'/><text x='250' y='280' text-anchor='middle' font-size='80' font-weight='700' fill='%231a56db' font-family='sans-serif'>${(product.brand||'V').slice(0,2).toUpperCase()}</text></svg>`
  const hasSizes = product.sizes && Object.keys(product.sizes).length > 0

  function handleAdd() {
    if (hasSizes && !selectedSize) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 2000)
      return
    }
    const item = { ...product, selectedSize }
    for (let i = 0; i < qty; i++) addItem(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      <Head>
        <title>{product.name} — Velando</title>
        <meta name="description" content={product.desc?.slice(0, 160) || product.name} />
      </Head>
      <style>{`
        .product-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          margin-bottom: 64px;
        }
        .add-btn {
          flex: 1;
          padding: 14px 24px;
          font-size: 15px;
          white-space: nowrap;
        }
        .tech-table-row {
          display: grid;
          grid-template-columns: 240px 1fr;
        }
        @media (max-width: 768px) {
          .product-layout {
            grid-template-columns: 1fr;
            gap: 20px;
            margin-bottom: 40px;
          }
          .product-layout > div:first-child {
            max-width: 480px;
            margin: 0 auto;
            width: 100%;
          }
          .tech-table-row {
            grid-template-columns: 1fr 1fr;
          }
          .related-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
      <Header />
      <main className="container" style={{ padding: '20px 16px' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 20, fontSize: 13, color: '#64748b', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>Alle Produkte</Link>
          <span>›</span>
          {product.brand && <><span style={{ color: '#64748b' }}>{product.brand}</span><span>›</span></>}
          <span style={{ color: '#334155' }}>{product.name.slice(0, 50)}{product.name.length > 50 ? '…' : ''}</span>
        </div>

        <div className="product-layout">

          {/* ── IMAGE GALLERY ── */}
          <div>
            {/* Main image */}
            <div style={{
              background: '#f8fafc',
              borderRadius: 16,
              overflow: 'hidden',
              aspectRatio: '1',
              marginBottom: 12,
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}>
              <img
                src={mainImg || fallback}
                alt={product.name}
                onError={e => e.target.src = fallback}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Thumbnails — horizontal scroll on mobile */}
            {imgs.length > 1 && (
              <div style={{
                display: 'flex',
                gap: 8,
                overflowX: 'auto',
                paddingBottom: 4,
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}>
                {imgs.slice(0, 8).map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setMainImg(img)}
                    style={{
                      minWidth: 64,
                      width: 64,
                      height: 64,
                      borderRadius: 9,
                      border: `2px solid ${mainImg === img ? '#1a56db' : '#e2e8f0'}`,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      background: '#f8fafc',
                      flexShrink: 0,
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── PRODUCT INFO ── */}
          <div>
            {product.brand && (
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', marginBottom: 8 }}>
                {product.brand}
              </div>
            )}
            <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', lineHeight: 1.25, marginBottom: 16 }}>
              {product.name}
            </h1>

            {/* Rating */}
            <Link href="/bewertungen" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>4.9</span>
                <span style={{ fontSize: 14, color: '#64748b' }}>197 Bewertungen</span>
              </div>
            </Link>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: '#0f172a' }}>{formatPrice(product.new_price)}</span>
              {product.price > product.new_price && (
                <span style={{ fontSize: 18, color: '#94a3b8', textDecoration: 'line-through' }}>{formatPrice(product.price)}</span>
              )}
            </div>
            {savings > 0 && (
              <div style={{ display: 'inline-flex', gap: 6, background: '#eff6ff', color: '#1a56db', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
                Du sparst {formatPrice(savings)} ({discount}%)
              </div>
            )}

            {/* Shipping */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#16a34a', fontSize: 14, fontWeight: 600, marginBottom: 20, padding: '10px 14px', background: '#f0fdf4', borderRadius: 9 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 4v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              Kostenloser Versand nach Deutschland
            </div>

            {/* Sizes */}
            {hasSizes && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>
                    Rahmengröße {selectedSize && <span style={{ color: '#1a56db' }}>— {selectedSize}</span>}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {Object.entries(product.sizes).map(([size, status]) => {
                    const isAvailable = status === 'available'
                    const isSelected = selectedSize === size
                    return (
                      <button key={size} onClick={() => { setSelectedSize(size); setSizeError(false) }} style={{
                        width: 52, height: 52, borderRadius: 10,
                        border: isSelected ? '2px solid #1a56db' : sizeError ? '1.5px solid #ef4444' : '1.5px solid #e2e8f0',
                        background: isSelected ? '#eff6ff' : '#fff',
                        color: isSelected ? '#1a56db' : isAvailable ? '#0f172a' : '#94a3b8',
                        fontSize: 13, fontWeight: 700, cursor: 'pointer',
                        position: 'relative', transition: 'all 0.15s',
                      }}>
                        {size}
                        {!isAvailable && (
                          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                            <div style={{ position: 'absolute', width: '100%', height: '1.5px', background: '#94a3b8', transform: 'rotate(-20deg)' }} />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
                {sizeError && <div style={{ marginTop: 10, color: '#ef4444', fontSize: 13, fontWeight: 600 }}>⚠ Bitte wähle eine Größe aus</div>}
                {selectedSize && product.sizes[selectedSize] === 'on_request' && (
                  <div style={{ marginTop: 12, padding: '12px 14px', background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 9, fontSize: 13, color: '#92400e' }}>
                    ⏱ Größe <strong>{selectedSize}</strong> ist auf Anfrage verfügbar. Kontaktiere uns:&nbsp;
                    <a href="mailto:info@velando24.de" style={{ color: '#1a56db', fontWeight: 600 }}>info@velando24.de</a>
                  </div>
                )}
              </div>
            )}

            {/* Qty + Add to cart */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1.5px solid #e2e8f0', borderRadius: 10, padding: '8px 12px', flexShrink: 0 }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#334155', width: 24, lineHeight: 1 }}>−</button>
                <span style={{ fontWeight: 700, fontSize: 16, minWidth: 20, textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#334155', width: 24, lineHeight: 1 }}>+</button>
              </div>
              <button onClick={handleAdd} className="add-btn" style={{
                flex: 1,
                padding: '14px 16px',
                background: added ? '#16a34a' : '#1a56db',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'background 0.2s',
                whiteSpace: 'nowrap',
              }}>
                {added ? '✓ Hinzugefügt' : 'In den Warenkorb'}
              </button>
            </div>

            {/* Tags */}
            {product.aktivitaet && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                {product.aktivitaet.split(',').map(a => a.trim()).filter(Boolean).map(a => (
                  <span key={a} style={{ background: '#eff6ff', color: '#1a56db', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{a}</span>
                ))}
                {product.color && <span style={{ background: '#f1f5f9', color: '#334155', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{product.color}</span>}
                {product.year && <span style={{ background: '#f1f5f9', color: '#334155', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{product.year}</span>}
              </div>
            )}

            {/* Description */}
            {product.desc && (
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>Produktbeschreibung</h3>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: '#64748b', whiteSpace: 'pre-line' }}>{product.desc}</p>
              </div>
            )}
          </div>
        </div>

        {/* Technical specs */}
        {product.attrs && Object.keys(product.attrs).length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Technische Daten</h2>
            <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              {Object.entries(product.attrs).map(([key, val], i) => (
                <div key={key} className="tech-table-row" style={{
                  borderBottom: i < Object.keys(product.attrs).length - 1 ? '1px solid #f1f5f9' : 'none',
                  background: i % 2 === 0 ? '#fff' : '#f8fafc'
                }}>
                  <div style={{ padding: '11px 16px', fontSize: 13, fontWeight: 600, color: '#64748b' }}>{key}</div>
                  <div style={{ padding: '11px 16px', fontSize: 13, color: '#0f172a' }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related products */}
        {related.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Weitere Produkte von {product.brand}</h2>
            <div className="related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
              {related.map(p => (
                <Link key={p.id} href={`/product/${p.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: 10, cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(26,86,219,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                    <div style={{ background: '#f8fafc', borderRadius: 8, aspectRatio: '1', overflow: 'hidden', marginBottom: 8 }}>
                      <img src={p.img || fallback} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 8 }} onError={e => e.target.src = fallback} />
                    </div>
                    <div style={{ fontSize: 11, color: '#1a56db', fontWeight: 600, marginBottom: 3 }}>{p.brand}</div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: '#0f172a', lineHeight: 1.3, marginBottom: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.name}</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#0f172a' }}>{formatPrice(p.new_price)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
