import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : '';
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);

    next();
  } catch (err) {
    res.status(401);
    return res.json(`Invalid token ${err}`);
  }
};
