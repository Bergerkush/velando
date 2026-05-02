import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Impressum() {
  return (
    <>
      <Head>
        <title>Impressum — Velando24</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Header />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 80px' }}>
        <Link href="/" style={{ fontSize: 14, color: '#1a56db', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 32 }}>
          ← Zurück
        </Link>

        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Impressum</h1>
        <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 40 }}>Angaben gemäß § 5 TMG</p>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #e2e8f0' }}>Anbieter</h2>
          <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.8 }}>
            Velando24<br />
            Gautinger Str. 3<br />
            82319 Starnberg<br />
            Deutschland
          </p>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #e2e8f0' }}>Kontakt</h2>
          <table style={{ fontSize: 15, color: '#334155', lineHeight: 2, borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ paddingRight: 24, color: '#64748b', whiteSpace: 'nowrap' }}>Telefon</td>
                <td><a href="tel:+4915215396106" style={{ color: '#1a56db', textDecoration: 'none' }}>+49 152 15396106</a></td>
              </tr>
              <tr>
                <td style={{ paddingRight: 24, color: '#64748b', whiteSpace: 'nowrap' }}>E-Mail</td>
                <td><a href="mailto:info@velando24.de" style={{ color: '#1a56db', textDecoration: 'none' }}>info@velando24.de</a></td>
              </tr>
              <tr>
                <td style={{ paddingRight: 24, color: '#64748b', whiteSpace: 'nowrap' }}>Website</td>
                <td><a href="https://velando24.de" style={{ color: '#1a56db', textDecoration: 'none' }}>velando24.de</a></td>
              </tr>
            </tbody>
          </table>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #e2e8f0' }}>Verantwortlich für den Inhalt</h2>
          <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.8 }}>
            Velando24<br />
            Gautinger Str. 3<br />
            82319 Starnberg
          </p>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #e2e8f0' }}>Haftungsausschluss</h2>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#334155', marginBottom: 8, marginTop: 16 }}>Haftung für Inhalte</h3>
          <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.8 }}>
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
          </p>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#334155', marginBottom: 8, marginTop: 16 }}>Haftung für Links</h3>
          <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.8 }}>
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #e2e8f0' }}>Urheberrecht</h2>
          <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.8 }}>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}
