const assert = require('assert');
const controllers = require("../controllers/controllers");
var chai = require('chai'),
  chaiHttp = require('chai-http');
var expect = require("chai").expect;

chai.use(chaiHttp);

var multiply = function (x, y) {
  if (typeof x !== "number" || typeof y !== "number") {
    throw new Error("x or y is not a number.");
  } else 
    return x * y;
  }
;

describe("Multiply", function () {
  it("should multiply properly when passed numbers", function () {
    expect(multiply(2, 4))
      .to
      .equal(8);
  });
});

describe('Proper Connection To Google API', function () {
  it('should connect to API with status 200', function (done) {
    chai
      .request('https://www.googleapis.com/books')
      .get('/v1/volumes?q=search+terms')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res)
          .to
          .have
          .status(200);
        done();
      });

  })
})

describe('Search Library', function () {
  it("Throw Error If No Data Is Passed", function () {
    expect(function () {
      controllers.searchLibrary()
    })
      .to
      .throw(Error);
  });

it("Throw Error If Incomplete Data Is Passed", function () {
    expect(function () {
        controllers.searchLibrary({})
    })
        .to
        .throw(Error);
});
})