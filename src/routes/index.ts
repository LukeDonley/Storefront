import express from 'express';
import products from './api/products';
import users from './api/users';
import orders from './api/orders';
import dashboard from './api/dashboard';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('connected');
});

routes.use('/products', products);
routes.use('/users', users);
routes.use('/orders', orders);
routes.use('/', dashboard);

export default routes;
