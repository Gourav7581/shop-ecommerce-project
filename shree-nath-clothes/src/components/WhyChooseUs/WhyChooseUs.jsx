import { Award, HeartHandshake, Flame, ShieldCheck } from 'lucide-react';
import WhyCard from './WhyCard';
import './WhyChooseUs.css';

const FEATURES_DATA = [
  {
    id: 'quality',
    title: 'Premium Quality',
    tag: 'Temple-Grade Fabrics',
    description: 'Finest pure silk, royal velvet, and authentic zari threads carefully selected for enduring grace and temple-grade sanctity.',
    icon: Award
  },
  {
    id: 'handcrafted',
    title: 'Handcrafted with Love',
    tag: 'Artisan Devotion',
    description: 'Every poshak and mukut is intricately hand-stitched by skilled devotees with profound devotion and meticulous attention to detail.',
    icon: HeartHandshake
  },
  {
    id: 'seva',
    title: 'Sacred Seva',
    tag: 'Sanctified Offerings',
    description: 'More than attire—each creation is crafted as a devotional offering to Thakur Ji, prepared in a sanctified, pure environment.',
    icon: Flame
  },
  {
    id: 'delivery',
    title: 'Safe & Secure Delivery',
    tag: 'Blessed Packaging',
    description: 'Delicately encased in our custom sanctified gift box, ensuring pristine, blessed delivery right to your sacred home altar.',
    icon: ShieldCheck
  }
];

export default function WhyChooseUs() {
  return (
    <section
      className="snc-why-section"
      id="why-choose-us"
      aria-label="Why Choose Shree Nath Clothes"
    >
      <div className="snc-why-container">
        
        {/* Centered Devotional Header */}
        <div className="snc-why-header">
          <div className="snc-why-filigree" aria-hidden="true">
            <span className="snc-filigree-diamond">✦</span>
            <span className="snc-filigree-line"></span>
            <span className="snc-filigree-glyph">𑁍</span>
            <span className="snc-filigree-line"></span>
            <span className="snc-filigree-diamond">✦</span>
          </div>

          <h2 className="snc-why-title">The Promise of Sacred Seva</h2>
          <p className="snc-why-subtitle">
            Every fold, stitch, and embellishment woven with pure reverence for your Thakur Ji
          </p>
        </div>

        {/* 4 Premium Feature Cards Grid */}
        <div className="snc-why-grid">
          {FEATURES_DATA.map((feature, index) => (
            <WhyCard
              key={feature.id}
              feature={feature}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

