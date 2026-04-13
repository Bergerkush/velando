import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function UeberUns() {
  return (
    <>
      <Head><title>Über uns — Velando</title></Head>
      <Header />
      <main>
        {/* Hero */}
        <section style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1a56db 100%)',
          padding: '80px 24px',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <h1 style={{ fontSize: 52, fontWeight: 900, color: '#f8fafc', lineHeight: 1.1, marginBottom: 20 }}>
              Sport ist unsere<br /><span style={{ color: '#60a5fa' }}>Leidenschaft</span>
            </h1>
            <p style={{ color: 'rgba(248,250,252,0.7)', fontSize: 18, lineHeight: 1.7 }}>
              Bei Velando glauben wir daran, dass jeder Mensch Zugang zu hochwertiger Sportausrüstung haben sollte.
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="container" style={{ padding: '64px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginBottom: 64 }}>
            <div>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Unsere Mission</h2>
              <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: 16 }}>
                Wir bieten sorgfältig ausgewählte Produkte von führenden Marken zu fairen Preisen an — damit du dich auf das Wesentliche konzentrieren kannst: die Bewegung.
              </p>
            </div>
            <div>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Unsere Werte</h2>
              <ul style={{ color: '#64748b', lineHeight: 2, fontSize: 16, listStyle: 'none' }}>
                {['✓ Qualität vor Quantität', '✓ Faire, transparente Preise', '✓ Kostenloser Versand', '✓ Persönlicher Service'].map(v => (
                  <li key={v} style={{ fontWeight: 500, color: '#334155' }}>{v}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { num: '2024', label: 'Gegründet' },
              { num: '30+', label: 'Top Marken' },
              { num: '735', label: 'Produkte' }
            ].map(s => (
              <div key={s.label} style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: 16,
                padding: 36,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 44, fontWeight: 900, color: '#1a56db', marginBottom: 8 }}>{s.num}</div>
                <div style={{ fontSize: 15, color: '#64748b', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
