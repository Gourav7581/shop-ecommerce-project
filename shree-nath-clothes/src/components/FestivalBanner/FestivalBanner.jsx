import { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import krishnaBanner from '../../../public/assets/images/explore/krishna_banner_hd.png?url';
import collectionOne from '../../../public/assets/images/explore/collection_image_1_hd.png?url';
import collectionTwo from '../../../public/assets/images/explore/collection_image_2_hd.png?url';
import collectionThree from '../../../public/assets/images/explore/collection_image_3_hd.png?url';
import './FestivalBanner.css';

const COLLECTION_IMAGES = [
  { src: collectionOne, alt: 'Pink and green festive deity poshak' },
  { src: collectionTwo, alt: 'Traditional gold and pearl shringar jewellery' },
  { src: collectionThree, alt: 'Laddu Gopal in red and gold festival shringar' }
];

export default function FestivalBanner({ onExplore }) {
  const [firstImage, setFirstImage] = useState(0);
  const exploreCollection = () => {
    if (onExplore) onExplore();
    else document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="snc-festival-section" aria-labelledby="snc-festival-title">
      <div className="snc-festival-portrait">
        <img src={krishnaBanner} alt="Shree Krishna adorned for a divine festival" loading="eager" decoding="async" />
      </div>
      <img className="snc-festival-ornament" src="/assets/decor/temple-line-art.svg" alt="" aria-hidden="true" />
      <div className="snc-festival-container">
        <div className="snc-festival-copy">
          <p className="snc-festival-label"><Sparkles size={13} strokeWidth={1.5} aria-hidden="true" /> Special Collection <span aria-hidden="true">❧</span></p>
          <h2 className="snc-festival-heading" id="snc-festival-title">Festival Collection</h2>
          <p className="snc-festival-description">Explore exclusive poshak, mukut and shringar for special<br className="snc-festival-linebreak" /> days: Janmashtami, Holi, Diwali and more.</p>
          <button className="snc-festival-explore-btn" onClick={exploreCollection}>Explore Now <ArrowRight size={15} aria-hidden="true" /></button>
        </div>
        <div className="snc-festival-gallery" role="region" aria-label="Festival collection previews" aria-roledescription="carousel">
          <button className="snc-festival-gallery-arrow" onClick={() => setFirstImage((current) => (current + COLLECTION_IMAGES.length - 1) % COLLECTION_IMAGES.length)} aria-label="Previous collection preview"><ChevronLeft size={17} /></button>
          <div className="snc-festival-thumbnails" aria-live="polite">
            {COLLECTION_IMAGES.map((_, index) => {
              const collection = COLLECTION_IMAGES[(firstImage + index) % COLLECTION_IMAGES.length];
              return <button className="snc-festival-thumbnail" key={collection.src} onClick={exploreCollection} aria-label={`Explore ${collection.alt}`}><img src={collection.src} alt={collection.alt} loading="lazy" /></button>;
            })}
          </div>
          <button className="snc-festival-gallery-arrow" onClick={() => setFirstImage((current) => (current + 1) % COLLECTION_IMAGES.length)} aria-label="Next collection preview"><ChevronRight size={17} /></button>
        </div>
      </div>
    </section>
  );
}
