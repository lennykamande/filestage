const chai = require("chai");
const chaHttp = require("chai-http");
const app =require("../src/api");

chai.use(chaHttp);
const expect = chai.expect;
describe("Return App", () => {
    //Test the get route 
    it("should return success on / url with no data", async () => {
        const result = await chai.request(app).get("/");
        //const { status } = result;
        expect(result).to.be.equal(200);
      });
    //Test the post route
      it("should return 201 when date and text are provided", async () => {
        const result = await chai
          .request(app)
          .post("/")
          .set("content-type", "application/json")
          .send({
            text: "New Todo",
            date: "2021-06-15"
          });
        const { status, body } = result;
        expect(status).to.be.equal(201);
        expect(body.todo).to.have.param('text', 'date');
        done();
      });
    //Test Edge Case on post route
      it("should return 400 when text is not a number", async () => {
        const result = await chai
          .request(app)
          .post("/")
          .set("content-type", "application/json")
          .send({
            text: 123,
            date: "2021-06-15"
          });
        const { status, body } = result;
        expect(status).to.be.equal(400);
        expect(body.error.message).to.be.equal(
          "invalid 'text' expected string"
        );
        done();
      });
      //Test Edge case on Post Route
      it("should return an error when the text is too short", async () => {
        const result = await chai
          .request(app)
          .post("/")
          .set("content-type", "application/json")
          .send({
            text: "a",
            date: "2021-06-15"
          });
        const { status } = result;
        expect(status).to.be.equal(400);
        expect(body.error.message).to.be.equal(
            "invalid 'text' expected string"
          );
          done();
        });

        //Test Edge case on Put Route
      
});

