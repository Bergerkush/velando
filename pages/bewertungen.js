import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import reviews from '../public/reviews.json'

function Stars({ rating, size = 16 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= rating ? '#f59e0b' : '#e2e8f0'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

export default function Bewertungen() {
  const [lightbox, setLightbox] = useState(null)
  const totalReviews = 197
  const avgRating = '4.9'
  const fiveStarPct = 94

  return (
    <>
      <Head>
        <title>Kundenbewertungen — Velando</title>
        <meta name="description" content={`${totalReviews} Bewertungen · ${avgRating} von 5 Sternen`} />
      </Head>
      <Header />

      <style>{`
        @media (max-width: 768px) {
          .bew-stats { grid-template-columns: 1fr !important; gap: 10px !important; }
          .bew-grid { grid-template-columns: 1fr !important; }
          .bew-hero h1 { font-size: 28px !important; }
        }
      `}</style>

      {/* Hero */}
      <section className="bew-hero" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1a56db 100%)', padding: '48px 16px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: '#f8fafc', marginBottom: 16 }}>Kundenbewertungen</h1>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <Stars rating={5} size={22} />
            <span style={{ fontSize: 32, fontWeight: 900, color: '#f59e0b' }}>{avgRating}</span>
            <span style={{ color: 'rgba(248,250,252,0.6)', fontSize: 15 }}>von 5</span>
          </div>
          <p style={{ color: 'rgba(248,250,252,0.6)', fontSize: 15 }}>
            {totalReviews} Bewertungen · {fiveStarPct}% mit 5 Sternen
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '32px 16px' }}>
        {/* Stats */}
        <div className="bew-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
          {[
            { num: avgRating, label: 'Durchschnitt', stars: true },
            { num: `${totalReviews}`, label: 'Bewertungen', stars: false },
            { num: `${fiveStarPct}%`, label: 'Empfehlen uns', stars: false },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', borderRadius: 12, padding: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', marginBottom: 4 }}>{s.num}</div>
              {s.stars && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 4 }}>
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              )}
              <div style={{ fontSize: 12, color: '#64748b' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Reviews grid */}
        <div className="bew-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
          {reviews.map(review => (
            <div key={review.id} style={{ background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ padding: '16px 16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src={review.avatar} alt={review.name}
                  style={{ width: 46, height: 46, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid #eff6ff' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{review.name}</span>
                    {review.verified && (
                      <span style={{ background: '#f0fdf4', color: '#16a34a', fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 8, whiteSpace: 'nowrap' }}>✓ Verifiziert</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Stars rating={review.rating} />
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>{review.city} · {review.date}</span>
                  </div>
                </div>
              </div>

              {review.has_photo && review.product_img && (
                <div onClick={() => setLightbox(review.product_img)}
                  style={{ margin: '12px 16px', borderRadius: 8, overflow: 'hidden', background: '#f8fafc', border: '1px solid #e2e8f0', cursor: 'zoom-in', height: 180 }}>
                  <img src={review.product_img} alt={review.product}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6 }} />
                </div>
              )}

              <div style={{ padding: '10px 16px 16px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#1a56db', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>
                  {review.product}
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: '#334155', margin: 0 }}>{review.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 48, padding: '32px 16px', background: '#eff6ff', borderRadius: 14, border: '1px solid #bfdbfe' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Bereit für dein nächstes Abenteuer?</h2>
          <p style={{ color: '#64748b', marginBottom: 20, fontSize: 14 }}>Entdecke über 735 Produkte zu unschlagbaren Preisen</p>
          <Link href="/" style={{ display: 'inline-block', padding: '13px 28px', background: '#1a56db', color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
            Jetzt shoppen →
          </Link>
        </div>
      </div>

      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, cursor: 'zoom-out' }}>
          <img src={lightbox} alt="" style={{ maxWidth: '95vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 12 }} />
          <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: 22, width: 40, height: 40, borderRadius: '50%', cursor: 'pointer' }}>✕</button>
        </div>
      )}

      <Footer />
    </>
  )
}
