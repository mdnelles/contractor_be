import jwt from 'jsonwebtoken';
/* eslint-disable */
const env = require('dotenv').config().parsed;

const tokenTest = (token: string, res: any, next: any) => {
  jwt.verify(token, env.NODE_SECRET, (error: any) => {
    if (error) {
      console.log('bad token: ' + token);
      res.json({ status: 201, err: true, msg: 'bad token', error });
    } else {
      next(); // Next middleware
    }
  });
};

const tokenTestAdmin = async (token: string, res: any, next: any) => {
  try {
    const decoded: any = jwt.decode(token);
    if (decoded && decoded.email !== env.NODE_ADMIN) next();
    else res.json({ status: 201, err: true, msg: 'bad admin token' });
  } catch (error) {
    console.log('bad token: ' + token);
    res.json({ status: 201, err: true, msg: 'bad token', error });
  }
};

export const verifyToken = (req: any | null, res: any, next: any) => {
  try {
    const token = req.body.token || req.headers.token || null;
    tokenTest(token, res, next);
  } catch (error) {
    console.log(error);
    res.json({ status: 201, err: true, msg: 'bad token', error });
  }
};

export const verifyTokenAdmin = (req: any, res: any, next: any) => {
  try {
    const token: any = req.body.token || req.headers.token || null;
    tokenTestAdmin(token, res, next);
  } catch (error) {
    console.log(error);
    res.json({ status: 201, err: true, msg: 'bad token', error });
  }
};
