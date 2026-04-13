import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Datenschutz() {
  return (
    <>
      <Head><title>Datenschutzerklärung — Velando</title></Head>
      <Header />
      <main className="container" style={{ padding: '48px 24px', maxWidth: 800 }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', marginBottom: 32 }}>Datenschutzerklärung</h1>
        <div style={{ fontSize: 15, lineHeight: 1.8, color: '#334155' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>1. Verantwortlicher</h2>
          <p>Velando GmbH, Musterstraße 1, 12345 Berlin. E-Mail: datenschutz@velando.de</p>
          <br />
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>2. Erhobene Daten</h2>
          <p>Wir erheben nur die Daten, die für die Vertragserfüllung notwendig sind (Name, Adresse, E-Mail, Telefon).</p>
          <br />
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>3. Verwendung</h2>
          <p>Ihre Daten werden ausschließlich zur Bestellabwicklung verwendet und nicht an Dritte weitergegeben.</p>
          <br />
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>4. Ihre Rechte</h2>
          <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
