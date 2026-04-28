import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Versand() {
  return (
    <>
      <Head><title>Versand & Lieferung — Velando</title></Head>
      <Header />
      <main className="container" style={{ padding: '48px 24px', maxWidth: 800 }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Versand & Lieferung</h1>
        <p style={{ color: '#64748b', marginBottom: 40 }}>Alle Informationen zu Versand und Lieferzeiten</p>

        <Section title="Kostenloser Versand">
          <p>Wir liefern alle Bestellungen <strong>kostenlos</strong> innerhalb Deutschlands. Es fallen keine zusätzlichen Versandkosten an.</p>
        </Section>

        <Section title="Lieferzeiten">
          <p>Die Lieferzeit beträgt in der Regel <strong>3–7 Werktage</strong> nach Bestelleingang. Bei Artikeln die auf Anfrage verfügbar sind, kontaktieren wir dich persönlich zur voraussichtlichen Lieferzeit.</p>
        </Section>

        <Section title="Versandpartner">
          <p>Wir versenden mit DHL und DPD. Nach Versand erhältst du eine Tracking-Nummer per E-Mail.</p>
        </Section>

        <Section title="Liefergebiet">
          <p>Derzeit liefern wir ausschließlich innerhalb Deutschlands. Für Lieferungen in andere Länder kontaktiere uns bitte unter <a href="mailto:info@velando24.de" style={{ color: '#1a56db' }}>info@velando24.de</a>.</p>
        </Section>

        <Section title="Beschädigte Ware">
          <p>Sollte deine Bestellung beschädigt ankommen, kontaktiere uns bitte innerhalb von 48 Stunden nach Erhalt unter <a href="mailto:info@velando24.de" style={{ color: '#1a56db' }}>info@velando24.de</a> mit Fotos des Schadens.</p>
        </Section>
      </main>
      <Footer />
    </>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid #eff6ff' }}>{title}</h2>
      <div style={{ fontSize: 15, lineHeight: 1.8, color: '#334155' }}>{children}</div>
    </div>
  )
}
