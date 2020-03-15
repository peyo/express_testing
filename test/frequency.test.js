const frequency = require("../frequency");
const expect = require("chai").expect;
const supertest = require("supertest");

describe("Frequency testing", () => {
  it("Display unique, average, highest, and letter count.", () => {
    const query = {
      s: "aaBBAAbbaa"
    };

    const expected = {
      unique: 2,
      average: 5,
      highest: "a",
      "a": 6,
      "b": 4
    };
    
    return supertest(frequency)
      .get("/frequency")
      .query(query)
      .expect(200)
      .expect("Content-Type", /json/)
      .then(res => {
        expect(res.body).to.be.a("object");
        expect(res.body).to.eql(expected);
      });
  });

  it("Should throw an error is query is undefined.", () => {
    const query = {
      s: ""
    };
    
    return supertest(frequency)
      .get("/frequency")
      .query(query)
      .expect(400)
      .then(res => {
        expect(res.body).to.be.an("object");
      });
  });

  it("If more than one characters tie for highest frequency, return the one closest to the beginning of the alphabet.", () => {
    const query = {
      s: "CCBBaa"
    };

    const expected = {
      unique: 3,
      average: 2,
      highest: "a",
      "a": 2,
      "b": 2,
      "c": 2
    };

    return supertest(frequency)
      .get("/frequency")
      .query(query)
      .expect(200)
      .expect("Content-Type", /json/)
      .then(res => {
        expect(res.body).to.be.an("object");
        expect(res.body).to.eql(expected);
      });
  });
});
