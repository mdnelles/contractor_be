
import { db } from '../database/db';


// build and endpoint to addDoc to mongo
export const addDoc = async (req: any, res: any): Promise<any> => {
    const {collection, doc} = req.body;
    try {
        const data: any = await db.collection(collection).insertOne(doc);
        res.json({ status: 200, err: false, msg: 'doc added', data });
    } catch (error) {
        res.json({ status: 200, err: true, error });
        console.log(error);
    }
};

// build endpoint to get all docs from mongo db collection
export const getAllDocs = async (req: any, res: any): Promise<any> => {
    const {collection} = req.body;
    try {
        const data: any = await db.collection(collection).find({}).toArray();
        res.json({ status: 200, err: false, msg: 'docs found', data });
    } catch (error) {
        res.json({ status: 200, err: true, error });
        console.log(error);
    }
}


// build endpoint to get docs from mongo db where attribute matches value
export const getDocsByAttribute = async (req: any, res: any): Promise<any> => {
    const {collection, attribute, value} = req.body;
    try {
        const data: any = await db.collection(collection).find({[attribute]: value}).toArray();
        res.json({ status: 200, err: false, msg: 'docs found', data });
    } catch (error) {
        res.json({ status: 200, err: true, error });
        console.log(error);
    }
}


export const editDoc = async (req: any, res: any): Promise<any> => {
    const {collection, doc} = req.body;
    try {
        const data: any = await db.collection(collection).updateOne(doc, {$set: doc});
        res.json({ status: 200, err: false, msg: 'doc edited', data });
    } catch (error) {
        res.json({ status: 200, err: true, error });
        console.log(error);
    }
}


// build and endpoint to deleteDoc from mongo
export const deleteDoc = async (req: any, res: any): Promise<any> => { 
    const {collection, doc} = req.body;
    try {
        const data: any = await db.collection(collection).deleteOne(doc);
        res.json({ status: 200, err: false, msg: 'doc deleted', data });
    } catch (error) {
        res.json({ status: 200, err: true, error });
        console.log(error);
    }
}