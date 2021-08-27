import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../../models/product';

const products = express.Router();

interface productParams extends Request {
  body: Product;
}

const store = new ProductStore();

products.get('/', async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

products.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.body.id);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

products.post('/', async (req: productParams, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      type: req.body.type,
      weight: req.body.weight,
      category: req.body.category
    };
    const newProduct = await store.create(product);
    console.log(newProduct);
    res.json(newProduct);
  } catch (err) {
    res.status(400).send(err);
  }
});

products.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

export default products;
