import express, { Request, Response } from 'express';

import { DashboardQueries } from '../../services/dashboard';

const dashboard = express.Router();

const store = new DashboardQueries();

dashboard.get('/products-in-orders', async (req: Request, res: Response) => {
  const products = await store.productsInOrders();
  res.json(products);
});

dashboard.get('/users-with-orders', async (req: Request, res: Response) => {
  const users = await store.usersWithOrders();
  res.json(users);
});

dashboard.get('/five-most-expensive', async (req: Request, res: Response) => {
  const products = await store.fiveMostExpensive();
  res.json(products);
});

export default dashboard;
