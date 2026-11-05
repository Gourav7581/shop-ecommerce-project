export const SHOP_CATEGORIES = [
  { id: 'all', name: 'All Products', count: 120 },
  { id: 'poshak', name: 'Poshak', count: 43 },
  { id: 'mukut', name: 'Mukut', count: 18 },
  { id: 'jewellery', name: 'Jewellery', count: 24 },
  { id: 'accessories', name: 'Accessories', count: 15 },
  { id: 'seasonal', name: 'Seasonal Collection', count: 12 },
  { id: 'complete-sets', name: 'Complete Sets', count: 8 }
];

export const COLOR_OPTIONS = [
  { id: 'yellow', label: 'Yellow/Gold', hex: '#eab308' },
  { id: 'red', label: 'Red/Maroon', hex: '#dc2626' },
  { id: 'orange', label: 'Orange', hex: '#f97316' },
  { id: 'green', label: 'Green', hex: '#16a34a' },
  { id: 'blue', label: 'Blue', hex: '#2563eb' },
  { id: 'purple', label: 'Purple', hex: '#9333ea' },
  { id: 'pink', label: 'Pink', hex: '#ec4899' },
  { id: 'teal', label: 'Teal', hex: '#0d9488' },
  { id: 'gray', label: 'Silver/Gray', hex: '#9ca3af' },
  { id: 'sky', label: 'Sky Blue', hex: '#38bdf8' }
];

export const PRODUCTS_DATA = [
  {
    id: 'prod-1',
    name: 'Designer Poshak (Yellow)',
    category: 'poshak',
    categoryName: 'Poshak',
    price: 1850,
    originalPrice: 2299,
    badge: 'Popular',
    image: '/assets/images/products/designer-poshak-yellow.jpg',
    deitySize: '0 (Small)',
    sizeCode: '0',
    availableSizes: ['0', '1', '2', '3'],
    colors: ['yellow', 'orange'],
    isPopular: true,
    rating: 5.0,
    reviewsCount: 12,
    shortDescription:
      'Beautiful designer poshak for Laddu Gopal with fine embroidery and premium fabric. Perfect for daily darshan and special occasions.',
    features: [
      'Premium quality fabric',
      'Handcrafted work',
      'Available in multiple sizes',
      'Easy to wear'
    ],
    detailedDescription:
      'This beautiful yellow designer poshak is specially crafted for Laddu Gopal with intricate embroidery and fine detailing. Made with high-quality fabric to ensure comfort and durability. Perfect for daily darshan and festive occasions like Janmashtami, Holi, Diwali and more.',
    gallery: [
      '/assets/images/products/designer-poshak-yellow.jpg',
      '/assets/images/products/designer-poshak-yellow-large.jpg',
      '/assets/images/categories/poshak.jpg',
      '/assets/images/products/mukut-mor-pankh.jpg',
      '/assets/images/products/kundan-jewellery-set.jpg'
    ],
    additionalInfo: {
      Fabric: 'Pure Raw Silk with Zari Embroidery',
      Craftsmanship: 'Hand-embroidered by Vrindavan Artisans',
      'Deity Fit': 'Laddu Gopal Size 0, 1, 2, 3 (2.5" to 5.5")',
      'Care Instructions': 'Gentle dry clean or sacred soft brush seva',
      'Package Includes': '1 Designer Poshak, 1 Matching Patka, 1 Sacred Gift Box',
      Origin: 'Sanctified in Vrindavan Dham'
    },
    reviews: [
      {
        id: 1,
        author: 'Radha Priya Dasi',
        rating: 5,
        date: 'October 2026',
        comment:
          'The yellow poshak looks divine on my Thakur Ji! The embroidery work is breathtaking and the fabric is pure silk. Blessed seva.'
      },
      {
        id: 2,
        author: 'Anand Sharma',
        rating: 5,
        date: 'September 2026',
        comment:
          'Perfect fit for Size 2 Laddu Gopal. The packaging in the sacred gift box made it feel like prasad. Highly recommended!'
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'Kundan Jewellery Set',
    category: 'jewellery',
    categoryName: 'Jewellery',
    price: 1250,
    originalPrice: 1550,
    badge: null,
    image: '/assets/images/products/kundan-jewellery-set.jpg',
    deitySize: '1 (Medium)',
    sizeCode: '1',
    availableSizes: ['0', '1', '2', '3'],
    colors: ['green', 'yellow'],
    isPopular: false,
    rating: 5.0,
    reviewsCount: 8,
    shortDescription:
      'Exquisite Kundan necklace and earring set for Thakur Ji, embellished with faux emeralds and pearls.',
    features: [
      'Authentic Kundan stone setting',
      'Adjustable sacred dori',
      'Lightweight and safe for vigraha',
      'Matches all festive poshaks'
    ],
    detailedDescription:
      'Handcrafted Kundan Shringar set featuring a majestic haar, matching kundals, and tikka designed to bring royal splendor to your Laddu Gopal altar.',
    gallery: [
      '/assets/images/products/kundan-jewellery-set.jpg',
      '/assets/images/categories/jewellery.jpg',
      '/assets/images/products/pearl-jewellery-set.jpg',
      '/assets/images/products/designer-poshak-yellow.jpg',
      '/assets/images/products/mukut-mor-pankh.jpg'
    ],
    additionalInfo: {
      Material: 'Gold-plated Brass with Kundan & Faux Pearls',
      'Deity Fit': 'Universal Fit for Laddu Gopal Sizes 0 to 6',
      'Package Includes': '1 Kundan Haar, 2 Kundal Earrings, 1 Sacred Pouch'
    }
  },
  {
    id: 'prod-3',
    name: 'Silver Work Poshak',
    category: 'poshak',
    categoryName: 'Poshak',
    price: 1400,
    originalPrice: 1750,
    badge: 'Top Pick',
    image: '/assets/images/products/silver-work-poshak.jpg',
    deitySize: '2 (Large)',
    sizeCode: '2',
    availableSizes: ['0', '1', '2', '3'],
    colors: ['gray', 'pink'],
    isPopular: true,
    rating: 4.9,
    reviewsCount: 15,
    shortDescription:
      'Glistening silver zari poshak on soft silk base, ideal for Sharad Purnima and special darshans.',
    features: [
      'Intricate silver gota work',
      'Soft inner lining',
      'Includes matching patka',
      'Long-lasting luster'
    ],
    detailedDescription:
      'Pure devotional artistry in silver threadwork, shimmering gracefully under altar diya light.',
    gallery: [
      '/assets/images/products/silver-work-poshak.jpg',
      '/assets/images/categories/poshak.jpg',
      '/assets/images/products/designer-poshak-yellow.jpg',
      '/assets/images/products/red-velvet-poshak.jpg',
      '/assets/images/products/mukut-mor-pankh.jpg'
    ],
    additionalInfo: {
      Fabric: 'Silver Brocade Silk',
      'Package Includes': '1 Silver Poshak, 1 Silver Patka'
    }
  },
  {
    id: 'prod-4',
    name: 'Mukut with Mor Pankh',
    category: 'mukut',
    categoryName: 'Mukut',
    price: 950,
    originalPrice: 1199,
    badge: 'Artisanal',
    image: '/assets/images/products/mukut-mor-pankh.jpg',
    deitySize: '1 (Medium)',
    sizeCode: '1',
    availableSizes: ['0', '1', '2', '3'],
    colors: ['green', 'teal', 'yellow'],
    isPopular: false,
    rating: 5.0,
    reviewsCount: 19,
    shortDescription:
      'Traditional Mor Pankh Mukut crown handcrafted with real peacock plume accents and zardozi embroidery.',
    features: [
      'Sanctified peacock feather',
      'Zari-threaded crown base',
      'Comfortable fit for Thakur Ji',
      'Temple-grade detailing'
    ],
    detailedDescription:
      'A supreme royal mukut crowned with a sacred Mor Pankh, embodying the eternal grace of Shree Krishna.',
    gallery: [
      '/assets/images/products/mukut-mor-pankh.jpg',
      '/assets/images/products/golden-mukut.jpg',
      '/assets/images/categories/mukut.jpg',
      '/assets/images/products/designer-poshak-yellow.jpg',
      '/assets/images/products/kundan-jewellery-set.jpg'
    ],
    additionalInfo: {
      Material: 'Velvet Base, Zardozi Zari & Natural Mor Pankh',
      'Deity Fit': 'Size 0 to Size 5'
    }
  },
  {
    id: 'prod-5',
    name: 'Shringar Set (Complete)',
    category: 'complete-sets',
    categoryName: 'Complete Sets',
    price: 2400,
    originalPrice: 2999,
    badge: null,
    image: '/assets/images/products/shringar-set-complete.jpg',
    deitySize: '2 (Large)',
    sizeCode: '2',
    availableSizes: ['0', '1', '2', '3'],
    colors: ['green', 'yellow'],
    isPopular: true,
    rating: 5.0,
    reviewsCount: 22,
    shortDescription:
      'Comprehensive temple shringar collection including haar, mukut, bansuri, kundal, and kamarbandh.',
    features: [
      'Complete 7-piece shringar suite',
      'Gold-plated finish with colorful stones',
      'Ready for daily & festive seva',
      'Comes in velvet storage tray'
    ],
    detailedDescription:
      'Everything required for your Thakur Ji’s complete shringar darshan in one unified, masterfully crafted set.',
    gallery: [
      '/assets/images/products/shringar-set-complete.jpg',
      '/assets/images/categories/complete-sets.jpg',
      '/assets/images/products/kundan-jewellery-set.jpg',
      '/assets/images/products/pearl-jewellery-set.jpg',
      '/assets/images/products/golden-mukut.jpg'
    ],
    additionalInfo: {
      Contents: 'Haar, Mukut, Bansuri, Kundal, Kamarbandh, Pagdi ornament'
    }
  },
  {
    id: 'prod-6',
    name: 'Red Velvet Poshak',
    category: 'poshak',
    categoryName: 'Poshak',
    price: 1750,
    originalPrice: 2199,
    badge: 'Royal',
    image: '/assets/images/products/red-velvet-poshak.jpg',
    deitySize: '0 (Small)',
    sizeCode: '0',
    availableSizes: ['0', '1', '2', '3'],
    colors: ['red', 'yellow'],
    isPopular: false,
    rating: 4.8,
    reviewsCount: 14,
    shortDescription:
      'Plush deep maroon-red velvet poshak with heavy gold zardozi border, perfect for winter and evening darshan.',
    features: [
      'Heavy royal velvet',
      'Dense gold zardozi border',
      'Warm and snug winter seva',
      'Includes matching patka'
    ],
    detailedDescription:
      'Radiant crimson velvet embroidered with classical temple vines and gold motifs, providing regal warmth to Thakur Ji.',
    gallery: [
      '/assets/images/products/red-velvet-poshak.jpg',
      '/assets/images/categories/poshak.jpg',
      '/assets/images/products/designer-poshak-yellow.jpg',
      '/assets/images/products/golden-mukut.jpg',
      '/assets/images/products/kundan-jewellery-set.jpg'
    ],
    additionalInfo: {
      Fabric: 'Micro Velvet with Pure Zari',
      Season: 'Winter Seva & Evening Aarti'
    }
  },
  {
    id: 'prod-7',
    name: 'Pearl Jewellery Set',
    category: 'jewellery',
    categoryName: 'Jewellery',
    price: 1100,
    originalPrice: 1399,
    badge: null,
    image: '/assets/images/products/pearl-jewellery-set.jpg',
    deitySize: '1 (Medium)',
    sizeCode: '1',
    availableSizes: ['0', '1', '2', '3'],
    colors: ['gray', 'yellow'],
    isPopular: false,
    rating: 5.0,
    reviewsCount: 7,
    shortDescription:
      'Pristine layered moti haar with delicate pearl drops and golden accents for elegant daily seva.',
    features: [
      'Lustrous pearl beads',
      'Antique gold spacers',
      'Smooth non-abrasive stringing'
    ],
    detailedDescription:
      'Classic Moti Shringar offering divine simplicity and radiant purity to your home deity.',
    gallery: [
      '/assets/images/products/pearl-jewellery-set.jpg',
      '/assets/images/products/kundan-jewellery-set.jpg',
      '/assets/images/categories/jewellery.jpg',
      '/assets/images/products/designer-poshak-yellow.jpg',
      '/assets/images/products/mukut-mor-pankh.jpg'
    ]
  },
  {
    id: 'prod-8',
    name: 'Blue Poshak Set',
    category: 'poshak',
    categoryName: 'Poshak',
    price: 1900,
    originalPrice: 2350,
    badge: null,
    image: '/assets/images/products/blue-poshak-set.jpg',
    deitySize: '2 (Large)',
    sizeCode: '2',
    availableSizes: ['0', '1', '2', '3'],
    colors: ['blue', 'sky', 'yellow'],
    isPopular: true,
    rating: 4.9,
    reviewsCount: 16,
    shortDescription:
      'Peacock-blue silk poshak embroidered with fine golden peacocks and lotus motifs.',
    features: [
      'Royal blue raw silk',
      'Mor motif gold embroidery',
      'Complete with patka and pagdi cloth'
    ],
    detailedDescription:
      'Reflecting the complexion of Shyam Sundar, this vibrant blue poshak brings joyful energy to your daily seva.',
    gallery: [
      '/assets/images/products/blue-poshak-set.jpg',
      '/assets/images/categories/poshak.jpg',
      '/assets/images/products/mukut-mor-pankh.jpg',
      '/assets/images/products/designer-poshak-yellow.jpg',
      '/assets/images/products/shringar-set-complete.jpg'
    ]
  },
  {
    id: 'prod-9',
    name: 'Golden Mukut',
    category: 'mukut',
    categoryName: 'Mukut',
    price: 1450,
    originalPrice: 1800,
    badge: 'Sacred Gold',
    image: '/assets/images/products/golden-mukut.jpg',
    deitySize: '3 (Extra Large)',
    sizeCode: '3',
    availableSizes: ['0', '1', '2', '3'],
    colors: ['yellow'],
    isPopular: false,
    rating: 5.0,
    reviewsCount: 11,
    shortDescription:
      'Opulent temple mukut embossed with divine filigree and studded with golden gemstones.',
    features: [
      'Solid antique gold plating',
      'Embossed temple carvings',
      'Comfort-fit curved back'
    ],
    detailedDescription:
      'A majestic golden mukut fit for the King of Braj, radiating imperial sacred dignity.',
    gallery: [
      '/assets/images/products/golden-mukut.jpg',
      '/assets/images/products/mukut-mor-pankh.jpg',
      '/assets/images/categories/mukut.jpg',
      '/assets/images/products/designer-poshak-yellow.jpg',
      '/assets/images/products/kundan-jewellery-set.jpg'
    ]
  }
];
