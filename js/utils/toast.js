/**
 * Creates and displays a premium floating toast notification in the top-right corner.
 * @param {string} message - Notification text
 * @param {string} type - 'success' or 'error'
 */
export function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('valora-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'valora-toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      top: 40px;
      right: 40px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast-message toast-${type}`;
  toast.style.cssText = `
    background: #ffffff;
    color: var(--color-black);
    border: 1px solid var(--color-gray-200);
    padding: 16px 24px;
    font-family: var(--font-body);
    font-size: 0.95rem;
    font-weight: 400;
    letter-spacing: 0.02em;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.06);
    transform: translateX(120%);
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
    opacity: 0;
    pointer-events: auto;
    max-width: 400px;
    min-width: 320px;
  `;
  
  const icon = type === 'success' 
    ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--color-gold)" style="width: 20px; height: 20px;">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
       </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#c92a2a" style="width: 20px; height: 20px;">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
       </svg>`;

  toast.innerHTML = `
    ${icon}
    <div style="flex-grow: 1;">${message}</div>
    <button class="toast-close" style="background:none; border:none; color: var(--color-gray-400); cursor:pointer; font-size:1.1rem; display:flex;">&times;</button>
  `;

  toastContainer.appendChild(toast);

  // Trigger reflow
  void toast.offsetWidth;

  // Animate in
  toast.style.transform = 'translateX(0)';
  toast.style.opacity = '1';

  // Close event handler
  const closeBtn = toast.querySelector('.toast-close');
  const removeToast = () => {
    toast.style.transform = 'translateX(120%)';
    toast.style.opacity = '0';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 600);
  };
  
  closeBtn.addEventListener('click', removeToast);

  // Auto remove after 3.5 seconds
  setTimeout(removeToast, 3500);
}
