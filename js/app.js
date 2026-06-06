import { initNavbar } from './components/navbar.js';
import { initFooter } from './components/footer.js';
import { initCartDrawer } from './components/cartDrawer.js';
import { initRouter } from './router.js';
import { cart } from './store/cart.js';
import { favorites } from './store/favorites.js';
import { products } from './data/products.js';
import { qs } from './utils/helpers.js';
import { showToast } from './utils/toast.js';

export function updateAllHearts() {
  document.querySelectorAll('.favorite-toggle-btn').forEach(btn => {
    const id = btn.getAttribute('data-id');
    if (favorites.isFavorite(id)) {
      btn.classList.add('is-favorite');
    } else {
      btn.classList.remove('is-favorite');
    }
  });
}

function initGlobalEvents() {
  // Global Event Delegation for dynamic Product Card "Add to Cart" buttons
  document.body.addEventListener('click', (e) => {
    const cartBtn = e.target.closest('.add-to-cart-btn');
    if (cartBtn) {
      const id = cartBtn.getAttribute('data-id');
      const colorName = cartBtn.getAttribute('data-color');
      const product = products.find(p => p.id === id);

      if (product) {
        // Add item to cart
        cart.addItem(product, colorName, 1);

        // Create a global float success notification if not on details page
        if (window.location.hash.indexOf('#product') === -1) {
          showToast(`${product.name} added to your shopping bag!`);
        }
      }
      return;
    }

    // Global Event Delegation for Favorite Toggles
    const favBtn = e.target.closest('.favorite-toggle-btn');
    if (favBtn) {
      e.preventDefault();
      e.stopPropagation();

      const id = favBtn.getAttribute('data-id');
      const product = products.find(p => p.id === id);
      if (!product) return;

      const added = favorites.toggle(id);
      if (added) {
        showToast(`${product.name} added to favorites!`);
      } else {
        showToast(`${product.name} removed from favorites.`);
      }
    }
  });

  // Listen for favorites updates to sync all hearts in real-time
  document.addEventListener('favorites-updated', updateAllHearts);
}

// App Initialization
function initApp() {
  initNavbar();
  initFooter();
  initCartDrawer();
  initGlobalEvents();
  initRouter(); // Router runs last to trigger initial view render
}

// Run on script load
initApp();

