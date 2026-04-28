import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) {
      setTimeout(() => setVisible(true), 1000)
    }
  }, [])

  function acceptAll() {
    localStorage.setItem('cookie_consent', 'all')
    setVisible(false)
    // Включаем GA
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted'
      })
    }
  }

  function acceptNecessary() {
    localStorage.setItem('cookie_consent', 'necessary')
    setVisible(false)
    // GA остаётся выключен
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      })
    }
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      left: 24,
      right: 24,
      zIndex: 999,
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{
        background: '#0f172a',
        borderRadius: 16,
        padding: '24px 28px',
        maxWidth: 700,
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        gap: 24,
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        {/* Icon */}
        <div style={{ fontSize: 32, flexShrink: 0 }}>🍪</div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#f8fafc', marginBottom: 6 }}>
            Wir verwenden Cookies
          </div>
          <div style={{ fontSize: 13, color: 'rgba(248,250,252,0.6)', lineHeight: 1.5 }}>
            Wir nutzen Cookies für Analyse und Verbesserung unseres Angebots.
            Mehr dazu in unserer{' '}
            <a href="/datenschutz" style={{ color: '#60a5fa', textDecoration: 'underline' }}>
              Datenschutzerklärung
            </a>.
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10, flexShrink: 0, flexWrap: 'wrap' }}>
          <button
            onClick={acceptNecessary}
            style={{
              padding: '10px 18px',
              background: 'rgba(255,255,255,0.08)',
              color: 'rgba(248,250,252,0.8)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          >
            Nur notwendige
          </button>
          <button
            onClick={acceptAll}
            style={{
              padding: '10px 18px',
              background: '#1a56db',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#1340b0'}
            onMouseLeave={e => e.currentTarget.style.background = '#1a56db'}
          >
            Alle akzeptieren ✓
          </button>
        </div>
      </div>
    </div>
  )
}
