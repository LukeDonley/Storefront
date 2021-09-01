import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../../models/order';

const orders = express.Router();

const store = new OrderStore();

orders.get('/', async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    return res.status(400).json(err);
  }
});

orders.get('/:id', async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id);
    res.json(order);
  } catch (err) {
    return res.status(400).json(err);
  }
});

orders.post('/', async (req: Request, res: Response) => {
  const order: Order = {
    user_id: req.body.user_id,
    status: req.body.status
  };

  try {
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// Add A Product To The Order
orders.post('/:id/products', async (req: Request, res: Response) => {
  const orderId: string = req.params.id;
  const productId: string = req.body.productId;
  const quantity: number = req.body.quantity;

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    return res.status(400).json(err);
  }
});

orders.delete('/:id', async (req: Request, res: Response) => {});

export default orders;
