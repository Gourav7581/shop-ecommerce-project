import { useState } from 'react';
import { Check, Heart, Mail, ChevronRight } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const onCategoriesClick = (event) => {
    if (document.getElementById('categories')) return;
    event.preventDefault();
    window.location.hash = '#home';
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })));
  };
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3200);
  };

  return (
    <footer className="snc-footer-maroon" role="contentinfo" aria-label="Shree Nath Clothes Footer">
      <svg className="snc-footer-silk" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 0H660C420 0 380 30 250 37S90 95 0 68Z" fill="#68091c" />
        <path d="M0 0H470C290 12 295 49 170 45S50 81 0 79Z" fill="#40000a" />
        <path d="M0 79C100 83 110 42 229 40S350 0 470 0" fill="none" stroke="#d8b76a" strokeWidth="5" />
        <path d="M0 66C110 78 155 19 275 24S380 0 430 0" fill="none" stroke="#a82a36" strokeWidth="2" />
      </svg>
      <img className="snc-footer-feather" src="/assets/decor/peacock-feather.svg" alt="" aria-hidden="true" />
      <img className="snc-footer-decoration" src="/assets/decor/temple-line-art.svg" alt="" aria-hidden="true" />

      <div className="snc-footer-container">
        
        {/* 4-Column Desktop Grid Layout */}
        <div className="snc-footer-grid">
          
          {/* Column 1: Brand Info & Socials */}
          <div className="snc-footer-col snc-footer-col--brand">
            <div className="snc-footer-brand-header">
              <div className="snc-footer-logo-mark">
                <img
                  src="/assets/brand/logo-mark.svg"
                  alt="Shree Nath Clothes Emblem"
                  className="snc-footer-mark-img"
                />
              </div>
              <div className="snc-footer-brand-text">
                <span className="snc-footer-brand-name">Shree Nath Clothes</span>
                <span className="snc-footer-brand-sub">Shringar for Your Thakur Ji</span>
              </div>
            </div>

            <p className="snc-footer-about-text">Bringing divine beauty to your Thakur Ji with premium poshak, mukut and shringar accessories.</p>

            {/* Social Media Channels with Smooth Hover Animations */}
            <div className="snc-footer-socials" aria-label="Follow us on social channels">
              {/* Instagram */}
              <a href="#instagram" className="snc-social-btn" aria-label="Instagram" title="Follow on Instagram">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* Facebook */}
              <a href="#facebook" className="snc-social-btn" aria-label="Facebook" title="Follow on Facebook">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>

              {/* YouTube */}
              <a href="#youtube" className="snc-social-btn" aria-label="YouTube" title="Watch on YouTube">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"></polygon>
                </svg>
              </a>

              {/* WhatsApp */}
              <a href="#whatsapp" className="snc-social-btn" aria-label="WhatsApp" title="Chat on WhatsApp">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
            </div>
          </div>

          <nav className="snc-footer-col" aria-label="Quick links">
            <h4 className="snc-footer-heading">Quick Links</h4>
            <ul className="snc-footer-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#shop">Shop</a></li>
              <li><a href="#categories" onClick={onCategoriesClick}>Categories</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <nav className="snc-footer-col" aria-label="Customer care">
            <h4 className="snc-footer-heading">Customer Care</h4>
            <ul className="snc-footer-list">
              <li><a href="#shipping">Shipping Policy</a></li>
              <li><a href="#returns">Return &amp; Exchange</a></li>
              <li><a href="#size-chart">Size Guide</a></li>
              <li><a href="#temple-orders">Custom &amp; Bulk Orders</a></li>
              <li><a href="#faq">FAQs</a></li>
            </ul>
          </nav>

          {/* Column 4: Newsletter Signup */}
          <div className="snc-footer-col snc-footer-col--newsletter">
            <h4 className="snc-footer-heading">
              <Mail size={30} strokeWidth={1.4} aria-hidden="true" /><span>Newsletter</span>
            </h4>
            
            <p className="snc-footer-newsletter-text">Get updates on new arrivals &amp; special offers.</p>

            <form onSubmit={handleSubmit} className="snc-footer-form">
              <div className="snc-input-wrapper"><Mail size={18} strokeWidth={1.5} aria-hidden="true" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="snc-footer-input"
                  aria-label="Email address for sacred newsletter"
                />
              </div>

              <button
                type="submit"
                className={`snc-footer-sub-btn ${subscribed ? 'is-subscribed' : ''}`}
                disabled={subscribed}
              >
                {subscribed ? (
                  <>
                    <Check size={16} className="snc-btn-icon" />
                    <span>Subscribed</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span><ChevronRight size={17} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>

            <p className="snc-footer-devotion">Made with devotion <Heart size={15} fill="currentColor" aria-hidden="true" /></p>

          </div>

        </div>


      </div>
    </footer>
  );
}
