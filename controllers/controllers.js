const fs = require('fs');
const rp = require("request-promise");
const Json2csvParser = require('json2csv').Parser;
const reorder = require('csv-reorder');

const newLine = "\r\n"; // New line when appending rows to CSV

/** 
 * @summary Column Headers
*/
const columnHeaders = [
  {
    label: 'Identification',
    value: 'id'
  }, {
    label: 'E-Tag',
    value: 'etag'
  }, {
    label: 'Link',
    value: 'selfLink'
  }, {
    label: 'Title',
    value: 'volumeInfo.title'
  }, {
    label: 'Author(s)',
    value: 'volumeInfo.authors'
  }, {
    label: 'Publisher',
    value: 'volumeInfo.publisher'
  }, {
    label: 'Published Date',
    value: 'volumeInfo.publishedDate'
  }, {
    label: 'Page Count',
    value: 'volumeInfo.pageCount'
  }, {
    label: 'Average Rating',
    value: 'volumeInfo.averageRating'
  }, {
    label: 'Ratings Count',
    value: 'volumeInfo.ratingsCount'
  }
];

module.exports = {
  /**
   * @requires module:fs
   * @requires module:request-promise
   * @requires module:json2csv
   * @param  {} searchParameters
   *
   */
  searchLibrary: (searchParameters) => {

    /**
     * @summary Enters search parameters as well as URL
     */
    const bookRequest = {
      uri: 'https://www.googleapis.com/books/v1/volumes?',
      qs: {
        q: `${searchParameters.q}`
      },
      json: true
    }
    /**
     * @summary Pushes extra search parameters to bookRequest
     */
    for (let key in searchParameters) {
      if (key != 'q') {
        bookRequest.qs[key] = searchParameters[key]
      }
    }
    console.log(bookRequest)
    /**
     * @param  {} bookRequest
     * @summary GET request to Google Books API
     */
    rp(bookRequest, function (error, response, body) {

      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print theresponse status code if a response was received

      let books = body.items //Results from Google Books API

      /**
         * @param  {} library.csv
         * @summary Check status of library.csv (existing/non-existent)
         */
      fs.stat('library.csv', function (err, stat) {

        /**
         * @param  {} err
         * @summary Confirm library.csv exists
         */
        if (err == null) {

          const json2csvParser = new Json2csvParser({columnHeaders, header: false});
          const csv = json2csvParser.parse(books) + newLine;

        /**
         * @param {} library.csv
         * @summary Append rows to existing library.csv file
         */
          fs.appendFile('library.csv', csv, function (err) {
            if (err) 
              throw err;
              console.log('The "data to append" was appended to file!');
            }
          );

        } else if (err.code == 'ENOENT') {
          console.log('Creating new file...')
          const json2csvParser = new Json2csvParser({columnHeaders, header: true});
          const csv = json2csvParser.parse(books) + newLine;
          fs.writeFile('library.csv', csv, function (err) {
            if (err) 
              throw err;

            }
          );

        } else {
          console.log('Error Has Occurred: ', err.code);
        }

      })

    }).catch(err => {

      throw new Error('Something Went Wrong')

    })

  },
  /**
   * @requires module:csv-reorder
   * @param  {} answers
   * @summary Reorders library.csv by column (ascending or descending)
   */
  reorderCSV: (answers) => {
    reorder({
      input: './library.csv',
      output: './library.csv',
      sort: answers.categorySort,
      type: 'number',
      descending: answers.Descending,
      remove: true,
      metadata: false
    })

    console.log('A file called library.csv has been created in your root directory')
  }
}
