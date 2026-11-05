import { ArrowRight } from 'lucide-react';
import deityImage from '../../../public/assets/images/ShopBanner/krishna_ji_hd.png?url';
import './ShopBanner.css';

function Lotus() {
  return <svg viewBox="0 0 90 64" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round"><path d="M45 56C24 43 29 24 45 5C61 24 66 43 45 56Z"/><path d="M45 56C21 58 9 39 6 22C28 25 39 35 45 56ZM45 56C69 58 81 39 84 22C62 25 51 35 45 56Z"/><path d="M45 56C25 67 9 57 2 44C18 42 33 46 45 56ZM45 56C65 67 81 57 88 44C72 42 57 46 45 56Z"/></g></svg>;
}
function FloralCorner({ className }) {
  return <svg className={className} viewBox="0 0 240 240" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.2">{Array.from({length:18},(_,i)=><g key={i} transform={`rotate(${i*20} 120 120)`}><ellipse cx="120" cy="63" rx="14" ry="55"/><ellipse cx="120" cy="40" rx="9" ry="32"/><path d="M120 3Q83 52 120 102Q157 52 120 3Z"/></g>)}<circle cx="120" cy="120" r="32"/><circle cx="120" cy="120" r="108"/><circle cx="120" cy="120" r="114"/></g></svg>;
}

export default function ShopBanner() {
  const explore = () => {
    document.querySelector('.snc-shop-main-wrap')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  };
  return (
    <section className="snc-shop-banner" aria-labelledby="snc-shop-banner-title">
      <div className="snc-shop-banner__art"><img src={deityImage} alt="Laddu Gopal adorned with a jeweled mukut, pearls and festive poshak" fetchPriority="high" decoding="async" /></div>
      <FloralCorner className="snc-shop-banner__floral snc-shop-banner__floral--top" />
      <FloralCorner className="snc-shop-banner__floral snc-shop-banner__floral--bottom" />
      <div className="snc-shop-banner__container">
        <div className="snc-shop-banner__copy">
          <div className="snc-shop-banner__lotus"><span /><Lotus /><span /></div>
          <h1 className="snc-shop-banner__title" id="snc-shop-banner-title">Shop Our Collection</h1>
          <p className="snc-shop-banner__subtitle">Find the perfect poshak, mukut and shringar for your Laddu Gopal</p>
          <button className="snc-shop-banner__explore" onClick={explore}>Explore Collection <ArrowRight size={24} strokeWidth={1.6} aria-hidden="true" /></button>
        </div>
      </div>
      <svg className="snc-shop-banner__waves" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 36C180 -37 277 40 448 71S730 7 854 16S1161 119 1440 32V90H0Z" fill="#f6cd7e" fillOpacity=".42"/>
        <path d="M0 58C160 -8 260 38 445 84S750 13 934 43S1215 96 1440 52V90H0Z" fill="#fff7e6" fillOpacity=".8"/>
        <path d="M0 43C165 -21 285 47 445 82S729 23 905 43S1200 104 1440 46" stroke="#eab556" strokeWidth="1.3" fill="none"/>
        <g fill="#edb454"><circle cx="143" cy="43" r="3"/><circle cx="159" cy="40" r="4"/><circle cx="177" cy="41" r="5"/></g>
      </svg>
    </section>
  );
}
