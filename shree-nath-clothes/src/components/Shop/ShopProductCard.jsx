import { useState } from 'react';
import { Heart, Check, ShoppingBag, ArrowUpRight } from 'lucide-react';
import './ShopProductCard.css';

export default function ShopProductCard({ product, onAddToCart, onToggleWishlist, onViewProduct, isWishlisted = false }) {
  const [added, setAdded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const add = () => { onAddToCart?.(product); setAdded(true); setTimeout(() => setAdded(false), 1800); };
  return (
    <article className="snc-shop-card">
      <button className="snc-shop-card__img-box" onClick={() => onViewProduct?.(product.id)} aria-label={`View ${product.name}`}>
        {product.badge && <span className="snc-shop-card__badge">{product.badge}</span>}
        {!imageError && product.image ? <img className="snc-shop-card__img" src={product.image} alt={product.name} loading="lazy" onError={() => setImageError(true)} /> : <span className="snc-shop-card__fallback">{product.name}</span>}
        <span className="snc-shop-card__view" aria-hidden="true">View details <ArrowUpRight size={15} /></span>
      </button>
      <div className="snc-shop-card__body">
        <p className="snc-shop-card__category">{product.categoryName || product.category}</p>
        <h3 className="snc-shop-card__name"><button onClick={() => onViewProduct?.(product.id)}>{product.name}</button></h3>
        <div className="snc-shop-card__price-row"><span className="snc-shop-card__price">₹{product.price.toLocaleString('en-IN')}</span>{product.originalPrice > product.price && <span className="snc-shop-card__original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>}</div>
        <div className="snc-shop-card__actions">
          <button className={`snc-shop-card__cart-btn ${added ? 'is-added' : ''}`} onClick={add} disabled={added} aria-label={`Add ${product.name} to cart`}>{added ? <Check size={16} /> : <ShoppingBag size={15} />}<span>{added ? 'Added to Bag' : 'Add to Cart'}</span></button>
          <button className={`snc-shop-card__wishlist-btn ${isWishlisted ? 'is-active' : ''}`} onClick={() => onToggleWishlist?.(product, !isWishlisted)} aria-pressed={isWishlisted} aria-label={`${isWishlisted ? 'Remove' : 'Save'} ${product.name} ${isWishlisted ? 'from' : 'to'} wishlist`}><Heart size={18} strokeWidth={1.5} fill={isWishlisted ? 'currentColor' : 'none'} /></button>
        </div>
      </div>
    </article>
  );
}
