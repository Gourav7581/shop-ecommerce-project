import { SHOP_CATEGORIES, COLOR_OPTIONS, PRODUCTS_DATA } from '../../data/productsData';
import { useState } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import './ShopSidebar.css';

export default function ShopSidebar({
  selectedCategory,
  onSelectCategory,
  priceRanges,
  onTogglePriceRange,
  selectedSizes,
  onToggleSize,
  selectedColor,
  onSelectColor,
  sortBy,
  onSelectSortBy,
  onReset,
  activeCount = 0
}) {
  const [expanded, setExpanded] = useState(false);
  const PRICE_OPTIONS = [
    { id: 'under-500', label: '?0 ? ?500' },
    { id: '500-1000', label: '?500 ? ?1,000' },
    { id: '1000-2000', label: '?1,000 ? ?2,000' },
    { id: 'above-2000', label: '?2,000+' }
  ];

  const SIZE_OPTIONS = [
    { id: '0', label: '0 (Small)' },
    { id: '1', label: '1 (Medium)' },
    { id: '2', label: '2 (Large)' },
    { id: '3', label: '3 (Extra Large)' }
  ];

  return (
    <aside className={`snc-shop-sidebar ${expanded ? 'is-expanded' : ''}`} aria-label="Product Categories and Filters">
      
      <div className="snc-sidebar-top"><button className="snc-filter-toggle" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls="snc-shop-filters"><SlidersHorizontal size={17} /> Refine your selection {activeCount > 0 && <span>{activeCount}</span>}<ChevronDown className="snc-filter-toggle-chevron" size={16} /></button><button className="snc-reset-filters" onClick={onReset} disabled={!activeCount}>Reset</button></div>
      <div className="snc-sidebar-content" id="snc-shop-filters">
      <div className="snc-sidebar-block">
        <h3 className="snc-sidebar-heading">Categories</h3>
        <ul className="snc-category-list">
          {SHOP_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <li key={cat.id} className="snc-category-item">
                <button
                  type="button"
                  className={`snc-category-link ${isActive ? 'is-active' : ''}`}
                  aria-pressed={isActive}
                  onClick={() => onSelectCategory(cat.id)}
                >
                  <span>{cat.name}</span><span className="snc-category-count">{cat.id === 'all' ? PRODUCTS_DATA.length : PRODUCTS_DATA.filter((product) => product.category === cat.id).length}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="snc-sidebar-hr" aria-hidden="true"></div>

      {/* 2. Filter Section matching Figma exactly */}
      <div className="snc-sidebar-block">
        <h3 className="snc-sidebar-heading">Filter</h3>

        {/* Price Range */}
        <div className="snc-filter-section">
          <h4 className="snc-filter-subheading">Price Range</h4>
          <div className="snc-checkbox-group">
            {PRICE_OPTIONS.map((range) => {
              const isChecked = priceRanges.includes(range.id);
              return (
                <label key={range.id} className="snc-checkbox-row">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onTogglePriceRange(range.id)}
                    className="snc-real-checkbox"
                  />
                  <span className="snc-custom-checkbox"></span>
                  <span className="snc-checkbox-label-text">{range.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Size */}
        <div className="snc-filter-section">
          <h4 className="snc-filter-subheading">Size</h4>
          <div className="snc-checkbox-group">
            {SIZE_OPTIONS.map((sz) => {
              const isChecked = selectedSizes.includes(sz.id);
              return (
                <label key={sz.id} className="snc-checkbox-row">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleSize(sz.id)}
                    className="snc-real-checkbox"
                  />
                  <span className="snc-custom-checkbox"></span>
                  <span className="snc-checkbox-label-text">{sz.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Color Swatches */}
        <div className="snc-filter-section">
          <h4 className="snc-filter-subheading">Color</h4>
          <div className="snc-color-row" role="group" aria-label="Filter by color">
            {COLOR_OPTIONS.map((c) => {
              const isSelected = selectedColor === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`snc-color-dot ${isSelected ? 'is-selected' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => onSelectColor(isSelected ? null : c.id)}
                  title={c.label}
                  aria-label={c.label}
                  aria-pressed={isSelected}
                />
              );
            })}
          </div>
        </div>

        {/* Sort By Dropdown inside Sidebar matching Figma */}
        <div className="snc-filter-section snc-filter-section--sort">
          <h4 className="snc-filter-subheading">Sort By</h4>
          <div className="snc-sort-box">
            <select
              value={sortBy}
              onChange={(e) => onSelectSortBy(e.target.value)}
              className="snc-sidebar-select"
              aria-label="Sort products by"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
            <ChevronDown size={14} className="snc-select-chevron" aria-hidden="true" />
          </div>
        </div>

      </div>

      </div>
    </aside>
  );
}
