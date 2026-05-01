import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '../lib/cart'
import CartDrawer from './CartDrawer'

export default function Header({ onSearch, searchValue }) {
  const { totalItems } = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .header-search { display: none !important; }
          .header-nav { display: none !important; }
          .header-mobile-btns { display: flex !important; }
          .mobile-menu { display: ${menuOpen ? 'flex' : 'none'} !important; }
          .mobile-search { display: ${searchOpen ? 'flex' : 'none'} !important; }
        }
        @media (min-width: 769px) {
          .header-mobile-btns { display: none !important; }
          .mobile-menu { display: none !important; }
          .mobile-search { display: none !important; }
        }
      `}</style>

      <header style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', height: 64, gap: 16, padding: '0 16px' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, textDecoration: 'none' }}>
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
              <path d="M16 3L29 27H3L16 3Z" fill="#1a56db" opacity="0.15"/>
              <path d="M16 3L29 27H3L16 3Z" fill="none" stroke="#1a56db" strokeWidth="2"/>
              <path d="M16 11L24 27H8L16 11Z" fill="#1a56db"/>
            </svg>
            <span style={{ fontWeight: 800, fontSize: 20, color: '#0f172a', letterSpacing: '-0.5px' }}>
              Ve<span style={{ color: '#1a56db' }}>lando</span>
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="header-search" style={{ flex: 1, maxWidth: 480, position: 'relative' }}>
            <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.156a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
            </svg>
            <input type="text" placeholder="Produkt oder Marke suchen..." value={searchValue || ''} onChange={e => onSearch && onSearch(e.target.value)}
              style={{ width: '100%', padding: '10px 14px 10px 40px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, outline: 'none', background: '#f8fafc', color: '#0f172a' }}
              onFocus={e => e.target.style.borderColor = '#1a56db'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          {/* Desktop Nav */}
          <nav className="header-nav" style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
            <Link href="/" style={{ padding: '8px 14px', borderRadius: 8, fontSize: 14, fontWeight: 500, color: '#334155', textDecoration: 'none' }}>Sortiment</Link>
            <Link href="/ueber-uns" style={{ padding: '8px 14px', borderRadius: 8, fontSize: 14, fontWeight: 500, color: '#334155', textDecoration: 'none' }}>Über uns</Link>
            <button onClick={() => setCartOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px', background: '#1a56db', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>
              Warenkorb
              {totalItems > 0 && <span style={{ background: '#f59e0b', color: '#0f172a', borderRadius: '50%', width: 20, height: 20, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{totalItems}</span>}
            </button>
          </nav>

          {/* Mobile buttons */}
          <div className="header-mobile-btns" style={{ marginLeft: 'auto', alignItems: 'center', gap: 8 }}>
            {/* Search icon */}
            <button onClick={() => setSearchOpen(!searchOpen)} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 9, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="16" height="16" fill="#64748b" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.156a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/></svg>
            </button>
            {/* Cart icon */}
            <button onClick={() => setCartOpen(true)} style={{ background: '#1a56db', border: 'none', borderRadius: 9, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
              <svg width="16" height="16" fill="#fff" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>
              {totalItems > 0 && <span style={{ position: 'absolute', top: -6, right: -6, background: '#f59e0b', color: '#0f172a', borderRadius: '50%', width: 18, height: 18, fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{totalItems}</span>}
            </button>
            {/* Burger */}
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 9, width: 40, height: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer' }}>
              <span style={{ width: 16, height: 2, background: '#334155', borderRadius: 1 }} />
              <span style={{ width: 16, height: 2, background: '#334155', borderRadius: 1 }} />
              <span style={{ width: 16, height: 2, background: '#334155', borderRadius: 1 }} />
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="mobile-search" style={{ padding: '8px 16px 12px', borderTop: '1px solid #f1f5f9' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.156a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
            </svg>
            <input type="text" placeholder="Suchen..." value={searchValue || ''} onChange={e => onSearch && onSearch(e.target.value)} autoFocus
              style={{ width: '100%', padding: '10px 14px 10px 40px', border: '1.5px solid #1a56db', borderRadius: 10, fontSize: 14, outline: 'none', background: '#f8fafc', color: '#0f172a' }}
            />
          </div>
        </div>

        {/* Mobile menu */}
        <div className="mobile-menu" style={{ flexDirection: 'column', borderTop: '1px solid #e2e8f0', background: '#fff' }}>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ padding: '16px 20px', fontSize: 15, fontWeight: 600, color: '#0f172a', textDecoration: 'none', borderBottom: '1px solid #f1f5f9' }}>Sortiment</Link>
          <Link href="/ueber-uns" onClick={() => setMenuOpen(false)} style={{ padding: '16px 20px', fontSize: 15, fontWeight: 600, color: '#0f172a', textDecoration: 'none', borderBottom: '1px solid #f1f5f9' }}>Über uns</Link>
          <Link href="/bewertungen" onClick={() => setMenuOpen(false)} style={{ padding: '16px 20px', fontSize: 15, fontWeight: 600, color: '#0f172a', textDecoration: 'none', borderBottom: '1px solid #f1f5f9' }}>Bewertungen</Link>
          <a href="mailto:info@velando24.de" style={{ padding: '16px 20px', fontSize: 15, fontWeight: 600, color: '#1a56db', textDecoration: 'none' }}>info@velando24.de</a>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
