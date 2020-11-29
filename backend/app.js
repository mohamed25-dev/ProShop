const dotenv = require('dotenv');
const express = require('express');
const colors = require('colors');
const app = express();
const products = require('./data/products');

dotenv.config();

app.get('/', (req, res) => {
  res.send('API is Listening !!');
});

app.get('/api/products', async (req, res) => {
  res.send(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.send(product);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    `Node is runnig in ${process.env.NODE_ENV}, Listening on PORT ${PORT}`.blue
      .bold
  );
});
