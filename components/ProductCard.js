import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '../lib/cart'

function formatPrice(p) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(p)
}

// Добавляет Cloudinary трансформации: WebP, сжатие, resize
function optimizeCloudinaryUrl(url, width = 400) {
  if (!url || !url.includes('res.cloudinary.com')) return url
  // Вставляем трансформации после /upload/
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},c_limit/`)
}

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [imgErr, setImgErr] = useState(false)
  const [added, setAdded] = useState(false)

  const discount = product.price > 0
    ? Math.round((1 - product.new_price / product.price) * 100)
    : 0

  const fallback = `https://via.placeholder.com/300x300/eff6ff/1a56db?text=${encodeURIComponent(product.brand || 'Velando')}`

  const imgSrc = !imgErr && product.img
    ? optimizeCloudinaryUrl(product.img, 400)
    : fallback

  function handleAdd(e) {
    e.preventDefault()
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <Link href={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#fff',
        borderRadius: 14,
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(26,86,219,0.12)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
      >
        {/* Image */}
        <div style={{
          position: 'relative',
          aspectRatio: '1',
          background: '#f8fafc',
          overflow: 'hidden'
        }}>
          <img
            src={imgSrc}
            alt={product.name}
            loading="lazy"
            width={400}
            height={400}
            onError={() => setImgErr(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: 12,
              transition: 'transform 0.3s'
            }}
          />
          {discount > 0 && (
            <span style={{
              position: 'absolute',
              top: 10,
              left: 10,
              background: '#1a56db',
              color: '#fff',
              fontSize: 11,
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: 6
            }}>
              -{discount}%
            </span>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '14px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {product.brand && (
            <div style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              color: '#1a56db',
              marginBottom: 4
            }}>
              {product.brand}
            </div>
          )}

          <div style={{
            fontSize: 13.5,
            fontWeight: 500,
            color: '#0f172a',
            lineHeight: 1.4,
            marginBottom: 12,
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {product.name}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 19, fontWeight: 800, color: '#0f172a' }}>
              {formatPrice(product.new_price)}
            </span>
            {product.price > product.new_price && (
              <span style={{ fontSize: 13, color: '#94a3b8', textDecoration: 'line-through' }}>
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            style={{
              width: '100%',
              padding: '10px',
              background: added ? '#16a34a' : '#0f172a',
              color: '#fff',
              border: 'none',
              borderRadius: 9,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s',
              letterSpacing: '0.2px'
            }}
          >
            {added ? '✓ Hinzugefügt' : 'In den Warenkorb'}
          </button>
        </div>
      </div>
    </Link>
  )
}
