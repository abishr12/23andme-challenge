const assert = require('assert');
const controllers = require("../controllers/controllers");
const chai = require('chai'),
  chaiHttp = require('chai-http'),
  chaiParam = require('chai-param'),
  param = chaiParam.param;
const expect = require("chai").expect;
const chaiFiles = require('chai-files');
const fs = require('fs');

const file = chaiFiles.file;
const dir = chaiFiles.dir;

chai.use(chaiFiles);
chai.use(chaiHttp);

const multiply = function (x, y) {
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




describe('Proper Connection To Google Books API', function () {
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

// describe('removeLibrary', function () {
//   it("works when library.csv exists", function () {
//     expect(function () {
//       controllers.removeLibrary()
//     })
//       .to
//       .not
//       .throw(Error)
//   })
// })
describe('Search Library', function () {
  it("Throw Error If No Data Is Passed", function () {
    expect(function () {
      controllers.searchLibrary()
    })
      .to
      .throw(Error);
  });

  it("Throw Error If Empty Data Is Passed", function () {
    expect(function () {
      controllers.searchLibrary({})
    })
      .to
      .throw(Error);
  });

  it("library.csv to not exist prior to running the function at least once", function () {
    expect(file('library.csv')).to.not.exist;
  })

it("Return Errors For Float Integers", function () {
  expect(function () {
    controllers.searchLibrary({q: 'batman', maxResults: 10.5})
  })
    .to
    .not
    .throw(Error);
});

  it("Return No Errors From Running A Result", function () {
    expect(function () {
      controllers.searchLibrary({q: 'batman', maxResults: 10})
    })
      .to
      .not
      .throw(Error);
    it("library.csv to hold data", function () {

      expect(file('library.csv')).to.not.be.empty;
    })

  });

})



