import { X, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import './CartDrawer.css';

const DEFAULT_SAMPLE_ITEMS = [
  {
    id: 'prod-1',
    title: 'Designer Poshak (Yellow)',
    name: 'Designer Poshak (Yellow)',
    deity: 'Laddu Gopal - Size 0',
    price: 1850,
    quantity: 1,
    tag: 'Sacred Poshak'
  }
];

export default function CartDrawer({ isOpen, onClose, cartItems = [], onNavigate }) {
  if (!isOpen) return null;

  const displayItems = cartItems.length > 0 ? cartItems : DEFAULT_SAMPLE_ITEMS;
  const subtotal = displayItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleGoToCartPage = () => {
    if (onClose) onClose();
    if (onNavigate) onNavigate('cart');
  };

  return (
    <div className="snc-cart-drawer" role="dialog" aria-modal="true">
      <div className="snc-cart-drawer__backdrop" onClick={onClose}></div>
      <div className="snc-cart-drawer__content">
        <div className="snc-cart-drawer__header">
          <div className="snc-cart-drawer__title">
            <ShoppingBag size={20} className="snc-gold-icon" />
            <h3>Sacred Seva Bag ({displayItems.length})</h3>
          </div>
          <button className="snc-cart-drawer__close" onClick={onClose} aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        <div className="snc-cart-drawer__items">
          {displayItems.map((item) => (
            <div key={`${item.id}-${item.selectedSize || 'def'}`} className="snc-cart-item">
              <div className="snc-cart-item__icon-box">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name || item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                  />
                ) : (
                  <span className="snc-cart-item__icon-glyph">✦</span>
                )}
              </div>
              <div className="snc-cart-item__details">
                <span className="snc-cart-item__tag">{item.tag || 'Sacred Item'}</span>
                <h4 className="snc-cart-item__title">{item.name || item.title}</h4>
                <p className="snc-cart-item__meta">
                  {item.selectedSize ? `Size: ${item.selectedSize}` : item.deity || 'Laddu Gopal'}
                </p>
                <div className="snc-cart-item__bottom">
                  <span className="snc-cart-item__price">₹{item.price.toLocaleString('en-IN')}</span>
                  <span className="snc-cart-item__qty">Qty: {item.quantity || item.qty || 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="snc-cart-drawer__footer">
          <div className="snc-cart-summary">
            <div className="snc-cart-summary__row">
              <span>Subtotal:</span>
              <span className="snc-cart-summary__val">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="snc-cart-summary__row">
              <span>Sanctified Gift Box:</span>
              <span className="snc-cart-summary__free">FREE</span>
            </div>
            <div className="snc-cart-summary__row snc-cart-summary__total">
              <span>Grand Total:</span>
              <span className="snc-cart-summary__total-val">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            type="button"
            className="snc-btn-checkout"
            onClick={handleGoToCartPage}
            style={{ marginBottom: '8px' }}
          >
            <span>View Full Cart Page</span>
            <ArrowRight size={18} />
          </button>

          <div className="snc-cart-blessing">
            <ShieldCheck size={16} className="snc-gold-icon" />
            <span>Packed with sanctified care & pure devotion</span>
          </div>
        </div>
      </div>
    </div>
  );
}
