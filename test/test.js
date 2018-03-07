const assert = require('assert');
const controllers = require("../controllers/controllers");


const testSearch = {
    uri: 'https://www.googleapis.com/books/v1/volumes?',
    qs: {
        q: `batman`
    },
    json: true
}

describe('controllers', function () {
    describe('searching the Google Books API', function () {
        it('correct query should not throw error', function () {
            assert.throws(controllers.searchLibrary(testSearch), Error)
        });
    });
});