import request from "supertest";
import app from "../../server";

// Wait for the server to start before running the test
beforeAll((done) => {
   app.listen(5027, () => {
      console.log("Server is running on port: 5027");
      done();
   });
}, 10000); // Increase the timeout to 10 seconds (or adjust as needed)

// test the addDoc endpoint
test("addDoc endpoint testing....", async () => {
   const response = await request(app)
      .post("/doc_add")
      .send({
         collection: "users",
         doc: {
            name: "test",
            email: "test@test",
            password: "test",
         },
      });
   expect(response.body.msg).toBe("doc added");
   expect(response.body.err).toBe(false);
   expect(response.body.arr.ops[0].name).toBe("test");
   expect(response.body.arr.ops[0].email).toBe("test@test");
   expect(response.body.arr.ops[0].password).toBe("test");
});

afterAll((done) => {
   const server = app.listen(5027, () => {
      server.close(done);
   });
});
