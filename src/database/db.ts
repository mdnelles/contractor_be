// import env vars into variable env
import * as dbc from "./dbconfig";
import { MongoClient, ServerApiVersion } from "mongodb";
export const uri = `mongodb+srv://${dbc.user}:${dbc.pass}@${dbc.link}?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
   serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
   },
});
// const client = new MongoClient(uri, { useUnifiedTopology: true},
// { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1});

export const db = client.db("dpc");
export const __MONGO_DB_NAME__ = "dpc";

// export const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1
// });
// try {
//   client.connect(() => {

//   });
// } catch(err) {
//   console.log(err);
// }
