import request from "supertest";
//import { sum, countStringOccurrances } from "../../routes/Tester";
import app from "../../server";

describe("Endpoint Tests", () => {
   describe("POST /sum", () => {
      it("should return the sum of two numbers", async () => {
         const response = await request(app)
            .post("/sum")
            .send({ num1: 7, num2: 10 })
            .expect(200);

         expect(response.body).toEqual({
            status: 200,
            err: false,
            msg: "added",
            result: 17,
         });
      });

      //   it("should return an error message when non-number inputs are provided", async () => {
      //      const response = await request(app)
      //         .post("/sum")
      //         .send({ num1: "5", num2: 10 })
      //         .expect(200);

      //      expect(response.body).toEqual({
      //         status: 200,
      //         err: true,
      //         msg: "you must supply two numbers",
      //      });
      //   });
   });

   //    describe("POST /count_string", () => {
   //       it("should return the count of occurrences of a string in the array", async () => {
   //          const response = await request(app)
   //             .post("/count_string")
   //             .send({
   //                str: "apple",
   //                strArr: ["apple", "banana", "apple", "orange"],
   //             })
   //             .expect(200);

   //          expect(response.body).toEqual({
   //             status: 200,
   //             err: false,
   //             msg: "counted",
   //             result: 2,
   //          });
   //       });
   //    });
});
