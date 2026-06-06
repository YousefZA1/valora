import { cart } from '../store/cart.js';
import { auth } from '../store/auth.js';
import { generateWhatsAppLink } from '../utils/whatsapp.js';
import { qs, formatCurrency } from '../utils/helpers.js';

export function renderCart() {
  const items = cart.getItems();

  if (items.length === 0) {
    return `
      <div class="container section-padding text-center animate-fade-in" style="min-height: 60vh; display: flex; align-items: center; justify-content: center;">
        <div style="max-width: 440px; margin: 0 auto;">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.8" stroke="var(--color-gray-300)" style="width: 72px; height: 72px; margin: 0 auto 28px auto;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <h2 style="font-family: var(--font-display); font-size: 2.2rem; font-weight: 300; letter-spacing: -0.01em; color: var(--color-black); margin-bottom: 16px;">Your Bag is Empty</h2>
          <p style="font-family: var(--font-body); font-size: 1.05rem; color: var(--color-gray-500); line-height: 1.7; margin-bottom: 36px; font-weight: 300;">You haven't added any luxury pieces to your bag yet. Browse our collections to find a silhouette that complements your style.</p>
          <a href="#collections" class="btn btn-primary" style="border-radius: 0; padding: 16px 36px; font-size: 0.9rem; letter-spacing: 1.5px;">Explore Collections</a>
        </div>
      </div>
    `;
  }

  const totals = cart.getTotals();
  const user = auth.getUser();

  // Prefill values if logged in
  const nameVal = user ? user.name : '';
  const phoneVal = user ? user.phone : '';
  const cityVal = user ? user.city : '';
  const areaVal = user ? user.area : '';
  const streetVal = user ? user.street : '';
  const bldgVal = user ? user.building : '';

  return `
    <div class="container section-padding">
      <h1 class="luxury-title" style="margin-bottom: var(--space-xl);">Shopping Bag</h1>
      
      <div class="cart-page-grid" id="cart-page-layout">
        
        <!-- Left Side: Items list -->
        <div>
          <h2 style="font-size: var(--font-size-lg); margin-bottom: var(--space-md); border-bottom: 1px solid var(--color-gray-200); padding-bottom: var(--space-sm);">Items Review</h2>
          
          <div id="cart-page-items-wrapper">
            ${items.map(item => `
              <div class="cart-page-item">
                <!-- Image -->
                <div class="cart-item-image">
                  <img src="${item.image}" alt="${item.name}">
                </div>
                
                <!-- Details container -->
                <div class="cart-item-details">
                  <div class="cart-item-main">
                    <h3 style="font-family: var(--font-display); font-size: var(--font-size-md); margin-bottom: var(--space-xs);">${item.name}</h3>
                    <p style="font-size: var(--font-size-sm); color: var(--color-gray-500); margin-bottom: var(--space-sm);">Color: ${item.color}</p>
                    
                    <button class="cart-page-item-remove" data-id="${item.id}" data-color="${item.color}">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 16px; height: 16px;">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                      Remove Item
                    </button>
                  </div>
                  
                  <div class="cart-item-actions">
                    <span style="font-weight: 600; font-size: var(--font-size-md); color: var(--color-burgundy);">${formatCurrency(item.price * item.quantity)}</span>
                    
                    <div class="qty-controls" style="width: 110px; height: 36px;">
                      <button class="qty-btn page-qty-minus" data-id="${item.id}" data-color="${item.color}">−</button>
                      <span class="qty-val">${item.quantity}</span>
                      <button class="qty-btn page-qty-plus" data-id="${item.id}" data-color="${item.color}">+</button>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right Side: Delivery Form & Checkout -->
        <div class="checkout-summary-card">
          <h2 style="font-size: var(--font-size-lg); margin-bottom: var(--space-md); border-bottom: 1px solid var(--color-gray-200); padding-bottom: var(--space-sm);">Delivery Information</h2>
          
          <form id="checkout-form">
            <!-- Name -->
            <div class="form-group">
              <label class="form-label" for="cust-name">Full Name *</label>
              <input type="text" id="cust-name" class="form-control" placeholder="e.g. Yasmin Ahmad" value="${nameVal}" required>
            </div>
            
            <!-- Phone -->
            <div class="form-group">
              <label class="form-label" for="cust-phone">Phone Number (WhatsApp) *</label>
              <input type="tel" id="cust-phone" class="form-control" placeholder="e.g. 0791234567" value="${phoneVal}" required>
            </div>

            <!-- Address grid -->
            <div class="checkout-form-grid">
              <div class="form-group">
                <label class="form-label" for="cust-city">City *</label>
                <select id="cust-city" class="form-control" required style="cursor: pointer;">
                  <option value="" disabled ${!cityVal ? 'selected' : ''}>Select City</option>
                  <option value="Amman" ${cityVal === 'Amman' ? 'selected' : ''}>Amman</option>
                  <option value="Irbid" ${cityVal === 'Irbid' ? 'selected' : ''}>Irbid</option>
                  <option value="Zarqa" ${cityVal === 'Zarqa' ? 'selected' : ''}>Zarqa</option>
                  <option value="Salt" ${cityVal === 'Salt' ? 'selected' : ''}>Salt</option>
                  <option value="Aqaba" ${cityVal === 'Aqaba' ? 'selected' : ''}>Aqaba</option>
                  <option value="Madaba" ${cityVal === 'Madaba' ? 'selected' : ''}>Madaba</option>
                  <option value="Jerash" ${cityVal === 'Jerash' ? 'selected' : ''}>Jerash</option>
                  <option value="Ajloun" ${cityVal === 'Ajloun' ? 'selected' : ''}>Ajloun</option>
                  <option value="Karak" ${cityVal === 'Karak' ? 'selected' : ''}>Karak</option>
                  <option value="Tafilah" ${cityVal === 'Tafilah' ? 'selected' : ''}>Tafilah</option>
                  <option value="Ma'an" ${cityVal === "Ma'an" ? 'selected' : ''}>Ma'an</option>
                  <option value="Mafraq" ${cityVal === 'Mafraq' ? 'selected' : ''}>Mafraq</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="cust-area">Area / District *</label>
                <input type="text" id="cust-area" class="form-control" placeholder="e.g. Abdoun" value="${areaVal}" required>
              </div>
            </div>

            <div class="checkout-form-grid-3-2">
              <div class="form-group">
                <label class="form-label" for="cust-street">Street Name *</label>
                <input type="text" id="cust-street" class="form-control" placeholder="e.g. Medina St." value="${streetVal}" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="cust-bldg">Bldg. Number *</label>
                <input type="text" id="cust-bldg" class="form-control" placeholder="e.g. 14" value="${bldgVal}" required>
              </div>
            </div>

            <!-- Notes -->
            <div class="form-group">
              <label class="form-label" for="cust-notes">Additional Notes (Optional)</label>
              <textarea id="cust-notes" class="form-control" placeholder="e.g. Call before delivery, or gate passcode"></textarea>
            </div>
            
            <!-- Summary calculations -->
            <div style="
              border-top: 1px solid var(--color-gray-300);
              padding-top: var(--space-md);
              margin: var(--space-lg) 0;
            ">
              <div class="totals-row" style="margin-bottom: var(--space-sm); font-size: var(--font-size-base);">
                <span>Subtotal</span>
                <span>${formatCurrency(totals.subtotal)}</span>
              </div>
              <div class="totals-row" style="margin-bottom: var(--space-sm); font-size: var(--font-size-base);">
                <span>Delivery across Jordan</span>
                <span>${totals.delivery === 0 ? 'FREE' : formatCurrency(totals.delivery)}</span>
              </div>
              <div class="totals-row final" style="font-size: var(--font-size-xl); border: none; padding: 0; margin-top: var(--space-md);">
                <span>Grand Total</span>
                <span>${formatCurrency(totals.total)}</span>
              </div>
            </div>

            <!-- WhatsApp checkout submit -->
            <button type="submit" class="btn btn-primary btn-full" style="padding: 18px 0; font-size: 0.95rem; border-radius: 0; letter-spacing: 1px;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 20px; height: 20px; margin-right: 8px; display: inline-block; vertical-align: middle;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
              Place Order via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>


  `;
}

export function initCartEvents() {
  const items = cart.getItems();
  if (items.length === 0) return;

  const wrapper = qs('#cart-page-items-wrapper');
  const form = qs('#checkout-form');

  // Quantity control listeners
  wrapper.querySelectorAll('.page-qty-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const color = btn.getAttribute('data-color');
      const item = items.find(i => i.id === id && i.color === color);
      if (item) cart.updateQty(id, color, item.quantity - 1);
    });
  });

  wrapper.querySelectorAll('.page-qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const color = btn.getAttribute('data-color');
      const item = items.find(i => i.id === id && i.color === color);
      if (item) cart.updateQty(id, color, item.quantity + 1);
    });
  });

  wrapper.querySelectorAll('.cart-page-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const color = btn.getAttribute('data-color');
      cart.removeItem(id, color);
    });
  });

  // Submit checkout form logic
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const customerInfo = {
      name: qs('#cust-name').value,
      phone: qs('#cust-phone').value,
      city: qs('#cust-city').value,
      area: qs('#cust-area').value,
      street: qs('#cust-street').value,
      building: qs('#cust-bldg').value,
      notes: qs('#cust-notes').value
    };

    // Save order history if logged in
    if (auth.getUser()) {
      auth.addOrder(items, cart.getTotals());
    }

    const link = generateWhatsAppLink(customerInfo, items, cart.getTotals());
    
    // Open WhatsApp in new tab
    window.open(link, '_blank');

    // Clear cart and redirect to home after checkout
    cart.clear();
    window.location.hash = '#home';
  });

  // Reactive listener to update totals inside page if cart changes
  document.addEventListener('cart-updated', () => {
    // Force router to re-render cart page if we are still on the cart hash
    if (window.location.hash === '#cart') {
      setTimeout(() => {
        const root = qs('#app-view-root');
        if (root) {
          root.innerHTML = renderCart();
          initCartEvents();
        }
      }, 50);
    }
  });
}
