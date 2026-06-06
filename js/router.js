import { qs } from './utils/helpers.js';
import { updateActiveNavLink } from './components/navbar.js';
import { auth } from './store/auth.js';

// Page imports
import { renderHome, initHomeEvents } from './pages/home.js';
import { renderCollections, initCollectionsEvents } from './pages/collections.js';
import { renderProduct, initProductEvents } from './pages/product.js';
import { renderCart, initCartEvents } from './pages/cart.js';
import { renderAbout, initAboutEvents } from './pages/about.js';
import { renderContact, initContactEvents } from './pages/contact.js';
import { renderSignup, initSignupEvents } from './pages/signup.js';
import { renderProfile, initProfileEvents } from './pages/profile.js';
import { renderFavorites, initFavoritesEvents } from './pages/favorites.js';

// Routes configuration mapping path prefix to render/init functions
const routes = {
  home: { render: renderHome, init: initHomeEvents },
  collections: { render: renderCollections, init: initCollectionsEvents },
  product: { render: renderProduct, init: initProductEvents },
  cart: { render: renderCart, init: initCartEvents },
  about: { render: renderAbout, init: initAboutEvents },
  contact: { render: renderContact, init: initContactEvents },
  signup: { render: renderSignup, init: initSignupEvents },
  profile: { render: renderProfile, init: initProfileEvents },
  favorites: { render: renderFavorites, init: initFavoritesEvents }
};

/**
 * Parses current location hash into a route name and a key-value parameter object
 * e.g., "#product?id=verona-tote" -> { route: "product", params: { id: "verona-tote" } }
 * @returns {Object} { route, params }
 */
function parseHash() {
  const hash = window.location.hash || '#home';
  const queryIndex = hash.indexOf('?');
  
  let routePath = queryIndex > -1 ? hash.substring(1, queryIndex) : hash.substring(1);
  const params = {};

  // Default to home if route is empty
  if (!routePath || routePath === '/') {
    routePath = 'home';
  }

  if (queryIndex > -1) {
    const queryString = hash.substring(queryIndex + 1);
    const pairs = queryString.split('&');
    pairs.forEach(pair => {
      const [key, val] = pair.split('=');
      if (key) {
        params[decodeURIComponent(key)] = decodeURIComponent(val || '');
      }
    });
  }

  return { route: routePath, params };
}

let routingTimeout = null;

/**
 * Returns skeleton HTML structure based on route
 */
function getSkeletonHtml(route) {
  if (route === 'home' || route === 'collections') {
    return `
      <div class="container section-padding">
        <div class="skeleton" style="height: 36px; width: 200px; margin: 0 auto 16px auto;"></div>
        <div class="skeleton" style="height: 18px; width: 450px; margin: 0 auto 48px auto;"></div>
        
        <div class="products-grid">
          ${Array(4).fill(0).map(() => `
            <div>
              <div class="skeleton" style="aspect-ratio: 1/1; margin-bottom: 20px;"></div>
              <div class="skeleton" style="height: 12px; width: 30%; margin-bottom: 10px;"></div>
              <div class="skeleton" style="height: 20px; width: 75%; margin-bottom: 10px;"></div>
              <div class="skeleton" style="height: 16px; width: 20%; margin-bottom: 24px;"></div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <div class="skeleton" style="height: 38px;"></div>
                <div class="skeleton" style="height: 38px;"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (route === 'product') {
    return `
      <div class="container section-padding">
        <div class="skeleton" style="height: 16px; width: 300px; margin-bottom: 32px;"></div>
        <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 80px; align-items: start;">
          <div class="skeleton" style="aspect-ratio: 1/1;"></div>
          <div>
            <div class="skeleton" style="height: 12px; width: 25%; margin-bottom: 16px;"></div>
            <div class="skeleton" style="height: 44px; width: 70%; margin-bottom: 20px;"></div>
            <div class="skeleton" style="height: 28px; width: 30%; margin-bottom: 32px;"></div>
            
            <div class="skeleton" style="height: 18px; width: 95%; margin-bottom: 12px;"></div>
            <div class="skeleton" style="height: 18px; width: 90%; margin-bottom: 12px;"></div>
            <div class="skeleton" style="height: 18px; width: 85%; margin-bottom: 40px;"></div>
            
            <div class="skeleton" style="height: 28px; width: 40%; margin-bottom: 16px;"></div>
            <div class="skeleton" style="height: 48px; width: 100%; margin-bottom: 24px;"></div>
            <div class="skeleton" style="height: 60px; width: 100%; margin-bottom: 40px;"></div>
          </div>
        </div>
      </div>
    `;
  } else {
    return `
      <div class="container section-padding">
        <div class="skeleton" style="height: 40px; width: 250px; margin-bottom: 40px; margin-top: 40px;"></div>
        <div class="skeleton" style="height: 20px; width: 100%; margin-bottom: 16px;"></div>
        <div class="skeleton" style="height: 20px; width: 95%; margin-bottom: 16px;"></div>
        <div class="skeleton" style="height: 20px; width: 88%; margin-bottom: 16px;"></div>
        <div class="skeleton" style="height: 20px; width: 92%; margin-bottom: 16px;"></div>
        <div class="skeleton" style="height: 20px; width: 50%; margin-bottom: 16px;"></div>
      </div>
    `;
  }
}

/**
 * Router transition controller
 */
function handleRouting() {
  const { route, params } = parseHash();
  const root = qs('#app-view-root');
  
  if (!root) return;

  // Route Protection: if user wants profile and is guest, redirect to signup
  if (route === 'profile' && !auth.getUser()) {
    window.location.hash = '#signup';
    return;
  }

  const activeRoute = routes[route] || routes['home'];

  // Clear pending routing
  if (routingTimeout) {
    clearTimeout(routingTimeout);
  }

  // Scroll to top immediately on page change
  window.scrollTo(0, 0);

  // Render skeleton screen instantly
  root.innerHTML = getSkeletonHtml(route);

  // Update navbar active styling immediately for snappy feel
  updateActiveNavLink(route);

  // Render actual content after 350ms delay for premium loading experience
  routingTimeout = setTimeout(() => {
    // Render view
    root.innerHTML = activeRoute.render(params);

    // Initialize view events
    activeRoute.init(params);

    // Trigger page transition fade animation
    root.style.animation = 'none';
    void root.offsetWidth; // trigger reflow
    root.style.animation = 'pageFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';

    routingTimeout = null;
  }, 350);
}

export function initRouter() {
  // Bind events
  window.addEventListener('hashchange', handleRouting);
  window.addEventListener('DOMContentLoaded', handleRouting);
  
  // Call immediately to handle initial load
  handleRouting();
}
