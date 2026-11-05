import { useState, useMemo } from 'react';
import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Smartphone,
  Building2,
  Truck,
  Sparkles,
  Lock
} from 'lucide-react';
import './CheckoutPage.css';

const INDIAN_STATES = [
  'Rajasthan',
  'Uttar Pradesh',
  'Gujarat',
  'Maharashtra',
  'Delhi',
  'Madhya Pradesh',
  'Haryana',
  'Punjab',
  'Karnataka',
  'West Bengal',
  'Tamil Nadu',
  'Telangana',
  'Bihar',
  'Odisha',
  'Uttarakhand',
  'Himachal Pradesh'
];

export default function CheckoutPage({
  cartItems = [],
  onNavigate,
  onClearCart,
  onShowToast
}) {
  // Stepper state: 1: Shipping Address, 2: Payment Method, 3: Order Review
  const [currentStep, setCurrentStep] = useState(1);

  // Form Fields State
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    saveAddress: true
  });

  // Form Validation Errors State
  const [errors, setErrors] = useState({});

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'cod'
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  // Order Placement & Success State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  // Financial calculations matching Figma
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  }, [cartItems]);

  const shipping = subtotal > 0 ? 100 : 0;
  const total = subtotal + shipping;

  // Handle Input Changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Form Validation Logic
  const validateShippingForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter a valid full name';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile Number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'House No., Street & Locality is required';
    } else if (formData.address.trim().length < 6) {
      newErrors.address = 'Please provide complete address details';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state) {
      newErrors.state = 'Please select your state';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode.replace(/\D/g, ''))) {
      newErrors.pincode = 'Please enter a valid 6-digit Pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Step 1 -> Move to Step 2
  const handleContinueToPayment = (e) => {
    e.preventDefault();
    if (validateShippingForm()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (onShowToast) onShowToast('Please fill all required shipping fields correctly');
    }
  };

  // Submit Step 2 -> Move to Step 3
  const handleContinueToReview = (e) => {
    e.preventDefault();
    if (paymentMethod === 'upi' && upiId && !upiId.includes('@')) {
      if (onShowToast) onShowToast('Please enter a valid UPI ID (e.g. name@okhdfcbank)');
      return;
    }
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Place Final Order in Step 3
  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    if (onShowToast) onShowToast('Consecrating and confirming your sacred seva order...');

    setTimeout(() => {
      const orderId = `SNC-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderData = {
        orderId,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        items: [...cartItems],
        total,
        shippingAddress: { ...formData },
        paymentMethod
      };
      setOrderConfirmed(orderData);
      setIsSubmitting(false);

      if (onClearCart) onClearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1400);
  };

  return (
    <div className="snc-checkout-page">
      <div className="snc-checkout-container">
        
        {/* ====================================================================
            1. TOP PROGRESS STEPPER (1. Shipping Address -> 2. Payment Method -> 3. Order Review)
            ==================================================================== */}
        <div className="snc-stepper" aria-label="Checkout Progress">
          {/* Step 1 */}
          <div
            className={`snc-step-item ${currentStep === 1 ? 'is-active' : ''} ${currentStep > 1 ? 'is-completed' : ''}`}
            onClick={() => currentStep > 1 && setCurrentStep(1)}
          >
            <div className="snc-step-circle">
              {currentStep > 1 ? <CheckCircle2 size={16} /> : '1'}
            </div>
            <span className="snc-step-label">Shipping Address</span>
          </div>

          <div className={`snc-step-divider ${currentStep > 1 ? 'is-completed' : ''}`} />

          {/* Step 2 */}
          <div
            className={`snc-step-item ${currentStep === 2 ? 'is-active' : ''} ${currentStep > 2 ? 'is-completed' : ''}`}
            onClick={() => {
              if (validateShippingForm()) setCurrentStep(2);
            }}
          >
            <div className="snc-step-circle">
              {currentStep > 2 ? <CheckCircle2 size={16} /> : '2'}
            </div>
            <span className="snc-step-label">Payment Method</span>
          </div>

          <div className={`snc-step-divider ${currentStep > 2 ? 'is-completed' : ''}`} />

          {/* Step 3 */}
          <div className={`snc-step-item ${currentStep === 3 ? 'is-active' : ''}`}>
            <div className="snc-step-circle">3</div>
            <span className="snc-step-label">Order Review</span>
          </div>
        </div>

        {/* ====================================================================
            2. ORDER CONFIRMED SCREEN (Celebratory Devotional Modal)
            ==================================================================== */}
        {orderConfirmed ? (
          <div className="snc-order-confirmed-card" role="region" aria-live="polite">
            <div className="snc-confirmed-header">
              <div className="snc-confirmed-icon-aura">
                <Sparkles size={36} className="snc-gold-sparkle" />
              </div>
              <span className="snc-confirmed-shloka">✦ ॐ नमो भगवते वासुदेवाय ✦</span>
              <h2 className="snc-confirmed-title">Sacred Order Confirmed!</h2>
              <p className="snc-confirmed-subtitle">
                Jai Shree Krishna! Your Thakur Ji Seva order has been sanctified and placed successfully.
              </p>
            </div>

            <div className="snc-confirmed-details-box">
              <div className="snc-confirmed-detail-row">
                <span className="snc-conf-label">Order Number:</span>
                <span className="snc-conf-val snc-conf-order-id">{orderConfirmed.orderId}</span>
              </div>
              <div className="snc-confirmed-detail-row">
                <span className="snc-conf-label">Order Date:</span>
                <span className="snc-conf-val">{orderConfirmed.date}</span>
              </div>
              <div className="snc-confirmed-detail-row">
                <span className="snc-conf-label">Delivering To:</span>
                <span className="snc-conf-val">
                  {orderConfirmed.shippingAddress.fullName}, {orderConfirmed.shippingAddress.city}, {orderConfirmed.shippingAddress.state} - {orderConfirmed.shippingAddress.pincode}
                </span>
              </div>
              <div className="snc-confirmed-detail-row">
                <span className="snc-conf-label">Payment Method:</span>
                <span className="snc-conf-val" style={{ textTransform: 'uppercase' }}>
                  {orderConfirmed.paymentMethod === 'cod' ? 'Cash on Delivery (Sacred Seva)' : orderConfirmed.paymentMethod}
                </span>
              </div>
              <div className="snc-confirmed-detail-row snc-conf-total-row">
                <span className="snc-conf-label">Grand Total:</span>
                <span className="snc-conf-val snc-conf-total-val">₹ {orderConfirmed.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="snc-confirmed-blessing-box">
              <ShieldCheck size={20} className="snc-bless-icon" />
              <p>
                Each poshaak and mukut is packaged in our sanctified temple gift box with chandan and holy Vrindavan itra.
              </p>
            </div>

            <div className="snc-confirmed-actions">
              <button
                type="button"
                className="snc-btn-confirmed-shop"
                onClick={() => onNavigate && onNavigate('shop')}
              >
                Continue Devotional Shopping
              </button>
              <button
                type="button"
                className="snc-btn-confirmed-home"
                onClick={() => onNavigate && onNavigate('home')}
              >
                Return to Home
              </button>
            </div>
          </div>
        ) : (
          /* ====================================================================
             3. MAIN TWO-COLUMN CHECKOUT GRID
             ==================================================================== */
          <div className="snc-checkout-grid">
            
            {/* ------------------------------------------------------------------
                LEFT COLUMN: FORM STEPS matching Figma
                ------------------------------------------------------------------ */}
            <div className="snc-checkout-left-col">
              
              {/* STEP 1: SHIPPING ADDRESS FORM matching Figma */}
              {currentStep === 1 && (
                <div className="snc-checkout-card">
                  <h2 className="snc-checkout-heading">Shipping Address</h2>

                  <form onSubmit={handleContinueToPayment} noValidate>
                    {/* Full Name */}
                    <div className="snc-form-group">
                      <label htmlFor="fullName" className="snc-form-label">
                        Full Name <span className="snc-required">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        className={`snc-form-input ${errors.fullName ? 'is-invalid' : ''}`}
                        placeholder="Enter your name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                      />
                      {errors.fullName && <span className="snc-form-error">{errors.fullName}</span>}
                    </div>

                    {/* Mobile Number */}
                    <div className="snc-form-group">
                      <label htmlFor="mobileNumber" className="snc-form-label">
                        Mobile Number <span className="snc-required">*</span>
                      </label>
                      <input
                        id="mobileNumber"
                        type="tel"
                        maxLength={10}
                        className={`snc-form-input ${errors.mobileNumber ? 'is-invalid' : ''}`}
                        placeholder="Enter mobile number"
                        value={formData.mobileNumber}
                        onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                      />
                      {errors.mobileNumber && <span className="snc-form-error">{errors.mobileNumber}</span>}
                    </div>

                    {/* Address (Multi-line) */}
                    <div className="snc-form-group">
                      <label htmlFor="address" className="snc-form-label">
                        Address <span className="snc-required">*</span>
                      </label>
                      <textarea
                        id="address"
                        rows={3}
                        className={`snc-form-textarea ${errors.address ? 'is-invalid' : ''}`}
                        placeholder="House No., Street, Locality"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                      />
                      {errors.address && <span className="snc-form-error">{errors.address}</span>}
                    </div>

                    {/* Two-Column Row: City & State */}
                    <div className="snc-form-row">
                      <div className="snc-form-group snc-form-col">
                        <label htmlFor="city" className="snc-form-label">
                          City <span className="snc-required">*</span>
                        </label>
                        <input
                          id="city"
                          type="text"
                          className={`snc-form-input ${errors.city ? 'is-invalid' : ''}`}
                          placeholder="Enter city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                        />
                        {errors.city && <span className="snc-form-error">{errors.city}</span>}
                      </div>

                      <div className="snc-form-group snc-form-col">
                        <label htmlFor="state" className="snc-form-label">
                          State <span className="snc-required">*</span>
                        </label>
                        <select
                          id="state"
                          className={`snc-form-select ${errors.state ? 'is-invalid' : ''}`}
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                        >
                          <option value="">Select state</option>
                          {INDIAN_STATES.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                        {errors.state && <span className="snc-form-error">{errors.state}</span>}
                      </div>
                    </div>

                    {/* Pincode Row */}
                    <div className="snc-form-row">
                      <div className="snc-form-group snc-form-col">
                        <label htmlFor="pincode" className="snc-form-label">
                          Pincode <span className="snc-required">*</span>
                        </label>
                        <input
                          id="pincode"
                          type="text"
                          maxLength={6}
                          className={`snc-form-input ${errors.pincode ? 'is-invalid' : ''}`}
                          placeholder="Enter pincode"
                          value={formData.pincode}
                          onChange={(e) => handleInputChange('pincode', e.target.value)}
                        />
                        {errors.pincode && <span className="snc-form-error">{errors.pincode}</span>}
                      </div>
                      <div className="snc-form-group snc-form-col snc-form-col--blank" />
                    </div>

                    {/* Checkbox matching Figma: Save this address for next time */}
                    <div className="snc-form-checkbox-wrap">
                      <label className="snc-checkbox-label">
                        <input
                          type="checkbox"
                          className="snc-custom-checkbox"
                          checked={formData.saveAddress}
                          onChange={(e) => handleInputChange('saveAddress', e.target.checked)}
                        />
                        <span>Save this address for next time</span>
                      </label>
                    </div>

                    {/* CTA Button: Continue to Payment matching Figma */}
                    <button type="submit" className="snc-btn-checkout-cta">
                      <span>Continue to Payment</span>
                      <ArrowRight size={16} />
                    </button>

                    {/* Return to Cart option */}
                    <div className="snc-checkout-return-wrap">
                      <button
                        type="button"
                        className="snc-return-link"
                        onClick={() => onNavigate && onNavigate('cart')}
                      >
                        <ArrowLeft size={14} />
                        <span>Or return to Cart</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* STEP 2: PAYMENT METHOD SELECTION */}
              {currentStep === 2 && (
                <div className="snc-checkout-card">
                  <h2 className="snc-checkout-heading">Payment Method</h2>
                  <p className="snc-checkout-subdesc">
                    All transactions are sacred, encrypted and 100% secure.
                  </p>

                  <form onSubmit={handleContinueToReview}>
                    <div className="snc-payment-options">
                      
                      {/* 1. UPI */}
                      <label className={`snc-payment-card ${paymentMethod === 'upi' ? 'is-selected' : ''}`}>
                        <div className="snc-payment-radio-row">
                          <input
                            type="radio"
                            name="payment"
                            value="upi"
                            checked={paymentMethod === 'upi'}
                            onChange={() => setPaymentMethod('upi')}
                          />
                          <Smartphone size={20} className="snc-payment-icon" />
                          <div className="snc-payment-text">
                            <strong>UPI (Google Pay, PhonePe, Paytm, BHIM)</strong>
                            <span>Instant, seamless and 0% transaction fee</span>
                          </div>
                        </div>
                        {paymentMethod === 'upi' && (
                          <div className="snc-payment-subbox">
                            <input
                              type="text"
                              className="snc-form-input"
                              placeholder="Enter your UPI ID (e.g. mobile@upi)"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                            />
                            <span className="snc-subbox-note">
                              ✦ Or scan QR code on the review page
                            </span>
                          </div>
                        )}
                      </label>

                      {/* 2. Credit / Debit Cards */}
                      <label className={`snc-payment-card ${paymentMethod === 'card' ? 'is-selected' : ''}`}>
                        <div className="snc-payment-radio-row">
                          <input
                            type="radio"
                            name="payment"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                          />
                          <CreditCard size={20} className="snc-payment-icon" />
                          <div className="snc-payment-text">
                            <strong>Credit / Debit Card</strong>
                            <span>Visa, MasterCard, RuPay, Maestro</span>
                          </div>
                        </div>
                        {paymentMethod === 'card' && (
                          <div className="snc-payment-subbox">
                            <input
                              type="text"
                              className="snc-form-input"
                              placeholder="Card Number (16 digits)"
                              maxLength={19}
                              value={cardDetails.number}
                              onChange={(e) =>
                                setCardDetails({ ...cardDetails, number: e.target.value })
                              }
                            />
                            <div className="snc-form-row" style={{ marginTop: '10px' }}>
                              <input
                                type="text"
                                className="snc-form-input"
                                placeholder="MM/YY"
                                maxLength={5}
                                value={cardDetails.expiry}
                                onChange={(e) =>
                                  setCardDetails({ ...cardDetails, expiry: e.target.value })
                                }
                              />
                              <input
                                type="password"
                                className="snc-form-input"
                                placeholder="CVV"
                                maxLength={4}
                                value={cardDetails.cvv}
                                onChange={(e) =>
                                  setCardDetails({ ...cardDetails, cvv: e.target.value })
                                }
                              />
                            </div>
                          </div>
                        )}
                      </label>

                      {/* 3. Net Banking */}
                      <label className={`snc-payment-card ${paymentMethod === 'netbanking' ? 'is-selected' : ''}`}>
                        <div className="snc-payment-radio-row">
                          <input
                            type="radio"
                            name="payment"
                            value="netbanking"
                            checked={paymentMethod === 'netbanking'}
                            onChange={() => setPaymentMethod('netbanking')}
                          />
                          <Building2 size={20} className="snc-payment-icon" />
                          <div className="snc-payment-text">
                            <strong>Net Banking</strong>
                            <span>SBI, HDFC, ICICI, Axis, PNB and 50+ Banks</span>
                          </div>
                        </div>
                      </label>

                      {/* 4. Cash on Delivery */}
                      <label className={`snc-payment-card ${paymentMethod === 'cod' ? 'is-selected' : ''}`}>
                        <div className="snc-payment-radio-row">
                          <input
                            type="radio"
                            name="payment"
                            value="cod"
                            checked={paymentMethod === 'cod'}
                            onChange={() => setPaymentMethod('cod')}
                          />
                          <Truck size={20} className="snc-payment-icon" />
                          <div className="snc-payment-text">
                            <strong>Cash on Delivery (Sacred Seva)</strong>
                            <span>Pay with reverence when Thakur Ji vastra arrives</span>
                          </div>
                        </div>
                      </label>
                    </div>

                    <div className="snc-step-actions-row">
                      <button
                        type="button"
                        className="snc-btn-step-back"
                        onClick={() => setCurrentStep(1)}
                      >
                        <ArrowLeft size={14} />
                        <span>Back to Address</span>
                      </button>

                      <button type="submit" className="snc-btn-checkout-cta snc-btn-cta--flex">
                        <span>Continue to Order Review</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* STEP 3: ORDER REVIEW */}
              {currentStep === 3 && (
                <div className="snc-checkout-card">
                  <h2 className="snc-checkout-heading">Review & Confirm Order</h2>
                  <p className="snc-checkout-subdesc">
                    Please verify your shipping and seva details before placing your order.
                  </p>

                  <div className="snc-review-blocks">
                    {/* Destination Address Review */}
                    <div className="snc-review-box">
                      <div className="snc-review-box-header">
                        <h4>Shipping Destination</h4>
                        <button
                          type="button"
                          className="snc-edit-step-btn"
                          onClick={() => setCurrentStep(1)}
                        >
                          Edit
                        </button>
                      </div>
                      <p className="snc-review-recipient">
                        <strong>{formData.fullName}</strong> ({formData.mobileNumber})
                      </p>
                      <p className="snc-review-address">
                        {formData.address}, {formData.city}, {formData.state} - {formData.pincode}
                      </p>
                    </div>

                    {/* Payment Method Review */}
                    <div className="snc-review-box">
                      <div className="snc-review-box-header">
                        <h4>Payment Selection</h4>
                        <button
                          type="button"
                          className="snc-edit-step-btn"
                          onClick={() => setCurrentStep(2)}
                        >
                          Edit
                        </button>
                      </div>
                      <p className="snc-review-method">
                        {paymentMethod === 'upi' && 'UPI (Instant Devotional Payment)'}
                        {paymentMethod === 'card' && 'Credit / Debit Card'}
                        {paymentMethod === 'netbanking' && 'Net Banking (All Indian Banks)'}
                        {paymentMethod === 'cod' && 'Cash on Delivery (Sacred Seva)'}
                      </p>
                    </div>
                  </div>

                  <div className="snc-step-actions-row">
                    <button
                      type="button"
                      className="snc-btn-step-back"
                      onClick={() => setCurrentStep(2)}
                      disabled={isSubmitting}
                    >
                      <ArrowLeft size={14} />
                      <span>Back to Payment</span>
                    </button>

                    <button
                      type="button"
                      className={`snc-btn-checkout-cta snc-btn-cta--flex ${isSubmitting ? 'is-loading' : ''}`}
                      onClick={handlePlaceOrder}
                      disabled={isSubmitting}
                    >
                      <Lock size={15} />
                      <span>{isSubmitting ? 'Placing Order...' : 'Place Sacred Order'}</span>
                      <Sparkles size={16} />
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* ------------------------------------------------------------------
                RIGHT COLUMN: ORDER SUMMARY matching Figma
                ------------------------------------------------------------------ */}
            <aside className="snc-checkout-right-col" aria-label="Order Summary">
              <div className="snc-checkout-summary-card">
                
                {/* Heading */}
                <h2 className="snc-summary-title">Order Summary</h2>

                {/* Products List matching Figma */}
                <div className="snc-summary-products-list">
                  {cartItems.map((item) => {
                    const itemQty = item.quantity || 1;
                    const itemTotal = item.price * itemQty;

                    return (
                      <div
                        key={`${item.id}-${item.selectedSize || 'def'}`}
                        className="snc-summary-prod-item"
                      >
                        {/* Thumbnail */}
                        <div className="snc-summary-prod-img-box">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="snc-summary-prod-img"
                            loading="lazy"
                          />
                        </div>

                        {/* Title & Price/Qty */}
                        <div className="snc-summary-prod-meta">
                          <h4 className="snc-summary-prod-name" title={item.name}>
                            {item.name}
                          </h4>
                          <span className="snc-summary-prod-sub">
                            ₹ {item.price.toLocaleString('en-IN')}
                            {itemQty > 1 ? ` × ${itemQty}` : ''}
                          </span>
                        </div>

                        {/* Total */}
                        <div className="snc-summary-prod-total">
                          ₹ {itemTotal.toLocaleString('en-IN')}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Financial Breakdown matching Figma */}
                <div className="snc-summary-breakdown">
                  <div className="snc-breakdown-row">
                    <span className="snc-breakdown-label">Subtotal</span>
                    <span className="snc-breakdown-val">₹ {subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="snc-breakdown-row">
                    <span className="snc-breakdown-label">Shipping</span>
                    <span className="snc-breakdown-val">₹ {shipping.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="snc-breakdown-divider" />

                  <div className="snc-breakdown-row snc-breakdown-row--total">
                    <span className="snc-breakdown-total-label">Total</span>
                    <span className="snc-breakdown-total-val">₹ {total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* 100% Secure Checkout Trust Box matching Figma */}
                <div className="snc-checkout-trust-box">
                  <div className="snc-trust-badge">
                    <ShieldCheck size={20} className="snc-trust-icon" />
                    <div>
                      <strong className="snc-trust-title">100% Secure Checkout</strong>
                      <p className="snc-trust-sub">Your information is safe with us.</p>
                    </div>
                  </div>
                </div>

                {/* Payment Provider Badges matching Figma: VISA, Mastercard, UPI, RuPay */}
                <div className="snc-payment-badges-row" aria-label="Accepted Payment Gateways">
                  <span className="snc-pay-badge snc-pay-badge--visa">VISA</span>
                  <span className="snc-pay-badge snc-pay-badge--mc">
                    <span className="snc-mc-circle snc-mc-circle--red" />
                    <span className="snc-mc-circle snc-mc-circle--orange" />
                  </span>
                  <span className="snc-pay-badge snc-pay-badge--upi">
                    <span className="snc-upi-orange">UP</span>
                    <span className="snc-upi-blue">I</span>
                  </span>
                  <span className="snc-pay-badge snc-pay-badge--rupay">RuPay</span>
                </div>

              </div>
            </aside>

          </div>
        )}

      </div>
    </div>
  );
}

