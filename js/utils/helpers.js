/**
 * Formats a number as Jordanian Dinar (JOD)
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
  return `${amount} JOD`;
}

/**
 * Shorthand for document.querySelector
 * @param {string} selector
 * @param {Element} [context=document]
 * @returns {Element|null}
 */
export function qs(selector, context = document) {
  return context.querySelector(selector);
}

/**
 * Shorthand for document.querySelectorAll
 * @param {string} selector
 * @param {Element} [context=document]
 * @returns {NodeList}
 */
export function qsa(selector, context = document) {
  return context.querySelectorAll(selector);
}

/**
 * Creates an element with classes and attributes
 * @param {string} tag
 * @param {Object} [options]
 * @param {string[]} [options.classes]
 * @param {Object} [options.attrs]
 * @param {string} [options.html]
 * @returns {HTMLElement}
 */
export function createElement(tag, options = {}) {
  const el = document.createElement(tag);
  if (options.classes) {
    options.classes.forEach(c => {
      if (c) el.classList.add(c);
    });
  }
  if (options.attrs) {
    Object.entries(options.attrs).forEach(([k, v]) => el.setAttribute(k, v));
  }
  if (options.html !== undefined) {
    el.innerHTML = options.html;
  }
  return el;
}

/**
 * Dynamic fade-in scroll animation setup using Intersection Observer
 */
export function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once animated, no need to observe again
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  qsa('.animate-fade-up, .animate-fade-in').forEach(el => {
    observer.observe(el);
  });
}
