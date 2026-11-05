import { useRef, useState } from 'react';
import { Grid3X3, LayoutGrid, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import ShopProductCard from './ShopProductCard';
import './ShopProductGrid.css';

export default function ShopProductGrid({ products, categoryName = 'All Products', onAddToCart, onToggleWishlist, onViewProduct, wishlistedIds = [], onReset, activeCount = 0 }) {
  const [gridColumns, setGridColumns] = useState(3);
  const gridRef = useRef(null);
  const resultKey = products.map((product) => product.id).join(',');
  const [pagination, setPagination] = useState({ key: resultKey, page: 1 });
  const pageSize = 6;
  const pageCount = Math.ceil(products.length / pageSize);
  const currentPage = pagination.key === resultKey ? Math.min(pagination.page, Math.max(1, pageCount)) : 1;
  const firstIndex = (currentPage - 1) * pageSize;
  const visibleProducts = products.slice(firstIndex, firstIndex + pageSize);
  const changePage = (page) => {
    setPagination({ key: resultKey, page });
    gridRef.current?.focus({ preventScroll: true });
    gridRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  };
  return (
    <div className="snc-shop-grid-area" ref={gridRef} tabIndex={-1} aria-label="Collection products">
      <div className="snc-grid-header">
        <div><h2 className="snc-grid-heading">{categoryName} <span className="snc-grid-count">{products.length}</span></h2><p className="snc-grid-description" role="status">{products.length} {products.length === 1 ? 'piece' : 'pieces'} for your everyday devotion &amp; festive shringar</p></div>
        <div className="snc-grid-view-toggles" role="group" aria-label="Product layout">
          <button className={`snc-view-btn ${gridColumns === 3 ? 'is-active' : ''}`} onClick={() => setGridColumns(3)} aria-label="Three column layout" aria-pressed={gridColumns === 3}><Grid3X3 size={18} /></button>
          <button className={`snc-view-btn ${gridColumns === 2 ? 'is-active' : ''}`} onClick={() => setGridColumns(2)} aria-label="Two column layout" aria-pressed={gridColumns === 2}><LayoutGrid size={18} /></button>
        </div>
      </div>
      {activeCount > 0 && <div className="snc-shop-active-filters"><span>{activeCount} {activeCount === 1 ? 'filter' : 'filters'} applied</span><button onClick={onReset}>Clear all <X size={13} /></button></div>}
      {products.length ? <>
        <div className={`snc-products-grid snc-products-grid--cols-${gridColumns}`}>
          {visibleProducts.map((product) => <ShopProductCard key={product.id} product={product} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} onViewProduct={onViewProduct} isWishlisted={wishlistedIds.includes(product.id)} />)}
        </div>
        <p className="snc-shop-results-end">Showing all {products.length} {products.length === 1 ? 'piece' : 'pieces'} <span aria-hidden="true">✦</span> Handpicked with devotion</p>
      </> : <div className="snc-shop-empty"><Search size={30} strokeWidth={1.2} /><h3>No pieces found</h3><p>Try another colour, size or price range to find your perfect shringar.</p><button onClick={onReset}>Clear filters &amp; explore all</button></div>}
    </div>
  );
}
