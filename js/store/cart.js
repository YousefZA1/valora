import { storage } from '../utils/storage.js';

const CART_KEY = 'valora_cart';

// State initialized from local storage
let cartState = storage.get(CART_KEY, []);

function saveAndNotify() {
  storage.set(CART_KEY, cartState);
  // Dispatch custom event to notify components reactively
  const event = new CustomEvent('cart-updated', { detail: cartState });
  document.dispatchEvent(event);
}

export const cart = {
  /**
   * Get all items in the cart
   * @returns {Array}
   */
  getItems() {
    return [...cartState];
  },

  /**
   * Add an item to the cart
   * @param {Object} product 
   * @param {string} colorName 
   * @param {number} quantity 
   */
  addItem(product, colorName, quantity = 1) {
    const existingIndex = cartState.findIndex(
      item => item.id === product.id && item.color === colorName
    );

    if (existingIndex > -1) {
      cartState[existingIndex].quantity += quantity;
    } else {
      cartState.push({
        id: product.id,
        name: product.name,
        price: product.price,
        color: colorName,
        quantity: quantity,
        image: product.image
      });
    }

    saveAndNotify();
  },

  /**
   * Remove an item from the cart
   * @param {string} productId 
   * @param {string} colorName 
   */
  removeItem(productId, colorName) {
    cartState = cartState.filter(
      item => !(item.id === productId && item.color === colorName)
    );
    saveAndNotify();
  },

  /**
   * Update the quantity of an item in the cart
   * @param {string} productId 
   * @param {string} colorName 
   * @param {number} quantity 
   */
  updateQty(productId, colorName, quantity) {
    const item = cartState.find(
      item => item.id === productId && item.color === colorName
    );

    if (item) {
      item.quantity = Math.max(1, quantity);
      saveAndNotify();
    }
  },

  /**
   * Clear all items from the cart
   */
  clear() {
    cartState = [];
    saveAndNotify();
  },

  /**
   * Get total quantity of items in cart
   * @returns {number}
   */
  getItemCount() {
    return cartState.reduce((total, item) => total + item.quantity, 0);
  },

  /**
   * Calculate subtotal, delivery fee, and grand total
   * @returns {Object} { subtotal, delivery, total }
   */
  getTotals() {
    const subtotal = cartState.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    // Flat delivery rate across Jordan (e.g., 3 JOD, or free if subtotal > 100)
    const delivery = subtotal > 0 ? (subtotal >= 100 ? 0 : 3) : 0;
    const total = subtotal + delivery;

    return { subtotal, delivery, total };
  }
};
