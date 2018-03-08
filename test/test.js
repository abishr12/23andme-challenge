const assert = require('assert');
const controllers = require("../controllers/controllers");
var chai = require('chai'),
  chaiHttp = require('chai-http');
var expect = require("chai").expect;

chai.use(chaiHttp);
const testSearch = {
    blah: 'ajdfkla;dfjksal;f'
}

const fn = () => {
  controllers.searchLibrary(testSearch)
}

// describe('controllers', function () {   describe('searching the Google Books
// API', function () {     it('correct query should not throw error', function
// () {       assert.doesNotThrow(fn, Error)     });   }); });
// describe('controllers', function () {   describe('pinging Google Books API
// with GET', function () {     it('Route Works', function () {       chai
// .request('https://www.googleapis.com/books')         .get('/v1/volumes?')
// .end(function (err, res) {           expect(err).to.be.null; expect(res)
//        .to             .have             .status(200);   });     })   }) })

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

  it("search library should throw an error", function () {
    expect(function () {
      controllers.searchLibrary(testSearch)
    })
      .to
      .throw(Error);
  });
});