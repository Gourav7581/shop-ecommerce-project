import { useEffect, useRef, useState } from 'react';
import { Search, Heart, ShoppingCart, Menu, X } from 'lucide-react';
import './Navbar.css';

const LINKS = [['home', 'Home'], ['shop', 'Shop'], ['categories', 'Categories'], ['about', 'About Us'], ['contact', 'Contact']];

export default function Navbar({ onOpenSearch, onOpenCart, wishlistCount = 0, cartCount = 0, currentView = 'home', onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const categoryTimer = useRef(null);
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') { setMenuOpen(false); toggleRef.current?.focus(); }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => { window.removeEventListener('keydown', closeOnEscape); clearTimeout(categoryTimer.current); };
  }, []);

  const navigate = (event, view) => {
    setMenuOpen(false);
    if (!onNavigate) return;
    event.preventDefault();
    if (view === 'categories') {
      onNavigate('home');
      clearTimeout(categoryTimer.current);
      categoryTimer.current = setTimeout(() => document.getElementById('categories')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }), 100);
    } else onNavigate(view);
  };

  return (
    <header className="snc-royal-header">
      <nav className="snc-royal-nav" aria-label="Main navigation">
        <a className="snc-royal-brand" href="#home" onClick={(event) => navigate(event, 'home')} aria-label="Shree Nath Clothes home">
          <img src="/assets/brand/logo-mark.svg" width="48" height="48" alt="" />
          <span><strong>Shree Nath Clothes</strong><small>Shringar for Your Thakur Ji</small></span>
        </a>
        <ul className="snc-royal-links">
          {LINKS.map(([view, label]) => <li key={view}><a href={`#${view}`} aria-current={currentView === view ? 'page' : undefined} onClick={(event) => navigate(event, view)}>{label}</a></li>)}
        </ul>
        <div className="snc-royal-actions">
          <button className="snc-royal-search" onClick={onOpenSearch} aria-label="Search products"><span>Search for poshak, mukut, jewellery...</span><Search size={17} /></button>
          <span className="snc-royal-wishlist" aria-label={`${wishlistCount} items in wishlist`} title={`${wishlistCount} items in wishlist`}><Heart size={21} /></span>
          <button className="snc-royal-cart" onClick={onOpenCart} aria-label={`Open cart, ${cartCount} items`}><ShoppingCart size={22} />{cartCount > 0 && <span>{cartCount}</span>}</button>
          <button ref={toggleRef} className="snc-royal-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="snc-royal-mobile">{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
        </div>
      </nav>
      {menuOpen && <nav className="snc-royal-mobile" id="snc-royal-mobile" aria-label="Mobile navigation"><ul>{LINKS.map(([view, label]) => <li key={view}><a href={`#${view}`} aria-current={currentView === view ? 'page' : undefined} onClick={(event) => navigate(event, view)}>{label}</a></li>)}</ul></nav>}
    </header>
  );
}
