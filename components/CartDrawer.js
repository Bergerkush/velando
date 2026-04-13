import { useState } from 'react'
import { useCart } from '../lib/cart'
import CheckoutModal from './CheckoutModal'

function formatPrice(p) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(p)
}

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, changeQty, totalPrice, totalItems } = useCart()
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(15,23,42,0.4)',
            zIndex: 200,
            backdropFilter: 'blur(2px)'
          }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: 'fixed',
        top: 0, right: 0,
        height: '100vh',
        width: 400,
        background: '#fff',
        zIndex: 201,
        display: 'flex',
        flexDirection: 'column',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.32s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.12)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Warenkorb</h2>
            {totalItems > 0 && (
              <span style={{ fontSize: 13, color: '#64748b' }}>{totalItems} Artikel</span>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              width: 34,
              height: 34,
              borderRadius: '50%',
              fontSize: 16,
              color: '#64748b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
              <p style={{ fontWeight: 500 }}>Dein Warenkorb ist leer</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                gap: 12,
                padding: '14px 0',
                borderBottom: '1px solid #f1f5f9'
              }}>
                <div style={{
                  width: 68,
                  height: 68,
                  background: '#f8fafc',
                  borderRadius: 9,
                  overflow: 'hidden',
                  flexShrink: 0
                }}>
                  <img
                    src={item.img || ''}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }}
                    onError={e => e.target.style.display = 'none'}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#0f172a',
                    lineHeight: 1.4,
                    marginBottom: 4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
                    {formatPrice(item.new_price * item.qty)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button onClick={() => changeQty(item.id, -1)} style={qtyBtnStyle}>−</button>
                    <span style={{ fontSize: 14, fontWeight: 600, minWidth: 20, textAlign: 'center' }}>{item.qty}</span>
                    <button onClick={() => changeQty(item.id, 1)} style={qtyBtnStyle}>+</button>
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 15, marginLeft: 4 }}
                    >✕</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{
            padding: 24,
            borderTop: '1px solid #e2e8f0',
            background: '#f8fafc'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16
            }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: '#64748b' }}>Gesamt</span>
              <span style={{ fontSize: 24, fontWeight: 800, color: '#0f172a' }}>
                {formatPrice(totalPrice)}
              </span>
            </div>
            <button
              onClick={() => { onClose(); setCheckoutOpen(true) }}
              style={{
                width: '100%',
                padding: 14,
                background: '#1a56db',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.target.style.background = '#1340b0'}
              onMouseLeave={e => e.target.style.background = '#1a56db'}
            >
              Zur Kasse →
            </button>
            <p style={{ textAlign: 'center', fontSize: 12, color: '#16a34a', marginTop: 10, fontWeight: 600 }}>
              ✓ Kostenloser Versand inklusive
            </p>
          </div>
        )}
      </div>

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  )
}

const qtyBtnStyle = {
  width: 26, height: 26,
  border: '1.5px solid #e2e8f0',
  borderRadius: 6,
  background: '#fff',
  cursor: 'pointer',
  fontSize: 14,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#334155'
}
