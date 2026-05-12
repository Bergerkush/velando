import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Impressum() {
  return (
    <>
      <Head><title>Impressum — Velando</title></Head>
      <Header />
      <main className="container" style={{ padding: '48px 24px', maxWidth: 800 }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Impressum</h1>
        <p style={{ color: '#64748b', marginBottom: 40 }}>Angaben gemäß § 5 TMG</p>

        <div style={{ fontSize: 15, lineHeight: 1.8, color: '#334155' }}>

          <Section title="Anbieter">
            <p>
              Stefan Eberle<br />
              Einzelunternehmer<br />
              Rotwandweg 1<br />
              82024 Taufkirchen<br />
              Deutschland
            </p>
          </Section>

          <Section title="Kontakt">
            <p>
              Telefon: <a href="tel:+4915215396106" style={{ color: '#1a56db' }}>+49 152 15396106</a><br />
              E-Mail: <a href="mailto:info@velando24.de" style={{ color: '#1a56db' }}>info@velando24.de</a><br />
              Website: <a href="https://velando24.de" style={{ color: '#1a56db' }}>velando24.de</a>
            </p>
          </Section>

          <Section title="Umsatzsteuer-ID">
            <p>Umsatzsteuerbefreit gemäß § 19 UStG (Kleinunternehmerregelung).</p>
          </Section>

          <Section title="Verantwortlich für den Inhalt">
            <p>
              Stefan Eberle<br />
              Rotwandweg 1<br />
              82024 Taufkirchen
            </p>
          </Section>

          <Section title="EU-Streitschlichtung">
            <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" style={{ color: '#1a56db' }}>https://ec.europa.eu/consumers/odr</a></p>
            <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
          </Section>

          <Section title="Haftungsausschluss">
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>Haftung für Inhalte</h3>
            <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.</p>

            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', marginBottom: 8, marginTop: 16 }}>Haftung für Links</h3>
            <p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>

            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', marginBottom: 8, marginTop: 16 }}>Urheberrecht</h3>
            <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
          </Section>

        </div>
      </main>
      <Footer />
    </>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid #eff6ff' }}>{title}</h2>
      {children}
    </div>
  )
}
