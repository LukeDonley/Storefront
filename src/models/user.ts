import { Connection } from 'pg';
import { resolveModuleName } from 'typescript';
// @ts-ignore
import Client from '../database';
import bcrypt from 'bcrypt';

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS || '';

export type User = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = `SELECT * FROM users WHERE id=($1)`;
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const sql = `INSERT INTO users (username, email, firstName, lastName, password) values ($1, $2, $3, $4, $5) RETURNING *`;
      // @ts-ignore
      const conn = await Client.connect();
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      const result = await conn.query(sql, [
        u.username,
        u.email,
        u.firstName,
        u.lastName,
        hash
      ]);
      conn.release();
      console.log(result);
      return result.rows[0];
    } catch (err) {
      console.log(err);
      throw new Error(
        `Could not create new user ${u.firstName} ${u.lastName}. Error: ${err}`
      );
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      console.log(id);
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT password FROM users WHERE username=($1)';
      const result = await conn.query(sql, [username]);
      console.log(result);
      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + pepper, user.password)) {
          return user;
        }
      }

      return null;
    } catch (err) {
      console.log(err);
      throw new Error(
        `Could not authenticate user ${username}}. Error: ${err}`
      );
    }
  }
}
