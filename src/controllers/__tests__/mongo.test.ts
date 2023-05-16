const { MongoClient } = require("mongodb");
//import * as dbc from '../../database/dbconfig';
import { uri, __MONGO_DB_NAME__ } from "../../database/db";

describe("insert", () => {
   let connection: { db: (arg0: any) => any; close: () => any };
   let db: { collection: (arg0: string) => any };

   beforeAll(async () => {
      connection = await MongoClient.connect(uri, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      db = await connection.db(__MONGO_DB_NAME__);
   });

   afterAll(async () => {
      await connection.close();
   });

   it("should insert a doc into collection", async () => {
      const now = Date.now();
      const users = db.collection("testusers");

      const mockUser = { _id: "some-user-" + now, name: "John" };
      await users.insertOne(mockUser);

      const insertedUser = await users.findOne({ _id: "some-user-" + now });
      expect(insertedUser).toEqual(mockUser);
   });
});
