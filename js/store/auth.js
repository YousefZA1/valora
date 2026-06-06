import { storage } from '../utils/storage.js';

const USERS_KEY = 'valora_users';
const SESSION_KEY = 'valora_session';

// Load stored data
let users = storage.get(USERS_KEY, {});
let currentUser = storage.get(SESSION_KEY, null);

function saveAndNotify() {
  storage.set(USERS_KEY, users);
  storage.set(SESSION_KEY, currentUser);
  
  // Dispatch custom event to update Navbar and views reactively
  const event = new CustomEvent('auth-updated', { detail: currentUser });
  document.dispatchEvent(event);
}

export const auth = {
  /**
   * Get currently logged-in user
   * @returns {Object|null}
   */
  getUser() {
    return currentUser;
  },

  /**
   * Register a new user
   * @param {Object} userData 
   * @returns {boolean} Success status
   */
  signup(userData) {
    const email = userData.email.toLowerCase().trim();
    
    // Check if user already exists
    if (users[email]) {
      return false;
    }

    // Register
    const newUser = {
      ...userData,
      email,
      orderHistory: [] // Track checkout list
    };

    users[email] = newUser;
    currentUser = newUser;
    saveAndNotify();
    return true;
  },

  /**
   * Log in an existing user
   * @param {string} email 
   * @param {string} password 
   * @returns {boolean} Success status
   */
  login(email, password) {
    const lowerEmail = email.toLowerCase().trim();
    const user = users[lowerEmail];

    if (user && user.password === password) {
      currentUser = user;
      saveAndNotify();
      return true;
    }
    return false;
  },

  /**
   * Log out active session
   */
  logout() {
    currentUser = null;
    saveAndNotify();
  },

  /**
   * Update active user profile details
   * @param {Object} updatedData 
   */
  updateProfile(updatedData) {
    if (!currentUser) return;

    const email = currentUser.email;
    const user = users[email];

    if (user) {
      // Keep email, password, and orderHistory constant
      const updatedUser = {
        ...user,
        ...updatedData,
        email,
        password: user.password,
        orderHistory: user.orderHistory
      };

      users[email] = updatedUser;
      currentUser = updatedUser;
      saveAndNotify();
    }
  },

  /**
   * Add checkout order details to history
   * @param {Array} items 
   * @param {Object} totals 
   */
  addOrder(items, totals) {
    if (!currentUser) return;

    const email = currentUser.email;
    const user = users[email];

    if (user) {
      const newOrder = {
        id: 'VAL-' + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        items: [...items],
        totals: { ...totals }
      };

      user.orderHistory.unshift(newOrder); // Add to beginning
      currentUser.orderHistory = user.orderHistory;
      saveAndNotify();
    }
  }
};
