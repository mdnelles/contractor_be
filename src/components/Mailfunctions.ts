import * as dotenv from "dotenv";
import nodemailer from "nodemailer";

type msgType = {
   to: string;
   subject: string;
   message: string;
};

export default function extMailer(params: msgType) {
   return new Promise(async (resolve) => {
      const {
         NODE_MAIL_HOST,
         NODE_MAIL_EMAIL,
         NODE_MAIL_PORT,
         NODE_MAIL_PASSWORD,
         NODE_EMAIL_SENDER,
         NODE_ADMIN_EMAIL,
      } = dotenv.config().parsed;
      const {
         to = NODE_ADMIN_EMAIL,
         subject = "subject",
         message = "msg",
      } = params;
      try {
         console.log("user:" + NODE_MAIL_EMAIL);
         console.log("pass:" + NODE_MAIL_PASSWORD);
         const transporter = nodemailer.createTransport({
            host: "smtp.ionos.com" || NODE_MAIL_HOST,
            port: Number(NODE_MAIL_PORT) || 0,
            secure: true,
            requireTLS: true,
            auth: {
               user: NODE_MAIL_EMAIL,
               pass: NODE_MAIL_PASSWORD,
            },
            logger: true,
         });

         const info = await transporter.sendMail({
            from: NODE_EMAIL_SENDER,
            to,
            subject,
            text: message,
            html: message,
            headers: { "x-myheader": "test header" },
         });

         console.log("Message sent: %s", info.response);
         resolve(true);
      } catch (error) {
         resolve(false);
      }
   });

   //setTimeout(shutDown, 5000); // 10 seconds
}
