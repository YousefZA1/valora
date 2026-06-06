import { products } from '../data/products.js';
import { renderProductCard } from '../components/productCard.js';
import { favorites } from '../store/favorites.js';
import { qs, initScrollAnimations } from '../utils/helpers.js';

function renderFavoritesEmptyState() {
  return `
    <div class="container section-padding text-center animate-fade-up">
      <div style="margin: 40px auto var(--space-lg) auto; color: var(--color-rose); display: flex; justify-content: center;">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" style="width: 80px; height: 80px;">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      </div>
      <h2 class="luxury-title">Your Favorites</h2>
      <p class="subtitle" style="margin-bottom: var(--space-xl); max-width: 500px;">Explore our premium leather handbags and save your favorite selections here.</p>
      <a href="#collections" class="btn btn-primary" style="border-radius: 0;">Explore Collections</a>
    </div>
  `;
}

export function renderFavorites() {
  const favoriteIds = favorites.getItems();
  const favoriteProducts = products.filter(p => favoriteIds.includes(p.id));

  if (favoriteProducts.length === 0) {
    return renderFavoritesEmptyState();
  }

  return `
    <div class="container section-padding animate-fade-up">
      <!-- Header -->
      <div class="text-center">
        <h1 class="luxury-title">Your Favorites</h1>
        <p class="subtitle">A curated collection of your saved Valora handbags.</p>
      </div>

      <!-- Favorites Grid -->
      <div class="products-grid" id="favorites-grid">
        ${favoriteProducts.map(renderProductCard).join('')}
      </div>
    </div>
  `;
}

function updateLocalHearts() {
  document.querySelectorAll('.favorite-toggle-btn').forEach(btn => {
    const id = btn.getAttribute('data-id');
    if (favorites.isFavorite(id)) {
      btn.classList.add('is-favorite');
    } else {
      btn.classList.remove('is-favorite');
    }
  });
}

// Keep reference to the listener so it can be cleaned up
let activeListener = null;

export function initFavoritesEvents() {
  initScrollAnimations();
  updateLocalHearts();

  // Listen to favorites-updated to handle removals reactively
  const handleUpdate = () => {
    // Only process update if current route is favorites page
    if (window.location.hash !== '#favorites') {
      document.removeEventListener('favorites-updated', handleUpdate);
      return;
    }
    
    const favoriteIds = favorites.getItems();
    const favoriteProducts = products.filter(p => favoriteIds.includes(p.id));
    const root = qs('#app-view-root');
    
    if (!root) return;

    if (favoriteProducts.length === 0) {
      root.innerHTML = renderFavoritesEmptyState();
    } else {
      const grid = qs('#favorites-grid');
      if (grid) {
        grid.innerHTML = favoriteProducts.map(renderProductCard).join('');
        updateLocalHearts();
        initScrollAnimations();
      }
    }
  };

  // Remove old listener to avoid duplicate registrations
  if (activeListener) {
    document.removeEventListener('favorites-updated', activeListener);
  }
  
  activeListener = handleUpdate;
  document.addEventListener('favorites-updated', handleUpdate);
}
