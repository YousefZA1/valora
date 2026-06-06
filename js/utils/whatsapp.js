import { formatCurrency } from './helpers.js';

// Jordan country code is +962. Replace this with the brand's actual WhatsApp number.
const STORE_PHONE = '962790000000'; 

/**
 * Generates a WhatsApp API link with a formatted order message
 * @param {Object} customerInfo - Customer form details
 * @param {Array} items - Cart items
 * @param {Object} totals - Subtotal, delivery, and total
 * @returns {string} The wa.me URL
 */
export function generateWhatsAppLink(customerInfo, items, totals) {
  let message = `🛍️ *NEW ORDER - VALORA BAGS* 🛍️\n\n`;

  message += `👤 *Customer Details:*\n`;
  message += `• *Name:* ${customerInfo.name}\n`;
  message += `• *Phone:* ${customerInfo.phone}\n`;
  message += `• *City:* ${customerInfo.city}\n`;
  message += `• *Area:* ${customerInfo.area}\n`;
  message += `• *Address:* St. ${customerInfo.street}, Bldg. ${customerInfo.building}\n`;
  if (customerInfo.notes && customerInfo.notes.trim()) {
    message += `• *Notes:* ${customerInfo.notes.trim()}\n`;
  }
  message += `\n`;

  message += `👜 *Items Ordered:*\n`;
  items.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    message += `${index + 1}. *${item.name}* (${item.color}) x${item.quantity} - ${formatCurrency(itemTotal)}\n`;
  });
  message += `\n`;

  message += `💵 *Payment Summary:*\n`;
  message += `• *Subtotal:* ${formatCurrency(totals.subtotal)}\n`;
  message += `• *Delivery:* ${totals.delivery === 0 ? 'FREE' : formatCurrency(totals.delivery)}\n`;
  message += `• *Total Amount:* *${formatCurrency(totals.total)}*\n\n`;

  message += `✨ _Order placed from Valora Web Demo. Please confirm availability and delivery time._`;

  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${STORE_PHONE}?text=${encodedText}`;
}
