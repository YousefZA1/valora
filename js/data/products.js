export const products = [
  {
    id: 'verona-tote',
    name: 'Verona Tote',
    price: 49,
    category: 'tote-bags',
    categoryName: 'Tote Bags',
    description: 'An elegant statement piece designed for modern sophistication. Crafted from premium textured leather with hand-finished gold-toned hardware, the Verona Tote offers a spacious interior lined with soft velvet, making it the perfect companion for your daily essentials.',
    colors: [
      { name: 'Deep Burgundy', hex: '#540C18' },
      { name: 'Classic Black', hex: '#111111' },
      { name: 'Soft Tan', hex: '#D2B48C' }
    ],
    image: 'images/verona_tote.png',
    isBestSeller: true,
    details: [
      { label: 'Material', value: '100% Genuine Textured Leather' },
      { label: 'Dimensions', value: '32cm x 26cm x 14cm' },
      { label: 'Hardware', value: 'Polished Gold-Toned Hardware' },
      { label: 'Interior', value: 'Premium Velvet Lining with Zipper Pocket' }
    ]
  },
  {
    id: 'milano-handbag',
    name: 'Milano Handbag',
    price: 55,
    category: 'handbags',
    categoryName: 'Handbags',
    description: 'Defined by its structural elegance and classic silhouette, the Milano Handbag is the epitome of timeless luxury. Features a secure front gold clasp, a sturdy top handle, and an adjustable shoulder strap for versatile styling.',
    colors: [
      { name: 'Dark Wine', hex: '#39040B' },
      { name: 'Noir', hex: '#0C0C0C' },
      { name: 'Forest Green', hex: '#1C352D' }
    ],
    image: 'images/milano_handbag.png',
    isBestSeller: true,
    details: [
      { label: 'Material', value: 'Premium Full-Grain Smooth Leather' },
      { label: 'Dimensions', value: '28cm x 21cm x 11cm' },
      { label: 'Closure', value: 'Valora Signature Clasp Lock' },
      { label: 'Strap', value: 'Detachable & Adjustable Leather Strap' }
    ]
  },
  {
    id: 'classic-beige-crossbody',
    name: 'Classic Beige Crossbody',
    price: 39,
    category: 'crossbody-bags',
    categoryName: 'Crossbody Bags',
    description: 'Effortlessly chic and lightweight, the Classic Beige Crossbody adds a touch of understated glamour to any outfit. The interlaced gold chain and premium leather strap drape beautifully, while the interior slots keep your cards organized.',
    colors: [
      { name: 'Beige Cream', hex: '#F5F5DC' },
      { name: 'Rose Taupe', hex: '#B38B8F' },
      { name: 'Classic Black', hex: '#111111' }
    ],
    image: 'images/classic_beige_crossbody.png',
    isBestSeller: true,
    details: [
      { label: 'Material', value: 'Soft Pebbled Leather' },
      { label: 'Dimensions', value: '22cm x 15cm x 7cm' },
      { label: 'Strap Drop', value: '55cm Gold Chain Crossbody Strap' },
      { label: 'Pockets', value: '3 Internal Card Slots & 1 Phone Slip Pocket' }
    ]
  },
  {
    id: 'signature-tote',
    name: 'Valora Signature Tote',
    price: 45,
    category: 'tote-bags',
    categoryName: 'Tote Bags',
    description: 'A perfect blend of durability and luxury, our Signature Canvas and Leather Tote is spacious enough for travel or work. Features a double-stitched leather handle and reinforced leather corners for daily endurance.',
    colors: [
      { name: 'Canvas & Tan', hex: '#D2B48C' },
      { name: 'Canvas & Black', hex: '#2B2B2B' }
    ],
    image: 'images/signature_tote.png',
    isBestSeller: false,
    details: [
      { label: 'Material', value: 'Premium Cotton Canvas & Genuine Trim' },
      { label: 'Dimensions', value: '38cm x 29cm x 16cm' },
      { label: 'Fit', value: 'Fits up to a 14-inch Laptop' },
      { label: 'Closure', value: 'Magnetic Snap Button' }
    ]
  },
  {
    id: 'mini-monaco',
    name: 'Mini Monaco',
    price: 35,
    category: 'mini-bags',
    categoryName: 'Mini Bags',
    description: 'Charming, petite, and undeniably stylish, the Mini Monaco is designed to capture attention. Perfectly sized for your keys, lipstick, and cards, it is the ultimate accessory for high-fashion events or dinner dates.',
    colors: [
      { name: 'Soft Rose', hex: '#D3A7AC' },
      { name: 'Crimson', hex: '#8B0000' },
      { name: 'Ivory', hex: '#FFFFF0' }
    ],
    image: 'images/mini_monaco.png',
    isBestSeller: false,
    details: [
      { label: 'Material', value: 'Luxe Calfskin Leather' },
      { label: 'Dimensions', value: '16cm x 12cm x 6cm' },
      { label: 'Handling', value: 'Mini Top Handle with Chain Shoulder Strap' },
      { label: 'Hardware', value: 'Gold Metallic Eyelets & Lock' }
    ]
  },
  {
    id: 'serena-clutch',
    name: 'Serena Evening Clutch',
    price: 32,
    category: 'mini-bags',
    categoryName: 'Mini Bags',
    description: 'Designed for unforgettable evenings, the Serena Clutch features a sleek, minimalist envelope shape with a refined gold trim clasp. Carry it in hand or use the hidden chain strap to drape it over the shoulder.',
    colors: [
      { name: 'Rich Burgundy', hex: '#6F3B42' },
      { name: 'Midnight Black', hex: '#0A0A0A' },
      { name: 'Champagne Gold', hex: '#E6C280' }
    ],
    image: 'images/serena_clutch.png',
    isBestSeller: false,
    details: [
      { label: 'Material', value: 'Smooth Patent Leatherette with Velvet Panel' },
      { label: 'Dimensions', value: '25cm x 13cm x 5cm' },
      { label: 'Strap', value: 'Hidden Gold Chain Shoulder Strap (Removable)' },
      { label: 'Lining', value: 'Premium Satin lining' }
    ]
  }
];

export const testimonials = [
  {
    name: 'Yasmin A.',
    city: 'Amman',
    review: 'Absolutely in love with my Verona Tote. The quality matches high-end international brands and the delivery was incredibly fast. A beautiful piece!',
    rating: 5
  },
  {
    name: 'Laila T.',
    city: 'Irbid',
    review: 'Ordering through WhatsApp was so simple. The team helped me choose the color and my bag arrived the next day. The Milano Handbag is stunning!',
    rating: 5
  },
  {
    name: 'Rania M.',
    city: 'Aqaba',
    review: 'Best customer service I’ve experienced in Jordan. The Classic Beige Crossbody is gorgeous and well-packaged. Perfect for daily wear.',
    rating: 5
  },
  {
    name: 'Salma K.',
    city: 'Amman',
    review: 'The quality of materials and packaging feels very premium. I bought the Mini Monaco for a wedding and got so many compliments. Highly recommend!',
    rating: 5
  }
];
