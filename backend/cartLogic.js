// backend/cartLogic.js

function calculateTax(item) {
    if (item.category === 'Electronics') return item.price * 0.10;
    if (item.category === 'Clothing') return item.price * 0.05;
    return 0;
  }
  
  function itemDiscount(item) {
    if (item.category === 'Electronics' && item.quantity > 2) return 0.15;
    return 0;
  }
  
  function loyaltyDiscount(level) {
    return { Bronze: 0.05, Silver: 0.10, Gold: 0.15 }[level] || 0;
  }
  
  function calculateCart(items, customer) {
    let itemized = [];
    let subtotal = 0;
  
    items.forEach(item => {
      const base = item.price * item.quantity;
      const tax = calculateTax(item) * item.quantity;
      const discountRate = itemDiscount(item);
      const discount = (base + tax) * discountRate;
      const total = base + tax - discount;
      subtotal += total;
      itemized.push({
        ...item,
        base,
        tax,
        discount,
        total
      });
    });
  
    let bulkDiscount = 0;
    if (subtotal > 200) {
      bulkDiscount = subtotal * 0.10;
      subtotal -= bulkDiscount;
    }
  
    const loyaltyRate = loyaltyDiscount(customer.loyaltyLevel);
    const loyaltyDisc = subtotal * loyaltyRate;
    const finalTotal = subtotal - loyaltyDisc;
  
    return {
      items: itemized,
      subtotal: subtotal + bulkDiscount,
      bulkDiscount,
      loyaltyDiscount: loyaltyDisc,
      finalTotal
    };
  }
  
  module.exports = { calculateCart };