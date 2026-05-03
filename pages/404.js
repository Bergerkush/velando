import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Seite nicht gefunden — Velando</title>
      </Head>
      <Header />
      <main style={{ textAlign: 'center', padding: '80px 24px 120px', maxWidth: 520, margin: '0 auto' }}>
        <div style={{ fontSize: 80, fontWeight: 900, color: '#e2e8f0', lineHeight: 1, marginBottom: 8 }}>404</div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>Seite nicht gefunden</h1>
        <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7, marginBottom: 36 }}>
          Die angeforderte Seite existiert leider nicht oder wurde verschoben.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '13px 28px', background: '#1a56db', color: '#fff',
            borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none'
          }}>
            ← Zur Startseite
          </Link>
          <Link href="/#catalog" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '13px 28px', background: '#f1f5f9', color: '#334155',
            borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: 'none',
            border: '1.5px solid #e2e8f0'
          }}>
            Alle Produkte
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
