import { useState } from 'react';
import './CategoryCard.css';

export default function CategoryCard({ category, onSelect }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="snc-cat-circle-card"
      onClick={() => onSelect && onSelect(category)}
      role="button"
      tabIndex={0}
      aria-label={`Explore ${category.title} category`}
    >
      {/* Circular Image Container with Gold Border */}
      <div className="snc-cat-circle-frame">
        <div className="snc-cat-circle-inner">
          {!imageError && category.image ? (
            <img
              src={category.image}
              alt={category.title}
              className="snc-cat-circle-img"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="snc-cat-circle-fallback">
              <span>✦</span>
            </div>
          )}
        </div>
        {/* Subtle Gold Ring on Hover */}
        <div className="snc-cat-circle-ring" aria-hidden="true"></div>
      </div>

      {/* Category Labels */}
      <div className="snc-cat-info">
        <h3 className="snc-cat-name">{category.title}</h3>
        <p className="snc-cat-subtext">{category.subtitle}</p>
        <span className="snc-cat-arrow" aria-hidden="true">→</span>
      </div>
    </div>
  );
}
