// frontend/src/ProductList.js

import React from 'react';

function ProductList({ products, addToCart }) {
  return (
    <div>
      <h2>Products</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th><th>Category</th><th>Price</th><th></th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>${p.price}</td>
              <td><button onClick={() => addToCart(p)}>Add to Cart</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;