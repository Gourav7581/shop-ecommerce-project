import { useState, useMemo } from 'react';
import ProductGallery from './ProductGallery';
import { PRODUCTS_DATA } from '../../data/productsData';
import { Star, Heart, Check } from 'lucide-react';
import './ProductDetailPage.css';

export default function ProductDetailPage({
  productId = 'prod-1',
  onAddToCart,
  onToggleWishlist,
  wishlistedIds = [],
  onNavigate,
  onSelectProduct
}) {
  // Find product by id or fallback to first product
  const product = useMemo(() => {
    return PRODUCTS_DATA.find((p) => p.id === productId) || PRODUCTS_DATA[0];
  }, [productId]);

  const [selectedSize, setSelectedSize] = useState(() => {
    return product.availableSizes?.[0] || '0';
  });
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = wishlistedIds.includes(product.id);

  const handleAdd = () => {
    setIsAdded(true);
    if (onAddToCart) {
      onAddToCart({
        ...product,
        selectedSize,
        quantity
      });
    }
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlist = () => {
    if (onToggleWishlist) {
      onToggleWishlist(product, !isWishlisted);
    }
  };

  // Gallery images (ensure 5 thumbnails matching Figma)
  const galleryImages = useMemo(() => {
    if (product.gallery && product.gallery.length >= 4) {
      return product.gallery;
    }
    return [
      product.image,
      '/assets/images/products/designer-poshak-yellow-large.jpg',
      '/assets/images/categories/poshak.jpg',
      '/assets/images/products/mukut-mor-pankh.jpg',
      '/assets/images/products/kundan-jewellery-set.jpg'
    ];
  }, [product]);

  // 4 "You May Also Like" products matching Figma reference
  const relatedProducts = useMemo(() => {
    // Specifically pick Kundan Jewellery Set, Mukut with Mor Pankh, Red Velvet Poshak, Shringar Set
    const preferredIds = ['prod-2', 'prod-4', 'prod-6', 'prod-5'];
    const found = preferredIds
      .map((id) => PRODUCTS_DATA.find((p) => p.id === id))
      .filter(Boolean);

    if (found.length === 4) return found;

    // Fallback: exclude current product and take 4
    return PRODUCTS_DATA.filter((p) => p.id !== product.id).slice(0, 4);
  }, [product.id]);

  const handleRelatedCardClick = (relatedId) => {
    if (onSelectProduct) {
      onSelectProduct(relatedId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="snc-pdp-page">
      <div className="snc-pdp-container">
        
        {/* Breadcrumb Navigation matching Figma */}
        <nav className="snc-pdp-breadcrumbs" aria-label="Breadcrumb">
          <button
            type="button"
            className="snc-crumb-link"
            onClick={() => onNavigate && onNavigate('home')}
          >
            Home
          </button>
          <span className="snc-crumb-sep">&gt;</span>
          <button
            type="button"
            className="snc-crumb-link"
            onClick={() => onNavigate && onNavigate('shop')}
          >
            {product.categoryName || 'Poshak'}
          </button>
          <span className="snc-crumb-sep">&gt;</span>
          <span className="snc-crumb-current">{product.name}</span>
        </nav>

        {/* ====================================================================
            MAIN TWO-COLUMN PRODUCT SECTION MATCHING FIGMA
            ==================================================================== */}
        <div className="snc-pdp-main-grid">
          
          {/* LEFT COLUMN: Gallery with Vertical Thumbnails and Zoom */}
          <div className="snc-pdp-left-col">
            <ProductGallery images={galleryImages} productName={product.name} />
          </div>

          {/* RIGHT COLUMN: Product Info, Options & Actions */}
          <div className="snc-pdp-right-col">
            
            {/* Title */}
            <h1 className="snc-pdp-title">{product.name}</h1>

            {/* Price & Rating Row */}
            <div className="snc-pdp-price-rating-row">
              <div className="snc-pdp-price-box">
                <span className="snc-pdp-price">₹ {product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="snc-pdp-orig-price">₹ {product.originalPrice.toLocaleString('en-IN')}</span>
                )}
              </div>

              {/* Gold 5 Stars & Reviews count matching Figma */}
              <div className="snc-pdp-rating-meta">
                <div className="snc-pdp-stars" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#d49a2a" stroke="#d49a2a" />
                  ))}
                </div>
                <span className="snc-pdp-rating-score">
                  {product.rating ? product.rating.toFixed(1) : '5.0'} ({product.reviewsCount || 12})
                </span>
                <span className="snc-pdp-reviews-link">
                  {product.reviewsCount || 12} reviews
                </span>
              </div>
            </div>

            {/* Short Description matching Figma text */}
            <p className="snc-pdp-short-desc">
              {product.shortDescription ||
                'Beautiful designer poshak for Laddu Gopal with fine embroidery and premium fabric. Perfect for daily darshan and special occasions.'}
            </p>

            {/* 4 Feature Bullet Points with Circular Checkmarks matching Figma */}
            <ul className="snc-pdp-features-list">
              {(product.features || [
                'Premium quality fabric',
                'Handcrafted work',
                'Available in multiple sizes',
                'Easy to wear'
              ]).map((feat, idx) => (
                <li key={idx} className="snc-pdp-feature-item">
                  <span className="snc-feature-circle-check">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <span className="snc-feature-text">{feat}</span>
                </li>
              ))}
            </ul>

            {/* Size Selector matching Figma (0, 1, 2, 3) */}
            <div className="snc-pdp-option-group">
              <label className="snc-pdp-option-title">Size</label>
              <div className="snc-pdp-sizes-list" role="radiogroup" aria-label="Select Deity Size">
                {(product.availableSizes || ['0', '1', '2', '3']).map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`snc-pdp-size-btn ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector matching Figma */}
            <div className="snc-pdp-option-group">
              <label className="snc-pdp-option-title">Quantity</label>
              <div className="snc-pdp-qty-wrap">
                <button
                  type="button"
                  className="snc-pdp-qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="snc-pdp-qty-num" aria-live="polite">{quantity}</span>
                <button
                  type="button"
                  className="snc-pdp-qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons: Add to Cart (Solid Maroon) & Add to Wishlist (Outline) */}
            <div className="snc-pdp-cta-block">
              {/* Primary Solid Royal Maroon Add to Cart Button */}
              <button
                type="button"
                className={`snc-pdp-cart-btn ${isAdded ? 'is-added' : ''}`}
                onClick={handleAdd}
              >
                {isAdded ? (
                  <>
                    <Check size={16} />
                    <span>Added to Seva Bag ✓</span>
                  </>
                ) : (
                  <span>Add to Cart</span>
                )}
              </button>

              {/* Secondary Outlined Wishlist Button */}
              <button
                type="button"
                className={`snc-pdp-wish-btn ${isWishlisted ? 'is-wishlisted' : ''}`}
                onClick={handleWishlist}
              >
                <Heart
                  size={16}
                  fill={isWishlisted ? '#c41824' : 'none'}
                  stroke={isWishlisted ? '#c41824' : 'currentColor'}
                />
                <span>{isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* ====================================================================
            TABS SECTION (Description, Additional Info, Reviews)
            ==================================================================== */}
        <section className="snc-pdp-tabs-section" aria-label="Product Information">
          {/* Tab Navigation Headers */}
          <div className="snc-pdp-tabs-nav" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'description'}
              className={`snc-pdp-tab-header ${activeTab === 'description' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'additional-info'}
              className={`snc-pdp-tab-header ${activeTab === 'additional-info' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('additional-info')}
            >
              Additional Info
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'reviews'}
              className={`snc-pdp-tab-header ${activeTab === 'reviews' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.reviewsCount || 12})
            </button>
          </div>

          {/* Tab Content Panels */}
          <div className="snc-pdp-tab-content">
            {activeTab === 'description' && (
              <div className="snc-pdp-panel snc-pdp-panel-desc">
                <p>
                  {product.detailedDescription ||
                    'This beautiful yellow designer poshak is specially crafted for Laddu Gopal with intricate embroidery and fine detailing. Made with high-quality fabric to ensure comfort and durability. Perfect for daily darshan and festive occasions like Janmashtami, Holi, Diwali and more.'}
                </p>
              </div>
            )}

            {activeTab === 'additional-info' && (
              <div className="snc-pdp-panel snc-pdp-panel-info">
                <div className="snc-pdp-info-grid">
                  <div className="snc-pdp-info-row">
                    <span className="snc-pdp-info-key">Fabric:</span>
                    <span className="snc-pdp-info-val">{product.additionalInfo?.Fabric || 'Pure Silk with Zari Embroidery'}</span>
                  </div>
                  <div className="snc-pdp-info-row">
                    <span className="snc-pdp-info-key">Craftsmanship:</span>
                    <span className="snc-pdp-info-val">{product.additionalInfo?.Craftsmanship || 'Handcrafted by Traditional Artisans'}</span>
                  </div>
                  <div className="snc-pdp-info-row">
                    <span className="snc-pdp-info-key">Deity Fit:</span>
                    <span className="snc-pdp-info-val">{product.additionalInfo?.['Deity Fit'] || 'Laddu Gopal Size 0, 1, 2, 3'}</span>
                  </div>
                  <div className="snc-pdp-info-row">
                    <span className="snc-pdp-info-key">Care Instructions:</span>
                    <span className="snc-pdp-info-val">{product.additionalInfo?.['Care Instructions'] || 'Gentle dry clean or soft cloth dusting'}</span>
                  </div>
                  <div className="snc-pdp-info-row">
                    <span className="snc-pdp-info-key">Package Includes:</span>
                    <span className="snc-pdp-info-val">{product.additionalInfo?.['Package Includes'] || '1 Designer Poshak, 1 Matching Patka, 1 Sacred Box'}</span>
                  </div>
                  <div className="snc-pdp-info-row">
                    <span className="snc-pdp-info-key">Origin:</span>
                    <span className="snc-pdp-info-val">{product.additionalInfo?.Origin || 'Sanctified in Vrindavan Dham'}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="snc-pdp-panel snc-pdp-panel-reviews">
                <div className="snc-pdp-reviews-list">
                  {(product.reviews && product.reviews.length > 0
                    ? product.reviews
                    : [
                        {
                          id: 1,
                          author: 'Radha Priya Dasi',
                          rating: 5,
                          date: 'October 2026',
                          comment:
                            'The yellow poshak looks divine on my Thakur Ji! The embroidery work is breathtaking and the fabric is pure silk. Blessed seva.'
                        },
                        {
                          id: 2,
                          author: 'Anand Sharma',
                          rating: 5,
                          date: 'September 2026',
                          comment:
                            'Perfect fit for Size 2 Laddu Gopal. The packaging in the sacred gift box made it feel like prasad. Highly recommended!'
                        }
                      ]
                  ).map((rev) => (
                    <div key={rev.id} className="snc-pdp-review-card">
                      <div className="snc-review-header">
                        <div className="snc-review-stars">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={14} fill="#d49a2a" stroke="#d49a2a" />
                          ))}
                        </div>
                        <span className="snc-review-author">{rev.author}</span>
                        <span className="snc-review-date">{rev.date}</span>
                      </div>
                      <p className="snc-review-text">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ====================================================================
            "YOU MAY ALSO LIKE" SECTION MATCHING FIGMA
            ==================================================================== */}
        <section className="snc-pdp-related-section" aria-label="Related Products">
          {/* Header with Title and Antique Gold Line */}
          <div className="snc-pdp-related-header">
            <h2 className="snc-pdp-related-title">You May Also Like</h2>
            <div className="snc-pdp-related-divider" />
          </div>

          {/* 4-Product Row */}
          <div className="snc-pdp-related-grid">
            {relatedProducts.map((relProd) => {
              const isRelWishlisted = wishlistedIds.includes(relProd.id);
              return (
                <article
                  key={relProd.id}
                  className="snc-pdp-related-card"
                  onClick={() => handleRelatedCardClick(relProd.id)}
                >
                  {/* Image Container */}
                  <div className="snc-pdp-rel-img-box">
                    <img
                      src={relProd.image}
                      alt={relProd.name}
                      className="snc-pdp-rel-img"
                      loading="lazy"
                    />
                  </div>

                  {/* Body */}
                  <div className="snc-pdp-rel-body">
                    <h3 className="snc-pdp-rel-name" title={relProd.name}>
                      {relProd.name}
                    </h3>
                    <div className="snc-pdp-rel-price">
                      ₹ {relProd.price.toLocaleString('en-IN')}
                    </div>

                    {/* Actions: Wishlist + Solid Maroon Add to Cart */}
                    <div className="snc-pdp-rel-actions">
                      <button
                        type="button"
                        className={`snc-pdp-rel-wish-btn ${isRelWishlisted ? 'is-active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onToggleWishlist) onToggleWishlist(relProd, !isRelWishlisted);
                        }}
                        aria-label="Wishlist"
                      >
                        <Heart
                          size={15}
                          fill={isRelWishlisted ? '#c41824' : 'none'}
                          stroke={isRelWishlisted ? '#c41824' : '#6b5d52'}
                        />
                      </button>

                      <button
                        type="button"
                        className="snc-pdp-rel-cart-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onAddToCart) onAddToCart(relProd);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
