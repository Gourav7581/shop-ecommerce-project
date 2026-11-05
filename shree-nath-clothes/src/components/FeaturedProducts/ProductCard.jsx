import { useState } from 'react';
import { Heart, Check } from 'lucide-react';
import ProductPlaceholder from './ProductPlaceholder';
import './ProductCard.css';

export default function ProductCard({ product, onAddToCart, onToggleWishlist, onViewProduct, isWishlisted = false }) {
  const [added, setAdded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  const handleAdd = () => {
    setAdded(true);
    onAddToCart?.(product);
    setTimeout(() => setAdded(false), 1900);
  };

  return (
    <article className="snc-product-card">
      <button className="snc-prod-img-box" onClick={() => onViewProduct?.(product.id)} aria-label={`View ${product.name}`}>
        {discount > 0 && <span className="snc-prod-discount-badge">{discount}% OFF</span>}
        {!imageError && product.image ? (
          <img src={product.image} alt={product.name} className="snc-prod-img" onError={() => setImageError(true)} loading="lazy" />
        ) : <ProductPlaceholder deitySize={product.deitySize} />}
      </button>
      <div className="snc-prod-details">
        <h3 className="snc-prod-name"><button onClick={() => onViewProduct?.(product.id)}>{product.name}</button></h3>
        <div className="snc-prod-prices">
          <span className="snc-prod-price">₹ {product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice > product.price && <span className="snc-prod-original-price">₹ {product.originalPrice.toLocaleString('en-IN')}</span>}
        </div>
        <div className="snc-prod-actions">
          <button className={`snc-prod-wishlist-btn ${isWishlisted ? 'is-active' : ''}`} onClick={() => onToggleWishlist?.(product, !isWishlisted)} aria-pressed={isWishlisted} aria-label={`${isWishlisted ? 'Remove' : 'Save'} ${product.name} ${isWishlisted ? 'from' : 'to'} wishlist`}>
            <Heart size={16} strokeWidth={1.5} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
          <button className={`snc-prod-cart-btn ${added ? 'is-added' : ''}`} onClick={handleAdd} disabled={added} aria-label={`Add ${product.name} to cart`}>
            {added && <Check size={14} />}<span>{added ? 'Added to Bag' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
