import { products, testimonials } from '../data/products.js';
import { renderProductCard } from '../components/productCard.js';
import { renderTestimonialCard } from '../components/testimonialCard.js';
import { formatCurrency, initScrollAnimations } from '../utils/helpers.js';

export function renderHome() {
  const bestSellers = products.filter(p => p.isBestSeller);
  
  // Featured categories definition
  const categories = [
    { id: 'tote-bags', name: 'Tote Bags', img: 'images/verona_tote.png', desc: 'Spacious & functional luxury' },
    { id: 'handbags', name: 'Handbags', img: 'images/milano_handbag.png', desc: 'Timeless structural elegance' },
    { id: 'crossbody-bags', name: 'Crossbody Bags', img: 'images/classic_beige_crossbody.png', desc: 'Chic everyday mobility' },
    { id: 'mini-bags', name: 'Mini Bags', img: 'images/mini_monaco.png', desc: ' Petite statement pieces' }
  ];

  return `
    <!-- Hero Section -->
    <section class="hero-section">
      <!-- Decorative light blobs -->
      <div style="
        position: absolute;
        top: -20%;
        right: -10%;
        width: 600px;
        height: 600px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(111, 59, 66, 0.4) 0%, rgba(57, 4, 11, 0) 70%);
        z-index: 1;
      "></div>
      
      <div class="container" style="position: relative; z-index: 2; width: 100%;">
        <div class="hero-grid">
          <!-- Text content -->
          <div class="animate-fade-up visible">
            <span class="text-caption" style="color: var(--color-rose); margin-bottom: var(--space-md); display: block;">VALORA HANDBAGS JORDAN</span>
            <h1 class="hero-title">Elegance Defined, <br>Confidence Carried</h1>
            <p class="hero-desc">Discover our curated collection of luxury-inspired women's handbags. Crafted with precision and designed to bring grace to every occasion.</p>
            <div class="hero-actions">
              <a href="#collections" class="btn btn-primary" style="padding: 14px 36px; font-size: 0.95rem; border-radius: 0;">Browse Collections</a>
              <a href="https://wa.me/962790000000" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="
                border-color: var(--color-rose);
                color: var(--color-cream);
                padding: 14px 36px;
                font-size: 0.95rem;
                border-radius: 0;
              ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 18px; height: 18px; margin-right: 8px;">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.143-5.12-3.439-6.264-6.264l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
          
          <!-- Image frame -->
          <div class="animate-fade-in visible" style="
            position: relative;
            display: flex;
            justify-content: center;
          ">
            <div style="
              position: relative;
              width: 100%;
              max-width: 440px;
              aspect-ratio: 1 / 1.1;
              border-radius: var(--radius-lg);
              border: 1px solid rgba(251, 235, 234, 0.2);
              padding: 16px;
              background-color: rgba(255, 255, 255, 0.03);
              backdrop-filter: blur(8px);
            ">
              <img src="images/verona_tote.png" alt="Verona Tote Burgundy" style="
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: var(--radius-md);
                box-shadow: var(--shadow-lg);
              ">
            </div>
            <!-- Decorative outline badge -->
            <div class="hero-badge-overlay">
              Premium Leather<br>
              <span style="font-size: var(--font-size-sm); font-family: var(--font-body); font-weight: normal; color: var(--color-wine);">Collection 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Categories Section -->
    <section class="section-padding container">
      <div class="text-center animate-fade-up">
        <h2 class="luxury-title">Shop by Category</h2>
        <p class="subtitle">Explore our exquisite collections curated for every style, mood, and occasion.</p>
      </div>

      <div class="categories-grid">
        ${categories.map(cat => `
          <a href="#collections?category=${cat.id}" class="animate-fade-up" style="
            position: relative;
            aspect-ratio: 1/1.2;
            overflow: hidden;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-sm);
            display: flex;
            align-items: flex-end;
            group: hover;
          ">
            <!-- Overlay and Image -->
            <div style="
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: linear-gradient(0deg, rgba(57, 4, 11, 0.8) 0%, rgba(57, 4, 11, 0.2) 60%, rgba(57, 4, 11, 0) 100%);
              z-index: 2;
            "></div>
            <img src="${cat.img}" alt="${cat.name}" style="
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: transform var(--transition-slow);
              z-index: 1;
            " class="category-img">
            
            <!-- Category info -->
            <div style="
              position: relative;
              z-index: 3;
              padding: var(--space-lg);
              color: var(--color-white);
            ">
              <h3 class="text-h3" style="color: var(--color-white); font-size: var(--font-size-xl); margin-bottom: var(--space-xs);">${cat.name}</h3>
              <p style="font-size: var(--font-size-sm); color: rgba(255, 255, 255, 0.85);">${cat.desc}</p>
            </div>
          </a>
        `).join('')}
      </div>
    </section>

    <!-- Best Sellers Section -->
    <section class="section-padding" style="background-color: var(--color-gray-100);">
      <div class="container">
        <div class="text-center animate-fade-up">
          <h2 class="luxury-title">Our Best Sellers</h2>
          <p class="subtitle">Our most coveted bags, cherished by women across Jordan for their stunning craftsmanship.</p>
        </div>
        
        <div class="products-grid">
          ${bestSellers.map(renderProductCard).join('')}
        </div>
      </div>
    </section>

    <!-- Why Choose Valora -->
    <section class="section-padding container">
      <div class="text-center animate-fade-up">
        <h2 class="luxury-title">The Valora Experience</h2>
        <p class="subtitle">We hold our craftsmanship, service, and customer satisfaction to the highest standards.</p>
      </div>

      <div class="benefits-grid">
        <!-- Benefit 1 -->
        <div class="text-center animate-fade-up" style="padding: var(--space-md);">
          <div style="
            width: 70px;
            height: 70px;
            background-color: var(--color-cream);
            color: var(--color-burgundy);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px auto;
          ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 32px; height: 32px;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499c.195-.39.687-.39.882 0l2.3 4.694 5.176.751c.433.063.606.592.292.899l-3.747 3.65.885 5.155c.074.433-.382.764-.767.56L11.5 16.79l-4.63 2.433c-.385.204-.84-.127-.767-.56l.885-5.155-3.747-3.65c-.314-.307-.14-.836.292-.899l5.176-.751 2.3-4.694Z" />
            </svg>
          </div>
          <h3 class="text-h4" style="margin-bottom: var(--space-sm);">Premium Quality</h3>
          <p class="text-body" style="font-size: var(--font-size-sm);">Carefully selected premium materials, hardware, and stitching built to last.</p>
        </div>

        <!-- Benefit 2 -->
        <div class="text-center animate-fade-up" style="padding: var(--space-md);">
          <div style="
            width: 70px;
            height: 70px;
            background-color: var(--color-cream);
            color: var(--color-burgundy);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px auto;
          ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 32px; height: 32px;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 21l8.982-11.825a.9.9 0 0 0-1.393-1.168L15 11.25l.813-5.096L6.832 18a.9.9 0 0 0 1.393 1.168l1.588-1.264Z" />
            </svg>
          </div>
          <h3 class="text-h4" style="margin-bottom: var(--space-sm);">Elegant Designs</h3>
          <p class="text-body" style="font-size: var(--font-size-sm);">Luxury-inspired silhouettes that add absolute confidence to any wardrobe.</p>
        </div>

        <!-- Benefit 3 -->
        <div class="text-center animate-fade-up" style="padding: var(--space-md);">
          <div style="
            width: 70px;
            height: 70px;
            background-color: var(--color-cream);
            color: var(--color-burgundy);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px auto;
          ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 32px; height: 32px;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125a1.125 1.125 0 0 0 1.125-1.125V9.75M8.25 18.75a1.5 1.5 0 0 1-3 0m1.5-1.5h1.5m10.5 1.5h-1.5m-6-1.5h1.5M3 8.25h10.5M3 12h13.5m0-6.75h3.375a1.125 1.125 0 0 1 1.125 1.125V9.75M16.5 5.25v4.5" />
            </svg>
          </div>
          <h3 class="text-h4" style="margin-bottom: var(--space-sm);">Delivery Across Jordan</h3>
          <p class="text-body" style="font-size: var(--font-size-sm);">Safe, quick delivery directly to your home in Amman, Irbid, Zarqa, Aqaba, and more.</p>
        </div>

        <!-- Benefit 4 -->
        <div class="text-center animate-fade-up" style="padding: var(--space-md);">
          <div style="
            width: 70px;
            height: 70px;
            background-color: var(--color-cream);
            color: var(--color-burgundy);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px auto;
          ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 32px; height: 32px;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>
          </div>
          <h3 class="text-h4" style="margin-bottom: var(--space-sm);">Trusted Experience</h3>
          <p class="text-body" style="font-size: var(--font-size-sm);">WhatsApp support ready to assist you. Pay cash upon delivery after checking the quality.</p>
        </div>
      </div>
    </section>

    <!-- Testimonials / Reviews Section -->
    <section class="reviews-section">
      <div class="container">
        <div class="text-center animate-fade-up">
          <h2 class="luxury-title">Customer Reviews</h2>
          <p class="subtitle">Hear from our delighted clients about their Valora experience.</p>
        </div>

        <div class="reviews-grid">
          ${testimonials.map(renderTestimonialCard).join('')}
        </div>
      </div>
    </section>

    <!-- Instagram Inspired Gallery -->
    <section class="section-padding container">
      <div class="text-center animate-fade-up">
        <h2 class="luxury-title">@ValoraBags on Instagram</h2>
        <p class="subtitle">Join our community online. Styled, tags, and shared by you.</p>
      </div>

      <div class="instagram-grid">
        ${products.map((p, idx) => `
          <div class="animate-fade-in" style="
            position: relative;
            aspect-ratio: 1/1;
            overflow: hidden;
            border-radius: var(--radius-sm);
            cursor: pointer;
            group: hover;
          ">
            <div style="
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(84, 12, 24, 0.4);
              opacity: 0;
              transition: opacity var(--transition-fast);
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--color-white);
              z-index: 2;
            " class="ig-overlay">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 24px; height: 24px;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </div>
            <img src="${p.image}" alt="Instagram post" style="
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: transform var(--transition-slow);
            " class="ig-image">
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Custom page style additions for zoom etc. -->
    <style>
      .category-img:hover {
        transform: scale(1.06);
      }
      .ig-overlay:hover {
        opacity: 1;
      }
      .ig-overlay:hover + .ig-image {
        transform: scale(1.08);
      }
    </style>
  `;
}

export function initHomeEvents() {
  initScrollAnimations();
}
