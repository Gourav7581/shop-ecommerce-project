import { useState, useMemo } from 'react';
import CartBanner from './CartBanner';
import { Trash2, ArrowRight, ShoppingBag, Check, Tag } from 'lucide-react';
import './CartPage.css';

export default function CartPage({
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
  onViewProduct,
  onShowToast
}) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Subtotal calculation matching Figma
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  }, [cartItems]);

  // Shipping calculation matching Figma (₹ 100)
  const shipping = subtotal > 0 ? 100 : 0;

  // Coupon discount calculation
  const discount = useMemo(() => {
    if (!appliedCoupon || subtotal === 0) return 0;
    if (appliedCoupon.percent) {
      return Math.round((subtotal * appliedCoupon.percent) / 100);
    }
    if (appliedCoupon.fixed) {
      return Math.min(subtotal, appliedCoupon.fixed);
    }
    return 0;
  }, [appliedCoupon, subtotal]);

  // Final Total calculation matching Figma
  const total = Math.max(0, subtotal + shipping - discount);

  // Apply Coupon Handler
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    setCouponError('');
    setCouponSuccess('');

    if (!code) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    if (code === 'DIVINE10' || code === 'SHREE10') {
      setAppliedCoupon({ code, percent: 10, label: '10% Devotional Discount' });
      setCouponSuccess(`Coupon "${code}" applied! 10% discount added.`);
      if (onShowToast) onShowToast('Coupon DIVINE10 applied! 10% off');
    } else if (code === 'VRINDAVAN') {
      setAppliedCoupon({ code, fixed: 200, label: '₹200 Vrindavan Blessing' });
      setCouponSuccess('Coupon "VRINDAVAN" applied! ₹200 discount added.');
      if (onShowToast) onShowToast('Coupon VRINDAVAN applied! ₹200 off');
    } else if (code === 'RADHE500') {
      setAppliedCoupon({ code, fixed: 500, label: '₹500 Festive Blessing' });
      setCouponSuccess('Coupon "RADHE500" applied! ₹500 discount added.');
      if (onShowToast) onShowToast('Coupon RADHE500 applied! ₹500 off');
    } else {
      setCouponError('Invalid coupon code. Try "DIVINE10" or "VRINDAVAN".');
    }
  };

  // Remove Applied Coupon
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponSuccess('');
    setCouponError('');
  };

  // Proceed to Checkout
  const handleProceedCheckout = () => {
    setIsCheckingOut(true);
    if (onShowToast) {
      onShowToast('Proceeding to Sacred Checkout...');
    }
    setTimeout(() => {
      setIsCheckingOut(false);
      if (onNavigate) {
        onNavigate('checkout');
      }
    }, 400);
  };

  return (
    <div className="snc-cart-page">
      {/* 1. Top Banner matching Figma */}
      <CartBanner />

      {/* 2. Main Two-Column Layout */}
      <div className="snc-cart-container">
        
        {cartItems.length > 0 ? (
          <div className="snc-cart-grid">
            
            {/* ================================================================
                LEFT COLUMN: Cart Items Table + Coupon Section matching Figma
                ================================================================ */}
            <div className="snc-cart-left-col">
              <div className="snc-cart-section-heading"><h2>Your selected pieces</h2><span>{cartItems.reduce((count, item) => count + (item.quantity || 1), 0)} items</span></div>
              
              {/* Cart Table Container */}
              <div className="snc-cart-table-card">
                
                {/* Table Header Row matching Figma: Product | Price | Quantity | Total */}
                <div className="snc-cart-table-header">
                  <div className="snc-cart-col-th snc-cart-th--product">Product</div>
                  <div className="snc-cart-col-th snc-cart-th--price">Price</div>
                  <div className="snc-cart-col-th snc-cart-th--qty">Quantity</div>
                  <div className="snc-cart-col-th snc-cart-th--total">Total</div>
                  <div className="snc-cart-col-th snc-cart-th--action" aria-label="Actions"></div>
                </div>

                {/* Table Items Rows matching Figma */}
                <div className="snc-cart-table-body">
                  {cartItems.map((item) => {
                    const itemQty = item.quantity || 1;
                    const itemTotal = item.price * itemQty;

                    return (
                      <div key={`${item.id}-${item.selectedSize || 'def'}`} className="snc-cart-row">
                        
                        {/* Product Info Column: Image + Name + Subtitle/Size */}
                        <div className="snc-cart-col snc-cart-col--product">
                          <button
                            type="button"
                            className="snc-cart-img-wrap"
                            onClick={() => onViewProduct && onViewProduct(item.id)}
                            title={`View details for ${item.name}`}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="snc-cart-item-img"
                              loading="lazy"
                            />
                          </button>

                          <div className="snc-cart-item-info">
                            <h3 className="snc-cart-item-name"><button onClick={() => onViewProduct?.(item.id)}>{item.name}</button></h3>
                            <div className="snc-cart-item-sub">
                              {item.selectedSize ? `Size: ${item.selectedSize}` : `₹ ${item.price.toLocaleString('en-IN')}`}
                            </div>
                          </div>
                        </div>

                        {/* Price Column */}
                        <div className="snc-cart-col snc-cart-col--price">
                          <span className="snc-cart-price-text">
                            ₹ {item.price.toLocaleString('en-IN')}
                          </span>
                        </div>

                        {/* Quantity Counter Column: [ - ] 1 [ + ] matching Figma */}
                        <div className="snc-cart-col snc-cart-col--qty">
                          <div className="snc-cart-qty-box">
                            <button
                              type="button"
                              className="snc-cart-qty-btn"
                              onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, itemQty - 1)}
                              disabled={itemQty <= 1}
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              -
                            </button>
                            <span className="snc-cart-qty-val" aria-live="polite">
                              {itemQty}
                            </span>
                            <button
                              type="button"
                              className="snc-cart-qty-btn"
                              onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, itemQty + 1)}
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Row Total Column */}
                        <div className="snc-cart-col snc-cart-col--total">
                          <span className="snc-cart-total-text">
                            ₹ {itemTotal.toLocaleString('en-IN')}
                          </span>
                        </div>

                        {/* Trash / Delete Action Button Column */}
                        <div className="snc-cart-col snc-cart-col--action">
                          <button
                            type="button"
                            className="snc-cart-remove-btn"
                            onClick={() => onRemoveItem && onRemoveItem(item.id)}
                            aria-label={`Remove ${item.name} from cart`}
                            title="Remove product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Coupon Code Section below Table matching Figma */}
              <div className="snc-cart-coupon-card">
                <label htmlFor="coupon-input" className="snc-cart-coupon-title">
                  Coupon Code
                </label>
                <form className="snc-cart-coupon-form" onSubmit={handleApplyCoupon}>
                  <input
                    id="coupon-input"
                    type="text"
                    className="snc-cart-coupon-input"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button type="submit" className="snc-cart-coupon-btn">
                    Apply
                  </button>
                </form>

                {/* Coupon Feedback Messages */}
                {couponError && (
                  <p className="snc-coupon-msg snc-coupon-msg--error" role="alert">
                    {couponError}
                  </p>
                )}
                {couponSuccess && (
                  <p className="snc-coupon-msg snc-coupon-msg--success" role="status">
                    <Check size={14} /> {couponSuccess}
                    <button
                      type="button"
                      className="snc-coupon-remove-link"
                      onClick={handleRemoveCoupon}
                    >
                      (Remove)
                    </button>
                  </p>
                )}

                {/* Helpful Divine Suggestions */}
                <div className="snc-coupon-hints">
                  <span>Try codes: </span>
                  <button
                    type="button"
                    className="snc-coupon-pill"
                    onClick={() => {
                      setCouponCode('DIVINE10');
                      setCouponError('');
                    }}
                  >
                    DIVINE10 (10% OFF)
                  </button>
                  <button
                    type="button"
                    className="snc-coupon-pill"
                    onClick={() => {
                      setCouponCode('VRINDAVAN');
                      setCouponError('');
                    }}
                  >
                    VRINDAVAN (₹200 OFF)
                  </button>
                </div>
              </div>

            </div>

            {/* ================================================================
                RIGHT COLUMN: Order Summary Card matching Figma
                ================================================================ */}
            <aside className="snc-cart-right-col" aria-label="Order Summary">
              <div className="snc-order-summary-card">
                
                {/* Heading */}
                <h2 className="snc-summary-title">Order Summary</h2>

                {/* Breakdown Rows matching Figma */}
                <div className="snc-summary-rows">
                  
                  {/* Subtotal */}
                  <div className="snc-summary-row">
                    <span className="snc-summary-label">Subtotal</span>
                    <span className="snc-summary-val">₹ {subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Shipping */}
                  <div className="snc-summary-row">
                    <span className="snc-summary-label">Shipping</span>
                    <span className="snc-summary-val">₹ {shipping.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Coupon Discount Row if applied */}
                  {discount > 0 && (
                    <div className="snc-summary-row snc-summary-row--discount">
                      <span className="snc-summary-label">
                        <Tag size={12} className="snc-discount-icon" /> Coupon Discount
                      </span>
                      <span className="snc-summary-val snc-summary-val--green">
                        -₹ {discount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  {/* Divider Line matching Figma */}
                  <div className="snc-summary-divider" />

                  {/* Total */}
                  <div className="snc-summary-row snc-summary-row--total">
                    <span className="snc-summary-total-label">Total</span>
                    <span className="snc-summary-total-val">₹ {total.toLocaleString('en-IN')}</span>
                  </div>

                </div>

                {/* Prominent Proceed to Checkout Button matching Figma */}
                <button
                  type="button"
                  className={`snc-btn-checkout ${isCheckingOut ? 'is-loading' : ''}`}
                  onClick={handleProceedCheckout}
                  disabled={isCheckingOut}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={16} className="snc-checkout-arrow" />
                </button>

                {/* Continue Shopping Link matching Figma */}
                <button
                  type="button"
                  className="snc-continue-shopping-link"
                  onClick={() => onNavigate && onNavigate('shop')}
                >
                  Continue Shopping
                </button>

              </div>
            </aside>

          </div>
        ) : (
          /* Empty Cart Graceful State */
          <div className="snc-cart-empty">
            <div className="snc-empty-icon-wrap">
              <ShoppingBag size={48} className="snc-empty-cart-icon" />
            </div>
            <h2 className="snc-empty-cart-title">Your Sacred Seva Bag is Empty</h2>
            <p className="snc-empty-cart-desc">
              Your cart currently has no sanctified poshaaks or ornaments. Explore our handpicked collection for Laddu Gopal.
            </p>
            <button
              type="button"
              className="snc-btn-empty-shop"
              onClick={() => onNavigate && onNavigate('shop')}
            >
              Explore Sacred Collection
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

