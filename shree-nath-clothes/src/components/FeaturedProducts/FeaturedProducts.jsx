import ProductCard from './ProductCard';
import { PRODUCTS_DATA } from '../../data/productsData';
import { ArrowRight } from 'lucide-react';
import './FeaturedProducts.css';

// Keep the existing selection, using canonical catalog IDs and product details.
const FEATURED_PRODUCT_IDS = ['prod-1', 'prod-2', 'prod-3', 'prod-4', 'prod-5'];
const FEATURED_PRODUCTS = FEATURED_PRODUCT_IDS.map((id) => PRODUCTS_DATA.find((product) => product.id === id));

export default function FeaturedProducts({
  onAddToCart,
  onToggleWishlist,
  wishlistedIds = [],
  onViewAll,
  onViewProduct
}) {
  return (
    <section
      className="snc-featured-ivory-section"
      id="shop"
      aria-label="Featured Collection"
    >
      <div className="snc-featured-container">
        
        {/* Header: Centered Heading & Subtitle with View All Products Link on the Right */}
        <div className="snc-featured-header">
          <div className="snc-featured-title-wrap">
            <div className="snc-cat-divider-wrapper" aria-hidden="true">
              <img src="/assets/decor/ornamental-divider.svg" alt="" className="snc-ornamental-divider-img" />
            </div>
            
            <h2 className="snc-categories-title">Featured Collection</h2>
            <p className="snc-featured-subtitle">Handpicked with devotion for your Laddu Gopal</p>
          </div>

          <a
            href="#shop"
            className="snc-view-all-link"
            aria-label="View All Products"
            onClick={(e) => {
              if (onViewAll) {
                e.preventDefault();
                onViewAll();
              }
            }}
          >
            <span>View All Products</span>
            <ArrowRight size={16} className="snc-view-all-arrow" aria-hidden="true" />
          </a>
        </div>

        {/* Five featured products in the reference layout */}
        <div className="snc-ref-products-grid">
          {FEATURED_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="snc-product-grid-item"
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                onViewProduct={onViewProduct}
                isWishlisted={wishlistedIds.includes(product.id)}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
