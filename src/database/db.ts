// import env vars into variable env
import * as dbc from './dbconfig';
const { MongoClient, ServerApiVersion } = require('mongodb');
export const uri = `mongodb+srv://${dbc.user}:${dbc.pass}@${dbc.link}?retryWrites=true&w=majority`;

export const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

export const db = client.db('LakesWorld');

client.connect((err: any) => {
  console.log(err);

  client.close();
});
