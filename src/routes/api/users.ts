import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserStore } from '../../models/user';

const users = express.Router();

interface userParams extends Request {
  body: User;
}

const store = new UserStore();

users.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

users.get('/auth', async (req: Request, res: Response) => {
  try {
    const user = await store.authenticate(req.body.username, req.body.password);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
});

users.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

users.post('/', async (req: userParams, res: Response) => {
  try {
    const user: User = {
      username: req.body.username,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    };
    const newUser = await store.create(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (err) {
    res.status(400).send(err);
  }
});

// users.put('/:id', async (req: userParams, res: Response) => {
//   try {
//     const authHeader = req.headers.authorization;
//     const token = authHeader ? authHeader.split(' ')[1] : '';
//     const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
//     if (decoded.id !== user.id) {
//       throw new Error('User id does not match!');
//     }
//   } catch (err) {
//     res.status(401);
//     res.json(err);
//     return;
//   }

//   try {
//     const updated = await store.create(user);
//     res.json(updated);
//   } catch (err) {
//     res.status(400);
//     res.json(err + user);
//   }
// })

users.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

export default users;
