import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Widerruf() {
  return (
    <>
      <Head><title>Widerrufsrecht — Velando</title></Head>
      <Header />
      <main className="container" style={{ padding: '48px 24px', maxWidth: 800 }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Widerrufsrecht</h1>
        <p style={{ color: '#64748b', marginBottom: 40 }}>Informationen zu Ihrem gesetzlichen Widerrufsrecht</p>

        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: '20px 24px', marginBottom: 40 }}>
          <p style={{ fontSize: 15, color: '#1e40af', margin: 0, lineHeight: 1.6 }}>
            Als Verbraucher haben Sie das Recht, diesen Vertrag binnen <strong>14 Tagen ohne Angabe von Gründen</strong> zu widerrufen.
          </p>
        </div>

        <Section title="Widerrufsbelehrung">
          <p><strong>Widerrufsrecht</strong></p>
          <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
          <p>Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.</p>
          <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns</p>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '16px 20px', margin: '12px 0' }}>
            <p style={{ margin: 0 }}>
              <strong>Stefan Eberle (Einzelunternehmer)</strong><br />
              Rotwandweg 1<br />
              82024 Taufkirchen<br />
              E-Mail: <a href="mailto:info@velando24.de" style={{ color: '#1a56db' }}>info@velando24.de</a>
            </p>
          </div>
          <p>mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.</p>
        </Section>

        <Section title="Folgen des Widerrufs">
          <p>Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.</p>
          <p>Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart.</p>
          <p>Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt ist.</p>
          <p>Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden oder zu übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von vierzehn Tagen absenden.</p>
          <p>Sie tragen die unmittelbaren Kosten der Rücksendung der Waren.</p>
        </Section>

        <Section title="Ausschluss des Widerrufsrechts">
          <p>Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Waren, die nach Kundenspezifikation angefertigt werden oder eindeutig auf die persönlichen Bedürfnisse zugeschnitten sind.</p>
        </Section>

        <Section title="Muster-Widerrufsformular">
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '20px 24px', fontSize: 14, lineHeight: 1.8 }}>
            <p><strong>An: Stefan Eberle, info@velando24.de</strong></p>
            <p>Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*):</p>
            <p>Bestellt am (*)/erhalten am (*):</p>
            <p>Name des/der Verbraucher(s):</p>
            <p>Anschrift des/der Verbraucher(s):</p>
            <p>Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):</p>
            <p>Datum:</p>
            <p style={{ color: '#94a3b8', fontSize: 12 }}>(*) Unzutreffendes streichen.</p>
          </div>
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
