import { qs, initScrollAnimations } from '../utils/helpers.js';
import { showToast } from '../utils/toast.js';

export function renderContact() {
  return `
    <!-- Hero Header -->
    <section class="editorial-hero">
      <div class="container animate-fade-up visible">
        <span class="hero-badge">Get In Touch</span>
        <h1>Contact Us</h1>
      </div>
    </section>

    <section class="section-padding container">
      <div style="
        display: grid;
        grid-template-columns: 1fr 1.2fr;
        gap: var(--space-3xl);
        align-items: start;
      " id="contact-layout">
        
        <!-- Left Column: Business Info -->
        <div class="animate-fade-up">
          <h2 class="text-h2" style="margin-bottom: var(--space-md);">How can we help?</h2>
          <p class="text-body" style="margin-bottom: var(--space-xl);">
            Have questions about our handbag designs, materials, or delivery schedules? Our team is ready to assist you. The fastest way to get answers is to chat with us directly via WhatsApp.
          </p>

          <!-- Contact Cards -->
          <div style="display: flex; flex-direction: column; gap: var(--space-lg); margin-bottom: var(--space-xl);">
            <!-- WhatsApp Chat Card -->
            <a href="https://wa.me/962790000000" target="_blank" rel="noopener noreferrer" style="
              display: flex;
              gap: var(--space-md);
              background-color: var(--color-cream);
              padding: var(--space-lg);
              border-radius: var(--radius-md);
              align-items: center;
              border-left: 4px solid var(--color-gold);
              transition: transform var(--transition-fast);
            " class="contact-method-card">
              <div style="
                width: 48px;
                height: 48px;
                border-radius: 50%;
                background-color: var(--color-wine);
                color: var(--color-cream);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
              ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 24px; height: 24px;">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025 4.486 4.486 0 0 0-.471-1.915C3.012 15.556 2 13.885 2 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                </svg>
              </div>
              <div>
                <h4 class="text-h4" style="color: var(--color-wine); margin-bottom: var(--space-xs); font-size: var(--font-size-md);">WhatsApp Direct Chat</h4>
                <p class="text-body" style="font-size: var(--font-size-sm);">Instant help, order tracking & consulting</p>
              </div>
            </a>

            <!-- Phone Call Card -->
            <div style="
              display: flex;
              gap: var(--space-md);
              background-color: var(--color-gray-100);
              padding: var(--space-lg);
              border-radius: var(--radius-md);
              align-items: center;
            ">
              <div style="
                width: 48px;
                height: 48px;
                border-radius: 50%;
                background-color: var(--color-gray-300);
                color: var(--color-wine);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
              ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 24px; height: 24px;">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.143-5.12-3.439-6.264-6.264l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </div>
              <div>
                <h4 class="text-h4" style="color: var(--color-wine); margin-bottom: var(--space-xs); font-size: var(--font-size-md);">Phone Call</h4>
                <p class="text-body" style="font-size: var(--font-size-sm);">+962 7 9000 0000 (10:00 AM - 10:00 PM)</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Contact Form -->
        <div style="
          background-color: var(--color-gray-100);
          padding: var(--space-xl);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
        " class="animate-fade-up">
          <h3 class="text-h3" style="margin-bottom: var(--space-md); border-bottom: 1px solid var(--color-gray-200); padding-bottom: var(--space-sm);">Send an Email</h3>
          
          <form id="contact-form">
            <div class="form-group">
              <label class="form-label" for="contact-name">Your Name *</label>
              <input type="text" id="contact-name" class="form-control" placeholder="e.g. Yasmin" required>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="contact-email">Email Address *</label>
              <input type="email" id="contact-email" class="form-control" placeholder="e.g. yasmin@mail.com" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="contact-msg">Message *</label>
              <textarea id="contact-msg" class="form-control" placeholder="How can we help you?" required style="min-height: 120px;"></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-full" style="padding: 14px 0;">
              Send Message
            </button>
          </form>
        </div>
      </div>

      <!-- Google Maps styled placeholder container -->
      <div class="animate-fade-in" style="
        margin-top: 80px;
        border-radius: var(--radius-md);
        overflow: hidden;
        box-shadow: var(--shadow-sm);
        height: 350px;
        position: relative;
        background-color: var(--color-cream);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--color-gray-200);
      ">
        <!-- Google Map Iframe (Amman location) -->
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108422.39958744046!2d35.867803328224536!3d31.9515693630656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b1812478b912d%3A0x805d762e7837077a!2sAmman%2C%20Jordan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
          width="100%" 
          height="100%" 
          style="border:0; position: absolute; top:0; left:0; width:100%; height:100%; filter: grayscale(1) contrast(1.1);" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
          aria-label="Google Maps View of Amman Jordan"
        ></iframe>
      </div>
    </section>

    <style>
      .contact-method-card:hover {
        transform: translateY(-4px);
      }
      @media (max-width: 768px) {
        #contact-layout {
          grid-template-columns: 1fr !important;
          gap: 48px !important;
        }
      }
    </style>
  `;
}

export function initContactEvents() {
  initScrollAnimations();

  const form = qs('#contact-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.reset();
    showToast('Thank you! Your message has been sent successfully.');
  });
}
