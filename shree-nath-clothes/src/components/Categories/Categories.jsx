import CategoryCard from './CategoryCard';
import './Categories.css';

const CATEGORIES_DATA = [
  {
    id: 'poshak',
    title: 'Poshak',
    subtitle: 'Designer Poshak for Laddu Gopal',
    image: '/assets/images/categories/poshak.jpg'
  },
  {
    id: 'mukut',
    title: 'Mukut',
    subtitle: 'Mukut, Mor Pankh & Mathapatti',
    image: '/assets/images/categories/mukut.jpg'
  },
  {
    id: 'jewellery',
    title: 'Jewellery',
    subtitle: 'Haar, Kundal & Shringar Sets',
    image: '/assets/images/categories/jewellery.jpg'
  },
  {
    id: 'accessories',
    title: 'Accessories',
    subtitle: 'Bansuri, Chaur, Pagdi etc.',
    image: '/assets/images/categories/accessories.jpg'
  },
  {
    id: 'seasonal',
    title: 'Seasonal Collection',
    subtitle: 'Festive & Special Occasions',
    image: '/assets/images/categories/seasonal.jpg'
  },
  {
    id: 'complete-sets',
    title: 'Complete Sets',
    subtitle: 'Poshak + Mukut + Shringar',
    image: '/assets/images/categories/complete-sets.jpg'
  }
];

export default function Categories({ onCategorySelect }) {
  return (
    <section className="snc-categories-ivory-section" id="categories">
      <div className="snc-categories-container">
        
        {/* Section Header Matching UI Reference */}
        <div className="snc-categories-header">
          <div className="snc-cat-divider-wrapper" aria-hidden="true">
            <img
              src="/assets/decor/ornamental-divider.svg"
              alt=""
              className="snc-ornamental-divider-img"
            />
          </div>

          <h2 className="snc-categories-title">
            Shop by Category
          </h2>
        </div>

        {/* Six Circular Category Items in a Row */}
        <div className="snc-categories-row">
          {CATEGORIES_DATA.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onSelect={onCategorySelect}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
