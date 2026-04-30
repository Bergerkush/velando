import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import reviews from '../public/reviews.json'

function Stars({ rating }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i <= rating ? '#f59e0b' : '#e2e8f0'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

export default function Bewertungen() {
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
  const fiveStars = reviews.filter(r => r.rating === 5).length

  return (
    <>
      <Head>
        <title>Kundenbewertungen — Velando</title>
        <meta name="description" content={`${reviews.length} Bewertungen · ${avgRating} von 5 Sternen`} />
      </Head>
      <Header />

      <main>
        {/* Hero */}
        <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1a56db 100%)', padding: '56px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h1 style={{ fontSize: 40, fontWeight: 900, color: '#f8fafc', marginBottom: 16 }}>Kundenbewertungen</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <Stars rating={5} />
              <span style={{ fontSize: 32, fontWeight: 900, color: '#f59e0b' }}>{avgRating}</span>
              <span style={{ color: 'rgba(248,250,252,0.6)', fontSize: 15 }}>von 5</span>
            </div>
            <p style={{ color: 'rgba(248,250,252,0.6)', fontSize: 15 }}>
              {reviews.length} Bewertungen · {fiveStars} mit 5 Sternen
            </p>
          </div>
        </section>

        <div className="container" style={{ padding: '48px 24px' }}>
          {/* Rating summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }}>
            {[
              { num: avgRating, label: 'Durchschnittsbewertung', showStars: true },
              { num: `${reviews.length}`, label: 'Bewertungen gesamt' },
              { num: `${Math.round(fiveStars/reviews.length*100)}%`, label: 'Empfehlen uns' },
            ].map(s => (
              <div key={s.label} style={{ background: '#fff', borderRadius: 14, padding: '24px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                {s.showStars ? (
                  <div style={{ marginBottom: 6 }}>
                    <div style={{ fontSize: 32, fontWeight: 900, color: '#0f172a' }}>{s.num}</div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 4 }}>
                      {[1,2,3,4,5].map(i => (
                        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: 32, fontWeight: 900, color: '#0f172a', marginBottom: 6 }}>{s.num}</div>
                )}
                <div style={{ fontSize: 13, color: '#64748b' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Reviews grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))', gap: 24 }}>
            {reviews.map(review => (
              <div key={review.id} style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                {/* Header */}
                <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 14, borderBottom: review.has_photo ? '1px solid #f1f5f9' : 'none' }}>
                  <img src={review.avatar} alt={review.name}
                    style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid #eff6ff' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>{review.name}</span>
                      {review.verified && (
                        <span style={{ background: '#f0fdf4', color: '#16a34a', fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 10 }}>
                          ✓ Verifiziert
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Stars rating={review.rating} />
                      <span style={{ fontSize: 12, color: '#94a3b8' }}>{review.city} · {review.date}</span>
                    </div>
                  </div>
                </div>

                {/* Photo if exists */}
                {review.has_photo && review.product_img && (
                  <div style={{ height: 200, overflow: 'hidden', background: '#f8fafc' }}>
                    <img src={review.product_img} alt={review.product}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}

                {/* Content */}
                <div style={{ padding: '20px 24px' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#1a56db', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>
                    {review.product}
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: '#334155', margin: 0 }}>
                    {review.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: 56, padding: '40px 24px', background: '#eff6ff', borderRadius: 16, border: '1px solid #bfdbfe' }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Bereit für dein nächstes Abenteuer?</h2>
            <p style={{ color: '#64748b', marginBottom: 24 }}>Entdecke über 735 Produkte zu unschlagbaren Preisen</p>
            <Link href="/" style={{ display: 'inline-block', padding: '14px 32px', background: '#1a56db', color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              Jetzt shoppen →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
