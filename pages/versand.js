import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Versand() {
  return (
    <>
      <Head><title>Versand, Lieferung & Zahlung — Velando</title></Head>
      <Header />
      <main className="container" style={{ padding: '48px 24px', maxWidth: 800 }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Versand, Lieferung & Zahlung</h1>
        <p style={{ color: '#64748b', marginBottom: 40 }}>Alle Informationen zu Bestellvorgang, Zahlung und Lieferzeiten</p>

        <Section title="So funktioniert deine Bestellung">
          <p><strong>1. Produkt auswählen</strong> — Lege die gewünschten Artikel in den Warenkorb und gib deine Lieferadresse ein.</p>
          <p><strong>2. Bestellung absenden</strong> — Nach dem Absenden erhältst du eine Bestätigungs-E-Mail mit deiner Bestellübersicht.</p>
          <p><strong>3. Zahlungsaufforderung erhalten</strong> — Innerhalb von 24 Stunden senden wir dir per E-Mail eine Zahlungsaufforderung mit allen Details — entweder als PayPal-Link oder mit unseren Bankdaten für eine Überweisung.</p>
          <p><strong>4. Zahlung durchführen</strong> — Bezahle bequem per PayPal oder Banküberweisung. Nach Zahlungseingang wird deine Bestellung sofort versandt.</p>
        </Section>

        <Section title="Zahlungsarten">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 8 }}>
            <div style={{ background: '#f8fafc', borderRadius: 12, padding: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>PayPal</div>
              <p style={{ margin: 0 }}>Du erhältst per E-Mail einen PayPal-Zahlungslink. Einfach klicken, einloggen und bezahlen — sofort und sicher.</p>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 12, padding: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Banküberweisung (Vorkasse)</div>
              <p style={{ margin: 0 }}>Du erhältst per E-Mail unsere Bankverbindung. Nach Zahlungseingang (1–2 Werktage) versenden wir deine Bestellung.</p>
            </div>
          </div>
          <p style={{ marginTop: 16 }}>Alle Zahlungen sind <strong>SSL-verschlüsselt</strong>. Deine Daten werden sicher übertragen und nicht an Dritte weitergegeben.</p>
        </Section>

        <Section title="Kostenloser Versand">
          <p>Wir liefern alle Bestellungen <strong>kostenlos</strong> innerhalb Deutschlands. Es fallen keine zusätzlichen Versandkosten an — unabhängig vom Bestellwert.</p>
        </Section>

        <Section title="Lieferzeiten">
          <p>Die Lieferzeit beträgt in der Regel <strong>3–7 Werktage</strong> nach Zahlungseingang. Bei Artikeln die auf Anfrage verfügbar sind, kontaktieren wir dich persönlich zur voraussichtlichen Lieferzeit.</p>
        </Section>

        <Section title="Versandpartner">
          <p>Wir versenden mit <strong>DHL</strong> und <strong>DPD</strong>. Nach Versand erhältst du eine Sendungsverfolgungsnummer per E-Mail, mit der du dein Paket jederzeit verfolgen kannst.</p>
        </Section>

        <Section title="Liefergebiet">
          <p>Derzeit liefern wir ausschließlich innerhalb Deutschlands. Für Lieferungen in andere Länder kontaktiere uns bitte unter <a href="mailto:info@velando24.de" style={{ color: '#1a56db' }}>info@velando24.de</a>.</p>
        </Section>

        <Section title="Beschädigte Ware">
          <p>Sollte deine Bestellung beschädigt ankommen, kontaktiere uns bitte innerhalb von 48 Stunden nach Erhalt unter <a href="mailto:info@velando24.de" style={{ color: '#1a56db' }}>info@velando24.de</a> mit Fotos des Schadens. Wir kümmern uns umgehend um einen Ersatz oder eine Rückerstattung.</p>
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
