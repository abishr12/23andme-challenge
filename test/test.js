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

describe("001 - Check Mocha", function () {

  it("001a - Mocha is configured correctly", function (done) {
    expect(multiply(2, 4))
      .to
      .equal(8);

    done();
  });
});

describe('002 - Proper Connection To Google Books API', function () {

  it('002a - should connect to API with status 200', function (done) {
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
describe('003 - Remove Library', function () {
  before(() => {
    controllers.removeLibrary()
  })

  it("003a -removeLibrary works properly and there is no existing library.csv file ", done => {

    expect(file('library.csv')).to.not.exist;
    done()

  })
})

describe('004 - Search Library', function () {

  it("004a - Throw Error If No Data Is Passed", done => {
    expect(function () {
      controllers.searchGoogleBooks()
    })
      .to
      .throw(Error);
    done()
  });

  it("004b - Throw Error If Empty Data Is Passed ", function () {
    expect(function () {
      controllers.searchGoogleBooks({})
    })
      .to
      .throw(Error);
  });

  it("004c - Throw Error If Incorrect Key Data Is Passed ", function () {
    expect(function () {
      controllers.searchGoogleBooks({blam: 'go on make my day'})
    })
      .to
      .throw(Error);
  });

  it("004d - Return No Errors From Running A Proper Result ", done => {
    expect(function () {
      controllers.searchGoogleBooks({q: 'rome', maxResults: 10})
    })
      .to
      .not
      .throw(Error);

    it("004e - library.csv to hold data", () => {
      expect(file('library.csv')).to.not.be.empty;

    })
    done();

  })

  it("004f - Accept Incorrectly Placed Negative Values And Convert To Positive ", done => {
    expect(function () {
      controllers.searchGoogleBooks({q: 'rome', maxResults: -10, startIndex: -20})
    })
      .to
      .not
      .throw(Error);

    done()

  });

it("004g - Accept Float Integers In Start Index And Convert To Integers ", function () {
    expect(function () {
      controllers.searchGoogleBooks({q: 'rome', maxResults: 11.2, startIndex: 10.5})
    })
      .to
      .not
      .throw(Error);
  });

it("004e - Accept Null Values For Optional Parameters", done => {

    expect(function () {
      controllers.searchGoogleBooks({q: 'batman', orderBy: null})
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