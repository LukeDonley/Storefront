import express from 'express';
import products from './api/products';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('connected');
});

routes.use('/products', products);

export default routes;
