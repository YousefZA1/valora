import { auth } from '../store/auth.js';
import { qs, formatCurrency } from '../utils/helpers.js';
import { showToast } from '../utils/toast.js';

export function renderProfile() {
  const user = auth.getUser();
  if (!user) {
    // Redirect immediately to signup
    setTimeout(() => { window.location.hash = '#signup'; }, 50);
    return `<div class="container section-padding text-center">Redirecting to login...</div>`;
  }

  const history = user.orderHistory || [];

  return `
    <div class="container section-padding">
      <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-xl);
        border-bottom: 1px solid var(--color-gray-200);
        padding-bottom: var(--space-md);
      ">
        <div>
          <span class="text-caption">Welcome Back</span>
          <h1 class="text-h1" style="font-size: var(--font-size-2xl); margin-top: var(--space-xs);">${user.name}</h1>
        </div>
        <button class="btn btn-secondary" id="auth-logout-btn">Log Out</button>
      </div>

      <div style="
        display: grid;
        grid-template-columns: 1fr 1.3fr;
        gap: var(--space-3xl);
        align-items: start;
      " id="profile-layout">
        
        <!-- Left: Edit profile info -->
        <div style="
          background-color: var(--color-gray-100);
          padding: var(--space-xl);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
        ">
          <h2 class="text-h3" style="font-size: var(--font-size-lg); margin-bottom: var(--space-md); border-bottom: 1px solid var(--color-gray-200); padding-bottom: var(--space-sm);">Profile Information</h2>
          
          <form id="profile-form">
            <div class="form-group">
              <label class="form-label" for="prof-name">Full Name</label>
              <input type="text" id="prof-name" class="form-control" value="${user.name}" required>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="prof-email">Email Address</label>
              <input type="email" id="prof-email" class="form-control" value="${user.email}" disabled style="background-color: var(--color-gray-200); cursor: not-allowed; color: var(--color-gray-500);">
            </div>

            <div class="form-group">
              <label class="form-label" for="prof-phone">Phone Number (WhatsApp)</label>
              <input type="tel" id="prof-phone" class="form-control" value="${user.phone}" required>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md);">
              <div class="form-group">
                <label class="form-label" for="prof-city">City</label>
                <select id="prof-city" class="form-control" required style="cursor: pointer;">
                  <option value="Amman" ${user.city === 'Amman' ? 'selected' : ''}>Amman</option>
                  <option value="Irbid" ${user.city === 'Irbid' ? 'selected' : ''}>Irbid</option>
                  <option value="Zarqa" ${user.city === 'Zarqa' ? 'selected' : ''}>Zarqa</option>
                  <option value="Salt" ${user.city === 'Salt' ? 'selected' : ''}>Salt</option>
                  <option value="Aqaba" ${user.city === 'Aqaba' ? 'selected' : ''}>Aqaba</option>
                  <option value="Madaba" ${user.city === 'Madaba' ? 'selected' : ''}>Madaba</option>
                  <option value="Jerash" ${user.city === 'Jerash' ? 'selected' : ''}>Jerash</option>
                  <option value="Ajloun" ${user.city === 'Ajloun' ? 'selected' : ''}>Ajloun</option>
                  <option value="Karak" ${user.city === 'Karak' ? 'selected' : ''}>Karak</option>
                  <option value="Tafilah" ${user.city === 'Tafilah' ? 'selected' : ''}>Tafilah</option>
                  <option value="Ma'an" ${user.city === "Ma'an" ? 'selected' : ''}>Ma'an</option>
                  <option value="Mafraq" ${user.city === 'Mafraq' ? 'selected' : ''}>Mafraq</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="prof-area">Area / District</label>
                <input type="text" id="prof-area" class="form-control" value="${user.area}" required>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: var(--space-md);">
              <div class="form-group">
                <label class="form-label" for="prof-street">Street Name</label>
                <input type="text" id="prof-street" class="form-control" value="${user.street}" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="prof-bldg">Building No.</label>
                <input type="text" id="prof-bldg" class="form-control" value="${user.building}" required>
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-full" style="padding: 12px 0; margin-top: var(--space-sm);">
              Save Changes
            </button>
          </form>
        </div>

        <!-- Right: Order History -->
        <div>
          <h2 class="text-h3" style="font-size: var(--font-size-lg); margin-bottom: var(--space-md); border-bottom: 1px solid var(--color-gray-200); padding-bottom: var(--space-sm);">Order History</h2>
          
          ${history.length === 0 ? `
            <div style="
              text-align: center;
              padding: var(--space-4xl) var(--space-2xl);
              background-color: var(--color-gray-100);
              border-radius: var(--radius-md);
              color: var(--color-gray-500);
            ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" style="width: 48px; height: 48px; margin: 0 auto 16px auto; color: var(--color-gray-300);">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.722h3.444" />
              </svg>
              <p class="text-body" style="font-size: var(--font-size-sm);">You haven't placed any orders yet.</p>
              <a href="#collections" class="btn btn-secondary" style="margin-top: var(--space-md); padding: 8px 20px; font-size: var(--font-size-xs);">Shop Bags</a>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: var(--space-lg);">
              ${history.map(order => `
                <div style="
                  border: 1px solid var(--color-gray-200);
                  border-radius: var(--radius-md);
                  padding: var(--space-lg);
                  background-color: var(--color-white);
                  box-shadow: var(--shadow-sm);
                ">
                  <!-- Order Header -->
                  <div style="
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid var(--color-gray-100);
                    padding-bottom: var(--space-sm);
                    margin-bottom: var(--space-md);
                  ">
                    <div>
                      <span style="font-weight: 600; color: var(--color-burgundy); font-size: var(--font-size-base);">ID: ${order.id}</span>
                      <p style="font-size: var(--font-size-sm); color: var(--color-gray-500); margin-top: var(--space-xs);">Placed on: ${order.date}</p>
                    </div>
                    <div style="text-align: right;">
                      <span style="font-size: var(--font-size-xs); color: var(--color-gold); font-weight: 600; text-transform: uppercase;">WhatsApp Sent</span>
                      <p style="font-weight: bold; font-size: var(--font-size-md); color: var(--color-wine); margin-top: var(--space-xs);">${formatCurrency(order.totals.total)}</p>
                    </div>
                  </div>

                  <!-- Order Items -->
                  <div style="display: flex; flex-direction: column; gap: var(--space-xs);">
                    ${order.items.map(item => `
                      <div style="display: flex; justify-content: space-between; font-size: var(--font-size-base);">
                        <span style="color: var(--color-gray-700);">
                          • ${item.name} (${item.color}) <strong style="color: var(--color-black);">x${item.quantity}</strong>
                        </span>
                        <span style="font-weight: 500;">${formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>

      </div>
    </div>

    <style>
      @media (max-width: 900px) {
        #profile-layout {
          grid-template-columns: 1fr !important;
          gap: 40px !important;
        }
      }
    </style>
  `;
}

export function initProfileEvents() {
  const user = auth.getUser();
  if (!user) return;

  // Logout trigger
  qs('#auth-logout-btn').addEventListener('click', () => {
    auth.logout();
    window.location.hash = '#home';
  });

  // Profile Form update submit
  qs('#profile-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const updatedData = {
      name: qs('#prof-name').value,
      phone: qs('#prof-phone').value,
      city: qs('#prof-city').value,
      area: qs('#prof-area').value,
      street: qs('#prof-street').value,
      building: qs('#prof-bldg').value
    };

    auth.updateProfile(updatedData);

    // Show success toast
    showToast('Your profile changes have been saved successfully!');
  });
}
