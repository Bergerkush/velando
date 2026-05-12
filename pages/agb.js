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

          <Section title="§ 1 Geltungsbereich">
            <p>Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Bestellungen, die über den Online-Shop velando24.de aufgegeben werden. Mit der Bestellung erkennt der Kunde diese AGB an.</p>
          </Section>

          <Section title="§ 2 Vertragspartner">
            <p>Der Kaufvertrag kommt zustande mit:</p>
            <p>
              Stefan Eberle<br />
              Einzelunternehmer<br />
              Rotwandweg 1<br />
              82024 Taufkirchen<br />
              Deutschland<br />
              E-Mail: info@velando24.de<br />
              Telefon: +49 152 15396106
            </p>
          </Section>

          <Section title="§ 3 Vertragsschluss">
            <p>Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot, sondern eine Aufforderung zur Bestellung dar. Durch das Absenden der Bestellung gibt der Kunde ein verbindliches Angebot zum Kauf ab. Die Annahme des Angebots erfolgt durch eine Auftragsbestätigung per E-Mail.</p>
          </Section>

          <Section title="§ 4 Preise und Versandkosten">
            <p>Alle Preise sind Endpreise und enthalten die gesetzliche Mehrwertsteuer gemäß § 19 UStG (Kleinunternehmerregelung). Der Versand innerhalb Deutschlands ist kostenlos.</p>
          </Section>

          <Section title="§ 5 Zahlungsbedingungen">
            <p>Wir bieten folgende Zahlungsarten an:</p>
            <p><strong>PayPal:</strong> Nach Bestelleingang erhältst du per E-Mail einen PayPal-Zahlungslink. Die Zahlung erfolgt sofort und sicher über dein PayPal-Konto.</p>
            <p><strong>Banküberweisung (Vorkasse):</strong> Nach Bestelleingang erhältst du per E-Mail unsere Bankverbindung. Die Ware wird nach Zahlungseingang (in der Regel 1–2 Werktage) versandt.</p>
            <p>Die Zahlungsaufforderung wird innerhalb von 24 Stunden nach Bestelleingang per E-Mail versandt.</p>
          </Section>

          <Section title="§ 6 Lieferung">
            <p>Die Lieferung erfolgt ausschließlich innerhalb Deutschlands. Die Lieferzeit beträgt in der Regel 3–7 Werktage nach Zahlungseingang. Wir versenden mit DHL und DPD. Nach Versand erhältst du eine Sendungsverfolgungsnummer per E-Mail.</p>
          </Section>

          <Section title="§ 7 Widerrufsrecht">
            <p>Als Verbraucher hast du ein 14-tägiges Widerrufsrecht. Die vollständigen Informationen zum Widerrufsrecht findest du auf unserer Seite <a href="/widerruf" style={{ color: '#1a56db' }}>Widerrufsbelehrung</a>.</p>
          </Section>

          <Section title="§ 8 Rückgabe und Rückerstattung">
            <p>Darüber hinaus bieten wir dir ein freiwilliges <strong>30-tägiges Rückgaberecht</strong>. Die Ware muss in einwandfreiem Zustand und in der Originalverpackung zurückgesandt werden. Die Rückerstattung erfolgt innerhalb von 14 Werktagen nach Erhalt der Rückware auf das ursprünglich verwendete Zahlungsmittel.</p>
            <p>Weitere Details findest du auf unserer Seite <a href="/rueckgabe" style={{ color: '#1a56db' }}>Rückgabe</a>.</p>
          </Section>

          <Section title="§ 9 Gewährleistung">
            <p>Es gelten die gesetzlichen Gewährleistungsrechte. Alle Produkte sind Originalware von autorisierten Distributoren.</p>
          </Section>

          <Section title="§ 10 Haftung">
            <p>Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit. Für leichte Fahrlässigkeit haften wir nur bei Verletzung wesentlicher Vertragspflichten. Die Haftung ist in diesem Fall auf den vorhersehbaren, vertragstypischen Schaden begrenzt.</p>
          </Section>

          <Section title="§ 11 Datenschutz">
            <p>Informationen zur Verarbeitung deiner personenbezogenen Daten findest du in unserer <a href="/datenschutz" style={{ color: '#1a56db' }}>Datenschutzerklärung</a>.</p>
          </Section>

          <Section title="§ 12 Schlussbestimmungen">
            <p>Es gilt das Recht der Bundesrepublik Deutschland. Die europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" style={{ color: '#1a56db' }}>https://ec.europa.eu/consumers/odr</a>. Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
          </Section>

        </div>
      </main>
      <Footer />
    </>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>{title}</h2>
      {children}
    </div>
  )
}
