const assert = require('assert');
const controllers = require("../controllers/controllers");
const chai = require('chai'),
  chaiHttp = require('chai-http'),
  chaiParam = require('chai-param'),
  param = chaiParam.param;
const expect = require("chai").expect;
const chaiFiles = require('chai-files');
const fs = require('fs');
const index = require('../index')

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

describe("Check Mocha", function () {

  it("Mocha is configured correctly", function (done) {
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
  before(() => {
    controllers.removeLibrary()
  })

  it("removeLibrary works properly and there is no existing library.csv file ", done => {

    expect(file('library.csv')).to.not.exist;
    done()

  })

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

  it("Throw Error If Incorrect Key Data Is Passed ", function () {
    expect(function () {
      controllers.searchLibrary({blam: 'go on make my day'})
    })
      .to
      .throw(Error);
  });

  it("Return No Errors From Running A Proper Result ", done => {
    expect(function () {
      controllers.searchLibrary({q: 'rome', maxResults: 10})
    })
      .to
      .not
      .throw(Error);

    it("library.csv to hold data", () => {
      expect(file('library.csv')).to.not.be.empty;

    })
    done();

  })

  it("Accept Incorrectly Placed Negative Values And Convert To Positive ", done => {
    expect(function () {
      controllers.searchLibrary({q: 'rome', maxResults: -10.5, startIndex: -20})
    })
      .to
      .not
      .throw(Error);

    done()

  });

  it("Return No Errors For Float Integers In Start Index ", function () {
    expect(function () {
      controllers.searchLibrary({q: 'rome', startIndex: 10.5})
    })
      .to
      .not
      .throw(Error);
  });

  it("Accept Null Values For Optional Parameters", done => {

    expect(function () {
      controllers.searchLibrary({q: 'batman', startIndex: null})
    })
      .to
      .not
      .throw(Error);

    done()

  });

})

describe("Full System Is Working", function () {
  it("Search For Books Functions Without Errors", function (done) {
    expect(function () {
      index.searchForBooks()
    })
      .to
      .not
      .throw(Error)
      done();
  });
});