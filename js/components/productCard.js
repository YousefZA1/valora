import { formatCurrency } from '../utils/helpers.js';
import { favorites } from '../store/favorites.js';

/**
 * Generates the HTML string for a single product card
 * @param {Object} product - Product data object
 * @returns {string} HTML string
 */
export function renderProductCard(product) {
  const bestSellerTag = product.isBestSeller 
    ? `<span class="best-seller-tag">Best Seller</span>` 
    : '';

  const isFav = favorites.isFavorite(product.id) ? 'is-favorite' : '';

  return `
    <article class="product-card animate-fade-up">
      <div class="product-card-image">
        ${bestSellerTag}
        <button class="favorite-toggle-btn card-fav-btn ${isFav}" data-id="${product.id}" aria-label="Add to favorites">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>
        <a href="#product?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </a>
      </div>
      <div class="product-card-info">
        <span class="product-card-category">${product.categoryName}</span>
        <h3 class="product-card-title">
          <a href="#product?id=${product.id}">${product.name}</a>
        </h3>
        <p class="product-card-price">${formatCurrency(product.price)}</p>
        <div class="product-card-actions">
          <a href="#product?id=${product.id}" class="btn btn-secondary">Details</a>
          <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}" data-color="${product.colors[0].name}">
            Add
          </button>
        </div>
      </div>
    </article>
  `;
}
