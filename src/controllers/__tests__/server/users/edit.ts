import { edit } from "../../../../routes/UserRoutes";
import { UserType } from "../../../../types";

describe("edit", () => {
   test("should update a user", async () => {
      const req = {
         body: {
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@example.com",
            password: "password",
         },
      };
      const res = {
         json: jest.fn(),
      };

      const expectedData = {
         status: 200,
         err: false,
         msg: "user updated",
         data: {
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@example.com",
            password: "password",
         },
      };

      await edit(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedData);
   });

   test("should return an error if the user does not exist", async () => {
      const req = {
         body: {
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@example.com",
            password: "password",
         },
      };
      const res = {
         json: jest.fn(),
      };

      const expectedError = {
         status: 404,
         err: true,
         msg: "user not found",
      };

      await edit(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedError);
   });
});
