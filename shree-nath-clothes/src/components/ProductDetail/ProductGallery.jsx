import { useState, useRef } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import './ProductGallery.css';

export default function ProductGallery({ images = [], productName = 'Product' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [imageError, setImageError] = useState({});
  const mainImageRef = useRef(null);

  // Fallback thumbnails if fewer than 5 images provided
  const displayImages = images.length > 0 ? images : ['/assets/images/products/designer-poshak-yellow.jpg'];

  const handleMouseMove = (e) => {
    if (!mainImageRef.current) return;
    const rect = mainImageRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomOrigin({ x, y });
  };

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => {
    setIsZoomed(false);
    setZoomOrigin({ x: 50, y: 50 });
  };

  const handleNextThumb = () => {
    setActiveIndex((prev) => (prev + 1) % displayImages.length);
  };

  const activeImageSrc = displayImages[activeIndex] || displayImages[0];

  return (
    <div className="snc-pdp-gallery">
      {/* 1. Left Vertical Thumbnail Column (5 thumbnails matching Figma) */}
      <div className="snc-pdp-thumbs-col">
        <div className="snc-pdp-thumbs-list" role="tablist" aria-label="Product thumbnails">
          {displayImages.map((imgSrc, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`snc-pdp-thumb-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                aria-label={`Thumbnail ${idx + 1} for ${productName}`}
              >
                {!imageError[imgSrc] ? (
                  <img
                    src={imgSrc}
                    alt={`${productName} thumbnail ${idx + 1}`}
                    className="snc-pdp-thumb-img"
                    onError={() => setImageError((prev) => ({ ...prev, [imgSrc]: true }))}
                    loading="lazy"
                  />
                ) : (
                  <div className="snc-pdp-thumb-fallback">✦</div>
                )}
              </button>
            );
          })}
        </div>

        {/* Down Chevron Arrow under thumbnails matching Figma */}
        <button
          type="button"
          className="snc-pdp-thumb-down"
          onClick={handleNextThumb}
          aria-label="View next product image"
          title="Next Image"
        >
          <ChevronDown size={16} />
        </button>
      </div>

      {/* 2. Main Large Image with Interactive Zoom matching Figma */}
      <div
        ref={mainImageRef}
        className="snc-pdp-main-image-container"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="snc-pdp-main-image-viewport">
          <img
            src={activeImageSrc}
            alt={productName}
            className={`snc-pdp-main-image ${isZoomed ? 'is-zoomed' : ''}`}
            style={{
              transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`
            }}
          />
        </div>

        {/* Hover to Zoom Pill matching Figma */}
        <div className={`snc-pdp-zoom-pill ${isZoomed ? 'is-active-zoom' : ''}`}>
          <Search size={13} className="snc-pdp-zoom-icon" />
          <span>Hover to zoom</span>
        </div>
      </div>
    </div>
  );
}

