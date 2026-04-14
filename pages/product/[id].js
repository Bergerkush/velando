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
          // Related - same brand
          return fetch(`/products/${chunkIndex}.json`)
            .then(r => r.json())
            .then(data => setRelated(data.filter(x => x.id !== id && x.brand === p.brand).slice(0, 6)))
        }
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <>
      <Header />
      <div style={{ textAlign: 'center', padding: '120px 24px', color: '#94a3b8' }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
        <p>Wird geladen...</p>
      </div>
      <Footer />
    </>
  )

  if (!product) return (
    <>
      <Header />
      <div style={{ textAlign: 'center', padding: '120px 24px' }}>
        <h2>Produkt nicht gefunden</h2>
        <Link href="/" style={{ color: '#1a56db' }}>← Zurück zum Shop</Link>
      </div>
      <Footer />
    </>
  )

  const imgs = product.imgs && product.imgs.length > 0 ? product.imgs : product.img ? [product.img] : []
  const discount = product.price > 0 ? Math.round((1 - product.new_price / product.price) * 100) : 0
  const savings = product.price - product.new_price
  const fallback = `https://via.placeholder.com/500x500/eff6ff/1a56db?text=${encodeURIComponent(product.brand || 'Velando')}`

  function handleAdd() {
    for (let i = 0; i < qty; i++) addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      <Head>
        <title>{product.name} — Velando</title>
        <meta name="description" content={product.desc?.slice(0, 160) || product.name} />
      </Head>

      <Header />

      <main className="container" style={{ padding: '32px 24px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 28, fontSize: 13, color: '#64748b', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#1a56db' }}>Alle Produkte</Link>
          <span>›</span>
          {product.brand && <><Link href={`/?brand=${product.brand}`} style={{ color: '#1a56db' }}>{product.brand}</Link><span>›</span></>}
          <span style={{ color: '#334155' }}>{product.name.slice(0, 60)}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, marginBottom: 64 }}>
          {/* Gallery */}
          <div>
            <div style={{ background: '#f8fafc', borderRadius: 16, overflow: 'hidden', aspectRatio: '1', marginBottom: 12, border: '1px solid #e2e8f0' }}>
              <img
                src={mainImg || fallback}
                alt={product.name}
                onError={e => e.target.src = fallback}
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 24 }}
              />
            </div>
            {imgs.length > 1 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {imgs.slice(0, 8).map((img, i) => (
                  <div key={i} onClick={() => setMainImg(img)} style={{
                    width: 64, height: 64, borderRadius: 9,
                    border: `2px solid ${mainImg === img ? '#1a56db' : '#e2e8f0'}`,
                    overflow: 'hidden', cursor: 'pointer', background: '#f8fafc'
                  }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.brand && (
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#1a56db', marginBottom: 8 }}>
                {product.brand}
              </div>
            )}
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 20 }}>
              {product.name}
            </h1>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
              <span style={{ fontSize: 36, fontWeight: 900, color: '#0f172a' }}>{formatPrice(product.new_price)}</span>
              {product.price > product.new_price && (
                <span style={{ fontSize: 20, color: '#94a3b8', textDecoration: 'line-through' }}>{formatPrice(product.price)}</span>
              )}
            </div>

            {savings > 0 && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#eff6ff', color: '#1a56db', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
                Du sparst {formatPrice(savings)} ({discount}%)
              </div>
            )}

            {/* Shipping */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#16a34a', fontSize: 14, fontWeight: 600, marginBottom: 24, padding: '10px 14px', background: '#f0fdf4', borderRadius: 9 }}>
              🚚 Kostenloser Versand nach Deutschland
            </div>

            {/* Qty + Add */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1.5px solid #e2e8f0', borderRadius: 10, padding: '8px 14px' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#334155', width: 24 }}>−</button>
                <span style={{ fontWeight: 700, fontSize: 16, minWidth: 24, textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#334155', width: 24 }}>+</button>
              </div>
              <button onClick={handleAdd} style={{
                flex: 1, padding: '12px 24px',
                background: added ? '#16a34a' : '#1a56db',
                color: '#fff', border: 'none', borderRadius: 10,
                fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s'
              }}>
                {added ? '✓ In den Warenkorb' : 'In den Warenkorb'}
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
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 20, marginTop: 4 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>Produktbeschreibung</h3>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: '#64748b', whiteSpace: 'pre-line' }}>{product.desc}</p>
              </div>
            )}
          </div>
        </div>

        {/* Specs table */}
        {product.attrs && Object.keys(product.attrs).length > 0 && (
          <div style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 20 }}>Technische Daten</h2>
            <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              {Object.entries(product.attrs).map(([key, val], i) => (
                <div key={key} style={{
                  display: 'grid', gridTemplateColumns: '240px 1fr',
                  borderBottom: i < Object.keys(product.attrs).length - 1 ? '1px solid #f1f5f9' : 'none',
                  background: i % 2 === 0 ? '#fff' : '#f8fafc'
                }}>
                  <div style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#64748b' }}>{key}</div>
                  <div style={{ padding: '12px 16px', fontSize: 13, color: '#0f172a' }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 20 }}>Weitere Produkte von {product.brand}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
              {related.map(p => (
                <Link key={p.id} href={`/product/${p.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: 12, cursor: 'pointer', transition: 'box-shadow 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(26,86,219,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                  >
                    <div style={{ background: '#f8fafc', borderRadius: 8, aspectRatio: '1', overflow: 'hidden', marginBottom: 10 }}>
                      <img src={p.img || fallback} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 8 }} onError={e => e.target.src = fallback} />
                    </div>
                    <div style={{ fontSize: 12, color: '#1a56db', fontWeight: 600, marginBottom: 4 }}>{p.brand}</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#0f172a', lineHeight: 1.3, marginBottom: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.name}</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>{formatPrice(p.new_price)}</div>
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
