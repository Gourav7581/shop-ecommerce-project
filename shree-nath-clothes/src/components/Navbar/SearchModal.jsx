import { useState } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import './SearchModal.css';

const TRENDING_SEARCHES = [
  'Royal Zardozi Poshaak',
  'Laddu Gopal Size 4 Velvet Set',
  'Peacock Feather Mukut',
  'Pure Silver Bansuri',
  'Pitambari Silk Robe',
  'Winter Mala & Kundal'
];

export default function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  return (
    <div className="snc-search-modal" role="dialog" aria-modal="true">
      <div className="snc-search-modal__backdrop" onClick={onClose}></div>
      <div className="snc-search-modal__dialog">
        <div className="snc-search-modal__header">
          <div className="snc-search-input-wrapper">
            <Search size={22} className="snc-search-input__icon" />
            <input
              type="text"
              autoFocus
              className="snc-search-input"
              placeholder="Search zardozi poshaak, mor pankh mukut, bansuri, velvet sets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="snc-search-input__clear" onClick={() => setSearchTerm('')}>
                <X size={16} />
              </button>
            )}
          </div>
          <button className="snc-search-modal__close-btn" onClick={onClose} aria-label="Close search">
            <X size={24} />
          </button>
        </div>

        <div className="snc-search-modal__body">
          <div className="snc-trending">
            <div className="snc-trending__title">
              <Sparkles size={14} className="snc-gold-icon" />
              <span>Devotional Trending Searches</span>
            </div>
            <div className="snc-trending__tags">
              {TRENDING_SEARCHES.map((tag, idx) => (
                <button
                  key={idx}
                  className="snc-trending__tag"
                  onClick={() => setSearchTerm(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="snc-search-tips">
            <p>✦ Tip: You can filter by deity size, e.g. "Size 2" or "Size 5", or by fabric like "Velvet", "Banarasi Silk".</p>
          </div>
        </div>
      </div>
    </div>
  );
}
