import { db } from "../database/db";

const { ObjectId } = require("mongodb");

// build and endpoint to addDoc to mongo
export const addDoc = async (req: any, res: any): Promise<any> => {
   try {
      const { collection, doc } = req.body;
      const arr: any = await db.collection(collection).insertOne(doc);
      res.json({ status: 200, err: false, msg: "doc added", arr });
   } catch (error) {
      res.json({ status: 200, err: true, error });
      console.log(error);
   }
};

// build endpoint to get all docs from mongo db collection
export const getAllDocs = async (req: any, res: any): Promise<any> => {
   const { collection } = req.body;
   try {
      const arr: any = await db.collection(collection).find({}).toArray();
      res.json({ status: 200, err: false, msg: "docs found", arr });
   } catch (error) {
      res.json({ status: 200, err: true, error });
      console.log(error);
   }
};

// build endpoint to get docs from mongo db where attribute matches value
export const getDocsByAttribute = async (req: any, res: any): Promise<any> => {
   const { collection, attribute, value } = req.body;
   console.log(collection, attribute, value);
   try {
      const arr: any = await db
         .collection(collection)
         .find({ [attribute]: value })
         .toArray();

      res.json({
         status: 200,
         err: false,
         msg: "doc(s) found",
         arr,
      });
   } catch (error) {
      res.json({ status: 200, err: true, error });
      console.log(error);
   }
};

export const getDocsByObjMatch = async (req: any, res: any): Promise<any> => {
   const { collection, obj } = req.body;
   try {
      // ie db.customers.find({"VIP": true,"Country": "Germany"});
      const arr: any = await db.collection(collection).find(obj).toArray();
      res.json({
         status: 200,
         err: false,
         msg: "doc(s) found",
         arr,
      });
   } catch (error) {
      res.json({ status: 200, err: true, error });
      console.log(error);
   }
};

export const updateDocObject = async (req: any, res: any): Promise<any> => {
   const { collection, doc } = req.body;
   try {
      const arr: any = await db
         .collection(collection)
         .updateOne(doc, { $set: doc });
      res.json({ status: 200, err: false, msg: "doc edited", arr });
   } catch (error) {
      res.json({ status: 200, err: true, error });
      console.log(error);
   }
};

export const updateDocById = async (req: any, res: any): Promise<any> => {
   const { collection, changeObj, _id } = req.body;
   try {
      const arr: any = await db.collection(collection).updateOne(
         { _id: new ObjectId(_id) }, // Filter
         { $set: changeObj }, // changeObj = {name: "John", address: "Highway 71"}
         { upsert: true } // add document with req.body._id if not exists);
      );
      res.json({ status: 200, err: false, msg: "doc edited", arr });
   } catch (error) {
      res.json({ status: 200, err: true, error });
      console.log(error);
   }
};

export const updateManyDocs = async (req: any, res: any): Promise<any> => {
   try {
      const {
         collection,
         compareFieldName,
         compareFieldValue,
         fieldToUpdate,
         updatedValue,
      } = req.body;
      const query = { [compareFieldName]: compareFieldValue };
      const update = { $set: { [fieldToUpdate]: updatedValue } };

      const result = await db.collection(collection).updateMany(query, update);
      res.json({ status: 200, err: false, msg: "Docs updated", result });
   } catch (error) {
      res.json({ status: 500, err: true, error: error.message });
      console.log(error);
   }
};

// build and endpoint to deleteDoc from mongo
export const deleteDoc = async (req: any, res: any): Promise<any> => {
   const { collection, doc } = req.body;
   try {
      const arr: any = await db.collection(collection).deleteOne(doc);
      res.json({ status: 200, err: false, msg: "doc deleted", arr });
   } catch (error) {
      res.json({ status: 200, err: true, error });
      console.log(error);
   }
};
