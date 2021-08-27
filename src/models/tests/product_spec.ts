import { isExportDeclaration } from 'typescript';
import { Product, ProductStore } from '../product';

const store = new ProductStore();

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });

  it('create method should add a product', async () => {
    const result = await store.create({
      id: 1,
      name: 'Laptop',
      type: 'Apple',
      weight: 3
    });
    expect(result).toEqual({
      id: 1,
      name: 'Laptop',
      type: 'Apple',
      weight: 3
    });
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        name: 'Laptop',
        type: 'Apple',
        weight: 3
      }
    ]);
  });

  it('show method should return the correct product', async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      id: 1,
      name: 'Laptop',
      type: 'Apple',
      weight: 3
    });
  });

  it('delete method should remove the product', async () => {
    store.delete(1);
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
