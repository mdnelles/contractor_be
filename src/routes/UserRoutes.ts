import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../database/db';

const env = require('dotenv').config().parsed;


// "firstName": "M",
// "fullName": "Micha",
// "lastName": "Nel",
// "photoUrl": "https://lh3.googleuserc",


import { UserType } from '../types';

export const register = async (req: any, res: any): Promise<any> => {
  const { email, firstName, lastName, password } = req.body;

  try {
    const user: any = db.collection('users');
    const already: any = await user.findOne({ email });
    if (already) {
      res.json({ status: 200, err: false, msg: 'user exists' });
    } else {
      const hasalt = parseInt(env.NODE_HASH);
      const salt = await bcrypt.genSalt(hasalt);
      const hash = await bcrypt.hash(password, salt);
      const data: any = await user.insertOne({ email, firstName, lastName, isDeleted: false, password: hash });
      res.json({ status: 200, err: false, msg: 'user created', data });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: 200, err: true, error });
  }
};

export const edit = async (req: any, res: any): Promise<any> => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user: any = db.collection('users');
    const hasalt = parseInt(env.NODE_HASH);
    const salt = await bcrypt.genSalt(hasalt);
    const hash = await bcrypt.hash(password, salt);
    const data: UserType = await user.updateOne({ email }, { $set: { firstName, lastName, password: hash } });

    res.json({ status: 200, err: false, msg: 'user updated', data });
  } catch (error) {
    res.json({ status: 200, err: true, error });
    console.log(error);
  }
};

export const login = async (req: any, res: any): Promise<any> => {
  try {
    const { email, password } = req.body;
    const user: any = await db.collection('users');
    const data: any = await user.findOne({ email });

    if (data) {
      const hasalt = parseInt(env.NODE_HASH);
      const salt = await bcrypt.genSalt(hasalt);
      const hash = await bcrypt.hash(password, salt);
      if (bcrypt.compareSync(hash, data.password) || email === data.email) {
        // successful login
        let token = jwt.sign(data, hash, {
          expiresIn: 60 * 60 * 24 * 30
        });

        res.json({ status: 200, err: false, msg: 'user exists', token });
      } else {
        res.json({ status: 201, err: true, msg: 'login failed' });
      }
    } else {
      res.json({ status: 201, err: true, msg: 'user does not exist' });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: 201, err: true, error });
  }
};

export const remove = async (req: any, res: any): Promise<any> => {
  try {
    const { id } = req.body;
    const user: any = db.collection('users');
    const data = await user.updateOne({ id }, { $set: { isDeleted: true } });
    res.json({ status: 200, err: false, msg: 'ok', data });
  } catch (error) {
    console.log(error);
    res.json({ status: 201, err: true, msg: '', error });
  }
};

export const list = async (req: any, res: any): Promise<any> => {
  try {
    const users: any = db.collection('users');
    const data = await users.find({ isDeleted: false }).toArray();
    res.json({ status: 200, err: false, msg: 'ok', data });
  } catch (error) {
    res.json({ status: 201, err: true, msg: '', error });
  }
};
