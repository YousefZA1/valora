import { storage } from '../utils/storage.js';

const FAVORITES_KEY = 'valora_favorites';

// State initialized from local storage
let favoritesState = storage.get(FAVORITES_KEY, []);

function saveAndNotify() {
  storage.set(FAVORITES_KEY, favoritesState);
  // Dispatch custom event to notify components reactively
  const event = new CustomEvent('favorites-updated', { detail: favoritesState });
  document.dispatchEvent(event);
}

export const favorites = {
  /**
   * Get all favorited product IDs
   * @returns {Array<string>}
   */
  getItems() {
    return [...favoritesState];
  },

  /**
   * Toggle a product ID in favorites
   * @param {string} productId 
   * @returns {boolean} true if added, false if removed
   */
  toggle(productId) {
    const index = favoritesState.indexOf(productId);
    let added = false;
    
    if (index > -1) {
      favoritesState.splice(index, 1);
    } else {
      favoritesState.push(productId);
      added = true;
    }
    
    saveAndNotify();
    return added;
  },

  /**
   * Check if a product is in favorites
   * @param {string} productId 
   * @returns {boolean}
   */
  isFavorite(productId) {
    return favoritesState.includes(productId);
  },

  /**
   * Get count of favorited items
   * @returns {number}
   */
  getCount() {
    return favoritesState.length;
  }
};
