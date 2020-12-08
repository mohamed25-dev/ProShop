const dotenv = require('dotenv');
const express = require('express');
const colors = require('colors');
const { dev, prod } = require('./src/middleware/errorMiddleware');

const app = express();

const productRoutes = require('./src/routes/product');
const userRoutes = require('./src/routes/user');
const orderRoutes = require('./src/routes/order');

dotenv.config();
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

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
