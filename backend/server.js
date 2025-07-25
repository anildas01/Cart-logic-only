// backend/server.js

const express = require('express');
const cors = require('cors');
const { calculateCart } = require('./cartLogic');

const app = express();
app.use(cors());
app.use(express.json());

const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1000 },
  { id: 2, name: "Book", category: "Books", price: 20 },
  { id: 3, name: "T-shirt", category: "Clothing", price: 25 }
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/cart/checkout', (req, res) => {
  const { items, customer } = req.body;
  const result = calculateCart(items, customer);
  res.json(result);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));