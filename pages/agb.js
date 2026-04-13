import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function AGB() {
  return (
    <>
      <Head><title>AGB — Velando</title></Head>
      <Header />
      <main className="container" style={{ padding: '48px 24px', maxWidth: 800 }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', marginBottom: 32 }}>Allgemeine Geschäftsbedingungen</h1>
        <div style={{ fontSize: 15, lineHeight: 1.8, color: '#334155' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>§ 1 Geltungsbereich</h2>
          <p>Diese Allgemeinen Geschäftsbedingungen gelten für alle Bestellungen, die über unseren Online-Shop velando.de aufgegeben werden.</p>
          <br />
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>§ 2 Vertragspartner</h2>
          <p>Der Kaufvertrag kommt zustande mit Velando GmbH, Musterstraße 1, 12345 Berlin.</p>
          <br />
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>§ 3 Preise und Versandkosten</h2>
          <p>Alle Preise sind Endpreise inkl. der gesetzlichen Mehrwertsteuer. Der Versand ist kostenlos.</p>
          <br />
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>§ 4 Lieferung</h2>
          <p>Die Lieferung erfolgt innerhalb von 3–5 Werktagen nach Bestelleingang.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
