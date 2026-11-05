import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import SearchModal from './components/Navbar/SearchModal';
import CartDrawer from './components/Navbar/CartDrawer';
import Hero from './components/Hero/Hero';
import Categories from './components/Categories/Categories';
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts';
import FestivalBanner from './components/FestivalBanner/FestivalBanner';
import ShopPage from './components/Shop/ShopPage';
import ProductDetailPage from './components/ProductDetail/ProductDetailPage';
import CartPage from './components/Cart/CartPage';
import CheckoutPage from './components/Checkout/CheckoutPage';
import AboutPage from './components/About/AboutPage';
import ContactPage from './components/Contact/ContactPage';
import Footer from './components/Footer/Footer';
import './App.css';

export default function App() {
  const [selectedProductId, setSelectedProductId] = useState('prod-1');

  // Initial cart items matching the exact items and prices in approved Figma reference
  const [cartItems, setCartItems] = useState([
    {
      id: 'prod-1',
      name: 'Designer Poshak (Yellow)',
      price: 1850,
      quantity: 1,
      selectedSize: '0',
      image: '/assets/images/products/designer-poshak-yellow.jpg'
    },
    {
      id: 'prod-2',
      name: 'Kundan Jewellery Set',
      price: 1250,
      quantity: 1,
      selectedSize: 'Universal',
      image: '/assets/images/products/kundan-jewellery-set.jpg'
    },
    {
      id: 'prod-4',
      name: 'Mukut with Mor Pankh',
      price: 950,
      quantity: 1,
      selectedSize: 'Size 3 to 6',
      image: '/assets/images/products/mukut-mor-pankh.jpg'
    }
  ]);

  // Default to 'contact' view so the requested Contact Us Page is immediately active and previewable
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#home') return 'home';
      if (hash === '#shop' || hash === '#shop-page') return 'shop';
      if (hash.startsWith('#product')) return 'product-detail';
      if (hash === '#cart') return 'cart';
      if (hash === '#checkout') return 'checkout';
      if (hash === '#about') return 'about';
      if (hash === '#contact') return 'contact';
    }
    return 'contact';
  });

  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(3);
  const [wishlistedIds, setWishlistedIds] = useState(['prod-1', 'prod-3']);
  const [toastMessage, setToastMessage] = useState(null);

  // Dynamic total items in cart
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  // Sync hash routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#home') {
        setCurrentView('home');
      } else if (hash === '#shop' || hash === '#shop-page') {
        setCurrentView('shop');
      } else if (hash === '#cart') {
        setCurrentView('cart');
      } else if (hash === '#checkout') {
        setCurrentView('checkout');
      } else if (hash === '#about') {
        setCurrentView('about');
      } else if (hash === '#contact') {
        setCurrentView('contact');
      } else if (hash.startsWith('#product')) {
        setCurrentView('product-detail');
        const match = window.location.hash.match(/#product-?([a-zA-Z0-9_-]+)?/);
        if (match && match[1]) {
          setSelectedProductId(match[1]);
        }
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (view) => {
    setCurrentView(view);
    if (view === 'home') {
      window.location.hash = '#home';
    } else if (view === 'shop') {
      window.location.hash = '#shop';
    } else if (view === 'cart') {
      window.location.hash = '#cart';
    } else if (view === 'checkout') {
      window.location.hash = '#checkout';
    } else if (view === 'about') {
      window.location.hash = '#about';
    } else if (view === 'contact') {
      window.location.hash = '#contact';
    } else if (view === 'product-detail') {
      window.location.hash = `#product-${selectedProductId}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentView('product-detail');
    window.location.hash = `#product-${productId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Add to cart with duplicate merging and size awareness
  const handleAddToCart = (product) => {
    const qtyToAdd = product.quantity || 1;
    const sizeToUse = product.selectedSize || product.sizeCode || 'Standard';

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product.id && (item.selectedSize === sizeToUse || !item.selectedSize)
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: (updated[existingIndex].quantity || 1) + qtyToAdd
        };
        return updated;
      } else {
        const newItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: qtyToAdd,
          selectedSize: sizeToUse,
          image: product.image
        };
        return [newItem, ...prevItems];
      }
    });

    showToast(`Added "${product.name}" to Sacred Seva Bag`);
  };

  // Update item quantity
  const handleUpdateCartQuantity = (productId, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove item from cart
  const handleRemoveCartItem = (productId) => {
    setCartItems((prev) => {
      const removed = prev.find((item) => item.id === productId);
      if (removed) {
        showToast(`Removed "${removed.name}" from cart`);
      }
      return prev.filter((item) => item.id !== productId);
    });
  };

  const handleToggleWishlist = (product, isNowWishlisted) => {
    if (isNowWishlisted) {
      setWishlistedIds((prev) => [...prev, product.id]);
      setWishlistCount((prev) => prev + 1);
      showToast('Saved to Sacred Wishlist');
    } else {
      setWishlistedIds((prev) => prev.filter((id) => id !== product.id));
      setWishlistCount((prev) => Math.max(0, prev - 1));
      showToast('Removed from Sacred Wishlist');
    }
  };

  const handleCategorySelect = () => {
    handleNavigate('shop');
  };

  return (
    <div className="snc-app">
      {/* Devotional Premium Responsive Navbar (Royal Maroon & Gold) */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCart={() => handleNavigate('cart')}
        wishlistCount={wishlistCount}
        cartCount={cartCount}
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="snc-main">
        {currentView === 'contact' ? (
          /* Contact Us Page strictly following approved Figma design */
          <ContactPage onShowToast={showToast} />
        ) : currentView === 'about' ? (
          /* About Us Page strictly following approved Figma design */
          <AboutPage onExploreShop={() => handleNavigate('shop')} />
        ) : currentView === 'checkout' ? (
          /* Checkout Page strictly following approved Figma design */
          <CheckoutPage
            cartItems={cartItems}
            onNavigate={handleNavigate}
            onClearCart={() => setCartItems([])}
            onShowToast={showToast}
          />
        ) : currentView === 'cart' ? (
          /* Cart Page strictly following approved Figma design */
          <CartPage
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onNavigate={handleNavigate}
            onViewProduct={handleViewProduct}
            onShowToast={showToast}
          />
        ) : currentView === 'product-detail' ? (
          /* Product Details Page strictly following approved Figma design */
          <ProductDetailPage
            key={selectedProductId}
            productId={selectedProductId}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistedIds={wishlistedIds}
            onNavigate={handleNavigate}
            onSelectProduct={handleViewProduct}
          />
        ) : currentView === 'shop' ? (
          /* Shop / All Products Page matching Figma reference */
          <ShopPage
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistedIds={wishlistedIds}
            onViewProduct={handleViewProduct}
          />
        ) : (
          /* Full Homepage Sections preserved */
          <>
            {/* 1. Cinematic Hero Section (Royal Maroon & Sacred Altar) */}
            <Hero
              onShopClick={() => handleNavigate('shop')}
              onCatalogClick={() => {
                const el = document.getElementById('categories');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 2. Shop by Category (Warm Ivory with 6 Circular Category Images) */}
            <Categories onCategorySelect={handleCategorySelect} />

            {/* 3. Featured Collection (Warm Ivory with 4 Real Products Per Row) */}
            <FeaturedProducts
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistedIds={wishlistedIds}
              onViewAll={() => handleNavigate('shop')}
              onViewProduct={handleViewProduct}
            />

            {/* 4. Festival Collection Promotional Banner (Royal Maroon & Gold) */}
            <FestivalBanner
              onExplore={() => handleNavigate('shop')}
            />
          </>
        )}
      </main>

      {/* 6. Clean, Elegant Footer (Warm Ivory & Royal Maroon Details) */}
      <Footer />

      {/* Devotional Interactive Toast Notification */}
      {toastMessage && (
        <div className="snc-toast" role="status" aria-live="polite">
          <span className="snc-toast-bullet">✦</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Interactive Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      {/* Sacred Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
