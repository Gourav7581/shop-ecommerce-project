import { Badge, ShoppingCart } from 'lucide-react';
import GlowingDiya from '../Hero/GlowingDiya';
import './CartBanner.css';

function Lotus() {
  return <svg viewBox="0 0 90 64" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round"><path d="M45 56C24 43 29 24 45 5C61 24 66 43 45 56Z"/><path d="M45 56C21 58 9 39 6 22C28 25 39 35 45 56ZM45 56C69 58 81 39 84 22C62 25 51 35 45 56Z"/><path d="M45 56C25 67 9 57 2 44C18 42 33 46 45 56ZM45 56C65 67 81 57 88 44C72 42 57 46 45 56Z"/></g></svg>;
}
function Floral({ className }) {
  return <svg className={className} viewBox="0 0 240 240" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.2">{Array.from({length:18},(_,i)=><g key={i} transform={`rotate(${i*20} 120 120)`}><ellipse cx="120" cy="63" rx="14" ry="55"/><path d="M120 3Q83 52 120 102Q157 52 120 3Z"/></g>)}<circle cx="120" cy="120" r="110"/></g></svg>;
}

export default function CartBanner() {
  return (
    <section className="snc-cart-banner" aria-labelledby="snc-cart-banner-title">
      <Floral className="snc-cart-banner__floral snc-cart-banner__floral--top" />
      <Floral className="snc-cart-banner__floral snc-cart-banner__floral--bottom" />
      <div className="snc-cart-banner__right" aria-hidden="true">
          <svg
            className="snc-cart-temple-svg"
            viewBox="0 0 520 180"
            fill="none"
            stroke="#a67c2e"
            strokeWidth="1.2"
            opacity="0.48"
          >
            {/* Main Central Temple Shikhara */}
            <path d="M 260 12 L 260 25 M 255 25 L 265 25 M 257 20 Q 260 15 263 20" strokeWidth="1.4" />
            <path d="M 260 25 Q 248 55 238 95 Q 230 135 224 175 L 296 175 Q 290 135 282 95 Q 272 55 260 25 Z" />
            {/* Shikhara Kalash & Dhwaja (Sacred Flag) */}
            <path d="M 260 12 Q 275 8 285 14 Q 275 20 260 17 Z" fill="#b88a28" fillOpacity="0.3" />
            {/* Vertical Fluted Grooves on Main Spire */}
            <path d="M 260 25 L 260 175" strokeDasharray="3 3" />
            <path d="M 252 50 Q 246 110 242 175" strokeWidth="0.8" />
            <path d="M 268 50 Q 274 110 278 175" strokeWidth="0.8" />
            {/* Decorative Amalaka Rings */}
            <path d="M 244 80 Q 260 76 276 80" />
            <path d="M 238 115 Q 260 110 282 115" />
            <path d="M 232 145 Q 260 140 288 145" />

            {/* Left Secondary Shikhara */}
            <path d="M 180 38 L 180 48 M 176 48 L 184 48" />
            <path d="M 180 48 Q 170 75 162 110 Q 155 145 150 175 L 210 175 Q 205 145 198 110 Q 190 75 180 48 Z" />
            <path d="M 180 38 Q 192 34 200 40 Q 192 45 180 42 Z" fill="#b88a28" fillOpacity="0.25" />
            <path d="M 180 48 L 180 175" strokeDasharray="2 3" strokeWidth="0.8" />
            <path d="M 166 105 Q 180 100 194 105" />
            <path d="M 158 140 Q 180 135 202 140" />

            {/* Right Secondary Shikhara */}
            <path d="M 340 38 L 340 48 M 336 48 L 344 48" />
            <path d="M 340 48 Q 330 75 322 110 Q 315 145 310 175 L 370 175 Q 365 145 358 110 Q 350 75 340 48 Z" />
            <path d="M 340 38 Q 352 34 360 40 Q 352 45 340 42 Z" fill="#b88a28" fillOpacity="0.25" />
            <path d="M 340 48 L 340 175" strokeDasharray="2 3" strokeWidth="0.8" />
            <path d="M 326 105 Q 340 100 354 105" />
            <path d="M 318 140 Q 340 135 362 140" />

            {/* Far Left Minor Mandap Tower */}
            <path d="M 110 70 L 110 80" />
            <path d="M 110 80 Q 102 105 96 135 Q 92 155 88 175 L 132 175 Q 128 155 124 135 Q 118 105 110 80 Z" strokeWidth="0.9" />
            <path d="M 100 130 Q 110 126 120 130" strokeWidth="0.8" />

            {/* Far Right Minor Mandap Tower */}
            <path d="M 410 70 L 410 80" />
            <path d="M 410 80 Q 402 105 396 135 Q 392 155 388 175 L 432 175 Q 428 155 424 135 Q 418 105 410 80 Z" strokeWidth="0.9" />
            <path d="M 400 130 Q 410 126 420 130" strokeWidth="0.8" />

            {/* Base Sanctum Arch & Lotus motifs */}
            <path d="M 60 175 L 460 175" strokeWidth="1.5" />
            <path d="M 245 175 Q 260 152 275 175" strokeWidth="1.2" />
            <path d="M 170 175 Q 180 158 190 175" strokeWidth="1" />
            <path d="M 330 175 Q 340 158 350 175" strokeWidth="1" />
          </svg>
      </div>
      <div className="snc-cart-banner__offering" aria-hidden="true"><img src="/assets/decor/peacock-feather.svg" alt="" /><GlowingDiya size={200} /></div>
      <div className="snc-cart-banner__container">
        <div className="snc-cart-banner__badge" aria-hidden="true"><Badge size={125} strokeWidth={1} /><ShoppingCart className="snc-cart-banner__cart-icon" size={59} strokeWidth={1.6} /></div>
        <div className="snc-cart-banner__left">
          <div className="snc-cart-banner__lotus"><span/><Lotus/><span/></div>
          <h1 className="snc-cart-banner__title" id="snc-cart-banner-title">Your Cart</h1>
          <p className="snc-cart-banner__subtitle">Review your items and proceed to checkout</p>
        </div>
      </div>
      <svg className="snc-cart-banner__waves" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 36C180 -37 277 40 448 71S730 7 854 16S1161 119 1440 32V90H0Z" fill="#f6cd7e" fillOpacity=".5"/><path d="M0 58C160 -8 260 38 445 84S750 13 934 43S1215 96 1440 52V90H0Z" fill="#fff7e6" fillOpacity=".8"/><path d="M0 43C165 -21 285 47 445 82S729 23 905 43S1200 104 1440 46" stroke="#eab556" strokeWidth="1.3" fill="none"/></svg>
    </section>
  );
}
