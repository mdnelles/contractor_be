import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
const env = require("dotenv").config().parsed;

import { verifyTokenAdmin } from "./routes/Token";
import * as mail from "./routes/Mail";
import * as users from "./routes/UserRoutes";
import * as mdb from "./routes/MongoRoutes";

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express();
const jsonParser = bodyParser.json();
const port = 5027;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());
app.use(express.json());
app.use(jsonParser);
app.use(urlencodedParser);
app.use(helmet());

app.post("/user_register", users.register);
app.post("/user_login", users.login);
app.post("/user_edit", verifyTokenAdmin, users.edit);
app.post("/user_remove", verifyTokenAdmin, users.remove);
app.post("/user_list", verifyTokenAdmin, users.list);

app.post("/doc_add", mdb.addDoc);
app.post("/doc_get_all", verifyTokenAdmin, mdb.getAllDocs);
app.post("/doc_get_by_attribute", verifyTokenAdmin, mdb.getDocsByAttribute);
app.post("/doc_get_by_obj_match", mdb.getDocsByObjMatch);
app.post("/doc_edit", verifyTokenAdmin, mdb.updateDocObject);
app.post("/doc_edit_by_id", verifyTokenAdmin, mdb.updateDocById);
app.post("/doc_delete", verifyTokenAdmin, mdb.deleteDoc);

app.post("/mail_form", mail.mail_form);

if (env.NODE_ENV === "production") {
   app.use(express.static("client/build"));
}

app.listen(port, function () {
   console.log("Server is running on port: " + port);
});

export default app;
