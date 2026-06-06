import { cart } from '../store/cart.js';
import { auth } from '../store/auth.js';
import { qs } from '../utils/helpers.js';
import { favorites } from '../store/favorites.js';

export function initNavbar() {
  const header = qs('header');
  if (!header) return;

  // Render Navbar Structure
  header.innerHTML = `
    <nav class="navbar" id="main-navbar">
      <div class="container">
        <!-- Logo -->
        <a href="#home" class="nav-logo">
          <img src="images/logo.png" alt="Valora Bags" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
          <span class="nav-logo-text" style="display: none;">VALORA</span>
        </a>

        <!-- Links Container -->
        <ul class="nav-links" id="nav-links">
          <!-- Injected dynamically -->
        </ul>

        <!-- Actions -->
        <div class="nav-actions">
          <!-- Wishlist / Favorites Icon -->
          <a href="#favorites" class="cart-icon-btn" id="wishlist-toggle" aria-label="View favorites" style="display: inline-flex; transition: transform var(--transition-fast);">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <span class="cart-badge" id="wishlist-badge-count" style="background-color: var(--color-burgundy); border-color: var(--color-white); display: none;">0</span>
          </a>

          <!-- Cart Icon -->
          <button class="cart-icon-btn" id="cart-drawer-toggle" aria-label="Open cart">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span class="cart-badge" id="cart-badge-count">0</span>
          </button>

          <!-- Mobile Burger Menu Button -->
          <button class="menu-toggle-btn" id="menu-toggle-btn" aria-label="Toggle menu">
            <svg id="menu-icon-burger" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 28px; height: 28px;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg id="menu-icon-close" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 28px; height: 28px; display: none;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  `;

  // Menu DOM Elements
  const navbar = qs('#main-navbar');
  const navLinks = qs('#nav-links');
  const toggleBtn = qs('#menu-toggle-btn');
  const burgerIcon = qs('#menu-icon-burger');
  const closeIcon = qs('#menu-icon-close');
  const cartBadge = qs('#cart-badge-count');
  const wishlistBadge = qs('#wishlist-badge-count');

  // Render navigation links list dynamically
  function renderNavLinks() {
    const user = auth.getUser();
    
    let linksHtml = `
      <li><a href="#home" class="nav-link" data-route="home">Home</a></li>
      <li><a href="#collections" class="nav-link" data-route="collections">Collections</a></li>
      <li><a href="#about" class="nav-link" data-route="about">About Us</a></li>
      <li><a href="#contact" class="nav-link" data-route="contact">Contact Us</a></li>
    `;

    if (user) {
      // Logged in: show Profile link with user icon
      linksHtml += `
        <li>
          <a href="#profile" class="nav-link" data-route="profile" style="display: inline-flex; align-items: center; gap: 6px;">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 16px; height: 16px; margin-top:-2px;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            Profile
          </a>
        </li>
      `;
    } else {
      // Guest: show Sign In/Up link
      linksHtml += `
        <li>
          <a href="#signup" class="nav-link" data-route="signup" style="color: var(--color-burgundy); font-weight: 600;">
            Sign In
          </a>
        </li>
      `;
    }

    navLinks.innerHTML = linksHtml;

    // Rebind hamburger close events to new dynamically rendered links
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        burgerIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      });
    });
    
    // Update active route styling after re-rendering links
    const hash = window.location.hash || '#home';
    const queryIndex = hash.indexOf('?');
    const route = queryIndex > -1 ? hash.substring(1, queryIndex) : hash.substring(1);
    updateActiveNavLink(route || 'home');
  }

  // Sticky Navbar logic
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Hamburger Toggle
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle('open');
    burgerIcon.style.display = isOpen ? 'none' : 'block';
    closeIcon.style.display = isOpen ? 'block' : 'none';
  });

  // Close Mobile Menu on click outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      burgerIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    }
  });

  // Update Cart count badge
  function updateCartBadge() {
    const totalCount = cart.getItemCount();
    cartBadge.textContent = totalCount;
    cartBadge.style.display = totalCount > 0 ? 'flex' : 'none';

    // Trigger bounce animation
    const cartToggleBtn = qs('#cart-drawer-toggle');
    if (cartToggleBtn) {
      cartToggleBtn.classList.remove('bounce');
      void cartToggleBtn.offsetWidth; // trigger reflow
      cartToggleBtn.classList.add('bounce');
    }
  }

  // Update Wishlist count badge
  function updateWishlistBadge() {
    const totalCount = favorites.getCount();
    if (wishlistBadge) {
      wishlistBadge.textContent = totalCount;
      wishlistBadge.style.display = totalCount > 0 ? 'flex' : 'none';
      
      // Trigger subtle scaling animation on badge update
      const wishlistToggleBtn = qs('#wishlist-toggle');
      if (wishlistToggleBtn) {
        wishlistToggleBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
          wishlistToggleBtn.style.transform = 'none';
        }, 150);
      }
    }
  }

  // Initial render of links and cart
  renderNavLinks();
  updateCartBadge();
  updateWishlistBadge();

  // Reactive listeners
  document.addEventListener('cart-updated', updateCartBadge);
  document.addEventListener('auth-updated', renderNavLinks);
  document.addEventListener('favorites-updated', updateWishlistBadge);
}

/**
 * Updates the active link class in the navigation bar based on the current page route name
 * @param {string} routeName 
 */
export function updateActiveNavLink(routeName) {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    // Check path matching for hash routes
    const href = link.getAttribute('href');
    const route = href ? href.substring(1).split('?')[0] : '';
    if (route === routeName || (routeName === 'signup' && route === 'signup?mode=signin')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
