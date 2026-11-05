import { useState, useMemo } from 'react';
import ShopBanner from './ShopBanner';
import ShopSidebar from './ShopSidebar';
import ShopProductGrid from './ShopProductGrid';
import { PRODUCTS_DATA, SHOP_CATEGORIES } from '../../data/productsData';
import './ShopPage.css';

export default function ShopPage({ onAddToCart, onToggleWishlist, wishlistedIds = [], onViewProduct }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRanges, setPriceRanges] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [sortBy, setSortBy] = useState('newest');

  const activeCount = (selectedCategory !== 'all' ? 1 : 0) + priceRanges.length + selectedSizes.length + (selectedColor ? 1 : 0);
  const resetFilters = () => { setSelectedCategory('all'); setPriceRanges([]); setSelectedSizes([]); setSelectedColor(null); setSortBy('newest'); };

  // Toggle Price Range Filter
  const handleTogglePriceRange = (rangeId) => {
    setPriceRanges((prev) =>
      prev.includes(rangeId) ? prev.filter((r) => r !== rangeId) : [...prev, rangeId]
    );
  };

  // Toggle Size Filter
  const handleToggleSize = (sizeId) => {
    setSelectedSizes((prev) =>
      prev.includes(sizeId) ? prev.filter((s) => s !== sizeId) : [...prev, sizeId]
    );
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS_DATA];

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by Price Range
    if (priceRanges.length > 0) {
      result = result.filter((p) => {
        return priceRanges.some((rangeId) => {
          if (rangeId === 'under-500') return p.price <= 500;
          if (rangeId === '500-1000') return p.price >= 500 && p.price <= 1000;
          if (rangeId === '1000-2000') return p.price >= 1000 && p.price <= 2000;
          if (rangeId === 'above-2000') return p.price >= 2000;
          return true;
        });
      });
    }

    // Filter by Size
    if (selectedSizes.length > 0) {
      result = result.filter((p) => selectedSizes.includes(p.sizeCode));
    }

    // Filter by Color
    if (selectedColor) {
      result = result.filter((p) => p.colors && p.colors.includes(selectedColor));
    }

    // Sort Products
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popular') {
      result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }

    return result;
  }, [selectedCategory, priceRanges, selectedSizes, selectedColor, sortBy]);

  // Current category name & total count for header
  const currentCategoryObj = SHOP_CATEGORIES.find((c) => c.id === selectedCategory);
  const categoryDisplayName = currentCategoryObj ? currentCategoryObj.name : 'All Products';
  const categoryTotalCount = filteredProducts.length;

  return (
    <div className="snc-shop-page" id="shop-page">
      {/* 1. Collection Banner with Heading & Deity Visual matching Figma */}
      <ShopBanner />

      {/* 2. Main Content Layout: Left Sidebar + Right Product Grid */}
      <div className="snc-shop-main-wrap">
        <div className="snc-shop-container">
          
          {/* Left Sidebar: Categories & Filters */}
          <ShopSidebar
            onReset={resetFilters}
            activeCount={activeCount}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            priceRanges={priceRanges}
            onTogglePriceRange={handleTogglePriceRange}
            selectedSizes={selectedSizes}
            onToggleSize={handleToggleSize}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
            sortBy={sortBy}
            onSelectSortBy={setSortBy}
          />

          {/* Right Product Grid matching Figma 3-column layout */}
          <ShopProductGrid
            onReset={resetFilters}
            activeCount={activeCount}
            products={filteredProducts}
            categoryName={categoryDisplayName}
            totalCount={categoryTotalCount}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            onViewProduct={onViewProduct}
            wishlistedIds={wishlistedIds}
          />

        </div>
      </div>
    </div>
  );
}

