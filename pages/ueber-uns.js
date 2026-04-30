import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function UeberUns() {
  return (
    <>
      <Head>
        <title>Über uns — Velando</title>
        <meta name="description" content="Velando — dein Partner für Premium Outdoor & Radsport Ausrüstung. Erfahre mehr über unsere Mission und Werte." />
      </Head>
      <Header />

      <main>
        {/* Hero */}
        <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1a56db 100%)', padding: '96px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(96,165,250,0.08) 0%, transparent 60%)' }} />
          <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.4)', color: '#93c5fd', padding: '5px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 24 }}>
              Unsere Geschichte
            </div>
            <h1 style={{ fontSize: 'clamp(40px, 5vw, 60px)', fontWeight: 900, color: '#f8fafc', lineHeight: 1.1, marginBottom: 20, letterSpacing: '-1px' }}>
              Sport ist unsere<br /><span style={{ color: '#60a5fa' }}>Leidenschaft</span>
            </h1>
            <p style={{ color: 'rgba(248,250,252,0.7)', fontSize: 18, lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
              Bei Velando glauben wir daran, dass jeder Mensch Zugang zu hochwertiger Sportausrüstung haben sollte — zu fairen Preisen.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section style={{ background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container" style={{ padding: '0 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
              {[
                { num: '2024', label: 'Gegründet' },
                { num: '735+', label: 'Produkte' },
                { num: '46', label: 'Top Marken' },
                { num: '4.9★', label: 'Bewertung' },
              ].map((s, i) => (
                <div key={s.label} style={{ padding: '32px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid #e2e8f0' : 'none' }}>
                  <div style={{ fontSize: 36, fontWeight: 900, color: '#1a56db', marginBottom: 6 }}>{s.num}</div>
                  <div style={{ fontSize: 14, color: '#64748b', fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section style={{ background: '#f8fafc', padding: '80px 24px' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#1a56db', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 16 }}>Unsere Mission</div>
                <h2 style={{ fontSize: 36, fontWeight: 900, color: '#0f172a', marginBottom: 20, lineHeight: 1.15 }}>Sport für alle zugänglich machen</h2>
                <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: 16, marginBottom: 20 }}>
                  Velando wurde mit einer einfachen Idee gegründet: hochwertige Sportausrüstung von führenden Marken sollte für jeden erschwinglich sein — nicht nur für Profis.
                </p>
                <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: 16, marginBottom: 28 }}>
                  Deshalb bieten wir sorgfältig ausgewählte Produkte von CUBE, Garmin, Suunto, Trek und vielen mehr zu Preisen an, die bis zu 51% unter dem UVP liegen — mit kostenlosem Versand nach Deutschland.
                </p>
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 24px', background: '#1a56db', color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                  Produkte entdecken →
                </Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { icon: '🚴', title: 'Radsport', desc: 'Gravel, E-Bikes, MTB von Top-Marken' },
                  { icon: '⛺', title: 'Camping', desc: 'Ultraleichte Zelte für jedes Abenteuer' },
                  { icon: '🗺️', title: 'Navigation', desc: 'GPS-Uhren von Garmin & Suunto' },
                  { icon: '🏔️', title: 'Outdoor', desc: 'Alles für Wandern & Bikepacking' },
                ].map(item => (
                  <div key={item.title} style={{ background: '#fff', borderRadius: 14, padding: '24px 20px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section style={{ background: '#fff', padding: '80px 24px' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1a56db', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 12 }}>Was uns auszeichnet</div>
              <h2 style={{ fontSize: 36, fontWeight: 900, color: '#0f172a', margin: 0 }}>Unsere Versprechen an dich</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {[
                { icon: '💰', title: 'Faire Preise', desc: 'Bis zu 51% unter dem Originalpreis — wir arbeiten direkt mit Distributoren zusammen um dir die besten Preise zu bieten.' },
                { icon: '🚚', title: 'Kostenloser Versand', desc: 'Jede Bestellung wird kostenlos innerhalb Deutschlands geliefert. Kein Mindestbestellwert, keine versteckten Kosten.' },
                { icon: '↩️', title: '30 Tage Rückgabe', desc: 'Du bist nicht zufrieden? Kein Problem — 30 Tage Rückgaberecht ohne Fragen. Deine Zufriedenheit ist unser Ziel.' },
                { icon: '🔒', title: 'Sichere Zahlung', desc: 'Alle Zahlungen sind SSL-verschlüsselt. Wir akzeptieren PayPal und Banküberweisung für maximale Sicherheit.' },
                { icon: '✅', title: 'Geprüfte Qualität', desc: 'Nur Originalprodukte von autorisierten Händlern. Jedes Produkt wird vor dem Versand geprüft.' },
                { icon: '💬', title: 'Persönlicher Service', desc: 'Fragen? Unser Team antwortet schnell und kompetent. Erreichbar unter info@velando24.de.' },
              ].map(item => (
                <div key={item.title} style={{ background: '#f8fafc', borderRadius: 14, padding: '28px 24px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{item.icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brands */}
        <section style={{ background: '#f8fafc', padding: '80px 24px', borderTop: '1px solid #e2e8f0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1a56db', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 12 }}>Unsere Partner</div>
              <h2 style={{ fontSize: 36, fontWeight: 900, color: '#0f172a', margin: '0 0 12px' }}>Top Marken, Top Qualität</h2>
              <p style={{ color: '#64748b', fontSize: 16, margin: 0 }}>Wir führen Produkte von über 46 führenden Herstellern</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              {['CUBE Bikes', 'Garmin', 'Suunto', 'Trek Bikes', 'SCOTT Bikes', 'Cannondale Bikes', 'Osprey', 'Polar', 'Big Agnes', 'MSR', 'Therm-a-Rest', 'Katadyn'].map(brand => (
                <div key={brand} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600, color: '#334155' }}>
                  {brand.replace(' Bikes', '')}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1a56db 100%)', padding: '80px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: '#f8fafc', marginBottom: 16 }}>Bereit für dein nächstes Abenteuer?</h2>
            <p style={{ color: 'rgba(248,250,252,0.7)', fontSize: 16, marginBottom: 32, lineHeight: 1.7 }}>
              Entdecke über 735 Produkte zu unschlagbaren Preisen — mit kostenlosem Versand nach Deutschland.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: '#fff', color: '#0f172a', borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                Jetzt shoppen →
              </Link>
              <a href="mailto:info@velando24.de" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: 'rgba(255,255,255,0.1)', color: '#f8fafc', borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>
                Kontakt aufnehmen
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
