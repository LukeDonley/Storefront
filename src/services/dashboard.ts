// @ts-ignore
import Client from '../database';

export class DashboardQueries {
  async productsInOrders(): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT name, price, order_id FROM products INNER JOIN order_products ON product.id = order_products.id';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products and orders: ${err}`);
    }
  }

  async usersWithOrders(): Promise<{ firstName: string; lastName: string }[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT firstName, lastName FROM users INNER JOIN orders ON user.id = orders.user_id';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable to get users with orders: ${err}`);
    }
  }

  async fiveMostExpensive(): Promise<{ name: string; price: number }[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT name, price FROM products ORDER BY price DESC LIMIT 5';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable to get most expensive products. ${err}`);
    }
  }
}
