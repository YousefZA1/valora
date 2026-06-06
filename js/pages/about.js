import { initScrollAnimations } from '../utils/helpers.js';

export function renderAbout() {
  return `
    <!-- Hero Header -->
    <section class="editorial-hero">
      <div class="container animate-fade-up visible">
        <span class="hero-badge">Our Story</span>
        <h1>About Valora</h1>
      </div>
    </section>

    <!-- Brand Story Section -->
    <section class="section-padding container">
      <div style="
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-3xl);
        align-items: center;
      " id="about-story-layout">
        <div class="animate-fade-up">
          <h2 class="text-h2" style="margin-bottom: var(--space-md);">Crafted for Confidence</h2>
          <p class="text-body" style="margin-bottom: var(--space-md);">
            Valora Bags was born out of a simple passion: to design luxury-inspired women's handbags that combine timeless design with premium, durable craftsmanship. Based in Amman, Jordan, we believe that a handbag is not just an accessory—it is an extension of a woman's elegance, ambition, and confidence.
          </p>
          <p class="text-body" style="margin-bottom: var(--space-md);">
            Our collections draw inspiration from classic European style, adapted for the modern woman who demands both aesthetic perfection and everyday practicality. Each piece is designed in-house, ensuring meticulous attention to detail, premium hardware selection, and unmatched sewing quality.
          </p>
        </div>
        <div class="animate-fade-in" style="
          background-color: var(--color-cream);
          padding: var(--space-lg);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
        ">
          <img src="images/milano_handbag.png" alt="Valora Handbag Crafting" style="
            width: 100%;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-md);
          ">
        </div>
      </div>
    </section>

    <!-- Mission & Quality section -->
    <section style="background-color: var(--color-gray-100); padding: var(--space-4xl) 0;">
      <div class="container">
        <div style="
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-3xl);
        " id="about-mission-layout">
          <!-- Card 1 -->
          <div class="animate-fade-up" style="
            background-color: var(--color-white);
            padding: var(--space-xl);
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-sm);
            border-top: 3px solid var(--color-gold);
          ">
            <h3 class="text-h3" style="margin-bottom: var(--space-md);">Our Mission</h3>
            <p class="text-body">
              To make high-end luxury handbag designs accessible to fashion lovers across Jordan. We are committed to providing premium quality products and an exceptional shopping experience without the exorbitant luxury markup.
            </p>
          </div>

          <!-- Card 2 -->
          <div class="animate-fade-up" style="
            background-color: var(--color-white);
            padding: var(--space-xl);
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-sm);
            border-top: 3px solid var(--color-burgundy);
          ">
            <h3 class="text-h3" style="margin-bottom: var(--space-md);">Quality Commitment</h3>
            <p class="text-body">
              Every Valora bag undergoes a strict quality check before dispatch. From the smooth operation of zippers to the polish of metal clasps, we ensure that what arrives at your doorstep represents perfection. If anything doesn't meet your expectation, we replace it immediately.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Valora Banner -->
    <section class="section-padding container text-center">
      <div class="animate-fade-up" style="max-width: 700px; margin: 0 auto;">
        <h2 class="luxury-title" style="margin-bottom: var(--space-md);">The Valora Standard</h2>
        <p class="text-body" style="font-size: var(--font-size-md); margin-bottom: var(--space-xl);">
          "Elegance is not about being noticed, it's about being remembered." We designed Valora Bags to be pieces that carry your items and your stories, accentuating your presence wherever you walk in Jordan.
        </p>
        <a href="#collections" class="btn btn-primary">Discover the Collection</a>
      </div>
    </section>

    <style>
      @media (max-width: 768px) {
        #about-story-layout, #about-mission-layout {
          grid-template-columns: 1fr !important;
          gap: 32px !important;
        }
      }
    </style>
  `;
}

export function initAboutEvents() {
  initScrollAnimations();
}
