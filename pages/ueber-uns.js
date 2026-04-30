import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

const IconBike = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h-4l-3 11.5"/><path d="M9 6l3 5.5h6.5"/><path d="M12 6V3"/></svg>
const IconTent = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 22h20L12 2z"/><path d="M10 22v-6a2 2 0 014 0v6"/></svg>
const IconGps = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>
const IconMountain = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3L2 21h20L14 7l-3 5-3-9z"/></svg>
const IconTag = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H7a2 2 0 00-2 2v5l9 9 7-7-9-9z"/><circle cx="6.5" cy="6.5" r="1"/></svg>
const IconTruck = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
const IconReturn = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 14L4 9l5-5"/><path d="M4 9h10a5 5 0 015 5v1"/></svg>
const IconLock = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
const IconCheck = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
const IconChat = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>

export default function UeberUns() {
  return (
    <>
      <Head>
        <title>Über uns — Velando</title>
        <meta name="description" content="Velando — dein Partner für Premium Outdoor & Radsport Ausrüstung." />
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {[
                { num: '2024', label: 'Gegründet' },
                { num: '735+', label: 'Produkte' },
                { num: '46', label: 'Top Marken' },
                { num: '4.9', label: 'Bewertung' },
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
                  { Icon: IconBike, title: 'Radsport', desc: 'Gravel, E-Bikes, MTB von Top-Marken' },
                  { Icon: IconTent, title: 'Camping', desc: 'Ultraleichte Zelte für jedes Abenteuer' },
                  { Icon: IconGps, title: 'Navigation', desc: 'GPS-Uhren von Garmin & Suunto' },
                  { Icon: IconMountain, title: 'Outdoor', desc: 'Alles für Wandern & Bikepacking' },
                ].map(({ Icon, title, desc }) => (
                  <div key={title} style={{ background: '#fff', borderRadius: 14, padding: '24px 20px', border: '1px solid #e2e8f0' }}>
                    <div style={{ marginBottom: 12 }}><Icon /></div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{title}</div>
                    <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>{desc}</div>
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
                { Icon: IconTag, title: 'Faire Preise', desc: 'Bis zu 51% unter dem Originalpreis — wir arbeiten direkt mit Distributoren zusammen um dir die besten Preise zu bieten.' },
                { Icon: IconTruck, title: 'Kostenloser Versand', desc: 'Jede Bestellung wird kostenlos innerhalb Deutschlands geliefert. Kein Mindestbestellwert, keine versteckten Kosten.' },
                { Icon: IconReturn, title: '30 Tage Rückgabe', desc: 'Du bist nicht zufrieden? Kein Problem — 30 Tage Rückgaberecht ohne Fragen. Deine Zufriedenheit ist unser Ziel.' },
                { Icon: IconLock, title: 'Sichere Zahlung', desc: 'Alle Zahlungen sind SSL-verschlüsselt. Wir akzeptieren PayPal und Banküberweisung für maximale Sicherheit.' },
                { Icon: IconCheck, title: 'Geprüfte Qualität', desc: 'Nur Originalprodukte von autorisierten Händlern. Jedes Produkt wird vor dem Versand geprüft.' },
                { Icon: IconChat, title: 'Persönlicher Service', desc: 'Fragen? Unser Team antwortet schnell und kompetent. Erreichbar unter info@velando24.de.' },
              ].map(({ Icon, title, desc }) => (
                <div key={title} style={{ background: '#f8fafc', borderRadius: 14, padding: '28px 24px', border: '1px solid #e2e8f0' }}>
                  <div style={{ marginBottom: 14, width: 48, height: 48, background: '#eff6ff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon />
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, margin: 0 }}>{desc}</p>
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
              {['CUBE Bikes','Garmin','Suunto','Trek Bikes','SCOTT Bikes','Cannondale Bikes','Osprey','Polar','Big Agnes','MSR','Therm-a-Rest','Katadyn'].map(brand => (
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
