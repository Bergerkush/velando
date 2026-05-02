import { useState } from 'react'
import { useCart } from '../lib/cart'

function formatPrice(p) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(p)
}

export default function CheckoutModal({ open, onClose }) {
  const { items, totalPrice, clearCart } = useCart()
  const [success, setSuccess] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    vorname: '', nachname: '', email: '', telefon: '',
    strasse: '', plz: '', stadt: ''
  })

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    setError(null)
    try {
      const res = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form, items, total: totalPrice })
      })
      if (res.ok) {
        // Google Ads conversion tracking — срабатывает при успешном заказе
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            send_to: 'AW-18130689976/eiEFCM-upqUcELi_scVD',
            value: totalPrice,
            currency: 'EUR',
          })
        }
        setSuccess(true)
        clearCart()
      } else {
        setError('Fehler beim Senden. Bitte versuche es erneut.')
      }
    } catch (err) {
      setError('Verbindungsfehler. Bitte versuche es erneut.')
    } finally {
      setSending(false)
    }
  }

  function handleClose() {
    setSuccess(false); setError(null)
    setForm({ vorname: '', nachname: '', email: '', telefon: '', strasse: '', plz: '', stadt: '' })
    onClose()
  }

  if (!open) return null

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.5)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(4px)' }}
      onClick={e => e.target === e.currentTarget && handleClose()}>
      <div style={{ background: '#fff', borderRadius: 18, padding: 40, maxWidth: 540, width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        {success ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Vielen Dank!</h2>
            <p style={{ color: '#64748b', marginBottom: 28, lineHeight: 1.6 }}>Deine Bestellung wurde erfolgreich aufgegeben.<br />Wir melden uns in Kürze per E-Mail bei dir.</p>
            <button onClick={handleClose} style={primaryBtnStyle}>Weiter shoppen</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>Bestellung aufgeben</h2>
                <p style={{ color: '#64748b', fontSize: 14 }}>Wir melden uns per E-Mail bei dir</p>
              </div>
              <button type="button" onClick={handleClose} style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: 34, height: 34, cursor: 'pointer', fontSize: 16, color: '#64748b' }}>✕</button>
            </div>

            <div style={{ background: '#f8fafc', borderRadius: 10, padding: 16, marginBottom: 24, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>Bestellübersicht</div>
              {items.map((i, idx) => (
                <div key={`${i.id}-${i.selectedSize}-${idx}`} style={{ marginBottom: 8, paddingBottom: 8, borderBottom: idx < items.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#334155' }}>
                    <span style={{ flex: 1, marginRight: 8 }}>{i.name.slice(0, 35)}{i.name.length > 35 ? '…' : ''} ×{i.qty}</span>
                    <span style={{ fontWeight: 600, flexShrink: 0 }}>{formatPrice(i.new_price * i.qty)}</span>
                  </div>
                  {i.selectedSize && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                      <span style={{ fontSize: 11, color: '#64748b' }}>Größe:</span>
                      <span style={{ background: '#eff6ff', color: '#1a56db', padding: '1px 8px', borderRadius: 5, fontSize: 11, fontWeight: 700 }}>{i.selectedSize}</span>
                      {i.sizes && i.sizes[i.selectedSize] === 'on_request' && <span style={{ fontSize: 11, color: '#f59e0b', fontWeight: 600 }}>⏱ Auf Anfrage</span>}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: 10, marginTop: 4 }}>
                <span>Gesamt</span><span>{formatPrice(totalPrice)}</span>
              </div>
              <div style={{ fontSize: 12, color: '#16a34a', fontWeight: 600, marginTop: 6 }}>✓ Kostenloser Versand</div>
              {items.some(i => i.selectedSize && i.sizes && i.sizes[i.selectedSize] === 'on_request') && (
                <div style={{ marginTop: 10, padding: '8px 12px', background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 8, fontSize: 12, color: '#92400e' }}>
                  ⏱ Einige Größen sind auf Anfrage — wir kontaktieren dich zur Lieferzeit.
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <Field label="Vorname *" value={form.vorname} onChange={v => setForm({ ...form, vorname: v })} placeholder="Max" required />
              <Field label="Nachname *" value={form.nachname} onChange={v => setForm({ ...form, nachname: v })} placeholder="Mustermann" required />
            </div>
            <Field label="E-Mail *" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} placeholder="max@beispiel.de" required style={{ marginBottom: 14 }} />
            <Field label="Telefon" value={form.telefon} onChange={v => setForm({ ...form, telefon: v })} placeholder="+49 ..." style={{ marginBottom: 14 }} />
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14, marginBottom: 14 }}>
              <Field label="Straße *" value={form.strasse} onChange={v => setForm({ ...form, strasse: v })} placeholder="Musterstrasse 1" required />
              <Field label="PLZ *" value={form.plz} onChange={v => setForm({ ...form, plz: v })} placeholder="12345" required />
            </div>
            <Field label="Stadt *" value={form.stadt} onChange={v => setForm({ ...form, stadt: v })} placeholder="Berlin" required style={{ marginBottom: 24 }} />

            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', marginBottom: 16, color: '#dc2626', fontSize: 14 }}>⚠ {error}</div>
            )}

            <button type="submit" disabled={sending} style={{ ...primaryBtnStyle, opacity: sending ? 0.7 : 1, cursor: sending ? 'not-allowed' : 'pointer' }}>
              {sending ? 'Wird gesendet...' : 'Bestellung absenden ✓'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text', required, style }) {
  return (
    <div style={style}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 5 }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required}
        style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 14, color: '#0f172a', outline: 'none', background: '#fff', transition: 'border-color 0.2s' }}
        onFocus={e => e.target.style.borderColor = '#1a56db'}
        onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
    </div>
  )
}

const primaryBtnStyle = { width: '100%', padding: 15, background: '#1a56db', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer' }
