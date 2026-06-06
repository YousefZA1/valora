import { products } from '../data/products.js';
import { renderProductCard } from '../components/productCard.js';
import { qs, qsa, initScrollAnimations } from '../utils/helpers.js';

export function renderCollections(params = {}) {
  // Read category from query parameters (e.g. #collections?category=tote-bags)
  const activeCategory = params.category || 'all';

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'tote-bags', name: 'Tote Bags' },
    { id: 'handbags', name: 'Handbags' },
    { id: 'crossbody-bags', name: 'Crossbody Bags' },
    { id: 'mini-bags', name: 'Mini Bags' }
  ];

  return `
    <div class="container section-padding">
      <!-- Page Header -->
      <div class="text-center animate-fade-up visible">
        <span style="
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.85rem;
          color: var(--color-gold);
          font-weight: 600;
          margin-bottom: 12px;
          display: block;
        ">VALORA BAGS</span>
        <h1 class="luxury-title" style="margin-bottom: 16px;">Our Collections</h1>
        <p class="subtitle">Elevate your presence with our exquisite leather creations, designed in detail for luxury fashion.</p>
      </div>

      <!-- Minimalist Search Input -->
      <div style="max-width: 440px; margin: 0 auto var(--space-2xl) auto; position: relative;" class="animate-fade-up visible">
        <input type="text" id="product-search" placeholder="Search collections..." style="
          width: 100%;
          padding: 14px var(--space-lg) 14px 44px;
          border: none;
          border-bottom: 1px solid var(--color-gray-300);
          font-family: var(--font-body);
          font-size: var(--font-size-base);
          color: var(--color-black);
          background: transparent;
          transition: border-bottom-color var(--transition-fast);
        ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--color-gray-500)" style="width: 20px; height: 20px; position: absolute; left: 12px; top: 50%; transform: translateY(-50%); pointer-events: none;">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
        </svg>
      </div>

      <style>
        #product-search:focus {
          outline: none;
          border-bottom-color: var(--color-burgundy);
        }
      </style>

      <!-- Categories Filter bar -->
      <div style="
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: var(--space-sm);
        margin-bottom: var(--space-2xl);
      " class="animate-fade-up visible">
        ${categories.map(cat => {
          const isActive = cat.id === activeCategory;
          const activeClass = isActive ? 'btn-primary' : 'btn-secondary';
          return `
            <button class="btn ${activeClass} filter-btn" data-category="${cat.id}">
              ${cat.name}
            </button>
          `;
        }).join('')}
      </div>

      <!-- Products catalog grid -->
      <div class="products-grid" id="collections-grid">
        <!-- Grid items filled by JS -->
      </div>
    </div>
  `;
}

export function initCollectionsEvents(params = {}) {
  let activeCategory = params.category || 'all';
  let searchQuery = '';

  const searchInput = qs('#product-search');

  function applyFilters() {
    filterProducts(activeCategory, searchQuery);
  }

  // Run initial filtering
  applyFilters();

  // Bind filter button click events
  qsa('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Update button styles
      qsa('.filter-btn').forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-secondary');
      });
      btn.classList.add('btn-primary');
      btn.classList.remove('btn-secondary');

      activeCategory = btn.getAttribute('data-category');
      applyFilters();
      
      // Update hash without triggering a full page re-render
      const newHash = activeCategory === 'all' ? '#collections' : `#collections?category=${activeCategory}`;
      history.pushState(null, null, newHash);
    });
  });

  // Bind search input events
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      applyFilters();
    });
  }
}

function filterProducts(category, query = '') {
  const grid = qs('#collections-grid');
  if (!grid) return;

  let filtered = category === 'all'
    ? products
    : products.filter(p => p.category === category);

  if (query) {
    const term = query.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.categoryName.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  }

  if (filtered.length === 0) {
    if (query) {
      // Search Results Not Found Empty State
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 80px 24px; max-width: 500px; margin: 0 auto;" class="animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="var(--color-gray-300)" style="width: 64px; height: 64px; margin: 0 auto 24px auto;">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
          </svg>
          <h3 style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 400; color: var(--color-black); margin-bottom: 12px;">No Search Results Found</h3>
          <p style="font-family: var(--font-body); font-size: 1rem; color: var(--color-gray-500); line-height: 1.6; margin-bottom: 24px;">We couldn't find any luxury handbags matching "${query}". Please check your spelling or search for another term.</p>
          <button class="btn btn-primary" id="clear-search-btn" style="border-radius: 0;">Clear Search</button>
        </div>
      `;
      
      const clearBtn = qs('#clear-search-btn');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          const searchInput = qs('#product-search');
          if (searchInput) {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
          }
        });
      }
    } else {
      // No Products Found in Category Empty State
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 80px 24px; max-width: 500px; margin: 0 auto;" class="animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="var(--color-gray-300)" style="width: 64px; height: 64px; margin: 0 auto 24px auto;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <h3 style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 400; color: var(--color-black); margin-bottom: 12px;">No Products Found</h3>
          <p style="font-family: var(--font-body); font-size: 1rem; color: var(--color-gray-500); line-height: 1.6; margin-bottom: 24px;">There are currently no luxury pieces listed under this category.</p>
          <button class="btn btn-primary" id="reset-filter-btn" style="border-radius: 0;">Show All Products</button>
        </div>
      `;

      const resetBtn = qs('#reset-filter-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          qsa('.filter-btn').forEach(b => {
            if (b.getAttribute('data-category') === 'all') {
              b.classList.add('btn-primary');
              b.classList.remove('btn-secondary');
            } else {
              b.classList.remove('btn-primary');
              b.classList.add('btn-secondary');
            }
          });
          filterProducts('all', query);
          history.pushState(null, null, '#collections');
        });
      }
    }
    return;
  }

  grid.innerHTML = filtered.map(renderProductCard).join('');
  
  // Re-run scroll fade animations
  initScrollAnimations();
}
