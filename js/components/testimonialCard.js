/**
 * Generates the HTML string for a testimonial review card
 * @param {Object} testimonial - Review data object
 * @returns {string} HTML string
 */
export function renderTestimonialCard(testimonial) {
  // Build star SVGs dynamically
  let starsHtml = '';
  for (let i = 0; i < 5; i++) {
    const fillType = i < testimonial.rating ? 'currentColor' : 'none';
    starsHtml += `
      <svg xmlns="http://www.w3.org/2000/svg" fill="${fillType}" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 16px; height: 16px;">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499c.195-.39.687-.39.882 0l2.3 4.694 5.176.751c.433.063.606.592.292.899l-3.747 3.65.885 5.155c.074.433-.382.764-.767.56L11.5 16.79l-4.63 2.433c-.385.204-.84-.127-.767-.56l.885-5.155-3.747-3.65c-.314-.307-.14-.836.292-.899l5.176-.751 2.3-4.694Z" />
      </svg>
    `;
  }

  return `
    <div class="testimonial-card animate-fade-up">
      <div class="testimonial-stars">
        ${starsHtml}
      </div>
      <p class="testimonial-text">"${testimonial.review}"</p>
      <div>
        <h4 class="testimonial-author">${testimonial.name}</h4>
        <span class="testimonial-city">${testimonial.city}, Jordan</span>
      </div>
    </div>
  `;
}
