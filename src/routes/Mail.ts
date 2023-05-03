import extMailer from "../components/Mailfunctions";
import * as dotenv from "dotenv";

export const mail_form = async (req: any, res: any): Promise<any> => {
   const { NODE_EMAIL_DEFAULT_REC } = dotenv.config().parsed;
   console.log("--------req.body----");
   console.log(req.body);
   console.log(req.headers);

   const { subject = "mailfor", message = "default message" } = req.body;
   try {
      const params = {
         to: NODE_EMAIL_DEFAULT_REC,
         subject,
         message,
      };
      await extMailer(params);

      res.json({ status: 201, err: false, msg: "ok mail sent" });
   } catch (error) {
      console.log(error);
      res.json({ status: 201, err: true, msg: "Error", error });
   }
};
