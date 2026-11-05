import { useState } from 'react';
import {
  MapPin,
  Send,
  CheckCircle2,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import contactHero from '../../../public/assets/images/Contact/image.png?url';
import './ContactPage.css';

export default function ContactPage({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your mobile number';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
    } else if (formData.message.trim().length < 8) {
      newErrors.message = 'Message must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      if (onShowToast) onShowToast('Please fill all required fields correctly');
      return;
    }

    setIsSubmitting(true);
    if (onShowToast) onShowToast('Sending your devotional message...');

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      if (onShowToast) {
        onShowToast('Message received! Our Seva team will contact you shortly.');
      }
    }, 1200);
  };

  return (
    <div className="snc-contact-page">
      
      {/* ====================================================================
          1. HERO BANNER: "Get in Touch" matching Figma
          ==================================================================== */}
      <section className="snc-contact-hero" aria-labelledby="snc-contact-title">
        <h1 className="snc-contact-accessible" id="snc-contact-title">Get in Touch ? We are here to help you</h1>
        <img src={contactHero} alt="Laddu Gopal adorned with jewellery in a golden temple altar" className="snc-contact-hero__img" fetchPriority="high" decoding="async" />
      </section>  {/* ====================================================================
          2. TWO-COLUMN CONTACT SECTION matching Figma
          ==================================================================== */}
      <div className="snc-contact-container">
        <div className="snc-contact-grid">
          
          {/* ------------------------------------------------------------------
              LEFT COLUMN: Contact Information matching Figma
              ------------------------------------------------------------------ */}
          <div className="snc-contact-info-col"><p className="snc-contact-eyebrow">LET?S CONNECT</p>
            
            {/* 1. Our Address */}
            <div className="snc-contact-block">
              <h2 className="snc-contact-block__title">Our Address</h2>
              <address className="snc-contact-block__text">
                Vrindavan, Mathura<br />
                Uttar Pradesh - 281121
              </address>
            </div>

            {/* 2. Phone */}
            <div className="snc-contact-block">
              <h2 className="snc-contact-block__title">Phone</h2>
              <a
                href="tel:+919876543210"
                className="snc-contact-link snc-contact-phone"
                aria-label="Call +91 98765 43210"
              >
                +91 98765 43210
              </a>
            </div>

            {/* 3. Email */}
            <div className="snc-contact-block">
              <h2 className="snc-contact-block__title">Email</h2>
              <a
                href="mailto:shreenathclothes@gmail.com"
                className="snc-contact-link snc-contact-email"
                aria-label="Email shreenathclothes@gmail.com"
              >
                shreenathclothes@gmail.com
              </a>
            </div>

            {/* 4. Follow Us (Social Media Icons matching Figma) */}
            <div className="snc-contact-block">
              <h2 className="snc-contact-block__title">Follow Us</h2>
              <div className="snc-contact-socials-row" aria-label="Social media profiles">
                {/* Facebook */}
                <a
                  href="#facebook"
                  className="snc-contact-social-btn"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="#instagram"
                  className="snc-contact-social-btn"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="#youtube"
                  className="snc-contact-social-btn"
                  aria-label="YouTube"
                  title="YouTube"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" fill="none" stroke="currentColor" strokeWidth="2"></path>
                  </svg>
                </a>

                {/* Pinterest / Devotional */}
                <a
                  href="#pinterest"
                  className="snc-contact-social-btn"
                  aria-label="Pinterest"
                  title="Pinterest"
                >
                  <span style={{ fontSize: '13px', fontWeight: 'bold' }}>P</span>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="snc-contact-social-btn snc-contact-social-btn--wa"
                  aria-label="WhatsApp Chat"
                  title="Chat on WhatsApp"
                >
                  <MessageCircle size={16} />
                </a>
              </div>
            </div>

            {/* 5. Google Maps Location Section (Requirement 5) */}
            <div className="snc-contact-map-card">
              <div className="snc-map-header">
                <MapPin size={16} className="snc-map-pin-icon" />
                <span>Vrindavan Dham Seva Kendra</span>
              </div>
              <div className="snc-map-placeholder-box">
                <div className="snc-map-art-bg" aria-hidden="true">
                  <div className="snc-map-grid-lines" />
                  <div className="snc-map-pulse-marker">
                    <span className="snc-pulse-ring" />
                    <MapPin size={24} className="snc-pulse-pin" />
                  </div>
                </div>
                <div className="snc-map-caption">
                  <p>Vrindavan, Mathura, Uttar Pradesh - 281121</p>
                  <a
                    href="https://maps.google.com/?q=Vrindavan,+Mathura,+Uttar+Pradesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="snc-map-ext-link"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* ------------------------------------------------------------------
              RIGHT COLUMN: Send us a Message Form matching Figma
              ------------------------------------------------------------------ */}
          <div className="snc-contact-form-col">
            <div className="snc-contact-form-card">
              <h2 className="snc-form-card__title">Send us a Message</h2><p className="snc-contact-form-intro">Have a question about poshak, sizing or your order? We?re here to help.</p>

              {isSubmitted ? (
                <div className="snc-contact-success-state" role="alert">
                  <div className="snc-success-icon-wrap">
                    <CheckCircle2 size={36} className="snc-success-check" />
                  </div>
                  <h3 className="snc-success-title">Message Received!</h3>
                  <p className="snc-success-desc">
                    Jai Shree Krishna! Thank you for contacting Shree Nath Clothes.
                    Our sacred seva team will review your inquiry and reach out to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    className="snc-btn-send-another"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Name */}
                  <div className="snc-form-group">
                    <label htmlFor="contact-name" className="snc-form-label">
                      Name <span className="snc-required">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      required
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      type="text"
                      className={`snc-form-input ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    {errors.name && <span id="contact-name-error" className="snc-form-error" role="alert">{errors.name}</span>}
                  </div>

                  {/* Email */}
                  <div className="snc-form-group">
                    <label htmlFor="contact-email" className="snc-form-label">
                      Email <span className="snc-required">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      autoComplete="email"
                      required
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      type="email"
                      className={`snc-form-input ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                    {errors.email && <span id="contact-email-error" className="snc-form-error" role="alert">{errors.email}</span>}
                  </div>

                  {/* Phone */}
                  <div className="snc-form-group">
                    <label htmlFor="contact-phone" className="snc-form-label">
                      Phone <span className="snc-required">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      autoComplete="tel"
                      required
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                      type="tel"
                      maxLength={10}
                      className={`snc-form-input ${errors.phone ? 'is-invalid' : ''}`}
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                    {errors.phone && <span id="contact-phone-error" className="snc-form-error" role="alert">{errors.phone}</span>}
                  </div>

                  {/* Message */}
                  <div className="snc-form-group">
                    <label htmlFor="contact-message" className="snc-form-label">
                      Message <span className="snc-required">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      autoComplete="off"
                      required
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      rows={5}
                      className={`snc-form-textarea ${errors.message ? 'is-invalid' : ''}`}
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                    />
                    {errors.message && <span id="contact-message-error" className="snc-form-error" role="alert">{errors.message}</span>}
                  </div>

                  {/* Send Message Button matching Figma */}
                  <button
                    type="submit"
                    className={`snc-btn-send-message ${isSubmitting ? 'is-submitting' : ''}`}
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                    <Send size={15} />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>


      </div>

    </div>
  );
}
