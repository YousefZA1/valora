import { cart } from '../store/cart.js';
import { qs, formatCurrency } from '../utils/helpers.js';

export function initCartDrawer() {
  // Append Cart Drawer to body if not already present
  if (qs('#cart-drawer-overlay')) return;

  const drawerContainer = document.createElement('div');
  drawerContainer.innerHTML = `
    <!-- Overlay Background -->
    <div class="cart-drawer-overlay" id="cart-drawer-overlay"></div>
    
    <!-- Cart Sidebar Panel -->
    <div class="cart-drawer" id="cart-drawer">
      <!-- Header -->
      <div class="cart-drawer-header">
        <h3 style="font-size: 1.5rem;">Shopping Bag</h3>
        <button class="cart-drawer-close" id="cart-drawer-close-btn" aria-label="Close cart">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 24px; height: 24px;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Scrollable Items List -->
      <div class="cart-drawer-items" id="cart-drawer-items-list">
        <!-- Rendered dynamically -->
      </div>

      <!-- Footer (Totals & Action Buttons) -->
      <div class="cart-drawer-footer" id="cart-drawer-footer-actions">
        <!-- Rendered dynamically -->
      </div>
    </div>
  `;

  document.body.appendChild(drawerContainer);

  const overlay = qs('#cart-drawer-overlay');
  const drawer = qs('#cart-drawer');
  const closeBtn = qs('#cart-drawer-close-btn');

  // Toggle Drawer open/close
  function openDrawer() {
    overlay.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden'; // prevent page scroll
    renderDrawerContent();
  }

  function closeDrawer() {
    overlay.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = ''; // restore page scroll
  }

  // Open Drawer from Navbar toggle
  document.addEventListener('click', (e) => {
    if (e.target.closest('#cart-drawer-toggle') || e.target.closest('.add-to-cart-quick-btn')) {
      openDrawer();
    }
  });

  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  // Re-render dynamically
  function renderDrawerContent() {
    const itemsList = qs('#cart-drawer-items-list');
    const footerActions = qs('#cart-drawer-footer-actions');
    const items = cart.getItems();

    if (items.length === 0) {
      itemsList.innerHTML = `
        <div class="cart-drawer-empty" style="padding: 80px 24px; text-align: center;">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.8" stroke="var(--color-gray-300)" style="width: 56px; height: 56px; margin: 0 auto 24px auto;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <h4 style="font-family: var(--font-display); font-size: 1.3rem; font-weight: 400; color: var(--color-black); margin-bottom: 8px;">Your Bag is Empty</h4>
          <p style="font-size: 0.9rem; color: var(--color-gray-500); line-height: 1.6; max-width: 260px; margin: 0 auto 24px auto; font-weight: 300;">Explore our collections of premium leather handbags to find your next piece.</p>
          <a href="#collections" class="btn btn-primary" style="margin-top: 12px; border-radius: 0; padding: 12px 24px; font-size: 0.8rem; letter-spacing: 1px;" id="drawer-shop-now-btn">Shop Collections</a>
        </div>
      `;
      footerActions.style.display = 'none';

      // Connect Shop Now inside drawer to close drawer
      const shopBtn = qs('#drawer-shop-now-btn');
      if (shopBtn) shopBtn.addEventListener('click', closeDrawer);
      return;
    }

    footerActions.style.display = 'block';

    // Render Items
    itemsList.innerHTML = items.map(item => `
      <div class="cart-drawer-item">
        <div class="cart-drawer-item-img">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-drawer-item-info">
          <h4 class="cart-drawer-item-name">${item.name}</h4>
          <p class="cart-drawer-item-color">Color: ${item.color}</p>
          
          <div class="cart-drawer-item-price-qty">
            <span class="cart-drawer-item-price">${formatCurrency(item.price)}</span>
            
            <div class="qty-controls">
              <button class="qty-btn drawer-qty-minus" data-id="${item.id}" data-color="${item.color}">−</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn drawer-qty-plus" data-id="${item.id}" data-color="${item.color}">+</button>
            </div>
          </div>
          <button class="cart-drawer-item-remove" data-id="${item.id}" data-color="${item.color}">Remove</button>
        </div>
      </div>
    `).join('');

    // Render totals and checkout links
    const totals = cart.getTotals();
    footerActions.innerHTML = `
      <div class="cart-drawer-totals">
        <div class="totals-row">
          <span>Subtotal</span>
          <span>${formatCurrency(totals.subtotal)}</span>
        </div>
        <div class="totals-row">
          <span>Delivery</span>
          <span>${totals.delivery === 0 ? 'FREE' : formatCurrency(totals.delivery)}</span>
        </div>
        <div class="totals-row final">
          <span>Total</span>
          <span>${formatCurrency(totals.total)}</span>
        </div>
      </div>
      <a href="#cart" class="btn btn-primary btn-full" id="drawer-checkout-btn">Checkout Order</a>
    `;

    // Connect checkout button to close drawer
    qs('#drawer-checkout-btn').addEventListener('click', closeDrawer);

    // Attach quantity adjustment click events
    itemsList.querySelectorAll('.drawer-qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const color = btn.getAttribute('data-color');
        const item = items.find(i => i.id === id && i.color === color);
        if (item) cart.updateQty(id, color, item.quantity - 1);
      });
    });

    itemsList.querySelectorAll('.drawer-qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const color = btn.getAttribute('data-color');
        const item = items.find(i => i.id === id && i.color === color);
        if (item) cart.updateQty(id, color, item.quantity + 1);
      });
    });

    itemsList.querySelectorAll('.cart-drawer-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const color = btn.getAttribute('data-color');
        cart.removeItem(id, color);
      });
    });
  }

  // Listen for global cart updates
  document.addEventListener('cart-updated', () => {
    if (drawer.classList.contains('open')) {
      renderDrawerContent();
    }
  });
}
