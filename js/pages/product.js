import { products } from '../data/products.js';
import { cart } from '../store/cart.js';
import { renderProductCard } from '../components/productCard.js';
import { qs, qsa, formatCurrency, initScrollAnimations } from '../utils/helpers.js';
import { showToast } from '../utils/toast.js';
import { favorites } from '../store/favorites.js';

export function renderProduct(params = {}) {
  const productId = params.id;
  const product = products.find(p => p.id === productId);

  if (!product) {
    return `
      <div class="container section-padding text-center">
        <h2 class="luxury-title" style="margin-top: 40px;">Product Not Found</h2>
        <p class="subtitle">The handbag you are looking for does not exist or has been removed.</p>
        <a href="#collections" class="btn btn-primary" style="border-radius: 0;">Back to Collections</a>
      </div>
    `;
  }

  // Get related products (same category, excluding current product)
  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);
  
  // If there aren't enough in the same category, grab others
  if (related.length < 3) {
    const extra = products.filter(p => p.id !== product.id && !related.includes(p)).slice(0, 3 - related.length);
    related.push(...extra);
  }

  return `
    <div class="container section-padding">
      <!-- Breadcrumb -->
      <div style="margin-bottom: var(--space-xl); font-size: var(--font-size-sm); text-transform: uppercase; letter-spacing: 1px; color: var(--color-gray-500);">
        <a href="#home" style="transition: color var(--transition-fast);">Home</a> &nbsp;/&nbsp; 
        <a href="#collections" style="transition: color var(--transition-fast);">Collections</a> &nbsp;/&nbsp; 
        <a href="#collections?category=${product.category}" style="transition: color var(--transition-fast);">${product.categoryName}</a> &nbsp;/&nbsp; 
        <span style="color: var(--color-black); font-weight: 500;">${product.name}</span>
      </div>

      <div class="product-detail-grid" id="product-detail-layout">
        
        <!-- Left Column: Product Image with Zoom -->
        <div style="
          background-color: var(--color-gray-100);
          border-radius: 0;
          overflow: hidden;
          aspect-ratio: 1/1;
          border: 1px solid var(--color-gray-200);
        " id="product-main-image-container">
          <img src="${product.image}" alt="${product.name}" style="
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          " id="product-main-image">
        </div>

        <!-- Right Column: Info & Actions -->
        <div>
          <span class="text-caption" style="margin-bottom: var(--space-sm); display: block;">${product.categoryName}</span>
          <h1 class="text-h1" style="font-size: var(--font-size-3xl); font-weight: 300; margin-bottom: var(--space-md);">${product.name}</h1>
          <p style="
            font-family: var(--font-body);
            font-size: var(--font-size-xl);
            font-weight: 500;
            color: var(--color-burgundy);
            margin-bottom: var(--space-lg);
          ">${formatCurrency(product.price)}</p>
 
          <p class="text-body" style="
            margin-bottom: var(--space-xl);
          ">${product.description}</p>

          <!-- Color Picker -->
          <div style="margin-bottom: var(--space-xl);">
            <h4 style="font-size: var(--font-size-sm); text-transform: uppercase; letter-spacing: 1px; margin-bottom: var(--space-sm); font-family: var(--font-body); font-weight: 600; color: var(--color-gray-700);">
              Color: <span id="selected-color-label" style="color: var(--color-burgundy); font-weight: normal; text-transform: none; letter-spacing: 0; margin-left: var(--space-sm);">${product.colors[0].name}</span>
            </h4>
            <div style="display: flex; gap: var(--space-sm);" id="product-colors-wrapper">
              ${product.colors.map((color, idx) => `
                <button class="color-option-btn ${idx === 0 ? 'active' : ''}" 
                  data-color-name="${color.name}" 
                  style="
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background-color: ${color.hex};
                    border: 2px solid ${idx === 0 ? 'var(--color-burgundy)' : 'transparent'};
                    box-shadow: 0 0 0 2px ${idx === 0 ? 'var(--color-white)' : 'var(--color-gray-300)'};
                    position: relative;
                    transition: all var(--transition-fast);
                  " 
                  title="${color.name}">
                </button>
              `).join('')}
            </div>
          </div>
 
          <!-- Quantity Selector -->
          <div style="margin-bottom: var(--space-xl);">
            <h4 style="font-size: var(--font-size-sm); text-transform: uppercase; letter-spacing: 1px; margin-bottom: var(--space-sm); font-family: var(--font-body); font-weight: 600; color: var(--color-gray-700);">
              Quantity:
            </h4>
            <div class="qty-controls" style="width: 130px; height: 48px; border-radius: 0;">
              <button class="qty-btn" id="product-qty-minus" style="font-size: 1.2rem; width: 40px;">−</button>
              <span class="qty-val" id="product-qty-val" style="font-size: 1.1rem; flex-grow: 1;">1</span>
              <button class="qty-btn" id="product-qty-plus" style="font-size: 1.2rem; width: 40px;">+</button>
            </div>
          </div>

          <!-- Add to Cart & Favorite Button Action Row -->
          <div style="display: flex; gap: var(--space-md); margin-bottom: var(--space-md);">
            <button class="btn btn-primary" id="product-add-to-cart-btn" style="flex-grow: 1; padding: 18px 0; font-size: var(--font-size-sm); border-radius: 0; letter-spacing: 1px;">
              Add to Shopping Bag
            </button>
            <button class="favorite-toggle-btn details-fav-btn" data-id="${product.id}" aria-label="Add to favorites">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </button>
          </div>
 
          <!-- Customer Trust Badge -->
          <div style="
            display: flex;
            align-items: center;
            gap: var(--space-md);
            font-size: var(--font-size-sm);
            color: var(--color-gray-700);
            margin-bottom: var(--space-2xl);
            background-color: var(--color-gray-100);
            padding: var(--space-md) var(--space-lg);
            border-left: 3px solid var(--color-gold);
            line-height: 1.5;
          ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--color-gold)" style="width: 20px; height: 20px; flex-shrink: 0;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span><strong>Pay on Delivery:</strong> Inspect the leather details, stitching quality, and metal clasps before paying the courier cash.</span>
          </div>          <!-- Specifications / Details Tabs -->
          <div style="
            border-top: 1px solid var(--color-gray-200);
            padding-top: var(--space-2xl);
          ">
            <!-- Tab Headers -->
            <div style="display: flex; gap: var(--space-xl); border-bottom: 1px solid var(--color-gray-200); margin-bottom: var(--space-lg);">
              <button class="details-tab-btn active" data-tab="tab-desc" style="font-weight: 500; font-size: var(--font-size-sm); text-transform: uppercase; letter-spacing: 1.5px; color: var(--color-burgundy); border-bottom: 2px solid var(--color-gold); padding-bottom: var(--space-sm); transition: all var(--transition-fast);">Description</button>
              <button class="details-tab-btn" data-tab="tab-specs" style="font-weight: 500; font-size: var(--font-size-sm); text-transform: uppercase; letter-spacing: 1.5px; color: var(--color-gray-500); border-bottom: 2px solid transparent; padding-bottom: var(--space-sm); transition: all var(--transition-fast);">Details</button>
              <button class="details-tab-btn" data-tab="tab-shipping" style="font-weight: 500; font-size: var(--font-size-sm); text-transform: uppercase; letter-spacing: 1.5px; color: var(--color-gray-500); border-bottom: 2px solid transparent; padding-bottom: var(--space-sm); transition: all var(--transition-fast);">Shipping & Returns</button>
            </div>
 
            <!-- Tab 1: Description -->
            <div class="details-tab-content" id="tab-desc" class="text-body" style="font-size: var(--font-size-base);">
              <p>${product.description}</p>
            </div>
 
            <!-- Tab 2: Specs -->
            <div class="details-tab-content" id="tab-specs" style="display: none;">
              <table style="width: 100%; border-collapse: collapse; font-size: var(--font-size-sm);">
                <tbody>
                  ${product.details.map(detail => `
                    <tr style="border-bottom: 1px solid var(--color-gray-100);">
                      <td style="padding: var(--space-sm) 0; font-weight: 500; color: var(--color-gray-700); width: 35%;">${detail.label}</td>
                      <td style="padding: var(--space-sm) 0; color: var(--color-black);">${detail.value}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
 
            <!-- Tab 3: Shipping & Returns -->
            <div class="details-tab-content" id="tab-shipping" style="display: none; color: var(--color-gray-700); line-height: 1.8; font-size: var(--font-size-base); font-weight: 300;">
              <p style="margin-bottom: var(--space-sm);"><strong>🚚 Direct Courier Delivery:</strong> We ship directly to your address in Amman, Irbid, Zarqa, Aqaba, and all parts of Jordan. Flat delivery rate of 3 JOD, and free delivery on orders over 100 JOD. Takes 24-48 hours.</p>
              <p><strong>📦 Zero Risk Inspection:</strong> Check the size, color, lining, and zipper mechanism on delivery. You only pay if you are fully satisfied with the bag's craft quality.</p>
            </div>
          </div>  </div>
        </div>
      </div>

      <!-- Related Products Grid -->
      <div style="
        border-top: 1px solid var(--color-gray-200);
        padding-top: var(--space-4xl);
        margin-top: var(--space-2xl);
      ">
        <div class="text-center">
          <h2 class="luxury-title" style="margin-bottom: var(--space-md);">You May Also Like</h2>
          <p class="subtitle">Complete your look with our other hand-selected handbag choices.</p>
        </div>
        
        <div class="products-grid">
          ${related.map(renderProductCard).join('')}
        </div>
      </div>
    </div>

    <style>
      @media (max-width: 992px) {
        #product-detail-layout {
          grid-template-columns: 1fr !important;
          gap: 48px !important;
        }
      }
    </style>
  `;
}

export function initProductEvents(params = {}) {
  const productId = params.id;
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let selectedColor = product.colors[0].name;
  let quantity = 1;

  const colorLabel = qs('#selected-color-label');
  const qtyVal = qs('#product-qty-val');

  // Product main image hover zoom
  const imgContainer = qs('#product-main-image-container');
  const img = qs('#product-main-image');
  if (imgContainer && img) {
    imgContainer.addEventListener('mousemove', (e) => {
      const rect = imgContainer.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      img.style.transformOrigin = `${x}% ${y}%`;
      img.style.transform = 'scale(1.5)';
    });
    imgContainer.style.cursor = 'zoom-in';
    imgContainer.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
      img.style.transformOrigin = 'center center';
    });
  }

  // Specs Accordion / Tab Click Events
  qsa('.details-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Deactivate other tabs
      qsa('.details-tab-btn').forEach(b => {
        b.style.color = 'var(--color-gray-500)';
        b.style.borderBottomColor = 'transparent';
        b.classList.remove('active');
      });

      // Hide all contents
      qsa('.details-tab-content').forEach(c => c.style.display = 'none');

      // Activate clicked
      btn.style.color = 'var(--color-burgundy)';
      btn.style.borderBottomColor = 'var(--color-gold)';
      btn.classList.add('active');

      const tabId = btn.getAttribute('data-tab');
      qs(`#${tabId}`).style.display = 'block';
    });
  });

  // Color Picker Logic
  qsa('.color-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Clear active style
      qsa('.color-option-btn').forEach(b => {
        b.classList.remove('active');
        b.style.borderColor = 'transparent';
        b.style.boxShadow = `0 0 0 2px var(--color-gray-300)`;
      });

      // Apply active style
      btn.classList.add('active');
      btn.style.borderColor = 'var(--color-burgundy)';
      btn.style.boxShadow = `0 0 0 2px var(--color-white)`;

      selectedColor = btn.getAttribute('data-color-name');
      colorLabel.textContent = selectedColor;
    });
  });

  // Quantity controls
  qs('#product-qty-minus').addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      qtyVal.textContent = quantity;
    }
  });

  qs('#product-qty-plus').addEventListener('click', () => {
    quantity++;
    qtyVal.textContent = quantity;
  });

  // Add to cart click event
  qs('#product-add-to-cart-btn').addEventListener('click', () => {
    cart.addItem(product, selectedColor, quantity);
    showToast(`${product.name} (${selectedColor}) added to your shopping bag!`);
  });

  // Set initial favorite button state
  const favBtn = qs('.details-fav-btn');
  if (favBtn) {
    if (favorites.isFavorite(product.id)) {
      favBtn.classList.add('is-favorite');
    } else {
      favBtn.classList.remove('is-favorite');
    }
  }

  // Re-run animations on card loads
  initScrollAnimations();
}
