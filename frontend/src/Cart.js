// frontend/src/Cart.js

import React from 'react';

function Cart({ cart, removeFromCart, updateQuantity, checkout, handleCheckout }) {
  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 && <p>Cart is empty.</p>}
      {cart.length > 0 && (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Name</th><th>Qty</th><th>Price</th><th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                  />
                </td>
                <td>${item.price}</td>
                <td><button onClick={() => removeFromCart(item.id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {cart.length > 0 && <button onClick={handleCheckout}>Checkout</button>}

      {checkout && (
        <div style={{ marginTop: 20 }}>
          <h3>Checkout Summary</h3>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Name</th><th>Qty</th><th>Base</th><th>Tax</th><th>Discount</th><th>Total</th>
              </tr>
            </thead>
            <tbody>
              {checkout.items.map(i => (
                <tr key={i.id}>
                  <td>{i.name}</td>
                  <td>{i.quantity}</td>
                  <td>${i.base.toFixed(2)}</td>
                  <td>${i.tax.toFixed(2)}</td>
                  <td>${i.discount.toFixed(2)}</td>
                  <td>${i.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Subtotal: ${checkout.subtotal.toFixed(2)}</p>
          {checkout.bulkDiscount > 0 && <p>Bulk Discount: -${checkout.bulkDiscount.toFixed(2)}</p>}
          <p>Loyalty Discount: -${checkout.loyaltyDiscount.toFixed(2)}</p>
          <h3>Final Total: ${checkout.finalTotal.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
}

export default Cart;