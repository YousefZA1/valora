import { auth } from '../store/auth.js';
import { qs, qsa } from '../utils/helpers.js';

export function renderSignup(params = {}) {
  // Check if already logged in, if so renderSignup can redirect or render simple check
  const user = auth.getUser();
  if (user) {
    // Redirect immediately to profile
    setTimeout(() => { window.location.hash = '#profile'; }, 50);
    return `<div class="container section-padding text-center" style="min-height: 60vh; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 1.5rem; color: var(--color-gray-600);">Redirecting to your profile...</div>`;
  }

  // Check if we should default to "signin" view or "signup" view
  const defaultMode = params.mode === 'signin' ? 'signin' : 'signup';

  return `
    <style>
      .auth-wrapper {
        display: flex;
        min-height: calc(100vh - var(--nav-height, 80px));
        background-color: #fff;
      }
      .auth-image-col {
        display: none;
      }
      @media (min-width: 992px) {
        .auth-image-col {
          display: block;
          flex: 1;
          background-image: url('images/auth_campaign_bag.jpg');
          background-size: cover;
          background-position: center;
          position: relative;
        }
        .auth-image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.1);
        }
      }
      .auth-form-col {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: var(--space-2xl) var(--space-md);
        max-width: 600px;
        margin: 0 auto;
        width: 100%;
      }
      .auth-form-container {
        width: 100%;
        max-width: 440px;
        margin: 0 auto;
      }
      .auth-header {
        margin-bottom: var(--space-3xl);
        text-align: left;
      }
      .auth-title {
        font-family: var(--font-display);
        font-size: var(--font-size-3xl);
        font-weight: 300;
        color: var(--color-wine);
        margin-bottom: var(--space-sm);
        letter-spacing: -0.02em;
      }
      .auth-subtitle {
        font-family: var(--font-body);
        font-size: var(--font-size-base);
        color: var(--color-gray-500);
        font-weight: 300;
      }
      .auth-tabs {
        display: flex;
        gap: var(--space-xl);
        margin-bottom: var(--space-xl);
        border-bottom: 1px solid var(--color-gray-200);
      }
      .auth-tab {
        background: none;
        border: none;
        padding: 0 0 12px 0;
        font-family: var(--font-body);
        font-size: var(--font-size-base);
        font-weight: 500;
        color: var(--color-gray-400);
        cursor: pointer;
        position: relative;
        transition: color var(--transition-fast) ease;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .auth-tab.active {
        color: var(--color-burgundy);
      }
      .auth-tab::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: transparent;
        transition: background-color var(--transition-fast) ease;
      }
      .auth-tab.active::after {
        background-color: var(--color-gold); /* subtle gold accent */
      }
      .auth-form-group {
        margin-bottom: var(--space-lg);
        position: relative;
      }
      .auth-form-group label {
        display: block;
        font-family: var(--font-body);
        font-size: var(--font-size-sm);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--color-gray-500);
        margin-bottom: var(--space-xs);
        font-weight: 500;
      }
      .auth-form-control {
        width: 100%;
        background: transparent;
        border: none;
        border-bottom: 1px solid var(--color-gray-300);
        padding: var(--space-sm) 0;
        font-family: var(--font-body);
        font-size: var(--font-size-base);
        color: var(--color-black);
        transition: border-color var(--transition-fast) ease;
        border-radius: 0;
      }
      .auth-form-control:focus {
        outline: none;
        border-bottom-color: var(--color-burgundy);
      }
      .auth-form-control::placeholder {
        color: var(--color-gray-300);
        font-weight: 300;
      }
      select.auth-form-control {
        appearance: none;
        cursor: pointer;
      }
      .auth-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-lg);
      }
      .auth-btn {
        width: 100%;
        background-color: var(--color-burgundy);
        color: #fff;
        border: 1px solid var(--color-burgundy);
        padding: 18px;
        font-family: var(--font-body);
        font-size: var(--font-size-sm);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        cursor: pointer;
        transition: all var(--transition-fast) ease;
        margin-top: var(--space-xl);
      }
      .auth-btn:hover {
        background-color: transparent;
        color: var(--color-burgundy);
      }
      .auth-error {
        background-color: #fdf2f2;
        color: #c92a2a;
        padding: 16px;
        font-family: var(--font-body);
        font-size: 0.9rem;
        margin-bottom: 24px;
        border-left: 3px solid #c92a2a;
        display: none;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    </style>
    
    <div class="auth-wrapper">
      <div class="auth-image-col">
        <div class="auth-image-overlay"></div>
      </div>
      
      <div class="auth-form-col">
        <div class="auth-form-container">
          
          <div class="auth-header">
            <h1 class="auth-title">Welcome to Valora</h1>
            <p class="auth-subtitle">Experience luxury and elegance.</p>
          </div>

          <div class="auth-tabs">
            <button class="auth-tab ${defaultMode === 'signin' ? 'active' : ''}" id="toggle-to-signin">Sign In</button>
            <button class="auth-tab ${defaultMode === 'signup' ? 'active' : ''}" id="toggle-to-signup">Create Account</button>
          </div>

          <div id="auth-error-msg" class="auth-error"></div>

          <!-- SIGN IN FORM -->
          <form id="signin-form" style="display: ${defaultMode === 'signin' ? 'block' : 'none'}; animation: fadeIn 0.4s ease;">
            <div class="auth-form-group">
              <label for="si-email">Email Address</label>
              <input type="email" id="si-email" class="auth-form-control" placeholder="Enter your email" required>
            </div>

            <div class="auth-form-group">
              <label for="si-password">Password</label>
              <input type="password" id="si-password" class="auth-form-control" placeholder="••••••••" required>
            </div>

            <button type="submit" class="auth-btn">Sign In</button>
          </form>

          <!-- SIGN UP FORM -->
          <form id="signup-form" style="display: ${defaultMode === 'signup' ? 'block' : 'none'}; animation: fadeIn 0.4s ease;">
            <div class="auth-form-group">
              <label for="su-name">Full Name</label>
              <input type="text" id="su-name" class="auth-form-control" placeholder="Your full name" required>
            </div>
            
            <div class="auth-form-group">
              <label for="su-email">Email Address</label>
              <input type="email" id="su-email" class="auth-form-control" placeholder="Your email address" required>
            </div>

            <div class="auth-form-group">
              <label for="su-phone">Phone Number (WhatsApp)</label>
              <input type="tel" id="su-phone" class="auth-form-control" placeholder="Your phone number" required>
            </div>

            <div class="auth-grid">
              <div class="auth-form-group">
                <label for="su-city">City</label>
                <select id="su-city" class="auth-form-control" required>
                  <option value="" disabled selected>Select City</option>
                  <option value="Amman">Amman</option>
                  <option value="Irbid">Irbid</option>
                  <option value="Zarqa">Zarqa</option>
                  <option value="Salt">Salt</option>
                  <option value="Aqaba">Aqaba</option>
                  <option value="Madaba">Madaba</option>
                  <option value="Jerash">Jerash</option>
                  <option value="Ajloun">Ajloun</option>
                  <option value="Karak">Karak</option>
                  <option value="Tafilah">Tafilah</option>
                  <option value="Ma'an">Ma'an</option>
                  <option value="Mafraq">Mafraq</option>
                </select>
              </div>
              <div class="auth-form-group">
                <label for="su-area">Area / District</label>
                <input type="text" id="su-area" class="auth-form-control" placeholder="e.g. Abdoun" required>
              </div>
            </div>

            <div class="auth-grid">
              <div class="auth-form-group">
                <label for="su-street">Street Name</label>
                <input type="text" id="su-street" class="auth-form-control" placeholder="Street" required>
              </div>
              <div class="auth-form-group">
                <label for="su-bldg">Building No.</label>
                <input type="text" id="su-bldg" class="auth-form-control" placeholder="Building" required>
              </div>
            </div>

            <div class="auth-form-group">
              <label for="su-password">Password</label>
              <input type="password" id="su-password" class="auth-form-control" placeholder="Create a password" required minlength="6">
            </div>

            <button type="submit" class="auth-btn">Create Account</button>
          </form>

        </div>
      </div>
    </div>
  `;
}

export function initSignupEvents(params = {}) {
  const user = auth.getUser();
  if (user) return;

  const btnToSignup = qs('#toggle-to-signup');
  const btnToSignin = qs('#toggle-to-signin');
  
  const signupForm = qs('#signup-form');
  const signinForm = qs('#signin-form');
  const errorMsg = qs('#auth-error-msg');

  // Toggle Forms
  function showSignup() {
    btnToSignup.classList.add('active');
    btnToSignin.classList.remove('active');
    signupForm.style.display = 'block';
    signinForm.style.display = 'none';
    errorMsg.style.display = 'none';
    history.pushState(null, null, '#signup');
  }

  function showSignin() {
    btnToSignin.classList.add('active');
    btnToSignup.classList.remove('active');
    signupForm.style.display = 'none';
    signinForm.style.display = 'block';
    errorMsg.style.display = 'none';
    history.pushState(null, null, '#signup?mode=signin');
  }

  btnToSignup.addEventListener('click', showSignup);
  btnToSignin.addEventListener('click', showSignin);

  // Handle Signup Submit
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    errorMsg.style.display = 'none';

    const userData = {
      name: qs('#su-name').value,
      email: qs('#su-email').value,
      phone: qs('#su-phone').value,
      city: qs('#su-city').value,
      area: qs('#su-area').value,
      street: qs('#su-street').value,
      building: qs('#su-bldg').value,
      password: qs('#su-password').value
    };

    const success = auth.signup(userData);
    if (success) {
      window.location.hash = '#profile';
    } else {
      errorMsg.textContent = 'An account with this email address already exists.';
      errorMsg.style.display = 'block';
    }
  });

  // Handle Signin Submit
  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    errorMsg.style.display = 'none';

    const email = qs('#si-email').value;
    const password = qs('#si-password').value;

    const success = auth.login(email, password);
    if (success) {
      window.location.hash = '#profile';
    } else {
      errorMsg.textContent = 'Invalid email address or password. Please try again.';
      errorMsg.style.display = 'block';
    }
  });
}
