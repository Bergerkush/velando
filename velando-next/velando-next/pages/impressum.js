import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

function LegalPage({ title, children }) {
  return (
    <>
      <Head><title>{title} — Velando</title></Head>
      <Header />
      <main className="container" style={{ padding: '48px 24px', maxWidth: 800 }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', marginBottom: 32 }}>{title}</h1>
        <div style={{ fontSize: 15, lineHeight: 1.8, color: '#334155' }}>{children}</div>
      </main>
      <Footer />
    </>
  )
}

export default function Impressum() {
  return (
    <LegalPage title="Impressum">
      <p><strong>Angaben gemäß § 5 TMG</strong></p>
      <br />
      <p>Velando GmbH<br />Musterstraße 1<br />12345 Berlin<br />Deutschland</p>
      <br />
      <p><strong>Vertreten durch:</strong><br />Max Mustermann</p>
      <br />
      <p><strong>Kontakt:</strong><br />E-Mail: info@velando.de<br />Telefon: +49 (0) 30 123456789</p>
      <br />
      <p><strong>Handelsregister:</strong><br />HRB 123456 B, Amtsgericht Berlin-Charlottenburg</p>
      <br />
      <p><strong>Umsatzsteuer-ID:</strong><br />DE123456789</p>
    </LegalPage>
  )
}
