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
afterEach(done => {
  console.log("Wham bam")
});


  it("should multiply properly when passed numbers", done => {
    expect(multiply(2, 4))
      .to
      .equal(8);
      done();
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

describe('Search Library', function () {
  it("Throw Error If No Data Is Passed", done => {
    expect(function () {
      controllers.searchLibrary()
    })
      .to
      .throw(Error);
      done()
  });
  it("Throw Error If Empty Data Is Passed ", function () {
    expect(function () {
      controllers.searchLibrary({})
    })
      .to
      .throw(Error);
  });

  it("library.csv to not exist prior to running the function at least once ", function () {
    expect(file('library.csv')).to.not.exist;
  })

  it("Return No Errors From Running A Proper Result ",() => {
    expect(function () {
      controllers.searchLibrary({q: 'batman', maxResults: 10})
    })
      .to
      .not
      .throw(Error);

    it("library.csv to hold data", () => {
      expect(file('library.csv')).to.not.be.empty;
      
    })

    
    })


  it("Accept Incorrectly Placed Negative Values And Convert To Positive ", function () {
    expect(function () {
      controllers.searchLibrary({q: 'batman', maxResults: -10.5, startIndex: -20})
    })
      .to
      .not
      .throw(Error);
  });


  it("Return No Errors For Float Integers In Start Index ", function () {
    expect(function () {
      controllers.searchLibrary({q: 'batman', startIndex: 10.5})
    })
      .to
      .not
      .throw(Error);
  });

  it("Accept Null Values For Optional Parameters", function () {
    expect(function () {
      controllers.searchLibrary({q: 'batman', startIndex: null})
    })
      .to
      .not
      .throw(Error);
  });

})