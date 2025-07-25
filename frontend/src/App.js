// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loyaltyLevel, setLoyaltyLevel] = useState('Silver');
  const [checkout, setCheckout] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(i => i.id === product.id);
      if (found) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id, qty) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const handleCheckout = () => {
    fetch('http://localhost:4000/cart/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, customer: { loyaltyLevel } })
    })
      .then(res => res.json())
      .then(setCheckout);
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h1>Smart Shopping Cart</h1>
      <div>
        <label>Loyalty Level: </label>
        <select value={loyaltyLevel} onChange={e => setLoyaltyLevel(e.target.value)}>
          <option>Bronze</option>
          <option>Silver</option>
          <option>Gold</option>
        </select>
      </div>
      <ProductList products={products} addToCart={addToCart} />
      <Cart
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        checkout={checkout}
        handleCheckout={handleCheckout}
      />
    </div>
  );
}

export default App;