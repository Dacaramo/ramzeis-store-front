const testProductCategories = [
  {
    id: 'for-my-style',
    name: 'For my style',
    href: '/products?category=for-my-style',
    subcategories: [
      {
        id: 'hoodies',
        name: 'Hoodies',
        href: '/products?category=for-my-style&subcategory=hoodies',
      },
      {
        id: 'sweatshirts',
        name: 'Sweatshirts',
        href: '/products?category=for-my-style&subcategory=sweatshirts',
      },
      {
        id: 't-shirts',
        name: 'T-shirts',
        href: '/products?category=for-my-style&subcategory=t-shirts',
      },
      {
        id: 'accessories',
        name: 'Accessories',
        href: '/products?category=for-my-style&subcategory=accessories',
      },
    ],
  },
  {
    id: 'for-my-setup',
    name: 'For my setup',
    href: '/products?category=for-my-setup',
    subcategories: [
      {
        id: 'keyboards',
        name: 'Keyboards',
        href: '/products?category=for-my-setup&subcategory=keyboards',
      },
      {
        id: 'stickers',
        name: 'Stickers',
        href: '/products?category=for-my-setup&subcategory=stickers',
      },
      {
        id: 'mouse-pads',
        name: 'Mouse pads',
        href: '/products?category=for-my-setup&subcategory=mouse-pads',
      },
      {
        id: 'other',
        name: 'Other',
        href: '/products?category=for-my-setup&subcategory=other',
      },
    ],
  },
  {
    id: 'for-the-ambience',
    name: 'For the ambience',
    href: '/products?category=for-the-ambience',
    subcategories: [
      {
        id: 'plushes',
        name: 'Plushes',
        href: '/products?category=for-the-ambience&subcategory=plushes',
      },
      {
        id: 'other',
        name: 'Other',
        href: '/products?category=for-the-ambience&subcategory=other',
      },
    ],
  },
];

export default testProductCategories;
