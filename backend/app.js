const express = require('express');
const app = express();
const products = require('./data');

app.get('/', (req, res) => {
  res.send('API is Listening !!');
});

app.get('/api/products', (req, res) => {
  res.send(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.send(product);
});

app.listen(4000, () => {
  console.log('Node Server is Listening !!');
});
