import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      background: '#0f172a',
      color: 'rgba(248,250,252,0.65)',
      padding: '56px 24px 28px',
      marginTop: 80
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 48,
          marginBottom: 48
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path d="M16 3L29 27H3L16 3Z" fill="#1a56db" opacity="0.3"/>
                <path d="M16 11L24 27H8L16 11Z" fill="#1a56db"/>
              </svg>
              <span style={{ fontWeight: 800, fontSize: 20, color: '#f8fafc' }}>
                Ve<span style={{ color: '#3b82f6' }}>lando</span>
              </span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7 }}>
              Premium Outdoor & Radsport Ausrüstung. Dein Partner für unvergessliche Abenteuer — zu fairen Preisen mit kostenlosem Versand.
            </p>
            <div style={{ marginTop: 16 }}>
              <a href="mailto:info@velando24.de" style={{ color: '#60a5fa', fontSize: 14, textDecoration: 'none' }}>
                info@velando24.de
              </a>
            </div>
          </div>

          <FooterCol title="Shop" links={[
            { label: 'Alle Produkte', href: '/' },
            { label: 'Fahrräder', href: '/?akt=Radfahren' },
            { label: 'E-Bikes', href: '/?akt=E-Bike' },
            { label: 'Zelte', href: '/?akt=Zelte' },
            { label: 'Outdoor', href: '/?akt=Outdoor' },
          ]} />

          <FooterCol title="Service" links={[
            { label: 'Versand & Lieferung', href: '/versand' },
            { label: 'Rückgabe', href: '/rueckgabe' },
            { label: 'Über uns', href: '/ueber-uns' },
            { label: 'Kontakt', href: 'mailto:info@velando24.de' },
          ]} />

          <FooterCol title="Rechtliches" links={[
            { label: 'Impressum', href: '/impressum' },
            { label: 'Datenschutz', href: '/datenschutz' },
            { label: 'AGB', href: '/agb' },
            { label: 'Widerrufsrecht', href: '/widerruf' },
          ]} />
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 13,
          flexWrap: 'wrap',
          gap: 8
        }}>
          <span>© 2026 Velando. Alle Rechte vorbehalten.</span>
          <span>🇩🇪 Deutschland · Kostenloser Versand</span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 style={{
        fontSize: 12,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: '#f8fafc',
        marginBottom: 16
      }}>
        {title}
      </h4>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {links.map(l => (
          <li key={l.label}>
            <a href={l.href} style={{
              color: 'rgba(248,250,252,0.6)',
              fontSize: 14,
              transition: 'color 0.2s',
              textDecoration: 'none'
            }}
            onMouseEnter={e => e.target.style.color = '#3b82f6'}
            onMouseLeave={e => e.target.style.color = 'rgba(248,250,252,0.6)'}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
