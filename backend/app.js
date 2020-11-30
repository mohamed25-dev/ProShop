const dotenv = require('dotenv');
const express = require('express');
const colors = require('colors');
const { dev, prod } = require('./src/middleware/errorMiddleware');

const app = express();

const productRoutes = require('./src/routes/product');

dotenv.config();

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('API is Listening !!');
});

if (app.get('env') === 'development') {
  app.use(dev);
} else {
  app.use(prod);
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    `Node is runnig in ${process.env.NODE_ENV}, Listening on PORT ${PORT}`.blue
      .bold
  );
});
