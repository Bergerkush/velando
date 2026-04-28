import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Rueckgabe() {
  return (
    <>
      <Head><title>Rückgabe — Velando</title></Head>
      <Header />
      <main className="container" style={{ padding: '48px 24px', maxWidth: 800 }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Rückgabe</h1>
        <p style={{ color: '#64748b', marginBottom: 40 }}>30 Tage Rückgaberecht — einfach und unkompliziert</p>

        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '20px 24px', marginBottom: 40 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#16a34a', margin: 0 }}>✓ 30 Tage kostenloses Rückgaberecht</p>
          <p style={{ fontSize: 14, color: '#166534', margin: '6px 0 0' }}>Du hast 30 Tage ab Erhalt der Ware Zeit, deine Bestellung zurückzusenden.</p>
        </div>

        <Section title="So funktioniert die Rückgabe">
          <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <li>Sende eine E-Mail an <a href="mailto:info@velando24.de" style={{ color: '#1a56db' }}>info@velando24.de</a> mit deiner Bestellnummer und dem Grund der Rückgabe.</li>
            <li>Du erhältst von uns innerhalb von 24 Stunden eine Bestätigung und weitere Anweisungen.</li>
            <li>Verpacke den Artikel sicher in der Originalverpackung.</li>
            <li>Sende die Ware an die von uns mitgeteilte Adresse.</li>
            <li>Nach Erhalt und Prüfung erstatten wir den Kaufpreis innerhalb von 14 Tagen.</li>
          </ol>
        </Section>

        <Section title="Bedingungen">
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li>Die Ware muss unbenutzt und in einwandfreiem Zustand sein.</li>
            <li>Die Originalverpackung sollte vorhanden sein.</li>
            <li>Maßgefertigte oder personalisierte Artikel sind von der Rückgabe ausgeschlossen.</li>
          </ul>
        </Section>

        <Section title="Rückerstattung">
          <p>Die Rückerstattung erfolgt auf das original verwendete Zahlungsmittel innerhalb von <strong>14 Werktagen</strong> nach Erhalt der Rückware.</p>
        </Section>

        <Section title="Kontakt">
          <p>Bei Fragen zur Rückgabe erreichst du uns unter <a href="mailto:info@velando24.de" style={{ color: '#1a56db' }}>info@velando24.de</a>.</p>
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
