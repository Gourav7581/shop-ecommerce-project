import { useState, useRef } from 'react';
import './WhyCard.css';

export default function WhyCard({ feature, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Subtle 3D mouse-tracking tilt
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Smooth tilt bounded to 5 degrees
    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = -((y - centerY) / centerY) * 5;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const IconComponent = feature.icon;

  return (
    <article
      ref={cardRef}
      className={`snc-why-card ${isHovered ? 'is-hovered' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        '--card-delay': `${index * 85}ms`,
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)',
        transition: isHovered
          ? 'transform 0.08s ease-out, box-shadow 0.25s ease, border-color 0.25s ease'
          : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease'
      }}
    >
      {/* Gold Line Icon Medallion */}
      <div className="snc-why-card__icon-box">
        <div className="snc-why-card__icon-halo" aria-hidden="true"></div>
        <IconComponent size={28} className="snc-why-gold-icon" strokeWidth={1.6} />
      </div>

      {/* Feature Content */}
      <div className="snc-why-card__content">
        <span className="snc-why-card__tag">{feature.tag}</span>
        <h3 className="snc-why-card__title">{feature.title}</h3>
        <p className="snc-why-card__description">{feature.description}</p>
      </div>

      {/* Antique Gold Card Footer Embellishment */}
      <div className="snc-why-card__footer" aria-hidden="true">
        <span className="snc-why-card__accent-line"></span>
        <span className="snc-why-card__accent-gem">✦</span>
        <span className="snc-why-card__accent-line"></span>
      </div>
    </article>
  );
}

