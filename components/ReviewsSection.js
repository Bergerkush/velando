import Link from 'next/link'

function Stars({ rating }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= rating ? '#f59e0b' : '#e2e8f0'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

const FEATURED_REVIEWS = [
  {
    id: 1,
    name: "Markus T.",
    city: "München",
    date: "März 2026",
    rating: 5,
    avatar: "https://res.cloudinary.com/digemtlxu/image/upload/v1777542073/velando_reviews/avatar_7.jpg",
    text: "Absolut top! Das Gravel Bike war fast 40% günstiger als im lokalen Fahrradladen. Lieferung kam in 4 Tagen, alles perfekt verpackt. Werde definitiv wieder bestellen!",
  },
  {
    id: 2,
    name: "Stefan K.",
    city: "Hamburg",
    date: "April 2026",
    rating: 5,
    avatar: "https://res.cloudinary.com/digemtlxu/image/upload/v1777542072/velando_reviews/avatar_5.jpg",
    text: "Das Zelt habe ich für meine Bikepacking-Tour durch die Alpen genutzt. Dank Velando habe ich über 200€ gespart. Der Kundenservice war sehr freundlich!",
  },
  {
    id: 3,
    name: "Laura & Jan",
    city: "Stuttgart",
    date: "April 2026",
    rating: 5,
    avatar: "https://res.cloudinary.com/digemtlxu/image/upload/v1777542073/velando_reviews/avatar_6.jpg",
    text: "Velando hat uns ermöglicht, hochwertige Ausrüstung zu einem fairen Preis zu kaufen. Schon beim nächsten Abenteuer dabei — einfach unschlagbar!",
  },
]

export default function ReviewsSection() {
  return (
    <section style={{ background: '#fff', padding: '56px 24px', borderTop: '1px solid #e2e8f0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span style={{ fontSize: 22, fontWeight: 900, color: '#0f172a' }}>4.9</span>
              <span style={{ fontSize: 14, color: '#64748b' }}>· 197 Bewertungen</span>
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: 0 }}>Was unsere Kunden sagen</h2>
          </div>
          <Link href="/bewertungen" style={{ color: '#1a56db', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
            Alle Bewertungen →
          </Link>
        </div>

        {/* Reviews */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {FEATURED_REVIEWS.map(review => (
            <div key={review.id} style={{ background: '#f8fafc', borderRadius: 14, padding: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <img src={review.avatar} alt={review.name}
                  style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{review.name}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>{review.city} · {review.date}</div>
                </div>
              </div>
              <Stars rating={review.rating} />
              <p style={{ fontSize: 13, lineHeight: 1.7, color: '#334155', margin: '10px 0 0' }}>
                "{review.text}"
              </p>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <Link href="/bewertungen" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>
            ✓ Alle Bewertungen von verifizierten Käufern · <span style={{ color: '#1a56db' }}>Alle 197 Bewertungen ansehen</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
